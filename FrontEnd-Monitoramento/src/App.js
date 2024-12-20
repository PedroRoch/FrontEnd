// src/App.js

// Importações necessárias do React, Material-UI e componentes personalizados
import React, { useState } from 'react';
import { Container, ThemeProvider, createTheme, CssBaseline, Typography, Box, AppBar, Toolbar, Tabs, Tab, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import VehicleList from './components/Vehicles/VehicleList';
import VehicleForm from './components/Vehicles/VehicleForm';
import DriverList from './components/Drivers/DriverList';
import DriverForm from './components/Drivers/DriverForm';
import TravelList from './components/Travels/TravelList';
import TravelForm from './components/Travels/TravelForm';

// Configuração do tema personalizado do Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#d32f2f',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      margin: '16px 0',
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bold',
    },
  },
});

function App() {
  // Estados para gerenciar a aba selecionada e os formulários abertos
  const [value, setValue] = useState('1');
  const [openVehicleForm, setOpenVehicleForm] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [openDriverForm, setOpenDriverForm] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const [openTravelForm, setOpenTravelForm] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState(null);

  // Função para lidar com a mudança de aba
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Funções para abrir os formulários com os dados selecionados (se existirem)
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gestão de Veículos, Motoristas e Viagens
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <TabList onChange={handleChange} aria-label="tabs">
              <Tab label="Motoristas" value="1" />
              <Tab label="Veículos" value="2" />
              <Tab label="Viagens" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Button variant="contained" color="primary" onClick={() => handleOpenDriverForm(null)}>Cadastrar Motorista</Button>
            <DriverList onEdit={handleOpenDriverForm} />
            <DriverForm open={openDriverForm} handleClose={handleCloseDriverForm} driver={selectedDriver} />
          </TabPanel>
          <TabPanel value="2">
            <Button variant="contained" color="primary" onClick={() => handleOpenVehicleForm(null)}>Cadastrar Veículo</Button>
            <VehicleList onEdit={handleOpenVehicleForm} />
            <VehicleForm open={openVehicleForm} handleClose={handleCloseVehicleForm} vehicle={selectedVehicle} />
          </TabPanel>
          <TabPanel value="3">
            <Button variant="contained" color="primary" onClick={() => handleOpenTravelForm(null)}>Cadastrar Viagem</Button>
            <TravelList onEdit={handleOpenTravelForm} />
            <TravelForm open={openTravelForm} handleClose={handleCloseTravelForm} travel={selectedTravel} />
          </TabPanel>
        </TabContext>
      </Container>
    </ThemeProvider>
  );
}

export default App;
