import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../Utils/BaseURL";
import { Table } from "antd";

function Section() {
  const [wardSelect, setWardSelect] = useState("A");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/allauth/api/GetWardSectionListAPI/${wardSelect}`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
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
  return (
    <>
    <div style={{margin:"5%"}}>
      <Table columns={Columns} dataSource={data}></Table>
      </div>
    </>
  );
}
export default Section;
