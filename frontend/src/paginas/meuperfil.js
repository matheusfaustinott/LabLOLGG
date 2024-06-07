import React from "react";
import RankedDetails from "../componentes/elo";
import RecentPlayedChampions from "../componentes/jogados-recentemente/jogados-recentemente";
import Banner from "../componentes/banner/banner";

const MeuPerfil = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <RankedDetails />
      <RecentPlayedChampions/>
      <Banner/>
    </div>
  );
};

export default MeuPerfil;
