import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Input, Menu, Select } from "antd";
import { Option } from "antd/es/mentions";
import { styled } from "styled-components";

export const HeaderBar = styled.div`
  background-color: #ffe5ad;
  display: flex;
`;
export const HeaderBarSubDiv = styled.div`
  margin: 0% 90%;
  cursor: pointer;

  @media (max-width: 820px) {
    margin: 1.5% 80%;
  }
  @media (max-width: 450px) {
    margin: 2% 70%;
  }
`;
export const LogOutIcon = styled(FontAwesomeIcon)`
  &:hover {
    font-size: 20px;
  }
`;
export const UserSelect = styled(Select)`
  width: 180px;

  .ant-select-selection-search {
  }

  &:hover {
    font-size: 20px;
    color: white;
  }
  @media (max-width: 820px) {
  }
  @media (max-width: 520px) {
    width: 120px;
  }
`;
export const LogoutOption = styled(Option)`
  &:hover {
    font-size: 20px;
    color: white;
  }
`;
export const HeaderLogo = styled.img`
  margin-left: 50px;
  margin-top: 10px;
  margin-right: 20px;
  height: 100px;
  width: 100px;
  @media (max-width: 820px) {
    margin-left: 12px;
    margin-right: 10px;
    height: 40px;
    width: 30px;
  }
  @media (max-width: 450px) {
    margin-left: 12px;
    margin-right: 10px;
    height: 40px;
    width: 30px;
  }
`;
export const SubMenu = styled.div`
  position: absolute;
  right: 30px;
  top: 2px;
  @media (max-width: 820px) {
    right: 5px;
  }
  @media (max-width: 550px) {
    right: 20px;
  }
`;
export const UserIcon = styled(FontAwesomeIcon)`
  margin-right: 5px;
  font-size: 18px;
  @media (max-width: 820px) {
    font-size: 15px;
  }
  @media (max-width: 550px) {
  }
`;
export const DesktopMenu = styled(Menu)`
  @media (max-width: 820px) {
  }
  @media (max-width: 550px) {
    display: none;
  }
`;
export const MobileMenu = styled(Menu)`
  @media (min-width: 550px) {
    display: none;
  }
  @media (max-width: 820px) {
  }
  @media (max-width: 550px) {
  }
`;

export const LogoutDiv = styled.div`
  display: flex;
  border-radius: 20px;
  margin: 425px 50px;
  font-size: 15px;
  font-weight: 600;
  &:hover {
    font-size: 17px;
    font-weight: 650;
    background-color: #daaa6b;
  }
`;
export const SearchButton = styled(Button)`
  margin-left: 20px;
  border-radius: 15px;
  background-color: #ff8551;
  &:hover {
    
  }
`;
export const SearchInput = styled(Input)`
  width: 300px;
`;
export const SearchBoxDiv = styled.div`
  margin: 15px 50px;
`;
