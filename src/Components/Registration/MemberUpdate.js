import React, { useEffect, useState } from "react";

import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";

//
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
  Divider,
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
  InputForm,
  QuestionSubCol,
  QuestionSubRow,
  TextAreaForm,
  AnswerCol1,
} from "./style";

import axios, { Axios } from "axios";
import { BASE_URL } from "../../Utils/BaseURL";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlug,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { LogOut } from "../../Auth/Logout";

function MemberUpdate(props) {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const { state } = useLocation();
  // state for progress bar
  const [progress, setProgress] = useState(0);
  const [CBACRequired, setCBACRequired] = useState(false);
  const [adharAbhaRequired, setAadharAbhaRequired] = useState(false);
  const [physicalDetailsRequired, setPhysicalDetailedRequired] =
    useState(false);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };
  useEffect(() => {
    i18n.changeLanguage("mr");
    console.log(state);
    setName(state.name);
    setGender(state.gender);
    setAge(state.age);
    setPhone(state.mobileNo);
    setAadharCard(state.aadharCard);
    setAbhaId(state.abhaId);
    setPulse(state.pulse);
    setBloodPressure(state.bloodPressure);
    setWeight(state.weight);
    setHeight(state.height);
    setBMI(state.BMI);

    setBloodConsent(state.bloodConsent);
    if (state.bloodCollectionLocation == "Home") {
      setBloodSampleHome(true);
    } else if (state.bloodCollectionLocation == "Center") {
      setBloodSampleCenter(true);
    } else if (state.bloodCollectionLocation == "Denied") {
      setBloodSampleDenied(true);
    } else if (state.bloodCollectionLocation == "notRequired") {
      setNotRequired(true);
    }

    // console.log(state.Questionnaire);
    setQuestion1A(state.Questionnaire.part_a[0].answer);
    setQuestion2A(state.Questionnaire.part_a[1].answer);
    setQuestion3A(state.Questionnaire.part_a[2].answer);
    setQuestion4A(state.Questionnaire.part_a[3].answer);
    setQuestion5A(state.Questionnaire.part_a[4].answer);
    setQuestion6A(state.Questionnaire.part_a[5].answer);

    // setPartB1OptionsSelected(state.Questionnaire.part_b[0].selectedOptions);
    for (let i = 0; i < 32; i++) {
      console.log(state.Questionnaire.part_b[i].answer);
      let setStateFunction = eval(`setQuestion${i + 1}B1`);
      setStateFunction(state.Questionnaire.part_b[i].answer);
    }
    // setPartB2OptionSelected(state.Questionnaire.part_b[1].selectedOptions);

    for (let i = 0; i < 7; i++) {
      // console.log(state.Questionnaire.part_b[i+32].answer)
      let setStateFunction = eval(`setQuestion${i + 1}B2`);
      setStateFunction(state.Questionnaire.part_b[i + 32].answer);
    }
    setPartB3OptionsSelected(state.Questionnaire.part_b[2].selectedOptions);
    for (let i = 0; i < 4; i++) {
      // console.log(state.Questionnaire.part_b[i+39].answer)
      let setStateFunction = eval(`setQuestion${i + 1}B3`);
      setStateFunction(state.Questionnaire.part_b[i + 39].answer);
    }

    // setPartC1OptionSelect(state.Questionnaire.part_c[0].selectedOptions);

    console.log(state.Questionnaire.part_c[0].answer ,"Part C1 answer");
    setPartC1OptionSelect(state.Questionnaire.part_c[0].answer);
    // setPartC2OptionSelect(state.Questionnaire.part_c[1].selectedOptions);
    setPartC2OptionSelect(state.Questionnaire.part_c[1].answer);
    console.log(state.Questionnaire.part_c[0].answer);
    setQuestion1D(state.Questionnaire.part_d[0].answer);
    setQuestion2D(state.Questionnaire.part_d[1].answer);
    for (let i = 0; i < 5; i++) {
      console.log(state.Questionnaire.part_e[i].answer);
      let setStateFunction = eval(`setDoYouHaveFever${i + 1}`);
      setStateFunction(state.Questionnaire.part_e[i].answer);
    }
    // for (let i = 0; i < 3; i++) {
    //   console.log(state.Questionnaire.part_e[i + 7].answer);
    //   let setStateFunction = eval(`setConjuctivitis${i + 1}`);
    //   setStateFunction(state.Questionnaire.part_e[i + 7].answer);
    // }
    for (let i = 0; i < 2; i++) {
      console.log(state.Questionnaire.part_e[i + 5].answer);
      let setStateFunction = eval(`setLeptospirosis${i + 1}`);
      setStateFunction(state.Questionnaire.part_e[i + 5].answer);
    }
    for (let i = 0; i < 3; i++) {
      console.log(state.Questionnaire.part_e[i + 7].answer);
      let setStateFunction = eval(`setLooseMotion${i + 1}`);
      setStateFunction(state.Questionnaire.part_e[i + 7].answer);
    }
    for (let i = 0; i < 1; i++) {
      console.log(state.Questionnaire.part_e[i + 10].answer);
      let setStateFunction = eval(`setHepatitis${i + 1}`);
      setStateFunction(state.Questionnaire.part_e[i + 10].answer);
    }

    setAnimalBitten(state.Questionnaire.part_e[11].answer);
    setSnakeBitten(state.Questionnaire.part_e[12].answer);
    setDiabetes(state.Questionnaire.part_e[13].answer);
    setVulnerable(state.vulnerable);
    setSelectReferralList(state.referels);
    setSelectVulnerableList(state.vulnerable_choices);
    setVulnerableReason(state.vulnerable_reason);
    setDeniedBy(state.deniedBy);
    // for (let i = 0; i < 5; i++) {
    //   console.log(state.Questionnaire.part_e[i + 17].answer);
    //   let setStateFunction = eval(`setLeprosy${i + 1}`);
    //   setStateFunction(state.Questionnaire.part_e[i + 17].answer);
    // }
  }, []);

  //Family Head Form States

  const [familyHeadName, setFamilyHeadName] = useState("");
  // const [middelName, setMiddleName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [plotNumber, setPlotNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [pincode, setPinCode] = useState("");
  const [totalFamilyMembers, setTotalFamilyMembers] = useState("");
  const [ward_name, setWard_name] = useState("");
  const [healthPost, setHealthPost] = useState("");
  const [bloodConsent, setBloodConsent] = useState(false);
  const [partialSubmit, setPartialSubmit] = useState(false);
  const [familyHeadRegister, setFamilyHeadRegister] = useState("No");

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

  const handleFormSubmit = () => {
    handleConsentModalShow();
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
  const [notRequired, setNotRequired] = useState(false);
  const [vulnerableList, setVulnerableList] = useState([]);
  const [selectVulnerableList, setSelectVulnerableList] = useState([]);
  const [vulnerable, setVulnerable] = useState(false);
  const [vulnerableReason, setVulnerableReason] = useState("");
  const [deniedBy, setDeniedBy] = useState();
  const [refarralList, setReferralList] = useState([]);
  const [selectedReferalList, setSelectReferralList] = useState([]);

  const handleVulnerableClick = () => {
    setVulnerable(!vulnerable);
    if (!vulnerable) {
      axios
        .get(`${BASE_URL}/healthworker/api/getvulnerableOptionList`)
        .then((res) => {
          console.log(res.data);
          setVulnerableList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleVulnerableList = (option) => {
    if (selectVulnerableList.includes(option)) {
      setSelectVulnerableList(
        selectVulnerableList.filter((item) => item !== option)
      );
    } else {
      setSelectVulnerableList([...selectVulnerableList, option]);
    }
    console.log(selectVulnerableList);
  };

  const handleReferralList = (option) => {
    if (selectedReferalList.includes(option)) {
      setSelectReferralList(
        selectedReferalList.filter((item) => item !== option)
      );
    } else {
      setSelectReferralList([...selectedReferalList, option]);
    }
  };

  const handleConsentModalShow = () => {
    axios
      .get(`${BASE_URL}/healthworker/api/getReferelOptionList`, axiosConfig)
      .then((res) => {
        console.log(res.data);
        setReferralList(res.data);
        setConsentModalShow(true);
      })
      .catch((err) => {
        console.log(err);
      });
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
  const handleNotRequiredSelect = () => {
    setBloodSampleHome(false);
    setBloodSampleCenter(false);
    setNotRequired(!notRequired);
    setBloodSampleDenied(false);
  };

  //Family Member field
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [abhaId, setAbhaId] = useState("");
  const [pulse, setPulse] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [BMI, setBMI] = useState("");
  const [cbacScore, setCbacScore] = useState("");
  const [demandLetter, setDemandLetter] = useState("");
  const [section, setSection] = useState("");
  const [selectedCHV, setSelectedCHV] = useState("");

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

  const handleCBACRequired = () => {
    setCBACRequired(!CBACRequired);
  };
  const handleAadharAbhaRequired = () => {
    setAadharAbhaRequired(!adharAbhaRequired);
  };
  const handlePhysicalDetailsRequired = () => {
    setPhysicalDetailedRequired(!physicalDetailsRequired);
  };
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

  const [doYouhaveFever1, setDoYouHaveFever1] = useState([]);
  const [doYouhaveFever2, setDoYouHaveFever2] = useState([]);
  const [doYouhaveFever3, setDoYouHaveFever3] = useState([]);
  const [doYouhaveFever4, setDoYouHaveFever4] = useState([]);
  const [doYouhaveFever5, setDoYouHaveFever5] = useState([]);

  // //E2
  // const [conjuctivitis, setConjuctivitis] = useState("No");
  // const [conjuctivitis1, setConjuctivitis1] = useState([]);
  // const [conjuctivitis2, setConjuctivitis2] = useState([]);
  // const [conjuctivitis3, setConjuctivitis3] = useState([]);
  //E3
  // const [leptospirosis, setLeptospirosis] = useState("No");
  const [leptospirosis1, setLeptospirosis1] = useState([]);
  const [leptospirosis2, setLeptospirosis2] = useState([]);

  //E4
  const [looseMotion, setLooseMotion] = useState("No");
  const [looseMotion1, setLooseMotion1] = useState([]);
  const [looseMotion2, setLooseMotion2] = useState([]);
  const [looseMotion3, setLooseMotion3] = useState([]);

  //E5
  const [hepatitis, setHepatitis] = useState("No");
  const [hepatitis1, setHepatitis1] = useState([]);

  //E6
  const [animalBitten, setAnimalBitten] = useState([]);

  //E7
  const [snakeBitten, setSnakeBitten] = useState([]);
  const [diabetes, setDiabetes] = useState([]);

  //E8
  // const [leprosy, setLeprosy] = useState("");
  // const [leprosy1, setLeprosy1] = useState([]);
  // const [leprosy2, setLeprosy2] = useState([]);
  // const [leprosy3, setLeprosy3] = useState([]);
  // const [leprosy4, setLeprosy4] = useState([]);
  // const [leprosy5, setLeprosy5] = useState([]);

  const handlePartAQuestion1 = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}A`);
    if (
      selectedValue === "0-29 years" ||
      selectedValue === "30-39 years" ||
      selectedValue === "40-49 years" ||
      selectedValue === "50-59 years" ||
      selectedValue === "60 years and above"
    ) {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handlePartAQuestion2 = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}A`);
    if (
      selectedValue === "Never" ||
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
    if (selectedValue === "Yes" || selectedValue === "No") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handlePartAQuestion4 = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}A`);
    if (
      selectedValue === "90 cm or less" ||
      selectedValue === "91-100 cm" ||
      selectedValue === "More than 100 cm" ||
      selectedValue === "80 cm or less" ||
      selectedValue === "81-90 cm" ||
      selectedValue === "More than 90 cm"
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
    if (selectedValue === "Yes" || selectedValue === "No") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handleQuestionOfB2Part = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}B2`);
    if (selectedValue === "Yes" || selectedValue === "No") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handleQuestionOfB3Part = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setQuestion${questionNumber}B3`);
    if (selectedValue === "Yes" || selectedValue === "No") {
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
    if (
      selectedValue === "Yes" ||
      selectedValue === "No" ||
      selectedValue === "For 7 days or more" ||
      selectedValue === "Less than 7 days" ||
      selectedValue === "No"
    ) {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };

  // const handleConjuctivitis = (questionNumber, selectedValue) => {
  //   const setQuestionFunction = eval(`setConjuctivitis${questionNumber}`);
  //   if (selectedValue === "Yes" || selectedValue === "No") {
  //     setQuestionFunction([selectedValue]);
  //   } else {
  //     setQuestionFunction([]);
  //   }
  // };

  const handleLeptospirosis = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setLeptospirosis${questionNumber}`);
    if (selectedValue === "Yes" || selectedValue === "No") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handleLooseMotion = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setLooseMotion${questionNumber}`);
    if (selectedValue === "Yes" || selectedValue === "No") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handleHepatitis = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setHepatitis${questionNumber}`);
    if (selectedValue === "Yes" || selectedValue === "No") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handleAnimalBitten = (selectedValue) => {
    if (selectedValue === "Yes" || selectedValue === "No") {
      setAnimalBitten([selectedValue]);
    } else {
      setAnimalBitten([]);
    }
  };
  const handleSnakeBitten = (selectedValue) => {
    const setQuestionFunction = eval(`setSnakeBitten`);
    if (selectedValue === "Yes" || selectedValue === "No") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };
  const handleDiabetes = (selectedValue) => {
    const setQuestionFunction = eval(`setDiabetes`);
    if (selectedValue === "Yes" || selectedValue === "No") {
      setQuestionFunction([selectedValue]);
    } else {
      setQuestionFunction([]);
    }
  };

  const handleLeprosy = (questionNumber, selectedValue) => {
    const setQuestionFunction = eval(`setLeprosy${questionNumber}`);
    if (selectedValue === "Yes" || selectedValue === "No") {
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
    setPartB1OptionsSelected([]);
    setPartB2OptionSelected([]);
    setPartB3OptionsSelected([]);
  };

  const handleClearPartC = () => {
    setPartC1OptionSelect([]);
    setPartC2OptionSelect([]);
  };

  const handleClearPartD = () => {
    setQuestion1D("");
    setQuestion2D("");
  };
  const handleClearPartE = () => {
    setPartE1OptionSelect([]);
    setPartE2OptionSelect([]);
    setPartE3OptionSelect([]);
    setPartE4OptionSelect([]);
    setPartE5OptionSelect([]);
    setAnimalBitten("");
    setSnakeBitten("");
    setPartE8OptionSelect([]);
  };

  const partB1Options = [
    "Shortness_of_breath_difficulty_breathing",
    "Coughing_more_than__weeks",
    "Blood_in_sputum",
    "Fever_for_more_than__weeks",
    "Weight_loss",
    "Night_sweats",
    "Are_you_currently_taking_medicines_to_treat_TB",
    "Is_any_family_member_currently_suffering_from_TB_disease",
    "A_history_of_TB_disease",
    "Frequent_bruising_of_hands_and_soles_of_feet",
    "Frequent_tingling_in_palms_of_hands_and_feet",
    "Blurred_and_blurred_vision",
    "Difficulty_in_reading",
    "Relapse_of_eye_pain_for_more_than_a_week",
    "Eye_redness_for_more_than_a_week",
    "You_have_trouble_hearing",
    "History_of_Feetka",
    "Difficulty_opening_the_mouth",
    "Nonhealing_of_mouth_sores_for_more_than_two_weeks",
    "Nonhealing_growth_in_mouth_for_more_than_two_weeks",
    "Nonhealing_white_or_red_sores_in_the_mouth_for_more_than_two_weeks",
    "Pain_while_chewing",
    "Change_in_voice",
    "Lightcolored_patches_or_spots_in_the_mouth_with_no_sensation",
    "Thickening_of_the_skin_in_any_part_of_the_body",
    "Lumps_on_any_part_of_the_body",
    "Frequent_numbness_of_the_palms_of_the_hands_and_feet",
    "Crooked_fingers_and_toes",
    "Tingling_and_numbness_in_hands_and_feet",
    "Incomplete_closure_of_the_eyelids",
    "Difficulty_grasping_objects_properly_in_the_hands",
    "Difficulty_walking_due_to_weakness_in_legs",
  ];

  const [partB1OptionsSelected, setPartB1OptionsSelected] = useState([]);
  const handlePartB1select = (option) => {
    if (partB1OptionsSelected.includes(option)) {
      setPartB1OptionsSelected(
        partB1OptionsSelected.filter((item) => item !== option)
      );
    } else {
      setPartB1OptionsSelected([...partB1OptionsSelected, option]);
    }
  };

  const partB2Options = [
    "Lump_in_the_breast",
    "Blood_stained_discharge_from_the_nipple",
    "Change_in_shape_and_size_of_breast",
    "Bleeding_between_periods",
    "Bleeding_after_menopause",
    "Bleeding_after_intercourse",
    "Foul_smelling_vaginal_discharge",
  ];
  const [partB2OptionSelected, setPartB2OptionSelected] = useState([]);
  const handlePartB2Select = (option) => {
    if (partB2OptionSelected.includes(option)) {
      setPartB2OptionSelected(
        partB2OptionSelected.filter((item) => item !== option)
      );
    } else {
      setPartB2OptionSelected([...partB2OptionSelected, option]);
    }
  };

  const partB3Options = [
    "Do_you_feel_unsteady_while_standing_or_walking",
    "Impairment_of_movement_if_suffering_from_physical_disability",
    "Do_you_need_help_from_others_to_perform_daily_activities_such_as_eating_dressing_dressing_bathing_walking_or_using_the_toilet",
    "Forgetting_your_home_address_or_household_names",
  ];
  const [partB3OptionsSelected, setPartB3OptionsSelected] = useState([]);
  const handlePartB3Select = (option) => {
    if (partB3OptionsSelected.includes(option)) {
      setPartB3OptionsSelected(
        partB3OptionsSelected.filter((item) => item !== option)
      );
    } else {
      setPartB3OptionsSelected([...partB3OptionsSelected, option]);
    }
  };

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
    console.log(partC1OptionSelect)
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
    "burning of garbage – leaves",
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
    aadharCard: aadharCard,
    ASHA_CHV: selectedCHV,
    abhaId: abhaId,
    pulse: pulse,
    bloodPressure: bloodPressure,
    weight: weight,
    height: height,
    BMI: BMI,
    cbacRequired: CBACRequired,
    referels: selectedReferalList,
    Questionnaire: {
      part_a: [
        {
          question: "What is your age? (complete years)",
          answer: question1A,
        },
        {
          question:
            "Do you smoke or consume smokeless product such as gutka or khaini?",
          answer: question2A,
        },
        {
          question: "Do you consume alcohol daily",
          answer: question3A,
        },
        {
          question: "Measurement of waist in cm",
          answer: question4A,
        },
        {
          question:
            "Do you undertake any physical activities for minimum of 150 minutes in a week (Daily min 30 minutes per day- 5 days a week)",
          answer: question5A,
        },
        {
          question:
            "Do you have a family history (any one of your parent or sibling ) of high BP, DM and Heart Disease",
          answer: question6A,
        },
      ],
      part_b: [
        {
          question: "Shortness of Breath (Difficulty in Breathing)",
          answer: question1B1,
        },
        {
          question: "Cough lasting more than 2 weeks",
          answer: question2B1,
        },
        {
          question: "Blood in sputum",
          answer: question3B1,
        },
        {
          question: "Fever for more than 2 weeks",
          answer: question4B1,
        },
        {
          question: "Loss of weight",
          answer: question5B1,
        },
        {
          question: "Night sweat",
          answer: question6B1,
        },
        {
          question: "Are you currently taking Anti TB Drugs",
          answer: question7B1,
        },
        {
          question: "Anyone in family currently suffering from TB",
          answer: question8B1,
        },
        {
          question: "History of TB",
          answer: question9B1,
        },
        {
          question: "Recurrent ulceration on palms or sole",
          answer: question10B1,
        },
        {
          question: "Recurrent Tingling on palms or sole",
          answer: question11B1,
        },
        {
          question: "Cloudy or blurred vision",
          answer: question12B1,
        },
        {
          question: "Difficulty in Reading",
          answer: question13B1,
        },
        {
          question: "Pain in eyes lasting for more than a week",
          answer: question14B1,
        },
        {
          question: "Redness in eyes lasting for more than a week",
          answer: question15B1,
        },
        {
          question: "Difficulty in hearing",
          answer: question16B1,
        },
        {
          question: "History of convulsions – fits",
          answer: question17B1,
        },
        {
          question: "Difficulty in opening Mouth",
          answer: question18B1,
        },
        {
          question: "Any ulcer in mouth that has not healed in 2 weeks",
          answer: question19B1,
        },
        {
          question: "Any growth / mass in mouth that has not healed in 2 weeks",
          answer: question20B1,
        },
        {
          question:
            "Any white or red patch in mouth that has not healed in 2 weeks",
          answer: question21B1,
        },
        {
          question: "Pain while chewing",
          answer: question22B1,
        },
        {
          question: "Any change in tone of your voice",
          answer: question23B1,
        },
        {
          question:
            "Any hypopigmented patch or discoloured lesions in oral cavity with loss of sensation",
          answer: question24B1,
        },
        {
          question: "Any thickened skin",
          answer: question25B1,
        },
        {
          question: "Any nodules on skin",
          answer: question26B1,
        },
        {
          question: "Recurrent numbness on palms or sole",
          answer: question27B1,
        },
        {
          question: "Clawing of fingers of hands and feet",
          answer: question28B1,
        },
        {
          question: "Tingling_and_numbness_in_hands_and_feet",
          answer: question29B1,
        },
        {
          question: "Inability to close eyelids completely",
          answer: question30B1,
        },
        {
          question: "Difficulty in holding objects in hands",
          answer: question31B1,
        },
        {
          question: "Weakness in feet that causes difficulty in walking",
          answer: question32B1,
        },
        {
          question: "Lump in breast",
          answer: question1B2,
        },
        {
          question: "Blood stained discharge from the nipple",
          answer: question2B2,
        },
        {
          question: "Changes in shape and size of breast",
          answer: question3B2,
        },
        {
          question: "Bleeding between periods",
          answer: question4B2,
        },
        {
          question: "Bleeding after menopause",
          answer: question5B2,
        },
        {
          question: "Bleeding after intercourse",
          answer: question6B2,
        },
        {
          question: "Foul smelling vaginal discharge",
          answer: question7B2,
        },
        {
          question: "Feeling unsteady while standing or walking",
          answer: question1B3,
        },
        {
          question:
            "Suffering from any physical disability that restricts movement",
          answer: question2B3,
        },
        {
          question:
            "Needing help from others to perform everyday activities such as eating , getting dressed, grooming , bathing, walking, or using toilet",
          answer: question3B3,
        },
        {
          question: "Forgetting names of your near ones or your home address",
          answer: question4B3,
        },
      ],
      part_c: [
        {
          question: "Type of Fuel used for cooking",
          answer: partC1OptionSelect,
        },
        {
          question: "Occupational exposure",
          answer: partC2OptionSelect,
        },
      ],
      part_d: [
        {
          question: "Little interest of pleasure in doing things ?",
          answer: question1D,
        },
        {
          question: "Feeling low/down,depressed or hopeless/sadness ?",
          answer: question2D,
        },
      ],
      part_e: [
        {
          question: "Fever",
          answer: doYouhaveFever1,
        },
        {
          question: "With Chills",
          answer: doYouhaveFever2,
        },
        {
          question: "With Rash",
          answer: doYouhaveFever3,
        },
        {
          question: "With Bleeding",
          answer: doYouhaveFever4,
        },
        {
          question: "With Altered Sensorium",
          answer: doYouhaveFever5,
        },

        {
          question: "Waddling in water",
          answer: leptospirosis1,
        },
        {
          question:
            "Exposure to domestic animal like cattle / Dog / Cat / Pig / Rodent",
          answer: leptospirosis2,
        },
        {
          question: "Loose Motion",
          answer: looseMotion1,
        },
        {
          question: "With Blood",
          answer: looseMotion2,
        },
        {
          question: "Vomitting",
          answer: looseMotion3,
        },
        {
          question:
            "Eating outside / uncovered food / drinking contaminated water",
          answer: hepatitis1,
        },
        {
          question: "Animal Bite(cattle/dogs/cats)",
          answer: animalBitten,
        },
        {
          question: "Snake Bite",
          answer: snakeBitten,
        },
        {
          question: "History of amputation due to diabetes complication",
          answer: diabetes,
        },
      ],
    },

    bloodCollectionLocation: bloodSampleHome
      ? "Home"
      : bloodSampleCenter
      ? "Center"
      : bloodSampleDenied
      ? "Denied"
      : notRequired
      ? "Not Required"
      : "",
    deniedBy: deniedBy,
    vulnerable: vulnerable,
    vulnerable_reason: vulnerableReason,
    vulnerable_choices: selectVulnerableList,
  };

  const handleUpdate = () => {
    axios
      .patch(
        `${BASE_URL}/healthworker/api/UpdateFamilyDetails/${state.id}`,
        memberData,
        axiosConfig
      )
      .then((response) => {
        console.log(response.data.message);
        message.success(response.data.message);
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 1000);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            LogOut();
          }, 1000);
        } else {
          message.warning(error.response.data.message);
        }
      });
  };
  const handlePartialSelect = (e) => {
    setPartialSubmit(e.target.checked);
  };

  return (
    <>
      <Header />
      <Container>
        <FormContainer layout="vertical">
          <Row>
            <Column>
              {/* rules={[{required:true ,message:"name required / नाव आवश्यक आहे"},{pattern:/^[a-z A-Z]*$/ ,message:"Only alphabetic characters and spaces allowed / केवळ वर्णमाला वर्ण आणि रिक्त स्थानांना अनुमती आहे"}]} */}
              <FormItem label="Name /  नाव" required>
                <Input
                  type="text"
                  value={name}
                  // onChange={(e) => handleNameChange(e)}
                  pattern="[a-zA-Z]+"
                  
                ></Input>
              </FormItem>
            </Column>
            <Column>
              {/* rules={[{required:true ,message:"aadhar number required / आधार क्रमांक आवश्यक आहे"},{pattern:/^[0-9]*$/ ,message:"Only numerics value allowed / केवळ अंकीय मूल्याला अनुमती आहे"}]} */}
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
                  // onChange={(e) => handleMobileNumberChange(e)}
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
                
                  // onChange={(e) => handleAgeChange(e)}
                ></Input>
              </FormItem>
            </Column>
          </Row>
          {age === "" || age <= 18 ? (
            <Row
              style={{
                display: "flex",
                justifyContent: "start",
                margin: "0.5% 0%",
                backgroundColor: "#dde6ed",
              }}
            >
              {/* <h3>Hello</h3> */}
              <Checkbox
                style={{ margin: "0% 2%" }}
                value={adharAbhaRequired}
                // onChange={handleAadharAbhaRequired}
              >
                <h4>
                  If You want to fill Adhar Number and ABHA Number, tick the box
                </h4>
              </Checkbox>
            </Row>
          ) : (
            <>
              <Divider />
            </>
          )}
          {age <= 18 && !adharAbhaRequired ? (
            <></>
          ) : (
            <>
              {" "}
              <Row>
                <Column span={8}>
                  <FormItem label="Aadhar Card Number/ आधार क्रमांक">
                    <Input
                      type="text"
                      value={aadharCard}
                      maxLength={12}
                      
                      // onChange={(e) => handleAadharCardChange(e)}
                    ></Input>
                  </FormItem>
                </Column>
                <Column span={8}>
                  <FormItem label="Abha ID / आभा आयडी">
                    <Input
                      type="text"
                      value={abhaId}
                      maxLength={17}
                      // onChange={(e) => handleAbhaIDChange(e)}
                    ></Input>
                  </FormItem>
                  {/* <p style={{ margin: "-20px 50px 15px", fontSize: "14px" }}>
                    If you don't have ABHA ID?
                    <a onClick={() => handleShowAadharOtpLinkedModal()}>
                      Click here
                    </a>
                  </p> */}
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
            </>
          )}
          {age === "" || age <= 18 ? (
            <Row
              style={{
                display: "flex",
                justifyContent: "start",
                margin: "0.5% 0%",
                backgroundColor: "#dde6ed",
              }}
            >
              {/* <h3>Hello</h3> */}
              <Checkbox
                style={{ margin: "0% 2%" }}
                value={physicalDetailsRequired}
                onChange={handlePhysicalDetailsRequired}
              >
                <h4>If You want to fill physical details, tick the box</h4>
              </Checkbox>
            </Row>
          ) : (
            <>
              <Divider />
            </>
          )}

          {age <= 18 && !physicalDetailsRequired ? (
            <></>
          ) : (
            <>
              <Row>
                <Column>
                  <FormItem label="Pulse / नाडी">
                    <Input
                      type="text"
                      value={pulse}
                      suffix="/min"
                      // onChange={(e) => handlePulseChange(e)}
                    ></Input>
                  </FormItem>
                </Column>

                <Column>
                  <FormItem label="Blood Pressure / रक्तदाब">
                    <Input
                      type="text"
                      value={bloodPressure}
                      suffix="mmHg"
                      // onChange={(e) => handleBloodPressureChange(e)}
                    ></Input>
                  </FormItem>
                </Column>
                <Column>
                  <FormItem label="Weight / वजन">
                    <Input
                      type="text"
                      value={weight}
                      suffix="kg"
                      // onChange={(e) => handleWeightChange(e)}
                    ></Input>
                  </FormItem>
                </Column>
                <Column>
                  <FormItem label="Height / उंची">
                    <Input
                      type="text"
                      value={height}
                      suffix="cm"
                      // onChange={(e) => handleHeightChange(e)}
                    ></Input>
                  </FormItem>
                </Column>
                <Column>
                  <FormItem label="BMI">
                    <Input
                      type="text"
                      value={BMI}
                      suffix="kg/m2"
                      // onChange={(e) => handleBMIChange(e)}
                    ></Input>
                  </FormItem>
                </Column>
              </Row>
            </>
          )}

          <Row></Row>
          {age === "" || age <= 30 ? (
            <Row
              style={{
                display: "flex",
                justifyContent: "start",
                margin: "0.5% 0%",
                backgroundColor: "#dde6ed",
              }}
            >
              {/* <h3>Hello</h3> */}
              <Checkbox
                style={{ margin: "0% 2%" }}
                value={CBACRequired}
                // onChange={handleCBACRequired}
              >
                <h4>If You want to fill CBAC Form, tick the box</h4>
              </Checkbox>
            </Row>
          ) : (
            <></>
          )}
        </FormContainer>
      </Container>

      {/* {age <= 30 && !CBACRequired ? (
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
        )} */}

      {age <= 30 && !CBACRequired ? (
        <SubmitButtonDiv>
          <SubmitButton onClick={handleFormSubmit}>Next</SubmitButton>
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
                १. आपले वय काय आहे ? (पूर्ण वर्षात) / what is your age (in full
                year)
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handlePartAQuestion1(1, e.target.value)}
                  value={question1A[0]}
                >
                  <Radio value="0-29 years">0-29 years / 0-29 वर्षे</Radio>
                  <br />
                  <Radio value="30-39 years">30-39 Years / 30-39 वर्षे</Radio>
                  <br />
                  <Radio value="40-49 years">
                    40 and 49 years / 40 आणि 49 वर्षे
                  </Radio>
                  <br />
                  <Radio value="50-59 years">
                    50 and 59 years /50 आणि 59 वर्षे
                  </Radio>
                  <br />
                  <Radio value="60 years and above">
                    60 years and above /60 वर्षे आणि त्यावरील
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
                  // onChange={(e) => handlePartAQuestion2(2, e.target.value)}
                  value={question2A[0]}
                >
                  <Radio value="Never">Never / कधीच नाही</Radio>
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
                ३. तुम्ही दररोज मद्यपान करता ? / Do you drink alcohol every day?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handlePartAQuestion3And6(3, e.target.value)}
                  value={question3A[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ४. कंबरेचा घेर (सेमी मध्ये) / Waist circumference (in cm)
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handlePartAQuestion4(4, e.target.value)}
                  value={question4A[0]}
                >
                  {gender === "male" ? (
                    <>
                      {" "}
                      <Radio value="90 cm or less">
                        90 cm or less/90 सेमी किंवा कमी
                      </Radio>
                      <br />
                      <Radio value="91-100 cm">91-100 cm/91-100 सेमी</Radio>
                      <br />
                      <Radio value="More than 100 cm">
                        More than 100 cm / 100 सेमी पेक्षा जास्त
                      </Radio>
                    </>
                  ) : (
                    <>
                      <Radio value="80 cm or less">
                        80 cm or less/80 सेमी किंवा कमी
                      </Radio>
                      <br />
                      <Radio value="81-90 cm">81-90 cm/81-90 सेमी</Radio>
                      <br />
                      <Radio value="More than 90 cm">
                        More than 90 cm / 90 सेमी पेक्षा जास्त
                      </Radio>
                    </>
                  )}
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ५. तुम्ही आठवड्यातून किमान 150 मिनिटे कोणतीही शारीरिक क्रिया
                करता का? / Do you undertake any physical activities for minimum
                of 150 minutes in a week?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handlePartAQuestion5(5, e.target.value)}
                  value={question5A[0]}
                >
                  <Radio value="At least 150 minutes in a week">
                    At least 150 minutes in a weak / <br />
                    एका आठवड्यात किमान 150 मिनिटे
                  </Radio>
                  <br />
                  <Radio value="Less than 150 minutes in a week">
                    Less than 150 minutes in a week /<br /> एका आठवड्यात 150
                    मिनिटांपेक्षा कमी
                  </Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ६. आपल्याकडे कौटुंबिक इतिहास आहे का ? (आपले पालक किंवा भावंडां
                पैकी) उच्च रक्तदाब, मधुमेह आणि हृदयरोग आहे का ? / 6. Do you have
                a family history? Have high blood pressure, diabetes and heart
                disease (from your parents or siblings)?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handlePartAQuestion3And6(6, e.target.value)}
                  value={question6A[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <SubmitButtonDiv>
              <Button onClick={() => setFamilyHeadRegister("No")}>Back</Button>
              <SubmitButton onClick={() => onKeyChange("2")}>Next</SubmitButton>
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
                  // onChange={(e) => handleQuestionOfB1Part(1, e.target.value)}
                  value={question1B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                २. २ आठवडयांपेक्षा जास्त खोकला / Cough lasting more than 2 weeks
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(2, e.target.value)}
                  value={question2B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>३. थुंकीत रक्त येणे/ Blood in sputum</QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(3, e.target.value)}
                  value={question3B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ४. २ आठवडयांपेक्षा जास्त ताप/ Fever for more than 2 weeks
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(4, e.target.value)}
                  value={question4B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>५. वजन कमी होणे/ Loss of weight</QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(5, e.target.value)}
                  value={question5B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>६. रात्री खूप घाम येणे/ Night sweats</QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(6, e.target.value)}
                  value={question6B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No"> No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ७. आपण सध्या टीबीच्या उपचारासाठी औषधे घेत आहात ? / Are you
                currently taking Anti TB Drugs?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(7, e.target.value)}
                  value={question7B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ८. सध्या कुटुंबातील कोणत्याही सदस्याला टीबीचा आजार आहे का ? /
                Anyone in family currently suffering from TB?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(8, e.target.value)}
                  value={question8B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ९. टीबीचा आजार असण्याचा इतिहास / History of TB disease
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(9, e.target.value)}
                  value={question9B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                १०. हात आणि पायाच्या तळव्यांना वारंवार जखमा होणे / 10. Recurrent
                ulceration on palms or sole
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(10, e.target.value)}
                  value={question10B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ११. हात आणि पायावर तळव्यांना वारंवार मुंग्या येणे / Recurrent
                Tingling on palms or sole
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(11, e.target.value)}
                  value={question11B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                १२. धुसर आणि अंधूक दृष्टी / Cloudy or blurred vision
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(12, e.target.value)}
                  value={question12B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                १३. वाचण्यास त्रास होणे / Difficulty in reading
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(13, e.target.value)}
                  value={question13B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                १४. एक आठवडयापेक्षा जास्त डोळयामधील वेदना बरी न होणे / Pain in
                eyes lasting for more than a week
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(14, e.target.value)}
                  value={question14B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                १५. एक आठवडयापेक्षा जास्त डोळे लालसरपणा असणे / Redness in eyes
                lasting for more than a week
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(15, e.target.value)}
                  value={question15B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                १६. आपल्याला ऐकण्यास त्रास होणे / Difficulty in hearing
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(16, e.target.value)}
                  value={question16B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                १७. फीटक्याचा इतिहास / History of convulsions - fits
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(17, e.target.value)}
                  value={question17B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                १८. तोंड उघडण्यास त्रास होणे / Difficulty in opening mouth
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(18, e.target.value)}
                  value={question18B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                १९. दोन आठवडयांपेक्षा जास्त तोंडातील जखम बरी न होणे / Any ulcer
                in mouth that has not healed in 2 weeks
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(19, e.target.value)}
                  value={question19B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                २०. दोन आठवडयांपेक्षा जास्त तोंडात असलेली वाढ बरी न होणे / Any
                growth / mass in mouth that has not healed in 2 weeks
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(20, e.target.value)}
                  value={question20B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                २१. दोन आठवडयांपेक्षा जास्त तोंडामध्ये पांढरे किंवा लाल घट्टे
                बरे न होणे / Any white or red patch in mouth that has not healed
                in 2 weeks
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(21, e.target.value)}
                  value={question21B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                २२. चघळताना वेदना होणे / Pain while chewing
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(22, e.target.value)}
                  value={question22B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                २३. आवाजात बदल होणे/ Any change in tone of your voice
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(23, e.target.value)}
                  value={question23B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                २४. तोंडामध्ये हलक्या रंगाचे चट्टे किंवा वर्ण होणे ज्यास संवेदना
                नसणे/ Any hypopigmented patch in oral cavity or discolored
                lesions with loss of sensation
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(24, e.target.value)}
                  value={question24B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                २५. शरीराच्या कोणत्याही भागात त्वचा जाड होणे/ Thickening of the
                skin in any part of the body
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(25, e.target.value)}
                  value={question25B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                २६. शरीराच्या कोणत्याही भागात त्वेचवर गाठी होणे/ Any nodules on
                skin
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(26, e.target.value)}
                  value={question26B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                २७. हात आणि पायावर तळव्यांना वारंवार सुन्न होणे/ Recurrent
                numbness on palms or sole
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(27, e.target.value)}
                  value={question27B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>{" "}
            <QuestionRow>
              <QuestionCol>
                २८. हाताची आणि पायाची बोटे वाकडी होणे/ Clawing of fingers of
                hands and feet
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(28, e.target.value)}
                  value={question28B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                २९. हातांना आणि पायांना मुंग्या येणे आणि बधिर होणे/ Tingling and
                numbness in hands and feet
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(29, e.target.value)}
                  value={question29B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ३०. डोळयांच्या पापण्या पूर्ण बंद न होणे/ Inability to close
                eyelids completely
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(30, e.target.value)}
                  value={question30B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ३१. हातांच्या पंजांमध्ये वस्तू व्यवस्थित पकडण्यास त्रास होणे/
                Difficulty in holding objects in hands
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(31, e.target.value)}
                  value={question31B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ३२. पायातील दुबळेपणामुळे चालण्यास त्रास होणे/ Difficulty walking
                due to weakness in legs
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB1Part(32, e.target.value)}
                  value={question32B1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
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
                      // onChange={(e) =>
                      //   handleQuestionOfB2Part(1, e.target.value)
                      // }
                      value={question1B2[0]}
                    >
                      <Radio value="Yes">Yes / होय</Radio>
                      <Radio value="No">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerCol>
                </QuestionRow>
                <QuestionRow>
                  <QuestionCol>
                    २. स्तनाग्रातून रक्त मिश्रीत स्त्राव होणे/ Blood stained
                    discharge from the nipple
                  </QuestionCol>
                  <AnswerCol>
                    <Radio.Group
                      // onChange={(e) =>
                      //   handleQuestionOfB2Part(2, e.target.value)
                      // }
                      value={question2B2[0]}
                    >
                      <Radio value="Yes">Yes / होय</Radio>
                      <Radio value="No">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerCol>
                </QuestionRow>
                <QuestionRow>
                  <QuestionCol>
                    ३. स्तनाच्या आकारात बदल होणे/ Changes in breast size
                  </QuestionCol>
                  <AnswerCol>
                    <Radio.Group
                      // onChange={(e) =>
                      //   handleQuestionOfB2Part(3, e.target.value)
                      // }
                      value={question3B2[0]}
                    >
                      <Radio value="Yes">Yes / होय</Radio>
                      <Radio value="No">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerCol>
                </QuestionRow>
                <QuestionRow>
                  <QuestionCol>
                    ४. दोन मासिक पाळीच्या मध्ये रक्त स्त्राव होणे/ Bleeding
                    between periods
                  </QuestionCol>
                  <AnswerCol>
                    <Radio.Group
                      // onChange={(e) =>
                      //   handleQuestionOfB2Part(4, e.target.value)
                      // }
                      value={question4B2[0]}
                    >
                      <Radio value="Yes">Yes / होय</Radio>
                      <Radio value="No">No / नाही</Radio>
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
                      // onChange={(e) =>
                      //   handleQuestionOfB2Part(5, e.target.value)
                      // }
                      value={question5B2[0]}
                    >
                      <Radio value="Yes">Yes / होय</Radio>
                      <Radio value="No">No / नाही</Radio>
                    </Radio.Group>
                  </AnswerCol>
                </QuestionRow>
                <QuestionRow>
                  <QuestionCol>
                    ६. संभोगानंतर रक्तस्त्राव/ Bleeding after intercourse
                  </QuestionCol>
                  <AnswerCol>
                    <Radio.Group
                      // onChange={(e) =>
                      //   handleQuestionOfB2Part(6, e.target.value)
                      // }
                      value={question6B2[0]}
                    >
                      <Radio value="Yes">Yes / होय</Radio>
                      <Radio value="No">No / नाही</Radio>
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
                      // onChange={(e) =>
                      //   handleQuestionOfB2Part(7, e.target.value)
                      // }
                      value={question7B2[0]}
                    >
                      <Radio value="Yes">Yes / होय</Radio>
                      <Radio value="No">No / नाही</Radio>
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
                  // onChange={(e) => handleQuestionOfB3Part(1, e.target.value)}
                  value={question1B3[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                २. शारीरिक अपंगत्वाने ग्रस्त असल्यास हालचाली करण्यास अडथळा येणे/
                Impairment of movement if suffering from physical disability
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB3Part(2, e.target.value)}
                  value={question2B3[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                ३. खाणे, कपडे घालणे, परिधान करणे, आंघोळ करणे, चालणे किंवा शौचालय
                वापरणे यासारख्या दैनंदिन क्रिया करण्यासाठी आपल्याला इतरांच्या
                मदतीची आवश्यकता आहे का ?/ Do you need help from others to
                perform daily activities such as eating, dressing, dressing,
                bathing, walking or using the toilet?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleQuestionOfB3Part(3, e.target.value)}
                  value={question3B3[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
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
                  // onChange={(e) => handleQuestionOfB3Part(4, e.target.value)}
                  value={question4B3[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <SubmitButtonDiv>
              <Button onClick={() => onKeyChange("1")}>Back</Button>
              <SubmitButton onClick={() => onKeyChange("3")}>Next</SubmitButton>
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
              <>{console.log(partC1OptionSelect.includes(item))}
              <QuestionSubRow >
                
                <QuestionSubCol>
                  {t(item)} / {item}
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    checked={partC1OptionSelect.includes(item)}
                    // onChange={() => handlePartC1Select(item)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              </>
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
                      checked={partC2OptionSelect.includes(item)}
                      // onChange={() => handlePartC2Select(item)}
                    ></Checkbox>
                  </AnswerSubCol>
                </QuestionSubRow>
              </>
            ))}

            <SubmitButtonDiv>
              <Button onClick={() => onKeyChange("2")}>Back</Button>
              <SubmitButton onClick={() => onKeyChange("4")}>Next</SubmitButton>
            </SubmitButtonDiv>
          </Tabs.TabPane>
          <Tabs.TabPane tab="4) Part D / भाग डी" key="4">
            <FormHeader>D : PHQ 2 / डी : पीएचक्यू २</FormHeader>
            <FormHeader>
              · गेल्या २ आठवडयांत, आपण खालील समस्यांद्वारे किती वेळा त्रास दिला
              आहे- / In the past 2 weeks, how often have you been bothered by
              the following problems? is-
            </FormHeader>
            <QuestionRow>
              <QuestionCol style={{ width: "100%" }}>
                १. गोष्टी करण्यात थोडीशी आवड किंवा आनंद असणे ? / Having little
                interest or pleasure in doing things?
              </QuestionCol>

              <Radio.Group
                style={{ margin: "1% 7%" }}
                // onChange={(e) => handlePartDQuestions(1, e.target.value)}
                value={question1D[0]}
              >
                <Radio value="Not at all">Not at all/अजिबात नाही</Radio>
                <Radio value="Several days">Several days/अनेक दिवस</Radio>
                <Radio value="More than half days">
                  More than half days/अर्ध्याहून अधिक दिवस
                </Radio>
                <Radio value="Nearly every days">
                  Nearly every days / जवळजवळ प्रत्येक दिवस
                </Radio>
              </Radio.Group>
            </QuestionRow>

            <QuestionRow>
              <QuestionCol style={{ width: "100%" }}>
                २. निराश किंवा उदासीन असणे ? Being depressed ?
              </QuestionCol>
              <Radio.Group
                style={{ margin: "1% 7%" }}
                // onChange={(e) => handlePartDQuestions(2, e.target.value)}
                value={question2D[0]}
              >
                <Radio value="Not at all">Not at all/अजिबात नाही</Radio>
                <Radio value="Several days">Several days/अनेक दिवस</Radio>
                <Radio value="More than half days">
                  More than half days/अर्ध्याहून अधिक दिवस
                </Radio>
                <Radio value="Nearly every days">
                  Nearly every days/जवळजवळ प्रत्येक दिवस
                </Radio>
              </Radio.Group>
            </QuestionRow>
            <SubmitButtonDiv>
              <Button onClick={() => onKeyChange("3")}>Back</Button>
              <SubmitButton onClick={() => onKeyChange("5")}>Next</SubmitButton>
            </SubmitButtonDiv>
          </Tabs.TabPane>
          <Tabs.TabPane tab="5) Part E / भाग ई" key="5">
            <QuestionRow>
              <QuestionCol>1. ताप / Fever ?</QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleDoYouHaveFever(1, e.target.value)}
                  value={doYouhaveFever1[0]}
                >
                  <Radio value="For 7 days or more">
                    7 दिवसांपेक्षा जास्त काळ / More than 7 days
                  </Radio>
                  <Radio value="Less than 7 days">
                    7 दिवसांपेक्षा कमी / Less than 7 days
                  </Radio>
                  <Radio value="No">नाही / No</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>2.थंडी वाजून येणे सह / With Chills</QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleDoYouHaveFever(2, e.target.value)}
                  value={doYouhaveFever2[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>3. रॅश सह / With Rash</QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleDoYouHaveFever(3, e.target.value)}
                  value={doYouhaveFever3[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>4. रक्तस्त्राव सह / with Bleeding</QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleDoYouHaveFever(4, e.target.value)}
                  value={doYouhaveFever4[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>5. संवेदना सह / with Altered Sensorium</QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleDoYouHaveFever(5, e.target.value)}
                  value={doYouhaveFever5[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>

            <div>
              <p
                style={{
                  fontSize: "15px",
                  margin: "25px 20px",
                  fontWeight: "600",
                }}
              >
                {" "}
                लेप्टोस्पायरोसिस / leptospirosis
              </p>
            </div>

            <QuestionRow>
              <QuestionCol>
                1.तुम्ही अनेकदा पाण्यात वावरता का? / Do you Waddling in water
                often?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleLeptospirosis(1, e.target.value)}
                  value={leptospirosis1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                2. गुरेढोरे / कुत्रा / मांजर / डुक्कर / उंदीर यांसारख्या पाळीव
                प्राण्यांच्या संपर्कात येणे? / Exposure to domestic animal like
                cattle / Dog / Cat / Pig / Rodent?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleLeptospirosis(2, e.target.value)}
                  value={leptospirosis2[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>

            <div>
              <p
                style={{
                  fontSize: "15px",
                  margin: "25px 20px",
                  fontWeight: "600",
                }}
              >
                {" "}
                जुलाब / loose motion{" "}
              </p>
            </div>

            <>
              <QuestionRow>
                <QuestionCol>A. जुलाब / Loose Motion</QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    // onChange={(e) => handleLooseMotion(1, e.target.value)}
                    value={looseMotion1[0]}
                  >
                    <Radio value="Yes">Yes / होय</Radio>
                    <Radio value="No">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>B. रक्तासह / With Blood</QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    // onChange={(e) => handleLooseMotion(2, e.target.value)}
                    value={looseMotion2[0]}
                  >
                    <Radio value="Yes">Yes / होय</Radio>
                    <Radio value="No">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>C. उलट्या होणे / Vomitting</QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    // onChange={(e) => handleLooseMotion(3, e.target.value)}
                    value={looseMotion3[0]}
                  >
                    <Radio value="Yes">Yes / होय</Radio>
                    <Radio value="No">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
            </>
            <div>
              <p
                style={{
                  fontSize: "15px",
                  margin: "25px 20px",
                  fontWeight: "600",
                }}
              >
                {" "}
                Hepatitis / Jaundice
              </p>
            </div>
            <QuestionRow>
              <QuestionCol>
                A. तुम्ही बाहेरचे/ उघडे अन्न खाता/ दूषित पाणी पिता का? /Do you
                eating outside / uncovered food / drinking contaminated water ?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleHepatitis(1, e.target.value)}
                  value={hepatitis1[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>

            <div>
              <p
                style={{
                  fontSize: "15px",
                  margin: "25px 20px",
                  fontWeight: "600",
                }}
              >
                {" "}
                Bite
              </p>
            </div>

            <QuestionRow>
              <QuestionCol>
                6. तुम्हाला प्राण्यांनी चावले आहे का ? did animals have Bitten
                you ?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleAnimalBitten(e.target.value)}
                  value={animalBitten[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                7. तुम्हाला साप चावला आहे का ? did Snake have Bitten you ?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleSnakeBitten(e.target.value)}
                  value={snakeBitten[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>
            <QuestionRow>
              <QuestionCol>
                8. मधुमेहाच्या गुंतागुंतीमुळे विच्छेदन करण्याचा इतिहास? History
                of amputation due to diabetes complication ?
              </QuestionCol>
              <AnswerCol>
                <Radio.Group
                  // onChange={(e) => handleDiabetes(e.target.value)}
                  value={diabetes[0]}
                >
                  <Radio value="Yes">Yes / होय</Radio>
                  <Radio value="No">No / नाही</Radio>
                </Radio.Group>
              </AnswerCol>
            </QuestionRow>

            <SubmitButtonDiv>
              <Button onClick={() => onKeyChange("4")}>Back</Button>
              <SubmitButton onClick={handleFormSubmit}>Next</SubmitButton>
            </SubmitButtonDiv>
          </Tabs.TabPane>
        </DocsTab>
      )}

      {/* Blood Consent Modal */}
      <Modal
        open={consentModalShow}
        onCancel={handleConsentModalClose}
        footer={
          <SubmitButton onClick={() => handleUpdate()}>Update</SubmitButton>
        }
      >
        <div>
          <p>
            Would you like to mark the citizen as vulnerable citizen?
            <span>
              <Checkbox
                style={{ margin: "0% 5%" }}
                checked={vulnerable}
                onClick={handleVulnerableClick}
              ></Checkbox>
            </span>
          </p>
          {vulnerable ? (
            <div>
              {vulnerableList.map((data) => (
                <li>
                  <Checkbox
                    key={data.id}
                    // value={data.choice}
                    checked={selectVulnerableList.includes(data.id)}
                    onChange={(e) => handleVulnerableList(e.target.value)}
                  >
                    {data.choice}
                  </Checkbox>
                </li>
              ))}
            </div>
          ) : (
            <></>
          )}
          {selectVulnerableList.includes("Any other reason") ? (
            <TextArea
              placeholder="Enter other reason here"
              style={{ width: "80%" }}
              value={vulnerableReason}
              rows={2}
            />
          ) : (
            <></>
          )}

          <div>
            <h4>REFERRAL OPTIONS :</h4>
          </div>
          {refarralList.map((data) => (
            <li>
              <Checkbox
                key={data.id}
                // value={data.id}
                checked={selectedReferalList.includes(data.id)}
                onChange={(e) => {
                  handleReferralList(e.target.value);
                }}
              >
                {data.choice}
              </Checkbox>
            </li>
          ))}
          {/* <Checkbox>Referral for further management (Known case)</Checkbox>
            <Checkbox style={{ margin: "0% 0.3%" }}>
              Referral for further Diagnosis
            </Checkbox>
            <Checkbox>Referral in case of suspect symptoms</Checkbox>
            <Checkbox>
              Referral in case of multiple co-morbid investigation
            </Checkbox>
            <Checkbox>Referral for blood collection</Checkbox> */}
        </div>

        <>
          <BloodSampleText>BLOOD COLLECTION / रक्त संकलन :</BloodSampleText>
          <BloodLogoImage src="blood-analysis.png"></BloodLogoImage>
          <BloodSampleButtonsRow>
            <BloodSampleButtonCol>
              <Button
                style={
                  bloodSampleHome
                    ? { backgroundColor: "#E9B384", width: "200px" }
                    : { backgroundColor: "white", width: "200px" }
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
                    ? { backgroundColor: "#E9B384", width: "200px" }
                    : { backgroundColor: "white", width: "200px" }
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
                    ? { backgroundColor: "#E9B384", width: "200px" }
                    : { backgroundColor: "white", width: "200px" }
                }
                onClick={handleBloodSampleDesiedSelect}
              >
                <span style={{ marginRight: "10px" }}>
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                Denied / नाकारले
              </Button>
              {bloodSampleDenied ? (
                <div style={{ margin: "10px 25px" }}>
                  <Radio.Group value={deniedBy}>
                    <Radio value="byindividual">By Individual</Radio>
                    <br />
                    <Radio value="byamo">By AMO</Radio>
                  </Radio.Group>
                </div>
              ) : (
                <></>
              )}
            </BloodSampleButtonCol>
            <BloodSampleButtonCol>
              <Button
                style={
                  notRequired
                    ? { backgroundColor: "#E9B384", width: "210px" }
                    : { backgroundColor: "white", width: "210px" }
                }
                onClick={handleNotRequiredSelect}
              >
                <span style={{ marginRight: "10px" }}>
                  <FontAwesomeIcon icon={faXmark} />
                </span>
                Not required / आवश्यक नाही
              </Button>
            </BloodSampleButtonCol>
          </BloodSampleButtonsRow>
        </>

        {/* {bloodSampleHome ? (
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
          )} */}

        {/* <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "10%",
          }}
        >
          <Checkbox onChange={(e) => handlePartialSelect(e)}></Checkbox>
          <h4 style={{ marginLeft: "10px" }}>Partial Submit</h4>
        </div> */}
      </Modal>
    </>
  );
}

export default MemberUpdate;
