import { Button, Row, Select, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Option } from "antd/es/mentions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { LogOut } from "../../Auth/Logout";

function HeaderBar(props) {
  return (
    <>
      <Header
        style={{
          padding: 0,
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "1vw",
          }}
        >
          <Button
            type="text"
            icon={
              props.handleCollapse ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={props.handleCollapse}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div style={{ margin: "-1% 50% 0% 0%" }}>
            <div>
              <p>
                Welcome , <b>{sessionStorage.getItem("name")}</b>
              </p>
              <br />
            </div>
          </div>
          <div>
            <FontAwesomeIcon
              icon={faUser}
              style={{ marginRight: "10px", fontSize: "20px" }}
            ></FontAwesomeIcon>
            <Select
              value={sessionStorage.getItem("name")}
              style={{ width: "10vw" }}
              onChange={() => LogOut()}
            >
              <Option>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Log Out
              </Option>
            </Select>
          </div>
        </div>
      </Header>
    </>
  );
}
export default HeaderBar;
