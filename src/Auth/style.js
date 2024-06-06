import { Button, Col, Form, Input } from "antd";
import Item from "antd/es/list/Item";
import Link from "antd/es/typography/Link";
import { styled } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  @media (max-width: 900px) {
    flex-direction: column;
  
  }
  @media (max-width: 415px) {
    flex-direction: column;
    
  }

`;
export const LogoContainer = styled.div`
  width: 50%;

   @media (max-width: 900px) {
    
    width: 100%;
    height: 25%;
    background-color: white;
  }

  @media (max-width: 415px) {
 
    width: 100%;
    height: 25%;
    background-color: white;
  }
 
`;
export const LogoImage = styled.img`
  width: 50vw;
  height: 90vh;

  @media (max-width: 900px) {
    width: 100vw;
    height: 50vh;
  }

  @media (max-width: 415px) {
    width: 100vw;
    height: 50vh;
  }
`;
export const FormContainer = styled.div`
  width: 50%;
  height:50vh;

  
  @media (max-width: 900px) {
   
    width: 100%;
    height: 50vh;
    
  }
  @media (max-width: 415px) {
 
    width: 100%;
    height: 50vh;
    
  }

`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 15%;
  align-items: center;

  @media (max-width:900px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 25vh 25vw;
    align-items: end;
  }

  @media (max-width: 415px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 25vh 10vw ;
    align-items: end;
  }
`;
export const LoginFormHeading = styled.h1`
  margin: 40px 135px;
  font-size: 25px;

  @media (max-width: 415px) {
    margin: 10px 130px;
    font-size: 25px;
  }
  @media (max-width: 900px) {
    margin: 8px 110px;
    font-size: 20px;
  }
`;
export const FormItem = styled(Form.Item)`
  width: 390px;
  font-weight: 700;

  @media (max-width: 415px) {
    width: 340px;
    font-weight: 500;
  }
  @media (max-width: 900px) {
    width: 290px;
    font-weight: 500;
  }
`;
export const SubmitButton = styled(Button)`
  background-color: #ff8551;
  width: 100%;
  height: 35px;
  color: black;
  font-size: 18px;
  border: none;
  &:hover {
    color: white;
    font-size: 19px;
  }
  margin: 30px 100px;
  @media (max-width: 415px) {
    margin: 0px 100px;
    font-size: 15px;
  }
  @media (max-width: 900px) {
    margin: 0px 100px;
    width: 30%;
    font-size: 15px;
  }
`;
export const InputBox = styled(Input)`
  height: 40px;
  @media (max-width: 415px) {
    height: 30px;
  }
`;
export const ForgetPasswordPara = styled.p`
  font-size: 20px;
  margin-left: 60px;

  @media (max-width: 900px) {
    font-size: 15px;
    margin-left: 60px;
  }

  @media (max-width: 415px) {
    font-size: 12px;
    margin-left: 60px;
  }
`;
export const ClickHereLink = styled(Link)`
  font-size: 22px;

  @media (max-width: 900px) {
    font-size: 17px;
  }

  @media (max-width: 415px) {
    font-size: 15px;
  }
`;
