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
import { EditOutlined } from "@ant-design/icons";
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

function MO() {
  const [refresh, setRefresh] = useState(1);
  const [wardSelect, setWardSelect] = useState("A");
  const [Group, setGroup] = useState();
  // const [nextPage, setNextPage] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const fetchData = async (page = 1) => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/adminportal/api/GetuserListAPI/${wardSelect}/mo`,
        {
          params: {
            limit: pagination.pageSize,
            offset: (page - 1) * pagination.pageSize,
          },
        }
      );
      const data = response.data;

      if (data.results && data.results.data) {
        setMOData(data.results.data);
        // setNextPage(data.next);
        setPagination({
          ...pagination,
          current: page,
          total: data.count,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);

      if (error.response && error.response.status === 401) {
        setTimeout(() => {
          LogOut();
        }, 1000);
      }
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchData();
    setGroup(sessionStorage.getItem("group"));
    axios
      .get(`${BASE_URL}/allauth/api/GetWardListAPI`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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
  }, [refresh, wardSelect]);

  const handleTableChange = (pagination, filters, sorter) => {
    fetchData(pagination.current);
  };
  //generic State
  const [wardList, setWardList] = useState([]);
  const [MOData, setMOData] = useState([]);
  const [List, setHealthPostNameList] = useState([]);
  const [dispensaryList, setDispensaryList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [addMOModal, setAddMOModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchValue, setSearchValue] = useState();

  //Add User State
  const [name, setName] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState(null);
  const [dispensary, setDispensary] = useState();
  const [MOid, setMOid] = useState();

  //Edit Modal State
  const [u_name, setU_name] = useState();
  const [u_userName, setU_userName] = useState();
  const [u_phoneNumber, setU_phoneNumber] = useState();
  const [u_email, setU_email] = useState(null);
  const [u_ward, setU_ward] = useState();
  const [u_oldWard, setU_OldWard] = useState();
  const [u_healthPost, setU_HealthPost] = useState();
  const [u_Dispensary, setU_Dispensary] = useState();
  const [u_is_ActiveStatus, setU_Is_ActiveStatus] = useState();
  const [u_password, setU_Password] = useState();
  const [u_ConfirmPassword, setU_ConfirmPassword] = useState();

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
      .get(`${BASE_URL}/adminportal/api/GetuserListAPI/${wardSelect}/mo`, {
        params: {
          search: searchValue,
        },
      })
      .then((res) => {
        setLoader(false);
        console.log(res.data.data);
        setMOData(res.data.data);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
        if (error.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  };

  const handleMOModalView = () => {
    axios
      .get(`${BASE_URL}/allauth/api/GetWardListAPI`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setWardList(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
    setAddMOModal(true);
  };
  const handleWardSelect = (id) => {
    setU_ward(id);
    setDispensaryList([]);
    setU_Dispensary();
    axios
      .get(`${BASE_URL}/allauth/api/GetDispensaryListAPI/${id}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
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

  const handleMOModalClose = () => {
    setName();
    setUserName();
    setEmail(null);
    setPassword();
    setConfirmPassword();
    setPhoneNumber();
    setDispensary();
    setAddMOModal(false);
  };
  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };

  const handleEditModalShow = (data) => {
    console.log(data);
    axios
      .get(`${BASE_URL}/allauth/api/GetWardListAPI`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setWardList(res.data);
        axios
          .get(`${BASE_URL}/allauth/api/GetDispensaryListAPI/${data.ward_id}`, {
            headers: {
              Authorization: `Token ${sessionStorage.getItem("Token")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
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
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
    setMOid(data.id);
    setU_name(data.name);
    setU_userName(data.username);
    setU_phoneNumber(data.phoneNumber);
    setU_email(data.emailId);
    setU_ward(data.ward_id);
    setU_OldWard(data.ward_id);
    setU_Is_ActiveStatus(data.is_active);
    // handleWardSelect(data.ward_id);
    setU_HealthPost(data.health_Post_id);
    // handleHealthPostSelect(data.health_Post_id);
    setU_Dispensary(data.dispensary_id);
    setShowEditModal(true);
  };
  const handleEditModalClose = () => {
    setU_name();
    setU_userName();
    setU_phoneNumber();
    setU_email(null);
    setU_ward();
    setU_Password();
    setU_Is_ActiveStatus();
    setU_HealthPost();
    setU_Dispensary();
    setShowEditModal(false);
  };

  const handleAddUser = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("username", userName);
    formData.append("password", password);
    formData.append("phoneNumber", phoneNumber);
    email !== null && formData.append("emailId", email);
    formData.append("dispensary", dispensary);
    formData.append("group", "mo");
    if (password !== confirmPassword) {
      message.warning("password and confirm password should be same");
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
          handleMOModalClose();
        })
        .catch((err) => {
          console.log(err);
          message.warning(err.response.data.message);
          if (err.response.status == "401") {
            setTimeout(() => {
              LogOut();
            }, 1000);
          }
        });
    }
  };
  const handleUpdateUser = () => {
    console.log(MOid);
    if (u_name === "") {
      message.warning(" Please Enter Name");
    } else if (u_userName === "") {
      message.warning(" Please Enter Username");
    } else if (u_phoneNumber === "") {
      message.warning("Please Enter Phone Number");
    } else if (u_Dispensary === undefined) {
      message.warning("Please select Dispensary");
    } else if (u_is_ActiveStatus === undefined) {
      message.warning("Select Active Status");
    } else if (u_ward !== u_oldWard) {
      if (u_password !== undefined) {
        if (u_password !== u_ConfirmPassword) {
          message.warning("password and confirm password should be same");
        } else {
          const formData = new FormData();
          formData.append("name", u_name);
          formData.append("username", u_userName);
          u_email !== null && formData.append("emailId", u_email);
          formData.append("phoneNumber", u_phoneNumber);
          formData.append("dispensary", u_Dispensary);
          formData.append("is_active", u_is_ActiveStatus);
          formData.append("newpassword", u_password);

          axios
            .patch(
              `${BASE_URL}/adminportal/api/UpdateUserDetailsAPI/${MOid}`,
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
              if (err.status == "401") {
                setTimeout(() => {
                  LogOut();
                }, 1000);
              }
            });
        }
      } else {
        message.warning("Please Enter Password");
      }
    } else {
      const formData = new FormData();
      formData.append("name", u_name);
      formData.append("username", u_userName);
      u_email !== null && formData.append("emailId", u_email);
      formData.append("phoneNumber", u_phoneNumber);
      formData.append("dispensary", u_Dispensary);
      formData.append("is_active", u_is_ActiveStatus);

      axios
        .patch(
          `${BASE_URL}/adminportal/api/UpdateUserDetailsAPI/${MOid}`,
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
          if (err.status == "401") {
            setTimeout(() => {
              LogOut();
            }, 1000);
          }
        });
    }
  };
  const deleteUser = (data) => {
    Modal.confirm({
      title: `Do you want to Remove user ${data.name}`,
      okText: "Confirm",
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
    setMOid(id);
    setChangePasswordModal(true);
  };
  const handleChangePasswordModalClose = () => {
    setNewPassword();
    setConfirmNewPassword();
    setMOid();
    setChangePasswordModal(false);
  };
  const handlePasswordUpdate = () => {
    console.log(newPassword, MOid);
    if (newPassword === confirmNewPassword) {
      axios
        .patch(
          `${BASE_URL}/adminportal/api/AdminChangePasswordView/${MOid}`,
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
          if (err.status == "401") {
            setTimeout(() => {
              LogOut();
            }, 1000);
          }
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
      title: "Dispensary",
      dataIndex: "dispensary",
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

    // {
    //   title: "Date & Time Of Joining",
    //   dataIndex: "date_joined",
    //   render: (date) => {
    //     return moment(date).format("DD/MM/YYYY h:mm:ss a");
    //   },
    // },
    {
      title: "Update",
      render: (data) => {
        return (
          <EditButton
            style={{ display: Group === "ViewAdmin" ? "none" : "block" }}
            onClick={() => handleEditModalShow(data)}
          >
            Edit
          </EditButton>
        );
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
      title: "Status",
      dataIndex: "is_active",
      render: (data) => {
        return data ? <p>Active</p> : <p style={{ color: "red" }}>Inactive</p>;
      },
    },
    {
      title: "Password",
      render: (data) => {
        return (
          <Button
            style={{
              border: "none",
              display: Group === "ViewAdmin" ? "none" : "block",
            }}
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
              margin: "15px 16px",
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
                  fontSize: "20px",
                  fontWeight: 750,
                  fontFamily: "sans-serif",
                  color: "#176b87",
                }}
              >
                Medical Officers (MO)
              </p>
              <AddButton
                style={{ display: Group === "ViewAdmin" ? "none" : "block" }}
                onClick={handleMOModalView}
              >
                Add MO
              </AddButton>
            </div>
            <div>
              <div style={{ margin: "20px 10px" }}>
                <Row>
                  <Col>
                    <Form>
                      <FormItem>
                        <Input
                          type="text"
                          style={{ width: "300px" }}
                          placeholder="search here "
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
                        style={{
                          width: "250px",
                          margin: "-10% 0% 0% 150%",
                        }}
                      >
                        <Select
                          value={wardSelect}
                          showSearch
                          onChange={(value) => setWardSelect(value)}
                        >
                          {wardList.map((data) => (
                            <Option key={data.id} value={data.wardName}>
                              {data.wardName}
                            </Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Form>
                  </Col>
                </Row>
              </div>
              <Table
                columns={column}
                dataSource={MOData}
                pagination={pagination}
                onChange={handleTableChange}
              ></Table>
            </div>
            <Modal
              open={addMOModal}
              width={900}
              onCancel={handleMOModalClose}
              title={
                <div>
                  <h3>Medical Officer details</h3>
                </div>
              }
              footer={
                <>
                  <CancelButton onClick={handleMOModalClose}>
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
                        {wardList.map((data) => (
                          <Option key={data.id} value={data.id}>
                            {data.wardName}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col>
                    <FormItem label="Dispensary">
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
                        value={dispensary}
                        onChange={(e) => setDispensary(e)}
                      >
                        {dispensaryList.map((data) => (
                          <Option key={data.id} value={data.id}>
                            {data.dispensaryName}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
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
              <div style={{display:"flex" ,justifyContent:"center"}}>
              <Form layout="vertical">
                <FormItem label="New Password" required>
                  <Input.Password
                    style={{ width: "350px" }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></Input.Password>
                </FormItem>
                <FormItem label="confirm new Password" required>
                  <Input.Password
                    style={{ width: "350px" }}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  ></Input.Password>
                </FormItem>
              </Form>
              </div>
            </Modal>
            <Modal
              open={showEditModal}
              title={<h2>Update MO's Details</h2>}
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
                        {wardList.map((data) => (
                          <Option key={data.id} value={data.id}>
                            {data.wardName}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label="Dispensary">
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
                        value={u_Dispensary}
                        onChange={(e) => setU_Dispensary(e)}
                      >
                        {dispensaryList.map((data) => (
                          <Option key={data.id} value={data.id}>
                            {data.dispensaryName}
                          </Option>
                        ))}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                {u_ward !== u_oldWard ? (
                  <>
                    {" "}
                    <Row>
                      <Col span={12}>
                        {" "}
                        <FormItem label="New Password">
                          <Input.Password
                            style={{ width: "350px" }}
                            value={newPassword}
                            onChange={(e) => setU_Password(e.target.value)}
                          ></Input.Password>
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem label="Confirm new password">
                          <Input.Password
                            style={{ width: "350px" }}
                            value={confirmNewPassword}
                            onChange={(e) =>
                              setU_ConfirmPassword(e.target.value)
                            }
                          ></Input.Password>
                        </FormItem>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <></>
                )}
                <FormItem label="Is Active" style={{ width: "350px" }}>
                  <Select onChange={(value) => setU_Is_ActiveStatus(value)}>
                    <Option value="true">Active</Option>
                    <Option value="false">Inactive</Option>
                  </Select>
                </FormItem>
              </Form>
            </Modal>
          </Content>
        </div>
      </>
    </Spin>
  );
}
export default MO;
