import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  
  // Simple metrics state
  const [metrics, setMetrics] = useState({
    applications: 312,
    approvalRate: 28.5,
    avgAmount: 18750,
    processingTime: 18
  });

  // Pipeline data
  const [pipeline, setPipeline] = useState([
    { stage: 'Announcement Planning', value: 100 },
    { stage: 'Announcement Development', value: 85 },
    { stage: 'Submissions', value: 312 },
    { stage: 'Selections', value: 89 }
  ]);

  const updateMetric = (key, value) => {
    setMetrics(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const updatePipeline = (index, value) => {
    setPipeline(prev => prev.map((item, i) => 
      i === index ? { ...item, value: parseInt(value) || 0 } : item
    ));
  };

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Grants Analytics Dashboard</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded text-white ${
            isEditing ? 'bg-green-600' : 'bg-blue-600'
          }`}
        >
          {isEditing ? 'Save Changes' : 'Edit Mode'}
        </button>
      </div>

      {isEditing && (
        <div className="bg-yellow-100 border border-yellow-300 rounded p-4">
          <p className="text-yellow-800">Edit Mode: Click values to modify them</p>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow border">
          <p className="text-sm text-gray-600">Applications This Month</p>
          {isEditing ? (
            <input
              type="number"
              value={metrics.applications}
              onChange={(e) => updateMetric('applications', e.target.value)}
              className="text-2xl font-bold border rounded px-2 py-1 w-full"
            />
          ) : (
            <p className="text-2xl font-bold">{metrics.applications.toLocaleString()}</p>
          )}
          <p className="text-sm text-green-600">+23.4% vs last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <p className="text-sm text-gray-600">Approval Rate</p>
          {isEditing ? (
            <input
              type="number"
              value={metrics.approvalRate}
              onChange={(e) => updateMetric('approvalRate', e.target.value)}
              className="text-2xl font-bold border rounded px-2 py-1 w-full"
              step="0.1"
            />
          ) : (
            <p className="text-2xl font-bold">{metrics.approvalRate}%</p>
          )}
          <p className="text-sm text-green-600">+2.1% vs last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <p className="text-sm text-gray-600">Avg. Grant Amount</p>
          {isEditing ? (
            <input
              type="number"
              value={metrics.avgAmount}
              onChange={(e) => updateMetric('avgAmount', e.target.value)}
              className="text-2xl font-bold border rounded px-2 py-1 w-full"
              step="100"
            />
          ) : (
            <p className="text-2xl font-bold">${metrics.avgAmount.toLocaleString()}</p>
          )}
          <p className="text-sm text-blue-600">+5.2% vs last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <p className="text-sm text-gray-600">Processing Time</p>
          {isEditing ? (
            <input
              type="number"
              value={metrics.processingTime}
              onChange={(e) => updateMetric('processingTime', e.target.value)}
              className="text-2xl font-bold border rounded px-2 py-1 w-full"
            />
          ) : (
            <p className="text-2xl font-bold">{metrics.processingTime} days</p>
          )}
          <p className="text-sm text-red-600">+3 days vs target</p>
        </div>
      </div>

      {/* Pipeline Chart */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-4">Grants Program Pipeline</h3>
        <div className="space-y-4">
          {pipeline.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-medium">{item.stage}</span>
              <div className="flex items-center gap-4">
                {isEditing ? (
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => updatePipeline(index, e.target.value)}
                    className="border rounded px-2 py-1 w-20"
                  />
                ) : (
                  <span className="font-bold">{item.value}</span>
                )}
                <div className="w-48 bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full"
                    style={{ width: `${Math.min((item.value / 312) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Monthly Applications</h3>
          <div className="space-y-2">
            {['Jan: 156', 'Feb: 189', 'Mar: 234', 'Apr: 198', 'May: 267', `Jun: ${metrics.applications}`].map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.split(':')[0]}</span>
                <span className="font-bold">{item.split(':')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Funding by Category</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>NOFO</span>
              <span className="font-bold">$3.2M</span>
            </div>
            <div className="flex justify-between">
              <span>NOTA Lab Call</span>
              <span className="font-bold">$1.85M</span>
            </div>
            <div className="flex justify-between">
              <span>TPL</span>
              <span className="font-bold">$1.45M</span>
            </div>
            <div className="flex justify-between">
              <span>PIA</span>
              <span className="font-bold">$1.1M</span>
            </div>
            <div className="flex justify-between">
              <span>Prize</span>
              <span className="font-bold">$750K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Metrics = () => (
    <div className="bg-white p-6 rounded-lg shadow border">
      <h2 className="text-2xl font-bold mb-4">Grant Metrics</h2>
      <p>Metrics configuration coming soon...</p>
    </div>
  );

  const Review = () => (
    <div className="bg-white p-6 rounded-lg shadow border">
      <h2 className="text-2xl font-bold mb-4">Quarterly Review</h2>
      <p>Quarterly review features coming soon...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">
            Grants Application Analytics Platform
          </h1>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard' },
              { id: 'metrics', name: 'Grant Metrics' },
              { id: 'review', name: 'Quarterly Review' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'metrics' && <Metrics />}
        {activeTab === 'review' && <Review />}
      </main>
    </div>
  );
};

export default App;
