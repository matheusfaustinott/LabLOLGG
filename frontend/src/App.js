import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Inicio from './paginas/inicio';

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/historico-avancado">Histórico Avançado</Link></li>
          <li><Link to="/analise-de-campeoes">Análise de Campeões</Link></li>
          <li><Link to="/analise-da-minha-conta">Análise da Minha Conta</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        {/* <Route path="/historico-avancado" element={<HistoricoAvancado />} />
        <Route path="/analise-de-campeoes" element={<AnaliseDeCampeoes />} />
        <Route path="/analise-da-minha-conta" element={<AnaliseDaMinhaConta />} />*/}
      </Routes>
    </Router>
  );
};

export default App;
