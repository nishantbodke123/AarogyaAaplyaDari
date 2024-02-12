import { Layout, Menu, theme, Button, Tooltip, message } from "antd";
import React, { useState, useEffect } from "react";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import "./style.css";
import { DownloadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOut } from "../../Auth/Logout";
import { BASE_URL } from "../../Utils/BaseURL";

const { Sider } = Layout;
function Sidebar(props) {
  const navigate = useNavigate();
  const wardId = sessionStorage.getItem("ward_id");
  const wardName = sessionStorage.getItem("wardName");

  const [collapsed, setCollapsed] = useState(false);
  const [loader, setLoader] = useState(false);
  const [AdminDashboardData, setAdminDashboardData] = useState({});
  const [selectedWard, setSelectedWard] = useState();
  const [selectedHealthPost, setSelectedHealthPost] = useState();
  const [wardList, setWardList] = useState([]);
  const [healthPostNameList, setHealthPostNameList] = useState([]);
  const [selectedHealthPostName, setSelectedHealthPostName] = useState();
  const [selectedWardName, setSelectedWardName] = useState();

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

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };
  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/allauth/api/GethealthPostNameListAPI/${wardId}`,
        axiosConfig
      )
      .then((res) => {
        console.log(res.data.data);
        setHealthPostNameList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  }, [wardId]);

  const handleHealthPostwiseCitizenDownload = () => {
    axios
      .get(
        `${BASE_URL}/adminportal/api/DownloadHealthpostwiseUserList/${selectedHealthPost}`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("Token")}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          `${selectedHealthPost} Healthpost's Citizens Report.xlsx`
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status == 404) {
          message.warning("Please Select Healthpost");
        } else if (err.response.status == 401) {
          LogOut();
        } else if (err.response.status == 400) {
          message.warning("Data is not available");
        } else {
          message.warning("Error" + err.response.message);
        }
      });
  };

  const handleWardwiseCitizenDownload = () => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/DownloadWardtwiseUserList/${wardId}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        // setLoader(false);
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          // `${wardName} ward's Citizens Report.xlsx`
          `${response}.xlsx`
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.response.status);
        if (err.response.status == 404) {
          message.warning("Please Select Ward");
        } else if (err.response.status == 401) {
          LogOut();
        } else if (err.response.status == 400) {
          message.warning("Data is not available");
        } else {
          message.warning("Error" + err.response.message);
        }
      });
  };

  const handleHealthpostSelect = (data) => {
    const [id, healthPostName] = data.split("|");
    setSelectedHealthPost(id);
    setSelectedHealthPostName(healthPostName);
  };

  const handleButtonClick = () => {
    navigate("/wardadmin/wardadminDashboard");
    // setShowDropdown(!showDropdown);
  };

  const Menus = [
    getItem(
      "Dashboard",
      "/wardadmin/wardadminDashboard",
      <HomeOutlined />,
      "/wardadmin/wardadminDashboard"
    ),
    getItem(
      <p style={{ color: "white" }}>User Management</p>,
      null,
      <UserOutlined />,
      null,
      [
        getItem(
          "ANM/Co-Ordinator",
          "/wardadmin/wardhealthWorker",
          null,
          "/wardadmin/wardhealthWorker"
        ),
        getItem("CHV/ASHA", "/wardadmin/wardchv", null, "/wardadmin/wardchv"),
        // getItem("MO", "/admin/mo", null, "/admin/mo"),
      ]
    ),
    getItem(
      <p style={{ color: "white" }}>Download Report</p>,
      null,
      <CloudDownloadOutlined />,
      null,
      [
        {
          key: "/admin/downloadCitizensWardWise",
          label: (
            <p
              style={{
                color: "white",
                whiteSpace: "break-spaces",
                lineHeight: "20px",
              }}
            >
              Download Citizens Ward wise
            </p>
          ),
          // "Download Citizens Ward wise",
          icon: null,
          path: "/admin/adminDashboard",
          isButton: true,
          onClick: handleWardwiseCitizenDownload,
        },
        {
          key: "/admin/downloadCitizensHealthpostWise",
          // label: "Download Citizens Ward wise",
          label: (
            <Tooltip
              style={{ left: "10px" }}
              title={
                <div>
                  <p>Healthpost</p>
                  {/* <FormItem label="Health Post"> */}
                  <select
                    style={{
                      width: "200px",
                      height: "30px",
                      borderRadius: "5px",
                      margin: "10px 5px",
                      value: { selectedWard },
                    }}
                    onChange={(e) => handleHealthpostSelect(e.target.value)}
                  >
                    <option value={undefined}>All</option>
                    {healthPostNameList.map((data, index) => (
                      <option
                        key={data.id}
                        value={`${data.id}|${data.healthPostName}`}
                      >
                        {data.healthPostName}
                      </option>
                    ))}
                  </select>
                  {/* </FormItem> */}

                  <Button
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                    size={3}
                    style={{ marginLeft: "35%" }}
                    onClick={handleHealthPostwiseCitizenDownload}
                  />
                </div>
              }
              placement="right"
            >
              <p
                style={{
                  color: "white",
                  whiteSpace: "break-spaces",
                  lineHeight: "20px",
                }}
              >
                Download Citizens Healthpost wise
              </p>
            </Tooltip>
          ),
          icon: null,
          path: "/admin/adminDashboard",
          isButton: true,
          onClick: handleButtonClick,
        },
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
