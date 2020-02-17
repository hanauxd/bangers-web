import { AUTH_SUCCESS } from './actionTypes';

export const authSuccess = payload => {
  return {
    type: AUTH_SUCCESS,
    payload
  }
}