import { useEffect, useState } from "react";
import Login from "./components/form/Login";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import React from "react";
import SignUp from "./components/form/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
