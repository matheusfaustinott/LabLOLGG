import React from "react";
import {
  Grid,
  Typography,
  Box,
  styled,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { elo } from "../../signals/signalsUser";
import { useSignals } from "@preact/signals-react/runtime";

// Definindo estilos usando styled
const Container = styled(Box)(({ theme }) => ({
  width: 421,
  height: 201,
  borderRadius: 21,
  border: "1px solid #ccc",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "auto",
}));

const Image = styled("img")(({ theme }) => ({
  width: 80,
  height: "auto",
  marginRight: theme.spacing(2),
}));

const Details = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

const WinLoss = styled(Box)(({ theme }) => ({
  textAlign: "left",
  marginTop: theme.spacing(1),
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
  const winRate = ((soloRank.wins / totalGames) * 100).toFixed(2);

  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <ImageList>
            <ImageListItem>
              <img src={`./rankd/DIAMOND.png`} alt={soloRank.tier} />
            </ImageListItem>
          </ImageList>
          <Image src={`./rankd${soloRank.tier}.png`} alt={soloRank.tier} />
        </Grid>
        <Grid item>
          <Details>
            <Typography variant="h6">
              {soloRank.tier} {soloRank.rank}
            </Typography>
            <Typography variant="body1">{soloRank.leaguePoints} PDL</Typography>
          </Details>
        </Grid>
      </Grid>
      <WinLoss>
        <Typography variant="body2">
          {soloRank.wins}W / {soloRank.losses}L
        </Typography>
        <Typography variant="body2">
          Winrate: {winRate}% - Total de partidas: {totalGames}
        </Typography>
      </WinLoss>
    </Container>
  );
};

export default RankedDetails;
