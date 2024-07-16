import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useSignals } from '@preact/signals-react/runtime';
import { findMostPlayedChampions, handleSearch } from '../util/util';
import { champMaisUsado, loading, nickName, tag } from '../signals/signalsUser';
import LoadingComponent from './loading/loading';
import { IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Menu = () => {
	useSignals();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await handleSearch(nickName.value, tag.value);

		// Atualiza championName após a busca
		const newChampionName = findMostPlayedChampions();
		champMaisUsado.value = newChampionName[0][0];
		console.log('novo', champMaisUsado.value);
	};

	return (
		<Box
			component='div'
			sx={{
				display: 'flex',
				alignItems: 'center',
				padding: 2,
				backgroundColor: 'background.paper',
				boxShadow: 3,
				borderRadius: 2,
				width: '100%',
				justifyContent: 'space-between',
			}}
		>
			<NavLink to='/'>
				<Box
					component='img'
					src='/favicon.ico'
					alt='Logo'
					sx={{ height: 50, width: 50, borderRadius: 3 }}
				/>
			</NavLink>
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'flex',
					alignItems: 'center',
					flexGrow: 1,
					marginLeft: 15,
				}}
			>
				<TextField
					id='game-name-input'
					label='Nick'
					variant='outlined'
					value={nickName.value}
					onChange={(e) => (nickName.value = e.target.value)}
					sx={{
						flexBasis: '45%',
						marginRight: 1,
						'& .MuiOutlinedInput-root': {
							borderRadius: 3,
						},
					}}
				/>
				<TextField
					id='tag-line-input'
					label='Tag'
					variant='outlined'
					value={tag.value}
					onChange={(e) => (tag.value = e.target.value)}
					sx={{
						flexBasis: '15%',
						marginRight: 1,
						'& .MuiOutlinedInput-root': {
							borderRadius: 3,
						},
					}}
				/>
				{/* <Button
                    type="submit"
                    variant="contained"
                    disabled={loading.value}
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                </Button> */}
				<IconButton
					type='submit'
					variant='contained'
					disabled={loading.value}
					sx={{
						'&:hover': {
							backgroundColor: '#fff',
						},
					}}
				>
					<SearchIcon />
				</IconButton>
			</form>

			<LoadingComponent open={loading.value} />
		</Box>
	);
};

export default Menu;
