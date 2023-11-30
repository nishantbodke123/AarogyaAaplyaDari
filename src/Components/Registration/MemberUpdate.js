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
    } else {
    }

    console.log(state.Questionnaire);
    setQuestion1A(state.Questionnaire.part_a[0].answer);
    setQuestion2A(state.Questionnaire.part_a[1].answer);
    setQuestion3A(state.Questionnaire.part_a[2].answer);
    setQuestion4A(state.Questionnaire.part_a[3].answer);
    setQuestion5A(state.Questionnaire.part_a[4].answer);
    setQuestion6A(state.Questionnaire.part_a[5].answer);

    // setPartB1OptionsSelected(state.Questionnaire.part_b[0].selectedOptions);
    for (let i = 0; i < 32; i++) {
      // console.log(state.Questionnaire.part_b[i].answer);
      let setStateFunction = eval(`setQuestion${i + 1}B1`);
      setStateFunction(state.Questionnaire.part_b[i].answer);
    }
    // setPartB2OptionSelected(state.Questionnaire.part_b[1].selectedOptions);

    for (let i = 0; i < 7; i++) {
      // console.log(state.Questionnaire.part_b[i+32].answer)
      let setStateFunction = eval(`setQuestion${i + 1}B2`);
      setStateFunction(state.Questionnaire.part_b[i + 32].answer);
    }
    // setPartB3OptionsSelected(state.Questionnaire.part_b[2].selectedOptions);
    for (let i = 0; i < 4; i++) {
      // console.log(state.Questionnaire.part_b[i+39].answer)
      let setStateFunction = eval(`setQuestion${i + 1}B3`);
      setStateFunction(state.Questionnaire.part_b[i + 32].answer);
    }

    // setPartC1OptionSelect(state.Questionnaire.part_c[0].selectedOptions);

    setPartC1OptionSelect(state.Questionnaire.part_c[0].answer);
    // setPartC2OptionSelect(state.Questionnaire.part_c[1].selectedOptions);
    setPartC2OptionSelect(state.Questionnaire.part_c[1].answer);

    setQuestion1D(state.Questionnaire.part_d[0].answer[0]);
    setQuestion2D(state.Questionnaire.part_d[1].answer[0]);
    for (let i = 0; i < 6; i++) {
      console.log(state.Questionnaire.part_e[i].answer);
      let setStateFunction = eval(`setDoYouHaveFever${i + 1}`);
      setStateFunction(state.Questionnaire.part_e[i].answer);
    }
    for (let i = 0; i < 3; i++) {
      console.log(state.Questionnaire.part_e[i + 7].answer);
      let setStateFunction = eval(`setConjuctivitis${i + 1}`);
      setStateFunction(state.Questionnaire.part_e[i + 7].answer);
    }
    for (let i = 0; i < 2; i++) {
      console.log(state.Questionnaire.part_e[i + 9].answer);
      let setStateFunction = eval(`setLeptospirosis${i + 1}`);
      setStateFunction(state.Questionnaire.part_e[i + 9].answer);
    }
    for (let i = 0; i < 3; i++) {
      console.log(state.Questionnaire.part_e[i + 11].answer);
      let setStateFunction = eval(`setLooseMotion${i + 1}`);
      setStateFunction(state.Questionnaire.part_e[i + 11].answer);
    }
    for (let i = 0; i < 1; i++) {
      console.log(state.Questionnaire.part_e[i + 14].answer);
      let setStateFunction = eval(`setHepatitis${i + 1}`);
      setStateFunction(state.Questionnaire.part_e[i + 14].answer);
    }

    setAnimalBitten(state.Questionnaire.part_e[15].answer);
    setSnakeBitten(state.Questionnaire.part_e[16].answer);
    for (let i = 0; i < 5; i++) {
      console.log(state.Questionnaire.part_e[i + 17].answer);
      let setStateFunction = eval(`setLeprosy${i + 1}`);
      setStateFunction(state.Questionnaire.part_e[i + 17].answer);
    }
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
    if (age >= 60) {
      handleConsentModalShow();
    } else {
      // handleUpdate();
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
  const [abhaId, setAbhaId] = useState("");
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
  const [question1D, setQuestion1D] = useState();
  const [question2D, setQuestion2D] = useState();

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
    questionsConsent: true,
    cbacScore: "4",
    Questionnaire: {
      part_a: [
        {
          qkey: "What_is_your_age_completeyears",
          type: "CO",
          score: "",
          options: ["50-79 year", "80 and 80 above"],
          translate: ["_year", "_and__above"],
          selectedOptions: [question1A],
        },
        {
          qkey: "Do_you_smoke_or_consume_smokeless_products_such_as_gutka_or_khaini",
          type: "CO",
          score: "",
          options: [
            "Never",
            "Used to consume in the past / Sometimes now",
            "Daily",
          ],
          translate: [
            "Never",
            "Used_to_consume_in_the_past_Sometimes_now",
            "Daily",
          ],
          selectedOptions: [question2A],
        },
        {
          qkey: "Do_you_consume_alcohol_daily",
          type: "CO",
          score: "",
          options: ["No", "Yes"],
          translate: ["No", "Yes"],
          selectedOptions: [question3A],
        },
        {
          qkey: "Measurement_of_waist_in_cm",
          type: "CO",
          score: "",
          options: ["80 cm or less", "81-100 cm", "More than 100 cm"],
          translate: ["cm_80_cm_or_less", "cm_81_100_cm", "More_than_100_cm"],
          selectedOptions: [question4A],
        },
        {
          qkey: "Do_you_undertake_any_physical_activities_for_minimum_of__minutes_in_a_week",
          type: "CO",
          score: "",
          options: [
            "At least 150 minutes in a week",
            "Less than 150 minutes in a week",
          ],
          translate: [
            "At_least_150_minutes_in_a_week",
            "Less_than_150_minutes_in_a_week",
          ],
          selectedOptions: [question5A],
        },
        {
          qkey: "Do_you_have_a_family_history_any_one_of_your_parents_or_siblings_of_high_blood_pressure_diabetes_and_heart_disease",
          type: "CO",
          score: "",
          options: ["No", "Yes"],
          translate: ["No", "Yes"],
          selectedOptions: [question6A],
        },
      ],
      part_b: [
        {
          qkey: "B_Women_and_Men",
          type: "MCQ",
          score: "",
          options: partB1Options,
          translate: [],
          selectedOptions: partB1OptionsSelected,
        },
        {
          qkey: "B_Women_only",
          type: "MCQ",
          score: "",
          options: partB2Options,
          translate: [],
          selectedOptions: partB2OptionSelected,
        },
        {
          qkey: "BFor_Senior_Citizens__years_and_above",
          type: "MCQ",
          score: "",
          options: partB3Options,
          translate: [],
          selectedOptions: partB3OptionsSelected,
        },
      ],
      part_c: [
        {
          qkey: "Type_of_Fuel_used_for_cooking",
          type: "MCQ",
          score: "",
          options: partC1Options,
          translate: [
            "Firewood",
            "Crop_Residue",
            "Cow_dung_cake",
            "Coal",
            "Kerosene",
            "LPG",
          ],
          selectedOptions: partC1OptionSelect,
        },
        {
          qkey: "Occupational_exposure",
          type: "MCQ",
          score: "",
          options: partC2Options,
          translate: [
            "Crop_residue_burning",
            "burning_of_garbage_leaves",
            "working_in_industries_with_smoke_gas_and_dust_exposure_such_as_brick_kilns_and_glass_factories_etc",
          ],
          selectedOptions: partC2OptionSelect,
        },
      ],
      part_d: [
        {
          qkey: "Little_interest_of_pleasure_in_doing_things",
          type: "CO",
          score: "",
          options: [
            "Not at all",
            "Several days",
            "More than half days",
            "Nearly every days",
          ],
          translate: [
            "Not_at_all",
            "Several_days",
            "More_than_half_days",
            "Nearly_every_days",
          ],
          selectedOption: [question1D],
        },
        {
          qkey: "Feeling_down_depressed_or_hopeless",
          type: "CO",
          score: "",
          options: [
            "Not at all",
            "Several days",
            "More than half days",
            "Nearly every days",
          ],
          translate: [
            "Not_at_all",
            "Several_days",
            "More_than_half_days",
            "Nearly_every_days",
          ],
          selectedOptions: [question2D],
        },
      ],
      part_e: [
        {
          qkey: "Fever",
          type: "MCQ",
          score: "",
          options: partE1Options,
          translate: [
            "More_than__days",
            "Less_than__days",
            "With_Chills",
            "With_Rash",
            "with_Bleeding",
            "with_Altered_Sensorium",
          ],
          selectedOptions: partE1OptionSelect,
        },
        {
          qkey: "Conjuctivitis",
          type: "MCQ",
          score: "",
          options: partE2Options,
          translate: ["watery", "redness", "itching_eyes"],
          selectedOptions: partE2OptionSelect,
        },
        {
          qkey: "Lepto",
          type: "MCQ",
          score: "",
          options: partE3Options,
          translate: [
            "Waddling_in_water",
            "Exposure_to_domestic_animal_like_cattle__Dog__Cat__Pig__Rodent",
          ],
          selectedOptions: partE3OptionSelect,
        },
        {
          qkey: "Loose_Motion",
          type: "MCQ",
          score: "",
          options: partE4Options,
          translate: ["With_Blood", "Without_Blood", "Vomitting "],
          selectedOptions: partE4OptionSelect,
        },
        {
          qkey: "Hepatitis__Jaundice",
          type: "MCQ",
          score: "",
          options: partE5Option,
          translate: [
            "Eating_outside__uncovered_food__drinking_contaminated_water",
          ],
          selectedOptions: partE5OptionSelect,
        },
        {
          qkey: "Animal_Bite",
          type: "MCQ",
          score: "",
          options: ["Animal Bite"],
          translate: ["Animal_Bite"],
          selectedOptions: [animalBitten],
        },
        {
          qkey: "Snake_Bite",
          type: "MCQ",
          score: "",
          options: ["Snake Bite"],
          translate: ["Snake_Bite"],
          selectedOptions: [snakeBitten],
        },
        {
          qkey: "Leprosy",
          type: "MCQ",
          score: "",
          options: partE8Options,
          translate: [
            "Numbness__Tingling_in_handsfeet",
            "Loss_of_sensation_in_any_parts_of_body",
            "Swelling__Nodule_on_FaceHandsFeet",
            "Loss_of_eyelash_or_eyebrow",
            "Thickened_earlobes",
          ],
          selectedOptions: partE8OptionSelect,
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
  };
  const handleUpdate = () => {
    if (age >= 60) {
      if (bloodSampleHome && demandLetter === "") {
        message.warning("Demand letter required");
      } else {
        if (bloodConsent || bloodSampleDenied) {
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
        } else {
          message.warning("Blood Sample Collection Consent Required");
        }
      }
    } else {
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
    }
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
                  onChange={(e) => handleNameChange(e)}
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
                </Select>
              </FormItem>
            </Column>
          </Row>

          <Row>
            <Column>
              {/*  rules={[{required:true ,message:"Age mention required / वय नमूद करणे आवश्यक आहे"}]} */}
              <FormItem label="Age / वय" required>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => handleAgeChange(e)}
                ></Input>
              </FormItem>
            </Column>
            <Column>
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
            <Column>
              <FormItem label="Abha ID / आभा आयडी">
                <Input
                  type="text"
                  value={abhaId}
                  required
                  maxLength={17}
                  onChange={(e) => handleAbhaIDChange(e)}
                  allowClear
                ></Input>
              </FormItem>
            </Column>
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
            {/* <Column>
              <FormItem label="Cbac Score ">
                <Input
                  type="text"
                  value={cbacScore}
                  onChange={(e) => setCbacScore(e.target.value)}
                ></Input>
              </FormItem>
            </Column> */}
          </Row>
        </FormContainer>
      </Container>
      {age <= 30 ? (
        <>
          <SubmitButtonDiv>
            <SubmitButton onClick={() => handleUpdate()}>Update</SubmitButton>
          </SubmitButtonDiv>
        </>
      ) : (
        <>
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
              {/* <FormHeader>B2 : Women only / बी २ : केवळ महिला</FormHeader>
              {partB2Options.map((item, key) => (
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
                      checked={partC1OptionSelect.includes(item)}
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
                        checked={partC2OptionSelect.includes(item)}
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
                  onChange={(e) => setQuestion1D(e.target.value)}
                  value={question1D}
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
                  onChange={(e) => setQuestion2D(e.target.value)}
                  value={question2D}
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

              <SubmitButtonDiv>
                <Button onClick={() => onKeyChange("4")}>Back</Button>

                {age >= 60 && (
                  <SubmitButton onClick={() => handleFormSubmit()}>
                    Next
                  </SubmitButton>
                )}
              </SubmitButtonDiv>
            </Tabs.TabPane>
          </DocsTab>
          <Modal
            open={consentModalShow}
            onCancel={handleConsentModalClose}
            title="Blood Sample / रक्त नमुना"
            footer={
              <></>
              // <SubmitButton onClick={() => handleUpdate()}>Update</SubmitButton>
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
                {/* <Form layout="vertical">
                  <Form.Item
                    label="Demand letter"
                    style={{ margin: "20px 5px", width: "200px" }}
                  >
                    <Input
                      type="file"
                      onChange={(e) => handleDemandLetter(e.target.files[0])}
                    ></Input>
                  </Form.Item>
                </Form> */}
              </>
            ) : (
              <></>
            )}
            {bloodSampleDenied ? (
              <></>
            ) : (
              <>
                {" "}
                {/* <div>
                  <p>
                    <Checkbox
                      style={{ marginRight: "10px" }}
                      checked={bloodConsent}
                      onChange={(e) => setBloodConsent(e.target.checked)}
                    ></Checkbox>
                    I have been explained about the consent as stated above and
                    hereby provide my consent for blood sample collection and
                    any more procedures for the aforementioned purposes.
                  </p>
                </div> */}
              </>
            )}
          </Modal>
        </>
      )}
    </>
  );
}

export default MemberUpdate;
