// src/services/api.js

// Importação do Axios para realizar requisições HTTP
import axios from 'axios';

// Configuração da instância do Axios com a URL base do backend
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Funções para lidar com os veículos
export const getVehicles = () => api.get('/vehicles'); // Pega todos os veículos
export const getVehiclesByStatus = (status) => api.get(`/vehicles/vehiclesByStatus/${status}`); // Pega veículos por status
export const getVehicleById = (id) => api.get(`/vehicles/${id}`); // Pega um veículo específico
export const createVehicle = (vehicle) => api.post('/vehicles', vehicle); // Cria um novo veículo
export const updateVehicle = (id, vehicle) => api.put(`/vehicles/${id}`, vehicle); // Atualiza um veículo existente
export const patchVehicle = (id, vehicle) => api.patch(`/vehicles/${id}`, vehicle); // Atualiza parcialmente um veículo existente
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`); // Deleta um veículo

// Funções para lidar com os motoristas
export const getDrivers = () => api.get('/drivers'); // Pega todos os motoristas
export const getDriversByStatus = (status) => api.get(`/drivers/driversByStatus/${status}`); // Pega motoristas por status
export const getDriverById = (id) => api.get(`/drivers/${id}`); // Pega um motorista específico
export const createDriver = (driver) => api.post('/drivers', driver); // Cria um novo motorista
export const updateDriver = (id, driver) => api.put(`/drivers/${id}`, driver); // Atualiza um motorista existente
export const patchDriver = (id, driver) => api.patch(`/drivers/${id}`, driver); // Atualiza parcialmente um motorista existente
export const deleteDriver = (id) => api.delete(`/drivers/${id}`); // Deleta um motorista

// Funções para lidar com as viagens
export const getTravels = () => api.get('/travels'); // Pega todas as viagens
export const getTravelsByStatus = (status) => api.get(`/travels/travelsByStatus/${status}`); // Pega viagens por status
export const getTravelsByVehicle = (vehicleId) => api.get(`/travels/travelsByVehicle/${vehicleId}`); // Pega viagens por veículo
export const getTravelsByDriver = (driverId) => api.get(`/travels/travelsByDriver/${driverId}`); // Pega viagens por motorista
export const getTravelById = (id) => api.get(`/travels/${id}`); // Pega uma viagem específica
export const createTravel = (travel) => api.post('/travels', travel); // Cria uma nova viagem
export const updateTravel = (id, travel) => api.put(`/travels/${id}`, travel); // Atualiza uma viagem existente
export const patchTravel = (id, travel) => api.patch(`/travels/${id}`, travel); // Atualiza parcialmente uma viagem existente
export const deleteTravel = (id) => api.delete(`/travels/${id}`); // Deleta uma viagem
export const beginTravel = (travel) => api.post('/travels/beginTravel', travel); // Inicia uma nova viagem
export const stopTravel = (id) => api.post(`/travels/stopTravel/${id}`); // Encerra uma viagem
