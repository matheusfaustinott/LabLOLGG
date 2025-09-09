import React from 'react';
import LabGGIcon from '../icon/icone';
import UpdateButton from '../update/update';
import Role from '../role/role';
import RecentPlayedChampions from '../jogados-recentemente/jogados-recentemente';
import { findMostPlayedChampions } from '../../util/util';


const Banner = () => {
    const championName = findMostPlayedChampions();
    console.log('@',championName[0])
    const backgroundImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName[0][0]}_0.jpg`;

    return (
        <div style={{ ...styles.banner, backgroundImage: `url(${backgroundImageUrl})` }}>
            <div style={styles.overlay}></div>
            <div style={styles.content}>
                <div style={{ marginRight: '20px' }}><LabGGIcon /></div> 
                <UpdateButton/>
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                    <Role/>
                </div>
                <div style={{ marginTop: '20px' }}><RecentPlayedChampions/></div> 
            </div>
        </div>
    );
};

const styles = {
    banner: {
        width: '100%',
        height: '300px',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundAttachment: 'fixed',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        overflow: 'hidden',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(1px)', 
        zIndex: 1,
    },
    content: {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        width: '100%',
        padding: '0 20px',
    },
};

export default Banner;
