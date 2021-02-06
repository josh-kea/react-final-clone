import React, { useState, useEffect } from "react";
import { isAdmin } from "./helpers.js";
import { Link, withRouter } from "react-router-dom";
import AdminNav from "./components/AdminNav";
import AdminLeftPanel from "./components/AdminLeftPanel";

require("dotenv").config();

const AdminHome = (props) => {
  const [state, setState] = useState({
    page: "Home"
  });

  function handleChange(stateProperty) {
    return function (event) {
      setState({ ...state, [stateProperty]: event.target.value });
    };
  }

  return (
    <div id="AdminHome">
      <AdminNav></AdminNav>
      <div className="two-grid">

        <AdminLeftPanel></AdminLeftPanel>

        <div id="AdminRightPanel">
            
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
