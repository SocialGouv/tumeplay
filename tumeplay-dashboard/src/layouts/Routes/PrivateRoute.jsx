import React, {useContext} from 'react'
import AppContext from '../../AppContext'
import { Redirect } from 'react-router'
import RoutesWithLayout from '../RoutesWithLayout'

const PrivateRoute = (props) => {
  const context = useContext(AppContext)
  const isAuthenticated = context.isAuthenticated
  if(!isAuthenticated) {return <Redirect to='/login' />}
  else{
    return(
      <RoutesWithLayout {...props} />
    )
  }
}

export default PrivateRoute;
