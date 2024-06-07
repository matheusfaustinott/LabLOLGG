import React from "react";
import RankedDetails from "../componentes/elo";

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
    </div>
  );
};

export default MeuPerfil;
