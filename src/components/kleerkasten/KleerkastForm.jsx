import {memo,useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Button,Form, Input,Layout, notification,Spin} from 'antd';
import Error from '../Error';
import useKleerkasten from '../../api/kleerkasten';
import { useCallback } from 'react';


const {Content, Header} = Layout;


export default memo(function KleerkastForm() {
    const {id} = useParams();
    const kleerkastApi = useKleerkasten();
    const navigate = useNavigate();
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const [kleerkast, setKleerkast]= useState(null);

    const  openNotificationCreate = () => {
        api.success({
            message: 'Kleerkast toegevoegd',
            description:
                'De kleerkast is toegevoegd aan de database',
                
        });
    };
    const  openNotificationUpdate = () => {
        api.success({
            message: 'Kleerkast gewijzigd',
            description:
                'Sluit dit venster om terug te gaan naar de kleerkast',
            onClose: () => {
                navigate(`/kleerkasten/${id}`);
            },
            duration: 0,
        });
    };
    const onFinishFailed = () => {
        setError("De gegevens zijn niet correct ingevuld");
    };

    useEffect(() => {
        const fetchKleerkast = async () => {
            try {
                setError(null);
                setLoading(true);
                const kleerkast = await kleerkastApi.getKleerkastById(id);
                setKleerkast(kleerkast);
                form.setFieldsValue({
                    name: kleerkast.name,
                    location: kleerkast.location,
                });

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if(id)
            fetchKleerkast();
            else{
                form.resetFields();
            }
        
    }, [id, form]);
    const handleReset = useCallback (() => {
        form.resetFields();
    }, [form]);
    const handleTerug = useCallback (() => {
        navigate("/kleerkasten");
    }, [navigate]);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            setError(null);
            if(!id){
            await kleerkastApi.createKleerkast({...values,userId:1});
            openNotificationCreate();
            
            form.resetFields();
            }
            else{
                if(!kleerkast){
                    setError("Je kan geen kleerkast updaten die niet van jou is");
                    return;
                }
                if(values.name === kleerkast.name && values.location === kleerkast.location){
                    setError("Er zijn geen wijzigingen aangebracht");
                    return;
                }
                await kleerkastApi.updateKleerkast(id,{...values,userId:1});
                openNotificationUpdate();
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div >
            <Spin spinning={loading} size="large">
            {contextHolder}
        <Layout>
            <Header style={{backgroundColor:"white"}}>
                <h2>{id ? `Kleerkast ${id} wijzigen` : 'Kleerkast toevoegen'}</h2>
            </Header>
        <Content>
            
            <Error error={error} />
            <Button block type="primary" onClick={handleTerug} style={{marginBottom:"10px"}}>Terug naar kleerkasten</Button>
                <Form
                     name="basic"
                     labelCol={{
                         span: 4,
                       }}
                       wrapperCol={{
                         span: 17,
                       }}
                     initialValues={{remember: true}}
                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}
                     form={form}
                     style={{width: "70%", margin: "auto"}}
                >
                    <Form.Item
                        label="Naam"
                        name="name"
                        rules={[{required: true, message: 'Kleerkast naam is verplicht'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Locatie"
                        name="location"
                        rules={[{required: true, message: 'Kleerkast locatie is verplicht'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8,span: 9, }}>
                    <Button block type="primary" htmlType="submit" data-cy="submit_kledingstuk">
                        Submit
                    </Button>
                    <Button block danger onClick={handleReset} style={{marginTop:"10px"}} >
                        Reset
                    </Button>
                </Form.Item>
                </Form>
           
        </Content>
        </Layout>
        </Spin>
        </div>
    );
});