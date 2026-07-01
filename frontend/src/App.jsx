
import './App.css';
import Acceuil from './pages/acceuil';
import Login from './pages/login';
import Formulaire from './pages/formulaire';
import Boutique from './pages/boutique';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
   return(
   <Router>
       <Routes>
          <Route path='/' element={<Acceuil />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/form' element={<Formulaire />}/>
          <Route path='/boutique' element={<Boutique />}/>
       </Routes>
   </Router>
   
   );
}

export default App;
