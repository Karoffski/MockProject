import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {

    return (
    <>
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} component={Link} to='/'>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" sx={{ mr: 2 }} component={Link} to='/client'style={{ textDecoration: 'none' }}>
          Client
        </Typography>
        <Typography variant="h6" color="inherit" component={Link} to='/facture' style={{ textDecoration: 'none' }}>
          Facture
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
  </>
  );
}

export default Navbar;