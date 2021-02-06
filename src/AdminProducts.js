import React, { useState, useEffect } from "react";
import { isAdmin } from "./helpers.js";
import { Link, withRouter } from "react-router-dom";
import AdminNav from "./components/AdminNav";
import AdminLeftPanel from "./components/AdminLeftPanel";

import AllProducts from "./components/products/AllProducts";

const AdminProducts = (props) => {

  return (
    <div id="AdminPage">
      <AdminNav></AdminNav>
      <div className="two-grid">

        <AdminLeftPanel activePanel={"Products"}></AdminLeftPanel>

        <div id="AdminRightPanel">
            <AllProducts></AllProducts>
        </div>

      </div>
    </div>
  );
};

export default AdminProducts;
