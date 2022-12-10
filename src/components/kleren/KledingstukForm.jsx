import {memo,useState, useEffect,useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Button,Form, Select, Input, InputNumber, Layout, notification,Spin} from 'antd';
import Error from '../Error';
import * as kledingstukApi from '../../api/kledingstukken';
import * as kleerkastApi from '../../api/kleerkasten';
import './KledingForm.css'

const {Header, Content} = Layout;
const { Option } = Select;

export default memo(function KledingstukForm() {
    const [error, setError] = useState(null);
    const [kleerkasten, setKleerkasten] = useState([]);
    const [kledingstuk, setKledingstuk] = useState({});
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
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
                await kledingstukApi.updateKledingstuk(id, values);
                openNotificationUpdate();
            }
            setLoading(false);

        } catch (error) {
            setError(error);
        }
    };
    const onFinishFailed = (errorInfo) => {
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
                setError(null);
                const kleerkasten = await kleerkastApi.getAll();
                setKleerkasten(kleerkasten);
            } catch (error) {
                setError(error);
            }
        };
        const fetchKledingstuk = async () => {
            try {
                setError(null);
                
                const kledingstuk = await kledingstukApi.getKledingstukById(id);
                console.log(kledingstuk);
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
            }
        };
        setLoading(true);
        fetchKleerkasten();
        if(id){
            fetchKledingstuk();
        }
        setLoading(false);
    }, [id]);
    const handleKleerkast = (value) => {
        if(value === 0){
            navigate(`/kleerkasten/add`);
    };
    };

    return (

    <div>
        <Spin spinning={loading}>
        {contextHolder}
        <Layout>
        <Header style={{backgroundColor:"white"}}>
            {id ? <h2>Wijzig kledingstuk</h2> : <h2>Maak een kledingstuk aan</h2>}

        </Header>
        <Content>
            <Error error={error}/>
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
                    label="Kleerkast"
                    name="kleerkastId"
                    rules={[{required: true, message: 'Vul een kleerkast in!'}]}
                >
                    <Select placeholder="Selecteer een kleerkast" onChange={handleKleerkast}>
                        <Option value={0} onClick={() =>{ navigate(`/kleerkasten/add`)}} > Klik hier om een kleerkast toe te voegen</Option>

                        {kleerkasten.map((kleerkast) => (
                            <Option key={kleerkast.kleerkastId} value={kleerkast.kleerkastId}>{kleerkast.name}</Option>
                        ))}
                    
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Merk"
                    name="brand"
                    rules={[{required: true, message: 'Vul een merk in!'}]}
                >
                    <Input placeholder='Vul het merk in' style={{textAlign:"center"}}/>
                </Form.Item>
                <Form.Item
                    label="Kleur"
                    name="color"
                    rules={[{required: true, message: 'Vul een kleur in!'}]}
                >
                    <Input placeholder='Vul de kleur van het kledingstuk in' />
                </Form.Item>
                <Form.Item
                    label="Type"
                    name="type"
                    rules={[{required: true, message: 'Vul een type in!'}]}
                >
                    <Input placeholder='Vul het type kledingstuk in'/>
                </Form.Item>
                <Form.Item
                    label="Maat"
                    name="size"
   
                    rules={[{required: true, message: 'Vul een maat in!'}]}
                >
                    <InputNumber style={{display:"block", width:"100%" ,textAlign:"center"}} placeholder="Vul de maat van het kledingstuk in"/>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 7,span: 9, }}>
                    <Button block type="primary" htmlType="submit">
                        Submit
                    </Button>
                    {/* create a button that empties the fields */}
                    <Button block danger onClick={() => form.resetFields()} style={{marginTop:"10px"}}>
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

