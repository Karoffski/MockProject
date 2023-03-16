import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import DataTable from 'react-data-table-component';

const Client = () => {

  const columns = [
    {
        name: 'First Name',
        selector: row => row.firstName,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.lastName,
        sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true,
  },
  {
    name: 'Mail',
    selector: row => row.email,
    sortable: true,
  },
  {
    name: 'Address',
    selector: row => row.address,
    sortable: true,
  },
  {
    name: '',
    selector: row => row.button,
    sortable: true,
  }
];

  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState(``);

  useEffect(() => {
    getData()
  }, [])


  function handleClick(id){
    fetch(`http://localhost:8080/api/deletecustomer/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }})
  }

  const createButton = (id) => {
    return(<Button onClick={() => handleClick(id)} variant="contained">X</Button>)
  }

  const getData =  () => {
    fetch("http://localhost:8080/api/getcustomers", {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }})
    .then(res => res.json())
    .then(data => setClients(data.map((elem) => {return {...elem, button: createButton(elem.id)}})))
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

    await fetch("http://localhost:8080/api/createcustomer", {
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
      <TextField style = {{width: 1000}} onChange={e => setSearch(e.target.value)}/><br></br><br></br>
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
      >Ajouter un client</Button></div>
        <div>
         <DataTable
            columns={columns}
            data={clients.filter(client => client.lastName.toLowerCase().includes(search.toLocaleLowerCase()))}
        />
        </div>
    </>
  )
}

export default Client;
/*
{clients
  .filter(client => client.lastName.toLowerCase().includes(search.toLocaleLowerCase()))
  .map((client, index) => {
return(
<div className='clients' key={index}>
  <p>{client.firstName}</p>
  <p>{client.lastName}</p>
  <p>{client.phone}</p>
  <p>{client.address}</p>
  <p>{client.phone}</p>
  <Button
    variant="contained"
  >X</Button>
  </div>
)
})}*/