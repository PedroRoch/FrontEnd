// src/App.js
import React, { useState } from 'react';
import { Container, Button, ThemeProvider, createTheme, CssBaseline, Typography, Box } from '@mui/material';
import VehicleList from './components/VehicleList';
import VehicleForm from './components/VehicleForm';
import DriverList from './components/DriverList';
import DriverForm from './components/DriverForm';
import TravelList from './components/TravelList';
import TravelForm from './components/TravelForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#d32f2f',
    },
  },
  typography: {
    h4: {
      margin: '16px 0',
    },
  },
});

function App() {
  const [openVehicleForm, setOpenVehicleForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [openDriverForm, setOpenDriverForm] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const [openTravelForm, setOpenTravelForm] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState(null);

  const handleOpenVehicleForm = (vehicle = null) => {
    setSelectedVehicle(vehicle);
    setOpenVehicleForm(true);
  };

  const handleOpenDriverForm = (driver = null) => {
    setSelectedDriver(driver);
    setOpenDriverForm(true);
  };

  const handleOpenTravelForm = (travel = null) => {
    setSelectedTravel(travel);
    setOpenTravelForm(true);
  };

  const handleCloseVehicleForm = () => setOpenVehicleForm(false);
  const handleCloseDriverForm = () => setOpenDriverForm(false);
  const handleCloseTravelForm = () => setOpenTravelForm(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" component="div">Gestão de Veículos e Motoristas</Typography>
        <Box mb={4}>
          <Button variant="contained" color="primary" onClick={() => handleOpenVehicleForm()}>Cadastrar Veículo</Button>
          <VehicleList onEdit={handleOpenVehicleForm} />
          <VehicleForm open={openVehicleForm} handleClose={handleCloseVehicleForm} vehicle={selectedVehicle} />
        </Box>

        <Box mb={4}>
          <Button variant="contained" color="primary" onClick={() => handleOpenDriverForm()}>Cadastrar Motorista</Button>
          <DriverList onEdit={handleOpenDriverForm} />
          <DriverForm open={openDriverForm} handleClose={handleCloseDriverForm} driver={selectedDriver} />
        </Box>

        <Box mb={4}>
          <Button variant="contained" color="primary" onClick={() => handleOpenTravelForm()}>Cadastrar Viagem</Button>
          <TravelList onEdit={handleOpenTravelForm} />
          <TravelForm open={openTravelForm} handleClose={handleCloseTravelForm} travel={selectedTravel} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
