import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Verify from './Verify';
import AdminHome from './AdminPages/AdminHome';
import AdminProducts from './AdminPages/AdminProducts';
import AdminUsers from './AdminPages/AdminUsers';
import AdminSingleUser from './AdminPages/AdminSingleUser';
import AdminRoute from './AdminPages/AdminRoute';
import './App.css';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" exact component={LoginPage} />
                <Route path="/signup" exact component={SignupPage} />
                <Route path="/verify/:verifyString" exact component={Verify} />

                <AdminRoute path="/admin" exact component={AdminHome} />
                <AdminRoute path="/admin/products" exact component={AdminProducts} />
                <AdminRoute path="/admin/users" exact component={AdminUsers} />
                <AdminRoute path="/admin/users/:id" exact component={AdminSingleUser} />

            </Switch>
        </BrowserRouter>
    );
};

export default Routes;