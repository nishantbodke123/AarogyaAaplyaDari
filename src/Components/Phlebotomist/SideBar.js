import Sider from "antd/es/layout/Sider";
import React from "react";
import {
  HeaderLogo,
  LogOutIcon,
  LogoutDiv,
  LogoutOption,
  SubMenu,
  UserIcon,
  UserSelect,
} from "./style";
import { Menu, Tooltip } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  faPowerOff,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogOut } from "../../Auth/Logout";

function SideBar() {
  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ backgroundColor: "#FFE5AD" ,height:"100vh" }}
      >
        <HeaderLogo src="logo (1).svg"></HeaderLogo>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[UserOutlined].map((icon, index) => ({
            key: String(index + 1),
            icon: React.createElement(icon),
            label: "Citizen Details",
          }))}
        />
        <LogoutDiv onClick={() => LogOut()}>
          <FontAwesomeIcon icon={faPowerOff} />
          <p style={{ margin: "-4px 10px" }}>LogOut</p>
        </LogoutDiv>
      </Sider>
    </>
  );
}
export default SideBar;
