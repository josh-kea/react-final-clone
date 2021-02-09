import React from "react";
import AdminNav from "./components/AdminNav";
import AdminLeftPanel from "./components/AdminLeftPanel";

import SingleProduct from "./components/products/SingleProduct";
import AddProduct from "./components/products/AddProduct";

const AdminSingleProduct = (props) => {

  return (
    <div id="AdminPage">
      <AdminNav></AdminNav>
      <div className="two-grid">

        <AdminLeftPanel activePanel={"Products"}></AdminLeftPanel>

        <div id="AdminRightPanel">
          <SingleProduct></SingleProduct>
          {/* <AddProduct></AddProduct> */}
        </div>

      </div>
    </div>
  );
};

export default AdminSingleProduct;
