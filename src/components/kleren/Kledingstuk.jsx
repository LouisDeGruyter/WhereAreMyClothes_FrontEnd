import {  useEffect,useState,useCallback, memo} from 'react';
import * as kledingstukApi from '../../api/kledingstukken';
import { useNavigate, useParams  } from 'react-router-dom';
import Error from '../Error';
import { Layout,Button,Descriptions, Input,InputNumber, notification,Spin} from 'antd';
const { Header, Content } = Layout;
// export function kledingstuk with memo

export default memo( function Kledingstuk() {
    const [kledingstuk, setKledingstuk] = useState({});
    const [error, setError] = useState(null);
    const [kleerkast, setKleerkast] = useState({});
    const [kleerkastId, setKleerkastId] = useState(null)
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const refresh = useCallback(async () => {
        try{
            setLoading(true);
            setError(null);
            const kledingstuk1 = await kledingstukApi.getKledingstukById(id);
            const kleerkast1 = await kledingstukApi.getKleerkast(id);
            setKledingstuk(kledingstuk1);
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
      const wijzigKleerkast = ( ) => {
        
        const fetchKleerkast = async () => {
            try{
                setLoading(true);
                setError(null);
                await kledingstukApi.updateKledingstuk(kledingstuk.kledingstukId, {kleerkastId:kleerkastId, brand:kledingstuk.brand, color: kledingstuk.color, type:kledingstuk.type, size:kledingstuk.size});
                const kledingstuk1 = await kledingstukApi.getKledingstukById(id);
                setKledingstuk(kledingstuk1);
                const kleerkast1 = await kledingstukApi.getKleerkast(kledingstuk.kledingstukId);
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
    }

    const handleDelete = async () => {
        try{setLoading(true);
            setError(null);
            await kledingstukApi.deleteKledingstuk(kledingstuk.kledingstukId);
            openNotification();
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
        
    }
    const openNotification = () => {
        api['success']({
            message: 'Kledingstuk verwijderd',
              placement: 'topRight',
              description: 'Sluit dit venster om terug te gaan naar de kledingstukken',
              duration: 0,
              onClose: () => {navigate('/kleren')},
              });
    };
    const handleKleerkastChange = useCallback((value) => {
        setKleerkastId((id)=> value);
      }, []);

    const navigate = useNavigate();
    return (
        <div >
            <Spin spinning={loading} size="large">
            {contextHolder}
            <Layout>
            <Header style={{backgroundColor:"white"}}> <h2> Kledingstuk {kledingstuk.kledingstukId}</h2></Header>
            <Content style={{backgroundColor:"white"}}>
            <Input.Group compact>
            <Button type="primary" onClick={() => {navigate('/kleren')}}>Terug naar kledingstukken</Button>
            <Button type="primary" onClick={handleDelete}>Delete kledingstuk</Button>
            <Button type="primary" onClick={() =>{ navigate(`/kleren/${kledingstuk.kledingstukId}/edit`)}}>Wijzig kledingstuk</Button>
            <Button type="primary" onClick={() =>{ navigate(`/kleerkasten/${kledingstuk.kleerkastId}`)}}>Bekijk kleerkast</Button>
            <InputNumber min={1} onChange={ handleKleerkastChange}  style={{marginLeft:"10%"}}/>
            <Button type="primary" onClick={wijzigKleerkast}>Wijzig kleerkast</Button> 
            
            </Input.Group>
            <Error error={error}/>
            <Descriptions  bordered style={{marginTop:50}} contentStyle={{backgroundColor:"#D1D1D1"}} labelStyle={{backgroundColor:"#B2AFAF"}}>
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
