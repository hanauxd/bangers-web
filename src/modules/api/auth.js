import { post } from './api';

export const onSignIn = values => {
  const endpoint = 'login';
  const body = {
    ...values
  }
  return post(endpoint, body);
}