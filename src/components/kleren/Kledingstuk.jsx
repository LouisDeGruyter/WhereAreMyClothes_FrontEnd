import {  useEffect,useState,useCallback, memo} from 'react';
import useKledingstukken from '../../api/kledingstukken';
import { useNavigate, useParams  } from 'react-router-dom';
import Error from '../Error';
import useKleerkasten from '../../api/kleerkasten';

import { Layout,Button,Descriptions, Input, notification,Spin, Select,Modal} from 'antd';
const { Header, Content } = Layout;
const { Option } = Select;

// export function kledingstuk with memo

export default memo( function Kledingstuk() {
    const kledingstukApi= useKledingstukken();
    const kleerkastApi= useKleerkasten();
    const [kledingstuk, setKledingstuk] = useState({});
    const [error, setError] = useState(null);
    const [kleerkast, setKleerkast] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [kleerkasten,setKleerkasten] = useState([]);
    const [visible, setVisible] = useState(true);

    const refresh = useCallback(async () => {
        try{
            setLoading(true);
            setError(null);
            const kledingstuk1 = await kledingstukApi.getKledingstukById(id);
            const kleerkast1 = await kledingstukApi.getKleerkast(id);
            const kleerkasten = await kleerkastApi.getAll();
            
            setKledingstuk(kledingstuk1);
            setKleerkast(kleerkast1);
            setKleerkasten(kleerkasten);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        refresh();
      }, [refresh]);
      const handleWijzigKleerkast = useCallback((kleerkastId) => {
        if(kleerkastId === 0){
            navigate(`/kleerkasten/add`);
            return;
    };
        
        const fetchKleerkast = async () => {
            try{
                setLoading(true);
                setError(null);
                await kledingstukApi.updateKledingstuk(kledingstuk.kledingstukId, {kleerkastId:kleerkastId, brand:kledingstuk.brand, color: kledingstuk.color, type:kledingstuk.type, size:kledingstuk.size});
                kledingstuk.kleerkastId=kleerkastId;
                const kleerkast1 = kleerkasten.find(kleerkast => kleerkast.kleerkastId === kledingstuk.kleerkastId);
                setKleerkast (kleerkast1);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
      }
      if(kleerkastId === kledingstuk.kleerkastId || kleerkastId == null){
        return;
    }
    else
        fetchKleerkast();
    }, [ kledingstuk]);

    const handleDelete = useCallback( async () => {
        Modal.confirm({
            title: 'Weet je zeker dat je dit keldingstuk wilt verwijderen?',
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
        
    }, [kledingstuk]);
    const openNotification = () => {
        api['success']({
            message: 'Kledingstuk verwijderd',
              placement: 'topRight',
              description: 'Sluit dit venster om terug te gaan naar de kledingstukken',
              duration: 0,
              onClose: () => {navigate('/kleren')},
              });
    };

    const navigate = useNavigate();
    const handleBackClick = useCallback(() => {
        navigate('/kleren');
      }, []);
      
      const handleEditClick = useCallback(() => {
        navigate(`/kleren/${kledingstuk.kledingstukId}/edit`);
      }, [kledingstuk.kledingstukId, navigate]);
      
      const handleViewClick = useCallback(() => {
        navigate(`/kleerkasten/${kledingstuk.kleerkastId}`);
      }, [kledingstuk.kleerkastId, navigate]);
      
      const handleAddClick = useCallback(() => {
        navigate(`/kleerkasten/add`);
      }, [navigate]);
      
    return (
        <div >
            <Spin spinning={loading} size="large">
            {contextHolder}
            <Layout>
            <Header style={{backgroundColor:"white"}}> <h2> Kledingstuk {kledingstuk.kledingstukId}</h2></Header>
            <Content style={{backgroundColor:"white"}}>
            <Input.Group compact>
            <Button type="primary" onClick={handleBackClick}>Terug naar kledingstukken</Button>
            <Button type="primary" onClick={handleDelete}>Delete kledingstuk</Button>
            <Button type="primary" onClick={handleEditClick}>Wijzig kledingstuk</Button>
            <Button type="primary" onClick={handleViewClick}>Bekijk kleerkast</Button>
            <Select placeholder="Wijzig kleerkast" onChange={handleWijzigKleerkast} data-cy="kleerkast_input">
                        <Option value={0} onClick={handleAddClick} > Klik hier om een kleerkast toe te voegen</Option>

                        {kleerkasten.map((kleerkast) => (
                            <Option key={kleerkast.kleerkastId} value={kleerkast.kleerkastId}>{kleerkast.name}</Option>
                        ))}
                    
                    </Select>
            </Input.Group>
            <Error error={error}/>
            <Descriptions  bordered style={visible===true?{marginTop:50}:{display:"none"}} contentStyle={{backgroundColor:"#D1D1D1"}} labelStyle={{backgroundColor:"#B2AFAF"}}>
            <Descriptions.Item label="Naam">{kledingstuk.brand}</Descriptions.Item>
            <Descriptions.Item label="Kleur">{kledingstuk.color}</Descriptions.Item>
            <Descriptions.Item label="Type">{kledingstuk.type}</Descriptions.Item>
            <Descriptions.Item label="Maat">{kledingstuk.size}</Descriptions.Item>
            <Descriptions.Item label="Kleerkast Id">{kleerkast.kleerkastId}</Descriptions.Item>
            <Descriptions.Item label="Kleerkast Naam">{kleerkast.name}</Descriptions.Item>
            <Descriptions.Item label="Kleerkast Locatie">{kleerkast.location}</Descriptions.Item>
            </Descriptions>
        </Content>
        </Layout>
        </Spin>
        </div>
    );
    });
