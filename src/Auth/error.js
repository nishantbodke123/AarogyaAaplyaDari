import React from "react";
import { Navigate } from "react-router-dom";

function Error() {
  
  return (
    <>
    {/* <Navigate to="/"></Navigate> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Page Not Found</h2>
        <br />
        <h1>404</h1>
      </div>
    </>
  );
}

export default Error;
