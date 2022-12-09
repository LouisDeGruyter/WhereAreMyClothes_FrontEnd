import axios from 'axios';

export const getAll = async () => {
    const response = await axios.get('http://localhost:9000/api/kledingstukken');
    return response.data.kledingstukken;
    };

export const getKledingstukById = async (id) => {
    const response = await axios.get(`http://localhost:9000/api/kledingstukken/${id}`);
    return response.data;
    };

export const createKledingstuk = async (kledingstuk) => {
    const response = await axios.post('http://localhost:9000/api/kledingstukken', kledingstuk);
    return response.data;
    };

export const deleteKledingstuk = async (id) => {
 await axios.delete(`http://localhost:9000/api/kledingstukken/${id}`);

    };

export const updateKledingstuk = async (id, kledingstuk) => {
    const response = await axios.put(`http://localhost:9000/api/kledingstukken/${id}`, kledingstuk);
    return response.data;
    };

export const getKleerkast = async (id) => {
    const response = await axios.get(`http://localhost:9000/api/kledingstukken/${id}/kleerkast`);
    return response.data;
    };

export const getUser = async (id) => {
    const response = await axios.get(`http://localhost:9000/api/kledingstukken/${id}/user`);
    return response.data;
    };

