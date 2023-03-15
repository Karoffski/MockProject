import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Inscription = () => {

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    adress: ""
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

    await fetch("http://localhost:5000/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .catch(error => window.alert(error))
      .then(setForm({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        adress: ""
      }))
      navigate("/")
  }

  return (
    <div className="form">
      <h1 className='signup'>Inscription</h1>
      <TextField
        id="email"
        label="Email"
        type=""
        autoComplete="current-email"
        onChange={(e) => updateForm({ email: e.target.value })}
      />
      <TextField
        id="firstName"
        label="Prénom"
        type=""
        autoComplete="current-firstName"
        onChange={(e) => updateForm({ firstName: e.target.value })}
      />
      <TextField
        id="lastName"
        label="Nom"
        type=""
        autoComplete="current-lastName"
        onChange={(e) => updateForm({ lastName: e.target.value })}
      />
      <TextField
        id="password"
        label="Mot de passe"
        type="password"
        autoComplete="current-password"
        onChange={(e) => updateForm({ password: e.target.value })}
      />
      <TextField
        id="adress"
        label="Adresse"
        type=""
        autoComplete="current-adress"
        onChange={(e) => updateForm({ adress: e.target.value })}
      />
      <br></br><br></br>
      <Button
        variant="contained"
        onClick={handleSubmit}
      >S'inscrire</Button>
    </div>
  )
}

export default Inscription;