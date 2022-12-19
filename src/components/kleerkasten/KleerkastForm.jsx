import {memo,useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Button,Form, Input,Layout, notification,Spin} from 'antd';
import Error from '../Error';
import useKleerkasten from '../../api/kleerkasten';
import { useCallback } from 'react';
import { useMemo } from 'react';


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
    const styles= useMemo (() => ({
        form: {
            width: "50%",
            margin: "auto",
            
            
        },
        layout: {
            backgroundColor: "white",
        },
        error: {
            marginBottom: "10px",
        },
        resetButton: {
            marginTop: "10px",
            width: "70%",
            height: "50px",
        },
        backButton: {
            color: "white",
            backgroundColor: "#181649",
            width: "70%",
            height: "50px",
        },
        submit: {
            width: "70%",
            marginTop: 20,
            marginBottom: 20,
            height: "50px",
        },
    }), []);
    return (
        <div >
            <Spin spinning={loading} size="large">
            {contextHolder}
        <Layout>
            <Header style={styles.layout}>
                <h2>{id ? `Kleerkast ${id} wijzigen` : 'Kleerkast toevoegen'}</h2>
            </Header>
        <Content style={styles.layout}>
            
            <Error error={error} />
           
                <Form
                     name="basic"
                     initialValues={{remember: true}}
                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}
                     form={form}
                     style={styles.form}
                     labelCol={{span: 24}}
                >
                    <Form.Item>
                        <Button block style={styles.backButton} onClick={handleTerug}>
                            Terug naar kleerkasten
                        </Button>
                    </Form.Item>
                    <Form.Item
                        label="Naam"
                        name="name"
                       
                        data-cy="kleerkast_naam"
                        rules={[{required: true, message: 'Kleerkast naam is verplicht'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Locatie"
                        name="location"
                        data-cy="kleerkast_locatie"
                        rules={[{required: true, message: 'Kleerkast locatie is verplicht'}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                    <Button block type="primary" htmlType="submit" data-cy="submit_kleerkast" style={styles.submit}>
                        Submit
                    </Button>
                    <br />
                    <Button block danger onClick={handleReset} style={styles.resetButton} >
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