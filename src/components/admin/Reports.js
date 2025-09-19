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
import PerformanceService from '../../services/PerformanceService';
import MatchService from '../../services/MatchService';
import InjuryService from '../../services/InjuryService';

// NSBM Brand Colors from Design System
const { colors } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;

const sampleData = {
  playerPerformance: [
    { player_name: 'Monil Jason', player_role: 'Captain', total_runs: 1250, batting_average: 45.2, total_wickets: 5, bowling_average: 22.5, economy_rate: 6.8, matches_played: 15, strike_rate: 125.5 },
    { player_name: 'Dulaj Bandara', player_role: 'Vice Captain', total_runs: 890, batting_average: 32.1, total_wickets: 28, bowling_average: 12.5, economy_rate: 6.2, matches_played: 12, strike_rate: 98.3 },
    { player_name: 'Suviru Sathnidu', player_role: 'All Rounder', total_runs: 1100, batting_average: 38.9, total_wickets: 15, bowling_average: 18.2, economy_rate: 6.5, matches_played: 18, strike_rate: 112.4 },
    { player_name: 'Lahiru Abhesinghe', player_role: 'Batsman', total_runs: 750, batting_average: 28.6, total_wickets: 8, bowling_average: 22.5, economy_rate: 6.8, matches_played: 14, strike_rate: 105.2 },
    { player_name: 'Asitha Wanninayake', player_role: 'Batsman', total_runs: 650, batting_average: 25.0, total_wickets: 2, bowling_average: 35.0, economy_rate: 7.2, matches_played: 16, strike_rate: 95.8 },
    { player_name: 'Maneendra Jayathilaka', player_role: 'Wicket Keeper', total_runs: 950, batting_average: 35.8, total_wickets: 12, bowling_average: 20.1, economy_rate: 5.9, matches_played: 13, strike_rate: 118.0 },
    { player_name: 'Dilhara Polgampola', player_role: 'Bowler', total_runs: 800, batting_average: 30.2, total_wickets: 18, bowling_average: 15.8, economy_rate: 5.8, matches_played: 11, strike_rate: 110.5 },
    { player_name: 'Dinesh Pethiyagoda', player_role: 'All Rounder', total_runs: 700, batting_average: 28.0, total_wickets: 6, bowling_average: 25.0, economy_rate: 6.5, matches_played: 10, strike_rate: 102.3 },
    { player_name: 'Pathum Perera', player_role: 'Batsman', total_runs: 600, batting_average: 25.5, total_wickets: 4, bowling_average: 28.5, economy_rate: 6.9, matches_played: 9, strike_rate: 98.7 }
  ],
  topBowlers: [
    { player_name: 'Dulaj Bandara', total_wickets: 28, matches_played: 12, bowling_average: 12.5, economy_rate: 6.2, image_url: '/images/gallery/players/dulaj.jpg' },
    { player_name: 'Dilhara Polgampola', total_wickets: 18, matches_played: 11, bowling_average: 15.8, economy_rate: 5.8, image_url: '/images/gallery/players/lahiru.jpeg' },
    { player_name: 'Suviru Sathnidu', total_wickets: 15, matches_played: 18, bowling_average: 18.2, economy_rate: 6.5, image_url: '/images/gallery/players/suviru.jpg' },
    { player_name: 'Maneendra Jayathilaka', total_wickets: 12, matches_played: 13, bowling_average: 20.1, economy_rate: 5.9, image_url: '/images/gallery/players/maniya.jpg' },
    { player_name: 'Lahiru Abhesinghe', total_wickets: 8, matches_played: 14, bowling_average: 22.5, economy_rate: 6.8, image_url: '/images/gallery/players/lahiru.jpeg' }
  ],
  topFielders: [
    { player_name: 'Maneendra Jayathilaka', total_catches: 15, total_stumpings: 4, total_run_outs: 3, total_dismissals: 22, photo: '/images/gallery/players/maniya.jpg' },
    { player_name: 'Monil Jason', total_catches: 12, total_stumpings: 2, total_run_outs: 4, total_dismissals: 18, photo: '/images/gallery/players/dulaj.jpg' },
    { player_name: 'Suviru Sathnidu', total_catches: 10, total_stumpings: 1, total_run_outs: 5, total_dismissals: 16, photo: '/images/gallery/players/suviru.jpg' },
    { player_name: 'Dilhara Polgampola', total_catches: 8, total_stumpings: 0, total_run_outs: 6, total_dismissals: 14, photo: '/images/gallery/players/lahiru.jpeg' },
    { player_name: 'Dulaj Bandara', total_catches: 7, total_stumpings: 1, total_run_outs: 4, total_dismissals: 12, photo: '/images/gallery/players/asitha.jpeg' }
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

const reports = [
  { id: 'player-performance', name: 'Player Performance', icon: Users },
  { id: 'team-season', name: 'Team Season', icon: Trophy },
  { id: 'fitness-injury', name: 'Fitness & Injury', icon: TrendingUp }
];

// const winLossData = [
//   { name: 'Wins', value: reportData.teamSeason?.wins || 0, color: '#10B981' },
//   { name: 'Losses', value: reportData.teamSeason?.losses || 0, color: '#EF4444' },
//   { name: 'Draws', value: reportData.teamSeason?.draws || 0, color: '#6B7280' }
// ];

const Reports = () => {
  const [activeReport, setActiveReport] = useState('player-performance');
  const [reportData, setReportData] = useState({});
  const [allPerformanceData, setAllPerformanceData] = useState([]);
  const [winLossRatioData, setWinLossRatioData] = useState({});
  const [matchesCount, setMatchesCount] = useState(0);
  const [teamSeasonTotalRuns, setTeamSeasonTotalRuns] = useState(0);
  const [teamSeasonTotalWickets, setTeamSeasonTotalWickets] = useState(0);
  const [winLossReportMetrics, setWinLossReportMetrics] = useState({});
  const [bestBatsman, setBestBatsman] = useState({});
  const [bestBowler, setBestBowler] = useState({});
  const [bestFielder, setBestFielder] = useState({});
  const [injuries, setInjuries] = useState([]);
  const [teamSeason, setTeamSeason] = useState({});

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    player: 'all',
    matchType: 'all'
  });

  useEffect(() => {

    setReportData(sampleData);

    // ------ Tab - Player Performance -----------
    getAllPlayersAllPerformanceDetails();

    // ------ Tab - Team Season -----------
    getWinLossRatio();
    getAllMatches();

    // ------ Tab - Fitness Injury -----------
    getAllInjuries();

    createTeamSeason();

  }, []);

  useEffect(()=>{
    const winLossReportData = [
      { name: 'Win', value: winLossRatioData?.win_count || 0, color: '#10B981' },
      { name: 'Loss', value: winLossRatioData?.loss_count || 0, color: '#EF4444' },
      { name: 'Draw', value: winLossRatioData?.draw_count || 0, color: '#6B7280' },
      { name: 'Tie', value: winLossRatioData?.tie_count || 0, color: '#6B7280' }
    ];

    setWinLossReportMetrics(winLossReportData);
  },[winLossRatioData])

  const getAllPlayersAllPerformanceDetails = async() => {
    try {
      const res = await PerformanceService.getAllPerformanceData();
      console.log(res);

      if (res.status === 200) {
        // Check if data exists
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data.data);
          setAllPerformanceData(res.data.data);

          // Sum all total_runs (skip nulls)
          const sum_total_runs = res.data.data.reduce(
            (acc, player) => acc + (player.total_runs || 0),
            0
          );
          setTeamSeasonTotalRuns(sum_total_runs);

          // Sum all total_runs (skip nulls)
          const sum_total_wickets = res.data.data.reduce(
            (acc, player) => acc + (player.total_wickets || 0),
            0
          );
          setTeamSeasonTotalWickets(sum_total_wickets);

          // Get best batsman
          const best_batsman = res.data.data?.sort((a, b) => b.total_runs - a.total_runs).slice(0, 1)[0].player_name;
          setBestBatsman(best_batsman);

          // Get best bowler
          const best_bowler = res.data.data?.sort((a, b) => b.total_wickets - a.total_wickets).slice(0, 1)[0].player_name;
          setBestBowler(best_bowler);

          // Get best fielder
          const best_fielder = res.data.data?.sort((a, b) => b.total_dismissals - a.total_dismissals).slice(0, 1)[0].player_name;
          setBestFielder(best_fielder);

        } else {
          alert(res.data.message)
          setAllPerformanceData([]);
          setTeamSeasonTotalRuns(0);
          setTeamSeasonTotalWickets(0);
        }
      } else {
        console.error("Failed to fetch performance details");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching performance details: ", error);
    }
  }
  
  const getWinLossRatio = async() => {
    try {
      const res = await PerformanceService.getWinLossRatio();
      console.log(res);

        if (res.status === 200) {
          console.log(res.data.data);
          setWinLossRatioData(res.data.data);

      } else {
        console.error("Failed to fetch win/loss ratio");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching win/loss ratio details: ", error);
    }
  }
  
  const getAllMatches = async() => {
    try {
      const res = await MatchService.getAll();
      console.log(res);

        if (res.status === 200) {
          if(res.data.data && res.data.data.length > 0) {
            setMatchesCount(res.data.data.length);
          } else {
            alert(res.data.data.message);
            setMatchesCount(0);
          }
      } else {
        console.error("Failed to fetch win/loss ratio");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching win/loss ratio details: ", error);
    }
  }
  
  const getAllInjuries = async() => {
    try {
      const res = await InjuryService.getAll();
      console.log(res);

        if (res.status === 200) {
          if(res.data.data && res.data.data.length > 0) {
            setInjuries(res.data.data);
          } else {
            alert(res.data.data.message);
            setInjuries([]);
          }
      } else {
        console.error("Failed to fetch injury details");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching injury details: ", error);
    }
  }

  const createTeamSeason = () => {
    const ts = {
      totalMatches: matchesCount,
      wins: winLossRatioData.win_count,
      wins: winLossRatioData.win_count,
      losses: winLossRatioData.loss_count,
      draws: winLossRatioData.draw_count,
      winPercentage: winLossRatioData.winLossRatio,
      totalRuns: teamSeasonTotalRuns,
      totalWickets: teamSeasonTotalWickets,
      bestBatsman: bestBatsman,
      bestBowler: bestBowler,
      bestFielder: bestFielder,
    }

    console.log(ts);
    setTeamSeason(ts);
  }

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
      {/* <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
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
      </div> */}

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
                  // onClick={() => exportToCSV(reportData.playerPerformance, 'player_performance')}
                  onClick={() => exportToCSV(allPerformanceData, 'player_performance')}
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
                    {/* {reportData.playerPerformance?.slice(0, 5).map((player, index) => ( */}
                    {allPerformanceData?.sort((a, b) => b.total_runs - a.total_runs).slice(0, 5).map((player, index) => (
                      <div key={player.player_name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                            <p className="font-medium text-gray-900">{player.player_name}</p>
                            <p className="text-sm text-gray-500">{player.player_role} • {player.matches_played} matches</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{player.total_runs || 0} runs</p>
                          <p className="text-base font-semibold text-gray-600">Avg: {Number(player.batting_average).toFixed(2)}</p>
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
                    {/* {reportData.topBowlers?.map((bowler, index) => ( */}
                    {allPerformanceData?.sort((a, b) => b.total_wickets - a.total_wickets).map((bowler, index) => (
                      <div key={bowler.player_name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                            <p className="font-medium text-gray-900">{bowler.player_name}</p>
                            <p className="text-sm text-gray-500">{bowler.matches_played} matches</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{bowler.total_wickets || 0} wickets</p>
                          <p className="text-base font-semibold text-gray-600">Avg: {Number(bowler.bowling_average).toFixed(2)}</p>
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
                    {/* {reportData.topFielders?.slice(0, 5)?.map((fielder, index) => ( */}
                    {allPerformanceData?.sort((a, b) => b.total_dismissals - a.total_dismissals).slice(0, 5)?.map((fielder, index) => (
                      <div key={fielder.player_name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
                            <p className="font-medium text-gray-900">{fielder.player_name}</p>
                            <p className="text-sm text-gray-500">{fielder.total_catches + fielder.total_stumpings + fielder.total_run_outs} dismissals</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">{fielder.total_dismissals} total</p>
                          <p className="text-base font-semibold text-gray-600">{fielder.total_catches || 0}C, {fielder.total_stumpings || 0}S, {fielder.total_run_outs || 0}RO</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* All Players Performance */}
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
                      {allPerformanceData?.map((player, index) => (
                        <tr key={player.player_name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-700">
                                    {player.player_name.split(' ').map(n => n[0]).join('')}
                                    {/* {player.player_name} */}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{player.player_name}</div>
                                <div className="text-sm text-gray-500">{player.player_role} • {player.matches_played} matches</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-semibold text-gray-900">{player.total_runs || 0}</div>
                            <div className="text-xs text-gray-500">runs</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-semibold text-gray-900">{Number(player.batting_average).toFixed(2)}</div>
                            <div className="text-xs text-gray-500">avg</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-semibold text-gray-900">{player.total_wickets || 0}</div>
                            <div className="text-xs text-gray-500">wickets</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-semibold text-gray-900">{Number(player.bowling_average).toFixed(2)}</div>
                            <div className="text-xs text-gray-500">avg</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="text-sm font-semibold text-gray-900">{player.economy_rate}</div>
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
                  // onClick={() => exportToCSV([reportData.teamSeason], 'team_season')}
                  onClick={() => exportToCSV([teamSeason], 'team_season')}
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
                      {/* <p className="text-2xl font-bold text-white">{reportData.teamSeason?.totalMatches}</p> */}
                      <p className="text-2xl font-bold text-white">{matchesCount}</p>
                    </div>
                    <Trophy className="w-8 h-8 text-white/60" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Win Percentage</p>
                      {/* <p className="text-2xl font-bold text-white">{reportData.teamSeason.wins}%</p> */}
                      <p className="text-2xl font-bold text-white">{(winLossRatioData.winLossRatio).toFixed(2)}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-white/60" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Runs</p>
                      {/* <p className="text-2xl font-bold text-white">{reportData.teamSeason?.totalRuns?.toLocaleString()}</p> */}
                      <p className="text-2xl font-bold text-white">{teamSeasonTotalRuns}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-white/60" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm">Total Wickets</p>
                      {/* <p className="text-2xl font-bold text-white">{reportData.teamSeason?.totalWickets}</p> */}
                      <p className="text-2xl font-bold text-white">{teamSeasonTotalWickets}</p>
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
                        data={winLossReportMetrics}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {winLossReportMetrics.map((entry, index) => (
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
                      {/* <span className="font-medium text-gray-900">{reportData.teamSeason?.bestBatsman}</span> */}
                      <span className="font-medium text-gray-900">{bestBatsman || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Best Bowler</span>
                      {/* <span className="font-medium text-gray-900">{reportData.teamSeason?.bestBowler}</span> */}
                      <span className="font-medium text-gray-900">{bestBowler || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Best Fielder</span>
                      {/* <span className="font-medium text-gray-900">{reportData.teamSeason?.bestFielder}</span> */}
                      <span className="font-medium text-gray-900">{bestFielder || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Total Wins</span>
                      {/* <span className="font-medium text-gray-900">{reportData.teamSeason?.wins}</span> */}
                      <span className="font-medium text-gray-900">{winLossRatioData.win_count || 0}</span>
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
                  // onClick={() => exportToCSV(reportData.fitnessInjury, 'fitness_injury')}
                  onClick={() => exportToCSV(injuries, 'fitness_injury')}
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
                      <p className="text-sm text-gray-600">Recovered</p>
                      <p className="text-2xl font-bold text-green-600">
                        {/* {reportData.fitnessInjury?.filter(p => p.status === 'Fit').length} */}
                        {injuries?.filter(p => p.status === 'RECOVERED').length}
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
                      <p className="text-sm text-gray-600">Injured</p>
                      <p className="text-2xl font-bold text-red-600">
                        {/* {reportData.fitnessInjury?.filter(p => p.status === 'Injured').length} */}
                        {injuries?.filter(p => p.status === 'INJURED').length}
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
                        {/* {reportData.fitnessInjury?.filter(p => p.status === 'Recovering').length} */}
                        {injuries?.filter(p => p.status === 'RECOVERING').length}
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Reported</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recovery Days</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Injuries</th>
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {injuries?.map((injury) => (
                      <tr key={injury.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {injury.player.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(injury.status)}`}>
                            {injury.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(injury.date_reported).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {injury.recovery_days}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {/* {injury.injuries} */}
                          {injuries.filter(i => i.player.id === injury.player.id).length}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td> */}
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