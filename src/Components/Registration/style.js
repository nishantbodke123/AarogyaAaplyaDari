import { Button, Col, Form, Input, Row, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import { styled } from "styled-components";

export const Container = styled.div`
  // background-color: #dde6ed;
`;

export const FormContainer = styled(Form)`
  margin: 20px 40px;
`;

export const InputForm = styled(Input)`
  width: 300px;
`;

export const TextAreaForm = styled(TextArea)`
  width: 300px;
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
export const QuestionRow = styled(Row)`
  background-color: #dde6ed;
  margin: 20px 20px;

  // @media (max-width: 820px) {
  //   width: 450px;
  // }
  // @media (max-width: 450px) {
  //   width: 300px;
  // }
`;
export const QuestionSubRow = styled(Row)`
  margin: 8px 100px;
  @media (max-width: 820px) {
  }
  @media (max-width: 450px) {
    margin: 8px 50px;
  }
`;
export const QuestionCol = styled(Col)`
  width: 35%;
  margin: 20px 20px;

  @media (max-width: 820px) {
    width: 100%;
    margin: 20px 20px;
  }
  // @media (max-width: 450px) {
  //   width: 300px;
  // }
`;
export const QuestionSubCol = styled(Col)`
  width: 35%;

  @media (max-width: 820px) {
    width: 60%;
  }
  @media (max-width: 450px) {
    width: 80%;
  }
`;

export const AnswerCol = styled(Col)`
  margin: 20px 200px;
  @media (max-width: 820px) {
    width: 100%;
    margin: 20px 20px;
  }
  // @media (max-width: 450px) {
  //   width: 300px;
  // }
`;
export const AnswerCol1 = styled(Col)`
  margin: 20px 150px;
  @media (max-width: 820px) {
    width: 100%;
    margin: 20px 20px;
  }
  // @media (max-width: 450px) {
  //   width: 300px;
  // }
`;
export const AnswerSubCol = styled(Col)`
  @media (max-width: 820px) {
    width: 40%;
  }
  @media (max-width: 450px) {
    width: 20%;
  }
`;
export const DocsTab = styled(Tabs)`
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

export const SubmitButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 100px;

  @media (max-width: 820px) {
    margin: 20px 320px;
  }
  @media (max-width: 450px) {
    margin: 20px 120px;
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

export const BloodLogoImage = styled.img`
  width: 30%;
  margin: 0% 25%;
`;
export const BloodSampleText = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin: 5% 0%;
  font-family= serif;

    @media (max-width: 820px) {
     font-size: 18px;
  font-weight: 600;
  margin: 5% 0%;
  }
  @media (max-width: 450px) {
     font-size: 15px;
  font-weight: 600;
  margin: 5% 0%;
  }
`;
export const BloodSampleButtonsRow = styled(Row)``;
export const BloodSampleButtonCol = styled(Col)`
  width: 30%;

  @media (max-width: 820px) {
    width: 100%;
    margin: 2% 10%;
  }
  @media (max-width: 450px) {
    width: 100%;
  }
`;
