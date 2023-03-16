import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { useState } from 'react';

const Navbar = () => {

  function refreshPage(){ 
    window.location.reload(); 
  }

  const [isOpen, setIsOpen] = useState(false)

  const DrawerHeader = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }));

  return (
    <>
      <Drawer
        variant="permanent"
        anchor='left'
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Box sx={{ width: 250 }}
          role="presentation"
        >
          <DrawerHeader>
            <IconButton onClick={() => setIsOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <List>
            <ListItem disablePadding component={Link} to='/client'>
              <ListItemButton>
                <ListItemIcon>
                  <PeopleAltOutlinedIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ style: { color: "#2c2c2c"} }} primary="Client" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding component={Link} to='/facture'>
              <ListItemButton>
                <ListItemIcon>
                  <ReceiptLongOutlinedIcon />
                </ListItemIcon>
                <ListItemText  primaryTypographyProps={{ style: { color: "#2c2c2c"} }} primary="Facture" />
              </ListItemButton>
            </ListItem>
            <Divider />
          </List>
        </Box>


      </Drawer >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => setIsOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" sx={{ mr: 2 }} component={Link} to='/client' style={{ textDecoration: 'none' }}>
              Client
            </Typography>
            <Typography variant="h6" color="inherit" component={Link} to='/facture' style={{ textDecoration: 'none' }}>
              Facture
            </Typography>
        <Typography variant="h6" color="inherit" sx={{ml: 130}}>
        {localStorage.getItem('user')}
      </Typography>
      <div>
      {localStorage.getItem('user') &&
      <Button 
        variant="outlined"
        sx={{color: "red"}}
        onClick={() => {localStorage.removeItem('user'); refreshPage()}}
        >Se déconnecter</Button>}
      </div>  
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;