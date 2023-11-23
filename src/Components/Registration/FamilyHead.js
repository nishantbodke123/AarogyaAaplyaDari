import React, { useEffect, useState } from "react";

import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { JSEncrypt } from "jsencrypt";
import LoadingBar from "react-top-loading-bar";

import {
  Checkbox,
  Radio,
  Tabs,
  Button,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Col,
  message,
  Spin,
  Tooltip,
  Popover,
} from "antd";

import {
  AnswerCol,
  FormContainer,
  ModalFormItem,
  QuestionCol,
  QuestionRow,
  SubmitButton,
  SubmitButtonDiv,
  AnswerSubCol,
  BloodLogoImage,
  BloodSampleButtonCol,
  BloodSampleButtonsRow,
  BloodSampleText,
  Column,
  Container,
  DocsTab,
  FormHeader,
  FormItem,
  QuestionSubCol,
  QuestionSubRow,
  SelectWardButton,
  AadharOtpLinkedModal,
  CheckAndGenerateMobileOtpModal,
  HealthIdModal,
  HealthNumberModal,
  CreateHealthIdModal,
  InputForm,
  InputBox,
  ABHACardDownLoad,
  ABHAIDSubmitButton,
} from "./style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faFileArrowDown,
  faHouse,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import axios, { Axios } from "axios";
import { BASE_URL } from "../../Utils/BaseURL";
import { useTranslation } from "react-i18next";
import { Link, json, useLocation } from "react-router-dom";
import { LogOut } from "../../Auth/Logout";
import { type } from "@testing-library/user-event/dist/type";
import OtpInput from "react-otp-input";
import { ExclamationCircleOutlined } from "@ant-design/icons";

