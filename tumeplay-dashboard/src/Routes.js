import React, {useContext} from 'react';
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
import ResetPassword from './views/auth/ResetPassword.jsx';
import ROLES from './lib/config.js'
import AppContext from './AppContext.jsx';

const Routes = () => {

  const context = useContext(AppContext)
  const role = context.role

  return (
    <Switch>
      <PublicRoute component={Login} layout={AuthenticationLayout} exact path="/login"/>
      <PublicRoute component={ForgotPassword} layout={AuthenticationLayout} exact path="/forgot-password"/>
      <PublicRoute component={ResetPassword} layout={AuthenticationLayout} exact path="/reset-password"/>
      <PublicRoute component={Register} layout={AuthenticationLayout} exact path="/register"/>
      <PrivateRoute component={Dashboard} layout={TumeplayDashboardLayout} requiredRole={ROLES.CAT.name} exact path="/orders/box/:box_num"/>
      <PrivateRoute component={Bilan} layout={TumeplayDashboardLayout} requiredRole={ROLES.CAT.name} exact path="/bilan"/>
      <PrivateRoute component={Settings} layout={TumeplayDashboardLayout} exact path="/settings"/>
      <Redirect from="*" to={role ? ROLES[role].redirectPath : '/login'}  />
    </Switch>
  )
}

export default Routes;
