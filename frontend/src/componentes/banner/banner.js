import React from 'react';
import { champMaisUsado } from '../../signals/signalsUser';
import LabGGIcon from '../icon/icone';


const Banner = () => {
    if (!champMaisUsado.value || champMaisUsado.value.length === 0) {
        return null;
    }

    const championName = champMaisUsado.value[0][0];
    const backgroundImageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`;

    return (
        <div style={{ ...styles.banner, backgroundImage: `url(${backgroundImageUrl})` }}>
            <div style={styles.overlay}></div>
            <div style={styles.content}>
                <LabGGIcon />
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
        overflow: 'hidden', // Para garantir que nada ultrapasse as bordas do banner
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(1px)', // Aplica o desfoque
        zIndex: 1,
    },
    content: {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Posiciona o conteúdo à esquerda
        width: '100%',
        padding: '0 20px', // Adiciona espaço à esquerda e à direita
    },
};

export default Banner;
