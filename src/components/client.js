import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

const Client = () => {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email:"",
    adress: ""
  })

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newUser = { ...form };

    await fetch("http://localhost:8080/api/addclient", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .catch(error => window.alert(error))
      .then(setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email:"",
        adress: ""
      }))
  }

  return (
    <>
      <h1 className='signup'>Client</h1>
      <TextField
        id="firstName"
        label="Prénom"
        type=""
        autoComplete="current-firstName"
        onChange={(e) => updateForm({ firstName: e.target.value })}
        sx={{mr: 1}}
      />
      <TextField
        id="lastName"
        label="Nom"
        type=""
        autoComplete="current-lastName"
        onChange={(e) => updateForm({ lastName: e.target.value })}
        sx={{mr: 1}}
      />
      <TextField
        id="phone"
        label="Téléphone"
        type=""
        autoComplete="current-phone"
        onChange={(e) => updateForm({ phone: e.target.value })}
        sx={{mr: 1}}
      />
      <TextField
        id="email"
        label="Email"
        type=""
        autoComplete="current-email"
        onChange={(e) => updateForm({ email: e.target.value })}
        sx={{mr: 1}}
      />
      <TextField
        id="adress"
        label="Adresse"
        type=""
        autoComplete="current-adress"
        onChange={(e) => updateForm({ adress: e.target.value })}
        sx={{mr: 1}}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ml: 1, mt: 1}}
      >Ajouter un client</Button>
    </>
  )
}

export default Client;