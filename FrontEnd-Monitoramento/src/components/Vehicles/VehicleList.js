import React, { useEffect, useState } from 'react';
import { getVehicles, deleteVehicle } from '../../services/api';
import { Button, List, ListItem, ListItemText, Typography, Grid } from '@mui/material';
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
    <div>
      <Typography variant="h4">Veículos</Typography>
      <List>
        {vehicles.map(vehicle => (
          <ListItem key={vehicle.id}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <ListItemText primary={`${vehicle.type} - ${vehicle.plate}`} />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={() => onEdit(vehicle)}>Editar</Button>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(vehicle.id)}>Excluir</Button>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default VehicleList;
