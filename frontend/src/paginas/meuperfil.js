import React from "react";
import { Box, Grid } from '@mui/material';
import RankedDetails from "../componentes/elo";
import Banner from "../componentes/banner/banner";
import Duos from "../componentes/duo/duo";
import MatchList from "../componentes/historico/historico";
import { useSignals } from "@preact/signals-react/runtime";
import Menu from "../componentes/menus";
import RankedDetailsFlex from "../componentes/elo/flex";
import JogadorEmPartida from "../componentes/AoVivo/aoVIvo";

const MeuPerfil = () => {
  useSignals();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center'
      }}
    >
      {/* Header */}
      <Box sx={{ width: '100%' }}>
        <Menu />
      </Box>
      
      {/* Main Content */}
      <Grid container spacing={2} sx={{ width: '100%', marginTop: 2 }}>
        {/* Banner */}
        <Grid item xs={12}>
          <Banner />
        </Grid>
        
        {/* RankedDetails on the right */}
        <Grid item xs={12} md={4}>
          <RankedDetails />
          <RankedDetailsFlex/>
          <JogadorEmPartida/>
          
          {/* Duos below RankedDetails */}
          <Box sx={{ marginTop: 2 }}>
            <Duos />
          </Box>
        </Grid>
        
        {/* MatchList in the center below the banner */}
        <Grid item xs={12} md={8}>
          <MatchList />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MeuPerfil;
