import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Connexion from './components/connexion';
import Inscription from './components/inscription';
import Navbar from './components/navbar';
import Client from './components/client';
import Facture from './components/facture';
import Connected from './components/connected';
import './App.css';
import Dashboard from './components/home';

function App() {
  return (
    <div className="App">
      <Router>
      {localStorage.getItem('user') &&
        <Navbar/>
      }
        <Routes>
          <Route path='/' element={<Connexion/>}/>
          <Route path='/home' element={<Dashboard/>}/>
          <Route path='/inscription' element={<Inscription/>}/>
          <Route path='/client' element={<Client/>}/>
          <Route path='/facture' element={<Facture/>}/>
          <Route path='/connexion' element={<Connected/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
