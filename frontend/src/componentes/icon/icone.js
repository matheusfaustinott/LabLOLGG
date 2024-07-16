import React from 'react';
import { nickName, summoner, tag } from '../../signals/signalsUser';
import { useSignalEffect, useSignals } from '@preact/signals-react/runtime';
import versao from '../../signals/versao';
import { version } from '../../util/util';
import { Box, Grid } from '@mui/material';

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px'
    },
    icon: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '15px'
    },
    nickname: {
        fontWeight: 'bold',
        marginRight: '5px',
        color: '#666',
        textTransform: 'uppercase'
    },
    tag: {
        color: '#666',
        textTransform: 'uppercase'
    },
    level: {
        fontSize: '14px',
        color: '#333'
    }
};

const LabGGIcon = () => {
    useSignals();

    useSignalEffect(() => {
        version();
    });

    if (!summoner.value) {
        return null;
    }

    const { profileIconId, summonerLevel } = summoner.value;
    console.log('profileIconId', profileIconId);

    console.log('versao', versao.value);
    return (
        <Grid style={styles.container}>
            <img
                src={`https://ddragon.leagueoflegends.com/cdn/${versao.value}/img/profileicon/${profileIconId}.png`}
                alt="Profile Icon"
                style={styles.icon}
            />
            <Box>
                <div>
                    <span style={styles.nickname}>{nickName.value}</span>
                    <span style={styles.tag}>#{tag.value}</span>
                </div>
                <span style={styles.level}>Nível {summonerLevel}</span>
            </Box>
        </Grid>
    );
};

export default LabGGIcon;
