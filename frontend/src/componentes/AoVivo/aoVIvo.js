import React, { useState } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { dadosAoVivo, estaAoVivo, gameQueueConfigId } from '../../signals/aoVivoSignals';
import { Modal, Box, IconButton } from '@mui/material';

const JogadorEmPartida = () => {
    useSignals();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const CONSTANTES = {
        PARTIDAS: {
            420: 'Ranqueada SoloQ'
        }
    }

    if (!estaAoVivo.value) {
        return null;
    }
    console.log("ao vivo?", gameQueueConfigId.value);

    return (
        <div style={{ 
            borderRadius: '20px', 
            padding: '10px', 
            backgroundColor: '#f0f0f0', 
            textAlign: 'center', 
            position: 'relative' 
        }}>
            Jogando: {CONSTANTES.PARTIDAS[gameQueueConfigId.value]}, Agora!
            <IconButton 
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
                onClick={handleOpen}
            >
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box 
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <h2 id="modal-title">Detalhes da Partida</h2>
                    <p id="modal-description">teste</p>
                </Box>
            </Modal>
        </div>
    );
};

export default JogadorEmPartida;

