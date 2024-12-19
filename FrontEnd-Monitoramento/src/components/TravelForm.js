// src/components/TravelForm.js
import React, { useState } from 'react';
import { createTravel, updateTravel } from '../services/api';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';

const TravelForm = ({ open, handleClose, travel }) => {
  const [driverId, setDriverId] = useState(travel ? travel.driverId : '');
  const [vehicleId, setVehicleId] = useState(travel ? travel.vehicleId : '');
  const [status, setStatus] = useState(travel ? travel.status : 'ongoing');
  const [start, setStart] = useState(travel ? travel.start : '');
  const [end, setEnd] = useState(travel ? travel.end : '');

  const handleSubmit = async () => {
    if (travel) {
      await updateTravel(travel.id, { driverId, vehicleId, status, start, end });
    } else {
      await createTravel({ driverId, vehicleId, status, start, end });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{travel ? 'Editar Viagem' : 'Cadastrar Viagem'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="ID do Motorista" value={driverId} onChange={(e) => setDriverId(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="ID do Veículo" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Status" value={status} onChange={(e) => setStatus(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Início" value={start} onChange={(e) => setStart(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Fim" value={end} onChange={(e) => setEnd(e.target.value)} fullWidth />
          </Grid>
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
