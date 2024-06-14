import React from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import { dadosAoVivo, estaAoVivo, gameQueueConfigId } from '../../signals/aoVivoSignals';

const JogadorEmPartida = () => {
    // Use the signals
    useSignals();
    
    // Only render the component if estaAoVivo is true
    if (!estaAoVivo.value) {
        return null;
    }

    return (
        <div style={{ 
            borderRadius: '20px', 
            padding: '10px', 
            backgroundColor: '#f0f0f0', 
            textAlign: 'center' 
        }}>
            Em partida
        </div>
    );
};

export default JogadorEmPartida;
