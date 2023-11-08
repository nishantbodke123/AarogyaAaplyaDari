import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Button,
  Modal,
  message,
  Spin,
} from "antd";
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
import OtpInput from "react-otp-input";
import axios from "axios";
import { BASE_URL } from "../Utils/BaseURL";
import { useNavigate } from "react-router-dom";
import Dashboard from "../Components/Dashboard/Dashboard";
function Login() {
  const navigate = useNavigate();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const [mobileNumber, setMobileNumber] = useState();
  const [password, setPassword] = useState();

  const handleLoginSubmit = () => {
    setShowLoading(true);
    const formData = new FormData();
    formData.append("phoneNumber", mobileNumber);
    formData.append("password", password);

    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(`${BASE_URL}/allauth/api/login`, formData, axiosConfig)
      .then((response) => {
        console.log(response.data.Group);
        sessionStorage.setItem("Token", response.data.Token);
        sessionStorage.setItem("ward", response.data.ward);
        sessionStorage.setItem("healthPostName", response.data.healthPostName);
        sessionStorage.setItem("healthPostID", response.data.healthPostID);
        sessionStorage.setItem("name", response.data.name);
        sessionStorage.setItem("group", response.data.Group);
        message.success(response.data.message);

        setTimeout(() => {
          if (response.data.Group == "healthworker") {
            window.location.replace("/dashboard");
          } else {
            window.location.replace("/phlebo");
          }
        }, 1000);
        setShowLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response.data.message);
        setShowLoading(false);
      });
  };
  return (
    <div>
      <Spin tip="loading..." spinning={showLoading}>
        <Container>
          <LogoContainer>
            <LogoImage src="logo (1).svg"></LogoImage>
          </LogoContainer>
          <FormContainer>
            <div>
              <LoginForm>
                <Form layout="vertical">
                  <LoginFormHeading>Sign In</LoginFormHeading>
                  <FormItem
                    label="User ID"
                    name="mobile number"
                    rules={[
                      { required: true, message: "Mobile Number required" },
                      {
                        pattern: /^[a-zA-Z0-9 @.]*$/,
                        message: "No Space or Special Characters Allowed",
                      },
                      {
                        max: 10,
                        message:
                          "Mobile Number can not be longer than 10 digits",
                      },
                    ]}
                  >
                    <InputBox
                      type="text"
                      name="mobile number"
                      placeholder="Mobile Number"
                      onChange={(e) => setMobileNumber(e.target.value)}
                    ></InputBox>
                  </FormItem>
                  <FormItem
                    label="password"
                    name="password"
                    rules={[
                      { required: true, message: "Please Enter Password" },
                    ]}
                  >
                    <InputBox.Password
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></InputBox.Password>
                  </FormItem>
                  {/* { showOtpInput ?(<>  <FormItem label="OTP">
                    <OtpInput inputStyle={{width:"40px" ,height:"20px" ,marginLeft:"40px"}} value={otp} numInputs={4} onChange={setOtp} renderSeparator={<span></span>} renderInput={(props) => <input {...props} />}></OtpInput>
                </FormItem></>):(<></>)} */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <SubmitButton htmlType="submit" onClick={handleLoginSubmit}>
                      Submit
                    </SubmitButton>
                  </div>
                  {/* <ForgetPasswordPara>
                  Forget Password?
                  <ClickHereLink>Click here</ClickHereLink>
                </ForgetPasswordPara> */}
                </Form>
              </LoginForm>
            </div>{" "}
            
          </FormContainer>
        </Container>
      </Spin>
    </div>
  );
}

export default Login;
