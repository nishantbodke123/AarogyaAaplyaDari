import { Button, Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import Sidebar from "../Sider";
import HeaderBar from "../Header";
import ContentArea from "../Content";

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
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
      <Layout>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <HeaderBar handleCollapse={handleCollapse} />
          <ContentArea />
        </Layout>
      </Layout>
    </>
  );
}
export default Admin;
