// src/components/Drivers/DriverForm.js
import React, { useState } from 'react';
import { createDriver, updateDriver } from '../../services/api';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material';

const DriverForm = ({ open, handleClose, driver }) => {
  const [name, setName] = useState(driver ? driver.name : '');
  const [cpf, setCpf] = useState(driver ? driver.cpf : '');
  const [cnh, setCnh] = useState(driver ? driver.cnh : '');
  const [status, setStatus] = useState(driver ? driver.status : '');

  const handleSubmit = async () => {
    try {
      if (driver) {
        await updateDriver(driver.id, { name, cpf, cnh, status });
      } else {
        await createDriver({ name, cpf, cnh, status });
      }
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar motorista:", error);
    }
  };

  const handleCpfChange = (event) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 11);
    setCpf(value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'));
  };

  const handleCnhChange = (event) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 11);
    setCnh(value);
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
            <TextField label="CPF" value={cpf} onChange={handleCpfChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField label="CNH" value={cnh} onChange={handleCnhChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
            >
              <MenuItem value="driving">Dirigindo</MenuItem>
              <MenuItem value="idle">Parado</MenuItem>
            </TextField>
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
