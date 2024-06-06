const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3090;
const RIOT_API_KEY = 'RGAPI-74aa8ca3-53a0-4c3e-be5a-4e671b219d85';

const cache = {};

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/search/:gameName/:tagLine', async (req, res) => {
    const { gameName, tagLine } = req.params;

    try {
        const cacheKey = `${gameName}_${tagLine}`;
        if (cache[cacheKey]) {
            return res.json(cache[cacheKey]);
        }

        const accountResponse = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
            params: { api_key: RIOT_API_KEY }
        });
        const { puuid } = accountResponse.data;

        const [summonerResponse, historyMatchResponse] = await Promise.all([
            axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
                params: { api_key: RIOT_API_KEY }
            }),
            axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids`, {
                params: { api_key: RIOT_API_KEY }
            })
        ]);

        const { id } = summonerResponse.data;

        const [summonerIdResponse, matchObjects] = await Promise.all([
            axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`, {
                params: { api_key: RIOT_API_KEY }
            }),
            Promise.all(historyMatchResponse.data.map(matchId => 
                axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
                    params: { api_key: RIOT_API_KEY }
                }).then(response => response.data)
            ))
        ]);

        const responseData = {
            summoner: summonerResponse.data,
            league: summonerIdResponse.data,
            matches: matchObjects
        };

        cache[cacheKey] = responseData;
        setTimeout(() => delete cache[cacheKey], 5 * 60 * 1000);

        res.json(responseData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
