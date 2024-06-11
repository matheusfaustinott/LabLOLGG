import React, { useState, useEffect } from 'react';
import { matches, summoner } from '../../signals/signalsUser';
import versao from '../../signals/versao';

const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}m ${seconds}s`;
};

const getTeamColor = (teamId) => (teamId === 100 ? '#9acddc' : '#e8caca');

const getMainAndSecondaryLane = () => {
    const laneCounts = matches.value.reduce((acc, match) => {
        const participant = match.info.participants.find(p => p.puuid === summoner.value.puuid);
        if (participant) {
            acc[participant.teamPosition] = (acc[participant.teamPosition] || 0) + 1;
        }
        return acc;
    }, {});

    const lanesSorted = Object.keys(laneCounts).sort((a, b) => laneCounts[b] - laneCounts[a]);
    const mainLane = lanesSorted[0];
    const secondaryLane = lanesSorted[1] || null;

    return { mainLane, secondaryLane };
};

const getLaneStatus = (currentLane, mainLane, secondaryLane) => {
    if (currentLane === mainLane) {
        return 'Main Lane';
    } else if (currentLane === secondaryLane) {
        return 'Lane Secundária';
    } else {
        return 'AutoFill';
    }
};

const preloadImages = (urls) => {
    return Promise.all(
        urls.map(
            (url) =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = resolve;
                    img.onerror = reject;
                })
        )
    );
};

const MatchCard = ({ match }) => {
    const participant = match.info.participants.find(p => p.puuid === summoner.value.puuid);
    const teamColor = getTeamColor(participant.teamId);
    const gameDuration = formatDuration(match.info.gameDuration);
    const gameVersion = match.info.gameVersion.split('.')[0] + '.' + match.info.gameVersion.split('.')[1];
    const { mainLane, secondaryLane } = getMainAndSecondaryLane();
    const laneStatus = getLaneStatus(participant.teamPosition, mainLane, secondaryLane);

    return (
        <div style={{ backgroundColor: teamColor, padding: '20px', margin: '10px auto', borderRadius: '10px', width: '60%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <strong>{participant.win ? 'Victory' : 'Defeat'}</strong>
                    <div style={{ fontSize: '12px', color: '#555' }}>Duration: {gameDuration}</div>
                    <div style={{ fontSize: '12px', color: '#555' }}>Version: {gameVersion}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={`/lanes/${participant.teamPosition}.png`} alt={participant.teamPosition} style={{ width: '30px', height: '30px' }} />
                        {laneStatus}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${versao.value}/img/champion/${participant.championName}.png`}
                            alt={participant.championName}
                            style={{ width: '50px', height: '50px' }}
                        />
                        <span>{participant.champLevel}</span>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <strong>{participant.kills} / {participant.deaths} / {participant.assists}</strong>
                    <div>Farm: {participant.totalMinionsKilled}</div>
                    <div>Vision Score: {participant.visionScore}</div>
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                    {Array.from({ length: 7 }).map((_, index) => (
                        participant[`item${index}`] !== 0 && (
                            <img
                                key={index}
                                src={`https://ddragon.leagueoflegends.com/cdn/${versao.value}/img/item/${participant[`item${index}`]}.png`}
                                alt={`Item ${index}`}
                                style={{ width: '30px', height: '30px' }}
                            />
                        )
                    ))}
                </div>
            </div>
            <div style={{ marginTop: '10px' }}>
                {participant.doubleKills > 0 && <div>Double Kill</div>}
                {participant.tripleKills > 0 && <div>Triple Kill</div>}
                {participant.quadraKills > 0 && <div>Quadra Kill</div>}
                {participant.pentaKills > 0 && <div>Penta Kill</div>}
            </div>
        </div>
    );
};

const MatchList = ({ version }) => {
    const [matchesToShow, setMatchesToShow] = useState(5);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const imageUrls = matches.value.flatMap(match => {
            const participant = match.info.participants.find(p => p.puuid === summoner.value.puuid);
            const championImg = `https://ddragon.leagueoflegends.com/cdn/${versao.value}/img/champion/${participant.championName}.png`;
            const itemImgs = Array.from({ length: 7 }).map((_, index) => {
                return participant[`item${index}`] !== 0 ? `https://ddragon.leagueoflegends.com/cdn/${versao.value}/img/item/${participant[`item${index}`]}.png` : null;
            }).filter(url => url !== null);
            return [championImg, ...itemImgs];
        });

        preloadImages(imageUrls).then(() => {
            setImagesLoaded(true);
        }).catch(err => {
            console.error("Error loading images", err);
            setImagesLoaded(true); // Optionally allow rendering even if some images fail to load
        });
    }, []);

    const handleLoadMore = () => {
        setMatchesToShow(prev => prev + 5);
    };

    if (!imagesLoaded) {
        return <div>Loading images...</div>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
            {matches.value.slice(0, matchesToShow).map(match => (
                <MatchCard key={match.metadata.matchId} match={match} version={version} />
            ))}
            {matchesToShow < matches.value.length && (
                <button onClick={handleLoadMore}>Carregar Mais</button>
            )}
            {matchesToShow >= matches.value.length && (
                <div>Já carregou todas as partidas disponíveis.</div>
            )}
        </div>
    );
};

export default MatchList;
