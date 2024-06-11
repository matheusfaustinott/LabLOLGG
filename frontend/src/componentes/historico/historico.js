import React from 'react';
import { matches, summoner } from '../../signals/signalsUser';
import versao from '../../signals/versao';

// Função para converter a duração do jogo em minutos e segundos
const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
};

// Função para verificar a cor do time
const getTeamColor = (teamId) => (teamId === 100 ? 'blue' : 'red');

const getMainAndSecondaryLane = () => {
    const laneCounts = matches.value.reduce((acc, match) => {
        const participant = match.info.participants.find(p => p.puuid === summoner.value.puuid);
        if (participant) {
            acc[participant.teamPosition] = (acc[participant.teamPosition] || 0) + 1;
        }
        return acc;
    }, {});

    const lanesSorted = Object.keys(laneCounts).sort((a, b) => laneCounts[b] - laneCounts[a]);
    const mainLane = lanesSorted[0];
    const secondaryLane = lanesSorted[1] || null;

    return { mainLane, secondaryLane };
};

const getLaneStatus = (currentLane, mainLane, secondaryLane) => {
    if (currentLane === mainLane) {
        return 'Main Lane';
    } else if (currentLane === secondaryLane) {
        return 'Secondary Lane';
    } else {
        return 'Possible Autofill';
    }
};

const MatchCard = ({ match, version }) => {
    const participant = match.info.participants.find(p => p.puuid === summoner.value.puuid);
    const teamColor = getTeamColor(participant.teamId);
    const gameDuration = formatDuration(match.info.gameDuration);
    const gameVersion = match.info.gameVersion.split('.')[0] + '.' + match.info.gameVersion.split('.')[1];
    const { mainLane, secondaryLane } = getMainAndSecondaryLane();
    const laneStatus = getLaneStatus(participant.teamPosition, mainLane, secondaryLane);

    return (
        <div style={{ backgroundColor: teamColor, padding: '10px', margin: '10px', borderRadius: '10px', width: '300px' }}>
            <div>
                <strong>{participant.win ? 'Victory' : 'Defeat'}</strong>
                <div>Duration: {gameDuration}</div>
                <div>Version: {gameVersion}</div>
                <div>
                    <img src={`/lanes/${participant.teamPosition}.png`} alt={participant.teamPosition} style={{ width: '30px', height: '30px' }} />
                    {laneStatus}
                </div>
            </div>
            <div>
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${versao.value}/img/champion/${participant.championName}.png`}
                    alt={participant.championName}
                    style={{ width: '50px', height: '50px' }}
                />
                <span>{participant.champLevel}</span>
            </div>
            <div>
                <div>Summoner Spells:</div>
                {/* <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/Summoner${participant.summoner1Id}.png`}
                    alt={`Summoner Spell ${participant.summoner1Id}`}
                    style={{ width: '30px', height: '30px' }}
                />
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/Summoner${participant.summoner2Id}.png`}
                    alt={`Summoner Spell ${participant.summoner2Id}`}
                    style={{ width: '30px', height: '30px' }}
                /> */}
            </div>
            <div>
                <div>Runes:</div>
                {/* {participant.perks.styles.map((style, index) => (
                    <div key={index}>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/perk/${style.style}.png`}
                            alt={`Rune ${style.style}`}
                            style={{ width: '30px', height: '30px' }}
                        />
                    </div>
                ))} */}
            </div>
            <div>
                <div>Items:</div>
                {Array.from({ length: 7 }).map((_, index) => (
                    participant[`item${index}`] !== 0 && (
                        <img
                            key={index}
                            src={`https://ddragon.leagueoflegends.com/cdn/${versao.value}/img/item/${participant[`item${index}`]}.png`}
                            alt={`Item ${index}`}
                            style={{ width: '30px', height: '30px' }}
                        />
                    )
                ))}
            </div>
            <div>
                <div>{participant.kills} / {participant.deaths} / {participant.assists}</div>
                <div>KDA: {(participant.kills + participant.assists) / participant.deaths}</div>
                <div>CS: {participant.totalMinionsKilled} ({participant.laneMinionsFirst10Minutes} @10)</div>
                <div>Vision Score: {participant.visionScore}</div>
                {participant.doubleKills > 0 && <div>Double Kill</div>}
                {participant.tripleKills > 0 && <div>Triple Kill</div>}
                {participant.quadraKills > 0 && <div>Quadra Kill</div>}
                {participant.pentaKills > 0 && <div>Penta Kill</div>}
            </div>
        </div>
    );
};

const MatchList = ({ version }) => {

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {matches.value.map(match => (
                    <MatchCard key={match.metadata.matchId} match={match} version={version} />
                ))}
            </div>
        </div>
    );
};

export default MatchList;
