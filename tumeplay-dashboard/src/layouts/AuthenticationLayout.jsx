import React from 'react'

const AuthenticationLayout = (props) => {
    const { children } = props;
  return(
    <main className='bg-no-repeat bg-cover' style={{
			backgroundImage: "url(" + require("../assets/pictures/auth-bg.jpg").default + ")",
		}}>
			<div className='container mx-auto'>
				<div>
					{children}
				</div>
			</div>
    </main>
  )
}

export default AuthenticationLayout;