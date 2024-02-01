import { Layout, Menu, theme } from "antd";
import {
  Row,
  Col,
  Divider,
  Form,
  Spin,
  Button,
  Dropdown,
  message,
  Tooltip,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserOutlined, HomeOutlined, FileAddOutlined } from "@ant-design/icons";
import "./style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
import { DownloadOutlined, CloudDownloadOutlined } from "@ant-design/icons";

import { LogOut } from "../../Auth/Logout";
import { BASE_URL } from "../../Utils/BaseURL";

const { Sider } = Layout;

function Sidebar(props) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [AdminDashboardData, setAdminDashboardData] = useState({});
  const [wardList, setWardList] = useState([]);
  const [healthPostNameList, setHealthPostNameList] = useState([]);
  const [dispensaryList, setDispensaryList] = useState([]);
  const [selectedWard, setSelectedWard] = useState();
  const [selectedWardName, setSelectedWardName] = useState();
  const [selectedHealthPost, setSelectedHealthPost] = useState();
  const [selectedDispensary, setSelectedDispensary] = useState();
  const [selectedHealthPostName, setSelectedHealthPostName] = useState();
  const [selectedDispensaryName, setSelectedDispensaryName] = useState();

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };
  useEffect(() => {
    console.log(selectedWard);
    console.log(selectedHealthPost);
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/AdminDashboardView`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        params: {
          ...(selectedWard !== "" && { wardId: selectedWard }),
          ...(selectedHealthPost !== "" && {
            healthpost_id: selectedHealthPost,
          }),
        },
      })
      .then((response) => {
        setLoader(false);
        // console.log(response.data);
        setAdminDashboardData(response.data);
      })
      .catch((error) => {
        // console.log(error.response.status);
        setLoader(false);
        if (error.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
    axios
      .get(`${BASE_URL}/allauth/api/GetWardListAPI`, axiosConfig)
      .then((res) => {
        // console.log(res.data);
        setWardList(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  }, [selectedWard, selectedHealthPost]);

  const handleWardSelect = (data) => {
    const [id, wardName] = data.split("|");
    console.log(id);
    setSelectedWard(id);
    setSelectedWardName(wardName);
    setHealthPostNameList([]);
    setSelectedHealthPost("");
    axios
      .get(
        `${BASE_URL}/allauth/api/GethealthPostNameListAPI/${id}`,
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

    //for dispensary
    // const [dispensaryId] = data.split("|");
    console.log(id);
    setSelectedWard(id);
    setSelectedWardName(wardName);
    setDispensaryList([]);
    setSelectedDispensary("");
    axios
      .get(`${BASE_URL}/allauth/api/GetDispensaryListAPI/${id}`, axiosConfig)
      .then((res) => {
        setDispensaryList(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  };

  const handleHealthpostSelect = (data) => {
    const [id, healthPostName] = data.split("|");
    setSelectedHealthPost(id);
    setSelectedHealthPostName(healthPostName);
  };

  const handleDispensarySelect = (data) => {
    const [id, dispensaryName] = data.split("|");
    setSelectedDispensary(id);
    setSelectedDispensaryName(dispensaryName);
  };

  const handleAdminDashboardExcelDownload = () => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/AdminDashboardExportView`, {
        params: {
          ...(selectedWard !== "" && { wardId: selectedWard }),
          ...(selectedHealthPost !== "" && {
            healthpost_id: selectedHealthPost,
          }),
        },
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        setLoader(false);
        console.log(response);
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", `Admin_Dashboard_Data.xlsx`);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
        if (err.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  };

  const handleWardwiseCitizenDownload = () => {
    setLoader(true);
    axios
      .get(
        `${BASE_URL}/adminportal/api/DownloadWardtwiseUserList/${selectedWard}`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("Token")}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        setLoader(false);

        if (JSON.stringify(response.data.message) === "data feteched successfully") {
          console.log("the wardwise data download successful "+response.data.message);
          const href = URL.createObjectURL(response.data);

          const link = document.createElement("a");
          link.href = href;
          link.setAttribute(
            "download",
            `${selectedWardName} ward's Citizens Report.xlsx`
          );

          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          URL.revokeObjectURL(href);
        } else {
          console.error("Data not found. HTTP status code: ", response.data.message);
        }
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.response.status);
        if (err.response.status == 404) {
          message.warning("Please Select Ward");
        } else if (err.response.status == 401) {
          LogOut();
        } else {
          message.warning(err.response.message);
        }
      });
  };
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
        } else {
          message.warning(err.response.message);
        }
      });
  };

  ////////////////////////
  const handleDownloadAllCitizenList = () => {
    axios
      .get(`${BASE_URL}/adminportal/api/DownloadAllWardUserList`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;

        link.setAttribute("download", `All Ward Citizen List.xlsx`);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        console.log(err.response);

        if (err.response && err.response.status) {
          if (err.response.status === 404) {
            message.warning("File Not Found");
          } else if (err.response.status === 401) {
            LogOut();
          } else {
            message.warning(err.response.message);
          }
        } else {
          // Handle other error scenarios
          console.error("Unexpected error:", err);
        }
      });
  };

  ////////////////////////
  const handleDownloadDispensarywise = () => {
    axios
      .get(
        `${BASE_URL}/adminportal/api/DownloadDispensarywiseUserList/${selectedDispensary}`,
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
          `${selectedDispensaryName} ward's Dispensary Report.xlsx`
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        console.log(err.response);

        if (err.response && err.response.status) {
          if (err.response.status === 404) {
            message.warning("Please Select Ward's Dispensary");
          } else if (err.response.status === 401) {
            LogOut();
          } else {
            message.warning(err.response.message);
          }
        } else {
          // Handle other error scenarios
          console.error("Unexpected error:", err);
        }
      });
  };

  const items = [
    {
      key: "1",
      label: (
        <p onClick={handleAdminDashboardExcelDownload}>Download Dashboard</p>
      ),
    },
    {
      key: "4",
      label: <p onClick={handleDownloadAllCitizenList}>Download all Citizen</p>,
    },
    {
      key: "2",
      label: (
        <p onClick={handleWardwiseCitizenDownload}>
          Download Citizens Ward wise
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <p onClick={handleHealthPostwiseCitizenDownload}>
          Download Citizens Healthpost wise
        </p>
      ),
    },

    {
      key: "5",
      label: (
        <p onClick={handleDownloadDispensarywise}>
          Download Citizen Dispensarywise
        </p>
      ),
    },
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const handleButtonClick = () => {
    navigate("/admin/adminDashboard");
    // setShowDropdown(!showDropdown);
  };

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

  //just for tooltip styling onClick operation
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const handleTooltipClick = () => {
    setTooltipOpen(!tooltipOpen);
  };

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
        getItem(
          "All User Details",
          "/admin/allUserDetails",
          null,
          "/admin/allUserDetails"
        ),
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
    getItem(
      <p style={{ color: "white" }}>CREATE/UPDATE</p>,
      null,
      <FileAddOutlined />,
      null,
      [
        getItem("Area", "/admin/arealist", null, "/admin/arealist"),
        getItem("Section", "/admin/sectionlist", null, "/admin/sectionlist"),
      ]
    ),

    getItem(
      <p style={{ color: "white" }}>Download Report</p>,
      null,
      <CloudDownloadOutlined />,
      null,
      [
        {
          key: "/admin/downloadDashboard",
          label: "Download Dashboard",
          icon: null, // You can specify the icon if needed
          path: "/admin/adminDashboard",
          isButton: true,
          onClick: handleAdminDashboardExcelDownload,
        },
        {
          key: "/admin/downloadAllCitizen",
          label: "Download all Citizen",
          icon: null,
          path: "/admin/adminDashboard",
          isButton: true,
          onClick: handleDownloadAllCitizenList,
        },
        {
          key: "/admin/downloadCitizensWardWise",
          // label: "Download Citizens Ward wise",
          label: (
            <Tooltip
              style={{ left: "10px" }}
              title={
                <div>
                  <p>Ward</p>
                  {/* <FormItem label="Ward"> */}
                  <select
                    style={{
                      width: "200px",
                      height: "30px",
                      borderRadius: "5px",
                      margin: "10px 5px",
                      value: { selectedWard },
                    }}
                    onChange={(e) => handleWardSelect(e.target.value)}
                  >
                    {" "}
                    <option value="">All</option>
                    {wardList.map((data, index) => (
                      <option
                        key={data.id}
                        value={`${data.id}|${data.wardName}`}
                      >
                        {data.wardName}
                      </option>
                    ))}
                  </select>
                  {/* </FormItem> */}
                  {/* <p>Healthpost</p> */}
                  {/* <FormItem label="Health Post"> */}
                  {/* <select
                        style={{
                          width: "200px",
                                height:"30px",
                        borderRadius: "5px",
                        margin:"10px 5px",
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
                      </select> */}
                  {/* </FormItem> */}

                  <Button
                    type="primary"
                    shape="round"
                    icon={<DownloadOutlined />}
                    size={3}
                    style={{ marginLeft: "35%" }}
                    onClick={handleWardwiseCitizenDownload}
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
                Download Citizens Ward wise
              </p>
            </Tooltip>
          ),
          icon: null,
          path: "/admin/adminDashboard",
          isButton: true,
          onClick: handleButtonClick,
        },
        {
          key: "/admin/downloadCitizensHealthpostWise",
          // label: "Download Citizens Ward wise",
          label: (
            <Tooltip
              style={{ left: "10px" }}
              title={
                <div>
                  <p>Ward</p>
                  {/* <FormItem label="Ward"> */}
                  <select
                    style={{
                      width: "200px",
                      height: "30px",
                      borderRadius: "5px",
                      margin: "10px 5px",
                      value: { selectedWard },
                    }}
                    onChange={(e) => handleWardSelect(e.target.value)}
                  >
                    {" "}
                    <option value="">All</option>
                    {wardList.map((data, index) => (
                      <option
                        key={data.id}
                        value={`${data.id}|${data.wardName}`}
                      >
                        {data.wardName}
                      </option>
                    ))}
                  </select>
                  {/* </FormItem> */}
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
        {
          key: "/admin/downloadCitizenDispensaryWise",
          // label: "Download Citizens Ward wise",
          label: (
            <Tooltip
              // open={tooltipOpen}
              // onClick={handleTooltipClick}
              style={{ marginLeft: "10px" }}
              title={
                <div style={{ lineHeight: 0 }}>
                  <p>Ward</p>
                  {/* <FormItem label="Ward"> */}
                  <select
                    style={{
                      width: "200px",
                      height: "30px",
                      borderRadius: "5px",
                      margin: "10px 5px",
                      value: { selectedWard },
                    }}
                    onChange={(e) => handleWardSelect(e.target.value)}
                  >
                    {" "}
                    <option value="">All</option>
                    {wardList.map((data, index) => (
                      <option
                        key={data.id}
                        value={`${data.id}|${data.wardName}`}
                      >
                        {data.wardName}
                      </option>
                    ))}
                  </select>
                  {/* </FormItem> */}
                  <p>Dispensary</p>
                  {/* <FormItem label="Dispensary"> */}
                  <select
                    style={{
                      width: "200px",
                      height: "30px",
                      borderRadius: "5px",
                      margin: "10px 5px",
                      value: { selectedWard },
                    }}
                    onChange={(e) => handleDispensarySelect(e.target.value)}
                  >
                    <option value={undefined}>All</option>
                    {dispensaryList.map((data, index) => (
                      // <option key={data.id} value={data.id}>
                      <option
                        key={data.id}
                        value={`${data.id}|${data.dispensaryName}`}
                      >
                        {data.dispensaryName}
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
                    onClick={handleDownloadDispensarywise}
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
                Download Citizen Dispensary wise
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
