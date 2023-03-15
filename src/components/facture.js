import React, { useState } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

const Facture = () => {

  const [form, setForm] = useState({
    ref: "",
    montant: "",
    status: "",
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
        ref: "",
        montant: "",
        status: "",
      }))
  }

  return (
    <>
      <h1 className='signup'>Client</h1>
      <TextField
        id="ref"
        label="Référence"
        type=""
        autoComplete="current-ref"
        onChange={(e) => updateForm({ firstName: e.target.value })}
        sx={{mr: 1}}
      />
      <TextField
        id="montant"
        label="Montant"
        type=""
        autoComplete="current-montant"
        onChange={(e) => updateForm({ firstName: e.target.value })}
        sx={{mr: 1}}
      />
      <TextField
        id="status"
        label="Status"
        type=""
        autoComplete="current-status"
        onChange={(e) => updateForm({ firstName: e.target.value })}
        sx={{mr: 1}}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ml: 1, mt: 1}}
      >Créer une facture</Button>
    </>
  )
}

export default Facture;