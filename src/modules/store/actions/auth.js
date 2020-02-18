import { AUTH_SUCCESS, LOGOUT_SUCCESS } from './actionTypes';

export const authSuccess = payload => {
  return {
    type: AUTH_SUCCESS,
    payload
  }
}

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}