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
import { faHouse, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

function MemberAdd(props) {
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
  }, []);

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

  // Part A question's state
  const [question1A, setQuestion1A] = useState("");
  const [question2A, setQuestion2A] = useState("");
  const [question3A, setQuestion3A] = useState("");
  const [question4A, setQuestion4A] = useState("");
  const [question5A, setQuestion5A] = useState("");
  const [question6A, setQuestion6A] = useState("");

  //Part D question's state
  const [question1D, setQuestion1D] = useState("");
  const [question2D, setQuestion2D] = useState("");

  //Part E question's state

  //E6
  const [animalBitten, setAnimalBitten] = useState("");

  //E7
  const [snakeBitten, setSnakeBitten] = useState("");

  const [familyMembersArray, setFamilyMembersArray] = useState([]);

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
    familyHead: state,
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
            {
              headers: sessionStorage.getItem("Token"),
            }
          ),
          axios.get(`${BASE_URL}/healthworker/api/verifyabhaId/${abhaId}`, {
            headers: sessionStorage.getItem("Token"),
          }),
        ]);

        const adharNoStatus = aadharResponse.status;
        const abhaNoStatus = abhaResponse.status;

        console.log(adharNoStatus, "+", abhaNoStatus, "+", age);

        if (adharNoStatus === 200 && abhaNoStatus === 200 && age >= 60) {
          handleConsentModalShow();
        } else if (adharNoStatus === 200 && abhaNoStatus === 200) {
          handleAdd();
        } else {
          message.warning("Not Submitted");
        }
      } catch (error) {
        message.warning(error.response.data.message);
      }
    }
  };

  const handleAdd = () => {
    axios
      .post(
        `${BASE_URL}/healthworker/api/PostFamilyDetails`,
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
        message.warning(error.response.data.message);
      });
  };

  return (
    <>
      {console.log(state)}
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
                  onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setAadharCard(e.target.value)}
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
                  onChange={(e) => setAge(e.target.value)}
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
                  onChange={(e) => setPhone(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Abha ID / आभा आयडी">
                <Input
                  type="text"
                  value={abhaId}
                  maxLength={14}
                  required
                  onChange={(e) => setAbhaId(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
          </Row>
          <Row>
            <Column>
              <FormItem label="Pulse">
                <Input
                  type="text"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Blood Pressure">
                <Input
                  type="text"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Weight">
                <Input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
          </Row>
          <Row>
            <Column>
              <FormItem label="Height">
                <Input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="BMI">
                <Input
                  type="text"
                  value={BMI}
                  onChange={(e) => setBMI(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Cbac Score ">
                <Input
                  type="text"
                  value={cbacScore}
                  onChange={(e) => setCbacScore(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
          </Row>
        </FormContainer>
      </Container>
      {age <= 30 ? (
        <>
          <SubmitButtonDiv>
            <SubmitButton onClick={() => handleAdd()}>Submit</SubmitButton>
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
                    onChange={(e) => setQuestion1A(e.target.value)}
                    value={question1A}
                  >
                    <Radio value="60 to 79 Years">
                      60 to 79 Years / 60 ते 79 वर्षे
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
                    onChange={(e) => setQuestion2A(e.target.value)}
                    value={question2A}
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
                    onChange={(e) => setQuestion3A(e.target.value)}
                    value={question3A}
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
                    onChange={(e) => setQuestion4A(e.target.value)}
                    value={question4A}
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
                    onChange={(e) => setQuestion5A(e.target.value)}
                    value={question5A}
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
                    onChange={(e) => setQuestion6A(e.target.value)}
                    value={question6A}
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
              {partB1Options.map((item, key) => (
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
              ))}
              <FormHeader>B2 : Women only / बी २ : केवळ महिला</FormHeader>
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
              ))}

              <FormHeader>
                B3 : For Senior Citizens (60 years and above)/बी ३ :
                वयोवृध्दांसाठी (६० वर्ष व त्यापेक्षा अधिक)
              </FormHeader>
              {partB3Options.map((item, key) => (
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
              ))}

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
                <QuestionCol>
                  1. तुम्हाला ताप आहे का? / Do you have fever?
                </QuestionCol>
                {/* <AnswerCol>
              <Radio.Group
                onChange={(e) => setDoYouHaveFever(e.target.value)}
                value={doYouhaveFever}
              >
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol> */}
              </QuestionRow>

              <>
                {partE1Options.map((item, index) => (
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
                ))}
              </>

              <QuestionRow>
                <QuestionCol>
                  2. डोळ्यांच्या बुबुळाच्या पुढील भागाचा होणारा दाह (डोळा येणे)
                  ? Conjuctivitis ?
                </QuestionCol>
                {/* <AnswerCol>
              <Radio.Group
                onChange={(e) => setConjuctivitis(e.target.value)}
                value={conjuctivitis}
              >
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol> */}
              </QuestionRow>

              <>
                {partE2Options.map((item, index) => (
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
                ))}
              </>

              <QuestionRow>
                <QuestionCol>
                  3. तुम्हाला लेप्टोस्पायरोसिस आहे का? Do you have
                  leptospirosis? ?
                </QuestionCol>
                {/* <AnswerCol>
              <Radio.Group
                onChange={(e) => setLeptospirosis(e.target.value)}
                value={leptospirosis}
              >
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol> */}
              </QuestionRow>

              {partE3Options.map((item, index) => (
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
              ))}

              <QuestionRow>
                <QuestionCol>
                  4. तुम्हाला जुलाब, हगवण, संडास आहे का ? Do you have loose
                  motion ?
                </QuestionCol>
                {/* <AnswerCol>
              <Radio.Group
                onChange={(e) => setLooseMotion(e.target.value)}
                value={looseMotion}
              >
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol> */}
              </QuestionRow>

              <>
                {partE4Options.map((item, index) => (
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
                ))}
              </>

              <QuestionRow>
                <QuestionCol>
                  5. तुम्हाला लिव्हरला सूज / कावीळ आहे का ? Do you have
                  Hepatitis / Jaundice ?
                </QuestionCol>
                {/* <AnswerCol>
              <Radio.Group
                onChange={(e) => setHepatitis(e.target.value)}
                value={hepatitis}
              >
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol> */}
              </QuestionRow>

              <>
                {partE5Option.map((item, index) => (
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
                ))}
              </>

              <QuestionRow>
                <QuestionCol>
                  6. तुम्हाला प्राण्यांनी चावले आहे का ? did animals have Bitten
                  you ?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => setAnimalBitten(e.target.value)}
                    value={animalBitten}
                  >
                    <Radio value="Animal Bite">Yes / होय</Radio>
                    <Radio value="">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  7. तुम्हाला साप चावला आहे का ? did Snake have Bitten you ?
                </QuestionCol>
                <AnswerCol>
                  <Radio.Group
                    onChange={(e) => setSnakeBitten(e.target.value)}
                    value={snakeBitten}
                  >
                    <Radio value="Snake_Bite">Yes / होय</Radio>
                    <Radio value="">No / नाही</Radio>
                  </Radio.Group>
                </AnswerCol>
              </QuestionRow>
              <QuestionRow>
                <QuestionCol>
                  8. तुम्हाला कुष्ठरोग आहे का ? do you have Leprosy ?
                </QuestionCol>
                {/* <AnswerCol>
              <Radio.Group
                onChange={(e) => setLeprosy(e.target.value)}
                value={leprosy}
              >
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol> */}
              </QuestionRow>

              <>
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
                ))}
                <SubmitButtonDiv>
                  <Button onClick={() => onKeyChange("4")}>Back</Button>
                  <SubmitButton onClick={() => handleFormSubmit()}>
                    {age > 60 ? "Next" : "Submit"}
                  </SubmitButton>
                </SubmitButtonDiv>
              </>
            </Tabs.TabPane>
          </DocsTab>
          <Modal
            open={consentModalShow}
            onCancel={handleConsentModalClose}
            title="Blood Sample / रक्त नमुना"
            footer={
              <SubmitButton onClick={() => handleAdd()}>Submit</SubmitButton>
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
            {bloodSampleDenied ? (
              <></>
            ) : (
              <>
                {" "}
                <div>
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
                </div>
              </>
            )}
          </Modal>
        </>
      )}
    </>
  );
}

export default MemberAdd;
