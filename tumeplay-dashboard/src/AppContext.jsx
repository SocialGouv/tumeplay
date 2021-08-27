import React from 'react'

const AppContext = React.createContext({
  isAuthenticated: false,
  verifyAuthentication: () => {},
  user: {},
  token: '',
  logOut: () => {}
})

export default AppContext;
