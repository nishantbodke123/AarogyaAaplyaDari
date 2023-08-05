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
} from "./style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

function FamilyHead(props) {
  const [familyHeadRegister, setFamilyHeadRegister] = useState("no");

  const [showModal, setShowModal] = useState(false);
  const [noOfMember, setNoOfMember] = useState(1);

  const handleShowModalClose = () => {
    setShowModal(false);
  };

  //Family Head Form States

  const [firstName, setFirstName] = useState();
  const [middelName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [plotNumber, setPlotNumber] = useState();
  const [addressLine1, setAddressLine1] = useState();
  const [pincode, setPinCode] = useState();
  const [totalFamilyMembers, setTotalFamilyMembers] = useState(1);
  const [ward_name, setWard_name] = useState();
  const [healthPost, setHealthPost] = useState();

  const Data = {
    ward_name: ward_name,
    firstName: firstName,
    middelName: middelName,
    lastName: lastName,
    mobileNo: mobileNo,
    plotNo: plotNumber,
    addressLine1: addressLine1,
    pincode: pincode,
    totalFamilyMembers: totalFamilyMembers,
    healthPost: healthPost,
  };

  const handleFamilyMembers = (e) => {
    setTotalFamilyMembers(e.target.value);
  };

  // Member's Form
  const [noOfMembersCompleted, setNoOfMembersComplted] = useState(1);
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
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [phone, setPhone] = useState();
  const [aadharCard, setAadharCard] = useState();
  const [abhaId, setAbhaId] = useState();

  // Part A question's state
  const [question1A, setQuestion1A] = useState("");
  const [question2A, setQuestion2A] = useState("");
  const [question3A, setQuestion3A] = useState("");
  const [question4A, setQuestion4A] = useState("");
  const [question5A, setQuestion5A] = useState("");
  const [question6A, setQuestion6A] = useState("");

  // Part B question's state
  const [question1B1, setQuestion1B1] = useState("");
  const [question2B1, setQuestion2B1] = useState("");
  const [question3B1, setQuestion3B1] = useState("");
  const [question4B1, setQuestion4B1] = useState("");
  const [question5B1, setQuestion5B1] = useState("");
  const [question6B1, setQuestion6B1] = useState("");
  const [question7B1, setQuestion7B1] = useState("");
  const [question8B1, setQuestion8B1] = useState("");
  const [question9B1, setQuestion9B1] = useState("");
  const [question10B1, setQuestion10B1] = useState("");
  const [question11B1, setQuestion11B1] = useState("");
  const [question12B1, setQuestion12B1] = useState("");
  const [question13B1, setQuestion13B1] = useState("");
  const [question14B1, setQuestion14B1] = useState("");
  const [question15B1, setQuestion15B1] = useState("");
  const [question16B1, setQuestion16B1] = useState("");
  const [question17B1, setQuestion17B1] = useState("");
  const [question18B1, setQuestion18B1] = useState("");
  const [question19B1, setQuestion19B1] = useState("");
  const [question20B1, setQuestion20B1] = useState("");
  const [question21B1, setQuestion21B1] = useState("");
  const [question22B1, setQuestion22B1] = useState("");
  const [question23B1, setQuestion23B1] = useState("");
  const [question24B1, setQuestion24B1] = useState("");
  const [question25B1, setQuestion25B1] = useState("");
  const [question26B1, setQuestion26B1] = useState("");
  const [question27B1, setQuestion27B1] = useState("");
  const [question28B1, setQuestion28B1] = useState("");
  const [question29B1, setQuestion29B1] = useState("");
  const [question30B1, setQuestion30B1] = useState("");
  const [question31B1, setQuestion31B1] = useState("");
  const [question32B1, setQuestion32B1] = useState("");

  //B2
  const [question1B2, setQuestion1B2] = useState("");
  const [question2B2, setQuestion2B2] = useState("");
  const [question3B2, setQuestion3B2] = useState("");
  const [question4B2, setQuestion4B2] = useState("");
  const [question5B2, setQuestion5B2] = useState("");
  const [question6B2, setQuestion6B2] = useState("");
  const [question7B2, setQuestion7B2] = useState("");

  //B3
  const [question1B3, setQuestion1B3] = useState("");
  const [question2B3, setQuestion2B3] = useState("");
  const [question3B3, setQuestion3B3] = useState("");
  const [question4B3, setQuestion4B3] = useState("");

  //Part C questions's state
  const [question1C, setQuestion1C] = useState("");
  const [question2C, setQuestion2C] = useState("");
  const [question3C, setQuestion3C] = useState("");

  //Part D question's state
  const [question1D, setQuestion1D] = useState("");
  const [question2D, setQuestion2D] = useState("");

  //Part E question's state
  //E1
  const [doYouhaveFever, setDoYouHaveFever] = useState("no");
  const [doYouhaveFever1, setDoYouHaveFever1] = useState();
  const [doYouhaveFever2, setDoYouHaveFever2] = useState();
  const [doYouhaveFever3, setDoYouHaveFever3] = useState();
  const [doYouhaveFever4, setDoYouHaveFever4] = useState();
  const [doYouhaveFever5, setDoYouHaveFever5] = useState();
  //E2
  const [conjuctivitis, setConjuctivitis] = useState("no");
  const [conjuctivitis1, setConjuctivitis1] = useState();
  const [conjuctivitis2, setConjuctivitis2] = useState();
  const [conjuctivitis3, setConjuctivitis3] = useState();
  //E3
  const [leptospirosis, setLeptospirosis] = useState("no");
  const [leptospirosis1, setLeptospirosis1] = useState();
  const [leptospirosis2, setLeptospirosis2] = useState();

  //E4
  const [looseMotion, setLooseMotion] = useState("no");
  const [looseMotion1, setLooseMotion1] = useState();
  const [looseMotion2, setLooseMotion2] = useState();
  const [looseMotion3, setLooseMotion3] = useState();

  //E5
  const [hepatitis, setHepatitis] = useState("no");
  const [hepatitis1, setHepatitis1] = useState();
  const [hepatitis2, setHepatitis2] = useState();
  const [hepatitis3, setHepatitis3] = useState();

  //E6
  const [animalBitten, setAnimalBitten] = useState("");

  //E7
  const [snakeBitten, setSnakeBitten] = useState("");

  //E8
  const [leprosy, setLeprosy] = useState("");
  const [leprosy1, setLeprosy1] = useState();
  const [leprosy2, setLeprosy2] = useState();
  const [leprosy3, setLeprosy3] = useState();
  const [leprosy4, setLeprosy4] = useState();
  const [leprosy5, setLeprosy5] = useState();

  return familyHeadRegister == "no" ? (
    <>
      <FormHeader>
        Family Head/ कुटुंब प्रमुख{" "}
        <Button
          style={{ marginLeft: "70%" }}
          onClick={() => setShowModal(true)}
        >
          Select Ward
        </Button>
      </FormHeader>
      <FormContainer layout="vertical">
        <Row>
          <Column>
            <FormItem label="First Name / पहिले नाव">
              <Input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              ></Input>
            </FormItem>
          </Column>
          <Column>
            <FormItem label="Middle Name /मधले नाव">
              <Input
                type="text"
                onChange={(e) => setMiddleName(e.target.value)}
              ></Input>
            </FormItem>
          </Column>
          <Column>
            <FormItem label="Last Name/आडनाव">
              <Input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              ></Input>
            </FormItem>
          </Column>
        </Row>
        <Row>
          <Column>
            <FormItem label="Mobile Number/ मोबाईल नंबर">
              <Input
                type="text"
                defaultValue="+91"
                onChange={(e) => setMobileNo(e.target.value)}
              ></Input>
            </FormItem>
          </Column>
          <Column>
            <FormItem label="Plot Number / Flat Number / प्लॉट क्रमांक / फ्लॅट क्रमांक ">
              <Input
                type="text"
                onChange={(e) => setPlotNumber(e.target.value)}
              ></Input>
            </FormItem>
          </Column>
          <Column>
            <FormItem label="Address / पत्ता">
              <TextArea
                onChange={(e) => setAddressLine1(e.target.value)}
              ></TextArea>
            </FormItem>
          </Column>
        </Row>
        <Row>
          <Column>
            <FormItem label="Pin Code / पिन कोड">
              <Input
                type="number"
                onChange={(e) => setPinCode(e.target.value)}
              ></Input>
            </FormItem>
          </Column>
          <Column>
            <FormItem label="Number of family members above age of 50 years / 50 पेक्षा जास्त वयाच्या कुटुंबातील सदस्यांची संख्या">
              <Input
                type="number"
                onChange={(e) => handleFamilyMembers(e)}
              ></Input>
            </FormItem>
          </Column>
        </Row>
      </FormContainer>
      <SubmitButtonDiv>
        <SubmitButton onClick={() => setFamilyHeadRegister("yes")}>
          Next
        </SubmitButton>
      </SubmitButtonDiv>
      <Modal
        open={showModal}
        onCancel={handleShowModalClose}
        title="Municipal Corporation Of Greater Mumbai / बृहन्मुंबई महानगरपालिका"
        footer={
          <>
            <Button onClick={() => handleShowModalClose()}>Cancel</Button>
            <SubmitButton>Submit</SubmitButton>
          </>
        }
      >
        <div>
          <Form layout="vertical">
            <ModalFormItem label="Select Ward / प्रभाग निवडा">
              <Select onChange={(e) => setWard_name(e.target.value)}>
                <Option value="Ward 1">Ward 1</Option>
                <Option value="Ward 2">Ward 2</Option>
              </Select>
            </ModalFormItem>
            <ModalFormItem label="Select Health Post / आरोग्य पोस्ट निवडा">
              <Select onChange={(e) => setHealthPost(e.target.value)}>
                <Option>Post 1</Option>
                <Option>Post 2</Option>
              </Select>
            </ModalFormItem>
          </Form>
        </div>
      </Modal>
    </>
  ) : (
    <>
      <Container>
        <FormHeader>
          1.Family Member {noOfMembersCompleted} out of {totalFamilyMembers}/
          कुटुंबातील सदस्य
          {totalFamilyMembers} पैकी {noOfMembersCompleted}
        </FormHeader>

        <FormContainer layout="vertical">
          <Row>
            <Column>
              <FormItem label="Name /  नाव">
                <Input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Aadhar Card Number/ आधार क्रमांक">
                <Input
                  type="number"
                  onChange={(e) => setAadharCard(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Gender / लिंग">
                <Select onChange={(e) => setGender(e.target.value)}>
                  <Option value="male">Male/ पुरुष</Option>
                  <Option value="female">Female / स्त्री</Option>
                </Select>
              </FormItem>
            </Column>
          </Row>

          <Row>
            <Column>
              <FormItem label="Age / वय">
                <Input
                  type="number"
                  onChange={(e) => setAge(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Mobile Number / मोबाईल नंबर">
                <Input
                  defaultValue="+91"
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
            <Column>
              <FormItem label="Abha Card ID / आभा कार्ड आयडी">
                <Input
                  type="text"
                  onChange={(e) => setAbhaId(e.target.value)}
                ></Input>
              </FormItem>
            </Column>
          </Row>
          <Row></Row>
        </FormContainer>
      </Container>
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
              <Input
                style={{ width: "300px" }}
                type="text"
                placeholder="0"
                onChange={(e) => setQuestion1A(e.target.value)}
              ></Input>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २. तुम्ही धूम्रपान किंवा धूर रहित उत्पादने जसे गुटखा व खैनीसारख्या
              वापर करता ? / Do you smoke or smokeless products like gutkha and
              Use like Khaini?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion2A(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ३. तुम्ही दररोज मद्यपान करता ? / Do you drink alcohol every day?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion3A(e.target.value)}>
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
              <Input
                style={{ width: "300px" }}
                type="text"
                placeholder="0"
                onChange={(e) => setQuestion4A(e.target.value)}
              ></Input>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ५. तुम्ही एका आठवडयामध्ये कमीत कमी १५० मिनिटे कोणत्याही प्रकारचे
              शारीरिक हालचाल करता का ? (दररोज कमीत कमी ३०मिनिटे – आठवडयातून ५
              दिवस) / Do you do any type of physical activity for at least 150
              minutes a week? (Minimum 30 minutes per day – 5 days per week)
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion5A(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ६. आपल्याकडे कौटुंबिक इतिहास आहे का ? (आपले पालक किंवा भावंडां
              पैकी) उच्च रक्तदाब, मधुमेह आणि हृदयरोग आहे का ? / 6. Do you have a
              family history? Have high blood pressure, diabetes and heart
              disease (from your parents or siblings)?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onClick={(e) => setQuestion6A(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <SubmitButtonDiv>
            <SubmitButton onClick={() => onKeyChange("2")}>Next</SubmitButton>
          </SubmitButtonDiv>
        </Tabs.TabPane>
        <Tabs.TabPane tab="2) Part B/भाग ब" key="2">
          <FormHeader>
            B: Early Screening: Ask the patient if they have any of these
            symptoms / लवकर तपासणी : रुग्णाला यापैकी काही लक्षणे आहेत का ते
            विचारा
          </FormHeader>
          <FormHeader>B1 : Female and male / बी १ : महिला आणि पुरुष</FormHeader>
          <QuestionRow>
            <QuestionCol>
              १. धाप लागणे (श्वास घेण्यास त्रास होणे) / Shortness of breath
              (difficulty breathing)
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion1B1(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion2B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>३. थुंकीत रक्त येणे/ Blood in sputum</QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion3B1(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion4B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>५. वजन कमी होणे/ Weight loss</QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion5B1(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion6B1(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion7B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ८. सध्या कुटुंबातील कोणत्याही सदस्याला टीबीचा आजार आहे का ? / Is
              any family member currently suffering from TB disease?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion8B1(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion9B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              १०. हात आणि पायाच्या तळव्यांना वारंवार जखमा होणे / 10. Frequent
              bruising of hands and soles of feet
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion10B1(e.target.value)}>
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
              <Radio.Group onClick={(e) => setQuestion11B1(e.target.value)}>
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
              <Radio.Group onClick={(e) => setQuestion12B1(e.target.value)}>
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
              <Radio.Group>
                <Radio
                  value="yes"
                  onClick={(e) => setQuestion13B1(e.target.value)}
                >
                  Yes / होय
                </Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              १४. एक आठवडयापेक्षा जास्त डोळयामधील वेदना बरी न होणे / Non-relief
              of eye pain for more than a week
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onClick={(e) => setQuestion14B1(e.target.value)}>
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
              <Radio.Group onClick={(e) => setQuestion15B1(e.target.value)}>
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
              <Radio.Group onClick={(e) => setQuestion16B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>१७. फीटक्याचा इतिहास / History of Featka</QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion17B1(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion18B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              १९. दोन आठवडयांपेक्षा जास्त तोंडातील जखम बरी न होणे / Non-healing
              of mouth sores for more than two weeks
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion19B1(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion20B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २१. दोन आठवडयांपेक्षा जास्त तोंडामध्ये पांढरे किंवा लाल घट्टे बरे
              न होणे / Non-healing white or red sores in the mouth for more than
              two weeks
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion21B1(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion22B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>२३. आवाजात बदल होणे/ Changes in voice</QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion23B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २४. तोंडामध्ये हलक्या रंगाचे चट्टे किंवा वर्ण होणे ज्यास संवेदना
              नसणे/ Light colored patches or spots in the mouth with no
              sensation
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion24B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २५. शरीराच्या कोणत्याही भागात त्वचा जाड होणे/ Thickening of the
              skin in any part of the body
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion25B1(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion26B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २७. हात आणि पायावर तळव्यांना वारंवार सुन्न होणे/ Frequent numbness
              of palms on hands and feet
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion27B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>{" "}
          <QuestionRow>
            <QuestionCol>
              २८. हाताची आणि पायाची बोटे वाकडी होणे/ Crooked fingers and toes
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion28B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २९. हातांना आणि पायांना मुंग्या येणे आणि बधिर होणे/ Tingling in
              hands and feet and deafness
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion29B1(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion30B1(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion31B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ३२. पायातील दुबळेपणामुळे चालण्यास त्रास होणे/ Difficulty walking
              due to weakness in legs
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion32B1(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <FormHeader>B2 : Women only / बी २ : केवळ महिला</FormHeader>
          <QuestionRow>
            <QuestionCol>
              १. स्तनामध्ये गाठ असणे/ Having a lump in the breast
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion1B2(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २. स्तनाग्रातून रक्त मिश्रीत स्त्राव होणे/ Bloody discharge from
              the nipple
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion2B2(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion3B2(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ४. दोन मासिक पाळीच्या मध्ये रक्त स्त्राव होणे/ Bleeding between
              two periods
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion4B2(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ५. मासिक पाळी बंद झाल्यानंतर रक्तस्त्राव होणे/ Bleeding after
              cessation of menstruation
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion5B2(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ६. संभोगानंतर रक्तस्त्राव/ Bleeding after cessation of
              menstruation
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion6B2(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ७. योनीमधून दुर्गंधीयुक्त स्त्राव/ Foul smelling vaginal discharge
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion7B2(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <FormHeader>
            B3 : For Senior Citizens (60 years and above)/बी ३ : वयोवृध्दांसाठी
            (६० वर्ष व त्यापेक्षा अधिक)
          </FormHeader>
          <QuestionRow>
            <QuestionCol>
              १. उभे असताना किंवा चालताना तुम्हाला अस्थिरपणा वाटतो का ?/ Do you
              feel unsteady while standing or walking?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion1B3(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २. शारीरिक अपंगत्वाने ग्रस्त असल्यास हालचाली करण्यास अडथळा येणे/
              Impairment of movement if suffering from physical disability
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion2B3(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ३. खाणे, कपडे घालणे, परिधान करणे, आंघोळ करणे, चालणे किंवा शौचालय
              वापरणे यासारख्या दैनंदिन क्रिया करण्यासाठी आपल्याला इतरांच्या
              मदतीची आवश्यकता आहे का ?/ Do you need help from others to perform
              daily activities such as eating, dressing, dressing, bathing,
              walking or using the toilet?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setQuestion3B3(e.target.value)}>
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
              <Radio.Group onChange={(e) => setQuestion4B3(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <SubmitButtonDiv>
            <SubmitButton onClick={() => onKeyChange("3")}>Next</SubmitButton>
          </SubmitButtonDiv>
        </Tabs.TabPane>
        <Tabs.TabPane tab="3) Part C / भाग क" key="3">
          <FormHeader>
            C: Risk factors for COPD / भाग सी : सीओपीडीसाठी जोखीम घटक
          </FormHeader>
          <QuestionRow>
            <QuestionCol>
              १. सर्व लागू असलेले मंडळ / All applicable circles
            </QuestionCol>
            <AnswerCol>
              <InputForm
                type="text"
                onChange={(e) => setQuestion1C(e.target.value)}
              ></InputForm>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              २. स्वयंपाक करण्यासाठी वापरल्या जाणा-या इंधनाचा प्रकार – फायरवुड /
              पीक अवशेष / शेण केक / कोळसा / केरोसीन / एलपीजी / Type of fuel used
              for cooking – Firewood / Crop residue / Dung cake / Coal /
              Kerosene / LPG
            </QuestionCol>
            <AnswerCol>
              <TextAreaForm
                type="text"
                onChange={(e) => setQuestion2C(e.target.value)}
              ></TextAreaForm>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              ३. व्यावसायिक प्रदर्शनासह – पिकाचे अवशेष जाळणे / कचरा जाळणे – पाने
              / धूर, वायू आणि धूळ प्रदर्शनासह उद्योगांमध्ये काम करणे जसे की
              पीटभट्टया आणि काचेच्या कारखाने इ. / With occupational exposure –
              burning of crop residues / burning of waste – leaves / working in
              industries with exposure to fumes, gases and dust like peat kilns
              and glass factories etc.
            </QuestionCol>
            <AnswerCol>
              <TextAreaForm
                type="text"
                onChange={(e) => setQuestion3C(e.target.value)}
              ></TextAreaForm>
            </AnswerCol>
          </QuestionRow>
          <SubmitButtonDiv>
            <SubmitButton onClick={() => onKeyChange("4")}>Next</SubmitButton>
          </SubmitButtonDiv>
        </Tabs.TabPane>
        <Tabs.TabPane tab="4) Part D / भाग डी" key="4">
          <FormHeader>D : PHQ 2 / डी : पीएचक्यू २</FormHeader>
          <FormHeader>
            · गेल्या २ आठवडयांत, आपण खालील समस्यांद्वारे किती वेळा त्रास दिला
            आहे- / In the past 2 weeks, how often have you been bothered by the
            following problems? is-
          </FormHeader>
          <QuestionRow>
            <QuestionCol style={{ width: "100%" }}>
              १. गोष्टी करण्यात थोडीशी आवड किंवा आनंद असणे ? / Having little
              interest or pleasure in doing things?
            </QuestionCol>

            <Radio.Group
              style={{ margin: "1% 7%" }}
              onChange={(e) => setQuestion1D(e.target.value)}
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
            >
              <Radio value="Not at all">Not at all</Radio>
              <Radio value="Several days">Several days</Radio>
              <Radio value="More than half days">More than half days</Radio>
              <Radio value="Nearly every days">Nearly every days</Radio>
            </Radio.Group>
          </QuestionRow>
          <SubmitButtonDiv>
            <SubmitButton onClick={() => onKeyChange("5")}>Next</SubmitButton>
          </SubmitButtonDiv>
        </Tabs.TabPane>
        <Tabs.TabPane tab="5) Part E / भाग ई" key="5">
          <QuestionRow>
            <QuestionCol>
              1. तुम्हाला ताप आहे का? / Do you have fever?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setDoYouHaveFever(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          {doYouhaveFever == "yes" ? (
            <>
              <QuestionSubRow>
                <QuestionSubCol>
                  A. 7 दिवसांपेक्षा जास्त काळ / More than 7 days
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setDoYouHaveFever1(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  B. 7 दिवसांपेक्षा कमी / Less than 7 days
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setDoYouHaveFever2(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  C. थंडी वाजून येणे सह / With Chills
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setDoYouHaveFever3(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>D. रॅश सह / With Rash</QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setDoYouHaveFever4(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  E. रक्तस्त्राव सह / with Bleeding
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setDoYouHaveFever5(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
            </>
          ) : (
            <></>
          )}

          <QuestionRow>
            <QuestionCol>
              2. डोळ्यांच्या बुबुळाच्या पुढील भागाचा होणारा दाह (डोळा येणे) ?
              Conjuctivitis ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setConjuctivitis(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          {conjuctivitis == "yes" ? (
            <>
              <QuestionSubRow>
                <QuestionSubCol> A. पाणचट / Wattery</QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setConjuctivitis1(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol> B. लालसरपणा / redness</QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setConjuctivitis2(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  C. खाज सुटलेले डोळे / itching eyes
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setConjuctivitis3(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
            </>
          ) : (
            <></>
          )}

          <QuestionRow>
            <QuestionCol>
              3. तुम्हाला लेप्टोस्पायरोसिस आहे का? Do you have leptospirosis? ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setLeptospirosis(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          {leptospirosis == "yes" ? (
            <>
              <QuestionSubRow>
                <QuestionSubCol>
                  A.तुम्ही अनेकदा पाण्यात वावरता का? / Do you Waddling in water
                  often?
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setLeptospirosis1(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  B. गुरेढोरे / कुत्रा / मांजर / डुक्कर / उंदीर यांसारख्या पाळीव
                  प्राण्यांच्या संपर्कात येणे? / Exposure to domestic animal
                  like cattle / Dog / Cat / Pig / Rodent?
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setLeptospirosis2(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
            </>
          ) : (
            <></>
          )}

          <QuestionRow>
            <QuestionCol>
              4. तुम्हाला जुलाब, हगवण, संडास आहे का ? Do you have loose motion ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setLooseMotion(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          {looseMotion == "yes" ? (
            <>
              {" "}
              <QuestionSubRow>
                <QuestionSubCol> A. रक्तासह / With Blood</QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setLooseMotion1(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol> B. रक्ताशिवाय / Without Blood</QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setLooseMotion2(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol> C. उलट्या होणे / Vomitting</QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setLooseMotion3(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
            </>
          ) : (
            <></>
          )}

          <QuestionRow>
            <QuestionCol>
              5. तुम्हाला लिव्हरला सूज / कावीळ आहे का ? Do you have Hepatitis /
              Jaundice ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setHepatitis(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          {hepatitis == "yes" ? (
            <>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  A. तुम्ही बाहेरचे/ उघडे अन्न खाता/ दूषित पाणी पिता का? /Do you
                  eating outside / uncovered food / drinking contaminated water
                  ?
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setHepatitis1(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol> B. रक्ताशिवाय / Without Blood</QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setHepatitis2(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol> C. उलट्या होणे / Vomitting</QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setHepatitis3(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
            </>
          ) : (
            <></>
          )}

          <QuestionRow>
            <QuestionCol>
              6. तुम्हाला प्राण्यांनी चावले आहे का ? did animals have Bitten you
              ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setAnimalBitten(e.target.value)}>
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
              <Radio.Group onChange={(e) => setSnakeBitten(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          <QuestionRow>
            <QuestionCol>
              8. तुम्हाला कुष्ठरोग आहे का ? do you have Leprosy ?
            </QuestionCol>
            <AnswerCol>
              <Radio.Group onChange={(e) => setLeprosy(e.target.value)}>
                <Radio value="yes">Yes / होय</Radio>
                <Radio value="no">No / नाही</Radio>
              </Radio.Group>
            </AnswerCol>
          </QuestionRow>
          {leprosy == "yes" ? (
            <>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  A. बधीरपणा / हात/पायांमध्ये मुंग्या येणे ? / Numbness /
                  Tingling in hands/feet ?
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setLeprosy1(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  B. शरीराच्या कोणत्याही भागात संवेदना कमी होणे ? / Loss of
                  sensation in any parts of body ?
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setLeprosy2(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  C. चेहरा/हात/पायांवर सूज ? /Swelling / Nodule on
                  Face/Hands/Feet ?
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setLeprosy3(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  D. पापणी किंवा भुवया गळणे ? / Loss of eyelash or eyebrow ?
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setLeprosy4(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
              <QuestionSubRow>
                <QuestionSubCol>
                  {" "}
                  E. कानातले दाट ? / Thickened earlobes ?
                </QuestionSubCol>
                <AnswerSubCol>
                  <Checkbox
                    onChange={(e) => setLeprosy5(e.target.checked)}
                  ></Checkbox>
                </AnswerSubCol>
              </QuestionSubRow>
            </>
          ) : (
            <></>
          )}

          <SubmitButtonDiv>
            <SubmitButton onClick={handleConsentModalShow}>Submit</SubmitButton>
          </SubmitButtonDiv>
        </Tabs.TabPane>
      </DocsTab>
      {/* Blood Consent Modal */}
      <Modal
        open={consentModalShow}
        onCancel={handleConsentModalClose}
        title="Blood Sample / रक्त नमुना"
        footer={
          <SubmitButton
            onClick={() => {
              if (totalFamilyMembers - noOfMembersCompleted > 0) {
                onKeyChange("1");
                setNoOfMembersComplted(noOfMembersCompleted + 1);
              } else {
                window.location.reload();
              }
              handleConsentModalClose();
            }}
          >
            Submit
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
      </Modal>
    </>
  );
}

export default FamilyHead;
