import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


const Connexion = () => {

  const [open, setOpen] = React.useState(false);

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();

  const handleToClose = () => {
    setOpen(false);
  };

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newUser = { ...form };

    await fetch("http://localhost:8080/api/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('user', data.firstName + " " + data.lastName)
        navigate('/home');
        window.location.reload();
      })
      .catch(error => {
        setOpen(true);
      })

  }

  return (
    <>
      <Snackbar
         ContentProps={{
          sx: {
            background: "red",
            color:"white"
          }
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        open={open}
        autoHideDuration={2000}
        message="Echec Connexion"
        onClose={handleToClose}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleToClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

      <div>
        <h1 className='signup'>Connexion</h1>
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="current-email"
          onChange={(e) => updateForm({ email: e.target.value })}
        /><br></br>
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
          component={Link}
          to='/inscription'
          variant="contained"
          sx={{ mr: 2 }}
        >Inscription</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >Se connecter</Button>
      </div>
    </>
  )
};


export default Connexion;