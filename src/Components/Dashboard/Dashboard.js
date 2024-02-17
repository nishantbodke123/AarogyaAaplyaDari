import {
  Row,
  Col,
  Divider,
  Form,
  Spin,
  Button,
  Dropdown,
  message,
  Popover,
  Radio,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  BloodDetailCard,
  CardTitle,
  CountCard,
  CountTitle,
  DetailSubtitle,
  Line,
  MainCountRow,
  ReferralCountCard,
} from "../../Admin/Content/Dashboard/style";
import { BASE_URL } from "../../Utils/BaseURL";
import axios from "axios";
import { LogOut } from "../../Auth/Logout";
import { Select, Tooltip } from "@mui/material";
import FormItem from "antd/es/form/FormItem";
import {
  AlignRightOutlined,
  DownloadOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import {
  ABHAIDSubmitButton,
  DownlaodCARDButton,
  DownlaodQRButton,
  DownloadPopoverText,
  InputForm,
  ViewButton,
} from "./style";

import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";

import { createContext, useContext } from "react";
import JSEncrypt from "jsencrypt";
import OtpInput from "react-otp-input";

// import { MyContext } from "../../Admin/Admin";

const { Option } = Select;

function Dashboard() {
  const [loader, setLoader] = useState(false);
  const [dashboardCounts, setDashboardCounts] = useState({});
  const [familyHeadList, setFamilyHeadList] = useState([]);
  const [partiallyFamilyHeadList, setPartiallyFamilyHeadList] = useState([]);

  const [showViewModal, setShowViewModal] = useState(false);
  const [familyMemeberDetails, setFamilyMemberDetails] = useState([]);
  const [familyID, setFamilyID] = useState();
  const [noOfFamilyMembers, setNoOfFamilyMembers] = useState();
  const [familyMemberArrayLength, setFamilyMemberArrayLength] = useState();
  const [showToDayCitizenCountModal, setShowToDayCitizenCountModal] =
    useState(false);
  const [TodayCitizenCountList, setTodayCitizenCountList] = useState();
  const [showTodayFamilyCountModal, setShowTodayFamilyCountModal] =
    useState(false);
  const [TodayFamilyCountList, setTodayFamilyCountList] = useState();
  const [showTotalCountModal, setShowTotalCountModal] = useState(false);
  const [totolCountList, setTotalCountList] = useState();
  const [showTotalFamilyCountModal, setShowTotalFamilyCountModal] =
    useState(false);
  const [totalFamilyCountList, setTotalFamilyCountList] = useState();
  const [showPartialCountModal, setShowPartialCountModal] = useState(false);
  const [partialCountList, setPartialCountList] = useState();
  const navigate = useNavigate();

  //1 st public key
  var encrypt = new JSEncrypt();
  var publicKey = `MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAstWB95C5pHLXiYW59qyO
    4Xb+59KYVm9Hywbo77qETZVAyc6VIsxU+UWhd/k/YtjZibCznB+HaXWX9TVTFs9N
    wgv7LRGq5uLczpZQDrU7dnGkl/urRA8p0Jv/f8T0MZdFWQgks91uFffeBmJOb58u
    68ZRxSYGMPe4hb9XXKDVsgoSJaRNYviH7RgAI2QhTCwLEiMqIaUX3p1SAc178ZlN
    8qHXSSGXvhDR1GKM+y2DIyJqlzfik7lD14mDY/I4lcbftib8cv7llkybtjX1Aayf
    Zp4XpmIXKWv8nRM488/jOAF81Bi13paKgpjQUUuwq9tb5Qd/DChytYgBTBTJFe7i
    rDFCmTIcqPr8+IMB7tXA3YXPp3z605Z6cGoYxezUm2Nz2o6oUmarDUntDhq/PnkN
    ergmSeSvS8gD9DHBuJkJWZweG3xOPXiKQAUBr92mdFhJGm6fitO5jsBxgpmulxpG
    0oKDy9lAOLWSqK92JMcbMNHn4wRikdI9HSiXrrI7fLhJYTbyU3I4v5ESdEsayHXu
    iwO/1C8y56egzKSw44GAtEpbAkTNEEfK5H5R0QnVBIXOvfeF4tzGvmkfOO6nNXU3
    o/WAdOyV3xSQ9dqLY5MEL4sJCGY1iJBIAQ452s8v0ynJG5Yq+8hNhsCVnklCzAls
    IzQpnSVDUVEzv17grVAw078CAwEAAQ==`;
  encrypt.setPublicKey(publicKey);

  // 2 nd public key
  var encrypt2 = new JSEncrypt();
  var publicKey2 = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7Zq7YKcjmccSBnR9CDHd
    6IX96V7D/a2XSMs+yCgejSe956mqjA/0Q9h+Xnx7ZZdwe2Tf2Jq/mWXa+gYdnta5
    8otreXg/5oGnNV3Edlixz1Oc8tJg5bG4sIUCGZcbEQGSbm1iC+Fp1kS+YLVG4Su8
    KoRxcCvRJI2QkfqAruX3JoFjggOkv0TgWCo9z6NV6PPmPN3UsXyH3OPDi3Ewnvd6
    4ngCUKPSBiIDwhLj2yYSShcxH8aWbrz00SJodBJzqgjvCfZuljBXXIN4Ngi/nzqE
    J7woKQ1kNgWoHFZy7YL74PihW//4OlniSRoITX+7ChILIv2ezSmAdIjpNJ9Dg9XK
    cQIDAQAB`;
  encrypt2.setPublicKey(publicKey2);

  // OTP Timer

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  let axiosConfig = {
    headers: {
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };

  const handleShowToDayCitizenCountModal = () => {
    axios
      .get(`${BASE_URL}/healthworker/api/GetCitizenList/Today`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setTodayCitizenCountList(response.data);
        setShowToDayCitizenCountModal(true);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          message.error(error.message);
        }
      });
  };
  const handleHideToDayCitizenCountModal = () => {
    setShowToDayCitizenCountModal(false);
  };
  const handleShowTodayFamilyCountModal = () => {
    axios
      .get(`${BASE_URL}/healthworker/api/GetFamilyList/Today`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setTodayFamilyCountList(response.data);
        setShowTodayFamilyCountModal(true);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          message.error(error.message);
        }
      });
  };
  const handleHideTodayFamilyCountModal = () => {
    setShowTodayFamilyCountModal(false);
  };

  const handleShowTotalCountModal = () => {
    axios
      .get(`${BASE_URL}/healthworker/api/GetCitizenList/All`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setTotalCountList(response.data);
        setShowTotalCountModal(true);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          message.error(error.message);
        }
      });
  };
  const handleHideTotalCountModal = () => {
    setShowTotalCountModal(false);
  };
  const handleShowTotalFamilyCountModal = () => {
    axios
      .get(`${BASE_URL}/healthworker/api/GetFamilyList/All`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setTotalFamilyCountList(response.data);
        setShowTotalFamilyCountModal(true);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          message.error(error.message);
        }
      });
  };
  const handleHideTotalFamilyCountModal = () => {
    setShowTotalFamilyCountModal(false);
  };

  const handleShowPartialCountModal = () => {
    setLoader(true);
    axios
      .get(
        `${BASE_URL}/healthworker/api/GetPartiallyInsertedRecord`,
        axiosConfig
      )
      .then((response) => {
        console.log(response.data);
        setLoader(false);
        setPartialCountList(response.data);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          message.error(error.message);
        }
      });
    setShowPartialCountModal(true);
  };
  const handleHidePartialCountModal = () => {
    setShowPartialCountModal(false);
  };

  useEffect(() => {
    setLoader(true);

    console.log(axiosConfig);
    axios
      .get(`${BASE_URL}/healthworker/api/GetSurveyorDashboard`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setDashboardCounts(response.data);

        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            LogOut();
          }, 1000);
        } else {
          message.error(error.message);
        }

        setLoader(false);
      });
    axios
      .get(`${BASE_URL}/healthworker/api/GetFamilyHeadList`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setFamilyHeadList(response.data);
        setLoader(false);
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
        setLoader(false);
      });

    axios
      .get(
        `${BASE_URL}/healthworker/api/GetPartiallyInsertedRecord`,
        axiosConfig
      )
      .then((response) => {
        console.log(response.data);
        setLoader(false);
        setPartiallyFamilyHeadList(response.data);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });
  }, []);

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
        console.log(response.data.length);
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
  // familyHeadList
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

  const handleFamilyMembersView = (data) => {
    console.log(data);
    navigate("/update", { state: data });
  };

  const handleNewFamilyMemberAdd = () => {
    console.log(familyID, noOfFamilyMembers);
    navigate("/addMember", { state: familyID });
  };
  const FamilyMemberItems = [
    {
      title: "ID",
      dataIndex: "id",
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
  ];

  const TodayCitizenCountTitleList = [
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
  ];
  const TodayFamilyCountTitleList = [
    {
      title: "Family ID",
      dataIndex: "familyId",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const TotalCountTitleList = [
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
  ];
  const TotalFamilyCountList = [
    {
      title: "Family ID",
      dataIndex: "familyId",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const PartialCountTitleList = [
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
      title: "Mobile No",
      dataIndex: "mobileNo",
    },
  ];
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState();
  const [abhaId, setAbhaId] = useState();
  const [txnId, settxnID] = useState();
  const [selectedAuthMethods, setSelectedAuthMethods] = useState();
  const [aadharNumberSubmitted, setAadharNumberSubmitted] = useState(false);
  const [ABHAIDSubmited, setABHAIDSubmited] = useState(false);
  const [authMethodSelected, setAuthMethodSelected] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [mobileNumberLinkedWithABHAID, setMobileNumberLinkedWithABHAID] =
    useState();
  const [authMethodResponse, setAuthMethodResponse] = useState([]);
  const [healthIdResponse, setHealthIdResponse] = useState();
  const handleABHAIDSubmit = async () => {
    setMinutes(2);
    setSeconds(29);
    console.log(abhaId);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
      },
    };

    const formData = new FormData();
    formData.append("clientId", "SBX_004200");
    formData.append("clientSecret", "bed456a5-46bb-4de5-94ef-6caa2dc77a00");
    await axios
      .post(`${BASE_URL}/abdm/api/GetGatewaySessionTokenAPI`, formData, {
        "Content-Type": "application/json",
      })
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("BearerToken", res.data.accessToken);
        axios
          .post(
            `${BASE_URL}/abdm/api/v1/phr/registration/hid/search/auth-methods`,
            { healhtIdNumber: abhaId },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${res.data.accessToken}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            setAuthMethodResponse(res.data.authMethods);
            setHealthIdResponse(res.data.healthIdNumber);
            // setABHAIDSubmited(true);
            setAuthMethodSelected(true);
            // message.success(res.data.message);
          })
          .catch((err) => {
            console.log(err);
            message.warning(err.response.data.message);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleAbhaIDVerify = async () => {
    console.log(otp);
    let encryptedOTP = encrypt.encrypt(otp);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
      },
    };

    try {
      let response;
      const data = {
        otp: otp,
        txnId: txnId,
      };
      if (selectedAuthMethods === "AADHAAR_OTP") {
        setOtp();
        response = await axios.post(
          `${BASE_URL}/abdm/api/v1/auth/confirmWithAadhaarOtp`,
          data,
          axiosConfig
        );
      } else if (selectedAuthMethods === "MOBILE_OTP") {
        setOtp();
        response = await axios.post(
          `${BASE_URL}/abdm/api/v1/auth/confirmWithMobileOTP`,
          data,
          axiosConfig
        );
      }
      console.log(response, "ABHA OTP");
      if (response.status == 200) {
        sessionStorage.setItem("X-Token", response.data.token);
        setOtpVerified(true);
      }
    } catch (error) {
      console.error("Error:", error);
      message.warning(error.response.data.message);
    }
  };
  const handleABHACardDownload = () => {
    setLoading(true);
    console.log(sessionStorage.getItem("X-Token"));
    axios
      .get(`${BASE_URL}/abdm/api/v1/account/getCard`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
          "content-type": "application/json",
          "X-Token": `Bearer ${sessionStorage.getItem("X-Token")}`,
          accept: "*/*",
          "Accept-Language": "en-US",
        },
        responseType: "blob",
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", `ABHACard.pdf`);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleABHAQRDownload = () => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/abdm/api/v1/account/getqrCode`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
          "content-type": "image/png",
          "X-Token": `Bearer ${sessionStorage.getItem("X-Token")}`,
          accept: "*/*",
          "Accept-Language": "en-US",
        },
        responseType: "blob",
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", `Qrcode.png`);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const handleBackButtonOfABHADownload = () => {
    setAuthMethodSelected(false);
    setABHAIDSubmited(false);
    setOtpVerified(false);
    setSelectedAuthMethods();
    setOtp();
    setMinutes(0);
    setSeconds(0);
  };
  const handleAbhaIDChange = (e) => {
    const alphanumericText = e.target.value.replace(/[^0-9]/g, ""); // Remove non-alphanumeric characters

    let formattedText = "";
    for (let i = 0; i < alphanumericText.length; i++) {
      if (i === 2 || i === 6 || i === 10) {
        formattedText += "-";
      }
      formattedText += alphanumericText[i];
    }

    // Ensure that the input does not start with a hyphen
    if (formattedText.startsWith("-")) {
      formattedText = formattedText.substring(1);
    }

    setAbhaId(formattedText);
  };
  const handleSelectAuthMethods = (e) => {
    // setProgress(20);
    setLoading(true);
    console.log(e.target.value);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
      },
    };
    setSelectedAuthMethods(e.target.value);
    axios
      .post(
        `${BASE_URL}/abdm/api/v1/auth/init`,
        {
          authMethod: e.target.value,
          healthid: abhaId,
        },
        axiosConfig
      )
      .then((response) => {
        console.log(response);
        // setProgress(70);
        setLoading(false);
        settxnID(response.data.txnId);
        setAadharNumberSubmitted(true);
        setMinutes(2);
        setSeconds(29);
        setABHAIDSubmited(true);
      })
      .catch((error) => {
        // setProgress(70);
        setLoading(false);
        console.log(error);
        message.warning(error.response.data.message);
      });
    // setProgress(100);
  };
  const ABHACARDDownloadInputContent = (
    <>
      <div>
        {" "}
        <Button
          style={{
            borderRadius: "30px",
            display:
              !authMethodSelected && !ABHAIDSubmited && !otpVerified
                ? "none"
                : "block",
          }}
          disabled={!authMethodSelected && !ABHAIDSubmited && !otpVerified}
          onClick={handleBackButtonOfABHADownload}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
      </div>
      {otpVerified ? (
        <>
          <div style={{ width: "25vw" }}>
            <p style={{ fontSize: "15px", marginLeft: "3%" }}>
              ABHA ID:
              <span style={{ fontWeight: "700", marginLeft: "3%" }}>
                {abhaId}
              </span>
            </p>
            <p
              style={{
                fontSize: "20px",
                fontWeight: "600",
                margin: "-2% -2% 0% 3%",
              }}
            >
              Download Options
            </p>
            <p style={{ margin: "0% 0% 3% 3%" }}>
              Choose a format to download ABHA Card
            </p>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <DownlaodCARDButton onClick={handleABHACardDownload}>
                Download Card
              </DownlaodCARDButton>
              <DownlaodQRButton onClick={handleABHAQRDownload}>
                Download QR
              </DownlaodQRButton>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                margin: "5% 5%",
              }}
            >
              <Button
                onClick={handleBackButtonOfABHADownload}
                style={{ width: "120px", backgroundColor: "#FF8551" }}
              >
                Finish
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <Form layout="vertical">
            <Form.Item label="Health ID">
              <InputForm
                type="text"
                value={abhaId}
                maxLength={17}
                onChange={(e) => handleAbhaIDChange(e)}
                placeholder="Enter ABHA ID"
              ></InputForm>
            </Form.Item>

            {authMethodSelected ? (
              <>
                <div>
                  {" "}
                  <h4>
                    Please select one of the following options to receive your
                    OTP
                  </h4>
                </div>
                {authMethodResponse.map((data) => (
                  <Radio.Group
                    onChange={(e) => handleSelectAuthMethods(e)}
                    value={selectedAuthMethods}
                    style={{ margin: "0px 30px" }}
                  >
                    <Radio value={data}>{data}</Radio>
                  </Radio.Group>
                ))}
              </>
            ) : (
              <></>
            )}
            {ABHAIDSubmited ? (
              <>
                <div style={{ margin: "5% 5% " }}>
                  <Form.Item label="OTP">
                    <OtpInput
                      inputStyle={{
                        width: "35px",
                        height: "30px",
                        margin: "2px 10px",
                      }}
                      value={otp}
                      numInputs={6}
                      type="number"
                      onChange={(value) => setOtp(value)}
                      renderSeparator={<span></span>}
                      renderInput={(props) => <input {...props} />}
                    ></OtpInput>
                    <div className="countdown-text">
                      {seconds > 0 || minutes > 0 ? (
                        <p style={{ color: "red" }}>
                          Time Remaining:{" "}
                          {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      ) : (
                        <p>Didn't recieve code?</p>
                      )}
                      <a
                        style={{
                          display: seconds > 0 || minutes > 0 ? "none" : "",
                        }}
                        onClick={handleABHAIDSubmit}
                      >
                        Resend OTP
                      </a>
                    </div>
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <ABHAIDSubmitButton onClick={handleAbhaIDVerify}>
                        Verify
                      </ABHAIDSubmitButton>
                    </div>

                    {/* <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "10px 40px ",
                }}
              >
                <a onClick={handleABHAIDSubmit}>Resend OTP</a>
              </div> */}
                  </Form.Item>
                </div>
              </>
            ) : (
              <>
                {authMethodSelected || otpVerified ? (
                  <></>
                ) : (
                  <>
                    {" "}
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      <ABHAIDSubmitButton onClick={handleABHAIDSubmit}>
                        Submit
                      </ABHAIDSubmitButton>
                    </div>
                  </>
                )}
              </>
            )}
          </Form>
        </>
      )}
    </>
  );

  const handleUserListDownload = () => {
    setLoader(true);
    // Create a new Date object
    const today = new Date();

    // Get the current date components
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = today.getDate();
    axios
      .get(`${BASE_URL}/healthworker/api/DownloadANM_CHV_UserList`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        setLoader(false);
        console.log(response);
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          `Citizen Details_${day + "-" + month + "-" + year}.xlsx`
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .then((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  return (
    <>
      <Spin spinning={loader}>
        <Header />
        <div
          style={{
            overflowY: "auto",
            height: "92vh",
            backgroundColor: "#F5F5F5",
          }}
        >
          <Row style={{ padding: "2%", width: "100%", height: "100%" }}>
            <Col span={14}>
              <h3>Citizens Details</h3>
              <MainCountRow>
                <CountCard>
                  <CardTitle>Families Enrolled</CardTitle>
                  <CountTitle>{dashboardCounts.total_family_count}</CountTitle>
                </CountCard>
                <CountCard>
                  <CardTitle>Citizens Enrolled</CardTitle>
                  <CountTitle>{dashboardCounts.total_count}</CountTitle>
                </CountCard>
                <CountCard>
                  <CardTitle>CBAC Filled</CardTitle>
                  <CountTitle>{dashboardCounts.total_cbac_count}</CountTitle>
                </CountCard>
              </MainCountRow>
              <br />
              <MainCountRow>
                <CountCard>
                  <CardTitle>ABHA ID Generated</CardTitle>
                  <CountTitle>{dashboardCounts.total_AbhaCreated}</CountTitle>
                </CountCard>
                <CountCard>
                  <CardTitle>Citizens 30 years + enrolled</CardTitle>
                  <CountTitle>{dashboardCounts.citizen_above_30}</CountTitle>
                </CountCard>
                <CountCard>
                  <CardTitle>Citizens 60 years + enrolled</CardTitle>
                  <CountTitle>{dashboardCounts.citizen_above_60}</CountTitle>
                </CountCard>
              </MainCountRow>
              <br />
              <MainCountRow>
                <CountCard>
                  <CardTitle>Vulnerable Citizen</CardTitle>
                  <CountTitle>{dashboardCounts.total_vulnerabel}</CountTitle>
                </CountCard>
              </MainCountRow>
            </Col>
            <Col span={1}></Col>
            <Col span={9} style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  margin: "2% 2%",
                }}
              >
                <Popover
                  content={
                    <>
                      <Popover
                        content={ABHACARDDownloadInputContent}
                        trigger="click"
                        placement="right"
                      >
                        <DownloadPopoverText>
                          ABHA Card Download
                        </DownloadPopoverText>
                      </Popover>
                      <div>
                        <DownloadPopoverText onClick={handleUserListDownload}>
                          Citizen Details Download
                        </DownloadPopoverText>
                      </div>
                    </>
                  }
                  trigger="hover"
                  placement="right"
                >
                  <Button>
                    <MenuOutlined />
                  </Button>
                </Popover>
              </div>
              <BloodDetailCard>
                <h3>Blood Collection Details</h3>
                <br />

                <MainCountRow>
                  <DetailSubtitle> Tests Assigned</DetailSubtitle>
                  <CountTitle>{dashboardCounts.TestsAssigned}</CountTitle>
                </MainCountRow>
                <Line />

                <MainCountRow>
                  <DetailSubtitle>Total Reports Generated</DetailSubtitle>
                  <CountTitle>{dashboardCounts.TestReportGenerated}</CountTitle>
                </MainCountRow>
                <Line />
                <MainCountRow>
                  <DetailSubtitle>Blood Collected At Home</DetailSubtitle>
                  <CountTitle>
                    {dashboardCounts.blood_collected_home}
                  </CountTitle>
                </MainCountRow>
                <Line />
                <MainCountRow>
                  <DetailSubtitle>Blood Collected At Center</DetailSubtitle>
                  <CountTitle>
                    {dashboardCounts.blood_collected_center}
                  </CountTitle>
                </MainCountRow>
                <Line />

                <MainCountRow>
                  <DetailSubtitle>
                    Blood Collection Denied By AMO
                  </DetailSubtitle>
                  <CountTitle>
                    {dashboardCounts.denieded_by_mo_count}
                  </CountTitle>
                </MainCountRow>
                <Line />
                <MainCountRow>
                  <DetailSubtitle>
                    Blood Collection Denied By Citizen
                  </DetailSubtitle>
                  <CountTitle>
                    {dashboardCounts.denieded_by_mo_individual}
                  </CountTitle>
                </MainCountRow>
              </BloodDetailCard>
            </Col>
            <Divider />
            <div style={{ width: "95vw" }}>
              <h3>Referrals</h3>
              <div>
                <Row>
                  <Col span={8}>
                    <ReferralCountCard>
                      <CardTitle>
                        {" "}
                        Referral to Mun. Dispensary / HBT for Blood Test /
                        Confirmation / Treatment
                      </CardTitle>
                      <CountTitle>
                        {dashboardCounts.Referral_choice_further_management}
                      </CountTitle>
                    </ReferralCountCard>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle>
                        {" "}
                        Referral to HBT polyclinic for physician consultation
                      </CardTitle>
                      <CountTitle>
                        {dashboardCounts.Referral_choice_suspect_symptoms}
                      </CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={8}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle>
                        {" "}
                        Referral to Peripheral Hospital / Special Hospital for
                        management of Complication
                      </CardTitle>
                      <CountTitle>
                        {dashboardCounts.Referral_choice_diagnosis}
                      </CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                </Row>
                <div style={{ height: "10px" }}></div>
                <Row>
                  {" "}
                  <Col span={8}>
                    <ReferralCountCard>
                      <CardTitle>
                        {" "}
                        Referral to Medical College for management of
                        Complication
                      </CardTitle>
                      <CountTitle>
                        {
                          dashboardCounts.Referral_choice_co_morbid_investigation
                        }
                      </CountTitle>
                    </ReferralCountCard>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Referral to Private facility</CardTitle>
                      <CountTitle>
                        {
                          dashboardCounts.Referral_choice_Collection_at_dispensary
                        }
                      </CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                </Row>
              </div>
            </div>{" "}
            <Divider />
            <div>
              <div>
                <h3>Disease Suspected</h3>
              </div>
              <div style={{ width: "95vw" }}>
                <Row>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle>Diabetes</CardTitle>
                      <CountTitle>{dashboardCounts.diabetes}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle>Hypertension</CardTitle>
                      <CountTitle>{dashboardCounts.hypertension}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Oral Cancer</CardTitle>
                      <CountTitle>{dashboardCounts.oral_Cancer}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Cervical Cancer</CardTitle>
                      <CountTitle>{dashboardCounts.cervical_cancer}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={4}>
                    <ReferralCountCard>
                      <CardTitle> Breast Cancer</CardTitle>
                      <CountTitle>{dashboardCounts.breast_cancer}</CountTitle>
                    </ReferralCountCard>
                  </Col>
                </Row>
                <div style={{ height: "10px" }}></div>
                <Row>
                  {" "}
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> COPD</CardTitle>
                      <CountTitle>{dashboardCounts.copd}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Asthma</CardTitle>
                      <CountTitle>{dashboardCounts.asthama}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={5}>
                    <ReferralCountCard>
                      <CardTitle>TB</CardTitle>
                      <CountTitle>{dashboardCounts.tb}</CountTitle>
                    </ReferralCountCard>
                  </Col>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Alzheimer/Dementia</CardTitle>
                      <CountTitle>
                        {dashboardCounts.Alzheimers_Dementia}
                      </CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={4}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> ENT Disorder</CardTitle>
                      <CountTitle>{dashboardCounts.ent_disorder}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                </Row>
                <div style={{ height: "10px" }}></div>
                <Row>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Eye Disorder</CardTitle>
                      <CountTitle>{dashboardCounts.eye_disorder}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Leprosy</CardTitle>
                      <CountTitle>{dashboardCounts.leprosy}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Other Communicable Disease</CardTitle>
                      <CountTitle>{dashboardCounts.communicable}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                </Row>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "end",
                width: "100%",
                margin: "3% 0% -5% 0%",
              }}
            >
              <p style={{ margin: "0% 1% 0.5% 0%" }}>
                Developed and Maintained By
              </p>
              <img
                src="\BhugolGISLogo.png"
                style={{ width: "10rem", height: "2.5rem" }}
              />
            </div>
          </Row>
        </div>
      </Spin>
    </>
  );
}
export default Dashboard;