function FamilyHead(props) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { state } = useLocation();
  // state for progress bar
  const [progress, setProgress] = useState(0);

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

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };

  useEffect(() => {
    i18n.changeLanguage("mr");
    setShowModal(true);

    axios
      .get(`${BASE_URL}/allauth/api/GetWardListAPI`, axiosConfig)
      .then((response) => {
        setWardList(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 401) {
          message.warning("System is LogedOut");
          setTimeout(() => {
            LogOut();
          }, 1000);
        } else {
          message.warning(error.response.status);
        }
      });

    axios
      .get(
        `${BASE_URL}/allauth/api/GetHealthPostAreas/${sessionStorage.getItem(
          "healthPostID"
        )}`,
        axiosConfig
      )
      .then((response) => {
        console.log(response.data.data);
        setHealthPostAreasList(response.data.data);
      })
      .catch((error) => {
        console.log(error, "health post areas error ");
        if (error.response.status == 401) {
          message.warning("System is LogedOut");
          setTimeout(() => {
            LogOut();
          }, 1000);
        } else {
          message.warning(error.response.status);
        }
      });
  }, []);

  const handleSectionSelect = (value) => {
    console.log(value);
    setSection(value);
  };

  const [loading, setLoading] = useState(false);
  const [familyHeadRegister, setFamilyHeadRegister] = useState("no");
  const [showModal, setShowModal] = useState(false);
  const [wardList, setWardList] = useState([]);
  const [healthPostAreas, setHealthPostAreasList] = useState([]);
  const [section, setSection] = useState("");

  //  modal of area selection
  const handleShowModalClose = () => {
    setShowModal(false);
  };

  const handleWardSelectionModal = () => {
    if (section == "") {
      message.warning("Please select area");
    } else {
      handleShowModalClose();
    }
  };

  //Family Head Form States

  const [familyHeadName, setFamilyHeadName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [pincode, setPinCode] = useState("");
  const [totalFamilyMembers, setTotalFamilyMembers] = useState("");
  const [ward_name, setWard_name] = useState("");
  const [healthPost, setHealthPost] = useState("");
  const [bloodConsent, setBloodConsent] = useState(false);
  const [partialSubmit, setPartialSubmit] = useState(false);

  const Data = {
    ward_name: ward_name,
    name: familyHeadName,
    mobileNo: mobileNo,
    plotNo: plotNumber,
    addressLine1: addressLine1,
    pincode: pincode,
    totalFamilyMembers: totalFamilyMembers,
    healthPost: healthPost,
  };

  const handleFamilyMembers = (e) => {
    const regex = /^[0-9]{1,3}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setTotalFamilyMembers(e.target.value);
    }
  };

  const handleFamilyHeadSubmit = () => {
    let axiosConfig = {
      headers: {
        Authorization: `Token ${sessionStorage.getItem("Token")}`,
      },
    };
    if (section == "") {
      message.warning("Please Select Area");
    } else if (familyHeadName == "") {
      message.warning("Please Enter First Name");
    } else if (mobileNo == "") {
      message.warning("Plese Enter Mobile Number");
    } else if (addressLine1 == "") {
      message.warning("Please Enter Address");
    } else if (pincode == "") {
      message.warning("Please Enter PinCode");
    } else if (totalFamilyMembers == "") {
      message.warning("Please Enter number Family members ");
    } else {
      axios
        .get(
          `${BASE_URL}/healthworker/api/verifyMobileNumber/${mobileNo}`,
          axiosConfig
        )
        .then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            setFamilyHeadRegister("yes");
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          message.warning(error.response.data.message);
        });
    }
  };

  // Abha ID Modal
  const [showAadharOtpLinkedModal, setShowAadharOtpLinkedModal] =
    useState(false);
  const [otp, setOtp] = useState();
  const [mobileNumberForAbhaID, setMobileNumberForAbhaID] = useState();
  const handleMobileNumberForAbhaId = (e) => {
    const regex = /^[0-9]{1,10}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setMobileNumberForAbhaID(e.target.value);
    }
  };
  const [aadharLinkedMobileNumber, setAadharLinkedMobileNumber] =
    useState(true);
  const [
    showCheckAndGenerateMobileOtpModal,
    setShowCheckAndGenerateMobileOtpModal,
  ] = useState();

  // 1st modal to aadhar verification
  const handleShowAadharOtpLinkedModal = () => {
    const formData = new FormData();
    formData.append("clientId", "SBX_004200");
    formData.append("clientSecret", "bed456a5-46bb-4de5-94ef-6caa2dc77a00");
    axios
      .post(`${BASE_URL}/abdm/api/GetGatewaySessionTokenAPI`, formData, {
        "Content-Type": "application/json",
      })
      .then((res) => {
        console.log(res.data.accessToken);
        sessionStorage.setItem("BearerToken", res.data.accessToken);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowAadharOtpLinkedModal(true);
  };

  const handleHideAadharOtpLinkedModal = () => {
    setAadharNumber();
    setOtp();
    setAadharNumberSubmitted(false);
    setShowAadharOtpLinkedModal(false);
  };

  const [aadharNumber, setAadharNumber] = useState();
  const [mobileNumberLinkedWithAadhar, setMobileNumberLinkedWithAadhar] =
    useState();
  const [txnId, settxnID] = useState();
  const [aadharNumberSubmitted, setAadharNumberSubmitted] = useState(false);
  const handleAadharNumberChange = (e) => {
    const regex = /^[0-9]{1,12}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setAadharNumber(e.target.value);
    }
  };

  // adhar verification 1st step
  const handleAadharNumberSubmit = () => {
    setProgress(20);
    setLoading(true);
    var data = encrypt.encrypt(aadharNumber);

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
      },
    };
    axios
      .post(
        `${BASE_URL}/abdm/api/generateAadharOtpAPI`,
        {
          aadhaar: data,
        },
        axiosConfig
      )
      .then((response) => {
        setProgress(70);
        setLoading(false);
        console.log(response);
        setMobileNumberLinkedWithAadhar(response.data.mobileNumber);
        settxnID(response.data.txnId);
        if (response.status == 200) {
          setProgress(100);
          setAadharNumberSubmitted(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.message);
        message.warning(error.response.data.message);
      });
  };

  // aadhar verify by OTP in 1st step
  const handleAadharVerify = () => {
    setProgress(20);
    setLoading(true);
    var data = encrypt.encrypt(otp);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
      },
    };
    axios
      .post(
        `${BASE_URL}/abdm/api/verifyAadharOTP`,
        {
          otp: data,
          txnId: txnId,
        },
        axiosConfig
      )
      .then((response) => {
        setProgress(70);
        setLoading(false);
        console.log(response);
        handleHideAadharOtpLinkedModal();
        if (response.data.healthIdNumber === null) {
          console.log(response.data.healthIdNumber);
          setAbhaId(response.data.healthIdNumber);
          Modal.info({
            title: "ABHA ID Already Exists",
            content: (
              <div>
                <p>
                  Abha ID Already Exist with this Aadhar card Number ,ABHA ID is
                  as given :
                </p>
                <h4>{response.data.healthIdNumber}</h4>
              </div>
            ),
          });
        } else {
          handleShowCheckAndGeneratedMobileOtp();
        }
        setProgress(100);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.message);
        message.warning(error.response.data.message);
      });
  };

  const handleShowCheckAndGeneratedMobileOtp = () => {
    setShowCheckAndGenerateMobileOtpModal(true);
  };
  const handleHideCheckAndGeneratedMobileOtp = () => {
    setMobileNumberForAbhaID("");
    setOtp("");
    setAadharLinkedMobileNumber(true);
    setShowCheckAndGenerateMobileOtpModal(false);
  };
  const handleBackButtonOfCheckAndGenerateMobileOtpModal = () => {
    setAadharLinkedMobileNumber(true);
    setOtp();
  };

  // state for creations of abha number in 2nd step
  const [aadharPhotoURL, setAadharPhotoURL] = useState("");
  const [aadharCardName, setAadharCardName] = useState();
  const [aadharMobileNumber, setAadharMobileNumber] = useState();
  const [healthNumber, setHealthNumber] = useState();
  const [authMethods, setAuthMethods] = useState([]);
  const [selectedAuthMethods, setSelectedAuthMethods] = useState();
  const [healthId, setHealthId] = useState();
  const [healthIdPassword, setHealthIdPassword] = useState();
  const [listOfSuggestedHealthID, setListOfSuggestedHealthID] = useState([]);

  // 2nd step check mobile number linked with adhar or not for link with abha ID
  const handleCheckAndGenerateMobileOtp = () => {
    setProgress(20);
    setLoading(true);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
      },
    };
    const formData = new FormData();
    formData.append("mobile", mobileNumberForAbhaID);
    formData.append("txnId", txnId);
    axios
      .post(
        `${BASE_URL}/abdm/api/checkAndGenerateMobileOTP`,
        formData,
        axiosConfig
      )
      .then((res) => {
        setProgress(70);
        setLoading(false);
        console.log(res.data.txnId);
        settxnID(res.data.txnId);
        if (res.data.mobileLinked) {
          setProgress(100);
          Modal.confirm({
            title: "Create Health ID",
            icon: <ExclamationCircleOutlined />,
            content: (
              <>
                <p>
                  This number is associated with your Aadhar card. Would you
                  like to link it with your Abha card?
                </p>
              </>
            ),
            okText: "Confirm",
            onOk() {
              setProgress(20);
              setLoading(true);
              console.log("Confirmed");
              axios
                .post(
                  `${BASE_URL}/abdm/api/createHealthIdByAdhaarAPI`,
                  {
                    consent: res.data.mobileLinked,
                    consentVersion: "v1.0",
                    txnId: res.data.txnId,
                  },
                  axiosConfig
                )
                .then((res) => {
                  setProgress(70);
                  console.log(res);
                  setLoading(false);
                  setAadharPhotoURL(res.data.kycPhoto);
                  setAadharCardName(res.data.name);
                  setAadharMobileNumber(res.data.mobile);
                  setAbhaId(res.data.healthIdNumber);
                  setHealthId(res.data.healthId);
                  setMobileNumberForAbhaID("");
                  handleShowHealthNumberModal();
                  handleHideCheckAndGeneratedMobileOtp();
                })
                .catch((error) => {
                  setProgress(70);
                  setLoading(false);
                  console.log(error);
                });
              setProgress(100);
            },
            onCancel() {
              console.log("Cancel");
            },
            cancelText: "Cancel",
          });
        } else {
          setAadharLinkedMobileNumber(res.data.mobileLinked);
        }
      })
      .catch((err) => {
        setProgress(70);
        console.log(err);
      });
    setProgress(100);
  };

  const [showHealthNumberModal, setHealthNumberModal] = useState(false);
  const handleShowHealthNumberModal = () => {
    setHealthNumberModal(true);
  };
  const handleHideHealthNumberModal = () => {
    setHealthNumberModal(false);
  };

  const [showHealthIdModal, setShowHealthIdModal] = useState(false);
  const handleShowHealthIdModal = () => {
    setProgress(20);
    setLoading(true);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
      },
    };
    axios
      .post(
        `${BASE_URL}/abdm/api/v1/phr/registration/hid/search/auth-methods`,
        {
          healhtIdNumber: abhaId,
        },
        axiosConfig
      )
      .then((res) => {
        setProgress(70);
        setLoading(false);
        console.log(res.data.authMethods);
        setAuthMethods(res.data.authMethods);
        setShowHealthIdModal(true);
      })
      .catch((error) => {
        setProgress(70);
        setLoading(false);
        console.log(error);
      });
    setProgress(100);
  };
  const handleHideHealthIdModal = () => {
    setSelectedAuthMethods();
    setOtp();
    setShowHealthIdModal(false);
  };

  const handleVerifyNumberLinktoAbhaCard = () => {
    setProgress(20);
    setLoading(true);
    var data = encrypt.encrypt(otp);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
      },
    };
    console.log(axiosConfig);
    axios
      .post(
        `${BASE_URL}/abdm/api/verifyAadharOTP`,
        {
          otp: data,
          txnId: txnId,
        },
        axiosConfig
      )
      .then((res) => {
        setProgress(70);
        setLoading(false);
        console.log(res.data.message);
      })
      .catch((err) => {
        setProgress(70);
        setLoading(false);
        console.log(err.response.data.message);
        message.warning(err.response.data.message);
      });
    setProgress(100);
  };
  const handleSelectAuthMethods = (e) => {
    setProgress(20);
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
        `${BASE_URL}/abdm/api/v1/phr/registration/hid/init/AuthMethodAPI`,
        {
          authMethod: e.target.value,
          healhtIdNumber: abhaId,
        },
        axiosConfig
      )
      .then((response) => {
        setProgress(70);
        setLoading(false);
        settxnID(response.data.transactionId);
        console.log(response);
      })
      .catch((error) => {
        setProgress(70);
        setLoading(false);
        console.log(error);
        message.warning(error.response.data.details[0].message);
      });
    setProgress(100);
  };
  const handleVerifyWhileHealthIDGeneration = () => {
    setProgress(20);
    setLoading(true);
    let data = encrypt2.encrypt(otp);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
      },
    };
    axios
      .post(
        `${BASE_URL}/abdm/api/v1/phr/registration/hid/confirm/credential`,
        {
          transactionId: txnId,
          value: data,
        },
        axiosConfig
      )
      .then((res) => {
        setProgress(50);
        setLoading(false);
        console.log(res);
        settxnID(res.data.transactionId);
        axios
          .post(
            `${BASE_URL}/abdm/api/v1/phr/registration/phr/suggestion`,
            {
              transactionId: res.data.transactionId,
            },
            axiosConfig
          )
          .then((res) => {
            setProgress(70);
            console.log(res);
            setListOfSuggestedHealthID(res.data);
            handleShowCreateHealthIdModal();
            handleHideHealthNumberModal();
          })
          .catch((err) => {
            setProgress(70);
            console.log(err);
          });

        console.log(res.data.transactionId);
        handleHideHealthIdModal();
      })
      .catch((err) => {
        setProgress(70);
        setLoading(false);
        console.log(err);
        message.warning(err.response.data.message);
      });
    setProgress(100);
  };

  const [showCreateHealthIdModal, setShowCreateHealthIdModal] = useState(false);
  const handleShowCreateHealthIdModal = () => {
    console.log(txnId);
    setShowCreateHealthIdModal(true);
  };
  const handleHideCreateHealthIdModal = () => {
    setHealthId();
    setHealthIdPassword();
    setShowCreateHealthIdModal(false);
  };
  const handleCreateHealthID = () => {
    console.log(healthId);
    console.log(healthIdPassword);
    console.log(txnId);
    if (healthId == "") {
      message.warning("Health ID Required");
    } else if (healthIdPassword == "") {
      message.warning("Password is required");
    } else {
      setProgress(20);
      axios
        .get(
          `${BASE_URL}/abdm/api/v1/phr/search/isExist?phrAddress=${healthId}`,
          {
            Authorization: `Bearer ${sessionStorage.getItem("BearerToken")}`,
          }
        )
        .then((res) => {
          console.log(res);
          if (res.data) {
            setProgress(100);
            message.warning("Health ID Already Exist");
          } else {
            setProgress(70);
            axios
              .post(
                `${BASE_URL}/abdm/api/v1/phr/registration/hid/create-phr-address`,
                {
                  Password: healthIdPassword,
                  transactionId: txnId,
                  phrAddress: healthId,
                }
              )
              .then((res) => {
                setProgress(100);
                console.log(res);
                handleHideCreateHealthIdModal();
                Modal.success({
                  title: "ABHA Address Created",
                  content: (
                    <>
                      <div>
                        Your ABHA Address :<b>{res.data.phrAdress}</b> is
                        successfuly created .
                      </div>
                    </>
                  ),
                  okText: "Finish",
                });
              })
              .catch((err) => {
                setProgress(100);
                console.log(err);
                message.warning(err.response.data.message);
              });
          }
        })
        .catch((err) => {
          setProgress(100);
          console.log(err);
          message.warning(err.response.data.message);
        });
    }
  };

  // Member's Form
  let [noOfMembersCompleted, setNoOfMembersComplted] = useState(1);
  const [activeTab, setActiveTab] = useState("1");
  const onKeyChange = (key) => {
    setActiveTab(key);
  };

  //Consent Modal State
  const [consentModalShow, setConsentModalShow] = useState(false);
  const [bloodSampleHome, setBloodSampleHome] = useState(false);
  const [bloodSampleCenter, setBloodSampleCenter] = useState(false);
  const [bloodSampleDenied, setBloodSampleDenied] = useState(false);

  const handleConsentModalShow = () => {
    setConsentModalShow(true);
  };
  const handleConsentModalClose = () => {
    setConsentModalShow(false);
  };

  const handleBloodSampleHomeSelct = () => {
    setBloodSampleHome(!bloodSampleHome);
    setBloodSampleCenter(false);
    setBloodSampleDenied(false);
  };
  const handleBloodSampleCenterSelect = () => {
    setBloodSampleHome(false);
    setBloodSampleCenter(!bloodSampleCenter);
    setBloodSampleDenied(false);
  };
  const handleBloodSampleDesiedSelect = () => {
    setBloodSampleHome(false);
    setBloodSampleCenter(false);
    setBloodSampleDenied(!bloodSampleDenied);
  };

  //Family Member field
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [abhaId, setAbhaId] = useState();
  const [abhaNumber, setAbhaNumber] = useState();
  const [pulse, setPulse] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [BMI, setBMI] = useState("");
  const [cbacScore, setCbacScore] = useState("");
  const [demandLetter, setDemandLetter] = useState("");

  const handleNameChange = (e) => {
    const regex = /^[ a-zA-Z]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setName(e.target.value);
    }
  };
  const handleAadharCardChange = (e) => {
    const regex = /^[0-9]{1,12}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setAadharCard(e.target.value);
    }
  };
  const handleAgeChange = (e) => {
    const regex = /^[0-9]{1,3}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setAge(e.target.value);
    }
  };
  const handleMobileNumberChange = (e) => {
    const regex = /^[0-9]{1,10}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
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

  const [ABHAIDSubmited, setABHAIDSubmited] = useState(false);
  const [mobileNumberLinkedWithABHAID, setMobileNumberLinkedWithABHAID] =
    useState();
  const handleABHAIDSubmit = () => {
    console.log("ABHA ID Submitted");
    setABHAIDSubmited(true);
  };
  // const ABHACARDDownloadInputContent = (
  //   <>
  //     <Form layout="vertical">
  //       <Form.Item label="Health ID">
  //         <InputForm type="text" placeholder="Enter ABHA ID"></InputForm>
  //       </Form.Item>
  //       {ABHAIDSubmited ? (
  //         <>
  //           {" "}
  //           <Form.Item label="OTP">
  //             <OtpInput
  //               inputStyle={{
  //                 width: "25px",
  //                 height: "25px",
  //                 margin: "2px 10px",
  //               }}
  //               value={otp}
  //               numInputs={6}
  //               type="number"
  //               onChange={(value) => setOtp(value)}
  //               renderSeparator={<span></span>}
  //               renderInput={(props) => <input {...props} />}
  //             ></OtpInput>
  //             <div
  //               style={{
  //                 display: "flex",
  //                 justifyContent: "flex-end",
  //                 margin: "10px 40px ",
  //               }}
  //             >
  //               <a onClick={handleABHAIDSubmit}>Resend OTP</a>
  //             </div>
  //           </Form.Item>
  //         </>
  //       ) : (
  //         <></>
  //       )}
  //       <div style={{ display: "flex", justifyContent: "end" }}>
  //         <ABHAIDSubmitButton onClick={handleABHAIDSubmit}>
  //           Submit
  //         </ABHAIDSubmitButton>
  //       </div>
  //     </Form>
  //   </>
  // );

  const handlePulseChange = (e) => {
    const regex = /^[0-9]{1,3}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPulse(e.target.value);
    }
  };

  const handleBloodPressureChange = (e) => {
    const regex = /^[0-9]{1,3}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setBloodPressure(e.target.value);
    }
  };
  const handleWeightChange = (e) => {
    const regex = /^[0-9]{1,3}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setWeight(e.target.value);
    }
  };

  const handleHeightChange = (e) => {
    const regex = /^[0-9]{1,3}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setHeight(e.target.value);
    }
  };
  const handleBMIChange = (e) => {
    const regex = /^[0-9]{1,1}$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setBMI(e.target.value);
    }
  };

  const handleDemandLetter = (file) => {
    console.log(file);
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log("called: ", reader);
      console.log(reader.result);
      setDemandLetter(reader.result);
    };
  };

  const handleFormSubmit = async () => {
    if (name === "") {
      message.warning("Please Enter Name");
    } else if (aadharCard === "") {
      message.warning("Please Enter Aadhar Card Number");
    } else if (gender === "") {
      message.warning("Please Mention Gender");
    } else if (age === "") {
      message.warning("Please Enter Age");
    } else if (abhaId === "") {
      message.warning("Please Enter Abha ID");
    } else {
      try {
        const [aadharResponse, abhaResponse] = await Promise.all([
          axios.get(
            `${BASE_URL}/healthworker/api/veirfyaadharCard/${aadharCard}`,
            axiosConfig
          ),
          axios.get(
            `${BASE_URL}/healthworker/api/verifyabhaId/${abhaId}`,
            axiosConfig
          ),
        ]);

        const adharNoStatus = aadharResponse.status;
        const abhaNoStatus = abhaResponse.status;

        console.log(adharNoStatus, "+", abhaNoStatus, "+", age);
        if (adharNoStatus === 401 && abhaNoStatus === 401) {
          LogOut();
        } else if (adharNoStatus === 200 && abhaNoStatus === 200 && age >= 60) {
          handleConsentModalShow();
        } else if (adharNoStatus === 200 && abhaNoStatus === 200) {
          handleSubmitAndNext();
        } else {
          message.warning("Not Submitted");
        }
      } catch (error) {
        message.warning(error.response.data.message);
      }
    }
  };

  // Part A question's state
  const [question1A, setQuestion1A] = useState([]);
  const [question2A, setQuestion2A] = useState([]);
  const [question3A, setQuestion3A] = useState([]);
  const [question4A, setQuestion4A] = useState([]);
  const [question5A, setQuestion5A] = useState([]);
  const [question6A, setQuestion6A] = useState([]);
  // Part B1 Question's state
  const [question1B1, setQuestion1B1] = useState([]);
  const [question2B1, setQuestion2B1] = useState([]);
  const [question3B1, setQuestion3B1] = useState([]);
  const [question4B1, setQuestion4B1] = useState([]);
  const [question5B1, setQuestion5B1] = useState([]);
  const [question6B1, setQuestion6B1] = useState([]);
  const [question7B1, setQuestion7B1] = useState([]);
  const [question8B1, setQuestion8B1] = useState([]);
  const [question9B1, setQuestion9B1] = useState([]);
  const [question10B1, setQuestion10B1] = useState([]);
  const [question11B1, setQuestion11B1] = useState([]);
  const [question12B1, setQuestion12B1] = useState([]);
  const [question13B1, setQuestion13B1] = useState([]);
  const [question14B1, setQuestion14B1] = useState([]);
  const [question15B1, setQuestion15B1] = useState([]);
  const [question16B1, setQuestion16B1] = useState([]);
  const [question17B1, setQuestion17B1] = useState([]);
  const [question18B1, setQuestion18B1] = useState([]);
  const [question19B1, setQuestion19B1] = useState([]);
  const [question20B1, setQuestion20B1] = useState([]);
  const [question21B1, setQuestion21B1] = useState([]);
  const [question22B1, setQuestion22B1] = useState([]);
  const [question23B1, setQuestion23B1] = useState([]);
  const [question24B1, setQuestion24B1] = useState([]);
  const [question25B1, setQuestion25B1] = useState([]);
  const [question26B1, setQuestion26B1] = useState([]);
  const [question27B1, setQuestion27B1] = useState([]);
  const [question28B1, setQuestion28B1] = useState([]);
  const [question29B1, setQuestion29B1] = useState([]);
  const [question30B1, setQuestion30B1] = useState([]);
  const [question31B1, setQuestion31B1] = useState([]);
  const [question32B1, setQuestion32B1] = useState([]);

  //B2
  const [question1B2, setQuestion1B2] = useState([]);
  const [question2B2, setQuestion2B2] = useState([]);
  const [question3B2, setQuestion3B2] = useState([]);
  const [question4B2, setQuestion4B2] = useState([]);
  const [question5B2, setQuestion5B2] = useState([]);
  const [question6B2, setQuestion6B2] = useState([]);
  const [question7B2, setQuestion7B2] = useState([]);

  //B3
  const [question1B3, setQuestion1B3] = useState([]);
  const [question2B3, setQuestion2B3] = useState([]);
  const [question3B3, setQuestion3B3] = useState([]);
  const [question4B3, setQuestion4B3] = useState([]);

  //Part D question's state
  const [question1D, setQuestion1D] = useState([]);
  const [question2D, setQuestion2D] = useState([]);

  //Part E question's state
  //E1
  const [doYouhaveFever, setDoYouHaveFever] = useState("no");
  const [doYouhaveFever1, setDoYouHaveFever1] = useState([]);
  const [doYouhaveFever2, setDoYouHaveFever2] = useState([]);
  const [doYouhaveFever3, setDoYouHaveFever3] = useState([]);
  const [doYouhaveFever4, setDoYouHaveFever4] = useState([]);
  const [doYouhaveFever5, setDoYouHaveFever5] = useState([]);
  const [doYouhaveFever6, setDoYouHaveFever6] = useState([]);
  //E2
  const [conjuctivitis, setConjuctivitis] = useState("no");
  const [conjuctivitis1, setConjuctivitis1] = useState([]);
  const [conjuctivitis2, setConjuctivitis2] = useState([]);
  const [conjuctivitis3, setConjuctivitis3] = useState([]);
  //E3
  const [leptospirosis, setLeptospirosis] = useState("no");
  const [leptospirosis1, setLeptospirosis1] = useState([]);
  const [leptospirosis2, setLeptospirosis2] = useState([]);

  //E4
  const [looseMotion, setLooseMotion] = useState("no");
  const [looseMotion1, setLooseMotion1] = useState([]);
  const [looseMotion2, setLooseMotion2] = useState([]);
  const [looseMotion3, setLooseMotion3] = useState([]);

  //E5
  const [hepatitis, setHepatitis] = useState("no");
  const [hepatitis1, setHepatitis1] = useState([]);

  //E6
  const [animalBitten, setAnimalBitten] = useState([]);

  //E7
  const [snakeBitten, setSnakeBitten] = useState([]);

  //E8
  const [leprosy, setLeprosy] = useState("");
  const [leprosy1, setLeprosy1] = useState([]);
  const [leprosy2, setLeprosy2] = useState([]);
  const [leprosy3, setLeprosy3] = useState([]);
  const [leprosy4, setLeprosy4] = useState([]);
  const [leprosy5, setLeprosy5] = useState([]);

  const handlePartAQuestion1 = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}A`);
    if (
      selectedValue === "50 and 50 below" ||
      selectedValue === "50 to 79 Years" ||
      selectedValue === "80 and 80 above"
    ) {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handlePartAQuestion2 = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}A`);
    if (
      selectedValue === "Used to consume in the past/ Sometimes now" ||
      selectedValue === "Daily"
    ) {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handlePartAQuestion3And6 = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}A`);
    if (selectedValue === "yes" || selectedValue === "no") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handlePartAQuestion4 = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}A`);
    if (
      selectedValue === "80 cm or less" ||
      selectedValue === "80-100 cm" ||
      selectedValue === "More than 100 cm"
    ) {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handlePartAQuestion5 = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}A`);
    if (
      selectedValue === "At least 150 minutes in a week" ||
      selectedValue === "Less than 150 minutes in a week"
    ) {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };

  const handleQuestionOfB1Part = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}B1`);
    if (selectedValue === "yes" || selectedValue === "no") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handleQuestionOfB2Part = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}B2`);
    if (selectedValue === "yes" || selectedValue === "no") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handleQuestionOfB3Part = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}B3`);
    if (selectedValue === "yes" || selectedValue === "no") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };

  const handlePartDQuestions = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}D`);
    if (
      selectedValue === "Not at all" ||
      selectedValue === "Several days" ||
      selectedValue === "More than half days" ||
      selectedValue === "Nearly every days"
    ) {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };

  const handleDoYouHaveFever = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setDoYouHaveFever${questionNumber}`);
    if (selectedValue === "yes" || selectedValue === "no") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };

  const handleConjuctivitis = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setConjuctivitis${questionNumber}`);
    if (selectedValue === "yes" || selectedValue === "no") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };

  const handleLeptospirosis = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setLeptospirosis${questionNumber}`);
    if (selectedValue === "yes" || selectedValue === "no") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handleLooseMotion = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setLooseMotion${questionNumber}`);
    if (selectedValue === "yes" || selectedValue === "no") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handleHepatitis = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setHepatitis${questionNumber}`);
    if (selectedValue === "yes" || selectedValue === "no") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handleAnimalBitten = (selectedValue) => {
    if (selectedValue === "yes" || selectedValue === "no") {
      setAnimalBitten([selectedValue]);
    } else {
      setAnimalBitten([]);
    }
  };
  const handleSnakeBitten = (selectedValue) => {
    const setQuestionFunction = eval(`setSnakeBitten`);
    if (selectedValue === "yes" || selectedValue === "no") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };

  const handleLeprosy = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setLeprosy${questionNumber}`);
    if (selectedValue === "yes" || selectedValue === "no") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };

  const [familyMembersArray, setFamilyMembersArray] = useState([]);

  const handleClearFamilyHead = () => {
    setFamilyHeadName("");
    setMobileNo("");
    setPlotNumber("");
    setAddressLine1("");
    setPinCode("");
    setTotalFamilyMembers("");
  };

  const handleClearGeneralPart = () => {
    setName("");
    setGender("");
    setAge("");
    setPhone("");
    setAadharCard("");
    setAbhaId("");
    setPulse("");
    setBloodPressure("");
    setWeight("");
    setHeight("");
    setBMI("");
  };

  const handleClearPartA = () => {
    setQuestion1A([]);
    setQuestion2A([]);
    setQuestion3A([]);
    setQuestion4A([]);
    setQuestion5A([]);
    setQuestion6A([]);
  };

  const handleClearPartB = () => {
    // setPartB1OptionsSelected([]);
    for (let questionNumber = 1; questionNumber <= 32; questionNumber++) {
      let setQuestionSelected = eval(`setQuestion${questionNumber}B1`);
      setQuestionSelected([]);
    }
    // setPartB2OptionSelected([]);

    for (let questionNumber = 1; questionNumber <= 7; questionNumber++) {
      let setQuestionSelected = eval(`setQuestion${questionNumber}B2`);
      setQuestionSelected([]);
    }
    // setPartB3OptionsSelected([]);
    for (let questionNumber = 1; questionNumber <= 4; questionNumber++) {
      let setQuestionSelected = eval(`setQuestion${questionNumber}B3`);
      setQuestionSelected([]);
    }
  };

  const handleClearPartC = () => {
    setPartC1OptionSelect([]);
    setPartC2OptionSelect([]);
  };

  const handleClearPartD = () => {
    setQuestion1D([]);
    setQuestion2D([]);
  };
  const handleClearPartE = () => {
    // setPartE1OptionSelect([]);
    for (let questionNumber = 1; questionNumber <= 6; questionNumber++) {
      let setQuestionSelected = eval(`setDoYouHaveFever${questionNumber}`);
      setQuestionSelected([]);
    }
    // setPartE2OptionSelect([]);
    for (let questionNumber = 1; questionNumber <= 3; questionNumber++) {
      let setQuestionSelected = eval(`setConjuctivitis${questionNumber}`);
      setQuestionSelected([]);
    }
    // setPartE3OptionSelect([]);
    for (let questionNumber = 1; questionNumber <= 2; questionNumber++) {
      let setQuestionSelected = eval(`setLeptospirosis${questionNumber}`);
      setQuestionSelected([]);
    }
    // setPartE4OptionSelect([]);
    for (let questionNumber = 1; questionNumber <= 3; questionNumber++) {
      let setQuestionSelected = eval(`setLooseMotion${questionNumber}`);
      setQuestionSelected([]);
    }
    // setPartE5OptionSelect([]);
    setHepatitis1([]);
    setAnimalBitten([]);
    setSnakeBitten([]);
    // setPartE8OptionSelect([]);
    for (let questionNumber = 1; questionNumber <= 5; questionNumber++) {
      let setQuestionSelected = eval(`setLeprosy${questionNumber}`);
      setQuestionSelected([]);
    }
    // setDoYouHaveFever("");
    // setConjuctivitis("");
    // setLooseMotion("");
    // setLeprosy("");
  };

  const handleSubmitAndNext = () => {
    if (age >= 60) {
      if (bloodSampleHome && demandLetter === "") {
        message.warning("Demand letter required");
      } else {
        if (bloodConsent || bloodSampleDenied) {
          if (partialSubmit) {
            familyMembersArray.push(memberData);
            handleSubmit();
          } else if (totalFamilyMembers - noOfMembersCompleted > 0) {
            familyMembersArray.push(memberData);
            handleClearPartA();
            handleClearPartB();
            handleClearPartC();
            handleClearPartD();
            handleClearPartE();
            onKeyChange("1");
            handleClearGeneralPart();
            setNoOfMembersComplted(noOfMembersCompleted + 1);
          } else {
            familyMembersArray.push(memberData);
            handleSubmit();
          }
          handleConsentModalClose();
        } else {
          message.warning("Blood Sample Collection Consent Required");
        }
      }
    } else {
      if (partialSubmit) {
        familyMembersArray.push(memberData);
        handleSubmit();
      } else if (totalFamilyMembers - noOfMembersCompleted > 0) {
        familyMembersArray.push(memberData);
        handleClearPartA();
        handleClearPartB();
        handleClearPartC();
        handleClearPartD();
        handleClearPartE();
        onKeyChange("1");
        handleClearGeneralPart();
        setNoOfMembersComplted(noOfMembersCompleted + 1);
      } else {
        familyMembersArray.push(memberData);
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    const Data = {
      ward_name: sessionStorage.getItem("ward"),
      healthPost: sessionStorage.getItem("healthPostName"),
      area: section,
      name: familyHeadName,
      mobileNo: mobileNo,
      plotNo: plotNumber,
      address: addressLine1,
      pincode: pincode,
      totalFamilyMembers: totalFamilyMembers,
      partialSubmit: partialSubmit,
      familyMembers_details: familyMembersArray,
    };
    console.log(Data);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("Token")}`,
      },
    };
    console.log(axiosConfig);
    console.log(Data);
    axios
      .post(`${BASE_URL}/healthworker/api/PostSurveyForm`, Data, axiosConfig)
      .then((response) => {
        console.log(response);
        message.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        familyMembersArray.pop();
        message.warning(error.response.data.message);
      });
  };

  const handlePartialSelect = (e) => {
    setPartialSubmit(e.target.checked);
  };

  // const partB1Options = [
  //   "Shortness_of_breath_difficulty_breathing",
  //   "Coughing_more_than__weeks",
  //   "Blood_in_sputum",
  //   "Fever_for_more_than__weeks",
  //   "Weight_loss",
  //   "Night_sweats",
  //   "Are_you_currently_taking_medicines_to_treat_TB",
  //   "Is_any_family_member_currently_suffering_from_TB_disease",
  //   "A_history_of_TB_disease",
  //   "Frequent_bruising_of_hands_and_soles_of_feet",
  //   "Frequent_tingling_in_palms_of_hands_and_feet",
  //   "Blurred_and_blurred_vision",
  //   "Difficulty_in_reading",
  //   "Relapse_of_eye_pain_for_more_than_a_week",
  //   "Eye_redness_for_more_than_a_week",
  //   "You_have_trouble_hearing",
  //   "History_of_Feetka",
  //   "Difficulty_opening_the_mouth",
  //   "Nonhealing_of_mouth_sores_for_more_than_two_weeks",
  //   "Nonhealing_growth_in_mouth_for_more_than_two_weeks",
  //   "Nonhealing_white_or_red_sores_in_the_mouth_for_more_than_two_weeks",
  //   "Pain_while_chewing",
  //   "Change_in_voice",
  //   "Lightcolored_patches_or_spots_in_the_mouth_with_no_sensation",
  //   "Thickening_of_the_skin_in_any_part_of_the_body",
  //   "Lumps_on_any_part_of_the_body",
  //   "Frequent_numbness_of_the_palms_of_the_hands_and_feet",
  //   "Crooked_fingers_and_toes",
  //   "Tingling_and_numbness_in_hands_and_feet",
  //   "Incomplete_closure_of_the_eyelids",
  //   "Difficulty_grasping_objects_properly_in_the_hands",
  //   "Difficulty_walking_due_to_weakness_in_legs",
  // ];

  // const [partB1OptionsSelected, setPartB1OptionsSelected] = useState([]);
  // const handlePartB1select = (option) => {
  //   if (partB1OptionsSelected.includes(option)) {
  //     setPartB1OptionsSelected(
  //       partB1OptionsSelected.filter((item) => item !== option)
  //     );
  //   } else {
  //     setPartB1OptionsSelected([...partB1OptionsSelected, option]);
  //   }
  // };

  // const partB2Options = [
  //   "Lump_in_the_breast",
  //   "Blood_stained_discharge_from_the_nipple",
  //   "Change_in_shape_and_size_of_breast",
  //   "Bleeding_between_periods",
  //   "Bleeding_after_menopause",
  //   "Bleeding_after_intercourse",
  //   "Foul_smelling_vaginal_discharge",
  // ];
  // const [partB2OptionSelected, setPartB2OptionSelected] = useState([]);
  // const handlePartB2Select = (option) => {
  //   if (partB2OptionSelected.includes(option)) {
  //     setPartB2OptionSelected(
  //       partB2OptionSelected.filter((item) => item !== option)
  //     );
  //   } else {
  //     setPartB2OptionSelected([...partB2OptionSelected, option]);
  //   }
  // };

  // const partB3Options = [
  //   "Do_you_feel_unsteady_while_standing_or_walking",
  //   "Impairment_of_movement_if_suffering_from_physical_disability",
  //   "Do_you_need_help_from_others_to_perform_daily_activities_such_as_eating_dressing_dressing_bathing_walking_or_using_the_toilet",
  //   "Forgetting_your_home_address_or_household_names",
  // ];
  // const [partB3OptionsSelected, setPartB3OptionsSelected] = useState([]);
  // const handlePartB3Select = (option) => {
  //   if (partB3OptionsSelected.includes(option)) {
  //     setPartB3OptionsSelected(
  //       partB3OptionsSelected.filter((item) => item !== option)
  //     );
  //   } else {
  //     setPartB3OptionsSelected([...partB3OptionsSelected, option]);
  //   }
  // };

  const partC1Options = [
    "Firewood",
    "Crop Residue",
    "Cow dung cake",
    "Coal",
    "Kerosene",
    "LPG",
  ];

  const [partC1OptionSelect, setPartC1OptionSelect] = useState([]);
  const handlePartC1Select = (option) => {
    if (partC1OptionSelect.includes(option)) {
      setPartC1OptionSelect(
        partC1OptionSelect.filter((item) => item !== option)
      );
    } else {
      setPartC1OptionSelect([...partC1OptionSelect, option]);
    }
  };

  const partC2Options = [
    "Crop residue burning",
    "burning of garbage - leaves",
    "working in industries with smoke, gas and dust exposure such as brick kilns and glass factories etc.",
  ];
  const [partC2OptionSelect, setPartC2OptionSelect] = useState([]);
  const handlePartC2Select = (option) => {
    if (partC2OptionSelect.includes(option)) {
      setPartC2OptionSelect(
        partC2OptionSelect.filter((item) => item !== option)
      );
    } else {
      setPartC2OptionSelect([...partC2OptionSelect, option]);
    }
  };

  const partE1Options = [
    "More than 7 days",
    "Less than 7 days",
    "With Chills",
    "With Rash",
    "With Bleeding",
    "With Altered Sensorium",
  ];
  const [partE1OptionSelect, setPartE1OptionSelect] = useState([]);
  const handlePartE1Select = (option) => {
    if (partE1OptionSelect.includes(option)) {
      setPartE1OptionSelect(
        partE1OptionSelect.filter((item) => item !== option)
      );
    } else {
      setPartE1OptionSelect([...partE1OptionSelect, option]);
    }
  };

  const partE2Options = ["Watery", "Redness", "Itching eyes"];
  const [partE2OptionSelect, setPartE2OptionSelect] = useState([]);
  const handlePartE2Select = (option) => {
    if (partE2OptionSelect.includes(option)) {
      setPartE2OptionSelect(
        partE2OptionSelect.filter((item) => item !== option)
      );
    } else {
      setPartE2OptionSelect([...partE2OptionSelect, option]);
    }
  };

  const partE3Options = [
    "Waddling in water",
    "Exposure to domestic animal like cattle / Dog / Cat / Pig / Rodent",
  ];
  const [partE3OptionSelect, setPartE3OptionSelect] = useState([]);
  const handlePartE3Select = (option) => {
    if (partE3OptionSelect.includes(option)) {
      setPartE3OptionSelect(
        partE3OptionSelect.filter((item) => item !== option)
      );
    } else {
      setPartE3OptionSelect([...partE3OptionSelect, option]);
    }
  };

  const partE4Options = ["With Blood", "Without Blood", "Vomiting"];
  const [partE4OptionSelect, setPartE4OptionSelect] = useState([]);
  const handlePartE4Select = (option) => {
    if (partE4OptionSelect.includes(option)) {
      setPartE4OptionSelect(
        partE4OptionSelect.filter((item) => item !== option)
      );
    } else {
      setPartE4OptionSelect([...partE4OptionSelect, option]);
    }
  };
  const partE5Option = [
    "Eating outside / uncovered food / drinking contaminated water",
  ];
  const [partE5OptionSelect, setPartE5OptionSelect] = useState([]);
  const handlePartE5Select = (option) => {
    if (partE5OptionSelect.includes(option)) {
      setPartE5OptionSelect(
        partE5OptionSelect.filter((item) => item !== option)
      );
    } else {
      setPartE5OptionSelect([...partE5OptionSelect, option]);
    }
  };

  const partE8Options = [
    "Numbness / Tingling in hands/ feet",
    "Loss of sensation in any parts of body",
    "Swelling / Nodule on Face/Hands/ Feet",
    "Loss of eyelash or eyebrow",
    "Thickened earlobes",
  ];
  const [partE8OptionSelect, setPartE8OptionSelect] = useState([]);
  const handlePartE8Select = (option) => {
    if (partE8OptionSelect.includes(option)) {
      setPartE8OptionSelect(
        partE8OptionSelect.filter((item) => item !== option)
      );
    } else {
      setPartE8OptionSelect([...partE8OptionSelect, option]);
    }
  };

  const memberData = {
    area: section,
    name: name,
    gender: gender,
    age: age,
    mobileNo: phone,
    aadharAndAbhaConsent: "true",
    aadharCard: aadharCard,
    abhaId: abhaId,
    pulse: pulse,
    bloodPressure: bloodPressure,
    weight: weight,
    height: height,
    BMI: BMI,
    Questionnaire: {
      part_a: [
        {
          question: "What_is_your_age_completeyears",
          answer: question1A,
        },
        {
          question:
            "Do_you_smoke_or_consume_smokeless_products_such_as_gutka_or_khaini",
          answer: question2A,
        },
        {
          question: "Do_you_consume_alcohol_daily",
          answer: question3A,
        },
        {
          question: "Measurement_of_waist_in_cm",
          answer: question4A,
        },
        {
          question:
            "Do_you_undertake_any_physical_activities_for_minimum_of__minutes_in_a_week",
          answer: question5A,
        },
        {
          question:
            "Do_you_have_a_family_history_any_one_of_your_parents_or_siblings_of_high_blood_pressure_diabetes_and_heart_disease",
          answer: question6A,
        },
      ],
      part_b: [
        // {
        //   qkey: "B_Women_and_Men",
        //   type: "MCQ",
        //   score: "",
        //   options: partB1Options,
        //   translate: [],
        //   selectedOptions: partB1OptionsSelected,
        // },
        // {
        //   qkey: "B_Women_only",
        //   type: "MCQ",
        //   score: "",
        //   options: partB2Options,
        //   translate: [],
        //   selectedOptions: partB2OptionSelected,
        // },
        // {
        //   qkey: "BFor_Senior_Citizens__years_and_above",
        //   type: "MCQ",
        //   score: "",
        //   options: partB3Options,
        //   translate: [],
        //   selectedOptions: partB3OptionsSelected,
        // },
        {
          question: "Shortness_of_breath_difficulty_breathing",
          answer: question1B1,
        },
        {
          question: "Coughing_more_than__weeks",
          answer: question2B1,
        },
        {
          question: "Blood_in_sputum",
          answer: question3B1,
        },
        {
          question: "Fever_for_more_than__weeks",
          answer: question4B1,
        },
        {
          question: "Weight_loss",
          answer: question5B1,
        },
        {
          question: "Night_sweats",
          answer: question6B1,
        },
        {
          question: "Are_you_currently_taking_medicines_to_treat_TB",
          answer: question7B1,
        },
        {
          question: "Is_any_family_member_currently_suffering_from_TB_disease",
          answer: question8B1,
        },
        {
          question: "A_history_of_TB_disease",
          answer: question9B1,
        },
        {
          question: "Frequent_bruising_of_hands_and_soles_of_feet",
          answer: question10B1,
        },
        {
          question: "Frequent_tingling_in_palms_of_hands_and_feet",
          answer: question11B1,
        },
        {
          question: "Blurred_and_blurred_vision",
          answer: question12B1,
        },
        {
          question: "Difficulty_in_reading",
          answer: question13B1,
        },
        {
          question: "Relapse_of_eye_pain_for_more_than_a_week",
          answer: question14B1,
        },
        {
          question: "Eye_redness_for_more_than_a_week",
          answer: question15B1,
        },
        {
          question: "You_have_trouble_hearing",
          answer: question16B1,
        },
        {
          question: "History_of_Feetka",
          answer: question17B1,
        },
        {
          question: "Difficulty_opening_the_mouth",
          answer: question18B1,
        },
        {
          question: "Nonhealing_of_mouth_sores_for_more_than_two_weeks",
          answer: question19B1,
        },
        {
          question: "Nonhealing_growth_in_mouth_for_more_than_two_weeks",
          answer: question20B1,
        },
        {
          question:
            "Nonhealing_white_or_red_sores_in_the_mouth_for_more_than_two_weeks",
          answer: question21B1,
        },
        {
          question: "Pain_while_chewing",
          answer: question22B1,
        },
        {
          question: "Change_in_voice",
          answer: question23B1,
        },
        {
          question:
            "Lightcolored_patches_or_spots_in_the_mouth_with_no_sensation",
          answer: question24B1,
        },
        {
          question: "Thickening_of_the_skin_in_any_part_of_the_body",
          answer: question25B1,
        },
        {
          question: "Lumps_on_any_part_of_the_body",
          answer: question26B1,
        },
        {
          question: "Frequent_numbness_of_the_palms_of_the_hands_and_feet",
          answer: question27B1,
        },
        {
          question: "Crooked_fingers_and_toes",
          answer: question28B1,
        },
        {
          question: "Tingling_and_numbness_in_hands_and_feet",
          answer: question29B1,
        },
        {
          question: "Incomplete_closure_of_the_eyelids",
          answer: question30B1,
        },
        {
          question: "Difficulty_grasping_objects_properly_in_the_hands",
          answer: question31B1,
        },
        {
          question: "Difficulty_walking_due_to_weakness_in_legs",
          answer: question32B1,
        },
        {
          question: "Lump_in_the_breast",
          answer: question1B2,
        },
        {
          question: "Blood_stained_discharge_from_the_nipple",
          answer: question2B2,
        },
        {
          question: "Change_in_shape_and_size_of_breast",
          answer: question3B2,
        },
        {
          question: "Bleeding_between_periods",
          answer: question4B2,
        },
        {
          question: "Bleeding_after_menopause",
          answer: question5B2,
        },
        {
          question: "Bleeding_after_intercourse",
          answer: question6B2,
        },
        {
          question: "Foul_smelling_vaginal_discharge",
          answer: question7B2,
        },
        {
          question: "Do_you_feel_unsteady_while_standing_or_walking",
          answer: question1B3,
        },
        {
          question:
            "Impairment_of_movement_if_suffering_from_physical_disability",
          answer: question2B3,
        },
        {
          question:
            "Do_you_need_help_from_others_to_perform_daily_activities_such_as_eating_dressing_dressing_bathing_walking_or_using_the_toilet",
          answer: question3B3,
        },
        {
          question: "Forgetting_your_home_address_or_household_names",
          answer: question4B3,
        },
      ],
      part_c: [
        // {
        //   qkey: "Type_of_Fuel_used_for_cooking",
        //   type: "MCQ",
        //   score: "",
        //   options: partC1Options,
        //   translate: [
        //     "Firewood",
        //     "Crop_Residue",
        //     "Cow_dung_cake",
        //     "Coal",
        //     "Kerosene",
        //     "LPG",
        //   ],
        //   selectedOptions: partC1OptionSelect,
        // },
        // {
        //   qkey: "Occupational_exposure",
        //   type: "MCQ",
        //   score: "",
        //   options: partC2Options,
        //   translate: [
        //     "Crop_residue_burning",
        //     "burning_of_garbage_leaves",
        //     "working_in_industries_with_smoke_gas_and_dust_exposure_such_as_brick_kilns_and_glass_factories_etc",
        //   ],
        //   selectedOptions: partC2OptionSelect,
        // },
        {
          question: "Type_of_Fuel_used_for_cooking",
          answer: partC1OptionSelect,
        },
        {
          question: "Occupational_exposure",
          answer: partC2OptionSelect,
        },
      ],
      part_d: [
        // {
        //   qkey: "Little_interest_of_pleasure_in_doing_things",
        //   type: "CO",
        //   score: "",
        //   options: [
        //     "Not at all",
        //     "Several days",
        //     "More than half days",
        //     "Nearly every days",
        //   ],
        //   translate: [
        //     "Not_at_all",
        //     "Several_days",
        //     "More_than_half_days",
        //     "Nearly_every_days",
        //   ],
        //   selectedOption: [question1D],
        // },
        // {
        //   qkey: "Feeling_down_depressed_or_hopeless",
        //   type: "CO",
        //   score: "",
        //   options: [
        //     "Not at all",
        //     "Several days",
        //     "More than half days",
        //     "Nearly every days",
        //   ],
        //   translate: [
        //     "Not_at_all",
        //     "Several_days",
        //     "More_than_half_days",
        //     "Nearly_every_days",
        //   ],
        //   selectedOptions: [question2D],
        // },
        {
          question: "Little_interest_of_pleasure_in_doing_things",
          answer: question1D,
        },
        {
          question: "Feeling_down_depressed_or_hopeless",
          answer: question2D,
        },
      ],
      part_e: [
        // {
        //   qkey: "Fever",
        //   type: "MCQ",
        //   score: "",
        //   options: partE1Options,
        //   translate: [
        //     "More_than__days",
        //     "Less_than__days",
        //     "With_Chills",
        //     "With_Rash",
        //     "with_Bleeding",
        //     "with_Altered_Sensorium",
        //   ],
        //   selectedOptions: partE1OptionSelect,
        // },
        // {
        //   qkey: "Conjuctivitis",
        //   type: "MCQ",
        //   score: "",
        //   options: partE2Options,
        //   translate: ["watery", "redness", "itching_eyes"],
        //   selectedOptions: partE2OptionSelect,
        // },
        // {
        //   qkey: "Lepto",
        //   type: "MCQ",
        //   score: "",
        //   options: partE3Options,
        //   translate: [
        //     "Waddling_in_water",
        //     "Exposure_to_domestic_animal_like_cattle__Dog__Cat__Pig__Rodent",
        //   ],
        //   selectedOptions: partE3OptionSelect,
        // },
        // {
        //   qkey: "Loose_Motion",
        //   type: "MCQ",
        //   score: "",
        //   options: partE4Options,
        //   translate: ["With_Blood", "Without_Blood", "Vomitting "],
        //   selectedOptions: partE4OptionSelect,
        // },
        // {
        //   qkey: "Hepatitis__Jaundice",
        //   type: "MCQ",
        //   score: "",
        //   options: partE5Option,
        //   translate: [
        //     "Eating_outside__uncovered_food__drinking_contaminated_water",
        //   ],
        //   selectedOptions: partE5OptionSelect,
        // },
        // {
        //   qkey: "Animal_Bite",
        //   type: "MCQ",
        //   score: "",
        //   options: ["Animal Bite"],
        //   translate: ["Animal_Bite"],
        //   selectedOptions: [animalBitten],
        // },
        // {
        //   qkey: "Snake_Bite",
        //   type: "MCQ",
        //   score: "",
        //   options: ["Snake Bite"],
        //   translate: ["Snake_Bite"],
        //   selectedOptions: [snakeBitten],
        // },
        // {
        //   qkey: "Leprosy",
        //   type: "MCQ",
        //   score: "",
        //   options: partE8Options,
        //   translate: [
        //     "Numbness__Tingling_in_handsfeet",
        //     "Loss_of_sensation_in_any_parts_of_body",
        //     "Swelling__Nodule_on_FaceHandsFeet",
        //     "Loss_of_eyelash_or_eyebrow",
        //     "Thickened_earlobes",
        //   ],
        //   selectedOptions: partE8OptionSelect,
        // },
        {
          question: "More_than__days",
          answer: doYouhaveFever1,
        },
        {
          question: "Less_than__days",
          answer: doYouhaveFever2,
        },
        {
          question: "With_Chills",
          answer: doYouhaveFever3,
        },
        {
          question: "With_Rash",
          answer: doYouhaveFever4,
        },
        {
          question: "with_Bleeding",
          answer: doYouhaveFever5,
        },
        {
          question: "with_Altered_Sensorium",
          answer: doYouhaveFever6,
        },
        {
          question: "watery",
          answer: conjuctivitis1,
        },
        {
          question: "redness",
          answer: conjuctivitis2,
        },
        {
          question: "itching_eyes",
          answer: conjuctivitis3,
        },
        {
          question: "Waddling_in_water",
          answer: leptospirosis1,
        },
        {
          question:
            "Exposure_to_domestic_animal_like_cattle__Dog__Cat__Pig__Rodent",
          answer: leptospirosis2,
        },
        {
          question: "With_Blood",
          answer: looseMotion1,
        },
        {
          question: "Without_Blood",
          answer: looseMotion2,
        },
        {
          question: "Vomitting",
          answer: looseMotion3,
        },
        {
          question:
            "Eating_outside__uncovered_food__drinking_contaminated_water",
          answer: hepatitis1,
        },
        {
          question: "Animal_Bite",
          answer: animalBitten,
        },
        {
          question: "Snake_Bite",
          answer: snakeBitten,
        },
        {
          question: "Numbness__Tingling_in_handsfeet",
          answer: leprosy1,
        },
        {
          question: "Loss_of_sensation_in_any_parts_of_body",
          answer: leprosy2,
        },
        {
          question: "Swelling__Nodule_on_FaceHandsFeet",
          answer: leprosy3,
        },
        {
          question: "Loss_of_eyelash_or_eyebrow",
          answer: leprosy4,
        },
        {
          question: "Thickened_earlobes",
          answer: leprosy5,
        },
      ],
    },
    bloodConsent: bloodConsent,
    bloodCollectionLocation:
      age > 60
        ? bloodSampleHome
          ? "Home"
          : bloodSampleCenter
          ? "Center"
          : bloodSampleDenied
          ? "Denied"
          : ""
        : "",
    demandLetter: demandLetter,
  };

  return familyHeadRegister == "no" ? (
    <>
      <FormHeader>
        Family Head/ कुटुंब प्रमुख{" "}
        <SelectWardButton
          style={{ marginLeft: "75%" }}
          onClick={() => setShowModal(true)}
        >
          Select Ward
        </SelectWardButton>
      </FormHeader>
      <FormContainer layout="vertical">
        <Row>
          <Column>
            <FormItem
              label="Name / नाव"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "First Name is required / प्रथम नाव आवश्यक आहे",
                },
                {
                  pattern: /^[a-z,A-Z ]*$/,
                  message:
                    "Only alphabetic characters and spaces allowed / केवळ वर्णमाला वर्ण आणि रिक्त स्थानांना अनुमती आहे",
                },
              ]}
            >
              <Input
                type="text"
                name="firstName"
                value={familyHeadName}
                onChange={(e) => setFamilyHeadName(e.target.value)}
              ></Input>
            </FormItem>
          </Column>
          <Column>
            <FormItem
              label="Mobile Number/ मोबाईल नंबर"
              name="mobile number"
              rules={[
                { required: true },
                {
                  pattern: /^[0-9,+]*$/,
                  message:
                    "Only numerics value allowed / केवळ अंकीय मूल्याला अनुमती आहे",
                },
                {
                  max: 10,
                  message: "Mobile Number can not be longer than 10 digits",
                },
                {
                  min: 10,
                  message: "Mobile Number can not be shorter than 10 digits",
                },
              ]}
            >
              <Input
                type="text"
                value={mobileNo}
                name="mobile number"
                maxLength={10}
                placeholder="+91"
                // defaultValue="+91"
                onChange={(e) => setMobileNo(e.target.value)}
              ></Input>
            </FormItem>
          </Column>
          <Column>
            <FormItem label="Plot Number / Flat Number / प्लॉट क्रमांक / फ्लॅट क्रमांक ">
              <Input
                type="text"
                value={plotNumber}
                onChange={(e) => setPlotNumber(e.target.value)}
              ></Input>
            </FormItem>
          </Column>
        </Row>

        <Row>
          <Column>
            <FormItem
              label="Address / पत्ता"
              name="address"
              rules={[{ required: "true", message: "Please Enter Address" }]}
            >
              <TextArea
                value={addressLine1}
                name="address"
                onChange={(e) => setAddressLine1(e.target.value)}
              ></TextArea>
            </FormItem>
          </Column>
          <Column>
            <FormItem
              label="Pin Code / पिन कोड"
              name="pinCode"
              rules={[
                {
                  pattern: /^[0-9]*$/,
                  message:
                    "Only numerics value allowed / केवळ अंकीय मूल्याला अनुमती आहे",
                },
                { max: 6, message: "Pin code can not be longer than 6 digit" },
                { min: 6, message: "Pin code can not be shorter than 6 digit" },
                { required: "true", message: "Please Enter Pin Code" },
              ]}
            >
              <Input
                type="text"
                name="pinCode"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPinCode(e.target.value)}
              ></Input>
            </FormItem>
          </Column>
          <Column>
            <FormItem label="Number of family members/ कुटुंबातील सदस्यांची संख्या">
              <Input
                type="text"
                value={totalFamilyMembers}
                onChange={(e) => handleFamilyMembers(e)}
              ></Input>
            </FormItem>
          </Column>
        </Row>
        <SubmitButtonDiv>
          <SubmitButton
            htmlType="submit"
            onClick={() => handleFamilyHeadSubmit()}
          >
            Next
          </SubmitButton>
        </SubmitButtonDiv>
      </FormContainer>

      <Modal
        open={showModal}
        onCancel={handleShowModalClose}
        title="Municipal Corporation Of Greater Mumbai / बृहन्मुंबई महानगरपालिका"
        footer={
          <>
            <Button onClick={() => handleShowModalClose()}>Cancel</Button>
            <SubmitButton
              htmlType="submit"
              onClick={() => handleWardSelectionModal()}
            >
              Submit
            </SubmitButton>
          </>
        }
      >
        <div>
          <Form layout="vertical">
            <ModalFormItem label="Ward / प्रभाग ">
              <Input value={sessionStorage.getItem("ward")}></Input>
            </ModalFormItem>
            <ModalFormItem label="Health Post / आरोग्य पोस्ट ">
              <Input value={sessionStorage.getItem("healthPostName")}></Input>
            </ModalFormItem>
            <ModalFormItem label="Select Area/ क्षेत्र निवडा" required>
              <Select
                value={section}
                showSearch
                filterOption={(inputValue, option) =>
                  option.children
                    ? option.children
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    : false
                }
                onChange={(value) => handleSectionSelect(value)}
              >
                {healthPostAreas.map((data) => (
                  <Option key={data.id} value={data.id}>
                    {data.areas}
                  </Option>
                ))}
              </Select>
            </ModalFormItem>
          </Form>
        </div>
      </Modal>
    </>
  ) : (
    <>
      <LoadingBar
        progress={progress}
        color="#FF5B22"
        size="lg"
        onLoaderFinished={() => setProgress(0)}
      ></LoadingBar>
      <Spin tip="Loading..." spinning={loading}>
        <Container>
          <FormHeader>
            1.Family Member {noOfMembersCompleted} out of {totalFamilyMembers}/
            कुटुंबातील सदस्य
            {totalFamilyMembers} पैकी {noOfMembersCompleted}
          </FormHeader>

          <FormContainer layout="vertical">
            <Row>
              <Column>
                {/* rules={[{required:true ,message:"name required / नाव आवश्यक आहे"},{pattern:/^[a-z A-Z]*$/ ,message:"Only alphabetic characters and spaces allowed / केवळ वर्णमाला वर्ण आणि रिक्त स्थानांना अनुमती आहे"}]} */}
                <FormItem label="Name /  नाव" required>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                    pattern="[a-zA-Z]+"
                    allowClear
                  ></Input>
                </FormItem>
              </Column>
              <Column>
                {/* rules={[{required:true ,message:"aadhar number required / आधार क्रमांक आवश्यक आहे"},{pattern:/^[0-9]*$/ ,message:"Only numerics value allowed / केवळ अंकीय मूल्याला अनुमती आहे"}]} */}
                <FormItem label="Aadhar Card Number/ आधार क्रमांक">
                  <Input
                    type="text"
                    value={aadharCard}
                    maxLength={12}
                    allowClear
                    onChange={(e) => handleAadharCardChange(e)}
                  ></Input>
                </FormItem>
              </Column>
              <Column>
                {/* rules={[{required:true ,message:"Gender mention is must / लिंग नमूद करणे आवश्यक आहे"}]} */}
                <FormItem label="Gender / लिंग" required>
                  <Select onChange={(value) => setGender(value)} value={gender}>
                    <Option value="male">Male / पुरुष</Option>
                    <Option value="female">Female / स्त्री</Option>
                    <Option value="transgender">Transgender/समलैंगिक</Option>
                  </Select>
                </FormItem>
              </Column>
            </Row>

            <Row>
              <Column span={8}>
                {/*  rules={[{required:true ,message:"Age mention required / वय नमूद करणे आवश्यक आहे"}]} */}
                <FormItem label="Age / वय" required>
                  <Input
                    type="number"
                    value={age}
                    allowClear
                    onChange={(e) => handleAgeChange(e)}
                  ></Input>
                </FormItem>
              </Column>
              <Column span={8}>
                <FormItem
                  label="Mobile Number / मोबाईल नंबर"
                  rules={[
                    {
                      pattern: /^[0-9+]*$/,
                      message:
                        "Mobile number must be numeric / मोबाईल क्रमांक अंकीय असणे आवश्यक आहे",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => handleMobileNumberChange(e)}
                  ></Input>
                </FormItem>
              </Column>
              <Column span={8}>
                <FormItem label="Abha ID / आभा आयडी">
                  <Input
                    type="text"
                    value={abhaId}
                    maxLength={17}
                    onChange={(e) => handleAbhaIDChange(e)}
                  ></Input>
                </FormItem>
                <p style={{ margin: "-20px 50px 15px", fontSize: "14px" }}>
                  If you don't have ABHA ID?
                  <a onClick={() => handleShowAadharOtpLinkedModal()}>
                    Click here
                  </a>
                </p>
              </Column>
              {/* <Column span={1}>
                <Tooltip title="ABHA Card Download">
                  <Popover
                    content={ABHACARDDownloadInputContent}
                    trigger="click"
                    placement="left"
                  >
                    <ABHACardDownLoad icon={faFileArrowDown} />
                  </Popover>
                </Tooltip>
              </Column> */}
            </Row>

            <Row>
              <Column>
                <FormItem label="Pulse / नाडी">
                  <Input
                    type="text"
                    value={pulse}
                    onChange={(e) => handlePulseChange(e)}
                  ></Input>
                </FormItem>
              </Column>
              <Column>
                <FormItem label="Blood Pressure / रक्तदाब">
                  <Input
                    type="text"
                    value={bloodPressure}
                    onChange={(e) => handleBloodPressureChange(e)}
                  ></Input>
                </FormItem>
              </Column>
              <Column>
                <FormItem label="Weight / वजन">
                  <Input
                    type="text"
                    value={weight}
                    onChange={(e) => handleWeightChange(e)}
                  ></Input>
                </FormItem>
              </Column>
            </Row>
            <Row>
              <Column>
                <FormItem label="Height / उंची">
                  <Input
                    type="text"
                    value={height}
                    onChange={(e) => handleHeightChange(e)}
                  ></Input>
                </FormItem>
              </Column>
              <Column>
                <FormItem label="BMI">
                  <Input
                    type="text"
                    value={BMI}
                    onChange={(e) => handleBMIChange(e)}
                  ></Input>
                </FormItem>
              </Column>
            </Row>
          </FormContainer>
        </Container>

        {age <= 30 ? (
          <>
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginRight: "10%",
              }}
            >
              <Checkbox onChange={(e) => handlePartialSelect(e)}></Checkbox>
              <h4 style={{ marginLeft: "10px" }}>Partial Submit</h4>
            </div>
          </>
        ) : (
          <></>
        )}
        {age <= 30 ? (
          <SubmitButtonDiv>
            <SubmitButton onClick={handleFormSubmit}>
              {noOfMembersCompleted == totalFamilyMembers || partialSubmit
                ? "Submit"
                : "Submit & Next"}
            </SubmitButton>
          </SubmitButtonDiv>
        ) : (
          <DocsTab
            centered
            defaultActiveKey="1"
            activeKey={activeTab}
            onChange={onKeyChange}
          >
            <Tabs.TabPane tab="1) Part A /भाग अ" key="1">
              <FormHeader> A. Risk assessment/जोखमीचे मुल्यांकन</FormHeader>

              <QuestionRow>
                <QuestionCol>
                  १. आपले वय काय आहे ? (पूर्ण वर्षात) / what is your age (in
                  full year)
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handlePartAQuestion1(1, e.target.value)}
                    value={question1A[0]}
                  >
                    <Radio value="50 and 50 below">
                      50 and 50 below / 50 आणि 50 खाली
                    </Radio>
                    <br />
                    <Radio value="50 to 79 Years">
                      50 to 79 Years / 50 ते 79 वर्षे
                    </Radio>
                    <br />
                    <Radio value="80 and 80 above">
                      80 and 80 above / 80 आणि 80 वर
                    </Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  २. तुम्ही धूम्रपान किंवा धूर रहित उत्पादने जसे गुटखा व
                  खैनीसारख्या वापर करता ? / Do you smoke or smokeless products
                  like gutkha and Use like Khaini?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handlePartAQuestion2(2, e.target.value)}
                    value={question2A[0]}
                  >
                    <Radio value="never">Never / कधीच नाही</Radio>
                    <br />
                    <Radio value="Used to consume in the past/ Sometimes now">
                      Used to consume in the past/ Sometimes now /<br /> पूर्वी
                      करायचो/ कधी कधी आता
                    </Radio>
                    <br />
                    <Radio value="Daily">Daily / दररोज</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ३. तुम्ही दररोज मद्यपान करता ? / Do you drink alcohol every
                  day?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) =>
                      handlePartAQuestion3And6(3, e.target.value)
                    }
                    value={question3A[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ४. कंबरेचा घेर (सेमी मध्ये) / Waist circumference (in cm)
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handlePartAQuestion4(4, e.target.value)}
                    value={question4A[0]}
                  >
                    <Radio value="80 cm or less">
                      80 cm or less/80 सेमी किंवा कमी
                    </Radio>
                    <br />
                    <Radio value="80-100 cm">80-100 cm/80-100 सेमी</Radio>
                    <br />
                    <Radio value="More than 100 cm">
                      More than 100 cm / 100 सेमी पेक्षा जास्त
                    </Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ५. तुम्ही आठवड्यातून किमान 150 मिनिटे कोणतीही शारीरिक क्रिया
                  करता का? / Do you undertake any physical activities for
                  minimum of 150 minutes in a week?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handlePartAQuestion5(5, e.target.value)}
                    value={question5A[0]}
                  >
                    <Radio value="At least 150 minutes in a week">
                      At least 150 minutes in a weak / <br />
                      एका आठवड्यात किमान 150 मिनिटे
                    </Radio>
                    <br />
                    <Radio value="Less than 150 minutes in a week ">
                      Less than 150 minutes in a week /<br /> एका आठवड्यात 150
                      मिनिटांपेक्षा कमी
                    </Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ६. आपल्याकडे कौटुंबिक इतिहास आहे का ? (आपले पालक किंवा भावंडां
                  पैकी) उच्च रक्तदाब, मधुमेह आणि हृदयरोग आहे का ? / 6. Do you
                  have a family history? Have high blood pressure, diabetes and
                  heart disease (from your parents or siblings)?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) =>
                      handlePartAQuestion3And6(6, e.target.value)
                    }
                    value={question6A[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <SubmitButtonDiv>
                <Button onClick={() => setFamilyHeadRegister("no")}>
                  Back
                </Button>
                <SubmitButton onClick={() => onKeyChange("2")}>
                  Next
                </SubmitButton>
              </SubmitButtonDiv>
            </Tabs.TabPane>
            <Tabs.TabPane tab="2) Part B/भाग ब" key="2">
              <FormHeader>
                B: Early Screening: Ask the patient if they have any of these
                symptoms / लवकर तपासणी : रुग्णाला यापैकी काही लक्षणे आहेत का ते
                विचारा
              </FormHeader>
              <FormHeader>
                B1 : Female and male / बी १ : महिला आणि पुरुष
              </FormHeader>
              {/* {partB1Options.map((item, key) => (
                <QuestionRow
                  style={{
                    backgroundColor: partB1OptionsSelected.includes(item)
                      ? "#8EACCD"
                      : "#dde6ed",
                  }}
                  key={key}
                >
                  <QuestionCol>
                    {t(item)} / {item}
                  </QuestionCol>
                  <AnswerCol>
                    <Row>
                      <Col>
                        <Checkbox
                          value={item}
                          checked={partB1OptionsSelected.includes(item)}
                          onChange={() => handlePartB1select(item)}
                        ></Checkbox>
                      </Col>
                      <Col>
                        <p style={{ margin: "0px 10px" }}>होय / Yes </p>
                      </Col>
                    </Row>
                  </AnswerCol>
                </QuestionRow>
              ))} */}
              <QuestionRow>
                <QuestionCol>
                  १. धाप लागणे (श्वास घेण्यास त्रास होणे) / Shortness of breath
                  (difficulty breathing)
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(1, e.target.value)}
                    value={question1B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  २. २ आठवडयांपेक्षा जास्त खोकला / Cough for more than 2 weeks
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(2, e.target.value)}
                    value={question2B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>३. थुंकीत रक्त येणे/ Blood in sputum</QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(3, e.target.value)}
                    value={question3B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ४. २ आठवडयांपेक्षा जास्त ताप/ Fever for more than 2 weeks
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(4, e.target.value)}
                    value={question4B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>५. वजन कमी होणे/ Weight loss</QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(5, e.target.value)}
                    value={question5B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ६. रात्री खूप घाम येणे/ Excessive night sweats
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(6, e.target.value)}
                    value={question6B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no"> No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ७. आपण सध्या टीबीच्या उपचारासाठी औषधे घेत आहात ? / Are you
                  currently taking medicines to treat TB?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(7, e.target.value)}
                    value={question7B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ८. सध्या कुटुंबातील कोणत्याही सदस्याला टीबीचा आजार आहे का ? /
                  Is any family member currently suffering from TB disease?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(8, e.target.value)}
                    value={question8B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ९. टीबीचा आजार असण्याचा इतिहास / History of TB disease
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(9, e.target.value)}
                    value={question9B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  १०. हात आणि पायाच्या तळव्यांना वारंवार जखमा होणे / 10.
                  Frequent bruising of hands and soles of feet
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(10, e.target.value)}
                    value={question10B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ११. हात आणि पायावर तळव्यांना वारंवार मुंग्या येणे / Frequent
                  tingling in palms of hands and feet
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(11, e.target.value)}
                    value={question11B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  १२. धुसर आणि अंधूक दृष्टी / Blurred and blurred vision
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(12, e.target.value)}
                    value={question12B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  १३. वाचण्यास त्रास होणे / Difficulty in reading
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(13, e.target.value)}
                    value={question13B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  १४. एक आठवडयापेक्षा जास्त डोळयामधील वेदना बरी न होणे /
                  Non-relief of eye pain for more than a week
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(14, e.target.value)}
                    value={question14B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  १५. एक आठवडयापेक्षा जास्त डोळे लालसरपणा असणे / Eye redness for
                  more than a week
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(15, e.target.value)}
                    value={question15B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  १६. आपल्याला ऐकण्यास त्रास होणे / You have trouble hearing
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(16, e.target.value)}
                    value={question16B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  १७. फीटक्याचा इतिहास / History of Featka
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(17, e.target.value)}
                    value={question17B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  १८. तोंड उघडण्यास त्रास होणे / Difficulty opening the mouth
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(18, e.target.value)}
                    value={question18B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  १९. दोन आठवडयांपेक्षा जास्त तोंडातील जखम बरी न होणे /
                  Non-healing of mouth sores for more than two weeks
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(19, e.target.value)}
                    value={question19B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  २०. दोन आठवडयांपेक्षा जास्त तोंडात असलेली वाढ बरी न होणे /
                  Non-healing growth in mouth for more than two weeks
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(20, e.target.value)}
                    value={question20B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  २१. दोन आठवडयांपेक्षा जास्त तोंडामध्ये पांढरे किंवा लाल घट्टे
                  बरे न होणे / Non-healing white or red sores in the mouth for
                  more than two weeks
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(21, e.target.value)}
                    value={question21B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  २२. चघळताना वेदना होणे / Pain while chewing
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(22, e.target.value)}
                    value={question22B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>२३. आवाजात बदल होणे/ Changes in voice</QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(23, e.target.value)}
                    value={question23B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  २४. तोंडामध्ये हलक्या रंगाचे चट्टे किंवा वर्ण होणे ज्यास
                  संवेदना नसणे/ Light colored patches or spots in the mouth with
                  no sensation
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(24, e.target.value)}
                    value={question24B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  २५. शरीराच्या कोणत्याही भागात त्वचा जाड होणे/ Thickening of
                  the skin in any part of the body
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(25, e.target.value)}
                    value={question25B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  २६. शरीराच्या कोणत्याही भागात त्वेचवर गाठी होणे/ Tumors in any
                  part of the body
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(26, e.target.value)}
                    value={question26B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  २७. हात आणि पायावर तळव्यांना वारंवार सुन्न होणे/ Frequent
                  numbness of palms on hands and feet
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(27, e.target.value)}
                    value={question27B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>{" "}
              <QuestionRow>
                <QuestionCol>
                  २८. हाताची आणि पायाची बोटे वाकडी होणे/ Crooked fingers and
                  toes
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(28, e.target.value)}
                    value={question28B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  २९. हातांना आणि पायांना मुंग्या येणे आणि बधिर होणे/ Tingling
                  in hands and feet and deafness
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(29, e.target.value)}
                    value={question29B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ३०. डोळयांच्या पापण्या पूर्ण बंद न होणे/ Incomplete closure of
                  eyelids
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(30, e.target.value)}
                    value={question30B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ३१. हातांच्या पंजांमध्ये वस्तू व्यवस्थित पकडण्यास त्रास होणे/
                  Difficulty grasping objects properly in the claws of the hands
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(31, e.target.value)}
                    value={question31B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ३२. पायातील दुबळेपणामुळे चालण्यास त्रास होणे/ Difficulty
                  walking due to weakness in legs
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB1Part(32, e.target.value)}
                    value={question32B1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              {gender == "female" ? (
                <>
                  {" "}
                  <FormHeader>B2 : Women only / बी २ : केवळ महिला</FormHeader>
                  {/* {partB2Options.map((item, key) => (
                    <QuestionRow
                      style={{
                        backgroundColor: partB2OptionSelected.includes(item)
                          ? "#8EACCD"
                          : "#dde6ed",
                      }}
                      key={key}
                    >
                      <QuestionCol>
                        {t(item)} / {item}
                      </QuestionCol>
                      <AnswerCol>
                        <Row>
                          <Col>
                            <Checkbox
                              value={item}
                              checked={partB2OptionSelected.includes(item)}
                              onChange={() => handlePartB2Select(item)}
                            ></Checkbox>
                          </Col>
                          <Col>
                            <p style={{ margin: "0px 10px" }}>होय / Yes </p>
                          </Col>
                        </Row>
                      </AnswerCol>
                    </QuestionRow>
                  ))} */}
                  <QuestionRow>
                    <QuestionCol>
                      १. स्तनामध्ये गाठ असणे/ Having a lump in the breast
                    </QuestionCol>
                    <AnswerCol>
                      <Radio.Group
                        onChange={(e) =>
                          handleQuestionOfB2Part(1, e.target.value)
                        }
                        value={question1B2[0]}
                      >
                        <Radio value="yes">Yes / होय</Radio>
                        <Radio value="no">No / नाही</Radio>
                      </Radio.Group>
                    </AnswerCol>
                  </QuestionRow>
                  <QuestionRow>
                    <QuestionCol>
                      २. स्तनाग्रातून रक्त मिश्रीत स्त्राव होणे/ Bloody
                      discharge from the nipple
                    </QuestionCol>
                    <AnswerCol>
                      <Radio.Group
                        onChange={(e) =>
                          handleQuestionOfB2Part(2, e.target.value)
                        }
                        value={question2B2[0]}
                      >
                        <Radio value="yes">Yes / होय</Radio>
                        <Radio value="no">No / नाही</Radio>
                      </Radio.Group>
                    </AnswerCol>
                  </QuestionRow>
                  <QuestionRow>
                    <QuestionCol>
                      ३. स्तनाच्या आकारात बदल होणे/ Changes in breast size
                    </QuestionCol>
                    <AnswerCol>
                      <Radio.Group
                        onChange={(e) =>
                          handleQuestionOfB2Part(3, e.target.value)
                        }
                        value={question3B2[0]}
                      >
                        <Radio value="yes">Yes / होय</Radio>
                        <Radio value="no">No / नाही</Radio>
                      </Radio.Group>
                    </AnswerCol>
                  </QuestionRow>
                  <QuestionRow>
                    <QuestionCol>
                      ४. दोन मासिक पाळीच्या मध्ये रक्त स्त्राव होणे/ Bleeding
                      between two periods
                    </QuestionCol>
                    <AnswerCol>
                      <Radio.Group
                        onChange={(e) =>
                          handleQuestionOfB2Part(4, e.target.value)
                        }
                        value={question4B2[0]}
                      >
                        <Radio value="yes">Yes / होय</Radio>
                        <Radio value="no">No / नाही</Radio>
                      </Radio.Group>
                    </AnswerCol>
                  </QuestionRow>
                  <QuestionRow>
                    <QuestionCol>
                      ५. मासिक पाळी बंद झाल्यानंतर रक्तस्त्राव होणे/ Bleeding
                      after cessation of menstruation
                    </QuestionCol>
                    <AnswerCol>
                      <Radio.Group
                        onChange={(e) =>
                          handleQuestionOfB2Part(5, e.target.value)
                        }
                        value={question5B2[0]}
                      >
                        <Radio value="yes">Yes / होय</Radio>
                        <Radio value="no">No / नाही</Radio>
                      </Radio.Group>
                    </AnswerCol>
                  </QuestionRow>
                  <QuestionRow>
                    <QuestionCol>
                      ६. संभोगानंतर रक्तस्त्राव/ Bleeding after intercourse
                    </QuestionCol>
                    <AnswerCol>
                      <Radio.Group
                        onChange={(e) =>
                          handleQuestionOfB2Part(6, e.target.value)
                        }
                        value={question6B2[0]}
                      >
                        <Radio value="yes">Yes / होय</Radio>
                        <Radio value="no">No / नाही</Radio>
                      </Radio.Group>
                    </AnswerCol>
                  </QuestionRow>
                  <QuestionRow>
                    <QuestionCol>
                      ७. योनीमधून दुर्गंधीयुक्त स्त्राव/ Foul smelling vaginal
                      discharge
                    </QuestionCol>
                    <AnswerCol>
                      <Radio.Group
                        onChange={(e) =>
                          handleQuestionOfB2Part(7, e.target.value)
                        }
                        value={question7B2[0]}
                      >
                        <Radio value="yes">Yes / होय</Radio>
                        <Radio value="no">No / नाही</Radio>
                      </Radio.Group>
                    </AnswerCol>
                  </QuestionRow>
                </>
              ) : (
                <></>
              )}
              <FormHeader>
                B3 : For Senior Citizens (60 years and above)/बी ३ :
                वयोवृध्दांसाठी (६० वर्ष व त्यापेक्षा अधिक)
              </FormHeader>
              {/* {partB3Options.map((item, key) => (
                <QuestionRow
                  style={{
                    backgroundColor: partB3OptionsSelected.includes(item)
                      ? "#8EACCD"
                      : "#dde6ed",
                  }}
                  key={key}
                >
                  <QuestionCol>
                    {t(item)} / {item}
                  </QuestionCol>
                  <AnswerCol>
                    <Row>
                      <Col>
                        <Checkbox
                          value={item}
                          checked={partB3OptionsSelected.includes(item)}
                          onChange={() => handlePartB3Select(item)}
                        ></Checkbox>
                      </Col>
                      <Col>
                        <p style={{ margin: "0px 10px" }}>होय / Yes </p>
                      </Col>
                    </Row>
                  </AnswerCol>
                </QuestionRow>
              ))} */}
              <QuestionRow>
                <QuestionCol>
                  १. उभे असताना किंवा चालताना तुम्हाला अस्थिरपणा वाटतो का ?/ Do
                  you feel unsteady while standing or walking?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB3Part(1, e.target.value)}
                    value={question1B3[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  २. शारीरिक अपंगत्वाने ग्रस्त असल्यास हालचाली करण्यास अडथळा
                  येणे/ Impairment of movement if suffering from physical
                  disability
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB3Part(2, e.target.value)}
                    value={question2B3[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ३. खाणे, कपडे घालणे, परिधान करणे, आंघोळ करणे, चालणे किंवा
                  शौचालय वापरणे यासारख्या दैनंदिन क्रिया करण्यासाठी आपल्याला
                  इतरांच्या मदतीची आवश्यकता आहे का ?/ Do you need help from
                  others to perform daily activities such as eating, dressing,
                  dressing, bathing, walking or using the toilet?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB3Part(3, e.target.value)}
                    value={question3B3[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  ४. आपल्या घरचा पत्ता किंवा घरातील व्यक्तीची नावे विसरणे ?/ 4.
                  Forgetting your home address or household names?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleQuestionOfB3Part(4, e.target.value)}
                    value={question4B3[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <SubmitButtonDiv>
                <Button onClick={() => onKeyChange("1")}>Back</Button>
                <SubmitButton onClick={() => onKeyChange("3")}>
                  Next
                </SubmitButton>
              </SubmitButtonDiv>
            </Tabs.TabPane>
            <Tabs.TabPane tab="3) Part C / भाग क" key="3">
              <FormHeader>
                C: Risk factors for COPD / भाग सी : सीओपीडीसाठी जोखीम घटक
              </FormHeader>
              <QuestionRow>
                <QuestionCol>
                  १.स्वयंपाक करण्यासाठी वापरल्या जाणा-या इंधनाचा प्रकार ? / Type
                  of fuel used for cooking?
                </QuestionCol>
              </QuestionRow>
              {partC1Options.map((item, index) => (
                <QuestionSubRow key={index}>
                  <QuestionSubCol>
                    {t(item)} / {item}
                  </QuestionSubCol>
                  <AnswerSubCol>
                    <Checkbox
                      value={partC1OptionSelect.includes(item)}
                      onChange={() => handlePartC1Select(item)}
                    ></Checkbox>
                  </AnswerSubCol>
                </QuestionSubRow>
              ))}

              <QuestionRow>
                <QuestionCol>
                  2.व्यावसायिक प्रदर्शन / occupational exposure
                </QuestionCol>
              </QuestionRow>
              {partC2Options.map((item, index) => (
                <>
                  <QuestionSubRow key={index}>
                    <QuestionSubCol>
                      {t(item)}/{item}
                    </QuestionSubCol>
                    <AnswerSubCol>
                      <Checkbox
                        value={partC2OptionSelect.includes(item)}
                        onChange={() => handlePartC2Select(item)}
                      ></Checkbox>
                    </AnswerSubCol>
                  </QuestionSubRow>
                </>
              ))}

              <SubmitButtonDiv>
                <Button onClick={() => onKeyChange("2")}>Back</Button>
                <SubmitButton onClick={() => onKeyChange("4")}>
                  Next
                </SubmitButton>
              </SubmitButtonDiv>
            </Tabs.TabPane>
            <Tabs.TabPane tab="4) Part D / भाग डी" key="4">
              <FormHeader>D : PHQ 2 / डी : पीएचक्यू २</FormHeader>
              <FormHeader>
                · गेल्या २ आठवडयांत, आपण खालील समस्यांद्वारे किती वेळा त्रास
                दिला आहे- / In the past 2 weeks, how often have you been
                bothered by the following problems? is-
              </FormHeader>
              <QuestionRow>
                <QuestionCol style={{ width: "100%" }}>
                  १. गोष्टी करण्यात थोडीशी आवड किंवा आनंद असणे ? / Having little
                  interest or pleasure in doing things?
                </QuestionCol>

                <Radio.Group
                  style={{ margin: "1% 7%" }}
                  onChange={(e) => handlePartDQuestions(1, e.target.value)}
                  value={question1D[0]}
                >
                  <Radio value="Not at all">Not at all</Radio>
                  <Radio value="Several days">Several days</Radio>
                  <Radio value="More than half days">More than half days</Radio>
                  <Radio value="Nearly every days">Nearly every days</Radio>
                </Radio.Group>
              </QuestionRow>

              <QuestionRow>
                <QuestionCol style={{ width: "100%" }}>
                  २. निराश किंवा उदासीन असणे ? Being depressed ?
                </QuestionCol>
                <Radio.Group
                  style={{ margin: "1% 7%" }}
                  onChange={(e) => handlePartDQuestions(2, e.target.value)}
                  value={question2D[0]}
                >
                  <Radio value="Not at all">Not at all</Radio>
                  <Radio value="Several days">Several days</Radio>
                  <Radio value="More than half days">More than half days</Radio>
                  <Radio value="Nearly every days">Nearly every days</Radio>
                </Radio.Group>
              </QuestionRow>
              <SubmitButtonDiv>
                <Button onClick={() => onKeyChange("3")}>Back</Button>
                <SubmitButton onClick={() => onKeyChange("5")}>
                  Next
                </SubmitButton>
              </SubmitButtonDiv>
            </Tabs.TabPane>
            <Tabs.TabPane tab="5) Part E / भाग ई" key="5">
              <QuestionRow>
                <QuestionCol>1. ताप ? / Fever?</QuestionCol>
              </QuestionRow>
              {/* {partE1Options.map((item, index) => (
                <QuestionSubRow key={index}>
                  <QuestionSubCol>
                    {t(item)}/{item}
                  </QuestionSubCol>
                  <AnswerSubCol>
                    <Checkbox
                      checked={partE1OptionSelect.includes(item)}
                      onChange={() => handlePartE1Select(item)}
                    ></Checkbox>
                  </AnswerSubCol>
                </QuestionSubRow>
              ))} */}
              <QuestionSubRow>
                <QuestionSubCol>
                  A. 7 दिवसांपेक्षा जास्त काळ / More than 7 days
                </QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setDoYouHaveFever1(e.target.checked)}
                    value={doYouhaveFever1}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleDoYouHaveFever(1, e.target.value)}
                    value={doYouhaveFever1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  B. 7 दिवसांपेक्षा कमी / Less than 7 days
                </QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setDoYouHaveFever2(e.target.checked)}
                    value={doYouhaveFever2}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleDoYouHaveFever(2, e.target.value)}
                    value={doYouhaveFever2[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  C. थंडी वाजून येणे सह / With Chills
                </QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setDoYouHaveFever3(e.target.checked)}
                    value={doYouhaveFever3}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleDoYouHaveFever(3, e.target.value)}
                    value={doYouhaveFever3[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>D. रॅश सह / With Rash</QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setDoYouHaveFever4(e.target.checked)}
                    value={doYouhaveFever4}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleDoYouHaveFever(4, e.target.value)}
                    value={doYouhaveFever4[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  E. रक्तस्त्राव सह / with Bleeding
                </QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setDoYouHaveFever5(e.target.checked)}
                    value={doYouhaveFever5}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleDoYouHaveFever(5, e.target.value)}
                    value={doYouhaveFever5[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  F. संवेदना सह / with Altered Sensorium
                </QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setDoYouHaveFever6(e.target.checked)}
                    value={doYouhaveFever6}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleDoYouHaveFever(6, e.target.value)}
                    value={doYouhaveFever6[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>

              <QuestionRow>
                <QuestionCol>
                  2. डोळ्यांच्या बुबुळाच्या पुढील भागाचा होणारा दाह (डोळा येणे)
                  ? Conjuctivitis ?
                </QuestionCol>
              </QuestionRow>

              <>
                {/* {partE2Options.map((item, index) => (
                  <QuestionSubRow>
                    <QuestionSubCol>
                      {t(item)}/{item}
                    </QuestionSubCol>
                    <AnswerSubCol>
                      <Checkbox
                        checked={partE2OptionSelect.includes(item)}
                        onChange={() => handlePartE2Select(item)}
                      ></Checkbox>
                    </AnswerSubCol>
                  </QuestionSubRow>
                ))} */}
                <QuestionSubRow>
                  <QuestionSubCol> A. पाणचट / Watery</QuestionSubCol>
                  <AnswerSubCol>
                    {/* <Checkbox
                      onChange={(e) => setConjuctivitis1(e.target.checked)}
                      value={conjuctivitis1}
                    ></Checkbox> */}
                    <Radio.Group
                      onChange={(e) => handleConjuctivitis(1, e.target.value)}
                      value={conjuctivitis1[0]}
                    >
                      <Radio value="yes">Yes / होय</Radio>
                      <Radio value="no">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerSubCol>
                </QuestionSubRow>
                <QuestionSubRow>
                  <QuestionSubCol> B. लालसरपणा / redness</QuestionSubCol>
                  <AnswerSubCol>
                    {/* <Checkbox
                      onChange={(e) => setConjuctivitis2(e.target.checked)}
                      value={conjuctivitis2}
                    ></Checkbox> */}
                    <Radio.Group
                      onChange={(e) => handleConjuctivitis(2, e.target.value)}
                      value={conjuctivitis2[0]}
                    >
                      <Radio value="yes">Yes / होय</Radio>
                      <Radio value="no">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerSubCol>
                </QuestionSubRow>
                <QuestionSubRow>
                  <QuestionSubCol>
                    {" "}
                    C. खाज सुटलेले डोळे / itching eyes
                  </QuestionSubCol>
                  <AnswerSubCol>
                    {/* <Checkbox
                      onChange={(e) => setConjuctivitis3(e.target.checked)}
                      value={conjuctivitis3}
                    ></Checkbox> */}
                    <Radio.Group
                      onChange={(e) => handleConjuctivitis(3, e.target.value)}
                      value={conjuctivitis3[0]}
                    >
                      <Radio value="yes">Yes / होय</Radio>
                      <Radio value="no">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerSubCol>
                </QuestionSubRow>
              </>

              <QuestionRow>
                <QuestionCol>
                  3. लेप्टोस्पायरोसिस ? leptospirosis? ?
                </QuestionCol>
              </QuestionRow>

              <>
                {/* {partE3Options.map((item, index) => (
                  <>
                    <QuestionSubRow key={index}>
                      <QuestionSubCol>
                        {t(item)}/{item}
                      </QuestionSubCol>
                      <AnswerSubCol>
                        <Checkbox
                          checked={partE3OptionSelect.includes(item)}
                          onChange={() => handlePartE3Select(item)}
                        ></Checkbox>
                      </AnswerSubCol>
                    </QuestionSubRow>
                  </>
                ))} */}
                <QuestionSubRow>
                  <QuestionSubCol>
                    A.तुम्ही अनेकदा पाण्यात वावरता का? / Do you Waddling in
                    water often?
                  </QuestionSubCol>
                  <AnswerSubCol>
                    {/* <Checkbox
                      onChange={(e) => setLeptospirosis1(e.target.checked)}
                      value={leptospirosis1}
                    ></Checkbox> */}
                    <Radio.Group
                      onChange={(e) => handleLeptospirosis(1, e.target.value)}
                      value={leptospirosis1[0]}
                    >
                      <Radio value="yes">Yes / होय</Radio>
                      <Radio value="no">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerSubCol>
                </QuestionSubRow>
                <QuestionSubRow>
                  <QuestionSubCol>
                    B. गुरेढोरे / कुत्रा / मांजर / डुक्कर / उंदीर यांसारख्या
                    पाळीव प्राण्यांच्या संपर्कात येणे? / Exposure to domestic
                    animal like cattle / Dog / Cat / Pig / Rodent?
                  </QuestionSubCol>
                  <AnswerSubCol>
                    {/* <Checkbox
                      onChange={(e) => setLeptospirosis2(e.target.checked)}
                      value={leptospirosis2}
                    ></Checkbox> */}
                    <Radio.Group
                      onChange={(e) => handleLeptospirosis(2, e.target.value)}
                      value={leptospirosis2[0]}
                    >
                      <Radio value="yes">Yes / होय</Radio>
                      <Radio value="no">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerSubCol>
                </QuestionSubRow>
              </>

              <QuestionRow>
                <QuestionCol>4. जुलाब ? loose motion ?</QuestionCol>
              </QuestionRow>

              <>
                {/* {partE4Options.map((item, index) => (
                  <>
                    <QuestionSubRow key={index}>
                      <QuestionSubCol>
                        {t(item)}/{item}
                      </QuestionSubCol>
                      <AnswerSubCol>
                        <Checkbox
                          checked={partE4OptionSelect.includes(item)}
                          onChange={() => handlePartE4Select(item)}
                        ></Checkbox>
                      </AnswerSubCol>
                    </QuestionSubRow>
                  </>
                ))} */}
                <QuestionSubRow>
                  <QuestionSubCol> A. रक्तासह / With Blood</QuestionSubCol>
                  <AnswerSubCol>
                    {/* <Checkbox
                      onChange={(e) => setLooseMotion1(e.target.checked)}
                      value={looseMotion1}
                    ></Checkbox> */}
                    <Radio.Group
                      onChange={(e) => handleLooseMotion(1, e.target.value)}
                      value={looseMotion1[0]}
                    >
                      <Radio value="yes">Yes / होय</Radio>
                      <Radio value="no">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerSubCol>
                </QuestionSubRow>
                <QuestionSubRow>
                  <QuestionSubCol>
                    {" "}
                    B. रक्ताशिवाय / Without Blood
                  </QuestionSubCol>
                  <AnswerSubCol>
                    {/* <Checkbox
                      onChange={(e) => setLooseMotion2(e.target.checked)}
                      value={looseMotion2}
                    ></Checkbox> */}
                    <Radio.Group
                      onChange={(e) => handleLooseMotion(2, e.target.value)}
                      value={looseMotion2[0]}
                    >
                      <Radio value="yes">Yes / होय</Radio>
                      <Radio value="no">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerSubCol>
                </QuestionSubRow>
                <QuestionSubRow>
                  <QuestionSubCol> C. उलट्या होणे / Vomitting</QuestionSubCol>
                  <AnswerSubCol>
                    {/* <Checkbox
                      onChange={(e) => setLooseMotion3(e.target.checked)}
                      value={looseMotion3}
                    ></Checkbox> */}
                    <Radio.Group
                      onChange={(e) => handleLooseMotion(3, e.target.value)}
                      value={looseMotion3[0]}
                    >
                      <Radio value="yes">Yes / होय</Radio>
                      <Radio value="no">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerSubCol>
                </QuestionSubRow>
              </>

              <QuestionRow>
                <QuestionCol>
                  5. लिव्हरला सूज / कावीळ ? Hepatitis / Jaundice ?
                </QuestionCol>
              </QuestionRow>

              {/* {partE5Option.map((item, index) => (
                <>
                  <QuestionSubRow key={index}>
                    <QuestionSubCol>
                      {t(item)}/{item}
                    </QuestionSubCol>
                    <AnswerSubCol>
                      <Checkbox
                        onChange={() => handlePartE5Select(item)}
                        value={partE5OptionSelect.includes(item)}
                      ></Checkbox>
                    </AnswerSubCol>
                  </QuestionSubRow>
                </>
              ))} */}
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  A. तुम्ही बाहेरचे/ उघडे अन्न खाता/ दूषित पाणी पिता का? /Do you
                  eating outside / uncovered food / drinking contaminated water
                  ?
                </QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setHepatitis1(e.target.checked)}
                    value={hepatitis1}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleHepatitis(1, e.target.value)}
                    value={hepatitis1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>

              <QuestionRow>
                <QuestionCol>
                  6. तुम्हाला प्राण्यांनी चावले आहे का ? did animals have Bitten
                  you ?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleAnimalBitten(e.target.value)}
                    value={animalBitten[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  7. तुम्हाला साप चावला आहे का ? did Snake have Bitten you ?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => handleSnakeBitten(e.target.value)}
                    value={snakeBitten[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>8. कुष्ठरोग ? Leprosy ?</QuestionCol>
              </QuestionRow>
              {/* 
             {partE8Options.map((item, index) => (
                <QuestionSubRow key={index}>
                  <QuestionSubCol>
                    {t(item)}/{item}
                  </QuestionSubCol>
                  <AnswerSubCol>
                    <Checkbox
                      checked={partE8OptionSelect.includes(item)}
                      onChange={() => handlePartE8Select(item)}
                    ></Checkbox>
                  </AnswerSubCol>
                </QuestionSubRow>
              ))} */}
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  A. बधीरपणा / हात/पायांमध्ये मुंग्या येणे ? / Numbness /
                  Tingling in hands/feet ?
                </QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setLeprosy1(e.target.checked)}
                    value={leprosy1}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleLeprosy(1, e.target.value)}
                    value={leprosy1[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  B. शरीराच्या कोणत्याही भागात संवेदना कमी होणे ? / Loss of
                  sensation in any parts of body ?
                </QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setLeprosy2(e.target.checked)}
                    value={leprosy2}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleLeprosy(2, e.target.value)}
                    value={leprosy2[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  C. चेहरा/हात/पायांवर सूज ? /Swelling / Nodule on
                  Face/Hands/Feet ?
                </QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setLeprosy3(e.target.checked)}
                    value={leprosy3}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleLeprosy(3, e.target.value)}
                    value={leprosy3[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  D. पापणी किंवा भुवया गळणे ? / Loss of eyelash or eyebrow ?
                </QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setLeprosy4(e.target.checked)}
                    value={leprosy4}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleLeprosy(4, e.target.value)}
                    value={leprosy4[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  E. कानातले दाट ? / Thickened earlobes ?
                </QuestionSubCol>
                <AnswerSubCol>
                  {/* <Checkbox
                    onChange={(e) => setLeprosy5(e.target.checked)}
                    value={leprosy5}
                  ></Checkbox> */}
                  <Radio.Group
                    onChange={(e) => handleLeprosy(5, e.target.value)}
                    value={leprosy5[0]}
                  >
                    <Radio value="yes">Yes / होय</Radio>
                    <Radio value="no">No / नाही</Radio>
                  </Radio.Group>
                </AnswerSubCol>
              </QuestionSubRow>
              {age < 60 ? (
                <>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      marginRight: "10%",
                    }}
                  >
                    <Checkbox
                      onChange={(e) => handlePartialSelect(e)}
                    ></Checkbox>
                    <h4 style={{ marginLeft: "10px" }}>Partial Submit</h4>
                  </div>
                </>
              ) : (
                <></>
              )}

              <SubmitButtonDiv>
                <Button onClick={() => onKeyChange("4")}>Back</Button>
                <SubmitButton onClick={handleFormSubmit}>
                  {noOfMembersCompleted == totalFamilyMembers || partialSubmit
                    ? age > 60
                      ? "Next"
                      : "Submit"
                    : "Submit & next"}
                </SubmitButton>
              </SubmitButtonDiv>
            </Tabs.TabPane>
          </DocsTab>
        )}

        {/* Blood Consent Modal */}
        <Modal
          open={consentModalShow}
          onCancel={handleConsentModalClose}
          title="Blood Sample / रक्त नमुना"
          footer={
            <SubmitButton onClick={() => handleSubmitAndNext()}>
              {noOfMembersCompleted == totalFamilyMembers || partialSubmit
                ? "Submit"
                : "Submit & Next"}
            </SubmitButton>
          }
        >
          <BloodLogoImage src="blood-analysis.png"></BloodLogoImage>

          <BloodSampleText>
            Citizen will give his blood sample at / येथे नागरिक आपल्या रक्ताचा
            नमुना देईल :
          </BloodSampleText>
          <BloodSampleButtonsRow>
            <BloodSampleButtonCol>
              <Button
                style={
                  bloodSampleHome
                    ? { backgroundColor: "#E9B384" }
                    : { backgroundColor: "white" }
                }
                onClick={handleBloodSampleHomeSelct}
              >
                <span style={{ marginRight: "10px" }}>
                  <FontAwesomeIcon icon={faHouse} />
                </span>
                Home / घर
              </Button>
            </BloodSampleButtonCol>
            <BloodSampleButtonCol>
              <Button
                style={
                  bloodSampleCenter
                    ? { backgroundColor: "#E9B384" }
                    : { backgroundColor: "white" }
                }
                onClick={handleBloodSampleCenterSelect}
              >
                <span style={{ marginRight: "10px" }}>
                  <FontAwesomeIcon icon={faPlus} />
                </span>
                Center / केंद्र
              </Button>
            </BloodSampleButtonCol>
            <BloodSampleButtonCol>
              <Button
                style={
                  bloodSampleDenied
                    ? { backgroundColor: "#E9B384" }
                    : { backgroundColor: "white" }
                }
                onClick={handleBloodSampleDesiedSelect}
              >
                <span style={{ marginRight: "10px" }}>
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                Denied / नाकारले
              </Button>
            </BloodSampleButtonCol>
          </BloodSampleButtonsRow>
          {bloodSampleHome ? (
            <>
              <Form layout="vertical">
                <Form.Item
                  label="Demand letter"
                  style={{ margin: "20px 5px", width: "200px" }}
                >
                  <Input
                    type="file"
                    onChange={(e) => handleDemandLetter(e.target.files[0])}
                  ></Input>
                </Form.Item>
              </Form>
            </>
          ) : (
            <></>
          )}
          {bloodSampleDenied ? (
            <></>
          ) : (
            <>
              <div>
                <p>
                  <Checkbox
                    style={{ marginRight: "10px" }}
                    onChange={(e) => setBloodConsent(e.target.checked)}
                  ></Checkbox>
                  I have been explained about the consent as stated above and
                  hereby provide my consent for blood sample collection and any
                  more procedures for the aforementioned purposes.
                </p>
              </div>
            </>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "10%",
            }}
          >
            <Checkbox onChange={(e) => handlePartialSelect(e)}></Checkbox>
            <h4 style={{ marginLeft: "10px" }}>Partial Submit</h4>
          </div>
        </Modal>
        <AadharOtpLinkedModal
          open={showAadharOtpLinkedModal}
          onCancel={handleHideAadharOtpLinkedModal}
          title="Validate your Aadhar number before generating your abha number"
          footer={
            <>
              {aadharNumberSubmitted ? (
                <SubmitButton htmlType="submit" onClick={handleAadharVerify}>
                  Verify OTP
                </SubmitButton>
              ) : (
                <SubmitButton
                  htmlType="submit"
                  onClick={handleAadharNumberSubmit}
                >
                  Submit
                </SubmitButton>
              )}
            </>
          }
        >
          <div style={{ margin: "0px" }}>
            <Form layout="vertical">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <img width={100} src="Aadhar-Color.svg"></img>
                <Form.Item label="Aadhar Number">
                  <Input
                    type="text"
                    placeholder="Enter Aadhar Number "
                    style={{ width: "300px " }}
                    value={aadharNumber}
                    onChange={(e) => handleAadharNumberChange(e)}
                  ></Input>
                </Form.Item>
              </div>

              {aadharNumberSubmitted ? (
                <>
                  {" "}
                  <Form.Item
                    label={
                      <p>
                        {" "}
                        <b>OTP </b> (Please enter the One-Time Password (OTP)
                        that has been sent to the mobile number associated with
                        your Aadhar registration . Registered Mobile Number is{" "}
                        <b>{mobileNumberLinkedWithAadhar}</b> ){" "}
                      </p>
                    }
                  >
                    <OtpInput
                      inputStyle={{
                        width: "30px",
                        height: "30px",
                        margin: "2px 20px",
                      }}
                      value={otp}
                      numInputs={6}
                      type="number"
                      onChange={(value) => setOtp(value)}
                      renderSeparator={<span></span>}
                      renderInput={(props) => <input {...props} />}
                    ></OtpInput>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        margin: "10px 40px ",
                      }}
                    >
                      <a onClick={handleAadharNumberSubmit}>Resend OTP</a>
                    </div>
                  </Form.Item>
                </>
              ) : (
                <></>
              )}
            </Form>
          </div>
        </AadharOtpLinkedModal>
        <CheckAndGenerateMobileOtpModal
          open={showCheckAndGenerateMobileOtpModal}
          onCancel={handleHideCheckAndGeneratedMobileOtp}
          title={
            <>
              <Row>
                <Col span={3}>
                  <Button
                    disabled={aadharLinkedMobileNumber}
                    onClick={handleBackButtonOfCheckAndGenerateMobileOtpModal}
                  >
                    <FontAwesomeIcon icon={faBackward} />
                  </Button>
                </Col>
                <Col span={20}>
                  <h4 style={{ marginTop: "-5px" }}>
                    Please provide your mobile number for the purpose of linking
                    it with your ABHA CARD
                  </h4>
                </Col>
              </Row>
            </>
          }
          footer={
            <>
              {aadharLinkedMobileNumber ? (
                <>
                  <SubmitButton
                    htmlType="submit"
                    onClick={() => handleCheckAndGenerateMobileOtp()}
                  >
                    Submit
                  </SubmitButton>
                </>
              ) : (
                <>
                  <SubmitButton
                    htmlType="submit"
                    onClick={() => {
                      handleVerifyNumberLinktoAbhaCard();
                    }}
                  >
                    Submit OTP
                  </SubmitButton>
                </>
              )}
            </>
          }
        >
          <>
            <Form layout="vertical">
              <Form.Item label="Mobile Number" style={{ padding: "20px" }}>
                <Input
                  type="text"
                  placeholder="Enter Mobile Number"
                  style={{ width: "400px" }}
                  value={mobileNumberForAbhaID}
                  onChange={(e) => handleMobileNumberForAbhaId(e)}
                ></Input>
                {aadharLinkedMobileNumber ? (
                  <></>
                ) : (
                  <>
                    <div style={{ margin: "30px 2px" }}>
                      <Form.Item label="OTP">
                        <OtpInput
                          inputStyle={{
                            width: "30px",
                            height: "30px",
                            margin: "0px 15px",
                          }}
                          value={otp}
                          numInputs={6}
                          type="number"
                          onChange={(value) => setOtp(value)}
                          renderSeparator={<span></span>}
                          renderInput={(props) => <input {...props} />}
                        ></OtpInput>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            margin: "10px 40px ",
                          }}
                        >
                          <a onClick={handleCheckAndGenerateMobileOtp}>
                            Resend OTP
                          </a>
                        </div>
                      </Form.Item>
                    </div>
                  </>
                )}
              </Form.Item>
            </Form>
          </>
        </CheckAndGenerateMobileOtpModal>
        <HealthNumberModal
          open={showHealthNumberModal}
          onCancel={handleHideHealthNumberModal}
          footer={
            <>
              <SubmitButton onClick={handleHideHealthNumberModal}>
                Finish
              </SubmitButton>
            </>
          }
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                width={120}
                src={`data:image/jpeg;base64, ${aadharPhotoURL}`}
              ></img>
            </div>
            <div style={{ margin: "15px 50px" }}>
              <h3>Name : {aadharCardName}</h3>
              <h3> Mobile No : {aadharMobileNumber} </h3>
              <h3>Health ID : {abhaId}</h3>
              <p>
                Would you like to create your ABHA Address?{" "}
                <a onClick={handleShowHealthIdModal}>Click Here</a>
              </p>
            </div>
          </div>
        </HealthNumberModal>
        <HealthIdModal
          open={showHealthIdModal}
          onCancel={handleHideHealthIdModal}
          footer={
            <SubmitButton
              htmlType="submit"
              onClick={handleVerifyWhileHealthIDGeneration}
            >
              Verify
            </SubmitButton>
          }
        >
          <Form layout="vertical">
            <Form.Item
              label={
                <h4>
                  Please select one of the following options to receive your OTP
                </h4>
              }
            >
              {authMethods.map((data) => (
                <Radio.Group
                  onChange={(e) => handleSelectAuthMethods(e)}
                  value={selectedAuthMethods}
                  style={{ margin: "0px 30px" }}
                >
                  <Radio value={data}>{data}</Radio>
                </Radio.Group>
              ))}
            </Form.Item>
            <Form.Item label={<h4>OTP</h4>}>
              <OtpInput
                inputStyle={{
                  width: "30px",
                  height: "30px",
                  margin: "2px 15px",
                }}
                value={otp}
                numInputs={6}
                type="number"
                onChange={(value) => setOtp(value)}
                renderSeparator={<span></span>}
                renderInput={(props) => <input {...props} />}
              ></OtpInput>
              {/* <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px 40px ",
              }}
            >
              <a onClick={handleCheckAndGenerateMobileOtp}>Resend OTP</a>
            </div> */}
            </Form.Item>
          </Form>
        </HealthIdModal>
        <CreateHealthIdModal
          open={showCreateHealthIdModal}
          onCancel={handleHideCreateHealthIdModal}
          title="Create Your Health ID"
          footer={
            <>
              <SubmitButton onClick={() => handleCreateHealthID()}>
                Submit
              </SubmitButton>
            </>
          }
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Form layout="vertical">
              <Form.Item label="Health ID">
                <InputForm
                  type="text"
                  placeholder="Enter Health ID"
                  value={healthId}
                  onChange={(e) => setHealthId(e.target.value)}
                ></InputForm>
              </Form.Item>
              <Form.Item label="Password">
                <InputBox.Password
                  onChange={(e) => setHealthIdPassword(e.target.value)}
                ></InputBox.Password>
              </Form.Item>
            </Form>
          </div>
          <div style={{ margin: "-10px 20px" }}>
            <p style={{ fontSize: "15px", color: "#61A3BA" }}>
              Suggested Health ID :
            </p>
          </div>
          <div style={{ margin: "0px 150px" }}>
            <div>
              {listOfSuggestedHealthID.map((data, index) => (
                <li key={index}>{data}</li>
              ))}
            </div>
          </div>
        </CreateHealthIdModal>
      </Spin>
    </>
  );
}

export default FamilyHead;
