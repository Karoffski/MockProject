import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Facture = () => {

  const [factures, setFactures] = useState([]);
  const [search, setSearch] = useState(``);
  const [clients, setClient] = useState([])

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    console.log('i fire once');
    const fetchCustomerData = async () => {
      await fetch("http://localhost:8080/api/customers")
        .then((response) => response.json())
        .then((data) => setClient(data));
    }

    // call the function
    fetchCustomerData();
    return () => console.log('my effect is destroying');
  }, [])

  const getData =  () => {
    fetch("http://localhost:8080/api/invoices", {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }})
    .then(res => res.json())
    .then(data => setFactures(data))
  }

  const [form, setForm] = useState({
    ref: "",
    price: "",
    status: "",
    customer: ""
  })

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const newFacture = { ...form };

    await fetch("http://localhost:8080/api/invoices", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFacture)
    })
      .catch(error => window.alert(error))
      .then(setForm({
        ref: "",
        price: "",
        status: "",
        customer: ""
      }))
      window.location.reload();
  }

  return (
    <>
      <h1 className='signup'>Facture</h1>
      <TextField style = {{width: 1000}} onChange={e => setSearch(e.target.value)}/><br></br><br></br>
      <TextField
        id="ref"
        label="Ref"
        type=""
        autoComplete="current-ref"
        onChange={(e) => updateForm({ ref: e.target.value })}
        sx={{mr: 1}}
      />
      <TextField
        id="price"
        label="Price"
        type=""
        autoComplete="current-price"
        onChange={(e) => updateForm({ price: e.target.value })}
        sx={{mr: 6}}
      />
      <TextField
        id="status"
        label="Status"
        type=""
        autoComplete="current-status"
        onChange={(e) => updateForm({ status: e.target.value })}
        sx={{mr: 1}}
      />
        <InputLabel id="demo-simple-select-standard-label">Customer</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value=""
          onChange={(e) => updateForm({ ref: e.target.value })}
          label="Customer"
          style = {{width: 200}}
        >
          { clients.map((client) => {
            return(
              <MenuItem value={client.id}>{client.firstName}</MenuItem>
            )
          })}
        </Select>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ml: 1, mt: 1}}
      >Créer une facture</Button>
      {factures
      .filter(facture => facture.ref.toLowerCase().includes(search.toLocaleLowerCase()))
      .map((facture, index) => {
  return(
    <div className='facture' key={index}>
      <p>{facture.ref}</p>
      <p>{facture.price}</p>
      <p>{facture.status}</p>
      <Button
        variant="contained"
      >X</Button>
      </div>
    )
  })}
    </>
  )
}

export default Facture;