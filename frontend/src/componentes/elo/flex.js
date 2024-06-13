import React from "react";
import { Grid, Typography, Box, styled } from "@mui/material";
import { elo } from "../../signals/signalsUser";
import { useSignals } from "@preact/signals-react/runtime";
import { useNavigate } from "react-router-dom";

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
}));

const Image = styled("img")(({ theme }) => ({
  width: 80,
  height: "auto",
}));

const Details = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

const WinLoss = styled(Box)(({ theme }) => ({
  textAlign: "left",
}));

const RankedDetailsFlex = () => {
  const navigate = useNavigate();
  useSignals();
  if (!elo.value) {
    navigate("/");
    return null;
  }

  const flexRank = elo.value.find(
    (item) => item.queueType === "RANKED_FLEX_SR"
  );
  console.log("teste0.2", flexRank);

  if (!flexRank) {
    return (
      <Typography>Nenhuma informação de Ranked Flex encontrada.</Typography>
    );
  }

  const totalGames = flexRank.wins + flexRank.losses;
  const winRate = ((flexRank.wins / totalGames) * 100).toFixed();

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
          <Image src={`/rankd/${flexRank.tier}.png`} alt={flexRank.tier} />
        </Grid>
        <Grid item>
          <Details>
            <Typography variant="h6">
              {flexRank.tier} {flexRank.rank}
            </Typography>
            <Typography variant="body1">
              <span style={{ color: "gray" }}>{flexRank.leaguePoints} PDL</span>
            </Typography>
          </Details>
        </Grid>
      </Grid>
      <WinLoss>
        <Typography variant="body2">
          <span style={{ color: "green" }}>{flexRank.wins}W</span> /
          <span style={{ color: "red" }}> {flexRank.losses}L</span>
        </Typography>
        <Typography variant="body2">
          Winrate: {winRateColor(winRate)} - Total de partidas:{" "}
          <span style={{ color: "blue" }}>{totalGames}</span>
        </Typography>
      </WinLoss>
    </Container>
  );
};

export default RankedDetailsFlex;
