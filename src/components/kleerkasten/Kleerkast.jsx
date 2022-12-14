import {  useEffect,useState,useCallback, memo,useMemo} from 'react';
import { useNavigate, useParams  } from 'react-router-dom';
import Error from '../Error';
import useKleerkasten from '../../api/kleerkasten';
import useKledingstukken from '../../api/kledingstukken';
import KledingTable from '../kleren/KledingTable';

import { Layout,Button,Descriptions, Input, notification,Spin,Modal} from 'antd';
const { Header, Content } = Layout;


export default memo( function Kleerkast(){
    const kleerkastApi= useKleerkasten();
    const [kleerkast,setKleerkast]= useState({});
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(true);
    const {id} = useParams();
    const kledingstukApi   = useKledingstukken();
    const navigate= useNavigate();

    function handleBackToKleerkasten() {
        navigate('/kleerkasten');
      }
      
      
      function handleEdit() {
        navigate(`/kleerkasten/${id}/edit`);
      }
      
      function handleAddClothing() {
        navigate(`/kleren/add`);
      }
      

    const refresh = useCallback(async () =>{
        try{
            setLoading(true);
            setError(null);
            const kleerkast1= await kleerkastApi.getKleerkastById(id);
            setKleerkast(kleerkast1);
        } catch (error){
            setError(error);
        } finally{
            setLoading(false);
        }
    },[]);
    useEffect(() => {
        refresh();
      }, [refresh]);
        const handleDelete = useCallback(async () => {
            Modal.confirm({
                title: 'Weet je zeker dat je deze kleerkast wilt verwijderen?',
                content: 'Dit kan niet ongedaan worden gemaakt alle kledingstukken die zich in de kleerkast bevinden worden ook verwijderd',
                okText: 'Ja',
                okType: 'danger',
                cancelText: 'Nee',
                onOk: async () => {
                    try{
                        setLoading(true);
                        setError(null);
                        setVisible(false);
                        await kleerkastApi.deleteKleerkast(id);
                        openNotification();
                    } catch (error){
                        setError(error);
                    } finally{
                        setLoading(false);
                    }
                },
            });
        }, [kleerkast]);
        const openNotification = () => {
            api['success']({
                message: 'Kleerkast verwijderd',
                  placement: 'topRight',
                  description: 'Sluit dit venster om terug te gaan naar de kledingstukken',
                  duration: 0,
                  onClose: () => {navigate('/kleerkasten')},
                  });
        };
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
                        setKleerkast( ...kleerkast, kleerkast.kledingstukken.filter(({kledingstukId}) => kledingstukId !== idToDelete));
                        openNotificationDelete("Kledingstuk");
                    } catch (error) {
                        setError(error);
                    } finally {
                        setLoading(false);
                    }
                },
            });
        }, []);
          const openNotificationDelete = (item) => {
            api['success']({
                message: `${item} is succesvol verwijderd`,
                  placement: 'topRight',
                  duration: 3,
        
                  });
        };
        const styleDiv = useMemo(() => {
        if(visible===true){
            return {};
        } else {
            return {display:"none"};
        }
        }, [visible]);
                

        return(
            <div>
                <Spin spinning={loading} size="large">
                {contextHolder}
                <Layout>
                <Header style={{backgroundColor:"white"}}> <h1> Kleerkast {kleerkast.kleerkastId}</h1></Header>
                <Content >
                <Input.Group compact>
                <Button type="primary" onClick={handleBackToKleerkasten}>Terug naar kleerkasten</Button>
                <Button type="primary" onClick={handleDelete}>Verwijder kleerkast</Button>
                <Button type="primary" onClick={handleEdit}>Bewerk kleerkast</Button>
                <Button type="primary" onClick={handleAddClothing}>Voeg kledingstuk toe</Button>

                </Input.Group>
                <br/>
                <Error error={error}/>
                <div style={styleDiv}>
                <Descriptions  bordered style={{marginTop:50,margin:"auto", width:"95%"}} contentStyle={{backgroundColor:"#D1D1D1"}} labelStyle={{backgroundColor:"#B2AFAF"}}>
                    <Descriptions.Item label="Kleerkast naam">{kleerkast.name}</Descriptions.Item>
                    <Descriptions.Item label="Kleerkast locatie">{kleerkast.location}</Descriptions.Item>
                    </Descriptions>
                    <h2>Kledingstukken in kleerkast {id}</h2>
                    <KledingTable kledingstukken={kleerkast.kledingstukken} loading={loading} onDelete={onDeleteKledingstuk} kleerkasten={kleerkast} />
                    </div>
                </Content>
                </Layout>
                </Spin>
            </div>

        )
    

    
});