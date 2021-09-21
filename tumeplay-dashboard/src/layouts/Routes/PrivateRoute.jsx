import React, {useContext} from 'react'
import AppContext from '../../AppContext'
import { Redirect } from 'react-router'
import RoutesWithLayout from '../RoutesWithLayout'
import ROLES from '../../lib/config'

const PrivateRoute = (props) => {
  const {requiredRole} = props;
  const context = useContext(AppContext)
  const isAuthenticated = context.isAuthenticated
  const role = context.role

  if(!isAuthenticated) {return <Redirect to='/login' />}
  else if(requiredRole === role){
    return(
      <RoutesWithLayout {...props} />
    )
  } else {
    return(
      <Redirect from="*" to={ROLES[role].redirectPath}  />
    )
  }
}

export default PrivateRoute;
