import React from 'react'

const TumeplayDashboardLayout = (props) => {
  const { children } = props;
  return (
    <>
      <div className="container mx-auto mt-16">
        {children}
      </div>

    </>
  )
}

export default TumeplayDashboardLayout;
