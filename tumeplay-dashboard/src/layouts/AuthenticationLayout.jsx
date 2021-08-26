import React from 'react'

const AuthenticationLayout = (props) => {
    const { children } = props;
  return(
    <main className='container'>
      <div>
        {children}
      </div>
    </main>
  )
}

export default AuthenticationLayout;
