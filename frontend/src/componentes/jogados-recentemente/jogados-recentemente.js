import React from 'react';
import { champMaisUsado } from '../../signals/signalsUser';
import { useSignals } from '@preact/signals-react/runtime';
import versao from '../../signals/versao';
import { findMostPlayedChampions } from '../../util/util';

const RecentPlayedChampions = () => {
    useSignals();

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
