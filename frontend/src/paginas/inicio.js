import React from 'react';
import SearchForm from '../componentes/search/search';
const Inicio = () => {
    return (
        <div 
            style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh' 
            }}
        >
            <SearchForm />
        </div>
    );
};

export default Inicio;
