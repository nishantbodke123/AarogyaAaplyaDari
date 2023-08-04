import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import {
  AnswerCol,
  Column,
  FormContainer,
  FormHeader,
  FormItem,
  ModalFormItem,
  QuestionCol,
  QuestionRow,
  SubmitButton,
  SubmitButtonDiv,
} from "./style";
import { Button, Form, Input, Modal, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";

function FamilyHead(props) {
  const [showModal, setShowModal] = useState(false);
  const [noOfMember, setNoOfMember] = useState(1);
  useEffect(() => {
    setShowModal(true);
  }, []);
  const handleShowModalClose = () => {
    setShowModal(false);
  };

  //Family Head Form States

  const [firstName, setFirstName] = useState();
  const [middelName, setMiddleName] = useState();
  const [lastName, setLastName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [addressLine1, setAddressLine1] = useState();
  const [pincode, setPinCode] = useState();
  const [totalFamilyMembers, setTotalFamilyMembers] = useState();
  const [ward_name, setWard_name] = useState();
  const [healthPost, setHealthPost] = useState();

  const handleFamilyMembers = (e) => {
    props.handleSetNoOfFamilyMember(e.target.value);
    setTotalFamilyMembers(e.target.value);
  };

  return (
    <>
      <FormHeader>Family Head/ कुटुंब प्रमुख</FormHeader>
      <FormContainer layout="vertical">
        <Row>
          <Column>
            <FormItem label="First Name">
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
                type="number"
                onChange={(e) => setMobileNo(e.target.value)}
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
          <Column>
            <FormItem label="Pin Code / पिन कोड">
              <Input
                type="number"
                onChange={(e) => setPinCode(e.target.value)}
              ></Input>
            </FormItem>
          </Column>
        </Row>
        <Row>
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
        <SubmitButton onClick={() => props.setFamilyHeadRegistered()}>
          Submit & Continue
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
  );
}

export default FamilyHead;
