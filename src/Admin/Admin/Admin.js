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
import { Footer } from "antd/es/layout/layout";
import AllUserDetails from "../Content/AllUserDetails";



import { createContext, useContext } from 'react';

export const MyContext = createContext();

const { Content } = Layout;

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [sideKey, setSideKey] = useState();
  const location = useLocation();

  const [passedDashboard, setPassedDashboard] = useState(null);
  const [passedHealthpost, setPassedHealthpost] = useState(null);
  const [passedDispensary, setPassedDispensary] = useState(null);
  const [name, setName] = useState(null);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const updateSideKey = (newSideKey,dbVal, hpVal, dpVal, nameVal) => {
    setSideKey(newSideKey);
    setPassedDashboard(dbVal)
    setPassedHealthpost(hpVal)
    setPassedDispensary(dpVal)
    setName(nameVal)
  };


  return (
    <>
      <Layout>
        <MyContext.Provider value={{sideKey, passedDashboard, passedHealthpost, passedDispensary, name, updateSideKey,}}>
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
            {location.pathname === "/admin/allUserDetails" && (
              <AllUserDetails />
            )}
            {location.pathname === "/admin/healthWorkerApproval" && (
              <HealthworkerApproval />
            )}
            {location.pathname === "/admin/chvApproval" && <CHVApproval />}
            {location.pathname === "/admin/arealist" && <Area />}
            {location.pathname === "/admin/sectionlist" && <Section />}
          </Content>
          {/* <Footer>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "end",
              width: "100%",
              marginTop: "4.5%",
            }}
          >
            <p style={{ margin: "0% 1% 0.5% 0%" }}>
              Developed and Maintained By
            </p>
            <img
              src="\BhugolGISLogo.png"
              style={{ width: "10rem", height: "2rem" }}
            />
          </div>
          </Footer> */}
          </Layout>
          </MyContext.Provider>
      </Layout>
    </>
  );
}

export default Admin;
