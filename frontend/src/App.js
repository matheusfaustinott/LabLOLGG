import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Inicio from './paginas/inicio';
import MeuPerfil from './paginas/meuperfil';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        {/* <Route path="/historico-avancado" element={<HistoricoAvancado />} /> */}
        {/* <Route path="/analise-de-campeoes" element={<AnaliseDeCampeoes />} /> */}
        <Route path="/meuperfil" element={<MeuPerfil />} />
      </Routes>
    </Router>
  );
};

export default App;
