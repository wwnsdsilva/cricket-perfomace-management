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
import BattingService from '../../services/BattingService';
import BowlingService from '../../services/BowlingService';
import FieldingService from '../../services/FieldingService';
import PerformanceService from '../../services/PerformanceService';
import MatchService from '../../services/MatchService';

// NSBM Brand Colors from Design System
const { colors } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;

const nsbmBlue = colors.brandSecondary;
const nsbmGold = colors.brandAccent;

const base_url = "http://localhost:8080/unicricket360";

 // Sample data
 const samplePlayers = [
  { player_id: 1, player_name: 'Monil Jason', total_runs: 1250, total_wickets: 5, matches_batted: 15, batting_average: 45.2, image_url: '/images/gallery/players/maniya.jpg' },
  { player_id: 2, player_name: 'Dulaj Bandara', total_runs: 890, total_wickets: 28, matches_batted: 12, batting_average: 32.1, image_url: '/images/gallery/players/dulaj.jpg' },
  { player_id: 3, player_name: 'Suviru Sathnidu', total_runs: 1100, total_wickets: 15, matches_batted: 18, batting_average: 38.9, image_url: '/images/gallery/players/suviru.jpg' },
  { player_id: 4, player_name: 'Lahiru Abhesinghe', total_runs: 750, total_wickets: 8, matches_batted: 14, batting_average: 28.6, image_url: '/images/gallery/players/lahiru.jpeg' },
  { player_id: 5, player_name: 'Asitha Wanninayake', total_runs: 650, total_wickets: 2, matches_batted: 16, batting_average: 25.0, image_url: '/images/gallery/players/asitha.jpeg' },
  { player_id: 6, player_name: 'Maneendra Jayathilaka', total_runs: 950, total_wickets: 12, matches_batted: 13, batting_average: 35.8, image_url: '/images/gallery/players/maniya.jpg' },
  { player_id: 7, player_name: 'Dilhara Polgampola', total_runs: 800, total_wickets: 18, matches_batted: 11, batting_average: 30.2, image_url: '/images/gallery/players/lahiru.jpeg' },
  { player_id: 8, player_name: 'Dinesh Pethiyagoda', total_runs: 700, total_wickets: 6, matches_batted: 10, batting_average: 28.0, image_url: '/images/gallery/players/asitha.jpeg' },
  { player_id: 9, player_name: 'Pathum Perera', total_runs: 600, total_wickets: 4, matches_batted: 9, batting_average: 25.5, image_url: '/images/gallery/players/dulaj.jpg' }
];

const recentMatchess = [
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

const upcomingMatchess = [
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
    player_name: 'Maneendra Jayathilaka', 
    catches: 15, 
    stumpings: 4, 
    runOuts: 3, 
    total: 22, 
    avatar: '/images/gallery/players/maniya.jpg' 
  },
  { 
    player_name: 'Monil Jason', 
    catches: 12, 
    stumpings: 2, 
    runOuts: 4, 
    total: 18, 
    avatar: '/images/gallery/players/dulaj.jpg' 
  },
  { 
    player_name: 'Suviru Sathnidu', 
    catches: 10, 
    stumpings: 1, 
    runOuts: 5, 
    total: 16, 
    avatar: '/images/gallery/players/suviru.jpg' 
  },
  { 
    player_name: 'Dilhara Polgampola', 
    catches: 8, 
    stumpings: 0,
    runOuts: 6, 
    total: 14,
    avatar: '/images/gallery/players/lahiru.jpeg'
  },
  { 
    player_name: 'Dulaj Bandara', 
    catches: 7, 
    stumpings: 1, 
    runOuts: 4, 
    total: 12,
    avatar: '/images/gallery/players/asitha.jpeg'
  }
];

