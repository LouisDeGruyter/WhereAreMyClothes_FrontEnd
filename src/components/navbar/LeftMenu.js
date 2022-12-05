import React, { Component } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
class leftMenu extends Component {
    render(){
        return(
            <Menu mode="horizontal">
                <Menu.Item key="home">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="Kleerkasten">
                    <Link to="/kleerkasten">Kleerkasten</Link>
                </Menu.Item>
                <Menu.Item key="Kleren">
                    <Link to="/kleren">Kleren</Link>
                </Menu.Item>
            </Menu>
        )
    }
}
export default leftMenu;