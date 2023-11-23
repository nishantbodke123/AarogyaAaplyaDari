import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Table,
  message,
} from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { BASE_URL } from "../../../Utils/BaseURL";
import { useState } from "react";
import { LogOut } from "../../../Auth/Logout";
import moment from "moment/moment";
import {
  AddButton,
  CancelButton,
  DeleteButton,
  EditButton,
  InputBox,
  SearchButton,
  SubmitButton,
} from "./style";
import FormItem from "antd/es/form/FormItem";
import { Option } from "antd/es/mentions";

function Healthworker() {
  const [refresh, setRefresh] = useState(1);
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/GetuserListAPI/healthworker`)
      .then((res) => {
        setLoader(false);
        console.log(res.data.data);
        setHealthWorkersData(res.data.data);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        if (error.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  }, [refresh]);

  //generic State
  const [areaList, setAreaList] = useState([]);
  const [healthWorkersData, setHealthWorkersData] = useState([]);
  const [healthPostNameList, setHealthPostNameList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [addHealthWorkerModal, setAddHealthWorkerModal] = useState(false);
  const [searchValue, setSearchValue] = useState();


  //Add User State
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [section, setSection] = useState();

  const handleNameChange = (e) => {
    const regex = /^[ a-zA-Z]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setName(e.target.value);
    }
  };
  const handleUserNameChange = (e) => {
    const regex = /^[ a-zA-Z0-9@]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setUserName(e.target.value);
    }
  };
  const handleMobileNumberChange = (e) => {
    const regex = /^[0-9]{1,10}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhoneNumber(e.target.value);
    }
  };
  const handleSearch = () => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/GetuserListAPI/healthworker`, {
        params: {
          search: searchValue,
        },
      })
      .then((res) => {
        setLoader(false);
        console.log(res.data.data);
        setHealthWorkersData(res.data.data);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        if (error.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  };

  const handleAddHealthWorkerModalView = () => {
    axios
      .get(`${BASE_URL}/allauth/api/GetWardListAPI`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAreaList(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 401) {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
    setAddHealthWorkerModal(true);
  };
  const handleWardSelect = (id) => {
    axios
      .get(`${BASE_URL}/allauth/api/GethealthPostNameList`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        params: {
          search: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setHealthPostNameList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleHealthPostSelect = (id) => {
    console.log(id);
    axios
      .get(`${BASE_URL}/allauth/api/GetSectionListAPI`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        params: {
          search: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSectionList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHealthWorkerModalClose = () => {
    setName();
    setUserName();
    setEmail();
    setPassword();
    setConfirmPassword();
    setPhoneNumber();
    setSection();
    setAddHealthWorkerModal(false);
  };

  const handleAddUser = () => {
    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${sessionStorage.getItem("Token")}`,
      },
    };
    let formData = new FormData();
    formData.append("name", name);
    formData.append("username", userName);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    formData.append("emailId", email);
    formData.append("section", section);
    formData.append("group", "healthworker");
    if (password !== confirmPassword) {
      message.warning("The passwords doesn't match");
    } else {
      axios
        .post(`${BASE_URL}/adminportal/api/InsertUsers`, formData, axiosConfig)
        .then((res) => {
          console.log(res.data.message);
          message.success(res.data.message);
          setRefresh(refresh + 1);
          handleHealthWorkerModalClose();
        })
        .catch((err) => {
          console.log(err);
          message.warning(err.response.data.message);
        });
    }
  };
  const deleteUser = (id) => {
    axios
      .delete(`${BASE_URL}/adminportal/api/deleteUserAPI/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        message.success(res.data.message);
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        console.log(err);
        message.warning(err.response.data.message);
      });
  };

  const column = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email ID",
      dataIndex: "emailId",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Section",
      dataIndex: "section",
    },
    {
      title: "Ward",
      dataIndex: "ward",
    },
    {
      title: "Health Post",
      dataIndex: "health_Post",
    },
    {
      title: "Date & Time Of Joining",
      dataIndex: "date_joined",
      render: (date) => {
        return moment(date).format("DD/MM/YYYY h:mm:ss a");
      },
    },
    {
      title: "Update",
      render: () => {
        return <EditButton>Edit</EditButton>;
      },
    },
    {
      title: "Delete",
      render: (data) => {
        return (
          <DeleteButton onClick={() => deleteUser(data.id)}>
            Delete
          </DeleteButton>
        );
      },
    },
  ];
  return (
    <Spin spinning={loader}>
      <>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "81.9Vh",
            background: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0px",
            }}
          >
            <p
              style={{
                fontSize: "25px",
                fontWeight: 750,
                fontFamily: "sans-serif",
                color: "#176b87",
              }}
            >
              Health Workers
            </p>
            <AddButton onClick={handleAddHealthWorkerModalView}>
              Add Health Worker
            </AddButton>
          </div>
          <div>
            <div style={{ margin: "20px 10px" }}>
              <Input
                type="text"
                style={{ width: "300px" }}
                placeholder="Enter Name / User Name / ward "
                onChange={(e) => setSearchValue(e.target.value)}
              ></Input>
              <SearchButton onClick={handleSearch}>Search</SearchButton>
            </div>
            <Table columns={column} dataSource={healthWorkersData}></Table>
          </div>
          <Modal
            open={addHealthWorkerModal}
            width={900}
            onCancel={handleHealthWorkerModalClose}
            title={
              <div>
                <h3>Health Worker details</h3>
              </div>
            }
            footer={
              <>
                <CancelButton onClick={handleHealthWorkerModalClose}>
                  Cancel
                </CancelButton>
                <SubmitButton onClick={handleAddUser}>Submit</SubmitButton>
              </>
            }
          >
            <Form layout="vertical">
              <Row>
                <Col span={12}>
                  <FormItem label="Name">
                    <InputBox
                      type="text"
                      value={name}
                      onChange={(e) => handleNameChange(e)}
                    ></InputBox>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Username">
                    <InputBox
                      type="text"
                      allowClear
                      value={userName}
                      onChange={(e) => handleUserNameChange(e)}
                    ></InputBox>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem label="Enter Password">
                    <Input.Password
                      type="text"
                      value={password}
                      style={{ width: "350px" }}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Input.Password>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Confirm Password">
                    <Input.Password
                      type="text"
                      value={confirmPassword}
                      style={{ width: "350px" }}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Input.Password>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <FormItem label="Phone Number">
                    <InputBox
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => handleMobileNumberChange(e)}
                    ></InputBox>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem label="Email ID">
                    <InputBox
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></InputBox>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  {" "}
                  <FormItem label="Ward">
                    <Select
                      showSearch
                      style={{ width: "350px" }}
                      filterOption={(inputValue, option) =>
                        option.children
                          ? option.children
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                          : false
                      }
                      onChange={(e) => handleWardSelect(e)}
                    >
                      {areaList.map((data) => (
                        <Option key={data.id} value={data.id}>
                          {data.wardName}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col>
                  <FormItem label="Health Post">
                    <Select
                      showSearch
                      style={{ width: "350px" }}
                      filterOption={(inputValue, option) =>
                        option.children
                          ? option.children
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                          : false
                      }
                      onChange={(e) => handleHealthPostSelect(e)}
                    >
                      {healthPostNameList.map((data) => (
                        <Option key={data.id} value={data.id}>
                          {data.healthPostName}
                        </Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <FormItem label="Section">
                  <Select
                    showSearch
                    style={{ width: "350px" }}
                    value={section}
                    filterOption={(inputValue, option) =>
                      option.children
                        ? option.children
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                        : false
                    }
                    onChange={(e) => setSection(e)}
                  >
                    {sectionList.map((data) => (
                      <Option key={data.id} value={data.id}>
                        {data.sectionName}
                      </Option>
                    ))}
                  </Select>
                </FormItem>
              </Row>
            </Form>
          </Modal>
        </Content>
      </>
    </Spin>
  );
}
export default Healthworker;
