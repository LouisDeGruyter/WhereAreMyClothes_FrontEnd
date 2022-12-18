import { useNavigate  } from 'react-router-dom';
import React, {memo,useState, useCallback,useMemo} from "react";
import {Menu,Modal,notification } from "antd";
import "./navbar.css";
import { HomeOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import kleerkastIcon from '../../images/wardrobe.png';
import kledingIcon from '../../images/shirt.png';
import { useAuth0 } from '@auth0/auth0-react';


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
            },
            logout: {
                color: 'darkred',
            },
            menu: {
                backgroundColor:'rgb(150,150,150)',
                border:'none',
                fontSize:18
            },

        }), []);

    
    const items = useMemo(() => {
        if (isAuthenticated) {
          const {name, picture, givenName} = user;
          return [
            {label: 'Home', icon: <HomeOutlined size={30}/>, key: '/', onClick:handleHome},
            {
              label: 'Kleerkasten',
              icon: <img src={kleerkastIcon} alt="Kleerkasten" style={styles.imgIcon}/>,
              key: '/kleerkasten',
              children: [
                {label: 'Kleerkastlijst', key: '/kleerkastenlijst', onClick:handleKleerkasten},
                {label: 'Voeg toe', key: '/kleerkasten/add', onClick:handleKleerkastenAdd}
              ]
            },
            {
              label: 'Kleren',
              icon: <img src={kledingIcon} alt="Kleren" style={styles.imgIcon}/>,
              key: '/kleren',
              children: [
                {label: 'Klerenlijst', key: '/klerenlijst', onClick:handleKleren},
                {label: 'Voeg toe', key: '/kleren/add', onClick:handleKlerenAdd}
              ]
            },
            {label: name, icon: <img src={picture} alt={givenName} style={styles.imgIcon}/>, key: '/profiel', className:"profiel", style:styles.profiel},
            {
              label: 'Log out',
              icon: <LogoutOutlined />,
              key: '/logout',
              onClick:handleLogout,
              style: styles.logout
            }
          ];
        } else {
            return [{label: 'Home', icon: <HomeOutlined size={30}/>, key: '/', onClick:handleHome},
           {label: 'Kleerkasten', icon: <img src={kleerkastIcon} alt="Kleerkasten" style={styles.imgIcon}/>, key: '/kleerkasten', children:[
             {label: 'Kleerkastlijst' , key: '/kleerkastenlijst', onClick:handleKleerkasten},
             {label: 'Voeg toe', key: '/kleerkasten/add', onClick:handleKleerkastenAdd}
           ]},
           {label: 'Kleren', icon: <img src={kledingIcon} alt="Kleren" style={styles.imgIcon}/>, key: '/kleren', children:[
             {label: 'Klerenlijst' , key: '/klerenlijst', onClick: handleKleren},
             {label: 'Voeg toe', key: '/kleren/add', onClick:handleKlerenAdd},
             
           ]},
           {label: 'Log in',style:styles.profiel, icon: <LoginOutlined />, key: '/login', onClick:handleLogin}];
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