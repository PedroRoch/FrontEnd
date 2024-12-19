// src/components/Vehicles/VehicleForm.js
import React, { useState } from 'react';
import { createVehicle, updateVehicle } from '../../services/api';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material';

const VehicleForm = ({ open, handleClose, vehicle }) => {
  const [type, setType] = useState(vehicle ? vehicle.type : '');
  const [plate, setPlate] = useState(vehicle ? vehicle.plate : '');
  const [lat, setLat] = useState(vehicle ? vehicle.lat : '');
  const [lng, setLng] = useState(vehicle ? vehicle.lng : '');
  const [speed, setSpeed] = useState(vehicle ? vehicle.speed : '');
  const [status, setStatus] = useState(vehicle ? vehicle.status : '');

  const handleSubmit = async () => {
    try {
      if (vehicle) {
        await updateVehicle(vehicle.id, { type, plate, lat, lng, speed, status });
      } else {
        await createVehicle({ type, plate, lat, lng, speed, status });
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
    }
  };

  const handlePlateChange = (event) => {
    const value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
    setPlate(value.replace(/([A-Z]{3})(\d{4})/, '$1$2'));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{vehicle ? 'Editar Veículo' : 'Cadastrar Veículo'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              label="Tipo"
              value={type}
              onChange={(e) => setType(e.target.value)}
              fullWidth
            >
              <MenuItem value="car">Carro</MenuItem>
              <MenuItem value="bus">Ônibus</MenuItem>
              <MenuItem value="truck">Caminhão</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Placa" value={plate} onChange={handlePlateChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Velocidade" value={speed} onChange={(e) => setSpeed(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value="stopped">Parado</MenuItem>
              <MenuItem value="moving">Em movimento</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">{vehicle ? 'Atualizar' : 'Cadastrar'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleForm;
