import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import "./style.css";
const { Sider } = Layout;
function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const Menus = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "User Management",
    },
  ];
  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
        style={{ background: "#222C38" }}
        className="adminMenu"
      >
        <div
          style={{
            marginLeft: props.collapsed ? "5px" : "0px",
            backgroundColor: "#E0F4FF",
          }}
        >
          <img
            width={props.collapsed ? 70 : 120}
            style={{
              marginLeft: props.collapsed ? "5px" : "35px",
            }}
            src="logo (1).svg"
          ></img>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={Menus}
        />
      </Sider>
    </>
  );
}
export default Sidebar;
