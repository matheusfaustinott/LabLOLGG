import React from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { summoner, matches } from '../../signals/signalsUser';

const Role = () => {
    useSignals();
    
    const laneStats = () => {
        const lanes = {};

        if (summoner.value && matches.value) {
            matches.value.forEach(match => {
                const currentSummonerPuuid = summoner.value.puuid;
                const currentSummonerTeamPosition = match.info.participants.find(participant => participant.puuid === currentSummonerPuuid).teamPosition;
                const didWin = match.info.participants.find(participant => participant.puuid === currentSummonerPuuid).win;

                if (lanes[currentSummonerTeamPosition]) {
                    lanes[currentSummonerTeamPosition].total++;
                    didWin ? lanes[currentSummonerTeamPosition].wins++ : lanes[currentSummonerTeamPosition].losses++;
                } else {
                    lanes[currentSummonerTeamPosition] = {
                        total: 1,
                        wins: didWin ? 1 : 0,
                        losses: didWin ? 0 : 1
                    };
                }
            });
        }

        Object.keys(lanes).forEach(position => {
            const { wins, total } = lanes[position];
            lanes[position].winrate = wins / total;
        });

        return lanes;
    };

    const laneStatsData = laneStats();

    const mostPlayedLane = Object.keys(laneStatsData).reduce((prev, curr) => (
        laneStatsData[curr].total > laneStatsData[prev].total ? curr : prev
    ));

    const mostPlayedLanePosition = mostPlayedLane;
    const mostPlayedLaneWinrate = laneStatsData[mostPlayedLane].winrate;

    const iconPath = `/lanes/${mostPlayedLanePosition}.png`;
    // Estilo CSS
    const styles = {
        container: {
            textAlign: 'center'
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px'
        },
        info: {
            fontSize: '16px'
        },
        icon: {
            width: '50px', 
            height: '50px', 
            marginBottom: '10px'
        }
    };
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Posição Mais Jogada</h2>
            <img src={iconPath} alt={mostPlayedLanePosition} style={styles.icon} />
            <div style={styles.info}>
                <p>Winrate: {(mostPlayedLaneWinrate * 100).toFixed()}%</p>
            </div>
        </div>
    );
};

export default Role;
