// src/components/TravelList.js
import React, { useEffect, useState } from 'react';
import { getTravels, deleteTravel } from '../services/api';
import { Button, List, ListItem, ListItemText, Typography, Grid } from '@mui/material';
import io from 'socket.io-client';

const TravelList = ({ onEdit }) => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    fetchTravels();

    const socket = io('http://localhost:3000/travels/ws');
    socket.on('travel-created', fetchTravels);
    socket.on('travel-updated', fetchTravels);
    socket.on('travel-deleted', fetchTravels);

    return () => socket.disconnect();
  }, []);

  const fetchTravels = async () => {
    const response = await getTravels();
    setTravels(response.data);
  };

  const handleDelete = async (id) => {
    await deleteTravel(id);
    fetchTravels();
  };

  return (
    <div>
      <Typography variant="h4">Viagens</Typography>
      <List>
        {travels.map(travel => (
          <ListItem key={travel.id}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <ListItemText primary={`Motorista: ${travel.driverId} - Veículo: ${travel.vehicleId} - Status: ${travel.status}`} />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={() => onEdit(travel)}>Editar</Button>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(travel.id)}>Excluir</Button>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TravelList;
