import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized.jsx";
import { Login } from "./components/Login/Login.jsx";
import { ApplicationViews } from "./views/ApplicationViews.jsx";
import React from "react";
import { Register } from "./components/Login/Register.jsx";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <ApplicationViews />
          </Authorized>
        }
      />
    </Routes>
  );
}

export default App;

