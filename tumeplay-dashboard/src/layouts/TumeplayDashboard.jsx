import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const TumeplayDashboardLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Sidebar />
      <div className="relative min-h-screen md:ml-64 md:px-8 pt-8 bg-blueGray-100 pb-10">
				<div className="absolute left-0 top-0 h-1/2 bg-indigo-400 w-full"></div>
        {children}
      </div>
    </>
  )
}

export default TumeplayDashboardLayout;
