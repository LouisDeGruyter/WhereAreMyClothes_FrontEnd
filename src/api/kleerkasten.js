import axios from 'axios';

export const getAll = async () => {
    const response = await axios.get('http://localhost:9000/api/kleerkasten');
    return response.data.kleerkasten;
    };

export const getKleerkastById = async (id) => {
    const response = await axios.get(`http://localhost:9000/api/kleerkasten/${id}`);
    return response.data;
    };

export const createKleerkast = async (kleerkast) => {
    const response = await axios.post('http://localhost:9000/api/kleerkasten', kleerkast);
    return response.data;
    };

export const deleteKleerkast = async (id) => {
    const response = await axios.delete(`http://localhost:9000/api/kleerkasten/${id}`);
    return response.data;
    };

export const updateKleerkast = async (id, kleerkast) => {
    const response = await axios.put(`http://localhost:9000/api/kleerkasten/${id}`, kleerkast);
    return response.data;
    };

export const getUser = async (id) => {
    const response = await axios.get(`http://localhost:9000/api/kleerkasten/${id}/user`);
    return response.data;
    };

export const getKledingstukken = async (id) => {
    const response = await axios.get(`http://localhost:9000/api/kleerkasten/${id}/kledingstukken`);
    return response.data;
    };

