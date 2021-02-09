import React from "react";
import AdminNav from "./components/AdminNav";
import AdminLeftPanel from "./components/AdminLeftPanel";

import AllUsers from "./components/users/AllUsers";

const AdminUsers = (props) => {

  return (
    <div id="AdminPage">
      <AdminNav></AdminNav>
      <div className="two-grid">

        <AdminLeftPanel activePanel={"Users"}></AdminLeftPanel>

        <div id="AdminRightPanel">
          <AllUsers></AllUsers>
        </div>

      </div>
    </div>
  );
};

export default AdminUsers;
