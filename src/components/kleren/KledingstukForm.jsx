import {memo,useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Button,Form, Select, Input, notification,Spin} from 'antd';
import Error from '../Error';
import useKledingstukken from '../../api/kledingstukken';
import useUsers from '../../api/users';
import './KledingForm.css'
import { useCallback } from 'react';
import { useMemo } from 'react';


const { Option } = Select;

export default memo(function KledingstukForm() {
    const kledingstukApi= useKledingstukken();
    const userApi = useUsers();
    const [error, setError] = useState(null);
    const [kleerkasten, setKleerkasten] = useState([]);
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [kledingstuk, setKledingstuk]= useState(null);
    const navigate = useNavigate();
    const {id} = useParams();
    const [form] = Form.useForm();
   const onFinish = async (values) => {
        try {
            setLoading(true);
            setError(null);
            if(!id){
            await kledingstukApi.createKledingstuk(values);
            openNotificationCreate();
            
            form.resetFields();
            }
            else{
                if(!kledingstuk){
                    setError("Je kan geen kledingstuk updaten die niet van jou is");
                    return;
                }
                if(values.kleerkastId === kledingstuk.kleerkastId && values.brand === kledingstuk.brand && values.color === kledingstuk.color && values.size === kledingstuk.size && values.type === kledingstuk.type ){
                    setError("Er zijn geen aanpassingen gemaakt");
                    return;
                }
                await kledingstukApi.updateKledingstuk(id, values);
                openNotificationUpdate();
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    const onFinishFailed = () => {
        setError("De gegevens zijn niet correct ingevuld");
    };
   const  openNotificationCreate = () => {
        api.success({
            message: 'Kledingstuk toegevoegd',
            description:
                'Het kledingstuk is toegevoegd aan de database',
                
        });
    };
    const  openNotificationUpdate = () => {
        api.success({
            message: 'Kledingstuk gewijzigd',
            description:
                'Sluit dit venster om terug te gaan naar het kledingstuk',
            onClose: () => {
                navigate(`/kleren/${id}`);
            },
            duration: 0,
        });
    };
    useEffect(() => {
        const fetchKleerkasten = async () => {
            try {
                setLoading(true);
                setError(null);
                const kleerkasten = await userApi.getKleerkasten();
                setKleerkasten(kleerkasten);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        const fetchKledingstuk = async () => {
            try {
                setError(null);
                setLoading(true);
                const kledingstuk = await kledingstukApi.getKledingstukById(id);
                setKledingstuk(kledingstuk);
                form.setFieldsValue({
                    kleerkastId: kledingstuk.kleerkastId,
                    color: kledingstuk.color,
                    size: kledingstuk.size,
                    brand: kledingstuk.brand,
                    type: kledingstuk.type,
                });

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchKleerkasten();
        if(id)
            fetchKledingstuk();
            else{
                form.resetFields();
            }
            
        
    }, [id, form]);
    const handleKleerkast = (value) => {
        if(value === 0){
            navigate(`/kleerkasten/add`);
    };
    };
    const handleReset = useCallback (() => {
        form.resetFields();
    }, [form]);
    const handleAddKleerkast = useCallback (() => {
        navigate(`/kleerkasten/add`);
    }, []);
    const handleBackClick = useCallback (() => {
        navigate(`/kleren`);
    }, []);
    const styles = useMemo (() => ({
        form: {
            width: "60%",
            margin: "auto",
        },
        backButton: {
            marginBottom: "10px",
            color: "white",
            backgroundColor: "#181649",
            width: "70%",
            height: "50px",
        },
        buttonreset: {
            marginTop: "10px",
            width: "70%",
            height: "50px",
        },
        layout: {
            backgroundColor: "white",
        },
        submit: {
            width: "70%",
            height: "50px",
            marginTop: "20px",
            marginBottom: "20px",
        },
    }), []);

    return (

    <div>
        <Spin spinning={loading} size="large">
        {contextHolder}
     
     
            {id ? <h2>Wijzig kledingstuk {id}</h2> : <h2>Maak een kledingstuk aan</h2>}

   
            <Error error={error}/>
            <Form
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
                style={styles.form}
                labelCol={{span: 24}}
            >
                <Form.Item >
                <Button block  onClick={handleBackClick} style={styles.backButton}>Terug naar kleren</Button>
                </Form.Item>
                <Form.Item
                
                
                    
                    label="Kleerkast"
                    labelPosition="top"
                    name="kleerkastId"
                    rules={[{required: true, message: 'Vul een kleerkast in!'}]}
                >
                    <Select placeholder="Selecteer een kleerkast" onChange={handleKleerkast} data-cy="kleerkast_input">
                        <Option value={0} onClick={handleAddKleerkast} > Klik hier om een kleerkast toe te voegen</Option>

                        {kleerkasten.map((kleerkast) => (
                            <Option key={kleerkast.kleerkastId} value={kleerkast.kleerkastId}>{kleerkast.name}</Option>
                        ))}
                    
                    </Select>
                </Form.Item>
                <Form.Item
                    data-cy="brand_input2"
                    label="Merk"
                    name="brand"
                    rules={[{required: true, message: 'Vul een merk in!'}]}
                >
                    <Input placeholder='Vul het merk in' data-cy="brand_input"/>
                </Form.Item>
                <Form.Item
                    
                    label="Kleur"
                    name="color"
                    rules={[{required: true, message: 'Vul een kleur in!'}]}
                >
                    <Input data-cy="color_input" placeholder='Vul de kleur van het kledingstuk in' />
                </Form.Item>
                <Form.Item
                    
                    label="Type"
                    name="type"
                    rules={[{required: true, message: 'Vul een type in!'}]}
                >
                    <Input data-cy="type_input" placeholder='Vul het type kledingstuk in'/>
                </Form.Item>
                <Form.Item
                    
                    label="Maat"
                    name="size"
   
                    rules={[{required: true, message: 'Vul een maat in!'}]}
                >
                    <Input data-cy="size_input" type="number" placeholder="Vul de maat van het kledingstuk in" />
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit" data-cy="submit_kledingstuk" style={styles.submit}>
                        Submit
                    </Button>
                    <br />
                    <Button block danger onClick={handleReset} style={styles.buttonreset} >
                        Reset
                    </Button>
                </Form.Item>
            </Form>
    
        </Spin>
    </div>
    );
});

