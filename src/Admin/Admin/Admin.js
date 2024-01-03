import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "../Sider";
import HeaderBar from "../Header";
import AdminDashboard from "../Content/Dashboard";
import Healthworker from "../Content/Healthworker";
import CHV from "../Content/CHV";
import MO from "../Content/MO";
import { useLocation } from "react-router-dom";
import HealthworkerApproval from "../AdminApproval/Content/Healthworker";
import CHVApproval from "../AdminApproval/Content/CHV";
import AreaAndSection from "../CreateAndUpdate/Areas";
import Area from "../CreateAndUpdate/Areas";
import Section from "../CreateAndUpdate/Sections";

const { Content } = Layout;

function Admin() {
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
            {location.pathname === "/admin/adminDashboard" && (
              <AdminDashboard />
            )}
            {location.pathname === "/admin/healthWorker" && <Healthworker />}
            {location.pathname === "/admin/chv" && <CHV />}
            {location.pathname === "/admin/mo" && <MO />}
            {location.pathname === "/admin/healthWorkerApproval" && (
              <HealthworkerApproval />
            )}
            {location.pathname === "/admin/chvApproval" && <CHVApproval />}
            {location.pathname === "/admin/arealist" && <Area/>}
            {location.pathname === "/admin/sectionlist" && <Section/>}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Admin;
