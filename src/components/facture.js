import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { DataGrid } from '@mui/x-data-grid';

const Facture = () => {

  const [factures, setFactures] = useState([]);
  const [clients, setClient] = useState([])

  const rows = factures

  console.log(rows)

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
  { field: 'ref', headerName: 'Référence', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'price', headerName: 'Prix', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'customer', headerName: 'Client', width: 150 },
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

  useEffect(() => {
    getData()
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
    .then(data => setFactures(data.map((elem) => {return {...elem, deleteButton: deleteButton(elem.id)}})))
    .then(data => setFactures(data.map((elem) => {return {...elem, updateButton: updateButton(elem.id)}})))
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
    <div>
      <h1 className='signup'>Facture</h1>
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
        sx={{mr: 1}}
      />
      <TextField
        id="status"
        label="Status"
        type=""
        autoComplete="current-status"
        onChange={(e) => updateForm({ status: e.target.value })}
        sx={{mr: 1}}
      />
        <FormControl>
        <InputLabel id="">Customer</InputLabel>
        <Select
          label="Customer"
          id=""
          onChange={(e) => updateForm({ ref: e.target.value })}
          style = {{width: 150}}
        >
          { clients.map((client) => {
            return(
              <MenuItem value={client.id}>{client.firstName}</MenuItem>
            )
          })}
        </Select>
        </FormControl>
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{ml: 1, mt: 1}}
      >Créer une facture</Button>
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

export default Facture;