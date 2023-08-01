import { Col, Form, Row, Tabs } from "antd";
import { styled } from "styled-components";

export const Container = styled.div`
  // background-color: #dde6ed;
`;

export const FormContainer = styled(Form)`
  margin: 20px 40px;
`;

export const Column = styled(Col)`
  width: 33.33%;
`;
export const FormItem = styled(Form.Item)`
  width: 350px;
`;

export const FormHeader = styled.p`
  font-weight: 650;
  margin: 30px 25px;
`;
export const QuestionRow = styled(Row)`
  background-color: #dde6ed;
  margin: 20px 20px;
`;
export const QuestionCol = styled(Col)`
  width: 35%;
  margin: 20px 20px;
`;
export const AnswerCol = styled(Col)`
  margin: 20px 200px;
`;
export const DocsTab = styled(Tabs)`
  .ant-tabs-tab-btn {
    color: black;
    font-size: 15px;
    font-weight: 500;
    margin: 10px 70px;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #ff8551;
    font-weight: 700;
    font-size: 18px;
  }
  .ant-tabs-ink-bar {
    background-color: #ff8551;
  }
`;
