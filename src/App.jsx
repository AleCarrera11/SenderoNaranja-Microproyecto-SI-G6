import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './pages/Home/HomePage.jsx';
import Login from './pages/Login/Login.jsx';
import Registration from './pages/Registration/RegistrationForm.jsx';
import Destinos from  './pages/Destinos/Destinos.jsx';
import SobreNosotros from './pages/SobreNosotros/SobreNosotros.jsx';
import Perfil from './pages/Perfil/Perfil.jsx';
import PerfilActividad from './pages/PerfilActividad/PerfilActividad.jsx';
import Calendario from './pages/Calendario/Calendario.jsx';
import { Navigation1 } from './pages/components/Navigation/Navigation1.jsx';
import Protected from './pages/components/Proctected.jsx';

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route element={<Navigation1/>}>
          <Route path="/" element={<HomePage />} />
          
            <Route path="/destinos" element={<Destinos />} />
            <Route path="/about" element={<SobreNosotros />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/sabasnieves" element={<PerfilActividad />} />
            <Route path="/calendario" element={<Calendario />} />
          
        </Route>
      </Routes>
    </Router>
  );
}


