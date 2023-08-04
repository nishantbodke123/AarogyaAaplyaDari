import React from "react";
import { Row, Col, Form, Card, Input, Button, Modal } from "antd";
import Title from "antd/es/skeleton/Title";
import {
  ClickHereLink,
  Container,
  ForgetPasswordPara,
  FormContainer,
  FormItem,
  InputBox,
  LoginForm,
  LoginFormHeading,
  LogoContainer,
  LogoImage,
  SubmitButton,
} from "./style";
import Link from "antd/es/typography/Link";

function Login() {
  return (
    <div>
      <Container>
        <LogoContainer>
          <LogoImage src="logo (1).svg"></LogoImage>
        </LogoContainer>
        <FormContainer>
          <div>
            <LoginForm>
              <Form layout="vertical">
                <LoginFormHeading>Sign In</LoginFormHeading>
                <FormItem label="Email / Mobile number">
                  <InputBox
                    type="text"
                    placeholder="Enter Email / Mobile Number "
                  ></InputBox>
                </FormItem>
                <FormItem label="OTP">
                  <InputBox type="text" placeholder="Enter OTP "></InputBox>
                </FormItem>
                <SubmitButton
                  htmlType="submit"
                  onClick={() => {
                    window.location.replace("/Register");
                  }}
                >
                  Sign In
                </SubmitButton>
                {/* <ForgetPasswordPara>
                  Forget Password?
                  <ClickHereLink>Click here</ClickHereLink>
                </ForgetPasswordPara> */}
              </Form>
            </LoginForm>
          </div>
        </FormContainer>
      </Container>
    </div>
  );
}

export default Login;
