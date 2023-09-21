import React from "react";
import { Outlet } from "react-router-dom";

function Protected(){
    let loginToken=sessionStorage.getItem("Token");

    if(loginToken == null){
        return window.location.replace("/login")
    }else{
        return(<Outlet></Outlet>)
    }

}

export default Protected;