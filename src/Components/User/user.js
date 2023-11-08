import React from "react";
import Register from "../Registration/Register";

import Dashboard from "../Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const group = sessionStorage.getItem("group");
  console.log(group);
  return group == "healthworker"
    ? navigate("/user/dashboard")
    : group == "phlebotomist"
    ? navigate("/user/phlebo")
    : navigate("/");
}
export default User;
