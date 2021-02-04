import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import Signup from './Signup';
import './App.css';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signup" exact component={Signup} />

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