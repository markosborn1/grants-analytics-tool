import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Grants Analytics Tool</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p>Your grants analytics tool is working!</p>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-100 p-4 rounded">
              <h3 className="font-semibold">Applications</h3>
              <p className="text-2xl font-bold">312</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h3 className="font-semibold">Approval Rate</h3>
              <p className="text-2xl font-bold">28.5%</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
