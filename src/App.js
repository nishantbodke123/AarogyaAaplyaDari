import Login from "./Auth/Login";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Register from "./Components/Registration/Register";
import User from "./Components/User/user";
import {
  AdminProtected,
  HealthworkerProtected,
  PhleboProtected,
} from "./Auth/Protected";
import Error from "./Auth/error";
import Dashboard from "./Components/Dashboard/Dashboard";

import MemberUpdate from "./Components/Registration/MemberUpdate";
import MemberAdd from "./Components/Registration/MemberAdd";
import Phlebo from "./Components/Phlebotomist/Phlebo";
import Admin from "./Admin/Admin/Admin";

function App() {
  let Token = sessionStorage.getItem("Token");
  let Group = sessionStorage.getItem("group");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              Token !== "" && Group == "healthworker" ? (
                <Navigate to="/dashboard" />
              ) : Token !== "" && Group == "phlebotomist" ? (
                <Navigate to="/phlebo" />
              ) : Token !== "" && Group == "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={
              Token !== "" && Group == "healthworker" ? (
                <Navigate to="/dashboard" />
              ) : Token !== "" && Group == "phlebotomist" ? (
                <Navigate to="/phlebo" />
              ) : (
                <Login />
              )
            }
          ></Route>

          <Route
            path="/dashboard"
            element={
              <HealthworkerProtected>
                <Dashboard />
              </HealthworkerProtected>
            }
          ></Route>
          <Route
            path="/user"
            element={
              <HealthworkerProtected>
                <User />
              </HealthworkerProtected>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <HealthworkerProtected>
                <Register />
              </HealthworkerProtected>
            }
          ></Route>
          <Route
            path="/update"
            element={
              <HealthworkerProtected>
                <MemberUpdate />
              </HealthworkerProtected>
            }
          ></Route>
          <Route
            path="/addMember"
            element={
              <HealthworkerProtected>
                <MemberAdd />
              </HealthworkerProtected>
            }
          ></Route>
          <Route
            path="/phlebo"
            element={
              <PhleboProtected>
                <Phlebo />
              </PhleboProtected>
            }
          ></Route>
          <Route
            path="/admin"
            element={
              <AdminProtected>
                <Admin />
              </AdminProtected>
            }
          ></Route>

          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
