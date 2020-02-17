import axios from 'axios';

import { BASE_URL } from '../helpers/Constant';

export const post = (endpoint, body, token = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(`${BASE_URL}${endpoint}`, body, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      resolve(result.data);
    } catch (error) {
      reject(error)
    }
  })
}