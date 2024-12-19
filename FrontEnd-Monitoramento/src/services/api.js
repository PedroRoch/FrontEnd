// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export const getVehicles = () => api.get('/vehicles');
export const getDrivers = () => api.get('/drivers');
export const getTravels = () => api.get('/travels');

export const createVehicle = (vehicle) => api.post('/vehicles', vehicle);
export const createDriver = (driver) => api.post('/drivers', driver);
export const createTravel = (travel) => api.post('/travels', travel);

export const updateVehicle = (id, vehicle) => api.put(`/vehicles/${id}`, vehicle);
export const updateDriver = (id, driver) => api.put(`/drivers/${id}`, driver);
export const updateTravel = (id, travel) => api.put(`/travels/${id}`, travel);

export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);
export const deleteDriver = (id) => api.delete(`/drivers/${id}`);
export const deleteTravel = (id) => api.delete(`/travels/${id}`);
