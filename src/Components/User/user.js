import React from "react";
import Register from "../Registration/Register";

import Dashboard from "../Dashboard/Dashboard";

function User() {
  const group = sessionStorage.getItem("group");
  console.log(group);
  return group == "healthworker"
    ? window.location.replace("/dashboard")
    : group == "phlebotomist"
    ? window.location.replace("/citizendetails")
    : window.location.replace("/");
}

export default User;
