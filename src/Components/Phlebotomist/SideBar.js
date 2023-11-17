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
import { Menu } from "antd";

import { Link } from "react-router-dom";

// const items = [
//   getItem("Citizen Details", "citizendetails", <UserOutlined />),
//   getItem("CBAC Details", "cbacdetails", <FormOutlined />),
// ];
const Items = [{ key: "1", title: "Citizen Details", link: "/phlebo" }];
function SideBar() {
  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ backgroundColor: "#FFE5AD", minHeight: "100%" }}
      >
        <HeaderLogo src="logo (1).svg"></HeaderLogo>
        <Menu mode="inline" defaultSelectedKeys={window.location.pathname}>
          {Items.map((item) => (
            <Menu.Item key={item.link}>
              <Link to={item.link}>{item.title}</Link>
            </Menu.Item>
          ))}
        </Menu>
        {/* <LogoutDiv onClick={() => LogOut()}>
          <FontAwesomeIcon icon={faPowerOff} />
          <p style={{ margin: "-4px 8px", cursor: "pointer" }}>LogOut</p>
        </LogoutDiv> */}
      </Sider>
    </>
  );
}
export default SideBar;
