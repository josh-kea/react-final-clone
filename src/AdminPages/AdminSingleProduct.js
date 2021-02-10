import React from "react";
import AdminNav from "./components/AdminNav";
import AdminLeftPanel from "./components/AdminLeftPanel";

import SingleProduct from "./components/products/SingleProduct";

const AdminSingleProduct = (props) => {

  return (
    <div id="AdminPage">
      <AdminNav></AdminNav>
      <div className="two-grid">

        <AdminLeftPanel activePanel={"Products"}></AdminLeftPanel>

        <div id="AdminRightPanel">
          <SingleProduct></SingleProduct>
        </div>

      </div>
    </div>
  );
};

export default AdminSingleProduct;
