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
import axios from '../../axios';
import PlayerService from '../../services/PlayerService';
import SessionService from '../../services/SessionService';
import InjuryService from '../../services/InjuryService';
import EventService from '../../services/EventService';

// NSBM Brand Colors from Design System
const { colors } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;

const nsbmBlue = colors.brandSecondary;
const nsbmGold = colors.brandAccent;


const AdminDashboard = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const [auditData, setAuditData] = useState({
    totalPlayers: 0,
    activeSessions: 0,
    injuries: 0,
    attendance: 0,
  });

  const [clubEvents, setClubEvents] = useState([]);

  // Sample data
  const samplePlayers = [
    { id: 1, name: 'Monil Jason', runs: 1250, wickets: 5, matches: 15, average: 45.2, photo: '/images/gallery/players/maniya.jpg' },
    { id: 2, name: 'Dulaj Bandara', runs: 890, wickets: 28, matches: 12, average: 32.1, photo: '/images/gallery/players/dulaj.jpg' },
    { id: 3, name: 'Suviru Sathnidu', runs: 1100, wickets: 15, matches: 18, average: 38.9, photo: '/images/gallery/players/suviru.jpg' },
    { id: 4, name: 'Lahiru Abhesinghe', runs: 750, wickets: 8, matches: 14, average: 28.6, photo: '/images/gallery/players/lahiru.jpeg' },
    { id: 5, name: 'Asitha Wanninayake', runs: 650, wickets: 2, matches: 16, average: 25.0, photo: '/images/gallery/players/asitha.jpeg' },
    { id: 6, name: 'Maneendra Jayathilaka', runs: 950, wickets: 12, matches: 13, average: 35.8, photo: '/images/gallery/players/maniya.jpg' },
    { id: 7, name: 'Dilhara Polgampola', runs: 800, wickets: 18, matches: 11, average: 30.2, photo: '/images/gallery/players/lahiru.jpeg' },
    { id: 8, name: 'Dinesh Pethiyagoda', runs: 700, wickets: 6, matches: 10, average: 28.0, photo: '/images/gallery/players/asitha.jpeg' },
    { id: 9, name: 'Pathum Perera', runs: 600, wickets: 4, matches: 9, average: 25.5, photo: '/images/gallery/players/dulaj.jpg' }
  ];

  const recentMatches = [
    {
      id: 1,
      opponent: 'APIIT',
      date: '2024-01-08',
      result: 'Win',
      score: '245/8 (50) vs 198/10 (45.2)',
      type: 'T20'
    },
    {
      id: 2,
      opponent: 'KDU',
      date: '2024-01-05',
      result: 'Loss',
      score: '180/10 (42) vs 185/6 (38.5)',
      type: 'T10'
    },
    {
      id: 3,
      opponent: 'SLIIT',
      date: '2024-01-02',
      result: 'Draw',
      score: '220/8 (50) vs 220/9 (50)',
      type: 'T20'
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

  const clubEventss = [
    {
      id: 1,
      event_title: 'Annual Cricket Awards Night',
      date_time: '2024-02-15T14:30:00',
      image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop',
      is_featured: true
    },
    {
      id: 2,
      event_title: 'Training Camp',
      date_time: '2024-03-10',
      image_url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop',
      is_featured: false
    },
    {
      id: 3,
      event_title: 'Fundraising Event',
      date_time: '2024-03-20',
      image_url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop',
      is_featured: true
    },
    {
      id: 4,
      event_title: 'Championship Victory',
      date_time: '2024-02-15',
      image_url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop',
      is_featured: false
    }
  ];

  const topFieldersData = [
    { 
      name: 'Maneendra Jayathilaka', 
      catches: 15, 
      stumpings: 4, 
      runOuts: 3, 
      total: 22, 
      avatar: '/images/gallery/players/maniya.jpg' 
    },
    { 
      name: 'Monil Jason', 
      catches: 12, 
      stumpings: 2, 
      runOuts: 4, 
      total: 18, 
      avatar: '/images/gallery/players/dulaj.jpg' 
    },
    { 
      name: 'Suviru Sathnidu', 
      catches: 10, 
      stumpings: 1, 
      runOuts: 5, 
      total: 16, 
      avatar: '/images/gallery/players/suviru.jpg' 
    },
    { 
      name: 'Dilhara Polgampola', 
      catches: 8, 
      stumpings: 0,
      runOuts: 6, 
      total: 14,
      avatar: '/images/gallery/players/lahiru.jpeg'
    },
    { 
      name: 'Dulaj Bandara', 
      catches: 7, 
      stumpings: 1, 
      runOuts: 4, 
      total: 12,
      avatar: '/images/gallery/players/asitha.jpeg'
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

  useEffect(() => {
    getPlayersCount();
    getSessionsCount();
    getInjuriesCount();
    getClubEvents();
  }, []);


  const getPlayersCount = async () => {
    let res = await PlayerService.getCount();
    console.log(res);

    if (res.status == 200) {
      if (res.data.data != 0) {
        console.log(res.data.data);
        setAuditData((prev) => ({
          ...prev,
          totalPlayers: res.data.data,
        }));
      }
    }
  };

  const getSessionsCount = async () => {
    let res = await SessionService.getCount("ONGOING");
    console.log(res);

    if (res.status == 200) {
      if (res.data.data != 0) {
        console.log(res.data.data);
        setAuditData((prev) => ({
          ...prev,
          activeSessions: res.data.data,
        }));
      }
    }
  };

  const getInjuriesCount = async () => {
    let res = await InjuryService.getCount();
    console.log(res);

    if (res.status == 200) {
      if (res.data.data != 0) {
        console.log(res.data.data);
        setAuditData((prev) => ({
          ...prev,
          injuries: res.data.data,
        }));
      }
    }
  };
  
  const getClubEvents = async () => {
    try {
      const res = await EventService.getAll();
      console.log(res);

      if (res.status === 200) {
        // Check if data exists
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data.data);
          setClubEvents(res.data.data); // This updates the state
        } else {
          console.log("No club events found");
          setClubEvents([]); // Clear state if no events
        }
      } else {
        console.log("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching club events:", error);
    }
  };

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
    <div className="min-h-screen relative overflow-hidden" style={{backgroundColor: colors.backgroundSecondary}}>
      {/* NSBM Pitch Stripe Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{background: NSBM_DESIGN_SYSTEM.cricket.pitchStripe}}
      ></div>
      
      {/* Decorative gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5" style={{background: `radial-gradient(circle, ${nsbmGreen}, transparent)`}}></div>
      <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full opacity-5" style={{background: `radial-gradient(circle, ${nsbmBlue}, transparent)`}}></div>
      
      <div className="relative w-full max-w-none mx-auto px-4 sm:px-6 xl:px-12 py-8 space-y-8">

        {/* -------------Summary----------- */}

        {/* High-Contrast KPI Row - Audit-Friendly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <NSBMKPITile
              title="Total Players"
              value={auditData.totalPlayers}
              trend={2.3}
              icon={Users}
              className="border-l-4 shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{borderLeftColor: nsbmGreen, backgroundColor: `${nsbmGreen}10`}}
            />
            <NSBMKPITile
              title="Active Sessions"
              value={auditData.activeSessions}
              trend={-1.2}
              icon={Activity}
              className="border-l-4 shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{borderLeftColor: nsbmBlue, backgroundColor: `${nsbmBlue}10`}}
            />
            <NSBMKPITile
              title="Injuries"
              value={auditData.injuries}
              trend={-0.5}
              icon={Target}
              className="border-l-4 shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{borderLeftColor: colors.error, backgroundColor: `${colors.error}10`}}
            />
        </div>

        {/* -------------Club Events Carousal----------- */}

        {/* Club Events - Full Width with NSBM Branding */}
        <NSBMCard className="overflow-hidden relative group" elevated>
          {/* Gradient overlay for visual appeal */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center justify-between p-6 pb-4 relative z-10">
            <NSBMSectionHeader icon={Calendar} title="Club Events" />
            <div className="flex space-x-1">
              <NSBMButton
                variant="tertiary"
                size="sm"
                onClick={prevEvent}
                className="p-2 hover:scale-110 transition-transform duration-200"
                aria-label="Previous event"
              >
                <ChevronLeft className="w-4 h-4" />
              </NSBMButton>
              <NSBMButton
                variant="tertiary"
                size="sm"
                onClick={nextEvent}
                className="p-2 hover:scale-110 transition-transform duration-200"
                aria-label="Next event"
              >
                <ChevronRight className="w-4 h-4" />
              </NSBMButton>
            </div>
          </div>

          <div className="relative overflow-hidden">
            {clubEvents.length > 0 && (
              <div className="relative h-64 group">
                <img 
                  src={`http://localhost:8080/unicricket360${clubEvents[currentEventIndex].image_url}`}
                  // src={clubEvents[currentEventIndex].image_url} 
                  alt={clubEvents[currentEventIndex].event_title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                  <div className="p-6 text-white w-full">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-xl mb-2 drop-shadow-lg">{clubEvents[currentEventIndex].event_title}</h4>
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="w-4 h-4" style={{color: nsbmGreen}} />
                          <span className="drop-shadow-md">{new Date(clubEvents[currentEventIndex].date_time).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {clubEvents[currentEventIndex].is_featured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-sm px-4 py-2 rounded-full shadow-lg font-semibold">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center p-6 pt-4 space-x-2">
            {clubEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentEventIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  index === currentEventIndex 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        </NSBMCard>


        {/* Full Width Layout */}
        <div className="space-y-6">

          {/* ----------- Top Performers with NSBM Branding-----------  */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Top Batsmen */}
              <NSBMCard className="p-6 group hover:shadow-xl transition-all duration-300" elevated>
                <NSBMSectionHeader icon={Trophy} title="Top Batsmen" />
                <div className="space-y-3">
                  {topBatsmen.map((player, index) => (
                    <NSBMCard key={player.id} className="flex items-center space-x-3 p-3 hover:shadow-md transition-all duration-200 group/item" variant="secondary">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover/item:scale-110 transition-transform duration-200"
                        style={{background: `linear-gradient(135deg, ${nsbmGreen}, ${nsbmGreen}CC)`}}
                      >
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 group-hover/item:ring-4 group-hover/item:ring-green-300/50 transition-all duration-200">
                        <img 
                          src={player.photo} 
                          alt={player.name}
                          className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium group-hover/item:text-green-600 transition-colors duration-200" style={{color: colors.textPrimary}}>{player.name}</p>
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
              <NSBMCard className="p-6 group hover:shadow-xl transition-all duration-300" elevated>
                <NSBMSectionHeader icon={Target} title="Top Bowlers" />
                <div className="space-y-3">
                  {topBowlers.map((player, index) => (
                    <NSBMCard key={player.id} className="flex items-center space-x-3 p-3 hover:shadow-md transition-all duration-200 group/item" variant="secondary">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover/item:scale-110 transition-transform duration-200"
                        style={{background: `linear-gradient(135deg, ${nsbmBlue}, ${nsbmBlue}CC)`}}
                      >
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 group-hover/item:ring-4 group-hover/item:ring-blue-300/50 transition-all duration-200">
                        <img 
                          src={player.photo} 
                          alt={player.name}
                          className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium group-hover/item:text-blue-600 transition-colors duration-200" style={{color: colors.textPrimary}}>{player.name}</p>
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
              <NSBMCard className="p-6 group hover:shadow-xl transition-all duration-300" elevated>
                <NSBMSectionHeader icon={Target} title="Top Fielders" />
                <div className="space-y-3">
                  {topFieldersData.map((fielder, index) => (
                    <NSBMCard key={fielder.name} className="flex items-center space-x-3 p-3 hover:shadow-md transition-all duration-200 group/item" variant="secondary">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover/item:scale-110 transition-transform duration-200"
                        style={{background: `linear-gradient(135deg, ${nsbmGold}, ${nsbmGold}CC)`}}
                      >
                        {index + 1}
              </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 group-hover/item:ring-4 group-hover/item:ring-yellow-300/50 transition-all duration-200">
                        <img 
                          src={fielder.avatar} 
                          alt={fielder.name}
                          className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-200"
                        />
              </div>
                    <div className="flex-1">
                        <p className="font-medium group-hover/item:text-yellow-600 transition-colors duration-200" style={{color: colors.textPrimary}}>{fielder.name}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium" style={{color: colors.textPrimary}}>{fielder.total}</p>
                        <p className="text-xs" style={{color: colors.textMuted}}>Dismissals</p>
                    </div>
                    </NSBMCard>
                ))}
              </div>
              </NSBMCard>
          </div>

          {/* ----------- Upcoming Matches with NSBM Branding ----------- */}
          <NSBMCard className="p-6 group hover:shadow-xl transition-all duration-300" elevated>
            <NSBMSectionHeader icon={Calendar} title="Upcoming Matches" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingMatches.map((match) => (
                <NSBMCard key={match.id} className="p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 group/match" variant="secondary">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium group-hover/match:text-green-600 transition-colors duration-200" style={{color: colors.textPrimary}}>vs {match.opponent}</h4>
                    <NSBMBadge variant="primary" size="sm" className="group-hover/match:scale-110 transition-transform duration-200">{match.type}</NSBMBadge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm" style={{color: colors.textSecondary}}>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 group-hover/match:scale-110 transition-transform duration-200" style={{color: nsbmGreen}} />
                      <span>{new Date(match.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 group-hover/match:scale-110 transition-transform duration-200" style={{color: nsbmGreen}} />
                      <span>{match.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 mt-2 text-xs" style={{color: colors.textMuted}}>
                    <MapPin className="w-3 h-3 group-hover/match:scale-110 transition-transform duration-200" style={{color: nsbmGreen}} />
                    <span>{match.venue}</span>
                  </div>
                </NSBMCard>
              ))}
            </div>
          </NSBMCard>

          {/* ----------- Recent Matches with NSBM Branding ----------- */}
          <NSBMCard className="p-6 group hover:shadow-xl transition-all duration-300" elevated>
            <NSBMSectionHeader icon={Activity} title="Recent Matches" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentMatches.map((match) => (
                <NSBMCard key={match.id} className="p-4 hover:shadow-lg hover:scale-105 transition-all duration-200 group/match" variant="secondary">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium group-hover/match:text-blue-600 transition-colors duration-200" style={{color: colors.textPrimary}}>vs {match.opponent}</h4>
                    <div className="flex items-center space-x-2">
                      <NSBMBadge variant="primary" size="sm" className="group-hover/match:scale-110 transition-transform duration-200">{match.type}</NSBMBadge>
                      <NSBMBadge 
                        variant={match.result === 'Win' ? 'success' : match.result === 'Loss' ? 'error' : 'default'}
                        size="sm"
                        className="group-hover/match:scale-110 transition-transform duration-200"
                      >
                        {match.result}
                      </NSBMBadge>
                    </div>
              </div>
                  <p className="text-sm mb-2" style={{color: colors.textSecondary}}>{match.score}</p>
                  <div className="flex items-center space-x-1 text-xs" style={{color: colors.textMuted}}>
                    <Calendar className="w-3 h-3 group-hover/match:scale-110 transition-transform duration-200" style={{color: nsbmGreen}} />
                    <span>{new Date(match.date).toLocaleDateString()}</span>
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
