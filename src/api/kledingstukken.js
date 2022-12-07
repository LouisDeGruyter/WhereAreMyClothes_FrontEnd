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
    const response = await axios.delete(`http://localhost:9000/api/kledingstukken/${id}`);
    return response.data;
    };

export const updateKledingstuk = async (id, kledingstuk) => {
    const response = await axios.put(`http://localhost:9000/api/kledingstukken/${id}`, kledingstuk);
    return response.data;
    };

