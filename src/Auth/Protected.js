import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

let loginToken = sessionStorage.getItem("Token");
let userGroup = sessionStorage.getItem("group");
export function HealthworkerProtected({ children }) {
  const navigate = useNavigate();
  if (
    (loginToken !== "" && userGroup === "healthworker") ||
    userGroup === "CHV-ASHA"
  ) {
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
export function AdminProtected({ children }) {
  const navigate = useNavigate();
  if (loginToken !== "" && userGroup === "admin") {
    return children;
  } else {
    navigate("/");
    return null;
  }
}
export function WardAdminProtected({ children }) {
  const navigate = useNavigate();
  if (loginToken !== "" && userGroup === "MOH") {
    return children;
  } else {
    navigate("/");
    return null;
  }
}
