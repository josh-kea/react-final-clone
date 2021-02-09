import React from "react";
import AdminNav from "./components/AdminNav";
import AdminLeftPanel from "./components/AdminLeftPanel";

const AdminHome = (props) => {

  return (
    <div id="AdminHome">
      <AdminNav></AdminNav>
      <div className="two-grid">

        <AdminLeftPanel activePanel={"Home"}></AdminLeftPanel>

        <div id="AdminRightPanel">
            
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
