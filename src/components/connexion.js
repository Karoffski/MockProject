import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const Connexion = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newUser = { ...form };

    await fetch("http://localhost:5000", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(res => console.log(res.data))
      .catch(error => window.alert(error))
      .then(setForm({
        email: "",
        password: ""
      }))
      navigate("/")
  }

  return (
    <>
    <div>
      <h1  className='signup'>Connexion</h1>
      <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="current-email"
          onChange={(e) => updateForm({ email: e.target.value })}
        />
        <br></br>
        <TextField
          id="password"
          label="Mot de passe"
          type="password"
          autoComplete="current-password"
          onChange={(e) => updateForm({ password: e.target.value })}
        />
    </div>
    <br></br>
    <div>
        <Button 
        variant="contained"
        onClick={handleSubmit}
        >Se connecter</Button>
        <br></br><br></br>
        <Button 
        component={Link} 
        to='/inscription' 
        variant="contained"
        >Inscription</Button>
    </div>
    </>
  );
}

export default Connexion;