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
                    // Se a posição da equipe já foi registrada, atualize os dados
                    lanes[currentSummonerTeamPosition].total++;
                    didWin ? lanes[currentSummonerTeamPosition].wins++ : lanes[currentSummonerTeamPosition].losses++;
                } else {
                    // Se a posição da equipe ainda não foi registrada, inicialize os dados
                    lanes[currentSummonerTeamPosition] = {
                        total: 1,
                        wins: didWin ? 1 : 0,
                        losses: didWin ? 0 : 1
                    };
                }
            });
        }

        // Calcula a winrate para cada posição da equipe
        Object.keys(lanes).forEach(position => {
            const { wins, total } = lanes[position];
            lanes[position].winrate = wins / total;
        });

        return lanes;
    };

    const laneStatsData = laneStats();

    // Encontre a posição mais jogada (com base no número total de partidas)
    const mostPlayedLane = Object.keys(laneStatsData).reduce((prev, curr) => (
        laneStatsData[curr].total > laneStatsData[prev].total ? curr : prev
    ));

    // Se você quiser armazenar a posição mais jogada e sua winrate em variáveis separadas,
    // você pode fazer algo assim:
    const mostPlayedLanePosition = mostPlayedLane;
    const mostPlayedLaneWinrate = laneStatsData[mostPlayedLane].winrate;

    // Obtendo o caminho do ícone com base na posição
    const iconPath = `/lanes/${mostPlayedLanePosition.toLowerCase()}.png`;

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

    // Retorno
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Posição Mais Jogada</h2>
            <img src={iconPath} alt={mostPlayedLanePosition} style={styles.icon} />
            <div style={styles.info}>
                <p>Posição: {mostPlayedLanePosition}</p>
                <p>Winrate: {(mostPlayedLaneWinrate * 100).toFixed()}%</p>
            </div>
        </div>
    );
};

export default Role;
