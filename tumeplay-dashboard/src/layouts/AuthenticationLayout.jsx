import React from 'react'

const AuthenticationLayout = (props) => {
    const { children } = props;
  return(
    <main>
      <div>
        {children}
      </div>
    </main>
  )
}

export default AuthenticationLayout;
