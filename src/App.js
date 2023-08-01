import Login from "./Auth/Login";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Register from "./Components/Registration/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />}></Route>
          <Route path="/login" element={<Login />}>
            {" "}
          </Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
