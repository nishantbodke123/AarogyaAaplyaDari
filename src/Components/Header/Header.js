import { Layout, Menu, Row, Tooltip } from "antd";
import React from "react";
import { HeaderBar, HeaderBarSubDiv, HeaderLogo, LogOutIcon } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { Link } from "react-router-dom";

function Header() {
  const menuItems = [
    { key: '1', title: 'Dashboard', link: '/dashboard' },
    { key: '2', title: 'Survey Form', link: '/user' },
    // Add more menu items as needed
  ];
  return (
    <div>
      {/* <HeaderBar>
        <HeaderLogo src="logo (1).svg"></HeaderLogo>
        <HeaderBarSubDiv>
          <Tooltip title="Logout">
            <LogOutIcon
              icon={faRightFromBracket}
              onClick={() => window.location.replace("/")}
            />
          </Tooltip>
        </HeaderBarSubDiv>
      </HeaderBar> */}
      <Menu
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={window.location.pathname}
        className="ant-menu"
      >
        
        <HeaderLogo src="logo (1).svg"></HeaderLogo>
        {menuItems.map((item) => (
            <Menu.Item key={item.link}>
              <Link to={item.link}>{item.title}</Link>
            </Menu.Item>
          ))}
        <div style={{ position: "absolute", right: "30px", top: "5px" }}>
          <Tooltip title="Logout">
            <LogOutIcon
              icon={faRightFromBracket}
              onClick={() => window.location.replace("/")}
            />
          </Tooltip>
        </div>
      </Menu>
    </div>
  );
}

export default Header;
