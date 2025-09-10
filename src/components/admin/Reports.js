import React, { useState, useEffect } from 'react';
import { 
  Download, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Trophy,
  Printer,
  FileSpreadsheet,
  FileImage,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { NSBM_DESIGN_SYSTEM } from '../../styles/nsbm-design-system';

// NSBM Brand Colors from Design System
const { colors } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;

const Reports = () => {
  const [activeReport, setActiveReport] = useState('player-performance');
  const [reportData, setReportData] = useState({});
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    player: 'all',
    matchType: 'all'
  });

  // Sample report data
  useEffect(() => {
    const sampleData = {
      playerPerformance: [
        { name: 'Monil Jason', runs: 1250, wickets: 5, matches: 15, average: 45.2, strikeRate: 125.5 },
        { name: 'Dulaj Bandara', runs: 890, wickets: 28, matches: 12, average: 32.1, strikeRate: 98.3 },
        { name: 'Suviru Sathnidu', runs: 1100, wickets: 15, matches: 18, average: 38.9, strikeRate: 112.4 },
        { name: 'Lahiru Abhesinghe', runs: 750, wickets: 8, matches: 14, average: 28.6, strikeRate: 105.2 },
        { name: 'Asitha Wanninayake', runs: 650, wickets: 2, matches: 16, average: 25.0, strikeRate: 95.8 },
        { name: 'Suviru Sathnidu', runs: 720, wickets: 6, matches: 14, average: 36.4, strikeRate: 118.0 },
        { name: 'Monil Jason', runs: 810, wickets: 0, matches: 13, average: 40.5, strikeRate: 130.2 },
        { name: 'Lahiru Abhesinghe', runs: 930, wickets: 1, matches: 16, average: 41.8, strikeRate: 127.6 },
        { name: 'Dulaj Bandara', runs: 220, wickets: 22, matches: 15, average: 14.8, strikeRate: 92.7 }
      ],
      teamSeason: {
        totalMatches: 25,
        wins: 18,
        losses: 5,
        draws: 2,
        winPercentage: 72,
        totalRuns: 12500,
        totalWickets: 180,
        averageScore: 250,
        bestBatsman: 'John Smith',
        bestBowler: 'Sarah Johnson'
      },
      fitnessInjury: [
        { player: 'John Smith', status: 'Fit', lastCheck: '2024-01-10', injuries: 0 },
        { player: 'Sarah Johnson', status: 'Injured', lastCheck: '2024-01-08', injuries: 1 },
        { player: 'David Wilson', status: 'Fit', lastCheck: '2024-01-12', injuries: 0 },
        { player: 'Mike Brown', status: 'Recovering', lastCheck: '2024-01-09', injuries: 1 },
        { player: 'Lisa Davis', status: 'Fit', lastCheck: '2024-01-11', injuries: 0 }
      ],
    };
    setReportData(sampleData);
  }, []);

  const reports = [
    { id: 'player-performance', name: 'Player Performance', icon: Users },
    { id: 'team-season', name: 'Team Season', icon: Trophy },
    { id: 'fitness-injury', name: 'Fitness & Injury', icon: TrendingUp }
  ];

  const exportToCSV = (data, filename) => {
    const csvContent = [
      Object.keys(data[0]),
      ...data.map(row => Object.values(row))
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // In a real application, you would use a library like jsPDF or html2pdf
    alert('PDF export functionality would be implemented here using jsPDF or similar library');
  };

  const exportToExcel = () => {
    // In a real application, you would use a library like xlsx
    alert('Excel export functionality would be implemented here using xlsx library');
  };

  const printReport = () => {
    window.print();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Fit': return 'bg-green-100 text-green-800';
      case 'Injured': return 'bg-red-100 text-red-800';
      case 'Recovering': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const winLossData = [
    { name: 'Wins', value: reportData.teamSeason?.wins || 0, color: '#10B981' },
    { name: 'Losses', value: reportData.teamSeason?.losses || 0, color: '#EF4444' },
    { name: 'Draws', value: reportData.teamSeason?.draws || 0, color: '#6B7280' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: nsbmGreen }}>Reports & Analytics</h1>
          <p className="text-white/70">Generate comprehensive reports and insights</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={printReport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print
          </button>
          <button
            onClick={exportToPDF}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FileImage className="w-4 h-4 mr-2" />
            Export PDF
          </button>
          <button
            onClick={exportToExcel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-white/80 mb-1">Date From</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-white/80 mb-1">Date To</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-white/80 mb-1">Player</label>
            <select
              value={filters.player}
              onChange={(e) => setFilters(prev => ({ ...prev, player: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Players</option>
              <option value="john">John Smith</option>
              <option value="sarah">Sarah Johnson</option>
              <option value="david">David Wilson</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-white/80 mb-1">Match Type</label>
            <select
              value={filters.matchType}
              onChange={(e) => setFilters(prev => ({ ...prev, matchType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="T10">T10</option>
              <option value="T20">T20</option>
              <option value="ODI">ODI</option>
              <option value="Test">Test</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <button
                  key={report.id}
                  onClick={() => setActiveReport(report.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeReport === report.id
                      ? 'border-2 text-white px-3 py-2 rounded-lg'
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                  }`}
                  style={activeReport === report.id ? { 
                    backgroundColor: nsbmGreen, 
                    borderColor: nsbmGreen 
                  } : {}}
                >
                  <Icon className="w-4 h-4 mr-2" style={{ color: activeReport === report.id ? 'white' : '#6B7280' }} />
                  {report.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Player Performance Report */}
          {activeReport === 'player-performance' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium" style={{ color: nsbmGreen }}>Player Performance Report</h3>
                <button
                  onClick={() => exportToCSV(reportData.playerPerformance, 'player_performance')}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export CSV
                </button>
              </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Top Performers</h4>
                  <div className="space-y-3">
                    {reportData.playerPerformance?.slice(0, 5).map((player, index) => (
                      <div key={player.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                            style={{ 
                              background: 'linear-gradient(135deg, #002171, #0D47A1)'
                            }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{player.name}</p>
                            <p className="text-sm text-gray-500">{player.matches} matches</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{player.runs} runs</p>
                          <p className="text-base font-semibold text-gray-600">Avg: {player.average}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase">Player</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase">Runs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase">Wickets</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase">Matches</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase">Average</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase">Strike Rate</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.playerPerformance?.map((player) => (
                      <tr key={player.name}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white/80">
                          {player.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                          {player.runs}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                          {player.wickets}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                          {player.matches}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                          {player.average}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white/80">
                          {player.strikeRate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Team Season Report */}
          {activeReport === 'team-season' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium" style={{ color: nsbmGreen }}>Team Season Report</h3>
                <button
                  onClick={() => exportToCSV([reportData.teamSeason], 'team_season')}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export CSV
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Matches</p>
                      <p className="text-2xl font-bold text-white">{reportData.teamSeason?.totalMatches}</p>
                    </div>
                    <Trophy className="w-8 h-8 text-white/60" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Win Percentage</p>
                      <p className="text-2xl font-bold text-white">{reportData.teamSeason?.winPercentage}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-white/60" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Runs</p>
                      <p className="text-2xl font-bold text-white">{reportData.teamSeason?.totalRuns?.toLocaleString()}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-white/60" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Wickets</p>
                      <p className="text-2xl font-bold text-white">{reportData.teamSeason?.totalWickets}</p>
                    </div>
                    <Users className="w-8 h-8 text-white/60" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Win/Loss Ratio</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={winLossData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {winLossData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Season Highlights</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Best Batsman</span>
                      <span className="font-medium text-gray-900">{reportData.teamSeason?.bestBatsman}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Best Bowler</span>
                      <span className="font-medium text-gray-900">{reportData.teamSeason?.bestBowler}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Average Score</span>
                      <span className="font-medium text-gray-900">{reportData.teamSeason?.averageScore}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Total Wins</span>
                      <span className="font-medium text-gray-900">{reportData.teamSeason?.wins}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fitness & Injury Report */}
          {activeReport === 'fitness-injury' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium" style={{ color: nsbmGreen }}>Fitness & Injury Report</h3>
                <button
                  onClick={() => exportToCSV(reportData.fitnessInjury, 'fitness_injury')}
                  className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Export CSV
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Fit Players</p>
                      <p className="text-2xl font-bold text-green-600">
                        {reportData.fitnessInjury?.filter(p => p.status === 'Fit').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Injured Players</p>
                      <p className="text-2xl font-bold text-red-600">
                        {reportData.fitnessInjury?.filter(p => p.status === 'Injured').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Recovering</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {reportData.fitnessInjury?.filter(p => p.status === 'Recovering').length}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <RefreshCw className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Player</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Check</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Injuries</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.fitnessInjury?.map((player) => (
                      <tr key={player.player}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {player.player}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(player.status)}`}>
                            {player.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(player.lastCheck).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {player.injuries}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
