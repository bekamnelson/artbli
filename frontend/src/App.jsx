import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './pages/acceuil';
import Boutique from './pages/boutique';
import Login from './pages/login';
import Formulaire from './pages/formulaire'; 
import Admin from './pages/Admin'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Formulaire />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;