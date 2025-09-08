import React, { useState, useEffect } from 'react';
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
  Activity
} from 'lucide-react';
import { 
  samplePlayers, 
  sampleMatches, 
  upcomingMatches, 
  sampleEvents, 
  playerOfTheMonth, 
  clubAnnouncements 
} from '../data/sampleData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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

const Dashboard = () => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => 
        (prev + 1) % clubAnnouncements.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Chart data
  const winLossData = [
    { name: 'Wins', value: 8, color: '#10B981' },
    { name: 'Losses', value: 4, color: '#EF4444' },
    { name: 'Draws', value: 1, color: '#6B7280' }
  ];



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

  return (
    <div className="min-h-screen" style={{ backgroundColor: mainBackground }}>
      {/* Header */}
      <header className="shadow-sm border-b" style={{ backgroundColor: cardBackground, borderColor: lightBorder }}>
        <div className="w-full mx-auto px-4 sm:px-6 xl:px-12">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-gray-600">Here's what's happening with your cricket club</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full mx-auto px-4 sm:px-6 xl:px-12 py-8">
        {/* Announcements Ticker */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium animate-pulse">
                {clubAnnouncements[currentAnnouncementIndex]}
              </p>
            </div>
          </div>
        </div>

        {/* Player of the Month */}
        <div className="mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white">
              <img 
                src={playerOfTheMonth.photo} 
                alt={playerOfTheMonth.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Award className="w-5 h-5" />
                <span className="text-sm font-medium">Player of the Month</span>
              </div>
              <h3 className="text-xl font-bold">{playerOfTheMonth.name}</h3>
              <p className="text-sm opacity-90">{playerOfTheMonth.stats}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
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
                        <p className="text-sm font-medium text-gray-900">{player.economyRate}</p>
                        <p className="text-xs text-gray-500">Econ</p>
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
                <h3 className="text-lg font-semibold text-gray-900">Recent Match Results</h3>
              </div>
              <div className="space-y-4">
                {sampleMatches.map((match) => (
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
                          <MapPin className="w-3 h-3" />
                          <span>{match.venue}</span>
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
          <div className="space-y-8">
            {/* Performance Chart */}
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

            {/* Club Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold text-gray-900">Club Events</h3>
              </div>
              <div className="space-y-4">
                {sampleEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="relative overflow-hidden rounded-lg">
                    <img 
                      src={event.image} 
                      alt={event.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                      <div className="p-3 text-white">
                        <h4 className="font-medium text-sm mb-1">{event.name}</h4>
                        <div className="flex items-center space-x-2 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    {event.featured && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>
                ))}
                <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-green-700 transition-all duration-200">
                  View All Events
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
