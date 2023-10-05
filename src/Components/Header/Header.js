import { Button, Dropdown, Layout, Menu, Row, Select, Tooltip } from "antd";
import React from "react";
import {
  HeaderBar,
  HeaderBarSubDiv,
  HeaderLogo,
  LogOutIcon,
  LogoutOption,
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

function Header() {
  const menuItems = [
    { key: "1", title: "Dashboard", link: "/dashboard" },
    { key: "2", title: "Survey Form", link: "/user" },
    // Add more menu items as needed
  ];
  const Logout = () => {
    sessionStorage.clear();
    window.location.replace("/");
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
  };

  const LogoutItems = [
    {
      key: "0",
      label: (
        <a
          onClick={() => {
            Logout();
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
          {/* <Tooltip title="Logout">
            <LogOutIcon icon={faRightFromBracket} onClick={() => Logout()} />
          </Tooltip> */}
          <UserSelect
            value={sessionStorage.getItem("name")}
            onChange={() => Logout()}
          >
            <LogoutOption key="1">
              <FontAwesomeIcon icon={faRightFromBracket} /> Logout
            </LogoutOption>
          </UserSelect>
        </div>
      </Menu>
    </div>
  );
}

export default Header;
