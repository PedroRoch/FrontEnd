import React, { useEffect, useState } from 'react';
import { getDrivers, deleteDriver } from '../services/api';
import { Button, List, ListItem, ListItemText, Typography, Grid } from '@mui/material';
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
    <div>
      <Typography variant="h4">Motoristas</Typography>
      <List>
        {drivers.map(driver => (
          <ListItem key={driver.id}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={8}>
                <ListItemText primary={`${driver.name} - CPF: ${driver.cpf} - CNH: ${driver.cnh}`} />
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="primary" onClick={() => onEdit(driver)}>Editar</Button>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(driver.id)}>Excluir</Button>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DriverList;
