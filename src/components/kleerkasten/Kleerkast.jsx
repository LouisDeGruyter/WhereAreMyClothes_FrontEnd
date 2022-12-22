import { useEffect, useState, useCallback, memo, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../Error';
import useKleerkasten from '../../api/kleerkasten';
import useKledingstukken from '../../api/kledingstukken';
import KledingTable from '../kleren/KledingTable';

import { Button, Descriptions, Input, notification, Spin, Modal } from 'antd';



export default memo(function Kleerkast() {
    const kleerkastApi = useKleerkasten();
    const [kleerkast, setKleerkast] = useState({});
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(true);
    const { id } = useParams();
    const kledingstukApi = useKledingstukken();
    const navigate = useNavigate();
    const styles = useMemo(() => ({
        layout: {
            backgroundColor: "white",
        },
        description: {
            marginTop: 50, margin: "auto", width: "90%", backgroundColor: "white",
        },
        h2: {
            marginBottom: 16,
            marginTop: 24,
        },
        content: {
            backgroundColor: "white",
        },
        label: {
            backgroundColor: "rgb(161, 176, 186)"
        },
        table: {
            border: "2px solid #020034",
            borderRadius: 5,
            backgroundColor: "white",
        },
        button: {
            marginBottom: "10px",
            color: "white",
            backgroundColor: "#181649",
            borderRadius: 0,
        },

    }), []);

    const handleBackToKleerkasten = useCallback(() => {
        navigate('/kleerkasten');
    }, [navigate]);


    const handleEdit = useCallback(() => {
        navigate(`/kleerkasten/${id}/edit`);
    }, [navigate, id]);

    const handleAddClothing = useCallback(() => {
        navigate(`/kleren/add`);
    }, [navigate]);


    const refresh = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const kleerkast1 = await kleerkastApi.getKleerkastById(id);
            setKleerkast(kleerkast1);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [id]);
    useEffect(() => {
        refresh();
    }, [refresh]);
    const openNotification = useCallback(() => {
        api['success']({
            message: 'Kleerkast verwijderd',
            placement: 'topRight',
            description: 'Sluit dit venster om terug te gaan naar de kledingstukken',
            duration: 0,
            onClose: () => { navigate('/kleerkasten') },
        });
    }, [api, navigate]);
    const handleDelete = useCallback(async () => {
        Modal.confirm({
            title: 'Weet je zeker dat je deze kleerkast wilt verwijderen?',
            content: 'Dit kan niet ongedaan worden gemaakt alle kledingstukken die zich in de kleerkast bevinden worden ook verwijderd',
            okText: 'Ja',
            okType: 'danger',
            cancelText: 'Nee',
            onOk: async () => {
                try {
                    setLoading(true);
                    setError(null);
                    setVisible(false);
                    await kleerkastApi.deleteKleerkast(id);
                    openNotification();
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            },
        });
    }, [id, kleerkastApi, openNotification]);
    const openNotificationDelete = useCallback((item) => {
        api['success']({
            message: `${item} is succesvol verwijderd`,
            placement: 'topRight',
            duration: 3,

        });
    }, [api]);

    const onDeleteKledingstuk = useCallback(async (idToDelete) => {
        Modal.confirm({
            title: 'Weet je zeker dat je dit kledingstuk wilt verwijderen?',
            content: 'Dit kan niet ongedaan worden gemaakt',
            okText: 'Ja',
            okType: 'danger',
            cancelText: 'Nee',
            onOk: async () => {
                try {
                    setLoading(true);
                    setError(null);
                    kledingstukApi.deleteKledingstuk(idToDelete);
                    let kledingstukken1 = kleerkast.kledingstukken.filter(({ kledingstukId }) => kledingstukId !== idToDelete);
                    setKleerkast({ ...kleerkast, kledingstukken: kledingstukken1 });
                    openNotificationDelete("Kledingstuk");
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            },
        });
    }, [kledingstukApi, openNotificationDelete, kleerkast]);
    const styleDiv = useMemo(() => {
        if (visible === true) {
            return {};
        } else {
            return { display: "none" };
        }
    }, [visible]);

    return (
        <div style={styleDiv}>
            <Spin spinning={loading} size="large">
                {contextHolder}

                <h1> {kleerkast.name}</h1>


                <Button type="primary" style={styles.button} onClick={handleBackToKleerkasten}>Terug naar kleerkasten</Button>
                <Button type="primary" style={styles.button} onClick={handleDelete}>Verwijder kleerkast</Button>
                <Button type="primary" style={styles.button} onClick={handleEdit}>Bewerk kleerkast</Button>
                <Button type="primary" style={styles.button} onClick={handleAddClothing}>Voeg kledingstuk toe</Button>


                <br />
                <Error error={error} />
                <div >
                    <Descriptions bordered style={styles.description} contentStyle={styles.content} labelStyle={styles.label}>
                        <Descriptions.Item label="Kleerkast naam:">{kleerkast.name}</Descriptions.Item>
                        <Descriptions.Item label="Kleerkast locatie:">{kleerkast.location}</Descriptions.Item>
                    </Descriptions>
                    <h2 style={styles.h2}>Kledingstukken in {kleerkast.name}</h2>
                    <KledingTable kledingstukken={kleerkast.kledingstukken} loading={loading} onDelete={onDeleteKledingstuk} kleerkasten={kleerkast} style={styles.table} />
                </div>
            </Spin>
        </div>

    )



});