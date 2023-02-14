import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
import BalanceStatement from "./Layout/BalanceStatement";
import IncomeStatement from "./Layout/IncomeStatement";
import Header from "./Layout/Header";
import Home from "./Layout/Home";
// React Notification

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/BalanceStatement" element={<BalanceStatement />}></Route>
        <Route path="/IncomeStatement" element={<IncomeStatement />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
