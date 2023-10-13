import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Layout, Menu, theme } from "antd";
import {
  HeaderLogo,
  LogoutOption,
  SearchBoxDiv,
  SearchButton,
  SearchInput,
  SubMenu,
  UserIcon,
  UserSelect,
} from "./style";
import SideBar from "./SideBar";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { LogOut } from "../../Auth/Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Header, Content, Footer, Sider } = Layout;

const handleCitizenSearch = () => {
  console.log("Citizen Searched");
};
const CitizenDetails = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <SideBar />

      <Layout>
        <Header
          style={{
            padding: 0,
            margin: "20px 20px ",
            height: "100px",
            background: "#E5E5E5",
          }}
        >
          <SearchBoxDiv>
            <Form layout="vertical">
              <Form.Item label="Citizen ID">
                <SearchInput type="text"></SearchInput>
                <SearchButton onClick={() => handleCitizenSearch()}>
                  Search
                </SearchButton>
              </Form.Item>
            </Form>
          </SearchBoxDiv>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 50,
              minHeight: 455,
              background: "#E5E5E5",
            }}
          >
            content
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default CitizenDetails;
