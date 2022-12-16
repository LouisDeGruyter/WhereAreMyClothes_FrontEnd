import axios from 'axios';
import {useCallback} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
const baseUrl = `${process.env.REACT_APP_API_URL}/kleerkasten`;

const useKleerkasten = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getAll = useCallback (async () => {
        
        const token = await getAccessTokenSilently();
        const {data} = await axios.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data.kleerkasten;
    }, [getAccessTokenSilently]);

    const getKleerkastById = useCallback (async (id) => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.get(`${baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }, [getAccessTokenSilently]);

    const createKleerkast = useCallback (async (kleerkast) => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.post(baseUrl, kleerkast, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }, [getAccessTokenSilently]);




    const deleteKleerkast = useCallback (async (id) => {    
        const token = await getAccessTokenSilently();
        await axios.delete(`${baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }, [getAccessTokenSilently]);

    const updateKleerkast = useCallback (async (id, kleerkast) => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.put(`${baseUrl}/${id}`, kleerkast, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }, [getAccessTokenSilently]);

    const getUser = useCallback (async (id) => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.get(`${baseUrl}/${id}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }, [getAccessTokenSilently]);

    const getKledingstukken = useCallback (async (id) => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.get(`${baseUrl}/${id}/kledingstukken`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }, [getAccessTokenSilently]);





    return {
        getAll,
        getKleerkastById,
        createKleerkast,
        deleteKleerkast,
        updateKleerkast,
        getUser,
        getKledingstukken
    };
};

export default useKleerkasten;