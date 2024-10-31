import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import UploadApp from './Uploadapp';
import ContactUs from './ContactUs';
import './App.css';
import {
  AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box,
  IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Apps as AppsIcon,
  Mail as MailIcon
} from '@mui/icons-material';
import logo from './img/images.jpeg';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const Header = () => {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>

          <Box className="JSLogo">
          <img src={logo} alt="JOESTAR Logo" className="header-logo" />
          <Typography variant="h6" component="div" className="header-title">
            JOESTARs
          </Typography>
        </Box>
        </Toolbar>
      </AppBar>
    );
  };

  const DrawerMenu = () => (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/Uploadapp">
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="App" />
        </ListItem>
        <ListItem button component={Link} to="/ContactUs">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </Drawer>
  );

  const Footer = () => (
    <footer className="footer">
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} My Data Analysis App. All rights reserved.
      </Typography>
    </footer>
  );

  return (
    <Router>
      <div className="App">
        <Header />
        <DrawerMenu />
        <Container maxWidth="lg" className="main">
  
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Uploadapp" element={<UploadApp />} />
                <Route path="/ContactUs" element={<ContactUs />} />
              </Routes>
            
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
