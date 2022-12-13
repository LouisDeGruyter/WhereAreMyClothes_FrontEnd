import { useNavigate  } from 'react-router-dom';
import React, {memo,useState, useCallback} from "react";
import {Drawer,Menu } from "antd";
import "./navbar.css";
import { HomeOutlined, MenuOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import kleerkastIcon from '../../images/wardrobe.png';
import kledingIcon from '../../images/shirt.png';
import { useAuth0 } from '@auth0/auth0-react';
 export default memo(function Navbar() {
  
  const [openMenu, setOpenMenu] = useState(false);
  return (
  <div style={{paddingBottom:20}}>
    <div className='menuIcon' style={{backgroundColor:'rgb(150,150,150)', height:60, paddingLeft:12,paddingTop:12}}>
      <MenuOutlined style={{fontSize:30}} onClick={()=>{
      setOpenMenu(true);
    }}/>
      </div>
      <span className='headerMenu'>
    <NavbarItems/>
    </span>
    <Drawer open={openMenu} onClose={()=> {setOpenMenu(false)}} closable={false} bodyStyle={{backgroundColor:'rgb(150,150,150)'}}>
      <NavbarItems isInline/>
    </Drawer>
    </div>
  );
 },[]);

 function NavbarItems({isInline=false}){
  const navigate= useNavigate();
  const {isAuthenticated,user,logout,loginWithRedirect} = useAuth0();
  const handleLogin = useCallback(

    async () => {
      loginWithRedirect();
    },
    [loginWithRedirect],
  );
    let items;
  if(isAuthenticated){
    const {name,picture,givenName}=user;
     items= [{label: 'Home', icon: <HomeOutlined size={30}/>, key: '/', onClick: () => navigate('/')},
    {label: 'Kleerkasten', icon: <img src={kleerkastIcon} alt="Kleerkasten" style={{width:15, height:15}}/>, key: '/kleerkasten', children:[
      {label: 'Kleerkastlijst' , key: '/kleerkastenlijst', onClick: () => navigate('/kleerkasten')},
      {label: 'Voeg toe', key: '/kleerkasten/add', onClick: () => navigate('/kleerkasten/add')}
    ]},
    {label: 'Kleren', icon: <img src={kledingIcon} alt="Kleren" style={{width:15, height:15}}/>, key: '/kleren',  children:[
      {label: 'Klerenlijst' , key: '/klerenlijst', onClick: () => navigate('/kleren')},
      {label: 'Voeg toe', key: '/kleren/add', onClick: () => navigate('/kleren/add')},

    ]},
    {label: name, icon: <img src={picture} alt={givenName} style={{width:15, height:15}}/>, key: '/profiel',className:"profiel",style:{marginLeft:"auto"}, },
    {label: 'Log out', icon: <LogoutOutlined />, key: '/logout', onClick: () => logout({ returnTo: window.location.origin }), style:{color:"darkred"}}
  ];

  }
  else{
     items= [{label: 'Home', icon: <HomeOutlined size={30}/>, key: '/', onClick: () => navigate('/home')},
    {label: 'Kleerkasten', icon: <img src={kleerkastIcon} alt="Kleerkasten" style={{width:15, height:15}}/>, key: '/kleerkasten', children:[
      {label: 'Kleerkastlijst' , key: '/kleerkastenlijst', onClick: () => navigate('/kleerkasten')},
      {label: 'Voeg toe', key: '/kleerkasten/add', onClick: () => navigate('/kleerkasten/add')}
    ]},
    {label: 'Kleren', icon: <img src={kledingIcon} alt="Kleren" style={{width:15, height:15}}/>, key: '/kleren', children:[
      {label: 'Klerenlijst' , key: '/klerenlijst', onClick: () => navigate('/kleren')},
      {label: 'Voeg toe', key: '/kleren/add', onClick: () => navigate('/kleren/add')},
      
    ]},
    {label: 'Log in',style:{marginLeft:"auto"}, icon: <LoginOutlined />, key: '/login', onClick: () => handleLogin()}];
  }
  return(
    <Menu style={{backgroundColor:'rgb(150,150,150)',border:'none',fontSize:18}} mode={isInline?"inline":"horizontal" } items={items} />
  );
 }
