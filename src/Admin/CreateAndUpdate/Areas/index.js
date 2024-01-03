import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../../../Utils/BaseURL";
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
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { AddButton, SearchButton, SubmitButton } from "./style";
import { Option } from "antd/es/mentions";
import { LogOut } from "../../../Auth/Logout";

function Area() {
  const [wardSelect, setWardSelect] = useState("A");
  const [areaList, setAreaList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(1);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [healthPostNameList, setHealthPostNameList] = useState([]);
  const [healthPostId, setHealthPostId] = useState();
  const [area, setArea] = useState();
  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/allauth/api/GetWardAreasAPI/${wardSelect}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setLoader(false);
      })
      .catch((res) => {
        console.log(res);
        setLoader(false);
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
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
        if (error.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  }, [refresh, wardSelect]);
  const Columns = [
    {
      title: "Ward",
      dataIndex: "ward",
    },
    {
      title: "Health Post",
      dataIndex: "healthPost_name",
    },
    {
      title: "Area",
      dataIndex: "areas",
    },
  ];
  const handleSearch = () => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/allauth/api/GetWardAreasAPI/${wardSelect}`, {
        params: {
          search: searchValue,
        },
      })
      .then((res) => {
        setLoader(false);
        console.log(res.data.data);
        setData(res.data.data);
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

  const [showAddAreaModal, setShowAddAreaModal] = useState(false);

  const handleShowAddAreaModal = () => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/allauth/api/GetWardListAPI`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      })
      .then((res) => {
        setLoader(false);
        console.log(res.data);
        setAreaList(res.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        if (err.response.status == 401) {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
    setShowAddAreaModal(true);
  };
  const handleHideAddAreaModal = () => {
    setShowAddAreaModal(false);
    setHealthPostId();
    setArea();
  };
  const handleWardSelect = (id) => {
    setHealthPostNameList([]);
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
        if (err.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  };
  const handleNewAreaSubmit = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("healthPost", healthPostId);
    formData.append("areas", area);
    axios
      .post(`${BASE_URL}/allauth/api/AddAreaAPI`, formData, axiosConfig)
      .then((res) => {
        setLoader(false);
        console.log(res);
        handleHideAddAreaModal();
        setRefresh(refresh + 1);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        if (err.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  };
  return (
    <Spin spinning={loader}>
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "2% 0% 0% 5%",
            maxHeight: "80vh",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <AddButton onClick={handleShowAddAreaModal}>Add Area</AddButton>
          </div>
          <Row>
            <Col>
              <Form>
                <FormItem>
                  <Input
                    type="text"
                    style={{ width: "300px" }}
                    placeholder="search here"
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
                  style={{ width: "250px", margin: "0% 0% 5% 150%" }}
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
          <Table
            style={{ overflowY: "auto" }}
            columns={Columns}
            dataSource={data}
          ></Table>
        </div>
        <Modal
          open={showAddAreaModal}
          onCancel={handleHideAddAreaModal}
          footer={
            <>
              <Button onClick={handleHideAddAreaModal}>Cancel</Button>
              <SubmitButton onClick={handleNewAreaSubmit}>Submit</SubmitButton>
            </>
          }
        >
          <Form layout="vertical">
            <FormItem label="Select Ward" style={{ width: "250px" }}>
              <Select
                showSearch
                filterOption={(inputValue, option) =>
                  option.children
                    ? option.children
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    : false
                }
                onChange={(e) => handleWardSelect(e)}
              >
                {areaList.map((data, index) => (
                  <Option key={data.id}>{data.wardName}</Option>
                ))}
              </Select>
            </FormItem>
            <FormItem label="Select Health Post" style={{ width: "250px" }}>
              <Select
                showSearch
                filterOption={(inputValue, option) =>
                  option.children
                    ? option.children
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    : false
                }
                value={healthPostId}
                onChange={(e) => setHealthPostId(e)}
              >
                {healthPostNameList.map((data) => (
                  <Option key={data.id} value={data.id}>
                    {data.healthPostName}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <FormItem label="Area" style={{ width: "250px" }}>
              <Input
                type="text"
                placeholder="Enter Area Here"
                value={area}
                onChange={(e) => setArea(e.target.value)}
              ></Input>
            </FormItem>
          </Form>
        </Modal>
      </>
    </Spin>
  );
}
export default Area;
