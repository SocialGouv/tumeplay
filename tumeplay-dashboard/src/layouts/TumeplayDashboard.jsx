import React from 'react'
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const TumeplayDashboardLayout = (props) => {
  const { children } = props;
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>
      <div className="relative h-full md:ml-64 bg-blueGray-100">
          {children}
        </div>
      </main>

    </>
  )
}

export default TumeplayDashboardLayout;
