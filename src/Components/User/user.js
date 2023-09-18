import React from "react";
import Register from "../Registration/Register";
import Phlebo from "../Phlebotomist/Phlebo";

function User(){
    const user="CHV"
return(
    user == "CHV" ? (<Register/>):(<Phlebo/>)
)
}

export default User;