import { post, get } from './api';

export const fetchVehicles = token => {
  const endpoint = "vehicles";
  return get(endpoint, token);
}

export const fetchVehicleDetails = id => {
  const endpoint = `vehicles/${id}`;
  return get(endpoint);
}

export const addVehicle = (vehicle, files, token) => {
  const endpoint = "vehicles";
  let formData = new FormData();
  formData.append('vehicle', JSON.stringify(vehicle));
  files.forEach(file => {
    formData.append('file', file);
  })
  return post(endpoint, formData, token);
}