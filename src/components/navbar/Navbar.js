import { Link   } from 'react-router-dom';
import React, {memo,useState } from "react";
import {Drawer,Menu } from "antd";
// import "antd/dist/antd.css";
import "./navbar.css";
import { HomeOutlined, MenuOutlined, LoginOutlined } from '@ant-design/icons';
import {IoCaretUp} from 'react-icons/io5';
import kleerkastIcon from '../../images/wardrobe.png';
import kledingIcon from '../../images/shirt.png';

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
 });
 function NavbarItems({isInline=false}){
  return(
    <Menu  style={{backgroundColor:'rgb(150,150,150)',border:'none'}} mode={isInline?"inline":"horizontal" }>
      <Menu.Item key="/" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/kleerkasten" icon={<kleerkastIcon />}>
        <Link to="/kleerkasten">Kleerkasten</Link>
      </Menu.Item>
      <Menu.Item key="/kleren" icon={<kledingIcon/>}>
      <Link to="/kleren">Kleren</Link>
      </Menu.Item>
      <Menu.Item key="/login" icon={<LoginOutlined />} className='MenuRight'>
        <Link to="/login">Log in</Link>
      </Menu.Item>
      <Menu.Item key="/register" icon={<IoCaretUp />} className='MenuRight'>
        <Link to="/register">Registreer</Link>
        </Menu.Item>
    </Menu>
  );
 }

// export default memo(function Navbar() {
//  {/* const { theme, toggleTheme } = useTheme(); */}
//   const theme= themes.dark
//   return (
//     <nav className={`navbar navbar-expand-lg bg- mb-4`}>
//       <div className="container-fluid">
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbar">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <NavItem label="Kleerkasten" to="/kleerkasten" />
//             <NavItem label="Kleren" to="/kleren" />
//           </ul>
//           <div className="d-flex">
//             <button type="button"  > {/*onClick={toggle theme}  */}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// })