import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Card, Col, Row, Spin, Table, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseURL";

const Dashboard = () => {
  const [dashboardCounts, setDashboardCounts] = useState({});
  const [familyHeadList ,setFamilyHeadList]=useState([]);
  const [loading ,setLoading]=useState(false);
  useEffect(() => {
    setLoading(true);
    let axiosConfig = {
      headers: {
        Authorization: `Token ${sessionStorage.getItem("Token")}`,
      },
    };
    console.log(axiosConfig);
    axios
      .get(`${BASE_URL}/healthworker/api/GetSurveyorDashboard`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setDashboardCounts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
        setLoading(false);
      });
      axios.get(`${BASE_URL}/healthworker/api/GetFamilyHeadList`,axiosConfig).then((response)=>{
        console.log(response.data);
        setFamilyHeadList(response.data);
        setLoading(false);
       }).catch((error)=>{
        console.log(error);
        setLoading(false);
       })
  }, []);
  const Items=[
    {
        title:"ID",
        dataIndex:"id"
    },
    {
        title:"Family ID",
        dataIndex:"familyId"
    },
    {
        title:"Name",
        dataIndex:"name"
    },
    {
        title:"Mobile Number",
        dataIndex:"mobileNo"
    },
    {
        title:"Total Family Members",
        dataIndex:"totalFamilyMembers"
    },
    
]
  return (
    <>
    <Spin tip="Loading" spinning={loading}>
      <Header />
      <div style={{ margin: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "70px",
          }}
        >
          <div
            style={{
              width: "220px",
              height: "110px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >
            <div style={{ margin: "5px 10px" }}>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    style={{ marginTop: "22px", marginRight: "7px" }}
                    icon={faBars}
                  />
                </Col>
                <Col>
                  <h3>Today's Citizen Count</h3>
                </Col>
              </Row>
              {dashboardCounts.todays_count}
            </div>
          </div>
          <div
            style={{
              width: "220px",
              height: "110px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >
            <div style={{ margin: "5px 10px" }}>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    style={{ marginTop: "22px", marginRight: "7px" }}
                    icon={faBars}
                  />
                </Col>
                <Col>
                  <h3>Today's Family Count </h3>
                </Col>
              </Row>
              {dashboardCounts.today_family_count}
            </div>
          </div>
          <div
            style={{
              width: "220px",
              height: "110px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >
            <div style={{ margin: "5px 10px" }}>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    style={{ marginTop: "22px", marginRight: "7px" }}
                    icon={faBars}
                  />
                </Col>
                <Col>
                  <h3>Total Count</h3>
                </Col>
              </Row>
              {dashboardCounts.total_count}
            </div>
          </div>
    
          <div
            style={{
              width: "220px",
              height: "110px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >
            <div style={{ margin: "5px 10px" }}>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    style={{ marginTop: "22px", marginRight: "7px" }}
                    icon={faBars}
                  />
                </Col>
                <Col>
                  <h3>Total Family Count</h3>
                </Col>
              </Row>
              {dashboardCounts.total_family_count}
            </div>
          </div>
          <div
            style={{
              width: "220px",
              height: "110px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
            }}
          >
            <div style={{ margin: "5px 10px" }}>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    style={{ marginTop: "22px", marginRight: "7px" }}
                    icon={faBars}
                  />
                </Col>
                <Col>
                  <h3>Partial Survey </h3>
                </Col>
              </Row>
              {dashboardCounts.partial_survey_count}
            </div>
          </div>
        </div>
      </div>
      <div style={{margin:"50px 40px"}}>
        <h3>Family Heads </h3>
    <Table columns={Items} dataSource={familyHeadList} bordered ></Table>
    </div>
    </Spin>
    </>
  );
};

export default Dashboard;
