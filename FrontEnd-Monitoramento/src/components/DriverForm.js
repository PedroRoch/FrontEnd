// src/components/DriverForm.js
import React, { useState } from 'react';
import { createDriver, updateDriver } from '../services/api';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';

const DriverForm = ({ open, handleClose, driver }) => {
  const [name, setName] = useState(driver ? driver.name : '');
  const [cpf, setCpf] = useState(driver ? driver.cpf : '');
  const [cnh, setCnh] = useState(driver ? driver.cnh : '');

  const handleSubmit = async () => {
    if (driver) {
      await updateDriver(driver.id, { name, cpf, cnh });
    } else {
      await createDriver({ name, cpf, cnh });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{driver ? 'Editar Motorista' : 'Cadastrar Motorista'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="CNH" value={cnh} onChange={(e) => setCnh(e.target.value)} fullWidth />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">{driver ? 'Atualizar' : 'Cadastrar'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DriverForm;
