import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import RoutesWithLayout from './layouts/RoutesWithLayout';
import Dashboard from './views/admin/Dashboard.jsx';
import Settings from './views/admin/Settings';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import TumeplayDashboardLayout from './layouts/TumeplayDashboard';
import AuthenticationLayout from './layouts/AuthenticationLayout.jsx'

const Routes = () => {
  return (
    <Switch>
      <RoutesWithLayout component={Login} layout={AuthenticationLayout} exact path="/login"/>
      <RoutesWithLayout component={Register} layout={AuthenticationLayout} exact path="/register"/>
      <RoutesWithLayout component={Dashboard} layout={TumeplayDashboardLayout} exact path="/"/>
      <RoutesWithLayout component={Settings} layout={TumeplayDashboardLayout} exact path="/settings"/>
      <Redirect from="*" to="/" />
    </Switch>
  )
}

export default Routes;
