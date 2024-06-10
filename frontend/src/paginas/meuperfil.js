import React from "react";
import RankedDetails from "../componentes/elo";
import RecentPlayedChampions from "../componentes/jogados-recentemente/jogados-recentemente";
import Banner from "../componentes/banner/banner";
import Duos from "../componentes/duo/duo";
import Role from "../componentes/role/role";

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
      <Duos/>
      <Role/>
    </div>
  );
};

export default MeuPerfil;
