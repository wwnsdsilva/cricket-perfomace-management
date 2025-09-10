import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Calendar, 
  Users, 
  Target, 
  Clock,
  MapPin,
  Activity,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NSBM_DESIGN_SYSTEM } from '../../styles/nsbm-design-system';
import { NSBMCard, NSBMBadge, NSBMKPITile, NSBMSectionHeader, NSBMButton } from '../ui/NSBMComponents';

// NSBM Brand Colors from Design System
const { colors } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;

const nsbmBlue = colors.brandSecondary;
const nsbmGold = colors.brandAccent;


const AdminDashboard = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  // Audit-friendly data with high contrast
  const auditData = {
    totalPlayers: 45,
    activeSessions: 12,
    injuries: 3,
    attendance: 87.5
  };

  // Sample data


  const samplePlayers = [
    { id: 1, name: 'Monil Jason', runs: 1250, wickets: 5, matches: 15, average: 45.2, photo: '/images/gallery/players/maniya.jpg' },
    { id: 2, name: 'Dulaj Bandara', runs: 890, wickets: 28, matches: 12, average: 32.1, photo: '/images/gallery/players/dulaj.jpg' },
    { id: 3, name: 'Suviru Sathnidu', runs: 1100, wickets: 15, matches: 18, average: 38.9, photo: '/images/gallery/players/suviru.jpg' },
    { id: 4, name: 'Lahiru Abhesinghe', runs: 750, wickets: 8, matches: 14, average: 28.6, photo: '/images/gallery/players/lahiru.jpeg' },
    { id: 5, name: 'Asitha Wanninayake', runs: 650, wickets: 2, matches: 16, average: 25.0, photo: '/images/gallery/players/asitha.jpeg' }
  ];

  const recentMatches = [
    {
      id: 1,
      opponent: 'APIIT',
      date: '2024-01-08',
      result: 'Win',
      score: '245/8 (50) vs 198/10 (45.2)',
      topPerformer: 'John Smith - 85 runs'
    },
    {
      id: 2,
      opponent: 'KDU',
      date: '2024-01-05',
      result: 'Loss',
      score: '180/10 (42) vs 185/6 (38.5)',
      topPerformer: 'Sarah Johnson - 3/25'
    },
    {
      id: 3,
      opponent: 'SLIIT',
      date: '2024-01-02',
      result: 'Draw',
      score: '220/8 (50) vs 220/9 (50)',
      topPerformer: 'David Wilson - 65 runs'
    }
  ];

  const upcomingMatches = [
    {
      id: 1,
      opponent: 'IIT',
      date: '2024-01-15',
      time: '14:00',
      venue: 'Central Ground',
      type: 'T20'
    },
    {
      id: 2,
      opponent: 'SLTC',
      date: '2024-01-18',
      time: '10:00',
      venue: 'Hillside Park',
      type: 'T10'
    },
    {
      id: 3,
      opponent: 'NSBM',
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

  const topFieldersData = [
    { 
      name: 'Maniya Silva', 
      catches: 12, 
      stumpings: 3, 
      runOuts: 2, 
      total: 17, 
      avatar: '/images/gallery/players/maniya.jpg' 
    },
    { 
      name: 'Dulaj Rajapaksa', 
      catches: 10, 
      stumpings: 2, 
      runOuts: 3, 
      total: 15, 
      avatar: '/images/gallery/players/dulaj.jpg' 
    },
    { 
      name: 'Suviru Perera', 
      catches: 8, 
      stumpings: 1, 
      runOuts: 4, 
      total: 13, 
      avatar: '/images/gallery/players/suviru.jpg' 
    },
    { 
      name: 'Lahiru Fernando', 
      catches: 6, 
      stumpings: 0,
      runOuts: 5, 
      total: 11,
      avatar: '/images/gallery/players/lahiru.jpeg'
    },
    { 
      name: 'Asitha', 
      catches: 5, 
      stumpings: 1, 
      runOuts: 3, 
      total: 9,
      avatar: '/images/gallery/players/dulaj.jpg'
    }
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => 
        (prev + 1) % clubEvents.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [clubEvents.length]);

  const topBatsmen = samplePlayers
    .sort((a, b) => b.runs - a.runs)
    .slice(0, 5);

  const topBowlers = samplePlayers
    .filter(p => p.wickets > 0)
    .sort((a, b) => b.wickets - a.wickets)
    .slice(0, 5);


  const nextEvent = () => {
    setCurrentEventIndex((prev) => (prev + 1) % clubEvents.length);
  };

  const prevEvent = () => {
    setCurrentEventIndex((prev) => (prev - 1 + clubEvents.length) % clubEvents.length);
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: colors.backgroundSecondary}}>
      {/* NSBM Pitch Stripe Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{background: NSBM_DESIGN_SYSTEM.cricket.pitchStripe}}
      ></div>
      
      <div className="relative w-full max-w-none mx-auto px-4 sm:px-6 xl:px-12 py-8 space-y-6">

        {/* High-Contrast KPI Row - Audit-Friendly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <NSBMKPITile
            title="Total Players"
            value={auditData.totalPlayers}
            trend={2.3}
            icon={Users}
            className="border-l-4"
            style={{borderLeftColor: nsbmGreen}}
          />
          <NSBMKPITile
            title="Active Sessions"
            value={auditData.activeSessions}
            trend={-1.2}
            icon={Activity}
            className="border-l-4"
            style={{borderLeftColor: nsbmBlue}}
          />
          <NSBMKPITile
            title="Injuries"
            value={auditData.injuries}
            trend={-0.5}
            icon={Target}
            className="border-l-4"
            style={{borderLeftColor: colors.error}}
          />
          <NSBMKPITile
            title="Attendance %"
            value={`${auditData.attendance}%`}
            trend={3.1}
            icon={Users}
            className="border-l-4"
            style={{borderLeftColor: nsbmGold}}
          />
      </div>

        {/* Club Events - Full Width with NSBM Branding */}
        <NSBMCard className="overflow-hidden" elevated>
          <div className="flex items-center justify-between p-6 pb-4">
            <NSBMSectionHeader icon={Calendar} title="Club Events" />
            <div className="flex space-x-1">
              <NSBMButton
                variant="tertiary"
                size="sm"
                onClick={prevEvent}
                className="p-2"
                aria-label="Previous event"
              >
                <ChevronLeft className="w-4 h-4" />
              </NSBMButton>
              <NSBMButton
                variant="tertiary"
                size="sm"
                onClick={nextEvent}
                className="p-2"
                aria-label="Next event"
              >
                <ChevronRight className="w-4 h-4" />
              </NSBMButton>
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
        </NSBMCard>

        {/* Full Width Layout */}
        <div className="space-y-6">
          {/* Top Performers with NSBM Branding */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Batsmen */}
            <NSBMCard className="p-6" elevated>
              <NSBMSectionHeader icon={Trophy} title="Top Batsmen" />
              <div className="space-y-3">
                {topBatsmen.map((player, index) => (
                  <NSBMCard key={player.id} className="flex items-center space-x-3 p-3" variant="secondary">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{backgroundColor: nsbmGreen}}
                    >
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
                      <p className="font-medium" style={{color: colors.textPrimary}}>{player.name}</p>
                      <p className="text-sm" style={{color: colors.textSecondary}}>{player.runs} runs</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{color: colors.textPrimary}}>{player.average}</p>
                      <p className="text-xs" style={{color: colors.textMuted}}>Avg</p>
                    </div>
                  </NSBMCard>
                ))}
              </div>
            </NSBMCard>

            {/* Top Bowlers */}
            <NSBMCard className="p-6" elevated>
              <NSBMSectionHeader icon={Target} title="Top Bowlers" />
              <div className="space-y-3">
                {topBowlers.map((player, index) => (
                  <NSBMCard key={player.id} className="flex items-center space-x-3 p-3" variant="secondary">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{backgroundColor: nsbmGreen}}
                    >
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
                      <p className="font-medium" style={{color: colors.textPrimary}}>{player.name}</p>
                      <p className="text-sm" style={{color: colors.textSecondary}}>{player.wickets} wickets</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium" style={{color: colors.textPrimary}}>{player.average}</p>
                      <p className="text-xs" style={{color: colors.textMuted}}>Avg</p>
                    </div>
                  </NSBMCard>
                ))}
              </div>
            </NSBMCard>

            {/* Top Fielders */}
            <NSBMCard className="p-6" elevated>
              <NSBMSectionHeader icon={Target} title="Top Fielders" />
              <div className="space-y-3">
                {topFieldersData.map((fielder, index) => (
                  <NSBMCard key={fielder.name} className="flex items-center space-x-3 p-3" variant="secondary">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                      style={{backgroundColor: nsbmGreen}}
                    >
                      {index + 1}
            </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={fielder.avatar} 
                        alt={fielder.name}
                        className="w-full h-full object-cover"
                      />
            </div>
                  <div className="flex-1">
                      <p className="font-medium" style={{color: colors.textPrimary}}>{fielder.name}</p>
                      <p className="text-sm" style={{color: colors.textSecondary}}>{fielder.total} dismissals</p>
                  </div>
                  <div className="text-right">
                      <p className="text-sm font-medium" style={{color: colors.textPrimary}}>{fielder.catches}</p>
                      <p className="text-xs" style={{color: colors.textMuted}}>Catches</p>
                  </div>
                  </NSBMCard>
              ))}
            </div>
            </NSBMCard>
        </div>

          {/* Upcoming Matches with NSBM Branding */}
          <NSBMCard className="p-6" elevated>
            <NSBMSectionHeader icon={Calendar} title="Upcoming Matches" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingMatches.map((match) => (
                <NSBMCard key={match.id} className="p-4" variant="secondary">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium" style={{color: colors.textPrimary}}>vs {match.opponent}</h4>
                    <NSBMBadge variant="primary" size="sm">{match.type}</NSBMBadge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm" style={{color: colors.textSecondary}}>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" style={{color: nsbmGreen}} />
                      <span>{new Date(match.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" style={{color: nsbmGreen}} />
                      <span>{match.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 mt-2 text-xs" style={{color: colors.textMuted}}>
                    <MapPin className="w-3 h-3" style={{color: nsbmGreen}} />
                    <span>{match.venue}</span>
                  </div>
                </NSBMCard>
              ))}
            </div>
          </NSBMCard>

          {/* Recent Matches with NSBM Branding */}
          <NSBMCard className="p-6" elevated>
            <NSBMSectionHeader icon={Activity} title="Recent Matches" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentMatches.map((match) => (
                <NSBMCard key={match.id} className="p-4" variant="secondary">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium" style={{color: colors.textPrimary}}>vs {match.opponent}</h4>
                    <NSBMBadge 
                      variant={match.result === 'Win' ? 'success' : match.result === 'Loss' ? 'error' : 'default'}
                      size="sm"
                    >
                      {match.result}
                    </NSBMBadge>
              </div>
                  <p className="text-sm mb-2" style={{color: colors.textSecondary}}>{match.score}</p>
                  <div className="flex items-center space-x-1 text-xs mb-2" style={{color: colors.textMuted}}>
                    <Calendar className="w-3 h-3" style={{color: nsbmGreen}} />
                    <span>{new Date(match.date).toLocaleDateString()}</span>
            </div>
                  <div className="text-xs" style={{color: colors.textMuted}}>
                    <p className="font-medium mb-1">Top Performer</p>
                    <p>{match.topPerformer}</p>
                        </div>
                </NSBMCard>
              ))}
            </div>
          </NSBMCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
