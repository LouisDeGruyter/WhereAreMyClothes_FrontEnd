import axios from 'axios';
import {useCallback} from 'react';
import {useAuth0} from "@auth0/auth0-react";
const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

const useUsers = () => {
    const {getAccessTokenSilently} = useAuth0();

    const getAll = useCallback (async () => {

        const token = await getAccessTokenSilently();
        const {data} = await axios.get(baseUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data.users;
    }, [getAccessTokenSilently]);

    const getUserById = useCallback (async (id) => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.get(`${baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }, [getAccessTokenSilently]);

    const createUser = useCallback (async (user) => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.post(baseUrl, user, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }, [getAccessTokenSilently]);

    const deleteUser = useCallback (async (id) => {
        const token = await getAccessTokenSilently();
        await axios.delete(`${baseUrl}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }, [getAccessTokenSilently]);
    
    const updateUser = useCallback (async (id, user) => {

        const token = await getAccessTokenSilently();
        const {data} = await axios.put(`${baseUrl}/${id}`, user, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data;
    }, [getAccessTokenSilently]);

    const getKleerkasten = useCallback (async () => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.get(`${baseUrl}/1/kleerkasten`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }); 
        return data.kleerkasten;
    }, [getAccessTokenSilently]);

    const getKledingstukken = useCallback (async () => {
        const token = await getAccessTokenSilently();
        const {data} = await axios.get(`${baseUrl}/1/kledingstukken`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return data.kledingstukken;
    }, [getAccessTokenSilently]);

    return {
        getAll,
        getUserById,
        createUser,
        deleteUser,
        updateUser,
        getKleerkasten,
        getKledingstukken,
    };
};

export default useUsers;


