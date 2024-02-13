import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "../Sider";
import HeaderBar from "../Header";
import { useLocation } from "react-router-dom";
import WardAdminDashboard from "../Content/Dashboard";
import WardHealthworker from "../Content/Healthworker";
import WardCHV from "../Content/WardCHV";
import { Footer } from "antd/es/layout/layout";
import axios from 'axios';
import { createContext, useContext } from 'react';

export const MyContext = createContext();

const { Content } = Layout;

function WardAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();


  const [sideKey, setSideKey] = useState();
  const [passedHealthpost, setPassedHealthpost] = useState();


  // const [wardId, setWardId] = useState(null);
  const wardId = sessionStorage.getItem("ward_id");
  console.log("Ward id is "+wardId  )

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const updateSideKey = (newSideKey, hpVal) => {
    console.log("The value got from the sider into updateSideKey is "+newSideKey+"hp is "+hpVal)
    setSideKey(newSideKey);
    setPassedHealthpost(hpVal)

  };


  return (
    <>
      <Layout>
      <MyContext.Provider value={{sideKey, passedHealthpost, updateSideKey,}}>
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
          {/* <Footer>
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "end",
                width: "100%",
                margin: "-1% 0% 0% 0%",
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

export default WardAdmin;
