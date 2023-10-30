import { Layout } from "antd";
import React, { useState } from "react";
import SideBar from "./SideBar";
import PhleboHeader from "./PhleboHeader";
import PhleboContent from "./PhleboContent";
import { BASE_URL } from "../../Utils/BaseURL";
import axios from "axios";
import { LogoutDiv, LogoutOption, UserIcon, UserSelect } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogOut } from "../../Auth/Logout";
import {
  faPowerOff,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const { Header, Content, Footer, Sider } = Layout;

function Phlebo() {
  const [citizenDetailsSearch, setCitizenDetailsSearch] = useState();
  const [citizendetailsData, setCitizenDetailsData] = useState();
  const handleCitizenSearch = () => {
    console.log("Citizen Searched");
    const axiosConfig = {
      headers: {
        Authorization: `Token ${sessionStorage.getItem("Token")} `,
      },
      params: {
        search: citizenDetailsSearch,
      },
    };
    axios
      .get(`${BASE_URL}/phlebo/api/GetCitizenBasicDetailsAPI`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setCitizenDetailsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Layout>
        <SideBar />
        <Layout>
          <LogoutDiv>
            <UserIcon icon={faUser} />
            <UserSelect
              value={sessionStorage.getItem("name")}
              onChange={() => LogOut()}
            >
              <LogoutOption key="1">
                <FontAwesomeIcon icon={faRightFromBracket} /> Logout
              </LogoutOption>
            </UserSelect>
          </LogoutDiv>

          <PhleboHeader
            handleCitizenSearch={handleCitizenSearch}
            setCitizenDetailsSearch={setCitizenDetailsSearch}
          />
          <PhleboContent citizendetailsData={citizendetailsData} />
        </Layout>
      </Layout>
    </>
  );
}
export default Phlebo;
