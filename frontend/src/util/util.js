import versao from "../signals/versao";
import axios from 'axios';
import { champMaisUsado, elo, loading, matches, summoner } from "../signals/signalsUser";
import { dadosAoVivo, estaAoVivo, gameQueueConfigId } from "../signals/aoVivoSignals";



export const version  = () =>{
    axios
    .get("https://ddragon.leagueoflegends.com/api/versions.json")
    .then((response) => {
      if (response.data && response.data.length > 0) {
        versao.value = response.data[0];
      }
    })
    .catch((error) => {
      console.error("Erro ao achar a versão:", error);
    });
};


export const handleSearch = async (gameName, tagLine) => {
    loading.value = true;
    try {
        const response = await axios.get(`http://localhost:3090/search/${gameName}/${tagLine}`);
        const data = response.data;
        console.log('resultado:',response.data)
        summoner.value = data.summoner;
        console.log('summoner,', summoner.value)
        elo.value = data.league;
        matches.value = data.matches;
       
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Não foi posivel achar o jogador:', error.message);
        } else {
            console.error('ERRO desconhecido:', error);
        }
    } finally {
        loading.value = false;
    }
};

export const AoVivo = async (gameName, tagLine) => {
    try {
        const response = await axios.get(`http://localhost:3090/live-game/${gameName}/${tagLine}`);
        const data = response.data;
        console.log("ao vivo", dadosAoVivo.value);
        dadosAoVivo.value = data.DadosAoVivo;
        estaAoVivo.value = data.AoVivo;
        gameQueueConfigId.value = data.DadosAoVivo.gameQueueConfigId;
        console.log('resultados:',response.data)
        
       
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Jogador Não está em partida:', error.message);
        } else {
            console.error('ERRO desconhecido:', error);
        }
    }
};

export const findMostPlayedChampions = () => {
    const championsStats = {};
    if (summoner.value && matches.value) {
        matches.value.forEach(match => {
            match.info.participants.forEach(participant => {
                if (participant.puuid === summoner.value.puuid) {
                    const championName = participant.championName;
                    const didWin = participant.win;
                    championsStats[championName] = championsStats[championName] || { wins: 0, losses: 0 };
                    didWin ? championsStats[championName].wins++ : championsStats[championName].losses++;
                }
            });
        });
    }
    const sortedChampions = Object.entries(championsStats).sort(([, a], [, b]) => {
        const aTotal = a.wins + a.losses;
        const bTotal = b.wins + b.losses;
        return bTotal - aTotal;
    });
    
    champMaisUsado.value = sortedChampions.slice(0, 3);
    return sortedChampions.slice(0, 3);
    
};

