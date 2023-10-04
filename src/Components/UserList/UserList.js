import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseURL";
import { Table } from "antd";

const UserList = () => {
  const [familyHeadList, setFamilyHeadList] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/healthworker/api/GetFamilyHeadList`)
      .then((response) => {
        console.log(response.data);
        setFamilyHeadList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const Items = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Family ID",
      dataIndex: "familyId",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNo",
    },
    {
      title: "Total Family Members",
      dataIndex: "totalFamilyMembers",
    },
  ];
  return (
    <>
      <Header />
      <div style={{ margin: "20px 10px" }}>
        <Table columns={Items} dataSource={familyHeadList}></Table>
      </div>
    </>
  );
};

export default UserList;
