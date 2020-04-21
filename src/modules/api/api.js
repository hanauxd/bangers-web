import axios from "axios";

import { BASE_URL } from "../helpers/Constant";

export const post = (endpoint, body = null, token = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.post(`${BASE_URL}${endpoint}`, body, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const get = (endpoint, token = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`${BASE_URL}${endpoint}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const put = (endpoint, body, token = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.put(`${BASE_URL}${endpoint}`, body, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const remove = (endpoint, token = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.delete(`${BASE_URL}${endpoint}`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            resolve(result.data);
        } catch (error) {
            reject(error);
        }
    });
};
