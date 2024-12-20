// src/components/Travels/TravelForm.js

// Importações necessárias do React, API e Material-UI
import React, { useState, useEffect } from 'react';
import { createTravel, updateTravel, getDrivers, getVehicles } from '../../services/api';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, Typography } from '@mui/material';

const TravelForm = ({ open, handleClose, travel }) => {
  // Definindo estados locais para os campos do formulário
  const [driverId, setDriverId] = useState(travel ? travel.driverId : '');
  const [vehicleId, setVehicleId] = useState(travel ? travel.vehicleId : '');
  const [status, setStatus] = useState(travel ? travel.status : 'ongoing');
  const [start, setStart] = useState(travel ? travel.start : '');
  const [end, setEnd] = useState(travel ? travel.end : '');
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  // Hook useEffect para buscar dados de motoristas e veículos ao montar o componente
  useEffect(() => {
    fetchDrivers();
    fetchVehicles();
  }, []);

  // Função para buscar dados de motoristas da API
  const fetchDrivers = async () => {
    const response = await getDrivers();
    setDrivers(response.data);
  };

  // Função para buscar dados de veículos da API
  const fetchVehicles = async () => {
    const response = await getVehicles();
    setVehicles(response.data);
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async () => {
    // Verificação se a data final é menor que a data inicial
    if (new Date(end) < new Date(start)) {
      setError('A data final não pode ser menor que a data inicial');
      return;
    }
    setError('');

    try {
      // Se a viagem já existe, atualize-a, caso contrário, crie uma nova
      if (travel) {
        await updateTravel(travel.id, { driverId, vehicleId, status, start, end });
      } else {
        await createTravel({ driverId, vehicleId, status, start, end });
      }
      // Feche o formulário após a operação bem-sucedida
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
          {/* Campo para selecionar o ID do motorista */}
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
          {/* Campo para selecionar o ID do veículo */}
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
          {/* Campo para selecionar o status da viagem */}
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
          {/* Campo para inserir a data de início da viagem */}
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
          {/* Campo para inserir a data de fim da viagem */}
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
          {/* Exibição de erro caso a data final seja menor que a data inicial */}
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
