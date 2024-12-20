// src/components/Vehicles/VehicleForm.js

// Importações necessárias do React e Material-UI
import React, { useState } from 'react';
import { createVehicle, updateVehicle } from '../../services/api';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem } from '@mui/material';

const VehicleForm = ({ open, handleClose, vehicle }) => {
  // Definindo estados locais para os campos do formulário
  const [type, setType] = useState(vehicle ? vehicle.type : '');
  const [plate, setPlate] = useState(vehicle ? vehicle.plate : '');
  const [lat, setLat] = useState(vehicle ? vehicle.lat : '');
  const [lng, setLng] = useState(vehicle ? vehicle.lng : '');
  const [speed, setSpeed] = useState(vehicle ? vehicle.speed : '');
  const [status, setStatus] = useState(vehicle ? vehicle.status : '');

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    try {
      // Se o veículo já existe, atualize-o, caso contrário, crie um novo
      if (vehicle) {
        await updateVehicle(vehicle.id, { type, plate, lat, lng, speed, status });
      } else {
        await createVehicle({ type, plate, lat, lng, speed, status });
      }
      // Feche o formulário após a operação bem-sucedida
      handleClose();
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
    }
  };

  // Função para lidar com a mudança no campo de placa
  const handlePlateChange = (event) => {
    // Formatação do valor da placa para letras maiúsculas e números
    const value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
    setPlate(value.replace(/([A-Z]{3})(\d{4})/, '$1$2'));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{vehicle ? 'Editar Veículo' : 'Cadastrar Veículo'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Campo para selecionar o tipo de veículo */}
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
          {/* Campo para inserir a placa do veículo */}
          <Grid item xs={12}>
            <TextField label="Placa" value={plate} onChange={handlePlateChange} fullWidth />
          </Grid>
          {/* Campo para inserir a latitude do veículo */}
          <Grid item xs={12}>
            <TextField label="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} fullWidth />
          </Grid>
          {/* Campo para inserir a longitude do veículo */}
          <Grid item xs={12}>
            <TextField label="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} fullWidth />
          </Grid>
          {/* Campo para inserir a velocidade do veículo */}
          <Grid item xs={12}>
            <TextField label="Velocidade" value={speed} onChange={(e) => setSpeed(e.target.value)} fullWidth />
          </Grid>
          {/* Campo para selecionar o status do veículo */}
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
