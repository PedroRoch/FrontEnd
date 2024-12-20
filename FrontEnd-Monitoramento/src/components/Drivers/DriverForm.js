// src/components/Drivers/DriverForm.js

// Importações necessárias do React e Material-UI
import React, { useState } from 'react';
import { createDriver, updateDriver } from '../../services/api';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material';

const DriverForm = ({ open, handleClose, driver }) => {
  // Definindo estados locais para os campos do formulário
  const [name, setName] = useState(driver ? driver.name : '');
  const [cpf, setCpf] = useState(driver ? driver.cpf : '');
  const [cnh, setCnh] = useState(driver ? driver.cnh : '');
  const [status, setStatus] = useState(driver ? driver.status : '');

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    try {
      // Se o motorista já existe, atualize-o, caso contrário, crie um novo
      if (driver) {
        await updateDriver(driver.id, { name, cpf, cnh, status });
      } else {
        await createDriver({ name, cpf, cnh, status });
      }
      // Feche o formulário após a operação bem-sucedida
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar motorista:", error);
    }
  };

  // Função para lidar com a mudança no campo de CPF
  const handleCpfChange = (event) => {
    // Formatação do valor do CPF para números
    const value = event.target.value.replace(/\D/g, '').slice(0, 11);
    setCpf(value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'));
  };

  // Função para lidar com a mudança no campo de CNH
  const handleCnhChange = (event) => {
    // Formatação do valor da CNH para números
    const value = event.target.value.replace(/\D/g, '').slice(0, 11);
    setCnh(value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{driver ? 'Editar Motorista' : 'Cadastrar Motorista'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Campo para inserir o nome do motorista */}
          <Grid item xs={12}>
            <TextField label="Nome" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
          </Grid>
          {/* Campo para inserir o CPF do motorista */}
          <Grid item xs={12}>
            <TextField label="CPF" value={cpf} onChange={handleCpfChange} fullWidth />
          </Grid>
          {/* Campo para inserir a CNH do motorista */}
          <Grid item xs={12}>
            <TextField label="CNH" value={cnh} onChange={handleCnhChange} fullWidth />
          </Grid>
          {/* Campo para selecionar o status do motorista */}
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
