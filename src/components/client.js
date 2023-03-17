import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const Client = () => {

  const [clients, setClients] = useState([]);

  const rows = clients

  const deleteButton = (elem) => {
    return (
        <strong>
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                    handleDelete(elem.id)
                }}
            >Delete</Button>
        </strong>
    )
}

const updateButton = (elem) => {
  return (
      <strong>
          <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                  handleUpdate(elem.id)
              }}
          >Update</Button>
      </strong>
  )
}

  const columns = [
    { field: 'firstName', headerName: 'Prénom', width: 150 },
    { field: 'lastName', headerName: 'Nom', width: 150 },
    { field: 'phone', headerName: 'Téléphone', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'address', headerName: 'Adresse', width: 150 },
    {
        field: 'delete',
        headerName: '',
        width: 100,
        renderCell: deleteButton,
        disableClickEventBubbling: true
    },
    {
      field: 'update',
      headerName: '',
      width: 100,
      renderCell: updateButton,
      disableClickEventBubbling: true
  }
  ]

  const getData =  () => {
    fetch("http://localhost:8080/api/customers", {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }})
    .then(res => res.json())
    .then(data => setClients(data.map((elem) => {return {...elem, deleteButton: deleteButton(elem.id)}})))
    .then(data => setClients(data.map((elem) => {return {...elem, updateButton: updateButton(elem.id)}})))
  }

  useEffect(() => {
    getData();
  }, [])

  function handleDelete(id){
    fetch(`http://localhost:8080/api/customers/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }})
  }

  function handleUpdate(id){
    fetch(`http://localhost:8080/api/customers/${id}`, {
      method: 'UPDATE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }})
  }

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email:"",
    address: ""
  })

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const newUser = { ...form };

    await fetch("http://localhost:8080/api/customers", {
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
        address: ""
      }))
      window.location.reload();
  }

  return (
    <>
    <div>
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
        onChange={(e) => updateForm({ address: e.target.value })}
        sx={{mr: 1}}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ml: 1, mt: 1}}
      >Ajouter un client</Button>
      </div>
      <div style={{ height: 500, width: '100%' }}><br></br>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
        />
      </div>
    </>
  )
}

export default Client;