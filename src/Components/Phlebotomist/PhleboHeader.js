import { Form, Layout } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { SearchBoxDiv, SearchButton, SearchInput } from "./style";
import { BASE_URL } from "../../Utils/BaseURL";
const { Header, Content, Footer, Sider } = Layout;
function PhleboHeader(props) {
//   const [citizenDetailsSearch, setCitizenDetailsSearch] = useState();
//   const handleCitizenSearch = () => {
//     console.log("Citizen Searched");
//     const axiosConfig = {
//       headers: {
//         Authorization: `Token ${sessionStorage.getItem("Token")} `,
//       },
//       params: {
//         search: citizenDetailsSearch,
//       },
//     };
//     axios
//       .get(`${BASE_URL}/phlebo/api/GetCitizenBasicDetailsAPI`, axiosConfig)
//       .then((response) => {
//         console.log(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

  return (
    <>
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
              <SearchInput
                type="text"
                onChange={(e) => props.setCitizenDetailsSearch(e.target.value)}
              ></SearchInput>
              <SearchButton
                htmlType="Submit"
                onClick={() => props.handleCitizenSearch()}
              >
                Search
              </SearchButton>
            </Form.Item>
          </Form>
        </SearchBoxDiv>
      </Header>
    </>
  );
}
export default PhleboHeader;
