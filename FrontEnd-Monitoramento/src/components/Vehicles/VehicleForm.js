// src/components/Vehicles/VehicleForm.js
import React, { useState } from 'react';
import { createVehicle, updateVehicle } from '../../services/api';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material';

const VehicleForm = ({ open, handleClose, vehicle }) => {
  const [type, setType] = useState(vehicle ? vehicle.type : '');
  const [plate, setPlate] = useState(vehicle ? vehicle.plate : '');

  const handleSubmit = async () => {
    if (vehicle) {
      await updateVehicle(vehicle.id, { type, plate });
    } else {
      await createVehicle({ type, plate });
    }
    handleClose();
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
