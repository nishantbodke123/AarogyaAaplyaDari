import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Tabs } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  margin: 5px;
`;
export const SubContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 70px;
`;
export const Box = styled.div`
  width: 220px;
  height: 110px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
`;
export const BoxContainer = styled.div`
  margin: 5px 10px;
`;
export const CountIcon = styled(FontAwesomeIcon)`
  margin-top: 22px;
  margin-right: 7px;
`;
export const TableContainer = styled.div`
  margin: 50px 40px;
`;
export const TableHeading = styled.p`
  font-size: 23px;
  font-family: sans-serif;
  font-weight: 650;
`;

export const StyledTabs = styled(Tabs)`
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

export const ViewButton= styled.button`
 border:none;
 width: 60px;
 height: 23px;
  border-radius: 10px;
  background-color:#ff8551;
  &:hover{
    color:white;
    background-color:#f29727
  }
`;
export const ViewModal=styled(Modal)`

`