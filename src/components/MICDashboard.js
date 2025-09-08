import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Users, 
  Target, 
  Award,
  Bell,
  Star,
  Clock,
  MapPin,
  Activity,
  Download,
  FileText,
  BarChart3,
  Eye,
  Heart,
  Zap,
  Shield,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  LogOut,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, RadialBarChart, RadialBar } from 'recharts';

// NSBM Brand Colors - Light & Modern Theme
const nsbmGreen = '#8BC34A'; // Primary accent green
const nsbmBlue = '#0D47A1'; // Secondary accent blue
const lightGreen = '#F1F8E9'; // Light green background
const subtleGray = '#EEEEEE'; // Subtle gray
const darkGray = '#333333'; // Dark text

// Light Theme Colors
const mainBackground = '#F8F9FA'; // Very light gray main background
const cardBackground = '#FFFFFF'; // Pure white for cards
const cardBackgroundAlt = '#FDFDFD'; // Slightly off-white for variety
const lightBorder = '#E5E7EB'; // Light gray borders
const textPrimary = '#1F2937'; // Dark gray for primary text
const textSecondary = '#6B7280'; // Medium gray for secondary text
const textMuted = '#9CA3AF'; // Light gray for muted text
const accentBlue = '#3B82F6'; // Modern blue accent
const accentGreen = '#10B981'; // Modern green accent
const successGreen = '#059669'; // Success green
const errorRed = '#EF5350'; // Error red

const nsbmPrimary = 'from-green-500 to-green-600'; // NSBM Green gradient
const nsbmAccent = 'from-blue-900 to-blue-800'; // NSBM Blue gradient

// Helper functions for colors with opacity
const getNsbmBlue = (opacity = 1) => `rgba(13, 71, 161, ${opacity})`;
const getNsbmGreen = (opacity = 1) => `rgba(139, 195, 74, ${opacity})`;
const getAccentBlue = (opacity = 1) => `rgba(59, 130, 246, ${opacity})`;
const getAccentGreen = (opacity = 1) => `rgba(16, 185, 129, ${opacity})`;
const getSuccessGreen = (opacity = 1) => `rgba(5, 150, 105, ${opacity})`;
const getErrorRed = (opacity = 1) => `rgba(239, 83, 80, ${opacity})`;

const MICDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const navigate = useNavigate();

  // Event carousel state
  const [eventIndex, setEventIndex] = useState(0);
  const sampleEvents = [
    {
      id: 1,
      name: "Annual Cricket Awards Night",
      date: "2024-02-15",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop",
      featured: true
    },
    {
      id: 2,
      name: "Training Camp",
      date: "2024-03-10",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop",
      featured: false
    },
    {
      id: 3,
      name: "Fundraising Event",
      date: "2024-03-20",
      image: "https://images.unsplash.com/photo-1519167758481-83f29b4a0a0e?w=400&h=200&fit=crop",
      featured: false
    },
    {
      id: 4,
      name: "Championship Victory",
      date: "2024-02-15",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop",
      featured: false
    }
  ];

  // Helper functions to get top performers
  const getTopBatsmen = (players) => {
    return [...players]
      .sort((a, b) => (b.batting.average || 0) - (a.batting.average || 0))
      .slice(0, 5);
  };

  const getTopBowlers = (players) => {
    return [...players]
      .sort((a, b) => (b.bowling.wickets || 0) - (a.bowling.wickets || 0))
      .slice(0, 5);
  };

  const getTopFielders = (players) => {
    return [...players]
      .sort((a, b) => ((b.fielding.catches || 0) + (b.fielding.runOuts || 0)) - ((a.fielding.catches || 0) + (a.fielding.runOuts || 0)))
      .slice(0, 5);
  };

  // Sample team data
  const teamData = {
    name: 'NSBM Cricket Club',
    season: '2025',
    winLoss: { wins: 8, losses: 4, draws: 1, total: 13 },
    netRunRate: 0.45,
    totalPlayers: 25,
    activePlayers: 22,
    injuredPlayers: 3
  };

  const players = [
    { id: 1, name: 'Maneendra Jayathilaka', role: 'Batsman', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', batting: { average: 45.2, strikeRate: 140.4, runs: 1250 }, bowling: { average: 26.7, economy: 7.1, wickets: 12 }, fielding: { catches: 8, runOuts: 3 }, fitness: { sprint20m: 3.2, beepTest: 12.5, status: 'Healthy' }, attendance: 95 },
    { id: 2, name: 'Monil Jason', role: 'All-rounder', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', batting: { average: 18.5, strikeRate: 95.2, runs: 320 }, bowling: { average: 18.2, economy: 5.8, wickets: 28 }, fielding: { catches: 5, runOuts: 2 }, fitness: { sprint20m: 3.4, beepTest: 11.8, status: 'Healthy' }, attendance: 88 },
    { id: 3, name: 'Dilhara Polgampola', role: 'Bowler', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', batting: { average: 38.9, strikeRate: 125.6, runs: 1100 }, bowling: { average: 35.2, economy: 8.2, wickets: 5 }, fielding: { catches: 12, runOuts: 1 }, fitness: { sprint20m: 3.1, beepTest: 12.1, status: 'Recovering' }, attendance: 92 },
    { id: 4, name: 'Lahiru Abhesinghe', role: 'Batsman', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', batting: { average: 42.1, strikeRate: 135.8, runs: 980 }, bowling: { average: 42.3, economy: 8.9, wickets: 3 }, fielding: { catches: 15, runOuts: 4 }, fitness: { sprint20m: 3.3, beepTest: 12.0, status: 'Healthy' }, attendance: 90 },
    { id: 5, name: 'Asitha Wanninayaka', role: 'Bowler', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', batting: { average: 22.3, strikeRate: 88.7, runs: 450 }, bowling: { average: 22.1, economy: 6.2, wickets: 24 }, fielding: { catches: 7, runOuts: 3 }, fitness: { sprint20m: 3.5, beepTest: 11.5, status: 'Healthy' }, attendance: 87 },
    { id: 6, name: 'Suviru Sathnidu', role: 'All-rounder', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', batting: { average: 35.6, strikeRate: 128.3, runs: 890 }, bowling: { average: 28.4, economy: 7.5, wickets: 18 }, fielding: { catches: 11, runOuts: 2 }, fitness: { sprint20m: 3.0, beepTest: 12.8, status: 'Healthy' }, attendance: 94 },
    { id: 7, name: 'Kavisha Weerasinghe', role: 'Wicket-keeper', photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face', batting: { average: 39.8, strikeRate: 132.1, runs: 1050 }, bowling: { average: 38.9, economy: 8.7, wickets: 4 }, fielding: { catches: 9, runOuts: 1 }, fitness: { sprint20m: 3.2, beepTest: 12.3, status: 'Healthy' }, attendance: 91 },
    { id: 8, name: 'Chamod Hasalanka', role: 'Batsman', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face', batting: { average: 16.7, strikeRate: 92.4, runs: 280 }, bowling: { average: 20.5, economy: 6.8, wickets: 26 }, fielding: { catches: 6, runOuts: 3 }, fitness: { sprint20m: 3.6, beepTest: 11.2, status: 'Healthy' }, attendance: 89 }
  ];

  const recentMatches = [
    {
      id: 1,
      opponent: 'City Cricket Club',
      date: '2024-01-08',
      result: 'Win',
      score: '245/8 (50) vs 198/10 (45.2)',
      nrr: 0.94,
      topPerformer: 'Maneendra Jayathilaka - 85 runs'
    },
    {
      id: 2,
      opponent: 'Riverside CC',
      date: '2024-01-05',
      result: 'Loss',
      score: '180/10 (42) vs 185/6 (38.5)',
      nrr: -0.12,
      topPerformer: 'Monil Jason - 3/25'
    },
    {
      id: 3,
      opponent: 'Mountain View CC',
      date: '2024-01-02',
      result: 'Draw',
      score: '220/8 (50) vs 220/9 (50)',
      nrr: 0.0,
      topPerformer: 'Dilhara Polgampola - 65 runs'
    }
  ];

  const upcomingMatches = [
    {
      id: 1,
      opponent: 'Valley Cricket Club',
      date: '2024-01-15',
      time: '14:00',
      venue: 'Central Ground',
      type: 'T20'
    },
    {
      id: 2,
      opponent: 'Hillside CC',
      date: '2024-01-18',
      time: '10:00',
      venue: 'Hillside Park',
      type: 'ODI'
    }
  ];

  const trainingSessions = [
    {
      id: 1,
      type: 'Batting Practice',
      date: '2024-01-12',
      time: '18:00',
      coach: 'Mike Johnson',
      attendance: 20,
      totalPlayers: 22,
      percentage: 91
    },
    {
      id: 2,
      type: 'Fitness Training',
      date: '2024-01-10',
      time: '17:00',
      coach: 'Sarah Wilson',
      attendance: 18,
      totalPlayers: 22,
      percentage: 82
    },
    {
      id: 3,
      type: 'Bowling Practice',
      date: '2024-01-08',
      time: '19:00',
      coach: 'David Brown',
      attendance: 19,
      totalPlayers: 22,
      percentage: 86
    }
  ];

  const fitnessData = [
    { month: 'Jan', avgSprint: 3.3, avgBeepTest: 11.8, injuries: 2 },
    { month: 'Feb', avgSprint: 3.2, avgBeepTest: 12.1, injuries: 1 },
    { month: 'Mar', avgSprint: 3.1, avgBeepTest: 12.3, injuries: 3 },
    { month: 'Apr', avgSprint: 3.0, avgBeepTest: 12.5, injuries: 1 },
    { month: 'May', avgSprint: 2.9, avgBeepTest: 12.7, injuries: 0 },
    { month: 'Jun', avgSprint: 2.8, avgBeepTest: 12.9, injuries: 1 }
  ];

  const nrrTrendData = [
    { match: 1, nrr: 0.2 },
    { match: 2, nrr: 0.4 },
    { match: 3, nrr: 0.1 },
    { match: 4, nrr: 0.6 },
    { match: 5, nrr: 0.3 },
    { match: 6, nrr: 0.5 },
    { match: 7, nrr: 0.7 },
    { match: 8, nrr: 0.4 }
  ];

  const winLossData = [
    { name: 'Wins', value: 8, color: '#10B981' },
    { name: 'Losses', value: 4, color: '#EF4444' },
    { name: 'Draws', value: 1, color: '#6B7280' }
  ];

  const attendanceData = [
    { name: 'Present', value: 85, color: '#10B981' },
    { name: 'Absent', value: 15, color: '#EF4444' }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/');
  };

  // Event navigation functions
  const nextEvent = () => setEventIndex((prev) => (prev + 1) % sampleEvents.length);
  const prevEvent = () => setEventIndex((prev) => (prev - 1 + sampleEvents.length) % sampleEvents.length);

  // Auto-advance events
  useEffect(() => {
    const id = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % sampleEvents.length);
    }, 5000);
    return () => clearInterval(id);
  }, [sampleEvents.length]);

  const getResultColor = (result) => {
    switch (result) {
      case 'Win': return 'bg-green-100 text-green-800 border-green-200';
      case 'Loss': return 'bg-red-100 text-red-800 border-red-200';
      case 'Draw': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFitnessStatusColor = (status) => {
    switch (status) {
      case 'Healthy': return 'text-green-600';
      case 'Recovering': return 'text-yellow-600';
      case 'Injured': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Player', 'Role', 'Batting Avg', 'Bowling Avg', 'Fitness Status', 'Attendance %'],
      ...players.map(player => [
        player.name,
        player.role,
        player.batting.average,
        player.bowling.average,
        player.fitness.status,
        player.attendance
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'team_performance.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    alert('PDF export functionality would be implemented here');
  };

  const tabs = [
    { id: 'home', name: 'Home', icon: Trophy },
    { id: 'team-performance', name: 'Team Performance', icon: BarChart3 },
    { id: 'player-fitness', name: 'Player Fitness', icon: Heart },
    { id: 'player-analytics', name: 'Player Analytics', icon: Target },
    { id: 'training-attendance', name: 'Training Attendance', icon: Users }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: mainBackground }}>
      {/* Header */}
      <header className="shadow-sm border-b" style={{ backgroundColor: cardBackground, borderColor: lightBorder }}>
        <div className="w-full mx-auto px-4 sm:px-6 xl:px-12">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div>
                <img src="/images/logoNSBM.jpg" alt="NSBM Cricket Club" className="w-14 h-14 rounded-full ring-2 ring-white/30 shadow-lg" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">MIC Dashboard</h1>
                <p className="text-sm text-gray-500">{teamData.name} • {teamData.season} Season</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportToCSV}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
              <button
                onClick={exportToPDF}
                className="inline-flex items-center px-3 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90"
                style={{backgroundColor: nsbmBlue}}
              >
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b" style={{ backgroundColor: cardBackground, borderColor: lightBorder }}>
        <div className="w-full mx-auto px-4 sm:px-6 xl:px-12">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full mx-auto px-4 sm:px-6 xl:px-12 py-8">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            {/* Team Overview */}
            <div className="rounded-xl p-6 text-white" style={{background: `linear-gradient(135deg, ${nsbmBlue} 0%, ${nsbmGreen} 100%)`}}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {teamData.name} - Season {teamData.season}
                  </h2>
                  <p className="text-white/80">
                    NRR: {teamData.netRunRate}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{teamData.winLoss.wins}-{teamData.winLoss.losses}-{teamData.winLoss.draws}</div>
                  <div className="text-sm text-white/80">Win-Loss-Draw</div>
                </div>
              </div>
            </div>

            {/* Club Events */}
            <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: cardBackground, borderColor: lightBorder }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" style={{ color: accentBlue }} />
                  <h3 className="text-lg font-semibold" style={{ color: textPrimary }}>Club Events</h3>
                </div>
                <div className="flex space-x-1">
                  <button onClick={prevEvent} className="p-1 rounded-full hover:bg-gray-100" aria-label="Previous event">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button onClick={nextEvent} className="p-1 rounded-full hover:bg-gray-100" aria-label="Next event">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative h-48">
                  <img 
                    src={sampleEvents[eventIndex].image}
                    alt={sampleEvents[eventIndex].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-4 text-white w-full">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-lg mb-1">{sampleEvents[eventIndex].name}</h4>
                          <div className="flex items-center space-x-2 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(sampleEvents[eventIndex].date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {sampleEvents[eventIndex].featured && (
                    <div className="absolute top-2 right-2">
                      <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-center mt-3 space-x-1">
                {sampleEvents.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setEventIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      i === eventIndex ? 'shadow-sm' : 'bg-gray-300'
                    }`}
                    style={i === eventIndex ? {backgroundColor: nsbmBlue} : {}}
                    aria-label={`Go to event ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="w-5 h-5" style={{color: nsbmBlue}} />
                  <h3 className="text-lg font-semibold text-gray-900">Active Players</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900">{teamData.activePlayers}</div>
                <div className="text-sm text-gray-500">of {teamData.totalPlayers} total</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Injured Players</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900">{teamData.injuredPlayers}</div>
                <div className="text-sm text-gray-500">Currently unavailable</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Win Rate</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {Math.round((teamData.winLoss.wins / teamData.winLoss.total) * 100)}%
                </div>
                <div className="text-sm text-gray-500">This season</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Net Run Rate</h3>
                </div>
                <div className="text-3xl font-bold text-gray-900">{teamData.netRunRate}</div>
                <div className="text-sm text-gray-500">Current NRR</div>
              </div>
            </div>

            {/* Recent Results */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-5 h-5" style={{color: nsbmBlue}} />
                <h3 className="text-lg font-semibold text-gray-900">Last 3 Match Results</h3>
              </div>
              <div className="space-y-4">
                {recentMatches.map((match) => (
                  <div key={match.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">vs {match.opponent}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getResultColor(match.result)}`}>
                          {match.result}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{match.score}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(match.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>NRR: {match.nrr}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Top Performer</p>
                      <p className="text-xs text-gray-600">{match.topPerformer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Matches */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5" style={{color: nsbmBlue}} />
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Matches</h3>
              </div>
              <div className="space-y-4">
                {upcomingMatches.map((match) => (
                  <div key={match.id} className="p-4 rounded-lg border" style={{backgroundColor: getNsbmBlue(0.05), borderColor: getNsbmBlue(0.2)}}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">vs {match.opponent}</h4>
                      <span className="text-xs px-2 py-1 rounded-full" style={{backgroundColor: getNsbmBlue(0.1), color: nsbmBlue}}>
                        {match.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(match.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{match.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 mt-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span>{match.venue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Team Performance Tab */}
        {activeTab === 'team-performance' && (
          <div className="space-y-6">
            {/* Win/Loss Gauge */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Win/Loss Record</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={winLossData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
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
                <div className="mt-4 space-y-2">
                  {winLossData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Net Run Rate Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={nrrTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="match" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="nrr" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Performers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: cardBackground, borderColor: lightBorder }}>
                <div className="flex items-center space-x-2 mb-4">
                  <Trophy className="w-5 h-5" style={{ color: accentBlue }} />
                  <h3 className="text-lg font-semibold" style={{ color: textPrimary }}>Top 5 Batsmen</h3>
                </div>
                <div className="space-y-3">
                  {getTopBatsmen(players).map((player, index) => (
                    <div key={player.id} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: cardBackgroundAlt }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: `linear-gradient(135deg, ${accentBlue}, ${accentGreen})` }}>
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={player.photo} 
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ color: textPrimary }}>{player.name}</p>
                        <p className="text-sm" style={{ color: textSecondary }}>{player.batting.average} avg • {player.batting.runs} runs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: cardBackground, borderColor: lightBorder }}>
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="w-5 h-5" style={{ color: errorRed }} />
                  <h3 className="text-lg font-semibold" style={{ color: textPrimary }}>Top 5 Bowlers</h3>
                </div>
                <div className="space-y-3">
                  {getTopBowlers(players).map((player, index) => (
                    <div key={player.id} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: cardBackgroundAlt }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: `linear-gradient(135deg, ${errorRed}, #FF6B35)` }}>
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={player.photo} 
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ color: textPrimary }}>{player.name}</p>
                        <p className="text-sm" style={{ color: textSecondary }}>{player.bowling.wickets} wickets • {player.bowling.average} avg</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: cardBackground, borderColor: lightBorder }}>
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-5 h-5" style={{ color: accentGreen }} />
                  <h3 className="text-lg font-semibold" style={{ color: textPrimary }}>Top 5 Fielders</h3>
                </div>
                <div className="space-y-3">
                  {getTopFielders(players).map((player, index) => (
                    <div key={player.id} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: cardBackgroundAlt }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: `linear-gradient(135deg, ${accentGreen}, ${accentBlue})` }}>
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={player.photo} 
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ color: textPrimary }}>{player.name}</p>
                        <p className="text-sm" style={{ color: textSecondary }}>{player.fielding.catches} catches • {player.fielding.runOuts} run-outs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Player Fitness Tab */}
        {activeTab === 'player-fitness' && (
          <div className="space-y-6">
            {/* Fitness Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Player Fitness Overview</h3>
                <div className="flex space-x-2">
                  <select
                    value={selectedPlayer}
                    onChange={(e) => setSelectedPlayer(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Players</option>
                    {players.map(player => (
                      <option key={player.id} value={player.id}>{player.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {players.map((player) => (
                  <div key={player.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={player.photo} 
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{player.name}</p>
                        <p className="text-sm text-gray-500">{player.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sprint 20m:</span>
                        <span className="font-medium">{player.fitness.sprint20m}s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Beep Test:</span>
                        <span className="font-medium">{player.fitness.beepTest}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${getFitnessStatusColor(player.fitness.status)}`}>
                          {player.fitness.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fitness Trends */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fitness Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fitnessData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="avgSprint" stroke="#3B82F6" strokeWidth={2} name="Avg Sprint 20m (s)" />
                  <Line type="monotone" dataKey="avgBeepTest" stroke="#EF4444" strokeWidth={2} name="Avg Beep Test" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Player Analytics Tab */}
        {activeTab === 'player-analytics' && (
          <div className="space-y-6">
            {/* Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {players.map((player) => (
                <div key={player.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={player.photo} 
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{player.name}</h3>
                      <p className="text-sm text-gray-500">{player.role}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Batting</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Average:</span>
                          <span className="font-medium">{player.batting.average}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Strike Rate:</span>
                          <span className="font-medium">{player.batting.strikeRate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Bowling</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Average:</span>
                          <span className="font-medium">{player.bowling.average}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Economy:</span>
                          <span className="font-medium">{player.bowling.economy}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Fielding</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Catches:</span>
                          <span className="font-medium">{player.fielding.catches}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Run Outs:</span>
                          <span className="font-medium">{player.fielding.runOuts}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Attendance Tab */}
        {activeTab === 'training-attendance' && (
          <div className="space-y-6">
            {/* Attendance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Attendance</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {attendanceData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
                <div className="space-y-4">
                  {trainingSessions.map((session) => (
                    <div key={session.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{session.type}</h4>
                        <span className="text-sm font-medium text-gray-600">{session.percentage}%</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{session.attendance}/{session.totalPlayers}</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Coach: {session.coach}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Player Attendance</h3>
                <div className="flex space-x-2">
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                    <option value="90days">Last 90 days</option>
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Player
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attendance %
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {players.map((player) => (
                      <tr key={player.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={player.photo}
                                alt={player.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{player.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{backgroundColor: getNsbmBlue(0.1), color: nsbmBlue}}>
                            {player.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{player.attendance}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            player.attendance >= 90 ? 'bg-green-100 text-green-800' :
                            player.attendance >= 75 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {player.attendance >= 90 ? 'Excellent' :
                             player.attendance >= 75 ? 'Good' : 'Needs Improvement'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MICDashboard;
