import React, { useState } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Editable metrics state
  const [dashboardMetrics, setDashboardMetrics] = useState({
    applicationsThisMonth: 312,
    approvalRate: 28.5,
    avgGrantAmount: 18750,
    avgProcessingTime: 18,
    monthlyGrowth: 23.4,
    approvalGrowth: 2.1,
    amountGrowth: 5.2,
    timeVariance: 3
  });

  // Editable grants pipeline
  const [pipelineData, setPipelineData] = useState([
    { stage: 'Announcement Planning', value: 100, description: 'Grant opportunities in planning phase' },
    { stage: 'Announcement Development', value: 85, description: 'Announcements being drafted and reviewed' },
    { stage: 'Submissions', value: 312, description: 'Applications received this cycle' },
    { stage: 'Selections', value: 89, description: 'Applications approved for funding' }
  ]);

  // Editable funding distribution
  const [fundingData, setFundingData] = useState([
    { category: 'NOFO', amount: 3200000, applications: 178, color: '#3B82F6' },
    { category: 'NOTA Lab Call', amount: 1850000, applications: 94, color: '#10B981' },
    { category: 'TPL', amount: 1450000, applications: 126, color: '#F59E0B' },
    { category: 'PIA', amount: 1100000, applications: 89, color: '#8B5CF6' },
    { category: 'Prize', amount: 750000, applications: 45, color: '#EF4444' }
  ]);

  // Update functions
  const handleMetricUpdate = (metric, value) => {
    setDashboardMetrics(prev => ({
      ...prev,
      [metric]: parseFloat(value) || 0
    }));
  };

  const handlePipelineUpdate = (index, value) => {
    setPipelineData(prev => prev.map((item, i) => 
      i === index ? { ...item, value: parseInt(value) || 0 } : item
    ));
  };

  const handleFundingUpdate = (index, field, value) => {
    setFundingData(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: field === 'amount' || field === 'applications' ? parseInt(value) || 0 : value } : item
    ));
  };

  const EditableMetricCard = ({ title, value, trend, trendValue, metricKey, isPercentage, isDollar, suffix = "" }) => (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">{title}</p>
        {isEditing && (
          <button 
            onClick={() => setIsEditing(false)}
            className="text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200"
          >
            Save
          </button>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div>
          {isEditing ? (
            <input
              type="number"
              value={value}
              onChange={(e) => handleMetricUpdate(metricKey, e.target.value)}
              className="text-2xl font-bold border rounded px-2 py-1 w-32"
              step={isPercentage ? "0.1" : isDollar ? "100" : "1"}
            />
          ) : (
            <p className="text-2xl font-bold">
              {isDollar && "$"}{value.toLocaleString()}{isPercentage && "%"}{suffix}
            </p>
          )}
          <p className={`text-sm ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-blue-600'}`}>
            {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{Math.abs(trendValue)}{isPercentage && trend !== 'neutral' ? '%' : ''} vs {trend === 'neutral' ? 'target' : 'last month'}
          </p>
        </div>
        <div className="text-2xl">
          {title.includes('Applications') && '📊'}
          {title.includes('Approval') && '🏆'}
          {title.includes('Grant Amount') && '💰'}
          {title.includes('Processing') && '⏱️'}
        </div>
      </div>
    </div>
  );

  const EditableFundingTable = () => (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Funding Distribution Editor</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-3 py-1 rounded text-sm ${
            isEditing ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
          }`}
        >
          {isEditing ? 'Save Changes' : 'Edit Data'}
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Category</th>
              <th className="text-left py-2">Amount</th>
              <th className="text-left py-2">Applications</th>
            </tr>
          </thead>
          <tbody>
            {fundingData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 font-medium">{item.category}</td>
                <td className="py-2">
                  {isEditing ? (
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleFundingUpdate(index, 'amount', e.target.value)}
                      className="border rounded px-2 py-1 w-32"
                      step="10000"
                    />
                  ) : (
                    `$${item.amount.toLocaleString()}`
                  )}
                </td>
                <td className="py-2">
                  {isEditing ? (
                    <input
                      type="number"
                      value={item.applications}
                      onChange={(e) => handleFundingUpdate(index, 'applications', e.target.value)}
                      className="border rounded px-2 py-1 w-20"
                    />
                  ) : (
                    item.applications
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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
      { month: 'Jun', submitted: dashboardMetrics.applicationsThisMonth, approved: 89, rejected: 165, pending: 58 }
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
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg ${
              isEditing ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'
            }`}
          >
            {isEditing ? '✓ Save All Changes' : '✏️ Edit Mode'}
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">Export Report</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Configure</button>
        </div>
      </div>

      {isEditing && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-800 mb-2">🔧 Edit Mode Active</h4>
          <p className="text-sm text-yellow-700">Click on metric values to edit them directly. Changes are saved in your browser session.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <EditableMetricCard
          title="Applications This Month"
          value={dashboardMetrics.applicationsThisMonth}
          trend="up"
          trendValue={dashboardMetrics.monthlyGrowth}
          metricKey="applicationsThisMonth"
        />
        
        <EditableMetricCard
          title="Approval Rate"
          value={dashboardMetrics.approvalRate}
          trend="up"
          trendValue={dashboardMetrics.approvalGrowth}
          metricKey="approvalRate"
          isPercentage={true}
        />
        
        <EditableMetricCard
          title="Avg. Grant Amount"
          value={dashboardMetrics.avgGrantAmount}
          trend="up"
          trendValue={dashboardMetrics.amountGrowth}
          metricKey="avgGrantAmount"
          isDollar={true}
        />
        
        <EditableMetricCard
          title="Avg. Processing Time"
          value={dashboardMetrics.avgProcessingTime}
          trend="neutral"
          trendValue={dashboardMetrics.timeVariance}
          metricKey="avgProcessingTime"
          suffix=" days"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Application Volume & Outcomes</h3>
          <div className="space-y-2">
            {[
              'Jan: 156',
              'Feb: 189', 
              'Mar: 234',
              'Apr: 198',
              'May: 267',
              `Jun: ${dashboardMetrics.applicationsThisMonth}`
            ].map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.split(':')[0]}</span>
                <span className="font-bold">{item.split(':')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Grants Program Pipeline</h3>
            {isEditing && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Click values to edit
              </span>
            )}
          </div>
          <div className="space-y-4">
            {pipelineData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="font-medium">{item.stage}</span>
                <div className="flex items-center gap-4">
                  {isEditing ? (
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => handlePipelineUpdate(index, e.target.value)}
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

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">Funding by Category</h3>
          <div className="space-y-2">
            {fundingData.map((item, index) => (
              <div key={index} className="flex justify-between">
                <span>{item.category}</span>
                <span className="font-bold">${(item.amount / 1000000).toFixed(1)}M</span>
              </div>
            ))}
          </div>
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

      {isEditing && <EditableFundingTable />}
    </div>
  );

  // INTELLIGENT METRICS COMPONENT WITH WORKING REPORT BUTTON
  const Metrics = () => {
    // Simulate current metrics data
    const currentMetrics = {
      applicationVolume: dashboardMetrics.applicationsThisMonth,
      approvalRate: dashboardMetrics.approvalRate,
      avgProcessingTime: dashboardMetrics.avgProcessingTime,
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

    // Generate full report function
    const generateFullReport = () => {
      const reportData = {
        reportDate: new Date().toLocaleDateString(),
        quarterPeriod: 'Q2 2024',
        insights: generateInsights(),
        metrics: currentMetrics,
        benchmarks: benchmarks,
        recommendations: [
          'Implement application progress indicators to improve completion rate',
          'Standardize review templates to reduce processing time',
          'Launch applicant help center to maintain satisfaction score',
          'Add pre-screening process to handle application volume efficiently'
        ]
      };

      const reportContent = `GRANTS PROGRAM ANALYTICS REPORT
Generated: ${reportData.reportDate}
Period: ${reportData.quarterPeriod}

EXECUTIVE SUMMARY
=================
Application Volume: ${currentMetrics.applicationVolume} (${((currentMetrics.applicationVolume / benchmarks.applicationVolume.target - 1) * 100).toFixed(1)}% vs target)
Approval Rate: ${currentMetrics.approvalRate}% (${(currentMetrics.approvalRate - benchmarks.approvalRate.target).toFixed(1)}% vs target)
Processing Time: ${currentMetrics.avgProcessingTime} days (${currentMetrics.avgProcessingTime - benchmarks.avgProcessingTime.target} days vs target)
Applicant Satisfaction: ${currentMetrics.applicantSatisfaction}/5 (${(currentMetrics.applicantSatisfaction - benchmarks.applicantSatisfaction.target).toFixed(1)} vs target)

KEY INSIGHTS
============
${reportData.insights.map(insight => `${insight.title}
Priority: ${insight.priority.toUpperCase()}
Finding: ${insight.finding}
Action: ${insight.action}
Impact: ${insight.impact}`).join('\n\n')}

RECOMMENDATIONS
===============
${reportData.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

PERFORMANCE VS BENCHMARKS
=========================
Metric                    Current    Target    Industry   Status
Application Volume        ${currentMetrics.applicationVolume}        ${benchmarks.applicationVolume.target}         ${benchmarks.applicationVolume.industry}          ${currentMetrics.applicationVolume > benchmarks.applicationVolume.target ? 'Above' : 'Below'}
Approval Rate            ${currentMetrics.approvalRate}%      ${benchmarks.approvalRate.target}%        ${benchmarks.approvalRate.industry}%         ${currentMetrics.approvalRate >= benchmarks.approvalRate.target ? 'Above' : 'Below'}
Processing Time          ${currentMetrics.avgProcessingTime} days   ${benchmarks.avgProcessingTime.target} days    ${benchmarks.avgProcessingTime.industry} days     ${currentMetrics.avgProcessingTime <= benchmarks.avgProcessingTime.target ? 'Good' : 'Needs Work'}
Completion Rate          ${currentMetrics.completionRate}%      ${benchmarks.completionRate.target}%        ${benchmarks.completionRate.industry}%         ${currentMetrics.completionRate >= benchmarks.completionRate.target ? 'Good' : 'Below'}
Satisfaction Score       ${currentMetrics.applicantSatisfaction}/5     ${benchmarks.applicantSatisfaction.target}/5       ${benchmarks.applicantSatisfaction.industry}/5        Good
Fund Utilization         ${currentMetrics.fundUtilization}%      ${benchmarks.fundUtilization.target}%        ${benchmarks.fundUtilization.industry}%         Good

Generated by Grants Analytics Platform`;

      // Create and download the report
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Grants_Analytics_Report_${reportData.quarterPeriod.replace(' ', '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Show success message
      alert(`Report generated and downloaded!\n\nIncludes:\n• Executive summary\n• ${reportData.insights.length} key insights\n• Performance benchmarks\n• ${reportData.recommendations.length} recommendations\n\nFile: Grants_Analytics_Report_${reportData.quarterPeriod.replace(' ', '_')}.txt`);
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
          <button 
            onClick={generateFullReport}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            📄 Generate Full Report
          </button>
        </div>

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

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">📊 Performance Scorecard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border rounded p-4">
              <div className="flex items-center justify-between mb-2">
                <span
