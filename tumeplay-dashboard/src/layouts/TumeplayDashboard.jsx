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
        <div className="relative h-full px-8 md:ml-64 bg-gray-100">
          {children}
        </div>
      </main>

    </>
  )
}

export default TumeplayDashboardLayout;
