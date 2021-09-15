import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const TumeplayDashboardLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Sidebar />
      <div className="relative h-full md:ml-64">
        {children}
      </div>
    </>
  )
}

export default TumeplayDashboardLayout;
