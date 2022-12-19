
import React, {memo,useMemo,useState} from "react";
import {Drawer } from "antd";
import "./navbar.scss";
import {MenuOutlined } from '@ant-design/icons';

import NavbarItems from './NavbarItems';
 export default memo(function Navbar() {
  const styles = useMemo(() => ({
    menuIcon: {
      fontSize: 30,
      backgroundColor: '#020034',
      color: 'white',
      padding: 10,
    },
    drawer: {
      backgroundColor: '#020034',
      width: '100%',
    },
    div: {
      paddingBottom: 20,
    },
  }), []);
  const [openMenu, setOpenMenu] = useState(false);
  return (
  <div style={styles.div}>
    <div className='menuIcon' style={styles.menuIcon}>
      <MenuOutlined style={styles.menuIcon} onClick={()=>{
      setOpenMenu(true);
    }}/>
      </div>
      <span className='headerMenu'>
    <NavbarItems/>
    </span>
    <Drawer open={openMenu} onClose={()=> {setOpenMenu(false)}} closable={true} bodyStyle={styles.drawer}>
      <NavbarItems isInline/>
    </Drawer>
    </div>
  );
 },[]);
