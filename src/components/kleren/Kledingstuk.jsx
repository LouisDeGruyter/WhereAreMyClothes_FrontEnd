import { useEffect, useState, useCallback, memo, useMemo } from 'react';
import useKledingstukken from '../../api/kledingstukken';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../Error';
import useUsers from '../../api/users';
import { Button, Descriptions, notification, Spin, Select, Modal } from 'antd';

const { Option } = Select;

// export function kledingstuk with memo

export default memo(function Kledingstuk() {
  const kledingstukApi = useKledingstukken();
  const userApi = useUsers();
  const [kledingstuk, setKledingstuk] = useState({});
  const [error, setError] = useState(null);
  const [kleerkast, setKleerkast] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [kleerkasten, setKleerkasten] = useState([]);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const openNotification = useCallback(() => {
    api['success']({
      message: 'Kledingstuk verwijderd',
      placement: 'topRight',
      description: 'Sluit dit venster om terug te gaan naar de kledingstukken',
      duration: 0,
      onClose: () => { navigate('/kleren') },
    });
  }, [api, navigate]);

  const styles = useMemo(() => ({
    layout: {
      backgroundColor: "white",
    },
    kleerkast: {
      width: 280,
      borderRadius: 0,
    },
    description: {
      marginTop: 25,
      width: "95%", backgroundColor: "white",
      marginLeft: "2.5%",
    },
    content: {
      backgroundColor: "white",
    },
    label: {
      backgroundColor: "rgb(161, 176, 186)"
    },
    button: {
      marginBottom: "10px",
      color: "white",
      backgroundColor: "#181649",
      borderRadius: 0,
    },
  }), []);



  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const kledingstuk1 = await kledingstukApi.getKledingstukById(id);
      const kleerkast1 = await kledingstukApi.getKleerkast(id);
      const kleerkasten = await userApi.getKleerkasten();

      setKledingstuk(kledingstuk1);
      setKleerkast(kleerkast1);
      setKleerkasten(kleerkasten);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);
  const handleWijzigKleerkast = useCallback((kleerkastId) => {
    if (kleerkastId === 0) {
      navigate(`/kleerkasten/add`);
      return;
    };

    const fetchKleerkast = async () => {
      try {
        setLoading(true);
        setError(null);
        await kledingstukApi.updateKledingstuk(kledingstuk.kledingstukId, { kleerkastId: kleerkastId, brand: kledingstuk.brand, color: kledingstuk.color, type: kledingstuk.type, size: kledingstuk.size });
        kledingstuk.kleerkastId = kleerkastId;
        const kleerkast1 = kleerkasten.find(kleerkast => kleerkast.kleerkastId === kledingstuk.kleerkastId);
        setKleerkast(kleerkast1);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    if (kleerkastId === kledingstuk.kleerkastId || kleerkastId == null) {
      return;
    }
    else
      fetchKleerkast();
  }, [kledingstuk, kledingstukApi, kleerkasten, navigate]);

  const handleDelete = useCallback(async () => {
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
          setVisible(false);
          await kledingstukApi.deleteKledingstuk(id);

          openNotification();
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      },
    });

  }, [ id, kledingstukApi, openNotification]);
 

  
  const handleBackClick = useCallback(() => {
    navigate('/kleren');
  }, [navigate]);

  const handleEditClick = useCallback(() => {
    navigate(`/kleren/${kledingstuk.kledingstukId}/edit`);
  }, [kledingstuk.kledingstukId, navigate]);

  const handleViewClick = useCallback(() => {
    navigate(`/kleerkasten/${kledingstuk.kleerkastId}`);
  }, [kledingstuk.kleerkastId, navigate]);

  const handleAddClick = useCallback(() => {
    navigate(`/kleerkasten/add`);
  }, [navigate]);
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
        <h2> {kledingstuk.type} {kledingstuk.brand}</h2>


        <Button type="primary" style={styles.button} onClick={handleBackClick}>Terug naar kledingstukken</Button>
        <Button type="primary" style={styles.button} onClick={handleDelete}>Delete kledingstuk</Button>
        <Button type="primary" style={styles.button} onClick={handleEditClick}>Wijzig kledingstuk</Button>
        <Button type="primary" style={styles.button} onClick={handleViewClick}>Bekijk kleerkast</Button>
        <Select placeholder="Wijzig kleerkast" onChange={handleWijzigKleerkast} data-cy="kleerkast_input" style={styles.kleerkast}>
          <Option value={0} onClick={handleAddClick} > Klik hier om een kleerkast toe te voegen</Option>

          {kleerkasten.map((kleerkast) => (
            <Option key={kleerkast.kleerkastId} value={kleerkast.kleerkastId}>{kleerkast.name}</Option>
          ))}

        </Select>

        <Error error={error} />
        <div >
          <Descriptions bordered style={styles.description} contentStyle={styles.content} labelStyle={styles.label}>
            <Descriptions.Item label="Naam">{kledingstuk.brand}</Descriptions.Item>
            <Descriptions.Item label="Kleur">{kledingstuk.color}</Descriptions.Item>
            <Descriptions.Item label="Type">{kledingstuk.type}</Descriptions.Item>
            <Descriptions.Item label="Maat">{kledingstuk.size}</Descriptions.Item>
            <Descriptions.Item label="Kleerkast Naam">{kleerkast.name}</Descriptions.Item>
            <Descriptions.Item label="Kleerkast Locatie">{kleerkast.location}</Descriptions.Item>
          </Descriptions>
        </div>

      </Spin>
    </div>
  );
});
