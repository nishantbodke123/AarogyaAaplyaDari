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
import { EditOutlined } from "@ant-design/icons";
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
  PasswordUpdateButton,
  SearchButton,
  SubmitButton,
  UpdateButton,
} from "./style";
import FormItem from "antd/es/form/FormItem";
import { Option } from "antd/es/mentions";
import { useTheme } from "styled-components";

function Healthworker() {
  const [refresh, setRefresh] = useState(1);
  const [wardSelect, setWardSelect] = useState("A");
  useEffect(() => {
    setLoader(true);
    axios
      .get(
        `${BASE_URL}/adminportal/api/GetuserListAPI/${wardSelect}/healthworker`
      )
      .then((res) => {
        setLoader(false);
        console.log(res.data.data, "userlist Data");
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
      .catch((error) => {
        console.log(error);
        if (error.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  }, [refresh, wardSelect]);

  //generic State
  const [areaList, setAreaList] = useState([]);
  const [healthWorkersData, setHealthWorkersData] = useState([]);
  const [healthPostNameList, setHealthPostNameList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [addHealthWorkerModal, setAddHealthWorkerModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [healthworkerID, setHealthworkerID] = useState();

  //Edit Modal State
  const [u_name, setU_name] = useState("");
  const [u_userName, setU_userName] = useState("");
  const [u_phoneNumber, setU_phoneNumber] = useState("");
  const [u_email, setU_email] = useState(null);
  const [u_ward, setU_ward] = useState();
  const [u_healthPost, setU_HealthPost] = useState();
  const [u_Section, setU_section] = useState();
  const [u_healthPostList, setU_healthPostList] = useState([]);
  const [u_sectionList, setU_sectionList] = useState([]);
  const [u_is_ActiveStatus, setU_Is_ActiveStatus] = useState();

  const handleU_NameChange = (e) => {
    const regex = /^[ a-zA-Z]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setU_name(e.target.value);
    }
  };
  const handleU_UserNameChange = (e) => {
    const regex = /^[ a-zA-Z0-9@]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setU_userName(e.target.value);
    }
  };
  const handleU_MobileNumberChange = (e) => {
    const regex = /^[0-9]{1,10}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setU_phoneNumber(e.target.value);
    }
  };

  //change password state
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();

  //Add User State
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState(null);
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
      .get(
        `${BASE_URL}/adminportal/api/GetuserListAPI/${wardSelect}/healthworker`,
        {
          params: {
            search: searchValue,
          },
        }
      )
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
    setHealthPostNameList([]);
    setU_ward(id);
    setSectionList([]);
    setU_HealthPost();
    setU_section();
    axios
      .get(`${BASE_URL}/allauth/api/GethealthPostNameListAPI/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setHealthPostNameList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleHealthPostSelect = (id) => {
    setU_HealthPost(id);
    console.log(id);
    setSectionList([]);
    setU_section();
    axios
      .get(`${BASE_URL}/allauth/api/GetSectionListAPI/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSectionList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHealthWorkerModalClose = () => {
    setName();
    setUserName();
    setEmail(null);
    setPassword();
    setConfirmPassword();
    setPhoneNumber();
    setSection();
    setAddHealthWorkerModal(false);
  };
  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };

  const handleEditModalShow = (data) => {
    console.log(data.is_active);
    axios
      .get(`${BASE_URL}/allauth/api/GetWardListAPI`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAreaList(res.data);
        axios
          .get(
            `${BASE_URL}/allauth/api/GethealthPostNameListAPI/${data.ward_id}`,
            {
              headers: {
                Authorization: `Token ${sessionStorage.getItem("Token")}`,
              },
            }
          )
          .then((res) => {
            setHealthPostNameList(res.data.data);
            axios
              .get(
                `${BASE_URL}/allauth/api/GetSectionListAPI/${data.health_Post_id}`,
                {
                  headers: {
                    Authorization: `Token ${sessionStorage.getItem("Token")}`,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
                setSectionList(res.data.data);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.status == 401) {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
    setHealthworkerID(data.id);
    setU_name(data.name);
    setU_userName(data.username);
    setU_phoneNumber(data.phoneNumber);
    setU_email(data.emailId);
    setU_ward(data.ward);
    setU_HealthPost(data.health_Post);
    setU_section(data.section_id);
    setU_Is_ActiveStatus(data.is_active);
    setShowEditModal(true);
  };
  const handleEditModalClose = () => {
    setU_name("");
    setU_userName("");
    setU_phoneNumber("");
    setU_email(null);
    setU_ward();
    setU_HealthPost();
    setU_section();
    setU_Is_ActiveStatus();
    setShowEditModal(false);
    setHealthPostNameList([]);
    setSectionList([]);
  };

  const handleAddUser = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("username", userName);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    email !== null && formData.append("emailId", email);
    formData.append("section", section);
    formData.append("group", "healthworker");
    if (password !== confirmPassword) {
      message.warning("The passwords doesn't match");
    } else {
      axios
        .post(
          `${BASE_URL}/adminportal/api/InsertUsersByadmin`,
          formData,
          axiosConfig
        )
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
  const handleUpdateUser = () => {
    console.log(healthworkerID);
    console.log(u_is_ActiveStatus);
    if (u_name === "") {
      message.warning(" Please Enter Name");
    } else if (u_userName === "") {
      message.warning(" Please Enter Username");
    } else if (u_phoneNumber === "") {
      message.warning("Please Enter Phone Number");
    } else if (u_Section === undefined) {
      message.warning("Please select Section");
    } else if (u_is_ActiveStatus === undefined) {
      message.warning("Select Active Status");
    } else {
      const formData = new FormData();
      formData.append("name", u_name);
      formData.append("username", u_userName);
      u_email !== null && formData.append("emailId", u_email);
      formData.append("phoneNumber", u_phoneNumber);
      formData.append("section", u_Section);
      formData.append("is_active", u_is_ActiveStatus);
      axios
        .patch(
          `${BASE_URL}/adminportal/api/UpdateUserDetailsAPI/${healthworkerID}`,
          formData,
          axiosConfig
        )
        .then((res) => {
          console.log(res);
          message.success(res.data.message);
          setRefresh(refresh + 1);
          handleEditModalClose();
        })
        .catch((err) => {
          console.log(err);
          message.warning(err.response.data.message);
        });
    }
  };

  const deleteUser = (data) => {
    Modal.confirm({
      title: `Do you want to Remove user ${data.name}`,
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => {
        axios
          .delete(`${BASE_URL}/adminportal/api/deleteUserAPI/${data.id}`, {
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
      },
    });
  };
  const handleChangePasswordModalView = (id) => {
    setHealthworkerID(id);
    setChangePasswordModal(true);
  };
  const handleChangePasswordModalClose = () => {
    setNewPassword();
    setConfirmNewPassword();
    setHealthworkerID();
    setChangePasswordModal(false);
  };
  const handlePasswordUpdate = () => {
    if (newPassword === confirmNewPassword) {
      axios
        .patch(
          `${BASE_URL}/adminportal/api/AdminChangePasswordView/${healthworkerID}`,
          {
            newpassword: newPassword,
          },
          axiosConfig
        )
        .then((res) => {
          console.log(res);
          message.success(res.data.message);
          setRefresh(refresh + 1);
          handleChangePasswordModalClose();
        })
        .catch((err) => {
          console.log(err);
          message.warning(err.response.data.message);
        });
    } else {
      message.warning("password and confirm password should be same");
    }
  };

  const column = [
    {
      title: "Ward",
      dataIndex: "ward",
    },
    {
      title: "Health Post",
      dataIndex: "health_Post",
    },
    {
      title: "Section",
      dataIndex: "section",
    },
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
      title: "Date & Time Of Joining",
      dataIndex: "date_joined",
      render: (date) => {
        return moment(date).format("DD/MM/YYYY h:mm:ss a");
      },
    },
    {
      title: "Update",
      render: (data) => {
        return (
          <EditButton onClick={() => handleEditModalShow(data)}>
            Edit
          </EditButton>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (data) => {
        return data ? "Active" : "Deactive";
      },
    },
    // {
    //   title: "Delete",
    //   render: (data) => {
    //     return (
    //       <DeleteButton onClick={() => deleteUser(data)}>Delete</DeleteButton>
    //     );
    //   },
    // },
    {
      title: "Password",
      render: (data) => {
        return (
          <Button
            style={{ border: "none" }}
            onClick={() => handleChangePasswordModalView(data.id)}
          >
            <EditOutlined />
          </Button>
        );
      },
    },
  ];
  return (
    <Spin spinning={loader}>
      <>
        <div style={{ overflowY: "auto", maxHeight: "88.5vh" }}>
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
                Auxiliary Nurse and Midwife (ANM)
              </p>
              <AddButton onClick={handleAddHealthWorkerModalView}>
                Add ANM
              </AddButton>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Row>
                <Col>
                  <Form>
                    <FormItem>
                      <Input
                        type="text"
                        style={{ width: "300px" }}
                        placeholder="Enter Name / User Name  "
                        onChange={(e) => setSearchValue(e.target.value)}
                      ></Input>

                      <SearchButton htmlType="submit" onClick={handleSearch}>
                        Search
                      </SearchButton>
                    </FormItem>
                  </Form>
                </Col>
                <Col>
                  <Form layout="vertical">
                    <FormItem
                      label="Select ward"
                      style={{ width: "250px", margin: "-25px 0px 5px 300px" }}
                    >
                      <Select
                        value={wardSelect}
                        showSearch
                        onChange={(value) => setWardSelect(value)}
                      >
                        {areaList.map((data) => (
                          <Option key={data.id} value={data.wardName}>
                            {data.wardName}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Form>
                </Col>
              </Row>
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
            <Modal
              open={changePasswordModal}
              onCancel={handleChangePasswordModalClose}
              footer={
                <>
                  <Button onClick={handleChangePasswordModalClose}>
                    Cancel
                  </Button>
                  <PasswordUpdateButton onClick={handlePasswordUpdate}>
                    Update
                  </PasswordUpdateButton>
                </>
              }
            >
              <Form layout="vertical">
                <FormItem label="New Password">
                  <Input.Password
                    style={{ width: "350px" }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></Input.Password>
                </FormItem>
                <FormItem label="Confirm new password">
                  <Input.Password
                    style={{ width: "350px" }}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  ></Input.Password>
                </FormItem>
              </Form>
            </Modal>
            <Modal
              open={showEditModal}
              title={<h2>Update ANM's Details</h2>}
              width={1000}
              onCancel={handleEditModalClose}
              footer={
                <>
                  <Button onClick={handleEditModalClose}>Cancel</Button>
                  <UpdateButton onClick={handleUpdateUser}>Update</UpdateButton>
                </>
              }
            >
              <Form layout="vertical">
                <Row>
                  <Col span={12}>
                    <FormItem label="Name">
                      <InputBox
                        type="text"
                        value={u_name}
                        onChange={(e) => handleU_NameChange(e)}
                      ></InputBox>
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label="Username">
                      <InputBox
                        type="text"
                        allowClear
                        value={u_userName}
                        onChange={(e) => handleU_UserNameChange(e)}
                      ></InputBox>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FormItem label="Phone Number">
                      <InputBox
                        type="text"
                        value={u_phoneNumber}
                        onChange={(e) => handleU_MobileNumberChange(e)}
                      ></InputBox>
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label="Email ID">
                      <InputBox
                        type="email"
                        value={u_email}
                        onChange={(e) => setU_email(e.target.value)}
                      ></InputBox>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
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
                        value={u_ward}
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
                  <Col span={12}>
                    {" "}
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
                        value={u_healthPost}
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
                </Row>
                <Row>
                  <Col>
                    {" "}
                    <FormItem label="Section">
                      <Select
                        showSearch
                        style={{ width: "350px" }}
                        value={u_Section}
                        filterOption={(inputValue, option) =>
                          option.children
                            ? option.children
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                            : false
                        }
                        onChange={(e) => setU_section(e)}
                      >
                        {sectionList.map((data) => (
                          <Option key={data.id} value={data.id}>
                            {data.sectionName}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col>
                    <FormItem
                      label="Is Active"
                      style={{ width: "350px", margin: "0% 36%" }}
                    >
                      <Select
                        onChange={(value) => setU_Is_ActiveStatus(value)}
                        value={u_is_ActiveStatus}
                      >
                        <Option value="true">Active</Option>
                        <Option value="false">Deactive</Option>
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Modal>
          </Content>
        </div>
      </>
    </Spin>
  );
}
export default Healthworker;
