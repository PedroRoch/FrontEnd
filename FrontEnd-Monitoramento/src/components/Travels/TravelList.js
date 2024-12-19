// src/components/Travels/TravelList.js
import React, { useEffect, useState } from 'react';
import { getTravels, deleteTravel, getDrivers, getVehicles } from '../../services/api';
import { Button, Grid, Typography, Card, CardContent, CardActions, Container, Box } from '@mui/material';
import io from 'socket.io-client';

const TravelList = ({ onEdit }) => {
  const [travels, setTravels] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchData();

    const socket = io('http://localhost:3000/travels/ws');
    socket.on('travel-created', fetchData);
    socket.on('travel-updated', fetchData);
    socket.on('travel-deleted', fetchData);

    return () => socket.disconnect();
  }, []);

  const fetchData = async () => {
    const [travelsRes, driversRes, vehiclesRes] = await Promise.all([getTravels(), getDrivers(), getVehicles()]);
    setTravels(travelsRes.data);
    setDrivers(driversRes.data);
    setVehicles(vehiclesRes.data);
  };

  const handleDelete = async (id) => {
    await deleteTravel(id);
    fetchData();
  };

  const getDriverName = (id) => {
    const driver = drivers.find(driver => driver.id === id);
    if (driver) {
      const names = driver.name.split(' ');
      const initial = names[names.length - 1].charAt(0) + '.';
      return `${names[0]} ${initial}`;
    }
    return 'Desconhecido';
  };

  const getVehicleType = (id) => {
    const vehicle = vehicles.find(vehicle => vehicle.id === id);
    return vehicle ? vehicle.type : 'Desconhecido';
  };

  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>Viagens</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {travels.map(travel => (
          <Grid item key={travel.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Viagem</Typography>
                <Typography color="textSecondary">Motorista: {travel.driverId} "{getDriverName(travel.driverId)}"</Typography>
                <Typography color="textSecondary">Veículo: {travel.vehicleId} "{getVehicleType(travel.vehicleId)}"</Typography>
                <Typography color="textSecondary">Status: {travel.status}</Typography>
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
