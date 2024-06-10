import React from 'react';
import { matches, summoner } from '../../signals/signalsUser';
import { useSignals } from '@preact/signals-react/runtime';

const Duos = () => {
    useSignals();
    
    const acharduos = () => {
        const duosAchados = {};

        // Verifica se summoner e matches estão definidos
        if (summoner.value && matches.value) {
            matches.value.forEach(match => {
                const currentSummonerPuuid = summoner.value.puuid;
                const currentSummonerTeamId = match.info.participants.find(participant => participant.puuid === currentSummonerPuuid).teamId;

                match.info.participants.forEach(participant => {
                    if (participant.puuid !== currentSummonerPuuid && participant.teamId === currentSummonerTeamId) {
                        const duoPuuid = participant.puuid;
                        const didWin = participant.win;
                        const duoName = participant.riotIdGameName;
                        duosAchados[duoPuuid] = duosAchados[duoPuuid] || { riotIdGameName: duoName, wins: 0, losses: 0 };
                        didWin ? duosAchados[duoPuuid].wins++ : duosAchados[duoPuuid].losses++;
                    }
                });
            });
        }

        const sortedDuos = Object.entries(duosAchados).sort(([, a], [, b]) => {
            const aTotal = a.wins + a.losses;
            const bTotal = b.wins + b.losses;
            return bTotal - aTotal;
        });

        return sortedDuos.slice(0, 3);
    };

    const mostPlayedDuos = acharduos();

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Duos jogados recentemente</h2>
            <div style={styles.duosContainer}>
                {mostPlayedDuos.map(([duoPuuid, stats]) => (
                    <div key={duoPuuid} style={styles.duoContainer}>
                        <div style={styles.duosAchados}>
                            <p>Summoner: {stats.riotIdGameName}</p>
                            <p>Wins: {stats.wins}</p>
                            <p>Losses: {stats.losses}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '402px',
        height: 'auto',
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
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    championContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
    },
    championImage: {
        width: '40px',
        height: '40px',
        borderRadius: '50%'
    },
    stats: {
        marginLeft: '10px'
    },
    duosContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    duoContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
    },
    duosAchados: {
        marginLeft: '10px'
    }
};

export default Duos;
