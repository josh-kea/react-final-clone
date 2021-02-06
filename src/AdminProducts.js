import React, { useState, useEffect } from "react";
import { isAdmin } from "./helpers.js";
import { Link, withRouter } from "react-router-dom";
import AdminNav from "./components/AdminNav";
import AdminLeftPanel from "./components/AdminLeftPanel";

require("dotenv").config();

const AdminProducts = (props) => {
console.log(props);

  return (
    <div id="AdminPage">
      <AdminNav></AdminNav>
      <div className="two-grid">

        <AdminLeftPanel></AdminLeftPanel>

        <div id="AdminRightPanel">
            
        </div>

      </div>
    </div>
  );
};

export default AdminProducts;
