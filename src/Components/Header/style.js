import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Select } from "antd";
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
  margin-left: 30px;
  margin-top: 5px;
  margin-right: 20px;
  height: 40px;
  width: 60px;
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
