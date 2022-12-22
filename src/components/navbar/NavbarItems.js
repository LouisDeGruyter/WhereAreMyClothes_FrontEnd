import { useNavigate  } from 'react-router-dom';
import React, {memo, useCallback,useMemo} from "react";
import {Menu,Modal,notification } from "antd";
import { HomeOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import kleerkastIcon from '../../images/wardrobeWhite.png';
import kledingIcon from '../../images/shirtWhite.png';
import { useAuth0 } from '@auth0/auth0-react';
import { IoMoonSharp, IoSunny} from 'react-icons/io5';
import { useTheme, themes, useThemeColors } from '../../contexts/Theme.context';
import './navbarItems.scss';


export default memo(function NavbarItems({isInline=false,closeMenu}){
    const navigate= useNavigate();
    const {isAuthenticated,user,logout,loginWithRedirect} = useAuth0();
    const [api, contextHolder] = notification.useNotification();
    const { theme, toggleTheme } = useTheme();
    const handleLogin = useCallback( () => {
        loginWithRedirect();
        if(isInline)
            closeMenu();
      },
      [loginWithRedirect],
    );
    const handleLogout = useCallback( () => {
        if(isInline)
            closeMenu();
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
            if(isInline)
            closeMenu();
        },
        [navigate],
        );
        const handleKleerkastenAdd = useCallback( () => {
                navigate('/kleerkasten/add');
                if(isInline)
            closeMenu();
            },
            [navigate],
            );

    const handleKleren = useCallback(() => {
            navigate('/kleren');
            if(isInline)
            closeMenu();
        },
        [navigate],
        );
    const handleHome = useCallback( () => {
            navigate('/');
            if(isInline)
            closeMenu();
        },
        [navigate],
        );

    const handleKlerenAdd = useCallback( () => {
            navigate('/kleren/add');
            if(isInline)
            closeMenu();
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
        const handleTheme = useCallback( () => {
            toggleTheme();
        }, [toggleTheme]);


    
    const items = useMemo(() => {
        if (isAuthenticated) {
          const {name, picture, givenName} = user;
          return [
            {
              label:"",  icon : theme === themes.dark ? <IoMoonSharp /> : <IoSunny />, key: '/theme', onClick:toggleTheme, style:styles.label
            },
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
           
            {label: name, style:styles.profiel,  icon: <img src={picture} alt={givenName} style={styles.profielfoto}/>, key: '/profiel', className:"profiel"},
            {
              label: 'Log out',
              
              icon: <LogoutOutlined />,
              key: '/logout',
              onClick:handleLogout,
              style: styles.logout
            }
          ];
        } else {
            return [{
              label:"",  icon : theme === themes.dark ? <IoMoonSharp /> : <IoSunny />, key: '/theme', onClick:toggleTheme, style:styles.label
            },
              {label: 'Home', icon: <HomeOutlined size={30}/>, key: '/', onClick:handleHome, style:styles.label},
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
        [isAuthenticated, user, logout, navigate, handleLogin, theme],
        );
    return(
        <>
        {contextHolder}
      <Menu style={styles.menu} mode={isInline?"inline":"horizontal" } items={items} />
        
        </>
    );
   });