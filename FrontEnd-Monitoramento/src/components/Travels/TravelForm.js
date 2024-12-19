// src/components/Travels/TravelForm.js
import React, { useState, useEffect } from 'react';
import { createTravel, updateTravel, getDrivers, getVehicles } from '../../services/api';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Typography } from '@mui/material';

const TravelForm = ({ open, handleClose, travel }) => {
  const [driverId, setDriverId] = useState(travel ? travel.driverId : '');
  const [vehicleId, setVehicleId] = useState(travel ? travel.vehicleId : '');
  const [status, setStatus] = useState(travel ? travel.status : 'ongoing');
  const [start, setStart] = useState(travel ? travel.start : '');
  const [end, setEnd] = useState(travel ? travel.end : '');
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDrivers();
    fetchVehicles();
  }, []);

  const fetchDrivers = async () => {
    const response = await getDrivers();
    setDrivers(response.data);
  };

  const fetchVehicles = async () => {
    const response = await getVehicles();
    setVehicles(response.data);
  };

  const handleSubmit = async () => {
    if (new Date(end) < new Date(start)) {
      setError('A data final não pode ser menor que a data inicial');
      return;
    }
    setError('');

    try {
      if (travel) {
        await updateTravel(travel.id, { driverId, vehicleId, status, start, end });
      } else {
        await createTravel({ driverId, vehicleId, status, start, end });
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar viagem:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{travel ? 'Editar Viagem' : 'Cadastrar Viagem'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              label="ID do Motorista"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              fullWidth
            >
              {drivers.map(driver => (
                <MenuItem key={driver.id} value={driver.id}>
                  {driver.id} - {driver.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="ID do Veículo"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              fullWidth
            >
              {vehicles.map(vehicle => (
                <MenuItem key={vehicle.id} value={vehicle.id}>
                  {vehicle.id} - {vehicle.plate}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value="ongoing">Em andamento</MenuItem>
              <MenuItem value="finished">Concluída</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              label="Início"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="date"
              label="Fim"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography color="error">{error}</Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">{travel ? 'Atualizar' : 'Cadastrar'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TravelForm;
