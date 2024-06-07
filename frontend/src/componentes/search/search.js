import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import { loading } from '../../signals/signalsUser';
import LoadingComponent from '../loading/loading';
import { useSignal } from '@preact/signals-react';
import { handleSearch } from '../../util/util';
import { useSignals } from '@preact/signals-react/runtime';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    useSignals();
    const navigate = useNavigate(); // Usando o hook useNavigate

    const gameName = useSignal('');
    const tagLine = useSignal('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        loading.value = true;
        await handleSearch(gameName.value, tagLine.value); 
        loading.value = false;
        navigate('/meuperfil'); // Redirecionar para /meuperfil após a busca
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
                            value={gameName.value}
                            onChange={(e) => gameName.value = e.target.value}
                            sx={{ flexBasis: '70%' }} // Ajusta a largura conforme necessário
                        />
                        <TextField
                            margin="normal"
                            id="tag-input"
                            label="#"
                            variant="outlined"
                            value={tagLine.value}
                            onChange={(e) => tagLine.value = e.target.value}
                            sx={{ flexBasis: '30%', marginLeft: 2 }} // Ajusta a largura e adiciona margem
                        />
                    </FormGroup>
                    <Button type="submit" variant="contained" disabled={loading.value} >Buscar</Button>
                </FormControl>
            </form>
            <LoadingComponent open={loading.value}/> 
        </div>
    );
};

export default SearchForm;
