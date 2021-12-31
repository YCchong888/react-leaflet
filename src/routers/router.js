import React, { Component } from "react";
import {BrowserRouter as Router,  Route, Routes, Navigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import LoginUser from "../layouts/LoginUser/LoginUser";
import Home from "../pages/home/home";
export default class RouterWrap extends Component {
  render() {
    return (
      <div id="router">
        <Router>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/login" element={<LoginUser />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
