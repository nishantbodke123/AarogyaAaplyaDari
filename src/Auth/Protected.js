import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

let loginToken = sessionStorage.getItem("Token");
let userGroup = sessionStorage.getItem("group");
export function HealthworkerProtected({ children }) {
  const navigate = useNavigate();
  if (loginToken !== "" && userGroup === "healthworker") {
    return children;
  } else {
    navigate("/");
    return null;
  }
}

export function PhleboProtected({ children }) {
  const navigate = useNavigate();
  if (loginToken !== "" && userGroup === "phlebotomist") {
    return children;
  } else {
    navigate("/");
    return null;
  }
}
