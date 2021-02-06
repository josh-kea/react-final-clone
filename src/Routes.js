import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Verify from './Verify';
import AdminHome from './AdminHome';
import AdminProducts from './AdminProducts';
import AdminUsers from './AdminUsers';
import AdminRoute from './AdminRoute';
import './App.css';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/verify/:verifyString" exact component={Verify} />

                <AdminRoute path="/admin" exact component={AdminHome} />
                <AdminRoute path="/admin/products" exact component={AdminProducts} />
                <AdminRoute path="/admin/users" exact component={AdminUsers} />

                {/* <PrivateRoute path="/create" exact component={Create} />
                <Route path="/post/:slug" exact component={SinglePost} />
                <Route path="/post/update/:slug" exact component={UpdatePost} />
                <PrivateRoute path="/post/update/:slug" exact component={UpdatePost} />
                <Route path="/login" exact component={Login} /> */}
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;