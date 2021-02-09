import React from "react";
import AdminNav from "./components/AdminNav";
import AdminLeftPanel from "./components/AdminLeftPanel";

import SingleUser from "./components/users/SingleUser";

const AdminSingleUser = (props) => {

  return (
    <div id="AdminPage">
      <AdminNav></AdminNav>
      <div className="two-grid">

        <AdminLeftPanel activePanel={"Users"}></AdminLeftPanel>

        <div id="AdminRightPanel">
          <SingleUser></SingleUser>
        </div>

      </div>
    </div>
  );
};

export default AdminSingleUser;
