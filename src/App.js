import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  // Grant-specific metrics library
  const metricsLibrary = [
    { id: 'applications_submitted', name: 'Applications Submitted', category: 'Application Volume', type: 'leading', description: 'Total number of grant applications submitted' },
    { id: 'completion_rate', name: 'Application Completion Rate', category: 'User Experience', type: 'leading', description: 'Percentage of started applications that are completed' },
    { id: 'approval_rate', name: 'Grant Approval Rate', category: 'Success Metrics', type: 'lagging', description: 'Percentage of applications that receive funding' },
    { id: 'avg_grant_amount', name: 'Average Grant Amount', category: 'Funding', type: 'lagging', description: 'Average dollar amount of approved grants' },
    { id: 'time_to_decision', name: 'Average Time to Decision', category: 'Process Efficiency', type: 'lagging', description: 'Days from submission to funding decision' },
    { id: 'applicant_retention', name: 'Repeat Applicant Rate', category: 'Engagement', type: 'leading', description: 'Percentage of applicants who submit multiple applications' }
  ];

  const sampleData = {
    applications_volume: [
      { month: 'Jan', submitted: 156, approved: 42, rejected: 89, pending: 25 },
      { month: 'Feb', submitted: 189, approved: 51, rejected: 102, pending: 36 },
      { month: 'Mar', submitted: 234, approved: 68, rejected: 128, pending: 38 },
      { month: 'Apr', submitted: 198, approved: 59, rejected: 115, pending: 24 },
      { month: 'May', submitted: 267, approved: 78, rejected: 142, pending: 47 },
      { month: 'Jun', submitted: 312, approved: 89, rejected: 165, pending: 58 }
    ],
    application_funnel: [
      { stage: 'Started', value: 1000 },
      { stage: 'Basic Info', value: 850 },
      { stage: 'Project Details', value: 680 },
      { stage: 'Budget', value: 520 },
      { stage: 'Documents', value: 420 },
      { stage: 'Submitted', value: 380 }
    ],
    funding_distribution: [
      { category: 'NOFO', amount: 3200000, applications: 178, color: '#3B82F6' },
      { category: 'NOTA Lab Call', amount: 1850000, applications: 94, color: '#10B981' },
      { category: 'TPL', amount: 1450000, applications: 126, color: '#F59E0B' },
      { category: 'PIA', amount: 1100000, applications: 89, color: '#8B5CF6' },
      { category: 'Prize', amount: 750000, applications: 45, color: '#EF4444' }
    ],
    reviewer_workload: [
      { reviewer: 'Dr. Smith', assigned: 45, completed: 42, avg_time: 3.2 },
      { reviewer: 'Prof. Johnson', assigned: 38, completed: 38, avg_time: 2.8 },
      { reviewer: 'Ms. Davis', assigned: 52, completed: 48, avg_time: 4.1 }
    ]
  };

  const MetricsSelector = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Grant Metrics Framework</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Add Custom Metric</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricsLibrary.map(metric => (
          <div key={metric.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{metric.name}</h3>
              <span className={`px-2 py-1 text-xs rounded ${
                metric.type === 'leading' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {metric.type}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{metric.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{metric.category}</span>
              <button 
                onClick={() => setSelectedMetrics(prev => 
                  prev.includes(metric.id) 
                    ? prev.filter(id => id !== metric.id)
                    : [...prev, metric.id]
                )}
                className={`px-3 py-1 text-sm rounded ${
                  selectedMetrics.includes(metric.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {selectedMetrics.includes(metric.id) ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Grants Application Analytics Dashboard</h2>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Export Report</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Configure</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Applications This Month</p>
              <p className="text-2xl font-bold">312</p>
              <p className="text-sm text-green-600">+23.4% vs last month</p>
            </div>
            <div className="text-blue-600 text-2xl">📊</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approval Rate</p>
              <p className="text-2xl font-bold">28.5%</p>
              <p className="text-sm text-green-600">+2.1% vs last month</p>
            </div>
            <div className="text-green-600 text-2xl">🏆</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Grant Amount</p>
              <p className="text-2xl font-bold">$18,750</p>
              <p className="text-sm text-blue-600">+5.2% vs last month</p>
            </div>
            <div className="text-purple-600 text-2xl">💰</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Processing Time</p>
              <p className="text-2xl font-bold">18 days</p>
              <p className="text-sm text-red-600">+3 days vs target</p>
            </div>
            <div className="text-yellow-600 text-2xl">⏱️</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Application Volume & Outcomes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleData.applications_volume}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="submitted" fill="#3B82F6" name="Submitted" />
              <Bar dataKey="approved" fill="#10B981" name="Approved" />
              <Bar dataKey="rejected" fill="#EF4444" name="Rejected" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Application Completion Funnel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sampleData.application_funnel} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="stage" />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Funding Distribution by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sampleData.funding_distribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({category, percent}) => `${category} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {sampleData.funding_distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Reviewer Workload & Performance</h3>
          <div className="space-y-3">
            {sampleData.reviewer_workload.map((reviewer, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{reviewer.reviewer}</p>
                  <p className="text-sm text-gray-600">{reviewer.completed}/{reviewer.assigned} completed</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{reviewer.avg_time} days</p>
                  <p className="text-xs text-gray-600">avg. review time</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const QuarterlyReview = () => {
    const [selectedQuarter, setSelectedQuarter] = useState('Q2 2024');

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Quarterly Grants Program Review</h2>
          <div className="flex gap-2">
            <select 
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option>Q2 2024</option>
              <option>Q1 2024</option>
              <option>Q4 2023</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Generate Report</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold mb-4">Executive Summary</h3>
              <textarea 
                placeholder="Key highlights: application volumes, funding outcomes, program effectiveness, and strategic insights from this quarter..."
                className="w-full h-32 border rounded-lg p-3"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold mb-4">Key Program Insights</h3>
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Application Volume Growth</h4>
                  <p className="text-sm text-gray-600">Grant applications increased by 35% this quarter, with NOFO and TPL leading demand.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Improved Approval Efficiency</h4>
                  <p className="text-sm text-gray-600">New review process reduced average decision time from 25 to 18 days while maintaining quality standards.</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Strategic Fund Allocation</h4>
                  <p className="text-sm text-gray-600">Achieved 94% fund utilization while maintaining rigorous selection criteria and impact assessment.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold mb-4">Quarterly Targets Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Applications Processed</span>
                    <span className="text-sm font-medium">1,356</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '108%'}}></div>
                  </div>
                  <span className="text-xs text-gray-600">Target: 1,250</span>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Funds Distributed</span>
                    <span className="text-sm font-medium">$8.9M</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '89%'}}></div>
                  </div>
                  <span className="text-xs text-gray-600">Target: $10M</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <h3 className="text-lg font-semibold mb-4">Program Impact Highlights</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Projects Funded:</span>
                  <span className="font-medium">387</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Impact Value:</span>
                  <span className="font-medium">$24.7M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Beneficiaries Reached:</span>
                  <span className="font-medium">156,000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold text-gray-900">Grants Application Analytics Platform</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Last updated: June 28, 2025</span>
              <span className="text-sm text-gray-600">Q2 2024 Cycle</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'metrics' && <MetricsSelector />}
        {activeTab === 'review' && <QuarterlyReview />}
      </main>
    </div>
  );
};

export default App;
