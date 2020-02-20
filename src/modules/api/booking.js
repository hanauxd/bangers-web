import { post } from './api';

export const makeBooking = (values, token) => {
  const endpoint = "bookings";
  const body = { ...values };
  return post(endpoint, body, token);
}