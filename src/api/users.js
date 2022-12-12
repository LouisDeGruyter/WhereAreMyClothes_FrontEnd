import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
export const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data.users;
    };

export const getUserById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
    };

export const createUser = async (user) => {
    const response = await axios.post(baseUrl, user);
    return response.data;
    };

export const deleteUser = async (id) => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
    };

export const updateUser = async (id, user) => {
    const response = await axios.put(`${baseUrl}/${id}`, user);
    return response.data;
    };

export const getKleerkasten = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/kleerkasten`);
    return response.data;
    };

export const getKledingstukken = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/kledingstukken`);
    return response.data;
    };

    