import { Button, Dropdown, Layout, Menu, Row, Select, Tooltip } from "antd";
import React from "react";
import {
  DesktopMenu,
  HeaderLogo,
  LogoutOption,
  MobileMenu,
  SubMenu,
  UserIcon,
  UserSelect,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { Link } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../../Utils/BaseURL";
import { Option } from "antd/es/mentions";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { LogOut } from "../../Auth/Logout";

function Header() {
  const menuItems = [
    { key: "1", title: "Dashboard", link: "/dashboard" },
    { key: "2", title: "Survey Form", link: "/register" },
    // Add more menu items as needed
  ];
  // const Logout = () => {
  //   sessionStorage.clear();
  //   window.location.replace("/");
  // let axiosConfig = {
  //   headers: {
  //     Authorization: `Token ${sessionStorage.getItem("Token")}`,
  //   },
  // };
  // axios
  //   .post(`${BASE_URL}/allauth/api/logout`, axiosConfig)
  //   .then((res) => {
  //     console.log(res);
  //     try {
  //       sessionStorage.clear();
  //       window.location.replace("/");
  //     } catch (error) {
  //       console.error(
  //         "Error clearing session storage or redirecting:",
  //         error
  //       );
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Logout error:", error);
  //   });
  // };

  const LogoutItems = [
    {
      key: "0",
      label: (
        <a
          onClick={() => {
            LogOut();
          }}
        >
          Logout
        </a>
      ),
    },
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

      <DesktopMenu
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
        <SubMenu>
          {/* <Tooltip title="Logout">
            <LogOutIcon icon={faRightFromBracket} onClick={() => Logout()} />
          </Tooltip> */}
          <UserIcon icon={faUser} />
          <UserSelect
            value={sessionStorage.getItem("name")}
            onChange={() => LogOut()}
          >
            <LogoutOption key="1">
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </LogoutOption>
          </UserSelect>
        </SubMenu>
      </DesktopMenu>
      <MobileMenu
        mode="vertical"
        theme="dark"
        defaultSelectedKeys={window.location.pathname}
        className="ant-menu"
      >
        <HeaderLogo src="logo (1).svg"></HeaderLogo>
        <SubMenu>
          {/* <Tooltip title="Logout">
            <LogOutIcon icon={faRightFromBracket} onClick={() => Logout()} />
          </Tooltip> */}
          <UserIcon icon={faUser} />
          <UserSelect
            value={sessionStorage.getItem("name")}
            onChange={() => LogOut()}
          >
            <LogoutOption key="1">
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </LogoutOption>
          </UserSelect>
        </SubMenu>
        {menuItems.map((item) => (
          <Menu.Item key={item.link}>
            <Link to={item.link}>{item.title}</Link>
          </Menu.Item>
        ))}
      </MobileMenu>
    </div>
  );
}

export default Header;
