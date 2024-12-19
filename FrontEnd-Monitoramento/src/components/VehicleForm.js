// src/components/VehicleForm.js
import React, { useState } from 'react';
import { createVehicle, updateVehicle } from '../services/api';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';

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

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{vehicle ? 'Editar Veículo' : 'Cadastrar Veículo'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Tipo" value={type} onChange={(e) => setType(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Placa" value={plate} onChange={(e) => setPlate(e.target.value)} fullWidth />
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
