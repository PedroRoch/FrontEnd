// src/components/Vehicles/VehicleList.js
import React, { useEffect, useState } from 'react';
import { getVehicles, deleteVehicle } from '../../services/api';
import { Button, Grid, Typography, Card, CardContent, CardActions, Container, Box } from '@mui/material';
import io from 'socket.io-client';

const VehicleList = ({ onEdit }) => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();

    const socket = io('http://localhost:3000/vehicles/ws');
    socket.on('vehicle-created', fetchVehicles);
    socket.on('vehicle-updated', fetchVehicles);
    socket.on('vehicle-deleted', fetchVehicles);

    return () => socket.disconnect();
  }, []);

  const fetchVehicles = async () => {
    const response = await getVehicles();
    setVehicles(response.data);
  };

  const handleDelete = async (id) => {
    await deleteVehicle(id);
    fetchVehicles();
  };

  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>Veículos</Typography>
      </Box>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {vehicles.map(vehicle => (
          <Grid item key={vehicle.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)}</Typography>
                <Typography color="textSecondary">Placa: {vehicle.plate}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => onEdit(vehicle)}>Editar</Button>
                <Button size="small" color="secondary" onClick={() => handleDelete(vehicle.id)}>Excluir</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VehicleList;
