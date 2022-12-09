import {  useEffect,useState} from 'react';
import * as kledingstukApi from '../../api/kledingstukken';
import { useNavigate, useParams } from 'react-router-dom';
import Error from '../Error';
import { Layout,Button,Descriptions, Input,InputNumber} from 'antd';
const { Header, Content } = Layout;
export default  function Kledingstuk() {
    const [kledingstuk, setKledingstuk] = useState({});
    const [error, setError] = useState(null);
    const [kleerkast, setKleerkast] = useState({});
    const [kleerkastId, setKleerkastId] = useState(null)
    const { id } = useParams();
    
    useEffect(() => {
        const fetchKledingstuk = async () => {
            try{
                setError(null);
          const kledingstuk = await kledingstukApi.getKledingstukById(id);
          const kleerkast = await kledingstukApi.getKleerkast(kledingstuk.kleerkastId);
          setKledingstuk(kledingstuk);
            setKleerkast(kleerkast);
            } catch (error) {
                setError(error);
            }

        };
        fetchKledingstuk();
      }, []);
      const wijzigKleerkast = ( ) => {
        console.log(kleerkastId);
        
        const fetchKleerkast = async () => {
            try{
                setError(null);
                kledingstukApi.updateKledingstuk(kledingstuk.kledingstukId, {kleerkastId,...kledingstuk});
                setKledingstuk (await kledingstukApi.getKledingstukById(id));
                setKleerkast (await kledingstukApi.getKleerkast(kledingstuk.kleerkastId));
            setKleerkast(kleerkast);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        
      }
      if(kleerkastId === kledingstuk.kleerkastId || kleerkastId == null){
        return;
    }
    else
        fetchKleerkast();
    }
    const navigate = useNavigate();
    return (
        <div >
            <Layout>
            <Header style={{backgroundColor:"white"}}> <h2> Kledingstuk {kledingstuk.kledingstukId}</h2></Header>
            <Content style={{backgroundColor:"white"}}>
            <Input.Group compact>
            <Button type="primary" onClick={() => {kledingstukApi.deleteKledingstuk(kledingstuk.kledingstukId)}}>Delete kledingstuk</Button>
            <Button type="primary" onClick={() => {navigate('/kleren')}}>Terug naar kledingstukken</Button>
            <Button type="primary" onClick={() =>{ navigate(`/kleerkasten/${kledingstuk.kleerkastId}`)}}>Bekijk kleerkast</Button>
            <Button type="primary" onClick={() =>{ navigate(`/kleren/${kledingstuk.kledingstukId}/edit`)}}>Wijzig kledingstuk</Button>
            <InputNumber min={1} defaultValue={"1"} onChange={ setKleerkastId}  style={{marginLeft:"10%"}}/>
            <Button type="primary" onClick={wijzigKleerkast}>Wijzig kleerkast</Button>  {/* werkt niet */}
            
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
        </div>
    );
    };
