import { useNavigate  } from 'react-router-dom';
import React, {memo, useCallback,useMemo} from "react";
import {Menu,Modal,notification } from "antd";
import { HomeOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import kleerkastIcon from '../../images/wardrobeWhite.png';
import kledingIcon from '../../images/shirtWhite.png';
import { useAuth0 } from '@auth0/auth0-react';
import './navbarItems.scss';


export default memo(function NavbarItems({isInline=false}){
    const navigate= useNavigate();
    const {isAuthenticated,user,logout,loginWithRedirect} = useAuth0();
    const [api, contextHolder] = notification.useNotification();
    const handleLogin = useCallback( () => {
        loginWithRedirect();
      },
      [loginWithRedirect],
    );
    const handleLogout = useCallback( () => {
        Modal.confirm({
            title: 'Uitloggen?',
            content: 'Weet u zeker dat u wilt uitloggen?',
            okText: 'Ja',
            okType: 'danger',
            cancelText: 'Nee',
            onOk: () => {
                logout({ returnTo: window.location.origin });
                openNotification();
            },
          });
        },
        [logout],
        );
        const openNotification = () => {
            api['success']({
                message: 'Succesvol uitgelogd',
                  placement: 'topRight',
                  duration: 3,
                  });
        };
    const handleKleerkasten = useCallback( () => {
            navigate('/kleerkasten');
        },
        [navigate],
        );
        const handleKleerkastenAdd = useCallback( () => {
                navigate('/kleerkasten/add');
            },
            [navigate],
            );

    const handleKleren = useCallback(() => {
            navigate('/kleren');
        },
        [navigate],
        );
    const handleHome = useCallback( () => {
            navigate('/');
        },
        [navigate],
        );

    const handleKlerenAdd = useCallback( () => {
            navigate('/kleren/add');
        },
        [navigate],
        );
        const styles = useMemo(() => ({
            imgIcon: {
                width: 15,
                height: 15,
            },
            profiel: {
                marginLeft: 'auto',
                color: 'white',
            },
            logout: {
                color: 'red',
            },
            menu: {
                backgroundColor:'#020034',
                border:'none',
                fontSize:18
            },
            label: {
                color: 'white',
            },
            profielfoto: {
                width: 20,
                height: 20,
          
            },
            login: {
                color: 'white',
                marginLeft: 'auto',
            },

        }), []);

    
    const items = useMemo(() => {
        if (isAuthenticated) {
          const {name, picture, givenName} = user;
          return [
            {label: 'Home', icon: <HomeOutlined size={30}/>, key: '/', onClick:handleHome, style:styles.label},
            {
              label: 'Kleerkasten', style:styles.label,
              icon: <img src={kleerkastIcon} alt="Kleerkasten" style={styles.imgIcon}/>,
              key: '/kleerkasten',
              children: [
                {label: 'Kleerkastlijst', key: '/kleerkastenlijst', onClick:handleKleerkasten},
                {label: 'Voeg toe', key: '/kleerkasten/add', onClick:handleKleerkastenAdd}
              ]
            },
            {
              label: 'Kleren', style:styles.label,
              icon: <img src={kledingIcon} alt="Kleren" style={styles.imgIcon}/>,
              key: '/kleren',
              children: [
                {label: 'Klerenlijst', key: '/klerenlijst', onClick:handleKleren},
                {label: 'Voeg toe', key: '/kleren/add', onClick:handleKlerenAdd}
              ]
            },
            {label: name, style:styles.label,  icon: <img src={picture} alt={givenName} style={styles.profielfoto}/>, key: '/profiel', className:"profiel", style:styles.profiel},
            {
              label: 'Log out',
              
              icon: <LogoutOutlined />,
              key: '/logout',
              onClick:handleLogout,
              style: styles.logout
            }
          ];
        } else {
            return [{label: 'Home', icon: <HomeOutlined size={30}/>, key: '/', onClick:handleHome, style:styles.label},
           {label: 'Kleerkasten', icon: <img src={kleerkastIcon} alt="Kleerkasten" style={styles.imgIcon}/>, key: '/kleerkasten', style:styles.label, children:[
             {label: 'Kleerkastlijst' , key: '/kleerkastenlijst', onClick:handleKleerkasten},
             {label: 'Voeg toe', key: '/kleerkasten/add', onClick:handleKleerkastenAdd}
           ]},
           {label: 'Kleren', style:styles.label, icon: <img src={kledingIcon} alt="Kleren" style={styles.imgIcon}/>, key: '/kleren', children:[
             {label: 'Klerenlijst' , key: '/klerenlijst', onClick: handleKleren},
             {label: 'Voeg toe', key: '/kleren/add', onClick:handleKlerenAdd},
             
           ]},
           {label: 'Log in',style:styles.login, icon: <LoginOutlined />, key: '/login', onClick:handleLogin}];
         }
        },
        [isAuthenticated, user, logout, navigate, handleLogin],
        );
    return(
        <>
        {contextHolder}
      <Menu style={styles.menu} mode={isInline?"inline":"horizontal" } items={items} />
        
        </>
    );
   });