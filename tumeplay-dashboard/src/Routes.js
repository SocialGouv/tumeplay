import React from 'react';
import {Switch, Redirect} from 'react-router-dom';
import Dashboard from './views/admin/Dashboard.jsx';
import Settings from './views/admin/Settings';
import Login from './views/auth/Login';
import ForgotPassword from './views/auth/ForgotPassword';
import Register from './views/auth/Register';
import TumeplayDashboardLayout from './layouts/TumeplayDashboard';
import AuthenticationLayout from './layouts/AuthenticationLayout.jsx'
import PrivateRoute from './layouts/Routes/PrivateRoute';
import PublicRoute from './layouts/Routes/PublicRoute';
import Bilan from './views/admin/Bilan.jsx';

const Routes = () => {
  return (
    <Switch>
      <PublicRoute component={Login} layout={AuthenticationLayout} exact path="/login"/>
      <PublicRoute component={ForgotPassword} layout={AuthenticationLayout} exact path="/forgot-password"/>
      <PublicRoute component={Register} layout={AuthenticationLayout} exact path="/register"/>
      <PrivateRoute component={Dashboard} layout={TumeplayDashboardLayout} exact path="/orders/box/:box_num"/>
      <PrivateRoute component={Bilan} layout={TumeplayDashboardLayout} exact path="/bilan"/>
      <PrivateRoute component={Settings} layout={TumeplayDashboardLayout} exact path="/settings"/>
      <Redirect from="*" to="/orders/box/1" />
    </Switch>
  )
}

export default Routes;
