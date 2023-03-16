import * as React from 'react';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Dashboard = () => {

  const exampleData = {
    labels: ['Payé', 'Envoyé','En retard'],
    datasets: [
      {
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(51, 179, 90, 0.8)',
          'rgb(240, 173, 78, 0.8)',
          'rgba(204, 51, 0, 0.8)',
        ],
        borderColor: [
          'rgba(51, 179, 90, 1)',
          'rgb(240, 173, 78, 1)',
          'rgba(204, 51, 0, 1)',,
        ],
        borderWidth: 1,
      },
    ],
  };

  const [clients, setClient] = useState([])
  const [factures, setFactures] = useState([])
  const [numClient, setNumClient] = useState(0)
  const [totalInvoice, setTotalInvoice] = useState(0)
  const [data, setData] = useState(exampleData)

  const options = {
    responsive: true,
    plugins: {
       title: {
          display: true,
          text: 'Factures selon le status'
        }
     }
  }

  console.log('component mount');

  useEffect(() => {
    console.log('i fire once');
    const fetchCustomerData = async () => {
      await fetch("http://localhost:8080/api/customers")
        .then((response) => response.json())
        .then((data) => setClient(data));
    }

    const fetchInvoiceData = async () => {
      await fetch("http://localhost:8080/api/invoices")
        .then((response) => response.json())
        .then((data) => setFactures(data));
    }

    // call the function
    fetchCustomerData();
    fetchInvoiceData();
    return () => console.log('my effect is destroying');
  }, [])


  useEffect(() => {
    clients && setNumClient(clients.length);
    factures.length !==0 &&  
    setTotalInvoice(factures.reduce(function (prev, curr) {
      return prev + curr.price
    }, 0));
    const late = factures.filter(ele=> ele.status == "LATE").length;
    const payed = factures.filter(ele=> ele.status == "PAYED").length;
    const sent = factures.filter(ele=> ele.status == "SENT").length;
    setData({
      labels: ['Payé', 'Envoyé','En retard'],
      datasets: [
        {
          data: [payed, sent, late],
          backgroundColor: [
            'rgba(51, 179, 90, 0.8)',
            'rgb(240, 173, 78, 0.8)',
            'rgba(204, 51, 0, 0.8)',
          ],
          borderColor: [
            'rgba(51, 179, 90, 1)',
            'rgb(240, 173, 78, 1)',
            'rgba(204, 51, 0, 1)',,
          ],
          borderWidth: 1,
        },
      ],
    });

  }, [clients, factures])

  return (

    <Container sx={{ paddingTop: 2 }}>

      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <PeopleAltOutlinedIcon sx={{ fontSize: 66 }} color="secondary" />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Nombre De Clients
                  </Typography>
                  <Typography sx={{ fontSize: 35, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                  {numClient}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <Button href="/client" variant="outlined" color="secondary">Liste des clients</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <ReceiptLongOutlinedIcon sx={{ fontSize: 66 }} color="secondary" />
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                    Montant total
                  </Typography>
                  <Typography sx={{ fontSize: 35, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                  {totalInvoice} €
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>

            <CardActions>
              <Button href="/facture" variant="outlined" color="secondary">Liste des factures</Button>
            </CardActions>
          </Card>
        </Grid>
        </Grid>
        <Grid container sx={{ paddingTop: 2 }} alignItems="center" justifyContent="center">
          <Card sx={{ width: 300 }}>
          <Doughnut data={data} options={options} />
          </Card>
      </Grid>
    </Container>

  );



}

export default Dashboard;