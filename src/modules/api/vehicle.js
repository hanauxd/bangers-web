import { post, get } from './api';

export const fetchVehicles = token => {
  const endpoint = "vehicles";
  return get(endpoint, token);
}

export const addVehicle = (values, token) => {
  const endpoint = "vehicles";
  const body = { ...values };
  return post(endpoint, body, token);
}