import React from 'react';
import { champMaisUsado } from '../../signals/signalsUser';
import LabGGIcon from '../icon/icone';
import UpdateButton from '../update/update';
import Role from '../role/role';
import RecentPlayedChampions from '../jogados-recentemente/jogados-recentemente';


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
                <div style={{ marginRight: '20px' }}><LabGGIcon /></div> {/* Adicionando margem entre LabGGIcon e UpdateButton */}
                <UpdateButton/>
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}> {/* Posicionando a Role no canto superior direito */}
                    <Role/>
                </div>
                <div style={{ marginTop: '20px' }}><RecentPlayedChampions/></div> {/* Adicionando espaçamento entre LabGGIcon e RecentPlayedChampions */}
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
