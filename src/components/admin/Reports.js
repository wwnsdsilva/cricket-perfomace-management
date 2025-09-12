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
  XCircle,
  Target
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
        { name: 'Monil Jason', role: 'Captain', runs: 1250, battingAverage: 45.2, wickets: 5, bowlingAverage: 22.5, economy: 6.8, matches: 15, strikeRate: 125.5 },
        { name: 'Dulaj Bandara', role: 'Vice Captain', runs: 890, battingAverage: 32.1, wickets: 28, bowlingAverage: 12.5, economy: 6.2, matches: 12, strikeRate: 98.3 },
        { name: 'Suviru Sathnidu', role: 'All Rounder', runs: 1100, battingAverage: 38.9, wickets: 15, bowlingAverage: 18.2, economy: 6.5, matches: 18, strikeRate: 112.4 },
        { name: 'Lahiru Abhesinghe', role: 'Batsman', runs: 750, battingAverage: 28.6, wickets: 8, bowlingAverage: 22.5, economy: 6.8, matches: 14, strikeRate: 105.2 },
        { name: 'Asitha Wanninayake', role: 'Batsman', runs: 650, battingAverage: 25.0, wickets: 2, bowlingAverage: 35.0, economy: 7.2, matches: 16, strikeRate: 95.8 },
        { name: 'Maneendra Jayathilaka', role: 'Wicket Keeper', runs: 950, battingAverage: 35.8, wickets: 12, bowlingAverage: 20.1, economy: 5.9, matches: 13, strikeRate: 118.0 },
        { name: 'Dilhara Polgampola', role: 'Bowler', runs: 800, battingAverage: 30.2, wickets: 18, bowlingAverage: 15.8, economy: 5.8, matches: 11, strikeRate: 110.5 },
        { name: 'Dinesh Pethiyagoda', role: 'All Rounder', runs: 700, battingAverage: 28.0, wickets: 6, bowlingAverage: 25.0, economy: 6.5, matches: 10, strikeRate: 102.3 },
        { name: 'Pathum Perera', role: 'Batsman', runs: 600, battingAverage: 25.5, wickets: 4, bowlingAverage: 28.5, economy: 6.9, matches: 9, strikeRate: 98.7 }
      ],
      topBowlers: [
        { name: 'Dulaj Bandara', wickets: 28, matches: 12, average: 12.5, economy: 6.2, photo: '/images/gallery/players/dulaj.jpg' },
        { name: 'Dilhara Polgampola', wickets: 18, matches: 11, average: 15.8, economy: 5.8, photo: '/images/gallery/players/lahiru.jpeg' },
        { name: 'Suviru Sathnidu', wickets: 15, matches: 18, average: 18.2, economy: 6.5, photo: '/images/gallery/players/suviru.jpg' },
        { name: 'Maneendra Jayathilaka', wickets: 12, matches: 13, average: 20.1, economy: 5.9, photo: '/images/gallery/players/maniya.jpg' },
        { name: 'Lahiru Abhesinghe', wickets: 8, matches: 14, average: 22.5, economy: 6.8, photo: '/images/gallery/players/lahiru.jpeg' }
      ],
      topFielders: [
        { name: 'Maneendra Jayathilaka', catches: 15, stumpings: 4, runOuts: 3, total: 22, photo: '/images/gallery/players/maniya.jpg' },
        { name: 'Monil Jason', catches: 12, stumpings: 2, runOuts: 4, total: 18, photo: '/images/gallery/players/dulaj.jpg' },
        { name: 'Suviru Sathnidu', catches: 10, stumpings: 1, runOuts: 5, total: 16, photo: '/images/gallery/players/suviru.jpg' },
        { name: 'Dilhara Polgampola', catches: 8, stumpings: 0, runOuts: 6, total: 14, photo: '/images/gallery/players/lahiru.jpeg' },
        { name: 'Dulaj Bandara', catches: 7, stumpings: 1, runOuts: 4, total: 12, photo: '/images/gallery/players/asitha.jpeg' }
      ],
      teamSeason: {
        totalMatches: 25,
        wins: 18,
        losses: 5,
        draws: 2,
        winPercentage: 72,
        totalRuns: 12500,
        totalWickets: 180,
        bestBatsman: 'Monil Jason',
        bestBowler: 'Dulaj Bandara',
        bestFielder: 'Maneendra Jayathilaka'
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Batsmen */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Trophy className="w-5 h-5 mr-2" style={{ color: nsbmGreen }} />
                    Top Batsmen
                  </h4>
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
                            <p className="text-sm text-gray-500">{player.role} • {player.matches} matches</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{player.runs} runs</p>
                          <p className="text-base font-semibold text-gray-600">Avg: {player.battingAverage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Bowlers */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" style={{ color: colors.brandSecondary }} />
                    Top Bowlers
                  </h4>
                  <div className="space-y-3">
                    {reportData.topBowlers?.map((bowler, index) => (
                      <div key={bowler.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                            style={{ 
                              background: 'linear-gradient(135deg, #0D47A1, #1976D2)'
                            }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{bowler.name}</p>
                            <p className="text-sm text-gray-500">{bowler.matches} matches</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{bowler.wickets} wickets</p>
                          <p className="text-base font-semibold text-gray-600">Avg: {bowler.average}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Fielders */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Target className="w-5 h-5 mr-2" style={{ color: colors.brandAccent }} />
                    Top Fielders
                  </h4>
                  <div className="space-y-3">
                    {reportData.topFielders?.map((fielder, index) => (
                      <div key={fielder.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                            style={{ 
                              background: 'linear-gradient(135deg, #F57C00, #FF9800)'
                            }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{fielder.name}</p>
                            <p className="text-sm text-gray-500">{fielder.catches + fielder.stumpings + fielder.runOuts} dismissals</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{fielder.total} total</p>
                          <p className="text-base font-semibold text-gray-600">{fielder.catches}C, {fielder.stumpings}S, {fielder.runOuts}RO</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">All Players Performance</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player Name</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Runs Scored</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Batting Average</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Wickets</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Bowling Average</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Economy</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reportData.playerPerformance?.map((player, index) => (
                        <tr key={player.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-700">
                                    {player.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{player.name}</div>
                                <div className="text-sm text-gray-500">{player.role} • {player.matches} matches</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-semibold text-gray-900">{player.runs}</div>
                            <div className="text-xs text-gray-500">runs</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-semibold text-gray-900">{player.battingAverage}</div>
                            <div className="text-xs text-gray-500">avg</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-semibold text-gray-900">{player.wickets}</div>
                            <div className="text-xs text-gray-500">wickets</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-semibold text-gray-900">{player.bowlingAverage}</div>
                            <div className="text-xs text-gray-500">avg</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-semibold text-gray-900">{player.economy}</div>
                            <div className="text-xs text-gray-500">rpo</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                      <span className="text-sm text-gray-600">Best Fielder</span>
                      <span className="font-medium text-gray-900">{reportData.teamSeason?.bestFielder}</span>
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