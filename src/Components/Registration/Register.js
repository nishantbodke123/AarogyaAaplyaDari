import React, { useState } from "react";
import FamilyHead from "./FamilyHead";
import MemberRegister from "./MemberRegister";
import Header from "../Header/Header";

function Register() {
  const [noOfFamilyMember, setNoOfFamilyMember] = useState(1);
  const handleSetNoOfFamilyMember = (value) => {
    setNoOfFamilyMember(value);
  };
  const [familyHeadRegistered, setFamilyHeadRegistered] = useState("no");
  const handleFamilyHeadRegistration = () => {
    setFamilyHeadRegistered("yes");
  };

  return (
    <>
      <Header></Header>

      {familyHeadRegistered == "no" ? (
        <>
          <FamilyHead
            setFamilyHeadRegistered={handleFamilyHeadRegistration}
            handleSetNoOfFamilyMember={handleSetNoOfFamilyMember}
          ></FamilyHead>
        </>
      ) : (
        <>
          <MemberRegister noOfFamilyMember={noOfFamilyMember}></MemberRegister>
        </>
      )}
    </>
  );
}

export default Register;
