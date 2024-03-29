import Login from "./Auth/Login";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Register from "./Components/Registration/Register";
import User from "./Components/User/user";
import {
  AdminProtected,
  HealthworkerProtected,
  PhleboProtected,
  WardAdminProtected,
} from "./Auth/Protected";
import Error from "./Auth/error";
import Dashboard from "./Components/Dashboard/Dashboard";

import MemberUpdate from "./Components/Registration/MemberUpdate";
import MemberAdd from "./Components/Registration/MemberAdd";
import Phlebo from "./Components/Phlebotomist/Phlebo";
import Admin from "./Admin/Admin/Admin";
import AdminDashboard from "./Admin/Content/Dashboard";
import Healthworker from "./Admin/Content/Healthworker";
import CHV from "./Admin/Content/CHV";
import MO from "./Admin/Content/MO";
import WardAdmin from "./WardAdmin/Admin/WardAdmin";
import WardHealthworker from "./WardAdmin/Content/Healthworker";
import WardAdminDashboard from "./WardAdmin/Content/Dashboard";
import WardCHV from "./WardAdmin/Content/WardCHV";
import HealthworkerApproval from "./Admin/AdminApproval/Content/Healthworker";
import CHVApproval from "./Admin/AdminApproval/Content/CHV";
import CitizenDetails from "./Components/CitizenDetails";
import AreaAndSection from "./Admin/CreateAndUpdate/Areas";
import Area from "./Admin/CreateAndUpdate/Areas";
import Section from "./Admin/CreateAndUpdate/Sections";
import AllUserDetails from "./Admin/Content/AllUserDetails";

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
              (Token !== "" && Group == "healthworker") ||
              Group == "CHV-ASHA" ? (
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
              (Token !== "" && Group == "healthworker") ||
              Group == "CHV-ASHA" ? (
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
            path="/citizendetails"
            element={
              <HealthworkerProtected>
                <CitizenDetails />
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
          >
            <Route
              path="/admin/adminDashboard"
              element={
                <AdminProtected>
                  <AdminDashboard />
                </AdminProtected>
              }
            ></Route>
            <Route
              path="/admin/healthWorker"
              element={
                <AdminProtected>
                  <Healthworker />
                </AdminProtected>
              }
            ></Route>
            <Route
              path="/admin/chv"
              element={
                <AdminProtected>
                  <CHV />
                </AdminProtected>
              }
            ></Route>
            <Route
              path="/admin/mo"
              element={
                <AdminProtected>
                  <MO />
                </AdminProtected>
              }
            ></Route>
                 <Route
              path="/admin/allUserDetails"
              element={
                <AdminProtected>
                  <AllUserDetails/>
                </AdminProtected>
              }
            ></Route>
            <Route
              path="/admin/healthWorkerApproval"
              element={
                <AdminProtected>
                  <Healthworker />
                </AdminProtected>
              }
            ></Route>
            <Route
              path="/admin/chvApproval"
              element={
                <AdminProtected>
                  <CHVApproval />
                </AdminProtected>
              }
            ></Route>
                <Route
              path="/admin/arealist"
              element={
                <AdminProtected>
                  <Area />
                </AdminProtected>
              }
            ></Route>
              <Route
              path="/admin/sectionlist"
              element={
                <AdminProtected>
                  <Section />
                </AdminProtected>
              }
            ></Route>
          </Route>
          <Route
            path="/wardadmin"
            element={
              <WardAdminProtected>
                <WardAdmin />
              </WardAdminProtected>
            }
          >
            <Route
              path="/wardadmin/wardadminDashboard"
              element={
                <WardAdminProtected>
                  <WardAdminDashboard />
                </WardAdminProtected>
              }
            ></Route>
            <Route
              path="/wardadmin/wardhealthWorker"
              element={
                <WardAdminProtected>
                  <WardHealthworker />
                </WardAdminProtected>
              }
            ></Route>
            <Route
              path="/wardadmin/wardchv"
              element={
                <WardAdminProtected>
                  <WardCHV />
                </WardAdminProtected>
              }
            ></Route>
          </Route>

          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
