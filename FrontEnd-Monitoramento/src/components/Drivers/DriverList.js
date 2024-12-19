// src/components/Drivers/DriverList.js
import React, { useEffect, useState } from 'react';
import { getDrivers, deleteDriver } from '../../services/api';
import { Button, Grid, Typography, Card, CardContent, CardActions, Container, Box } from '@mui/material';
import io from 'socket.io-client';

const DriverList = ({ onEdit }) => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetchDrivers();

    const socket = io('http://localhost:3000/drivers/ws');
    socket.on('driver-created', fetchDrivers);
    socket.on('driver-updated', fetchDrivers);
    socket.on('driver-deleted', fetchDrivers);

    return () => socket.disconnect();
  }, []);

  const fetchDrivers = async () => {
    const response = await getDrivers();
    setDrivers(response.data);
  };

  const handleDelete = async (id) => {
    await deleteDriver(id);
    fetchDrivers();
  };

  return (
    <Container sx={{ py: 2 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>Motoristas</Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        {drivers.map(driver => (
          <Grid item key={driver.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{driver.name}</Typography>
                <Typography color="textSecondary">CPF: {driver.cpf}</Typography>
                <Typography color="textSecondary">CNH: {driver.cnh}</Typography>
                <Typography color="textSecondary">Status: {driver.status === 'driving' ? 'Dirigindo' : 'Parado'}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => onEdit(driver)}>Editar</Button>
                <Button size="small" color="secondary" onClick={() => handleDelete(driver.id)}>Excluir</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DriverList;
