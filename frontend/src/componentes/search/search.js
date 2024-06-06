import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import { loading } from '../../signals/signalsUser';
import LoadingComponent from '../loading/loading';
import { useSignal } from '@preact/signals-react';

const SearchForm = ({ onSearch }) => {
    const gameName = useSignal('');
    const tagLine = useSignal('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSearch(gameName, tagLine); 
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                    <FormGroup row>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="name-input"
                            label="Nome de Invocador"
                            variant="outlined"
                            value={gameName}
                            onChange={(e) => gameName.value = e.target.value}
                            sx={{ flexBasis: '70%' }} // Ajusta a largura conforme necessário
                        />
                        <TextField
                            margin="normal"
                            id="tag-input"
                            label="#"
                            variant="outlined"
                            value={tagLine}
                            onChange={(e) => tagLine.value = e.target.value}
                            sx={{ flexBasis: '30%', marginLeft: 2 }} // Ajusta a largura e adiciona margem
                        />
                    </FormGroup>
                    <Button type="submit" variant="contained" disabled={loading.value}>Buscar</Button>
                </FormControl>
            </form>
            <LoadingComponent open={loading.value}/> 
        </div>
    );
};

export default SearchForm;
