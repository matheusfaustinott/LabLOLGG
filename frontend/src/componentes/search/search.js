import React from 'react';
import TextField from '@mui/material/TextField';
import { Search as SearchIcon } from '@mui/icons-material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import { loading, nickName, tag } from '../../signals/signalsUser';
import LoadingComponent from '../loading/loading';
import { AoVivo, handleSearch } from '../../util/util';
import { useSignals } from '@preact/signals-react/runtime';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

const SearchForm = () => {
	useSignals();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		loading.value = true;
		await handleSearch(nickName.value, tag.value);
		await AoVivo(nickName.value, tag.value);
		loading.value = false;
		navigate('/meuperfil');
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<FormControl component='fieldset'>
					<FormGroup row>
						<TextField
							fullWidth
							margin='normal'
							id='name-input'
							label='Nome de Invocador'
							variant='outlined'
							value={nickName.value}
							onChange={(e) => (nickName.value = e.target.value)}
							sx={{
								flexBasis: '65%',
								'& .MuiOutlinedInput-root': {
									borderRadius: 3,
								},
							}}
						/>
						<TextField
							margin='normal'
							id='tag-input'
							label='#'
							variant='outlined'
							value={tag.value}
							onChange={(e) => (tag.value = e.target.value)}
							sx={{
								flexBasis: '25%',
								'& .MuiOutlinedInput-root': {
									borderRadius: 3,
								},
							}}
						/>
						<IconButton
							type='submit'
							variant='contained'
							disabled={loading.value}
							sx={{
								flexBasis: '10%',
								'&:hover': {
									backgroundColor: '#fff',
								},
							}}
						>
							<SearchIcon />
						</IconButton>
					</FormGroup>
					{/* <Button type='submit' variant='contained' disabled={loading.value}>
						Buscar
					</Button> */}
				</FormControl>
			</form>
			<LoadingComponent open={loading.value} />
		</div>
	);
};

export default SearchForm;
