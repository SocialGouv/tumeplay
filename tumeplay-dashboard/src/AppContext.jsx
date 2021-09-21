import React from 'react'

const AppContext = React.createContext({
  isAuthenticated: false,
  verifyAuthentication: () => {},
  user: {},
  token: '',
  role: '',
  logOut: () => {},
})

export default AppContext;
