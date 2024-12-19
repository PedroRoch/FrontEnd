// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Drivers
export const getDrivers = () => api.get('/drivers');
export const getDriversByStatus = (status) => api.get(`/drivers/driversByStatus/${status}`);
export const getDriverById = (id) => api.get(`/drivers/${id}`);
export const createDriver = (driver) => api.post('/drivers', driver);
export const updateDriver = (id, driver) => api.put(`/drivers/${id}`, driver);
export const patchDriver = (id, driver) => api.patch(`/drivers/${id}`, driver);
export const deleteDriver = (id) => api.delete(`/drivers/${id}`);


// Vehicles
export const getVehicles = () => api.get('/vehicles');
export const getVehiclesByStatus = (status) => api.get(`/vehicles/vehiclesByStatus/${status}`);
export const getVehicleById = (id) => api.get(`/vehicles/${id}`);
export const createVehicle = (vehicle) => api.post('/vehicles', vehicle);
export const updateVehicle = (id, vehicle) => api.put(`/vehicles/${id}`, vehicle);
export const patchVehicle = (id, vehicle) => api.patch(`/vehicles/${id}`, vehicle);
export const deleteVehicle = (id) => api.delete(`/vehicles/${id}`);

// Travels
export const getTravels = () => api.get('/travels');
export const getTravelsByStatus = (status) => api.get(`/travels/travelsByStatus/${status}`);
export const getTravelsByVehicle = (vehicleId) => api.get(`/travels/travelsByVehicle/${vehicleId}`);
export const getTravelsByDriver = (driverId) => api.get(`/travels/travelsByDriver/${driverId}`);
export const getTravelById = (id) => api.get(`/travels/${id}`);
export const createTravel = (travel) => api.post('/travels', travel);
export const updateTravel = (id, travel) => api.put(`/travels/${id}`, travel);
export const patchTravel = (id, travel) => api.patch(`/travels/${id}`, travel);
export const deleteTravel = (id) => api.delete(`/travels/${id}`);
export const beginTravel = (travel) => api.post('/travels/beginTravel', travel);
export const stopTravel = (id) => api.post(`/travels/stopTravel/${id}`);
