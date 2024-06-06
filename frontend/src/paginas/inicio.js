import React from 'react';
import { Grid } from '@mui/material';

import SearchForm from '../componentes/search/search';

const Inicio = () => {
    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8} md={6} lg={4}>
                {/* <Menu /> */}
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={8} container alignItems="center" justifyContent="center">
                <SearchForm />
            </Grid>
        </Grid>
    );
};

export default Inicio;
