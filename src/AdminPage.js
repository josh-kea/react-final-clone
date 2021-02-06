import React, { useState, useEffect } from "react";
import { isAdmin } from './helpers.js';
import { Link, withRouter } from 'react-router-dom';
import AdminNav from './components/AdminNav';
import AdminLeftPanel from './components/AdminLeftPanel';

require("dotenv").config();

const AdminPage = (props) => {

    return (
    <div id="AdminPage">
        <AdminNav></AdminNav>
        <AdminLeftPanel></AdminLeftPanel>
    </div>
  );
};

export default AdminPage;
