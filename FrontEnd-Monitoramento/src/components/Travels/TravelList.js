// src/components/Travels/TravelList.js

// Importações necessárias do React, API e Material-UI
import React, { useEffect, useState } from 'react';
import { getTravels, deleteTravel, getDrivers, getVehicles } from '../../services/api';
import { Button, Grid, Typography, Card, CardContent, CardActions, Container, Box } from '@mui/material';
import io from 'socket.io-client';

const TravelList = ({ onEdit }) => {
  // Definindo estados locais para armazenar as listas de viagens, motoristas e veículos
  const [travels, setTravels] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Hook useEffect para buscar dados de viagens, motoristas e veículos ao montar o componente
  useEffect(() => {
    fetchData();

    // Configuração do WebSocket para atualizações em tempo real
    const socket = io('http://localhost:3000/travels/ws');
    socket.on('travel-created', fetchData);
    socket.on('travel-updated', fetchData);
    socket.on('travel-deleted', fetchData);

    // Limpeza do WebSocket ao desmontar o componente
    return () => socket.disconnect();
  }, []);

  // Função para buscar dados de viagens, motoristas e veículos da API
  const fetchData = async () => {
    const [travelsRes, driversRes, vehiclesRes] = await Promise.all([getTravels(), getDrivers(), getVehicles()]);
    setTravels(travelsRes.data);
    setDrivers(driversRes.data);
    setVehicles(vehiclesRes.data);
  };

  // Função para lidar com a exclusão de uma viagem
  const handleDelete = async (id) => {
    await deleteTravel(id);
    fetchData();
  };

  // Função para obter o nome do motorista a partir do ID
  const getDriverName = (id) => {
    const driver = drivers.find(driver => driver.id === id);
    return driver ? driver.name : 'Desconhecido';
  };

  // Função para obter o tipo do veículo a partir do ID
  const getVehicleType = (id) => {
    const vehicle = vehicles.find(vehicle => vehicle.id === id);
    return vehicle ? vehicle.type : 'Desconhecido';
  };

  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>Viagens</Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {/* Mapeando e exibindo a lista de viagens */}
        {travels.map(travel => (
          <Grid item key={travel.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Viagem</Typography>
                <Typography color="textSecondary">Motorista: {travel.driverId} "{getDriverName(travel.driverId)}"</Typography>
                <Typography color="textSecondary">Veículo: {travel.vehicleId} "{getVehicleType(travel.vehicleId)}"</Typography>
                <Typography color="textSecondary">Status: {travel.status === 'ongoing' ? 'Em andamento' : 'Concluída'}</Typography>
                <Typography color="textSecondary">Início: {new Date(travel.start).toLocaleString()}</Typography>
                <Typography color="textSecondary">Fim: {travel.end ? new Date(travel.end).toLocaleString() : 'Em andamento'}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => onEdit(travel)}>Editar</Button>
                <Button size="small" color="secondary" onClick={() => handleDelete(travel.id)}>Excluir</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TravelList;
