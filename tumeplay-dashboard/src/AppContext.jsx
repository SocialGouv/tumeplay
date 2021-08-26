import React from 'react'

const AppContext = React.createContext({
  isAuthenticated: false,
  verifyAuthentication: () => {},
  user: {},
  logOut: () => {}
})

export default AppContext;
