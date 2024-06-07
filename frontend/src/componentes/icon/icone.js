import React from 'react';
import { nickName, summoner, tag } from '../../signals/signalsUser';
import { useSignalEffect, useSignals } from '@preact/signals-react/runtime';
import versao from '../../signals/versao';
import { version } from '../../util/util';

const LabGGIcon = () => {
    useSignals();



    useSignalEffect(()=>{
        version()
    });

    if (!summoner.value) {
        return null;
    }

    const { profileIconId, summonerLevel } = summoner.value;
    console.log('profileIconId',profileIconId)

    console.log('versao',versao.value)
    return (
        <div style={styles.container}>
            <img
                src={`https://ddragon.leagueoflegends.com/cdn/${versao.value}/img/profileicon/${profileIconId}.png`}
                alt="Profile Icon"
                style={styles.icon}
            />
            <div style={styles.infoContainer}>
                <div style={styles.nicknameContainer}>
                    <span style={{ ...styles.nickname, textTransform: 'uppercase' }}>{nickName.value}</span>
                    <span style={{...styles.tag, textTransform:'uppercase'}}>#{tag.value}</span>
                </div>
                <div style={styles.level}>
                    Nível {summonerLevel}
                </div>
            </div>
        </div>
    );
};

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
    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    nicknameContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px'
    },
    nickname: {
        fontWeight: 'bold',
        marginRight: '5px',
        color:'#666'
    },
    tag: {
        color: '#666'
    },
    level: {
        fontSize: '14px',
        color: '#333'
    }
};

export default LabGGIcon;
