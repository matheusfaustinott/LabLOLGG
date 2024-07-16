import React from 'react';
import { champMaisUsado } from '../../signals/signalsUser';
import { useSignals } from '@preact/signals-react/runtime';
import versao from '../../signals/versao';
import { findMostPlayedChampions } from '../../util/util';
import { Box, Grid } from '@mui/material';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '10px'
    },
    championsContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
    },
    championContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px'
    },
    championImage: {
        width: '40px',
        height: '40px',
        borderRadius: '10px'
    },
    stats: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px',
        fontSize: '12px',
        gap: '5px',
        borderRadius: '10px'
    }
};

const RecentPlayedChampions = () => {
    useSignals();

    const mostPlayedChampions = findMostPlayedChampions();
    champMaisUsado.value = mostPlayedChampions;

    return (
        <Grid style={styles.container}>
            <span>
                <b>Campeões jogados recentemente</b>
            </span>
            <Box style={styles.championsContainer}>
                {mostPlayedChampions.map(([championName, stats]) => (
                    <Grid key={championName} style={styles.championContainer}>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${versao.value}/img/champion/${championName}.png`}
                            alt={championName}
                            style={styles.championImage}
                        />
                        <Box style={styles.stats}>
                            <span style={{ color: 'green' }}>
                                <b>W: {stats.wins}</b>
                            </span>
                            <span style={{ color: '#b51b16' }}>
                                <b>L: {stats.losses}</b>
                            </span>
                        </Box>
                    </Grid>
                ))}
            </Box>
        </Grid>
    );
};

export default RecentPlayedChampions;
