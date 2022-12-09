import axios from 'axios';

export const getAll = async () => {
    const response = await axios.get('http://localhost:9000/api/users');
    return response.data.users;
    };

export const getUserById = async (id) => {
    const response = await axios.get(`http://localhost:9000/api/users/${id}`);
    return response.data;
    };

export const createUser = async (user) => {
    const response = await axios.post('http://localhost:9000/api/users', user);
    return response.data;
    };

export const deleteUser = async (id) => {
    const response = await axios.delete(`http://localhost:9000/api/users/${id}`);
    return response.data;
    };

export const updateUser = async (id, user) => {
    const response = await axios.put(`http://localhost:9000/api/users/${id}`, user);
    return response.data;
    };

export const getKleerkasten = async (id) => {
    const response = await axios.get(`http://localhost:9000/api/users/${id}/kleerkasten`);
    return response.data;
    };

export const getKledingstukken = async (id) => {
    const response = await axios.get(`http://localhost:9000/api/users/${id}/kledingstukken`);
    return response.data;
    };

    