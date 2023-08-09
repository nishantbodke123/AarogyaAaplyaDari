import React, { useState } from "react";
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
import OtpInput from 'react-otp-input';

function Login() {
  const [showOtpInput ,setShowOtpInput]=useState(false);
  const [otp ,setOtp]=useState("");

  const handleLoginSubmit=()=>{
    if(showOtpInput){
      window.location.replace("/Register");
    }
    setShowOtpInput(true);
    
  }
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
                <FormItem label="Email / Mobile number" name="mobile number" rules={[{required:true ,message:"Mobile Number required"},{ pattern:/^[a-zA-Z0-9@.]*$/ , message: "No Space or Special Characters Allowed"}]}>
                  <InputBox
                    type="text"
                    name="mobile number"
                    placeholder="Enter Email / Mobile Number "
                  ></InputBox>
                  </FormItem>
                  { showOtpInput ?(<>  <FormItem label="OTP">
                    <OtpInput inputStyle={{width:"40px" ,height:"20px" ,marginLeft:"40px"}} value={otp} numInputs={4} onChange={setOtp} renderSeparator={<span></span>} renderInput={(props) => <input {...props} />}></OtpInput>
                </FormItem></>):(<></>)}
                
               
                <SubmitButton
                  htmlType="submit"
                  onClick={ handleLoginSubmit}
                >
                  Submit
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
