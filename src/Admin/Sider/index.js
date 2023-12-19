import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";
const { Sider } = Layout;
function Sidebar(props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let basePath = window.location.pathname;

  function getItem(label, key, icon, path, children, type) {
    return {
      key,
      icon,
      children,
      path,
      label: <Link to={path}>{label}</Link>,
      type,
    };
  }
  const Menus = [
    getItem(
      "Dashboard",
      "/admin/adminDashboard",
      <HomeOutlined />,
      "/admin/adminDashboard"
    ),
    getItem(
      <p style={{ color: "white" }}>User Management</p>,
      null,
      <UserOutlined />,
      null,
      [
        getItem(
          "ANM/Co-Ordinator",
          "/admin/healthWorker",
          null,
          "/admin/healthWorker"
        ),
        getItem("CHV/ASHA", "/admin/chv", null, "/admin/chv"),
        getItem("MO", "/admin/mo", null, "/admin/mo"),
      ]
    ),
    getItem(
      <p style={{ color: "white" }}>User Approval</p>,
      null,
      <UserOutlined />,
      null,
      [
        getItem(
          "ANM/Co-Ordinator",
          "/admin/healthWorkerApproval",
          null,
          "/admin/healthWorkerApproval"
        ),
        getItem("CHV/ASHA", "/admin/chvApproval", null, "/admin/chvApproval"),
      ]
    ),
  ];
  return (
    <>
      <Sider
        trigger={null}
        collapsible
        collapsed={props.collapsed}
        style={{ background: "#222C38", height: "100vh" }}
        className="adminMenu"
        width={230}
      >
        <div
          style={{
            marginLeft: props.collapsed ? "0px" : "0px",
            backgroundColor: "#E0F4FF",
          }}
        >
          <img
            width={props.collapsed ? 70 : 120}
            style={{
              marginLeft: props.collapsed ? "5px" : "55px",
            }}
            src={process.env.PUBLIC_URL + "/logo (1).svg"}
          ></img>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={basePath}
          items={Menus}
        />
      </Sider>
    </>
  );
}
export default Sidebar;
