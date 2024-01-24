import axios from "axios";
import React, { useEffect, useState } from "react";
import { HealthPostHeader, WardHeader } from "./style";
import { CaretDownFilled, CaretUpFilled } from "@ant-design/icons";
import { BASE_URL } from "../../../Utils/BaseURL";
import { Spin } from "antd";
import { LogOut } from "../../../Auth/Logout";

const AllUserDetails = () => {
  const [selectedWard, setSelectedWard] = useState([]);
  const [selectedHealthpost, setSelectedHealthpost] = useState([]);
  const [selectedSection, setSelectedSection] = useState([]);
  const [selectedANM, setSelectedANM] = useState([]);
  const [selectedCHV, setSelectedCHV] = useState([]);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("");

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };

  const handleWardShow = (ward) => {
    console.log(ward);
    if (selectedWard.includes(ward)) {
      setSelectedWard(selectedWard.filter((item) => item !== ward));
    } else {
      setSelectedWard([...selectedWard, ward]);
    }
    setSelectedHealthpost([]);
    setSelectedSection([]);
    setSelectedANM([]);
    setSelectedCHV([]);
  };
  const handleShowHealthPost = (healthPost) => {
    if (selectedHealthpost.includes(healthPost)) {
      setSelectedHealthpost(
        selectedHealthpost.filter((item) => item !== healthPost)
      );
    } else {
      setSelectedHealthpost([...selectedHealthpost, healthPost]);
    }
    setSelectedSection([]);
    setSelectedANM([]);
    setSelectedCHV([]);
  };
  const handleShowSection = (section) => {
    if (selectedSection.includes(section)) {
      setSelectedSection(selectedSection.filter((item) => item !== section));
    } else {
      setSelectedSection([...selectedSection, section]);
    }
    setSelectedANM([]);
    setSelectedCHV([]);
  };
  const handleShowANM = (ANM) => {
    if (selectedANM.includes(ANM)) {
      setSelectedANM(selectedANM.filter((item) => item !== ANM));
    } else {
      setSelectedANM([...selectedANM, ANM]);
    }
    setSelectedCHV([]);
  };

  const handleShowCHV = (CHV) => {
    if (selectedCHV.includes(CHV)) {
      setSelectedCHV(selectedCHV.filter((item) => item !== CHV));
    } else {
      setSelectedCHV([...selectedCHV, CHV]);
    }
  };
  useEffect(() => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/GetAllUserDetails`, axiosConfig)
      .then((res) => {
        console.log(res);
        setData(res);
        // setTimeout(() => {
        //   setLoader(false);
        // }, 5000);
      })
      .catch((err) => {
        // setLoader(false);
        console.log(err);
        if (err.response.status == 401) {
          LogOut();
        }
      });
  }, [data]);
  if (data === "") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Spin spinning={true}></Spin>
      </div>
    );
  } else {
    return (
      <>
        {console.log(data)}
        <div
          style={{ height: "85vh", overflowY: "scroll", margin: "1% 0% 0% 2%" }}
        >
          <div>
            <WardHeader>Wards</WardHeader>
          </div>
          {data.data.data.wards.map((data) => {
            return (
              <>
                <div
                  style={{
                    border: "1px #BFCFE7 solid",
                    backgroundColor: "#E0F4FF",
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                  }}
                  onClick={() => handleWardShow(data.ward)}
                >
                  <WardHeader>{data.ward}</WardHeader>
                  <div style={{ margin: "1.5% 2% 0% 0%" }}>
                    {selectedWard.includes(data.ward) ? (
                      <CaretUpFilled />
                    ) : (
                      <CaretDownFilled />
                    )}
                  </div>
                </div>
                {selectedWard.includes(data.ward) && (
                  <div>
                    {/* <HealthPostHeader>Healthposts</HealthPostHeader> */}
                    {data.healthPosts.map((data) => {
                      return (
                        <>
                          <div
                            style={{
                              border: "1px #BFCFE7 solid",
                              backgroundColor: "white",
                              display: "flex",
                              justifyContent: "space-between",
                              alignContent: "center",
                              margin: "0% 0% 0% 1%",
                            }}
                            onClick={() =>
                              handleShowHealthPost(data.healthPost)
                            }
                          >
                            <HealthPostHeader>
                              Health Post : {data.healthPost}
                            </HealthPostHeader>
                            <div style={{ margin: "1.5% 2% 0% 0%" }}>
                              {selectedHealthpost.includes(data.healthPost) ? (
                                <CaretUpFilled />
                              ) : (
                                <CaretDownFilled />
                              )}
                            </div>
                          </div>
                          {/* {selectedHealthpost.includes(data.healthPost) && (
                           
                            <div>
                              {data.areaList.map((data) => {
                                <div>{data}</div>
                                // <div
                                //   style={{
                                //     border: "1px #BFCFE7 solid",
                                //     backgroundColor: "white",
                                //     display: "flex",
                                //     justifyContent: "space-between",
                                //     alignContent: "center",
                                //     margin: "0% 0% 0% 1%",
                                //   }}
                                // >
                                //   <HealthPostHeader>
                                //     Area : {data}
                                //     {console.log(data.areaList[0])}
                                //   </HealthPostHeader>
                                // </div>;
                              })}
                            </div>
                          )} */}

                          {selectedHealthpost.includes(data.healthPost) && (
                            <>
                              <div style={{ marginLeft: "6%" }}>
                                {data.sections.map((data) => {
                                  return (
                                    <>
                                      <div
                                        style={{
                                          border: "1px #BFCFE7 solid",
                                          backgroundColor: "white",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignContent: "center",
                                          margin: "0% 0% 0% 1%",
                                        }}
                                        onClick={() =>
                                          handleShowSection(data.sectionName)
                                        }
                                      >
                                        <HealthPostHeader>
                                          Section : {data.sectionName}
                                        </HealthPostHeader>
                                        <div
                                          style={{ margin: "1.5% 2% 0% 0%" }}
                                        >
                                          {selectedSection.includes(
                                            data.sectionName
                                          ) ? (
                                            <CaretUpFilled />
                                          ) : (
                                            <CaretDownFilled />
                                          )}
                                        </div>
                                      </div>

                                      {selectedSection.includes(
                                        data.sectionName
                                      ) && (
                                        <div style={{ marginLeft: "7%" }}>
                                          {data.anms.map((data) => {
                                            return (
                                              <>
                                                <div
                                                  style={{
                                                    border: "1px #BFCFE7 solid",
                                                    backgroundColor: "white",
                                                    display: "flex",
                                                    justifyContent:
                                                      "space-between",
                                                    alignContent: "center",
                                                    margin: "0% 0% 0% 1%",
                                                  }}
                                                  onClick={() =>
                                                    handleShowANM(data.anmName)
                                                  }
                                                >
                                                  <HealthPostHeader>
                                                    ANM: {data.anmName}
                                                  </HealthPostHeader>
                                                  <div
                                                    style={{
                                                      margin: "1.5% 2% 0% 0%",
                                                    }}
                                                  >
                                                    {selectedANM.includes(
                                                      data.anmName
                                                    ) ? (
                                                      <CaretUpFilled />
                                                    ) : (
                                                      <CaretDownFilled />
                                                    )}
                                                  </div>
                                                </div>
                                                {selectedANM.includes(
                                                  data.anmName
                                                ) && (
                                                  <div
                                                    style={{ marginLeft: "8%" }}
                                                  >
                                                    {data.chvs.map((data) => {
                                                      return (
                                                        <>
                                                          <div
                                                            style={{
                                                              border:
                                                                "1px #BFCFE7 solid",
                                                              backgroundColor:
                                                                "white",
                                                              display: "flex",
                                                              justifyContent:
                                                                "space-between",
                                                              alignContent:
                                                                "center",
                                                              margin:
                                                                "0% 0% 0% 1%",
                                                            }}
                                                            onClick={() =>
                                                              handleShowCHV(
                                                                data.chvName
                                                              )
                                                            }
                                                          >
                                                            <HealthPostHeader>
                                                              CHV:{" "}
                                                              {data.chvName}
                                                            </HealthPostHeader>
                                                            {/* <div
                                                              style={{
                                                                margin:
                                                                  "1.5% 2% 0% 0%",
                                                              }}
                                                            >
                                                              {selectedCHV.includes(
                                                                data.chvName
                                                              ) ? (
                                                                <CaretUpFilled />
                                                              ) : (
                                                                <CaretDownFilled />
                                                              )}
                                                            </div> */}
                                                          </div>
                                                        </>
                                                      );
                                                    })}
                                                  </div>
                                                )}
                                              </>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </>
                                  );
                                })}
                              </div>
                              {selectedHealthpost.includes(data.healthPost) && (
                                <div style={{ marginLeft: "10%" }}>
                                  {data.areaList.map((data) => {
                                    return (
                                      <div
                                        style={{
                                          border: "1px #BFCFE7 solid",
                                          backgroundColor: "white",
                                          display: "flex",
                                          justifyContent: "space-between",
                                          alignContent: "center",
                                          margin: "0% 0% 0% 1%",
                                        }}
                                      >
                                        <HealthPostHeader>
                                          Area : {data}
                                          {console.log(data)}
                                        </HealthPostHeader>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </>
                          )}
                        </>
                      );
                    })}
                  </div>
                )}
              </>
            );
          })}
        </div>
      </>
    );
  }
};

export default AllUserDetails;
