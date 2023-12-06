import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Modal, Tabs } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  margin: 5px;
  height: 150px;
  @media (max-width: 1200px) {
  }
  @media (max-width: 550) {
  }
`;
export const SubContainer = styled.div`
  display: flex;
  margin: 2% 5%;
`;
export const Box = styled.div`
  width: 240px;
  margin: 10px 20px;
  height: 110px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  border-radius: 15px 5px 5px 5px;
  &:hover {
    width: 240px;
    height: 110px;
    box-shadow: #ff8551 0px 4px 6px -1px, #ff8551 0px 2px 4px -1px;
  }
  @media (max-width: 1200px) {
    width: 200px;
    height: 110px;
      &:hover {
    width: 205px;
    height: 130px;
    box-shadow: #ff8551 0px 4px 6px -1px, #ff8551 0px 2px 4px -1px;
  }
  @media (max-width: 420px) {
    width: 185px;
    height: 120px;
      &:hover {
    width: 190px;
    height: 120px;
    box-shadow: #ff8551 0px 4px 6px -1px, #ff8551 0px 2px 4px -1px;
  }
  @media (max-width: 390px) {
    width: 170px;
      &:hover {
    width: 175px;
    box-shadow: #ff8551 0px 4px 6px -1px, #ff8551 0px 2px 4px -1px;
  }
  @media (max-width: 360px) {
    width: 150px;
      &:hover {
    width: 155px;
    
    box-shadow: #ff8551 0px 4px 6px -1px, #ff8551 0px 2px 4px -1px;
  }
`;
export const BoxContainer = styled.div`
  margin: 2px 10px;
  @media (max-width: 1200px) {
    margin: 1px 5px;
  }
`;
export const CountIcon = styled(FontAwesomeIcon)`
  margin: 15px 2px 0px 2px;
  @media (max-width: 1200px) {
    margin: 22px 5px;
  }
  @media (max-width: 415px) {
    display: none;
  }
`;
export const TableContainer = styled.div`
  margin: 50px 40px;

  @media (max-width: 550px) {
    margin: 50px 0px;
  }
`;
export const TableHeading = styled.p`
  font-size: 22px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 650;
  @media (max-width: 820px) {
    font-size: 18px;
  }
  @media (max-width: 450px) {
    font-size: 14px;
  }
`;

export const StyledTabs = styled(Tabs)`
  .ant-tabs-tab-btn {
    color: black;
    font-size: 15px;
    font-weight: 500;
    margin: 10px 50px;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ff8551;
    font-weight: 700;
    font-size: 15px;
  }
  .ant-tabs-ink-bar {
    background-color: #ff8551;
  }

  @media (max-width: 820px) {
    .ant-tabs-tab-btn {
      color: black;
      font-size: 13px;
      font-weight: 600;
      margin: 10px 0px;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #ff8551;
      font-weight: 500;
      font-size: 15px;
    }
    .ant-tabs-ink-bar {
      background-color: #ff8551;
    }
  }
  @media (max-width: 450px) {
    .ant-tabs-tab-btn {
      color: black;
      font-size: 10px;
      font-weight: 600;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #ff8551;
      font-weight: 700;
      font-size: 12px;
    }
    .ant-tabs-ink-bar {
      background-color: #ff8551;
    }
  }
`;

export const ViewButton = styled.button`
  border: none;
  cursor: pointer;
  width: 60px;
  height: 23px;
  border-radius: 10px;
  background-color: #ff8551;
  &:hover {
    color: white;
    background-color: #f29727;
  }
`;
export const ViewModal = styled(Modal)``;
export const UpdateButton = styled.button`
  border: none;
  width: 60px;
  height: 23px;
  border-radius: 10px;
  background-color: #adc4ce;
  &:hover {
    color: white;
    background-color: #4b527e;
  }
`;
export const UpdateModal = styled(Modal)``;
export const FormHeader = styled.p`
  font-weight: 650;
  margin: 30px 20px;

  // @media (max-width: 820px) {
  //   width: 450px;
  // }
  // @media (max-width: 450px) {
  //   width: 300px;
  // }
`;
export const FormContainer = styled(Form)`
  margin: 20px 40px;
`;
export const Column = styled(Col)`
  width: 33.33%;

  @media (max-width: 820px) {
    width: 70%;
  }
  @media (max-width: 450px) {
    width: 100%;
  }
`;
export const FormItem = styled(Form.Item)`
  width: 350px;

  @media (max-width: 820px) {
    width: 450px;
  }
  @media (max-width: 450px) {
    width: 300px;
  }
`;
export const ModalFormItem = styled(Form.Item)`
  width: 60%;
  margin: 10px 50px;
  @media (max-width: 820px) {
    margin: 10px 20px;
    width: 65%;
  }
  @media (max-width: 450px) {
    margin: 10px 20px;
    width: 80%;
  }
`;
export const SubmitButton = styled(Button)`
  background-color: #ff8551;
  color: black;
  font-weight: 600;
  margin-left: 10px;
  &:hover {
    background-color: #f29727;
    color: none;
  }
`;

export const AddButton = styled(Button)`
  background-color: #ffcc70;
  color: black;
  &:hover {
    background-color: #ee9322;
    color: white;
  }
`;
export const ColorStrip = styled.div`
  background-color: #ff8551;
  border-radius: 15px 0px;
  height: 15%;
`;
export const ToDayCitizenCountModal = styled(Modal)``;
export const ToDayFamilyCountModal = styled(Modal)``;
export const TotalCountModal = styled(Modal)``;
export const TotalFamilyCount = styled(Modal)``;
export const PartialSurveyCountModal = styled(Modal)``;
export const CardHeader = styled.p`
  font-weight: 700;
  font-family: Arial;
  margin-top: 15px;
  font-size: 13px;

  @media (max-width: 1200) {
    font-size: 15px;
    margin-top: 10px;
  }
`;
export const CardCount = styled.p`
  font-size: 25px;
  font-weight: 570;
  font-family: -moz-initial;
  margin: -5px 20px;
`;
export const DesktopContainer = styled.div`
  margin: 5px;
  height: 300px;
  @media (max-width: 1200px) {
  }
  @media (max-width: 1100px) {
    display: none;
  }
`;
export const MobileContainer = styled.div`
  margin: 2px 5px;
  @media (min-width: 1100px) {
    display: none;
  }
  @media (max-width: 1100) {
  }
`;
export const MobileCardColumn = styled(Col)`
  width: 25%;
  @media (max-width: 850px) {
    width: 33.33%;
  }
  @media (max-width: 650px) {
    width: 50%;
  }
`;
export const OuterCard = styled.div`
  background-color: #ffe5ad;
  width: 95%;
  height: 82%;
  margin: 31px 0px;
  border-radius: 10px;
  position: relative;
`;
export const InnerCard1 = styled.div`
  width: 45%;
  height: 35%;
  background-color: white;
  position: absolute;
  top: 7%;
  left: 2%;
  border-radius: 10px;
`;
export const InnerCard2 = styled.div`
  width: 45%;
  height: 35%;
  background-color: white;
  position: absolute;
  top: 7%;
  left: 52%;
  border-radius: 10px;
`;
