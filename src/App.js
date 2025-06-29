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

  // Update functions
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

      {/* Pipeline Section */}
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Monthly Applications</h3>
          <div className="space-y-2">
            {[
              'Jan: 156',
              'Feb: 189', 
              'Mar: 234',
              'Apr: 198',
              'May: 267',
              `Jun: ${metrics.applications}`
            ].map((item, index) => (
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

  const Metrics = () => {
    // Simulate current metrics data
    const currentMetrics = {
      applicationVolume: 312,
      approvalRate: 28.5,
      avgProcessingTime: 18,
      completionRate: 38,
      reviewerEfficiency: 3.2,
      applicantSatisfaction: 4.3,
      fundUtilization: 94,
      resubmissionRate: 12
    };

    // Benchmark data (industry standards)
    const benchmarks = {
      applicationVolume: { target: 250, industry: 280 },
      approvalRate: { target: 30, industry: 25 },
      avgProcessingTime: { target: 15, industry: 20 },
      completionRate: { target: 45, industry: 35 },
      reviewerEfficiency: { target: 2.5, industry: 4.0 },
      applicantSatisfaction: { target: 4.0, industry: 3.8 },
      fundUtilization: { target: 90, industry: 85 },
      resubmissionRate: { target: 8, industry: 15 }
    };

    // Generate insights based on data
    const generateInsights = () => {
      const insights = [];

      // Application Volume Analysis
      if (currentMetrics.applicationVolume > benchmarks.applicationVolume.target) {
        insights.push({
          type: 'success',
          category: 'Application Volume',
          title: 'High Application Volume Detected',
          finding: `Receiving ${currentMetrics.applicationVolume} applications (${Math.round(((currentMetrics.applicationVolume - benchmarks.applicationVolume.target) / benchmarks.applicationVolume.target) * 100)}% above target)`,
          action: 'Consider increasing review team capacity or implementing pre-screening to maintain quality',
          priority: 'medium',
          impact: 'Resource allocation may need adjustment to handle increased volume'
        });
      }

      // Approval Rate Analysis
      if (currentMetrics.approvalRate < benchmarks.approvalRate.target) {
        insights.push({
          type: 'warning',
          category: 'Success Metrics',
          title: 'Below Target Approval Rate',
          finding: `Current approval rate of ${currentMetrics.approvalRate}% is below target of ${benchmarks.approvalRate.target}%`,
          action: 'Review selection criteria and provide additional guidance to applicants',
          priority: 'high',
          impact: 'May indicate criteria are too strict or applicants need better support'
        });
      }

      // Processing Time Analysis
      if (currentMetrics.avgProcessingTime > benchmarks.avgProcessingTime.target) {
        insights.push({
          type: 'critical',
          category: 'Process Efficiency',
          title: 'Processing Time Exceeds Target',
          finding: `Average processing time of ${currentMetrics.avgProcessingTime} days exceeds target of ${benchmarks.avgProcessingTime.target} days`,
          action: 'Streamline review process and consider adding more reviewers',
          priority: 'high',
          impact: 'Delays may frustrate applicants and reduce program effectiveness'
        });
      }

      // Completion Rate Analysis
      if (currentMetrics.completionRate < benchmarks.completionRate.target) {
        insights.push({
          type: 'warning',
          category: 'User Experience',
          title: 'Low Application Completion Rate',
          finding: `Only ${currentMetrics.completionRate}% of started applications are completed`,
          action: 'Analyze application form for user experience issues and add progress indicators',
          priority: 'medium',
          impact: 'Losing potential quality applicants due to form complexity'
        });
      }

      // Positive Performance
      if (currentMetrics.applicantSatisfaction > benchmarks.applicantSatisfaction.target) {
        insights.push({
          type: 'success',
          category: 'User Experience',
          title: 'Excellent Applicant Satisfaction',
          finding: `Satisfaction score of ${currentMetrics.applicantSatisfaction}/5 exceeds target and industry average`,
          action: 'Document successful practices and share with similar programs',
          priority: 'low',
          impact: 'Strong satisfaction likely to increase word-of-mouth applications'
        });
      }

      return insights;
    };

    const insights = generateInsights();

    const getStatusColor = (current, target, isReverse = false) => {
      const ratio = current / target;
      if (isReverse) {
        if (ratio <= 0.9) return 'text-green-600';
        if (ratio <= 1.1) return 'text-yellow-600';
        return 'text-red-600';
      } else {
        if (ratio >= 1.1) return 'text-green-600';
        if (ratio >= 0.9) return 'text-yellow-600';
        return 'text-red-600';
      }
    };

    const getStatusIcon = (current, target, isReverse = false) => {
      const ratio = current / target;
      if (isReverse) {
        if (ratio <= 0.9) return '✅';
        if (ratio <= 1.1) return '⚠️';
        return '🚨';
      } else {
        if (ratio >= 1.1) return '✅';
        if (ratio >= 0.9) return '⚠️';
        return '🚨';
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Grant Metrics Intelligence</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Generate Full Report
          </button>
        </div>

        {/* Key Insights Dashboard */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">🎯 Key Insights & Recommended Actions</h3>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className={`border-l-4 p-4 rounded ${
                insight.type === 'critical' ? 'border-red-500 bg-red-50' :
                insight.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                'border-green-500 bg-green-50'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded ${
                    insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                    insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {insight.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2"><strong>Finding:</strong> {insight.finding}</p>
                <p className="text-sm text-gray-700 mb-2"><strong>Recommended Action:</strong> {insight.action}</p>
                <p className="text-sm text-gray-600"><strong>Impact:</strong> {insight.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Scorecard */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">📊 Performance Scorecard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Application Volume</span>
                <span className="text-lg">{getStatusIcon(currentMetrics.applicationVolume, benchmarks.applicationVolume.target)}</span>
              </div>
              <div className="text-2xl font-bold">{currentMetrics.applicationVolume}</div>
              <div className={`text-sm ${getStatusColor(currentMetrics.applicationVolume, benchmarks.applicationVolume.target)}`}>
                Target: {benchmarks.applicationVolume.target} | Industry: {benchmarks.applicationVolume.industry}
              </div>
            </div>

            <div className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Approval Rate</span>
                <span className="text-lg">{getStatusIcon(currentMetrics.approvalRate, benchmarks.approvalRate.target)}</span>
              </div>
              <div className="text-2xl font-bold">{currentMetrics.approvalRate}%</div>
              <div className={`text-sm ${getStatusColor(currentMetrics.approvalRate, benchmarks.approvalRate.target)}`}>
                Target: {benchmarks.approvalRate.target}% | Industry: {benchmarks.approvalRate.industry}%
              </div>
            </div>

            <div className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Processing Time</span>
                <span className="text-lg">{getStatusIcon(currentMetrics.avgProcessingTime, benchmarks.avgProcessingTime.target, true)}</span>
              </div>
              <div className="text-2xl font-bold">{currentMetrics.avgProcessingTime} days</div>
              <div className={`text-sm ${getStatusColor(currentMetrics.avgProcessingTime, benchmarks.avgProcessingTime.target, true)}`}>
                Target: {benchmarks.avgProcessingTime.target} days | Industry: {benchmarks.avgProcessingTime.industry} days
              </div>
            </div>

            <div className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-lg">{getStatusIcon(currentMetrics.completionRate, benchmarks.completionRate.target)}</span>
              </div>
              <div className="text-2xl font-bold">{currentMetrics.completionRate}%</div>
              <div className={`text-sm ${getStatusColor(currentMetrics.completionRate, benchmarks.completionRate.target)}`}>
                Target: {benchmarks.completionRate.target}% | Industry: {benchmarks.completionRate.industry}%
              </div>
            </div>

            <div className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Applicant Satisfaction</span>
                <span className="text-lg">{getStatusIcon(currentMetrics.applicantSatisfaction, benchmarks.applicantSatisfaction.target)}</span>
              </div>
              <div className="text-2xl font-bold">{currentMetrics.applicantSatisfaction}/5</div>
              <div className={`text-sm ${getStatusColor(currentMetrics.applicantSatisfaction, benchmarks.applicantSatisfaction.target)}`}>
                Target: {benchmarks.applicantSatisfaction.target}/5 | Industry: {benchmarks.applicantSatisfaction.industry}/5
              </div>
            </div>

            <div className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Fund Utilization</span>
                <span className="text-lg">{getStatusIcon(currentMetrics.fundUtilization, benchmarks.fundUtilization.target)}</span>
              </div>
              <div className="text-2xl font-bold">{currentMetrics.fundUtilization}%</div>
              <div className={`text-sm ${getStatusColor(currentMetrics.fundUtilization, benchmarks.fundUtilization.target)}`}>
                Target: {benchmarks.fundUtilization.target}% | Industry: {benchmarks.fundUtilization.industry}%
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">🔍 Recommended Deep Dives</h3>
            <div className="space-y-3">
              <div className="border rounded p-3">
                <h4 className="font-medium">Application Drop-off Analysis</h4>
                <p className="text-sm text-gray-600 mb-2">62% of users don't complete applications</p>
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                  Analyze Funnel →
                </button>
              </div>
              <div className="border rounded p-3">
                <h4 className="font-medium">Reviewer Performance Review</h4>
                <p className="text-sm text-gray-600 mb-2">Processing times vary significantly by reviewer</p>
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                  View Details →
                </button>
              </div>
              <div className="border rounded p-3">
                <h4 className="font-medium">Category Performance Comparison</h4>
                <p className="text-sm text-gray-600 mb-2">NOFO vs TPL approval rate analysis</p>
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                  Compare →
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold mb-4">⚡ Quick Wins</h3>
            <div className="space-y-3">
              <div className="border rounded p-3 border-green-200 bg-green-50">
                <h4 className="font-medium text-green-800">Add Progress Indicators</h4>
                <p className="text-sm text-green-700 mb-2">Could improve completion rate by 15-20%</p>
                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">EASY IMPLEMENTATION</span>
              </div>
              <div className="border rounded p-3 border-yellow-200 bg-yellow-50">
                <h4 className="font-medium text-yellow-800">Standardize Review Templates</h4>
                <p className="text-sm text-yellow-700 mb-2">Reduce processing time variation</p>
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">MODERATE EFFORT</span>
              </div>
              <div className="border rounded p-3 border-blue-200 bg-blue-50">
                <h4 className="font-medium text-blue-800">Launch Applicant Help Center</h4>
                <p className="text-sm text-blue-700 mb-2">Address common questions proactively</p>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">HIGH IMPACT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Review = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-2xl font-bold mb-4">Quarterly Review</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Quarter</label>
            <select className="border rounded px-3 py-2">
              <option>Q2 2024</option>
              <option>Q1 2024</option>
              <option>Q4 2023</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Executive Summary</label>
            <textarea 
              className="w-full border rounded px-3 py-2 h-32"
              placeholder="Enter key highlights and insights from this quarter..."
            />
          </div>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Generate Report
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="space-y-3">
          <div className="border rounded p-4">
            <h4 className="font-medium">Application Growth</h4>
            <p className="text-sm text-gray-600">35% increase in applications this quarter</p>
          </div>
          <div className="border rounded p-4">
            <h4 className="font-medium">Process Improvement</h4>
            <p className="text-sm text-gray-600">Reduced decision time from 25 to 18 days</p>
          </div>
          <div className="border rounded p-4">
            <h4 className="font-medium">Fund Utilization</h4>
            <p className="text-sm text-gray-600">94% of available funds allocated effectively</p>
          </div>
        </div>
      </div>
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
