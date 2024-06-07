import React from 'react';
import { champMaisUsado, matches, summoner } from '../../signals/signalsUser';
import { useSignals } from '@preact/signals-react/runtime';
import versao from '../../signals/versao';

const RecentPlayedChampions = () => {
    useSignals();

    // Lógica para encontrar os campeões mais jogados
    const findMostPlayedChampions = () => {
        const championsCount = {};

        // Verifica se summoner e matches estão definidos
        if (summoner.value && matches.value) {
            matches.value.forEach(match => {
                match.info.participants.forEach(participant => {
                    if (participant.puuid === summoner.value.puuid) {
                        const championName = participant.championName;
                        championsCount[championName] = (championsCount[championName] || 0) + 1;
                    }
                });
            });
        }

        // Ordenar os campeões por número de ocorrências
        const sortedChampions = Object.entries(championsCount).sort((a, b) => b[1] - a[1]);

        // Retornar os três campeões mais jogados
        return sortedChampions.slice(0, 3);
    };

    const mostPlayedChampions = findMostPlayedChampions();
    console.log('3camps', mostPlayedChampions[0][0])
    champMaisUsado.value = mostPlayedChampions;
    
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Campeões jogados recentemente</h2>
            <div style={styles.championsContainer}>
                {mostPlayedChampions.map(([championName]) => (
                    
                    <img
                        key={championName}
                        src={`https://ddragon.leagueoflegends.com/cdn/${versao.value}/img/champion/${championName}.png`}
                        alt={championName}
                        style={styles.championImage}
                    />
                    
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '402px',
        height: '140px',
        borderRadius: '35px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        boxSizing: 'border-box'
    },
    title: {
        textAlign: 'center',
        marginBottom: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#333'
    },
    championsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    },
    championImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%'
    }
};

export default RecentPlayedChampions;
