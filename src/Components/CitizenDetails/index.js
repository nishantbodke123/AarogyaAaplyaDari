import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import {
  AddButton,
  StyledTabs,
  TableContainer,

  ViewButton,
  ViewModal,
} from "./style";

import TabPane from "antd/es/tabs/TabPane";
import { Button, Spin, Table, message } from "antd";
import {

  FilePdfOutlined,

  
} from '@ant-design/icons';
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseURL";
import { LogOut } from "../../Auth/Logout";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


function CitizenDetails() {
  const navigate = useNavigate();
  const [familyID, setFamilyID] = useState();
  const [familyHeadList, setFamilyHeadList] = useState([]);
  const [partiallyFamilyHeadList, setPartiallyFamilyHeadList] = useState([]);
  const [noOfFamilyMembers, setNoOfFamilyMembers] = useState();
  const [familyMemberArrayLength, setFamilyMemberArrayLength] = useState();
  const [familyMemeberDetails, setFamilyMemberDetails] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };

  useEffect(() => {
    i18n.changeLanguage("mr");
    setLoading(true);
    axios
      .get(`${BASE_URL}/healthworker/api/GetFamilyHeadList`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setFamilyHeadList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            LogOut();
          }, 1000);
        } else {
          // message.error(error.message);
        }
        setLoading(false);
      });

    axios
      .get(
        `${BASE_URL}/healthworker/api/GetPartiallyInsertedRecord`,
        axiosConfig
      )
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setPartiallyFamilyHeadList(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const Items = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      title:"Sr No",
      render:(key, data, index)=>{
        return <p>{index+1}</p>
      }
    },
    {
      title: "Family ID",
      dataIndex: "familyId",
    },
    {
      title: "Name",
      dataIndex: "name",
      // render:(data)=>{
      //   return <p>{data}/t{data}</p>
      // }
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNo",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Total Family Members",
      dataIndex: "totalFamilyMembers",
    },
    {
      title: "Action",
      render: (data) => {
        return (
          <>
            <ViewButton
              onClick={() => {
                setFamilyID(data.id);
                setNoOfFamilyMembers(data.totalFamilyMembers);
                handleViewModal(data.familyId);
              }}
            >
              View
            </ViewButton>
          </>
        );
      },
    },
  ];
  const handleViewModal = (id) => {
    console.log(id);
    const formData = new FormData();
    formData.append("search", id);
    let axiosConfig = {
      headers: {
        Authorization: `Token ${sessionStorage.getItem("Token")}`,
      },
      params: {
        search: id,
      },
    };

    axios
      .get(`${BASE_URL}/healthworker/api/GetFamilyMembersDetails`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setFamilyMemberArrayLength(response.data.length);
        setFamilyMemberDetails(response.data);
        setShowViewModal(true);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            LogOut();
          }, 1000);
        } else {
          message.error(error.message);
        }
      });
  };
  const handleHideViewModal = () => {
    setShowViewModal(false);
  };
  const handleFamilyMembersView = (data) => {
    console.log(data);
    navigate("/update", { state: data });
  };
  const handleNewFamilyMemberAdd = () => {
    console.log(familyID, noOfFamilyMembers);
    navigate("/addMember", { state: familyID });
  };
  // const handleReportDownload= async (data)=>{
  // console.log(data);

  // try {
  //   const response = await fetch(data);
  //   const blob = await response.blob();

  //   // Create a link element
  //   const link = document.createElement('a');

  //   // Create a Blob URL from the blob data
  //   const blobUrl = window.URL.createObjectURL(blob);

  //   // Set the download attribute and href for the link
  //   link.href = blobUrl;
  //   link.download = 'Report.pdf';

  //   // Append the link to the document body
  //   document.body.appendChild(link);

  //   // Trigger a click on the link to start the download
  //   link.click();

  //   // Remove the link from the document body
  //   document.body.removeChild(link);

  //   // Revoke the Blob URL to free up resources
  //   window.URL.revokeObjectURL(blobUrl);
  // } catch (error) {
  //   console.error('Error downloading PDF:', error);
  // }
  // }
  const FamilyMemberItems = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      title:"Sr No.",
      render:(key, data, index)=>{
         return <p>{index+1}</p>;
    }
    },
    {
      title: "Member ID",
      dataIndex: "memberId",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNo",
    },
    {
      title: "Aadhar No",
      dataIndex: "aadharCard",
    },
    {
      title: "Abha ID",
      dataIndex: "abhaId",
    },
    {
      title: "Action",
      render: (data) => {
        return (
          <ViewButton onClick={() => handleFamilyMembersView(data)}>
            View
          </ViewButton>
        );
      },
    },
    {
      title:"Report",
      dataIndex:"report",
      render:(data)=>{
       return(
        <>{data !=""?( <a
          href={`${BASE_URL}/media/${data}`}
          target="_blank"
        >
         <Button style={{border:"none"}}><FilePdfOutlined /></Button> 
        </a>):(<></>)}</>
       )
      }
    }
  ];

  return (
    <>
      <Header />
      <Spin spinning={loading}>
        <TableContainer>
          {/* <TableHeading>Family Heads Details </TableHeading> */}
          <StyledTabs defaultActiveKey="1" centered size="large">
            <TabPane tab="All Family Details" key="1">
              <Table
                columns={Items}
                dataSource={familyHeadList}
                bordered
                scroll={{ x: 500 }}
              ></Table>
            </TabPane>
            <TabPane tab="Partially Submitted Family Details" key="2">
              <Table
                columns={Items}
                dataSource={partiallyFamilyHeadList}
                scroll={{ x: 500 }}
              ></Table>
            </TabPane>
          </StyledTabs>
        </TableContainer>
        <ViewModal
          footer={<></>}
          width={1200}
          open={showViewModal}
          onCancel={handleHideViewModal}
        >
          <Table
            columns={FamilyMemberItems}
            dataSource={familyMemeberDetails}
            scroll={{ x: 800, y: 800 }}
          ></Table>
          {familyMemberArrayLength == noOfFamilyMembers ? (
            <></>
          ) : (
            <>
              {" "}
              <AddButton
                onClick={() => {
                  handleNewFamilyMemberAdd();
                }}
              >
                Add Member
              </AddButton>
            </>
          )}
        </ViewModal>
      </Spin>
    </>
  );
}
export default CitizenDetails;
