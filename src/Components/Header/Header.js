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
        defaultSelectedKeys={"2"}
        className="ant-menu"
      >
        <HeaderLogo src="logo (1).svg"></HeaderLogo>
        <Menu.Item key={"1"}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key={"2"}>
          <Link to="/user">Survey Form</Link>
        </Menu.Item>
        <Menu.Item key={"3"}>
          <Link to="/member-list">Family Head List</Link>
        </Menu.Item>
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
