import Login from "./Auth/Login";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Register from "./Components/Registration/Register";
import User from "./Components/User/user";
import Protected from "./Auth/Protected";
import Error from "./Auth/error";
import Dashboard from "./Components/Dashboard/Dashboard";
import UserList from "./Components/UserList/UserList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/" element={<Protected />}>
            <Route path="dashboard" element={<Dashboard/>}></Route>
            <Route path="user" element={<User />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
          <Route path="/*" element={<Error/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
