import { get, post } from './api';

export const onFetchUser = (token) => {
  const endpoint = 'users/auth-user';
  return get(endpoint, token);
}

export const onUploadUserDocuments = (files, token) => {
  const endpoint = "user-documents/upload";
  let formData = new FormData();
  for (const file of files) {
    formData.append('file', file);
  }
  return post(endpoint, formData, token);
}