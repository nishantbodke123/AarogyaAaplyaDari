import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Select } from "antd";
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
// export const LogOutIcon = styled(FontAwesomeIcon)`

//   &:hover {
//     font-size: 20px;
//   }
// `;
export const UserSelect = styled(Select)`
  &:hover {
    font-size: 20px;
    color: white;
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
  margin-right: 20px;
  height: 40px;
  width: 60px;
`;
