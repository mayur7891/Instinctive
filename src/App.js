import React from 'react';
import Sidebar from './components/Sidebar';

import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar className="w-1/4 bg-white-100" />


      <div className="flex-1 flex flex-col">

        <Dashboard></Dashboard>
      </div>
    </div>
  );
};

export default App;
