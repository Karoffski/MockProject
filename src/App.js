import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Connexion from './components/connexion';
import Inscription from './components/inscription';
import Navbar from './components/navbar';
import Client from './components/client';
import Facture from './components/facture';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Connexion/>}/>
          <Route path='/inscription' element={<Inscription/>}/>
          <Route path='/client' element={<Client/>}/>
          <Route path='/facture' element={<Facture/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
