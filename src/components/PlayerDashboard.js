import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Users, 
  Target, 
  Clock,
  MapPin,
  Activity,
  Download,
  FileText,
  BarChart3,
  Heart,
  Zap,
  Shield,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  LogOut
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { samplePlayerData, performanceTrendData, fitnessTrendData, boundaryBreakdown } from '../data/playerData';
import { NSBM_DESIGN_SYSTEM, getBrandColor } from '../styles/nsbm-design-system';

// NSBM Design System Colors
const { colors, shadows } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;
const nsbmBlue = colors.brandSecondary;
const nsbmGold = colors.brandAccent;

// Helper function for NSBM Green with opacity
const getNsbmGreen = (opacity = 1) => getBrandColor('brandPrimary', opacity);


const PlayerDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
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

  // Use imported player data
  const playerData = samplePlayerData;

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


  const getResultColor = (outcome) => {
    switch (outcome) {
      case 'victory': return `bg-green-100 text-green-800 border-green-200`;
      case 'defeat': return `bg-red-100 text-red-800 border-red-200`;
      case 'draw': return `bg-gray-100 text-gray-800 border-gray-200`;
      default: return `bg-gray-100 text-gray-800 border-gray-200`;
    }
  };

  const getInjuryStatusColor = (status) => {
    switch (status) {
      case 'Recovered': return nsbmGreen;
      case 'Recovering': return nsbmGold;
      case 'Injured': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const exportToPDF = () => {
    // PDF export functionality would be implemented here
    alert('PDF export functionality would be implemented here');
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Metric', 'Value'],
      ['Batting Average', playerData.currentSeason.batting.average],
      ['Strike Rate', playerData.currentSeason.batting.strikeRate],
      ['Boundary %', playerData.currentSeason.batting.boundaryPercentage],
      ['Bowling Average', playerData.currentSeason.bowling.average],
      ['Economy Rate', playerData.currentSeason.bowling.economy],
      ['Catches', playerData.currentSeason.fielding.catches],
      ['Run Outs', playerData.currentSeason.fielding.runOuts],
      ['Stumpings', playerData.currentSeason.fielding.stumpings],
      ['Sprint 20m', playerData.fitness.sprint20m.current],
      ['Beep Test', playerData.fitness.beepTest.current]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${playerData.name}_performance.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'home', name: 'Home', icon: Trophy },
    { id: 'performance', name: 'My Performance', icon: BarChart3 },
    { id: 'fitness', name: 'My Fitness', icon: Heart },
    { id: 'schedule', name: 'My Schedule', icon: Calendar }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundSecondary }}>
      {/* NSBM Pitch Stripe Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: NSBM_DESIGN_SYSTEM.cricket.pitchStripe,
          pointerEvents: 'none'
        }}
      />
      
      {/* Header */}
      <header className="relative shadow-sm border-b" style={{ backgroundColor: colors.backgroundPrimary, borderColor: colors.borderLight }}>
        <div className="w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2" style={{borderColor: nsbmGreen}}>
                <img 
                  src={playerData.photo} 
                  alt={playerData.name}
                  className="w-full h-full object-cover"
                />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg lg:text-xl font-semibold truncate" style={{color: colors.textPrimary}}>{playerData.name}</h1>
                <p className="text-xs sm:text-sm truncate" style={{color: colors.textSecondary}}>{playerData.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              <button
                onClick={exportToCSV}
                className="hidden sm:inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm font-medium transition-colors"
                style={{
                  color: colors.textPrimary,
                  backgroundColor: colors.backgroundPrimary,
                  borderColor: colors.borderLight
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.backgroundSecondary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.backgroundPrimary;
                }}
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden lg:inline">Export CSV</span>
                <span className="lg:hidden">CSV</span>
              </button>
              <button
                onClick={exportToPDF}
                className="hidden sm:inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-white transition-colors"
                style={{backgroundColor: nsbmGreen}}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = getNsbmGreen(0.8);
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = nsbmGreen;
                }}
              >
                <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden lg:inline">Export PDF</span>
                <span className="lg:hidden">PDF</span>
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm font-medium transition-colors"
                style={{
                  color: colors.textPrimary,
                  backgroundColor: colors.backgroundPrimary,
                  borderColor: colors.borderLight
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = colors.backgroundSecondary;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = colors.backgroundPrimary;
                }}
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b" style={{ backgroundColor: colors.backgroundPrimary, borderColor: colors.borderLight }}>
        <div className="w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-12">
          <nav className="flex space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-gray-900 font-bold'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{
                    borderBottomColor: activeTab === tab.id ? nsbmGreen : 'transparent',
                    backgroundColor: activeTab === tab.id ? getNsbmGreen(0.1) : 'transparent'
                  }}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" style={{color: activeTab === tab.id ? nsbmGreen : colors.textSecondary}} />
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-12 py-4 sm:py-6 lg:py-8">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Welcome Section */}
            <div 
              className="rounded-xl p-4 sm:p-6 text-white"
              style={{
                background: `linear-gradient(135deg, ${nsbmGreen}, ${getNsbmGreen(0.8)})`,
                boxShadow: `0 4px 12px ${getNsbmGreen(0.3)}`
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                    Welcome back, {playerData.name}! 👋
                  </h2>
                  <p className="text-sm sm:text-base text-white/90">
                    Here's your latest performance and upcoming activities
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs sm:text-sm text-white/80">Current Time</p>
                  <p className="text-sm sm:text-base lg:text-lg font-semibold">
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Club Events - Square Shape */}
              <div className="lg:col-span-2">
                <div 
                  className="rounded-xl shadow-sm border p-6 h-full flex flex-col" 
                  style={{ 
                    backgroundColor: colors.backgroundPrimary, 
                    borderColor: colors.borderLight,
                    boxShadow: shadows.sm
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" style={{ color: nsbmGreen }} />
                      <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>Club Events</h3>
                    </div>
                    <div className="flex space-x-1">
                      <button 
                        onClick={prevEvent} 
                        className="p-1 rounded-full transition-colors" 
                        style={{color: colors.textSecondary}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = colors.backgroundSecondary}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        aria-label="Previous event"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={nextEvent} 
                        className="p-1 rounded-full transition-colors" 
                        style={{color: colors.textSecondary}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = colors.backgroundSecondary}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        aria-label="Next event"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-lg flex-1">
                    <div className="relative h-full">
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
                          <span 
                            className="text-white text-xs px-2 py-1 rounded-full"
                            style={{backgroundColor: nsbmGold}}
                          >
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
                          i === eventIndex ? 'bg-blue-600 shadow-sm' : 'bg-gray-300'
                        }`}
                        aria-label={`Go to event ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Vertical Cards */}
              <div className="space-y-6 h-full flex flex-col">
                {/* Batting Average Card */}
                <div 
                  className="rounded-xl shadow-sm border p-6" 
                  style={{ 
                    backgroundColor: colors.backgroundPrimary, 
                    borderColor: colors.borderLight,
                    boxShadow: shadows.sm
                  }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Trophy className="w-5 h-5" style={{color: nsbmGold}} />
                    <h3 className="text-lg font-semibold" style={{color: colors.textPrimary}}>Batting Average</h3>
                  </div>
                  <div className="text-3xl font-bold" style={{color: colors.textPrimary}}>{playerData.currentSeason.batting.average}</div>
                  <div className="text-sm" style={{color: colors.textSecondary}}>Current Season</div>
                  <div className="mt-2 flex items-center text-sm" style={{color: nsbmGreen}}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +2.3 from last season
                  </div>
                </div>

                {/* Bowling Average Card */}
                <div 
                  className="rounded-xl shadow-sm border p-6" 
                  style={{ 
                    backgroundColor: colors.backgroundPrimary, 
                    borderColor: colors.borderLight,
                    boxShadow: shadows.sm
                  }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="w-5 h-5" style={{color: colors.error}} />
                    <h3 className="text-lg font-semibold" style={{color: colors.textPrimary}}>Bowling Average</h3>
                  </div>
                  <div className="text-3xl font-bold" style={{color: colors.textPrimary}}>{playerData.currentSeason.bowling.average}</div>
                  <div className="text-sm" style={{color: colors.textSecondary}}>Current Season</div>
                  <div className="mt-2 flex items-center text-sm" style={{color: colors.error}}>
                    <TrendingUp className="w-4 h-4 mr-1 rotate-180" />
                    +1.2 from last season
                  </div>
                </div>

                {/* Fitness Level Card */}
                <div 
                  className="rounded-xl shadow-sm border p-6" 
                  style={{ 
                    backgroundColor: colors.backgroundPrimary, 
                    borderColor: colors.borderLight,
                    boxShadow: shadows.sm
                  }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <Heart className="w-5 h-5" style={{color: nsbmGreen}} />
                    <h3 className="text-lg font-semibold" style={{color: colors.textPrimary}}>Fitness Level</h3>
                  </div>
                  <div className="text-3xl font-bold" style={{color: colors.textPrimary}}>{playerData.fitness.beepTest.level}</div>
                  <div className="text-sm" style={{color: colors.textSecondary}}>Beep Test: {playerData.fitness.beepTest.current}</div>
                  <div className="mt-2 flex items-center text-sm" style={{color: nsbmGreen}}>
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Improving fitness
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Results */}
            <div 
              className="rounded-xl shadow-sm border p-6" 
              style={{ 
                backgroundColor: colors.backgroundPrimary, 
                borderColor: colors.borderLight,
                boxShadow: shadows.sm
              }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-5 h-5" style={{ color: nsbmGreen }} />
                <h3 className="text-lg font-semibold" style={{ color: colors.textPrimary }}>Last 3 Match Results</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {playerData.recentResults.map((match) => (
                  <div 
                    key={match.id} 
                    className="flex flex-col p-4 rounded-lg"
                    style={{backgroundColor: colors.backgroundSecondary}}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium" style={{color: colors.textPrimary}}>vs {match.opponent}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getResultColor(match.outcome)}`}>
                        {match.result}
                      </span>
                    </div>
                    <p className="text-sm mb-2" style={{color: colors.textSecondary}}>{match.score}</p>
                    <div className="flex items-center space-x-1 text-xs mb-3" style={{color: colors.textTertiary}}>
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(match.date).toLocaleDateString()}</span>
                    </div>
                    <div className="mt-auto">
                      <p className="text-sm font-medium" style={{color: colors.textPrimary}}>My Performance</p>
                      <p className="text-xs" style={{color: colors.textSecondary}}>{match.myPerformance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-4 sm:space-y-6">
            {/* Performance Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div 
                className="rounded-xl shadow-sm border p-4 sm:p-6" 
                style={{ 
                  backgroundColor: colors.backgroundPrimary, 
                  borderColor: colors.borderLight,
                  boxShadow: shadows.sm
                }}
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5" style={{color: nsbmGold}} />
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold" style={{color: colors.textPrimary}}>Batting Average</h3>
                </div>
                <div className="text-2xl sm:text-3xl font-bold" style={{color: colors.textPrimary}}>{playerData.currentSeason.batting.average}</div>
                <div className="text-xs sm:text-sm" style={{color: colors.textSecondary}}>from {playerData.currentSeason.batting.matches} matches</div>
              </div>

              <div 
                className="rounded-xl shadow-sm border p-4 sm:p-6" 
                style={{ 
                  backgroundColor: colors.backgroundPrimary, 
                  borderColor: colors.borderLight,
                  boxShadow: shadows.sm
                }}
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5" style={{color: nsbmBlue}} />
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold" style={{color: colors.textPrimary}}>Strike Rate</h3>
                </div>
                <div className="text-2xl sm:text-3xl font-bold" style={{color: colors.textPrimary}}>{playerData.currentSeason.batting.strikeRate}</div>
                <div className="text-xs sm:text-sm" style={{color: colors.textSecondary}}>runs per 100 balls</div>
              </div>

              <div 
                className="rounded-xl shadow-sm border p-4 sm:p-6" 
                style={{ 
                  backgroundColor: colors.backgroundPrimary, 
                  borderColor: colors.borderLight,
                  boxShadow: shadows.sm
                }}
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5" style={{color: colors.error}} />
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold" style={{color: colors.textPrimary}}>Bowling Average</h3>
                </div>
                <div className="text-2xl sm:text-3xl font-bold" style={{color: colors.textPrimary}}>{playerData.currentSeason.bowling.average}</div>
                <div className="text-xs sm:text-sm" style={{color: colors.textSecondary}}>runs per wicket</div>
              </div>

              <div 
                className="rounded-xl shadow-sm border p-4 sm:p-6" 
                style={{ 
                  backgroundColor: colors.backgroundPrimary, 
                  borderColor: colors.borderLight,
                  boxShadow: shadows.sm
                }}
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" style={{color: nsbmGreen}} />
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold" style={{color: colors.textPrimary}}>Economy Rate</h3>
                </div>
                <div className="text-2xl sm:text-3xl font-bold" style={{color: colors.textPrimary}}>{playerData.currentSeason.bowling.economy}</div>
                <div className="text-xs sm:text-sm" style={{color: colors.textSecondary}}>runs per over</div>
              </div>

              <div 
                className="rounded-xl shadow-sm border p-4 sm:p-6" 
                style={{ 
                  backgroundColor: colors.backgroundPrimary, 
                  borderColor: colors.borderLight,
                  boxShadow: shadows.sm
                }}
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" style={{color: nsbmBlue}} />
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold" style={{color: colors.textPrimary}}>Boundary %</h3>
                </div>
                <div className="text-2xl sm:text-3xl font-bold" style={{color: colors.textPrimary}}>{playerData.currentSeason.batting.boundaryPercentage}%</div>
                <div className="text-xs sm:text-sm" style={{color: colors.textSecondary}}>of total runs</div>
              </div>

              <div 
                className="rounded-xl shadow-sm border p-4 sm:p-6" 
                style={{ 
                  backgroundColor: colors.backgroundPrimary, 
                  borderColor: colors.borderLight,
                  boxShadow: shadows.sm
                }}
              >
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" style={{color: nsbmGreen}} />
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold" style={{color: colors.textPrimary}}>Fielding</h3>
                </div>
                <div className="text-2xl sm:text-3xl font-bold" style={{color: colors.textPrimary}}>{playerData.currentSeason.fielding.catches + playerData.currentSeason.fielding.runOuts + playerData.currentSeason.fielding.stumpings}</div>
                <div className="text-xs sm:text-sm" style={{color: colors.textSecondary}}>catches + run outs + stumpings</div>
                  <div className="mt-2 text-sm" style={{color: colors.textSecondary}}>
                  {playerData.currentSeason.fielding.catches} catches, {playerData.currentSeason.fielding.runOuts} run outs, {playerData.currentSeason.fielding.stumpings} stumpings
                </div>
              </div>
            </div>

            {/* Performance Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div 
                className="rounded-xl shadow-sm border p-6" 
                style={{ 
                  backgroundColor: colors.backgroundPrimary, 
                  borderColor: colors.borderLight,
                  boxShadow: shadows.sm
                }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{color: colors.textPrimary}}>Performance Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="runs" stroke="#3B82F6" strokeWidth={2} name="Runs" />
                    <Line type="monotone" dataKey="wickets" stroke="#EF4444" strokeWidth={2} name="Wickets" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div 
                className="rounded-xl shadow-sm border p-6" 
                style={{ 
                  backgroundColor: colors.backgroundPrimary, 
                  borderColor: colors.borderLight,
                  boxShadow: shadows.sm
                }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{color: colors.textPrimary}}>Boundary Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={boundaryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {boundaryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {boundaryBreakdown.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span style={{color: colors.textSecondary}}>{item.name}</span>
                      </div>
                      <span className="font-medium" style={{color: colors.textPrimary}}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fitness Tab */}
        {activeTab === 'fitness' && (
          <div className="space-y-6">
            {/* Fitness Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                className="rounded-xl shadow-sm border p-6" 
                style={{ 
                  backgroundColor: colors.backgroundPrimary, 
                  borderColor: colors.borderLight,
                  boxShadow: shadows.sm
                }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-lg font-semibold" style={{color: colors.textPrimary}}>Sprint 20m</h3>
                </div>
                <div className="text-3xl font-bold" style={{color: colors.textPrimary}}>{playerData.fitness.sprint20m.current}s</div>
                <div className="text-sm" style={{color: colors.textSecondary}}>Current time</div>
                  <div className="mt-2 text-sm" style={{color: colors.textSecondary}}>
                  Best: {playerData.fitness.sprint20m.best}s | Avg: {playerData.fitness.sprint20m.average}s
                </div>
                  <div className="mt-2 flex items-center text-sm" style={{color: nsbmGreen}}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {playerData.fitness.sprint20m.trend}
                </div>
              </div>

              <div 
                className="rounded-xl shadow-sm border p-6" 
                style={{ 
                  backgroundColor: colors.backgroundPrimary, 
                  borderColor: colors.borderLight,
                  boxShadow: shadows.sm
                }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-semibold" style={{color: colors.textPrimary}}>Beep Test</h3>
                </div>
                <div className="text-3xl font-bold" style={{color: colors.textPrimary}}>{playerData.fitness.beepTest.current}</div>
                <div className="text-sm" style={{color: colors.textSecondary}}>Current level</div>
                  <div className="mt-2 text-sm" style={{color: colors.textSecondary}}>
                  Best: {playerData.fitness.beepTest.best} | Avg: {playerData.fitness.beepTest.average}
                </div>
                <div className="mt-2 text-sm font-medium text-green-600">
                  {playerData.fitness.beepTest.level}
                </div>
              </div>

              <div 
                className="rounded-xl shadow-sm border p-6" 
                style={{ 
                  backgroundColor: colors.backgroundPrimary, 
                  borderColor: colors.borderLight,
                  boxShadow: shadows.sm
                }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Shield className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold" style={{color: colors.textPrimary}}>Injury Status</h3>
                </div>
                <div className="text-3xl font-bold text-green-600">Healthy</div>
                <div className="text-sm" style={{color: colors.textSecondary}}>No current injuries</div>
                  <div className="mt-2 text-sm" style={{color: colors.textSecondary}}>
                  Last injury: {playerData.fitness.injuries[0]?.type} (Recovered)
                </div>
              </div>
            </div>

            {/* Fitness Trends */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fitness Progress</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fitnessTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sprint" stroke="#3B82F6" strokeWidth={2} name="Sprint 20m (s)" />
                  <Line type="monotone" dataKey="beepTest" stroke="#EF4444" strokeWidth={2} name="Beep Test Level" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Injury History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Injury History</h3>
              <div className="space-y-4">
                {playerData.fitness.injuries.map((injury) => (
                  <div key={injury.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-gray-900">{injury.type}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getInjuryStatusColor(injury.status)}`}>
                          {injury.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(injury.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{injury.recoveryTime}</span>
                        </div>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                          {injury.severity}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {injury.status === 'Recovered' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : injury.status === 'Recovering' ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="space-y-4 sm:space-y-6">

            {/* Upcoming Matches */}
            <div 
              className="rounded-xl shadow-sm border p-4 sm:p-6" 
              style={{ 
                backgroundColor: colors.backgroundPrimary, 
                borderColor: colors.borderLight,
                boxShadow: shadows.sm
              }}
            >
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: nsbmGreen }} />
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold" style={{ color: colors.textPrimary }}>Upcoming Matches</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {playerData.upcomingMatches.map((match) => (
                  <div 
                    key={match.id} 
                    className="p-3 sm:p-4 rounded-lg border relative overflow-hidden" 
                    style={{ 
                      backgroundColor: getNsbmGreen(0.05), 
                      borderColor: colors.borderLight 
                    }}
                  >
                    {/* Faded Background Image */}
                    <div 
                      className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: 'url(/images/logoNSBM.jpg)'
                      }}
                    />
                    {/* Content */}
                    <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h4 className="text-sm sm:text-base lg:text-lg font-semibold" style={{ color: colors.textPrimary }}>vs {match.opponent}</h4>
                      <span 
                        className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full" 
                        style={{ backgroundColor: nsbmGreen, color: 'white' }}
                      >
                        {match.type}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm sm:text-base mb-2" style={{ color: colors.textSecondary }}>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{new Date(match.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{match.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-2 sm:mb-3 text-xs sm:text-sm" style={{ color: colors.textTertiary }}>
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate">{match.venue}</span>
                    </div>
                    <div className="mt-3 sm:mt-4 flex items-center justify-center">
                      <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full" style={{ backgroundColor: nsbmGreen, color: 'white' }}>
                        {match.status}
                      </span>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Training Sessions */}
            <div className="rounded-xl shadow-sm border p-4 sm:p-6" style={{ backgroundColor: colors.backgroundPrimary, borderColor: colors.borderLight }}>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: nsbmGreen }} />
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold" style={{ color: colors.textPrimary }}>Training Sessions</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {playerData.trainingSessions.map((session) => (
                  <div key={session.id} className="p-3 sm:p-4 rounded-lg border relative overflow-hidden" style={{ backgroundColor: colors.backgroundSecondary, borderColor: colors.borderLight }}>
                    {/* Faded Background Image */}
                    <div 
                      className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: 'url(/images/logoNSBM.jpg)'
                      }}
                    />
                    {/* Content */}
                    <div className="relative z-10">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                      <h4 className="text-sm sm:text-base lg:text-lg font-semibold" style={{ color: colors.textPrimary }}>{session.type}</h4>
                      <span className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full" style={{ backgroundColor: nsbmGreen, color: 'white' }}>
                        {session.attendance}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-1 sm:space-y-0 text-sm sm:text-base mb-2 sm:mb-3" style={{ color: colors.textSecondary }}>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{new Date(session.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: colors.textTertiary }}>
                      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate">{session.coach}</span>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PlayerDashboard;
