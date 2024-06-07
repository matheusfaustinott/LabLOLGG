import React from "react";
import { Grid, Typography, Box, styled } from "@mui/material";
import { elo } from "../../signals/signalsUser";
import { useSignals } from "@preact/signals-react/runtime";

// Definindo estilos usando styled
const Container = styled(Box)(({ theme }) => ({
  width: 350,
  height: 180,
  borderRadius: 20,
  border: "1px solid #ccc",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  // margin: "auto",
}));

const Image = styled("img")(({ theme }) => ({
  width: 120,
  height: "auto",
  // marginRight: theme.spacing(2),
}));

const Details = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

const WinLoss = styled(Box)(({ theme }) => ({
  textAlign: "left",
  // marginTop: theme.spacing(),
}));

const RankedDetails = () => {
  useSignals();
  // Filtrando os dados para encontrar o objeto com queueType === 'RANKED_SOLO_5x5'
  const soloRank = elo.value.find(
    (item) => item.queueType === "RANKED_SOLO_5x5"
  );

  if (!soloRank) {
    return (
      <Typography>Nenhuma informação de Ranked Solo encontrada.</Typography>
    );
  }

  // Cálculo do Winrate
  const totalGames = soloRank.wins + soloRank.losses;
  const winRate = ((soloRank.wins / totalGames) * 100).toFixed();

  const winRateColor = (data) => {
    return data !== 50 ? (
      data > 50 ? (
        <span style={{ color: "green" }}>{data}%</span>
      ) : (
        <span style={{ color: "red" }}>{data}%</span>
      )
    ) : (
      <span style={{ color: "blue" }}>{data}%</span>
    );
  };

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Image src={`/rankd/${soloRank.tier}.png`} alt={soloRank.tier} />
        </Grid>
        <Grid item>
          <Details>
            <Typography variant="h6">
              {soloRank.tier} {soloRank.rank}
            </Typography>
            <Typography variant="body1">
              <span style={{ color: "gray" }}>{soloRank.leaguePoints} PDL</span>
            </Typography>
          </Details>
        </Grid>
      </Grid>
      <WinLoss>
        <Typography variant="body2">
          <span style={{ color: "green" }}>{soloRank.wins}W</span> / 
          <span style={{ color: "red" }}> {soloRank.losses}L</span>
        </Typography>
        <Typography variant="body2">
          Winrate: {winRateColor(winRate)} - Total de partidas: <span style={{ color: "blue" }}>{totalGames}</span>
        </Typography>
      </WinLoss>
    </Container>
  );
};

export default RankedDetails;
