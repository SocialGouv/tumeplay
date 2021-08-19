import React from 'react';
import {Route, Switch} from 'react-router-dom';
import RoutesWithLayout from './layouts/RoutesWithLayout';
import Dashboard from './views/admin/Dashboard.jsx';
import Settings from './views/admin/Settings';
import Login from './views/auth/Login';
import Register from './views/auth/Register';
import TumeplayDashboardLayout from './layouts/TumeplayDashboard'

const Routes = () => {
  return (
    <Switch>
      <RoutesWithLayout component={Dashboard} layout={TumeplayDashboardLayout} exact path="/"/>
      <RoutesWithLayout component={Settings} layout={TumeplayDashboardLayout} exact path="/settings"/>
      <RoutesWithLayout component={Login} layout={TumeplayDashboardLayout} exact path="/login"/>
      <RoutesWithLayout component={Register} layout={TumeplayDashboardLayout} exact path="/register"/>
      <Route />

    </Switch>
  )
}

export default Routes;
