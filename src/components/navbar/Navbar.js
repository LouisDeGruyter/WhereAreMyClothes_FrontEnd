
import React, {memo,useMemo,useState} from "react";
import {Drawer } from "antd";
import "./navbar.css";
import {MenuOutlined } from '@ant-design/icons';

import NavbarItems from './NavbarItems';
 export default memo(function Navbar() {
  const styles = useMemo(() => ({
    menuIcon: {
      backgroundColor: 'rgb(150,150,150)',
      height: 60,
      paddingLeft: 12,
      paddingTop: 12,
    },
    drawer: {
      backgroundColor: 'rgb(150,150,150)',
    },
  }), []);
  const [openMenu, setOpenMenu] = useState(false);
  return (
  <div style={{paddingBottom:20}}>
    <div className='menuIcon' style={styles.menuIcon}>
      <MenuOutlined style={{fontSize:30}} onClick={()=>{
      setOpenMenu(true);
    }}/>
      </div>
      <span className='headerMenu'>
    <NavbarItems/>
    </span>
    <Drawer open={openMenu} onClose={()=> {setOpenMenu(false)}} closable={false} bodyStyle={styles.drawer}>
      <NavbarItems isInline/>
    </Drawer>
    </div>
  );
 },[]);