/* const topBatsmen = samplePlayers
.sort((a, b) => b.total_runs - a.total_runs)
.slice(0, 5);

const topBowlers = samplePlayers
  .filter(p => p.total_wickets > 0)
  .sort((a, b) => b.total_wickets - a.total_wickets)
  .slice(0, 5); */

const AdminDashboard = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const [auditData, setAuditData] = useState({
    totalPlayers: 0,
    activeSessions: 0,
    injuries: 0,
    attendance: 0,
  });

  const [clubEvents, setClubEvents] = useState([]);
  const [topBatters, setTopBatters] = useState([]);
  const [topBowlers, setTopBowlers] = useState([]);
  const [topFielders, setTopFielders] = useState([]);
  const [matches, setMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);

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
    getTopBatters();
    getTopBowlers();
    getTopFielders();
    getAllMatches();
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

  const getTopBatters = async () => {
    try {
      const res = await PerformanceService.getTopBatters();
      console.log(res);

      if (res.status === 200) {
        // Check if data exists
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data.data);
          setTopBatters(res.data.data); 
        } else {
          alert(res.data.message)
          setTopBatters([]); 
        }
      } else {
        console.error("Failed to fetch top batters");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching top batters: ", error);
    }
  };
  
  const getTopBowlers = async () => {
    try {
      const res = await PerformanceService.getTopBowlers();
      console.log(res);

      if (res.status === 200) {
        // Check if data exists
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data.data);
          setTopBowlers(res.data.data);
        } else {
          alert(res.data.message)
          setTopBowlers([]);
        }
      } else {
        console.error("Failed to fetch top bowlers");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching top bowlers: ", error);
    }
  };
  
  const getTopFielders = async () => {
    try {
      const res = await PerformanceService.getTopFielders();
      console.log(res);

      if (res.status === 200) {
        // Check if data exists
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data.data);
          setTopFielders(res.data.data);
        } else {
          alert(res.data.message)
          setTopFielders([]);
        }
      } else {
        console.error("Failed to fetch top fielders");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching top fielders: ", error);
    }
  };
  
  const getAllMatches = async () => {
    try {
      const res = await MatchService.getAll();
      console.log(res);

      if (res.status === 200) {
        // Check if data exists
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data.data);
          setMatches(res.data.data);

          // filter upcoming matches
          const upcoming = res.data.data.filter((match)=> match.status === "UPCOMING")
          setUpcomingMatches(upcoming);

          // filter recent matches (last 3 completed)
          const recent = res.data.data
          .filter((match) => match.status === "COMPLETED")
          .sort(
            (a, b) => new Date(b.date_time) - new Date(a.date_time) // latest first
          )
          .slice(0, 3); // take only last 3

          setRecentMatches(recent);

        } else {
          alert(res.data.message)
          setMatches([]);
        }
      } else {
        console.error("Failed to fetch matches");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching matches: ", error);
    }
  };

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
              // trend={2.3}
              icon={Users}
              className="border-l-4 shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{borderLeftColor: nsbmGreen, backgroundColor: `${nsbmGreen}10`}}
            />
            <NSBMKPITile
              title="Active Sessions"
              value={auditData.activeSessions}
              // trend={-1.2}
              icon={Activity}
              className="border-l-4 shadow-lg transform hover:scale-105 transition-all duration-200"
              style={{borderLeftColor: nsbmBlue, backgroundColor: `${nsbmBlue}10`}}
            />
            <NSBMKPITile
              title="Injuries"
              value={auditData.injuries}
              // trend={-0.5}
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
                  src={`${base_url}${clubEvents[currentEventIndex].image_url}`}
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
                  {topBatters.map((player, index) => (
                    <NSBMCard key={player.player_id} className="flex items-center space-x-3 p-3 hover:shadow-md transition-all duration-200 group/item" variant="secondary">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover/item:scale-110 transition-transform duration-200"
                        style={{background: `linear-gradient(135deg, ${nsbmGreen}, ${nsbmGreen}CC)`}}
                      >
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 group-hover/item:ring-4 group-hover/item:ring-green-300/50 transition-all duration-200">
                        <img 
                          // src={player.photo} 
                          src={`${base_url}${player.image_url}`}
                          alt={player.player_name}
                          className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium group-hover/item:text-green-600 transition-colors duration-200" style={{color: colors.textPrimary}}>{player.player_name}</p>
                        <p className="text-sm" style={{color: colors.textSecondary}}>{player.total_runs} runs</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium" style={{color: colors.textPrimary}}>
                          {player.batting_average != null ? Number(player.batting_average).toFixed(2) : "0.00"}
                        </p>
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
                    <NSBMCard key={player.player_id} className="flex items-center space-x-3 p-3 hover:shadow-md transition-all duration-200 group/item" variant="secondary">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover/item:scale-110 transition-transform duration-200"
                        style={{background: `linear-gradient(135deg, ${nsbmBlue}, ${nsbmBlue}CC)`}}
                      >
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 group-hover/item:ring-4 group-hover/item:ring-blue-300/50 transition-all duration-200">
                        <img 
                          // src={player.photo} 
                          src={`${base_url}${player.image_url}`}
                          alt={player.player_name}
                          className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium group-hover/item:text-blue-600 transition-colors duration-200" style={{color: colors.textPrimary}}>{player.player_name}</p>
                        <p className="text-sm" style={{color: colors.textSecondary}}>{player.total_wickets} wickets</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium" style={{color: colors.textPrimary}}>{(player.bowling_average).toFixed(2)}</p>
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
                  {topFielders.map((player, index) => (
                    <NSBMCard key={player.player_name} className="flex items-center space-x-3 p-3 hover:shadow-md transition-all duration-200 group/item" variant="secondary">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover/item:scale-110 transition-transform duration-200"
                        style={{background: `linear-gradient(135deg, ${nsbmGold}, ${nsbmGold}CC)`}}
                      >
                        {index + 1}
              </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20 group-hover/item:ring-4 group-hover/item:ring-yellow-300/50 transition-all duration-200">
                        <img 
                          // src={player.avatar} 
                          src={`${base_url}${player.image_url}`}
                          alt={player.player_name}
                          className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-200"
                        />
              </div>
                    <div className="flex-1">
                        <p className="font-medium group-hover/item:text-yellow-600 transition-colors duration-200" style={{color: colors.textPrimary}}>{player.player_name}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-medium" style={{color: colors.textPrimary}}>{player.total_dismissals}</p>
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
                    <h4 className="font-medium group-hover/match:text-green-600 transition-colors duration-200" style={{color: colors.textPrimary}}>vs {match.opponent.team_name}</h4>
                    <NSBMBadge variant="primary" size="sm" className="group-hover/match:scale-110 transition-transform duration-200">{match.match_type}</NSBMBadge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm" style={{color: colors.textSecondary}}>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 group-hover/match:scale-110 transition-transform duration-200" style={{color: nsbmGreen}} />
                      {/* <span>{new Date(match.date).toLocaleDateString()}</span> */}
                      <span>{new Date(match.date_time).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 group-hover/match:scale-110 transition-transform duration-200" style={{color: nsbmGreen}} />
                      {/* <span>{match.time}</span> */}
                      <span>{new Date(match.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
                    <h4 className="font-medium group-hover/match:text-blue-600 transition-colors duration-200" style={{color: colors.textPrimary}}>vs {match.opponent.team_name}</h4>
                    <div className="flex items-center space-x-2">
                      <NSBMBadge variant="primary" size="sm" className="group-hover/match:scale-110 transition-transform duration-200">{match.match_type}</NSBMBadge>
                      <NSBMBadge 
                        variant={match.result === 'WIN' ? 'success' : match.result === 'LOSS' ? 'error' : 'default'}
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
                    <span>{new Date(match.date_time).toLocaleDateString()}</span>
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
