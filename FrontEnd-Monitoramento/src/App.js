// src/App.js

import React, { useState } from 'react';
import { Container, Button, ThemeProvider, createTheme, CssBaseline, Typography, Box, Tabs, Tab } from '@mui/material';
// Importando os componentes do Material-UI Lab para abas
import { TabContext, TabList, TabPanel } from '@mui/lab';
import VehicleList from './components/Vehicles/VehicleList';
import VehicleForm from './components/Vehicles/VehicleForm';
import DriverList from './components/Drivers/DriverList';
import DriverForm from './components/Drivers/DriverForm';
import TravelList from './components/Travels/TravelList';
import TravelForm from './components/Travels/TravelForm';

// Criação de um tema personalizado para a aplicação
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
  // Estado para controle da aba selecionada
  const [value, setValue] = useState('1');
  const [openVehicleForm, setOpenVehicleForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [openDriverForm, setOpenDriverForm] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const [openTravelForm, setOpenTravelForm] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState(null);

  // Função para mudança de aba
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Funções para abrir os formulários
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

  // Funções para fechar os formulários
  const handleCloseVehicleForm = () => setOpenVehicleForm(false);
  const handleCloseDriverForm = () => setOpenDriverForm(false);
  const handleCloseTravelForm = () => setOpenTravelForm(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" component="div">Gestão de Veículos, Motoristas e Viagens</Typography>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {/* Lista de Abas */}
            <TabList onChange={handleChange} aria-label="tabs">
              <Tab label="Motoristas" value="1" />
              <Tab label="Veículos" value="2" />
              <Tab label="Viagens" value="3" />
            </TabList>
          </Box>
          {/* Painel de Abas */}
          <TabPanel value="1">
            <Button variant="contained" color="primary" onClick={() => handleOpenDriverForm()}>
              Cadastrar Motorista
            </Button>
            <DriverList onEdit={handleOpenDriverForm} />
            <DriverForm open={openDriverForm} handleClose={handleCloseDriverForm} driver={selectedDriver} />
          </TabPanel>
          <TabPanel value="2">
            <Button variant="contained" color="primary" onClick={() => handleOpenVehicleForm()}>
              Cadastrar Veículo
            </Button>
            <VehicleList onEdit={handleOpenVehicleForm} />
            <VehicleForm open={openVehicleForm} handleClose={handleCloseVehicleForm} vehicle={selectedVehicle} />
          </TabPanel>
          <TabPanel value="3">
            <Button variant="contained" color="primary" onClick={() => handleOpenTravelForm()}>
              Cadastrar Viagem
            </Button>
            <TravelList onEdit={handleOpenTravelForm} />
            <TravelForm open={openTravelForm} handleClose={handleCloseTravelForm} travel={selectedTravel} />
          </TabPanel>
        </TabContext>
      </Container>
    </ThemeProvider>
  );
}

export default App;
