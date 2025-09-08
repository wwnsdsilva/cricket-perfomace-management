import React, { useState, useMemo } from 'react';
import { ArrowLeft, Users, Trophy, ChevronDown, ChevronUp } from 'lucide-react';
import { samplePlayers } from '../data/sampleData';
import { useNavigate } from 'react-router-dom';

// NSBM Brand Colors - Light & Modern Theme
const nsbmGreen = '#8BC34A';
const nsbmBlue = '#0D47A1';
const accentBlue = '#3B82F6';
const accentGreen = '#10B981';
const mainBackground = '#F8F9FA';
const cardBackground = '#FFFFFF';
const cardBackgroundAlt = '#FDFDFD';
const lightBorder = '#E5E7EB';
const textPrimary = '#1F2937';
const textSecondary = '#6B7280';
const textMuted = '#9CA3AF';

// Helper functions for colors with opacity
const getAccentBlue = (opacity = 1) => `rgba(59, 130, 246, ${opacity})`;
const getAccentGreen = (opacity = 1) => `rgba(16, 185, 129, ${opacity})`;

const PlayerCard = ({ player, isExpanded, onToggle }) => (
  <div
    className="group relative overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02]"
    style={{
      backgroundColor: cardBackground,
      borderColor: lightBorder,
      borderTopColor: accentGreen,
      borderTopWidth: '3px',
      borderLeftColor: accentBlue,
      borderLeftWidth: '2px'
    }}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: `linear-gradient(135deg, ${getAccentGreen(0.05)} 0%, ${getAccentBlue(0.05)} 100%)`}}></div>
    <div className="relative p-4 flex items-center justify-between h-full">
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative">
          <img
            src={player.photo}
            alt={player.name}
            className="w-16 h-16 rounded-full object-cover ring-3 ring-white shadow-md group-hover:ring-green-300 transition-all duration-300"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse" style={{backgroundColor: accentGreen}}></div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold" style={{color: textPrimary}}>{player.name}</h3>
          <p className="text-sm font-medium" style={{color: textSecondary}}>{player.position}</p>
        </div>
      </div>
      
      {/* Jersey Number - Right Side Full Height */}
      <div className="flex flex-col items-center justify-center h-full min-h-[80px]">
        <div 
          className="flex flex-col items-center justify-center px-4 py-3 rounded-lg font-bold text-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
          style={{
            backgroundColor: accentGreen,
            color: 'white',
            minWidth: '70px',
            textAlign: 'center',
            border: `2px solid ${accentGreen}`,
            boxShadow: `0 4px 8px ${getAccentGreen(0.3)}`,
            height: '100%',
            minHeight: '60px'
          }}
        >
          <span className="text-xs opacity-90">JERSEY</span>
          <span className="text-xl font-black">#{player.jerseyNumber}</span>
        </div>
      </div>
      
      <button
        onClick={onToggle}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors ml-2"
        style={{color: textMuted}}
      >
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
    </div>
      
    {isExpanded && (
      <div className="mt-4 pt-4 border-t" style={{borderColor: lightBorder}}>
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold" style={{color: accentGreen}}>{player.runs || 0}</p>
            <p className="text-xs" style={{color: textMuted}}>Runs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{color: accentBlue}}>{player.wickets || 0}</p>
            <p className="text-xs" style={{color: textMuted}}>Wickets</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{color: accentGreen}}>{player.catches || 0}</p>
            <p className="text-xs" style={{color: textMuted}}>Catches</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold" style={{color: accentBlue}}>{player.runOuts || 0}</p>
            <p className="text-xs" style={{color: textMuted}}>Run Outs</p>
          </div>
        </div>
      </div>
    )}
  </div>
);

const SquadPreview = () => {
  const navigate = useNavigate();
  const [expandedPlayers, setExpandedPlayers] = useState({});

  const groupedPlayers = useMemo(() => {
    const groups = {};
    samplePlayers.forEach(player => {
      const position = player.position || 'Other';
      if (!groups[position]) {
        groups[position] = [];
      }
      groups[position].push(player);
    });
    return groups;
  }, []);

  const togglePlayer = (playerId) => {
    setExpandedPlayers(prev => ({
      ...prev,
      [playerId]: !prev[playerId]
    }));
  };


  return (
    <div className="min-h-screen relative overflow-hidden" style={{backgroundColor: mainBackground}}>
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{backgroundColor: getAccentGreen(0.08)}}></div>
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{backgroundColor: getAccentBlue(0.08)}}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-2000" style={{backgroundColor: getAccentGreen(0.06)}}></div>
      </div>

      {/* Header */}
      <header className="text-white shadow-lg relative overflow-hidden backdrop-blur-sm" style={{backgroundColor: getAccentGreen(0.9)}}>
        <div className="absolute inset-0" style={{background: `linear-gradient(135deg, ${getAccentGreen(0.8)} 0%, ${getAccentBlue(0.7)} 100%)`}}></div>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16" style={{backgroundColor: 'rgba(255,255,255,0.15)'}}></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-12 -translate-x-12" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
        
        <div className="relative w-full mx-auto px-4 sm:px-6 xl:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/club')}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg shadow-sm" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">Full Squad</h1>
                  <p className="text-sm text-white/90 font-medium drop-shadow-sm">NSBM Cricket Club</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center px-4 py-2 rounded-full text-white text-sm font-semibold backdrop-blur-sm border border-white/30 shadow-md" style={{backgroundColor: 'rgba(255,255,255,0.15)'}}>
              <Trophy className="w-5 h-5 mr-2 text-yellow-300" />
              {samplePlayers.length} Players
            </div>
          </div>
        </div>
      </header>

      <div className="relative w-full mx-auto px-4 sm:px-6 xl:px-12 py-8">

        {/* Players Grid */}
        <div className="space-y-8">
          {Object.entries(groupedPlayers).map(([position, players]) => (
            <div key={position}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 rounded-lg shadow-sm" style={{backgroundColor: accentGreen}}>
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold" style={{color: textPrimary}}>{position}s</h2>
                <span className="px-3 py-1 rounded-full text-sm font-medium" style={{backgroundColor: getAccentGreen(0.1), color: accentGreen}}>
                  {players.length} player{players.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.map(player => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    isExpanded={expandedPlayers[player.id]}
                    onToggle={() => togglePlayer(player.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SquadPreview;
