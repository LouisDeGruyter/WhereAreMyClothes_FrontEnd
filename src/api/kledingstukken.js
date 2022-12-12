import axios from 'axios';

import { useAuth0 } from "@auth0/auth0-react";
import  {useCallback} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/kledingstukken`;

const useKledingstukken = () => {
    const {getAccessTokenSilently} = useAuth0();


 const getAll = useCallback (async () => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.get(baseUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data.kledingstukken;
    }, [getAccessTokenSilently]);

    const getKledingstukById = useCallback (async (id) => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.get(`${baseUrl}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
    }, [getAccessTokenSilently]);

    const createKledingstuk = useCallback (async (kledingstuk) => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.post(baseUrl, kledingstuk, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
    }, [getAccessTokenSilently]);

    const deleteKledingstuk = useCallback (async (id) => {
    const token = await getAccessTokenSilently();
    await axios.delete(`${baseUrl}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    }, [getAccessTokenSilently]);

    const updateKledingstuk = useCallback (async (id, kledingstuk) => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.put(`${baseUrl}/${id}`, kledingstuk, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
    }, [getAccessTokenSilently]);

    const getKleerkast = useCallback (async (id) => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.get(`${baseUrl}/${id}/kleerkast`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
    }, [getAccessTokenSilently]);

    const getUser = useCallback (async (id) => {
    const token = await getAccessTokenSilently();
    const {data} = await axios.get(`${baseUrl}/${id}/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
    }, [getAccessTokenSilently]);

    return {
        getAll,
        getKledingstukById,
        createKledingstuk,
        deleteKledingstuk,
        updateKledingstuk,
        getKleerkast,
        getUser,
    };

};

export default useKledingstukken;
