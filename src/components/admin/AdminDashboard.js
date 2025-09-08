import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Users, 
  Target, 
  Clock,
  MapPin,
  Activity,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// NSBM Brand Colors - Light & Modern Theme (Same as Normal User Dashboard)
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

const AdminDashboard = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [user, setUser] = useState(null);

  // Sample data


  const samplePlayers = [
    { id: 1, name: 'John Smith', runs: 1250, wickets: 5, matches: 15, average: 45.2, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { id: 2, name: 'Sarah Johnson', runs: 890, wickets: 28, matches: 12, average: 32.1, photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
    { id: 3, name: 'David Wilson', runs: 1100, wickets: 15, matches: 18, average: 38.9, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { id: 4, name: 'Mike Brown', runs: 750, wickets: 8, matches: 14, average: 28.6, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
    { id: 5, name: 'Lisa Davis', runs: 650, wickets: 2, matches: 16, average: 25.0, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' }
  ];

  const recentMatches = [
    {
      id: 1,
      opponent: 'City Cricket Club',
      date: '2024-01-08',
      result: 'Win',
      score: '245/8 (50) vs 198/10 (45.2)',
      topPerformer: 'John Smith - 85 runs'
    },
    {
      id: 2,
      opponent: 'Riverside CC',
      date: '2024-01-05',
      result: 'Loss',
      score: '180/10 (42) vs 185/6 (38.5)',
      topPerformer: 'Sarah Johnson - 3/25'
    },
    {
      id: 3,
      opponent: 'Mountain View CC',
      date: '2024-01-02',
      result: 'Draw',
      score: '220/8 (50) vs 220/9 (50)',
      topPerformer: 'David Wilson - 65 runs'
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
    },
    {
      id: 3,
      opponent: 'Lakeside CC',
      date: '2024-01-22',
      time: '15:30',
      venue: 'Lakeside Ground',
      type: 'T20'
    }
  ];

  const clubEvents = [
    {
      id: 1,
      name: 'Annual Cricket Awards Night',
      date: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop',
      featured: true
    },
    {
      id: 2,
      name: 'Training Camp',
      date: '2024-03-10',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop',
      featured: false
    },
    {
      id: 3,
      name: 'Fundraising Event',
      date: '2024-03-20',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29b4a0a0e?w=400&h=200&fit=crop',
      featured: false
    },
    {
      id: 4,
      name: 'Championship Victory',
      date: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop',
      featured: false
    }
  ];

  const winLossData = [
    { name: 'Wins', value: 8, color: '#10B981' },
    { name: 'Losses', value: 4, color: '#EF4444' },
    { name: 'Draws', value: 1, color: '#6B7280' }
  ];


  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => 
        (prev + 1) % clubEvents.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const topBatsmen = samplePlayers
    .sort((a, b) => b.runs - a.runs)
    .slice(0, 5);

  const topBowlers = samplePlayers
    .filter(p => p.wickets > 0)
    .sort((a, b) => b.wickets - a.wickets)
    .slice(0, 5);

  const getResultColor = (result) => {
    switch (result) {
      case 'Win': return 'bg-green-100 text-green-800 border-green-200';
      case 'Loss': return 'bg-red-100 text-red-800 border-red-200';
      case 'Draw': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % clubEvents.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + clubEvents.length) % clubEvents.length);
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: mainBackground}}>
      <div className="w-full mx-auto px-4 sm:px-6 xl:px-12 py-8 space-y-6">
      {/* Welcome Header */}
      <div className={`bg-gradient-to-r ${nsbmAccent} rounded-xl p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
                Admin Dashboard
            </h1>
            <p className="text-blue-100">
              Here's what's happening with your cricket club today
            </p>
          </div>
          <div className="hidden sm:block">
            <div className="text-right">
              <p className="text-sm text-blue-100">Current Time</p>
              <p className="text-lg font-semibold">
                {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Club Events - Full Width with Larger Image */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-900">Club Events</h3>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={prevEvent}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Previous event"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextEvent}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Next event"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
        </div>
      </div>

        <div className="relative overflow-hidden">
          <div className="relative h-64">
            <img 
              src={clubEvents[currentEventIndex].image} 
              alt={clubEvents[currentEventIndex].name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-6 text-white w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xl mb-2">{clubEvents[currentEventIndex].name}</h4>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(clubEvents[currentEventIndex].date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {clubEvents[currentEventIndex].featured && (
                    <span className="bg-yellow-500 text-white text-sm px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
          </div>
          </div>
            </div>
          </div>
        
        <div className="flex justify-center p-6 pt-4 space-x-1">
          {clubEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentEventIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentEventIndex ? 'bg-blue-600 shadow-sm' : 'bg-gray-300'
              }`}
              aria-label={`Go to event ${index + 1}`}
            />
          ))}
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Performers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Batsmen */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-semibold text-gray-900">Top Batsmen</h3>
              </div>
              <div className="space-y-3">
                {topBatsmen.map((player, index) => (
                  <div key={player.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
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
                      <p className="font-medium text-gray-900">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.runs} runs</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{player.average}</p>
                      <p className="text-xs text-gray-500">Avg</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Bowlers */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900">Top Bowlers</h3>
              </div>
              <div className="space-y-3">
                {topBowlers.map((player, index) => (
                  <div key={player.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
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
                      <p className="font-medium text-gray-900">{player.name}</p>
                      <p className="text-sm text-gray-600">{player.wickets} wickets</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{player.matches}</p>
                      <p className="text-xs text-gray-500">Matches</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Match Results */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-5 h-5 text-blue-500" />
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
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Win/Loss Donut Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">Win/Loss Ratio</h3>
            </div>
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


          {/* Upcoming Matches */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Matches</h3>
            </div>
            <div className="space-y-4">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">vs {match.opponent}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
