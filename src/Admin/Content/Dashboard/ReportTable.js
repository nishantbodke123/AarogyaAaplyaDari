import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../Utils/BaseURL";
import { Spin, Table, message } from "antd";
import { LogOut } from "../../../Auth/Logout";
import { StyledAntTable } from "./style";

const ReportTable = (props) => {
  const [reportData, setReportData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };
  const fetchData = async (page = 1) => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/adminportal/api/AdminDashboardTabView`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("Token")}`,
          },
          params: {
            ...(props.selectedWard !== "" && { wardId: props.selectedWard }),
            ...(props.selectedHealthPost !== "" && {
              healthpost_id: props.selectedHealthPost,
            }),
            page: page,
            // page_size: pagination.pageSize,
          },
        }
      );
      const data = response.data;
      console.log(response.data);
      setReportData(data.results);
      setNextPage(data.next);
      setPagination({
        ...pagination,
        current: page,
        total: data.count,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      message.warning(error.response.data.message);

      if (error.response && error.response.status === 401) {
        setTimeout(() => {
          LogOut();
        }, 1000);
      }
    } finally {
      setLoader(false);
    }
  };
  const handleTableChange = (pagination, filters, sorter) => {
    fetchData(pagination.current);
  };
  useEffect(() => {
    fetchData();
    console.log(props);
  }, [props.selectedWard, props.selectedHealthPost]);

  const Columns = [
    {
      title: "Ward Name",
      dataIndex: "wardName",
    },
    {
      title: "HealthPost Name",
      dataIndex: "healthPostName",
    },
    {
      title: "Total Family Count",
      dataIndex: "total_family_count",
    },
    {
      title: "Total Citizen Count",
      dataIndex: "total_citizen_count",
    },
    {
      title: "Total CBAC Count",
      dataIndex: "total_cbac_count",
    },
    {
      title: "Citizen Above 30",
      dataIndex: "citizen_above_30",
    },
    {
      title: "Citizen Above 60",
      dataIndex: "citizen_above_60",
    },
    {
      title: "Male",
      dataIndex: "male",
    },
    {
      title: "Female",
      dataIndex: "female",
    },
    {
      title: "Transgender",
      dataIndex: "transgender",
    },
    {
      title: "Total ABHA Created",
      dataIndex: "total_AbhaCreated",
    },
    {
      title: "Diabetes",
      dataIndex: "total_diabetes",
    },
    {
      title: "Hypertension",
      dataIndex: "hypertension",
    },
    {
      title: "Oral Cancer",
      dataIndex: "total_oral_cancer",
    },
    {
      title: "Cervical Cancer",
      dataIndex: "total_cervical_cancer",
    },
    {
      title: "COPD",
      dataIndex: "total_COPD_count",
    },
    {
      title: "Eye Problem",
      dataIndex: "total_eye_problem",
    },
    {
      title: "ENT Disorder",
      dataIndex: "total_ent_disorder",
    },
    {
      title: "Asthama",
      dataIndex: "total_asthma",
    },
    {
      title: "Alzheimers",
      dataIndex: "total_Alzheimers",
    },
    {
      title: "TB",
      dataIndex: "total_tb_count",
    },
    {
      title: "Breast Cancer",
      dataIndex: "total_breast_cancer",
    },
    {
      title: "Total Communicable",
      dataIndex: "total_communicable",
    },
    {
      title: "Blood Collected At Home",
      dataIndex: "blood_collected_home",
    },
    {
      title: "Blood Collected At Center",
      dataIndex: "blood_collected_center",
    },
    {
      title: "Denied By MO",
      dataIndex: "denieded_by_mo_count",
    },
    {
      title: "Denied By Individual",
      dataIndex: "denieded_by_mo_individual",
    },
    {
      title: "Test Report Generated",
      dataIndex: "TestReportGenerated",
    },
    {
      title: "Total LabTestAdded",
      dataIndex: "total_LabTestAdded",
    },
    {
      title: "Referral to Mun. Dispensary",
      dataIndex: "Referral_choice_Referral_to_Mun_Dispensary",
    },
    {
      title: "Referral to HBT polyclinic for physician consultation",
      dataIndex: "Referral_choice_Referral_to_HBT_polyclinic",
    },
    {
      title:
        "Referral to Peripheral Hospital / Special Hospital for management of Complication",
      dataIndex: "Referral_choice_Referral_to_Peripheral_Hospital",
    },
    {
      title: "Referral to Medical College for management of Complication",
      dataIndex: "Referral_choice_Referral_to_Medical_College",
    },
    {
      title: "Referral to Private facility",
      dataIndex: "Referral_choice_Referral_to_Private_facility",
    },
  ];
  return (
    <>
      <Spin spinning={loader} tip="Loading...">
        <div style={{ margin: "1%" }}>
          <StyledAntTable
            className="antd"
            columns={Columns}
            dataSource={reportData}
            pagination={pagination}
            onChange={handleTableChange}
            style={{ overflowX: "scroll" }}
          ></StyledAntTable>
        </div>
      </Spin>
    </>
  );
};

export default ReportTable;
