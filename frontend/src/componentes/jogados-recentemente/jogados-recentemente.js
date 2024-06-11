import React from 'react';
import { champMaisUsado, matches, summoner } from '../../signals/signalsUser';
import { useSignals } from '@preact/signals-react/runtime';
import versao from '../../signals/versao';

const RecentPlayedChampions = () => {
    useSignals();

    // Lógica para encontrar os campeões mais jogados
    const findMostPlayedChampions = () => {
        const championsStats = {};

        // Verifica se summoner e matches estão definidos
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

        // Transformar em array e ordenar por quantidade de partidas
        const sortedChampions = Object.entries(championsStats).sort(([, a], [, b]) => {
            const aTotal = a.wins + a.losses;
            const bTotal = b.wins + b.losses;
            return bTotal - aTotal;
        });

        // Retornar os três campeões mais jogados
        return sortedChampions.slice(0, 3);
    };

    const mostPlayedChampions = findMostPlayedChampions();
    champMaisUsado.value = mostPlayedChampions;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Campeões jogados recentemente</h2>
            <div style={styles.championsContainer}>
                {mostPlayedChampions.map(([championName, stats]) => (
                    <div key={championName} style={styles.championContainer}>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${versao.value}/img/champion/${championName}.png`}
                            alt={championName}
                            style={styles.championImage}
                        />
                        <div style={styles.stats}>
                            <p style={styles.wins}>W: {stats.wins}</p>
                            <p style={styles.losses}>L: {stats.losses}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        opacity: 0.8,
        boxSizing: 'border-box'
    },
    title: {
        textAlign: 'center',
        marginBottom: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff'
    },
    championsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        gap: '20px'
    },
    championContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    championImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%'
    },
    stats: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '5px',
        fontSize: '12px',
        opacity: 0.7
    },
    wins: {
        color: 'green',
        marginRight: '5px'
    },
    losses: {
        color: 'red'
    }
};

export default RecentPlayedChampions;
