import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "../Sider";
import HeaderBar from "../Header";
import { useLocation } from "react-router-dom";
import WardAdminDashboard from "../Content/Dashboard";
import WardHealthworker from "../Content/Healthworker";
import WardCHV from "../Content/WardCHV";

const { Content } = Layout;

function WardAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Layout>
        <Sidebar collapsed={collapsed} />
        <Layout>
          <HeaderBar handleCollapse={handleCollapse} />
          <Content>
            {location.pathname === "/wardadmin/wardadminDashboard" && (
              <WardAdminDashboard />
            )}
            {location.pathname === "/wardadmin/wardhealthWorker" && (
              <WardHealthworker />
            )}
            {location.pathname === "/wardadmin/wardchv" && <WardCHV />}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default WardAdmin;
