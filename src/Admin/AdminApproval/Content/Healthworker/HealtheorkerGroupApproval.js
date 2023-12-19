import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../../Utils/BaseURL";
import axios from "axios";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Table,
  message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { SearchButton } from "./style";

function HealthworkerGroupApproval() {
  const [groupApprovalList, setGroupApprovalList] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(1);
  let axiosConfig = {
    headers: {
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/GetGroupRequestList`, axiosConfig)
      .then((res) => {
        setLoader(false);
        console.log(res.data.data);
        setGroupApprovalList(res.data.data);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  }, [refresh]);

  const columns = [
    {
      title: "User Name",
      dataIndex: "user",
    },
    {
      title: "Requester",
      dataIndex: "requester",
    },
    {
      title: "Request Date",
      dataIndex: "request_date",
    },
    {
      title: "Old Group",
      dataIndex: "old_group",
      render: (oldGroup) => {
        return oldGroup.name;
      },
    },
    {
      title: "New Group",
      dataIndex: "new_group",
      render: (newGroup) => {
        return newGroup.name;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (data) => {
        return data ? "Active" : "InActive";
      },
    },
    {
      title: "Approve",

      render: (data) => {
        return data.status ? (
          ""
        ) : (
          <Button
            style={{ backgroundColor: "#176B87" }}
            onClick={() => handleApproveUser(data)}
          >
            Approve
          </Button>
        );
      },
    },
  ];
  const handleSearch = () => {};
  const handleApproveUser = (data) => {
    console.log(data.id);
    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    console.log(datetime);
    const formData = new FormData();
    formData.append("status", true);
    formData.append("approve_date", datetime);
    formData.append("id", data.id);
    Modal.confirm({
      title: `Would you like to Approve the Request for Designation Change of  ${data.user} from ${data.old_group.name} to ${data.new_group.name}`,
      okText: "Confirm",
      cancelText: "Cancel",
      onOk: () => {
        setLoader(true);
        axios
          .patch(
            `${BASE_URL}/adminportal/api/updateUserGroupRequest/${data.id}`,
            formData,
            axiosConfig
          )
          .then((res) => {
            setLoader(false);
            console.log(res.data.message);
            message.success(res.data.message);
            setTimeout(() => {
              setRefresh(refresh + 1);
            }, 1000);
          })
          .catch((err) => {
            setLoader(false);
            console.log(err);
            message.warning(err.response.data.message);
          });
      },
    });
  };
  return (
    <Spin spinning={loader}>
      <>
        <div style={{ overflowY: "auto", maxHeight: "75vh" }}>
          <Row>
            <Col>
              <Form>
                <FormItem>
                  <Input
                    type="text"
                    style={{ width: "300px", margin: "10vh 0vw 0vh 3vw" }}
                    placeholder="Enter Name / User Name  "
                    onChange={(e) => setSearchValue(e.target.value)}
                  ></Input>

                  <SearchButton htmlType="submit" onClick={handleSearch}>
                    Search
                  </SearchButton>
                </FormItem>
              </Form>
            </Col>
          </Row>
          <div style={{ margin: "20px" }}>
            <Table columns={columns} dataSource={groupApprovalList}></Table>
          </div>
        </div>
      </>
    </Spin>
  );
}
export default HealthworkerGroupApproval;
