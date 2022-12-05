import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
class RightMenu extends Component {
    render(){
        return(
            <Menu mode="horizontal">
                <Menu.Item key="login">
                    <Link to="/login">Log in</Link>
                </Menu.Item>
                <Menu.Item key="register">
                    <Link to="/register">Registreer</Link>
                </Menu.Item>
            </Menu>
        )
    }
}
export default RightMenu;