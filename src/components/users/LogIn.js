import  {useEffect, useState} from 'react';
import { Button, Checkbox, Form, Input, Layout } from 'antd';
import './logIn.css'
import { LockOutlined, MailOutlined  } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/authContext';
// import { useUser } from '../../context/userContext';
import Error from '../Error';
const { Content, Header } = Layout;

export default function LogIn () {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const onFinish = (values) => {
    //check of inloggegevens kloppen
    navigate("/home");
  };
//     useEffect(() => {
//       const fetchKledingstuk = async () => {
//           try{
//               setError(null);
//         const kledingstuk = await kledingstukApi.getKledingstukById(id);
//         const kleerkast = await kledingstukApi.getKleerkast(kledingstuk.kleerkastId);
//         setKledingstuk(kledingstuk);
//           } catch (error) {
//               setError(error);
//           }

//       };
//       fetchKledingstuk();
//   }, []);
// }

  const onFinishFailed = (errorInfo) => {
    setError("Foute invoer");
  };
  return (
    <div>
    <Layout>
    <Header style={{backgroundColor: "white", height: "10vh"}}>
      <h1>Log in</h1>
    </Header>
    <Content style={{backgroundColor:"white"}}>
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 17,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{width: "60%", margin: "auto"}}
    >
      <Form.Item
        name={['user', 'email']}
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
            required: true,
          },
        ]}
     
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>

    <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
         <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item wrapperCol={{offset: 7,span: 9, }}>
        <Button block type="primary" htmlType="submit" className="login-form-button">
          Log in
          </Button>
      </Form.Item>
    </Form>
    <Error error={error}/>
    </Content>
    </Layout>
    </div>
  );
};
