import { post, get, put } from './api';

export const onAddUtility = (values, token) => {
  const endpoint = 'utilities';
  const body = { ...values };
  return post(endpoint, body, token)
}

export const onFetchUtilities = token => {
  const endpoint = 'utilities';
  return get(endpoint, token);
}

export const onUpdateUtility = (values, token) => {
  const type = values.utilityType;
  const endpoint = `utilities/${type}`;
  const body = { ...values }
  return put(endpoint, body, token);
}

export const onFetchAvailableUtilities = () => {
  const endpoint = "utilities/available";
  return get(endpoint);
}