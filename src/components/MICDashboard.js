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
import { NSBM_DESIGN_SYSTEM, getBrandColor } from '../styles/nsbm-design-system';
import MatchService from '../services/MatchService';
import PerformanceService from '../services/PerformanceService';
import PlayerService from '../services/PlayerService';
import InjuryService from '../services/InjuryService';
import EventService from '../services/EventService';
import FitnessService from '../services/FitnessService';
import AttendanceService from '../services/AttendanceService';
import SessionService from '../services/SessionService';

// NSBM Design System
const { colors, shadows } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;
const nsbmBlue = colors.brandSecondary;
const nsbmGold = colors.brandAccent;
const getNsbmGreen = (opacity = 1) => getBrandColor('brandPrimary', opacity);
const getNsbmBlue = (opacity = 1) => getBrandColor('brandSecondary', opacity);

// Aliases to match existing variable usage in this file
const mainBackground = colors.backgroundSecondary;
const cardBackground = colors.backgroundPrimary;
const cardBackgroundAlt = colors.backgroundSecondary;
const lightBorder = colors.borderLight;
const textPrimary = colors.textPrimary;
const textSecondary = colors.textSecondary;
const textMuted = colors.textTertiary;
const accentBlue = nsbmBlue;
const accentGreen = nsbmGreen;
const successGreen = colors.success;
const errorRed = colors.error;

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
// const teamData = {
//   name: 'NSBM Cricket Club',
//   season: '2025',
//   winLoss: { wins: 8, losses: 4, draws: 1, total: 13 },
//   netRunRate: 0.45,
//   totalPlayers: 25,
//   activePlayers: 22,
//   injuredPlayers: 3
// };

const players = [
  { id: 1, name: 'Monil Jason', role: 'Batsman', photo: '/images/gallery/players/maniya.jpg', batting: { average: 45.2, strikeRate: 140.4, runs: 1250 }, bowling: { average: 26.7, economy: 7.1, wickets: 12 }, fielding: { catches: 8, runOuts: 3 }, fitness: { sprint20m: 3.2, beepTest: 12.5, status: 'Healthy' }, attendance: 95 },
  { id: 2, name: 'Dulaj Bandara', role: 'All-rounder', photo: '/images/gallery/players/dulaj.jpg', batting: { average: 18.5, strikeRate: 95.2, runs: 320 }, bowling: { average: 18.2, economy: 5.8, wickets: 28 }, fielding: { catches: 5, runOuts: 2 }, fitness: { sprint20m: 3.4, beepTest: 11.8, status: 'Healthy' }, attendance: 88 },
  { id: 3, name: 'Suviru Sathnidu', role: 'Bowler', photo: '/images/gallery/players/suviru.jpg', batting: { average: 38.9, strikeRate: 125.6, runs: 1100 }, bowling: { average: 35.2, economy: 8.2, wickets: 5 }, fielding: { catches: 12, runOuts: 1 }, fitness: { sprint20m: 3.1, beepTest: 12.1, status: 'Recovering' }, attendance: 92 },
  { id: 4, name: 'Lahiru Abhesinghe', role: 'Batsman', photo: '/images/gallery/players/lahiru.jpeg', batting: { average: 42.1, strikeRate: 135.8, runs: 980 }, bowling: { average: 42.3, economy: 8.9, wickets: 3 }, fielding: { catches: 15, runOuts: 4 }, fitness: { sprint20m: 3.3, beepTest: 12.0, status: 'Healthy' }, attendance: 90 },
  { id: 5, name: 'Asitha Wanninayake', role: 'Bowler', photo: '/images/gallery/players/asitha.jpeg', batting: { average: 22.3, strikeRate: 88.7, runs: 450 }, bowling: { average: 22.1, economy: 6.2, wickets: 24 }, fielding: { catches: 7, runOuts: 3 }, fitness: { sprint20m: 3.5, beepTest: 11.5, status: 'Healthy' }, attendance: 87 },
  { id: 6, name: 'Suviru Sathnidu', role: 'All-rounder', photo: '/images/gallery/players/suviru.jpg', batting: { average: 35.6, strikeRate: 128.3, runs: 890 }, bowling: { average: 28.4, economy: 7.5, wickets: 18 }, fielding: { catches: 11, runOuts: 2 }, fitness: { sprint20m: 3.0, beepTest: 12.8, status: 'Healthy' }, attendance: 94 },
  { id: 7, name: 'Monil Jason', role: 'Wicket-keeper', photo: '/images/gallery/players/maniya.jpg', batting: { average: 39.8, strikeRate: 132.1, runs: 1050 }, bowling: { average: 38.9, economy: 8.7, wickets: 4 }, fielding: { catches: 9, runOuts: 1 }, fitness: { sprint20m: 3.2, beepTest: 12.3, status: 'Healthy' }, attendance: 91 },
  { id: 8, name: 'Lahiru Abhesinghe', role: 'Batsman', photo: '/images/gallery/players/lahiru.jpeg', batting: { average: 16.7, strikeRate: 92.4, runs: 280 }, bowling: { average: 20.5, economy: 6.8, wickets: 26 }, fielding: { catches: 6, runOuts: 3 }, fitness: { sprint20m: 3.6, beepTest: 11.2, status: 'Healthy' }, attendance: 89 }
];

const recentMatches = [
  {
    id: 1,
    opponent: 'APIIT',
    date: '2024-01-08',
    result: 'Win',
    score: '245/8 (50) vs 198/10 (45.2)',
    nrr: 0.94,
    type: 'T20'
  },
  {
    id: 2,
    opponent: 'KDU',
    date: '2024-01-05',
    result: 'Loss',
    score: '180/10 (42) vs 185/6 (38.5)',
    nrr: -0.12,
    type: 'T10'
  },
  {
    id: 3,
    opponent: 'SLIIT',
    date: '2024-01-02',
    result: 'Draw',
    score: '220/8 (50) vs 220/9 (50)',
    nrr: 0.0,
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

// Sample injury data
const sampleInjuries = [
  {
    id: 1,
    playerName: 'Monil Jason',
    injuryType: 'Ankle Sprain',
    dateReported: '2024-01-10',
    recoveryDays: 14,
    status: 'Recovering'
  },
  {
    id: 2,
    playerName: 'Dulaj Bandara',
    injuryType: 'Shoulder Strain',
    dateReported: '2024-01-08',
    recoveryDays: 21,
    status: 'Recovering'
  },
  {
    id: 3,
    playerName: 'Suviru Sathnidu',
    injuryType: 'Knee Injury',
    dateReported: '2024-01-05',
    recoveryDays: 30,
    status: 'Recovering'
  }
];

const tabs = [
  { id: 'home', name: 'Home', icon: Trophy },
  { id: 'team-performance', name: 'Team Performance', icon: BarChart3 },
  { id: 'player-fitness', name: 'Player Fitness', icon: Heart },
  { id: 'player-analytics', name: 'Player Analytics', icon: Target },
  { id: 'training-attendance', name: 'Training Attendance', icon: Users }
];

const base_url = "http://localhost:8080/unicricket360";

const MICDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState('all');
  const [dateRange, setDateRange] = useState('30days');
  const [injuryData, setInjuryData] = useState([]);
  const [injuries, setInjuries] = useState([]);

  const [matches, setMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [nRRData, setNRRData] = useState({});
  const [winLossRatioData, setWinLossRatioData] = useState({});
  const [playerCount, setPlayerCount] = useState({});
  const [injuredCount, setInjuredCount] = useState({});
  const [clubEvents, setClubEvents] = useState([]);

  const [winLossPieChartData, setWinLossPieChartData] = useState([
    { name: 'Win', value: 8, color: '#10B981' },
    { name: 'Loss', value: 4, color: '#EF4444' },
    { name: 'Draw', value: 2, color: '#6B7280' },
    { name: 'Tie', value: 1, color: '#3B82F6' }
  ]);

  const [topBatters, setTopBatters] = useState([]);
  const [topBowlers, setTopBowlers] = useState([]);
  const [topFielders, setTopFielders] = useState([]);

  const [fitnessData, setFitnessData] = useState([]);
  const [allPerformanceData, setAllPerformanceData] = useState([]);
  const [allAttendance, setAllAttendance] = useState([]);
  const [playerPerformanceData, setPlayerPerformanceData] = useState([]);
  const [attendancePieChartData, setAttendancePieChartData] = useState([]);
  const [allSessions, setAllSessions] = useState([]);
  const [allSessionsWithAttendance, setAllSessionsWithAttendance] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);

  const [teamData, setTeamData] = useState({
    name: 'NSBM Cricket Club',
    season: '2025',
    winLoss: { wins: 8, losses: 4, draws: 1, total: 13 },
    netRunRate: 0.45,
    totalPlayers: 25,
    activePlayers: 22,
    injuredPlayers: 3
  });

  // Event carousel state
  const [eventIndex, setEventIndex] = useState(0);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    // setInjuries(sampleInjuries);
    
    getClubEvents();
    getAllInjuries();
    getAllMatches();
    getNetRunRate();
    getWinLossRatioData();
    getPlayersCount();

    getTopBatters();
    getTopBowlers();
    getTopFielders();

    getAllPlayersAllPerformanceDetails();
    getAllFitnessData();
    getAllAttendance();
    getAllSessionsWithAttendance();

  }, []);

  // Auto-advance events
  useEffect(() => {
    const id = setInterval(() => {
      // setEventIndex((prev) => (prev + 1) % sampleEvents.length);
      setEventIndex((prev) => (prev + 1) % clubEvents.length);
    }, 5000);
    return () => clearInterval(id);
  }, [clubEvents.length]);

  useEffect(()=>{

    if(allPerformanceData != [] && allAttendance != [] && fitnessData != []){
      mergeAttendanceAndFitnessWithPerformanceData();

    }

  }, [fitnessData, allAttendance, allPerformanceData])

  const getResultColor = (result) => {
    switch (result) {
      case 'WIN': return 'bg-green-100 text-green-800 border-green-200';
      case 'LOSS': return 'bg-red-100 text-red-800 border-red-200';
      case 'DRAW': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };


  //--------- API Calls -----------------

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
          const recentRaw = res.data.data
          .filter((match) => match.status === "COMPLETED")
          .sort(
            (a, b) => new Date(b.date_time) - new Date(a.date_time) // latest first
          )
          .slice(0, 3); // take only last 3

          // enrich recent matches with NRR
          // const recentWithNRR = await Promise.all(
          //   recentRaw.map(async (match) => {
          //     const teamNRR = await getNetRunRate(match.team.id); // assuming "team" is your side
          //     const opponentNRR = await getNetRunRate(match.opponent.id);

          //     console.log(teamNRR);
          //     console.log(opponentNRR);

          //     return {
          //       ...match,
          //       teamNRR,
          //       opponentNRR,
          //     };
          //   })
          // );

          // console.log(recentWithNRR);
          // setRecentMatches(recentWithNRR);

          setRecentMatches(recentRaw);

        } else {
          alert(res.data.message)
          setMatches([]);
          setUpcomingMatches([]);
          setRecentMatches([]);
        }
      } else {
        console.error("Failed to fetch matches");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching matches: ", error);
    }
  };

  const getNetRunRate = async (teamId) => {
    try {
      const res = await PerformanceService.getNetRunRate(5);
      console.log(res);

      if (res.status === 200) {
        console.log(res.data.data);
        setNRRData(res.data.data);
        setTeamData((prev)=>({
          ...prev,
          netRunRate: res.data.data.netRunRate,
        }));
        return res.data.data.netRunRate;
      } else {
        console.log("Failed to fetch NRR data");
        console.log(res.data.message)
        setNRRData({}); 
      }
    } catch (error) {
      console.error("Error fetching NNR data:", error);
    }

    return 0.00;
  };

  const getWinLossRatioData = async () => {
    try {
      const res = await PerformanceService.getWinLossRatioData();
      console.log(res);

      if (res.status === 200) {
        console.log(res.data.data);
        setWinLossRatioData(res.data.data); 
        updateWinLossData(res.data.data);
        
       
      } else {
        console.log("Failed to fetch Win/LossRR data");
        alert(res.data.message)
        setWinLossRatioData({});
      }
    } catch (error) {
      console.error("Error fetching Win/Loss data:", error);
    }
  };

  const getPlayersCount = async () => {
    let res = await PlayerService.getCount();
    console.log(res);

    if (res.status == 200) {
      if (res.data.data != 0) {
        console.log(res.data.data);
        setTeamData((prev)=>({
          ...prev,
          totalPlayers: res.data.data
        }));
        setPlayerCount(res.data.data);
      }
    }
  };

  const getAllInjuries = async() => {
    try {
      let res = await InjuryService.getAll();
      console.log(res);
      
      if (res.status === 200) {
        console.log(res.data.data)
        setInjuryData(res.data.data);
        // setInjuries(sampleInjuries)
        // setInjuredCount(res.data.data.length);
        setTeamData((prev)=>({
          ...prev,
          injuredPlayers: res.data.data.length,
          activePlayers: prev.totalPlayers - res.data.data.length,
        }));
        
      } else {
        alert(res.data.message)
        setInjuryData([]);
      }
    } catch (err) {
      console.error("Error fetching injury data:", err);
    }
  }

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

  const getAllFitnessData = async() => {
    try {

      let res = await FitnessService.getAll();
      console.log(res);
      
      if (res.status === 200) {
        const normalized = normalizeFitnessData(res.data.data);
        console.log(normalized)
        setFitnessData(normalized);
        
      } else {
        alert(res.data.message)
      }
    } catch (err) {
      console.error("Error fetching fitness data:", err);
    }
  }

  const getAllPlayersAllPerformanceDetails = async() => {
    try {
      const res = await PerformanceService.getAllPerformanceData();
      console.log(res);

      if (res.status === 200) {
        // Check if data exists
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data.data);
          console.log(fitnessData);
          console.log(allAttendance);
          // const data = mergeAttendanceAndFitnessWithPerformanceData(res.data.data);
          // console.log(data);
          setAllPerformanceData(res.data.data);


        } else {
          alert(res.data.message)
          setAllPerformanceData([]);
        }
      } else {
        console.error("Failed to fetch performance details");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching performance details: ", error);
    }
  }

  const getAllAttendance = async() => {
    try {
      const res = await AttendanceService.getAllAttendance();
      console.log(res);

      if (res.status === 200) {
        // Check if data exists
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data.data);
          setAllAttendance(res.data.data); 
          getAttendancePieData(res.data.data);
        } else {
          alert(res.data.message)
          setAllAttendance([]); 
        }
      } else {
        console.error("Failed to fetch attedance details of players");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching attedance details of players: ", error);
    }
  }

  const getAllSessionsWithAttendance = async() => {
    try {
      const res = await SessionService.getAllSessionsWithAttendance();
      console.log(res);

      if (res.status === 200) {
        // Check if data exists
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data.data);
          setAllSessionsWithAttendance(res.data.data); 
          // appendSessionAttendance(res.data.data);

          // filter recent matches (last 3 completed)
          const recent = res.data.data
          .filter((session) => session.status === "COMPLETED")
          .sort(
            (a, b) => new Date(b.date_time) - new Date(a.date_time) // latest first
          )
          .slice(0, 3);

          const appendedSessions = appendSessionAttendance(recent);
          setRecentSessions(appendedSessions);

        } else {
          alert(res.data.message)
          setAllSessionsWithAttendance([]); 
        }
      } else {
        console.error("Failed to fetch attedance details of players");
        alert(res.response.data.message)
      }
    } catch (error) {
      console.error("Error fetching attedance details of players: ", error);
    }
  }

  // ------ HELPER methods --------

  const updateWinLossData = (data) => {
    setWinLossPieChartData([
      { name: 'Win', value: data.win_count, color: '#10B981' },
      { name: 'Loss', value: data.loss_count, color: '#EF4444' },
      { name: 'Draw', value: data.draw_count, color: '#6B7280' },
      { name: 'Tie', value: data.tie_count, color: '#3B82F6' } // optional if you want ties
    ]);
  };
  
  const normalizeFitnessData = (data) => {
    return data.map(item => ({
      fitness_id: item.id,
      player_id: item.player.id,
      name: item.player.name,
      email: item.player.email,
      image_url: item.player.image_url,
      player_role: item.player.player_role,
      date: item.date,
      sprint_time: item.sprint_time,
      beep_level: item.beep_level,
      status: item.status,
    }));
  };
  
  const filteredFitnessData = selectedPlayer === "all" 
  ? fitnessData 
  : fitnessData.filter(player => player.player_id === parseInt(selectedPlayer));

  const mergeAttendanceAndFitnessWithPerformanceData = () => {
    console.log("--------inside--------");
    console.log(allPerformanceData);
    console.log(allAttendance);
    console.log(fitnessData);
  
    const combinedData = allPerformanceData.map((perf) => {

      const fitness = fitnessData.find((fit) => fit.player_id === perf.player_id);
      console.log(fitness);
      
      // Calculate attendance percentage
      const attendancePercentage = calculateAttendance(allAttendance, perf.player_id);
      console.log(attendancePercentage);

      return {
        ...perf, // performance fields
        fitness: fitness
          ? {
              sprint_time: fitness.sprint_time,
              beep_level: fitness.beep_level,
              status: fitness.status,
              date: fitness.date,
            }
          : null,
        attendance_percentage: attendancePercentage, // new field
      };
    });
    
    console.log(combinedData);
    setPlayerPerformanceData(combinedData);
  }

  const calculateAttendance = (attendance, playerId) => {
    const playerRecords = attendance.filter((a) => a.player.id === playerId);
    if (playerRecords.length === 0) return 0; // no records -> 0%
  
    const presentCount = playerRecords.filter((a) => a.status === "PRESENT").length;
    return ((presentCount / playerRecords.length) * 100).toFixed(2); // return percentage
  };

  const getAttendancePieData = (attendance) => {
    if (!attendance || attendance.length === 0) {
      return [
        { name: 'Present', value: 0, color: '#10B981' },
        { name: 'Absent', value: 0, color: '#EF4444' }
      ];
    }
  
    const total = attendance.length;
    const presentCount = attendance.filter(a => a.status === "PRESENT").length;
    const absentCount = total - presentCount;
  
    const presentPercentage = ((presentCount / total) * 100).toFixed(2);
    const absentPercentage = ((absentCount / total) * 100).toFixed(2);

    setAttendancePieChartData([
      { name: 'Present', value: Number(presentPercentage), color: '#10B981' },
      { name: 'Absent', value: Number(absentPercentage), color: '#EF4444' }
    ]);
  
    // return [
    //   { name: 'Present', value: Number(presentPercentage), color: '#10B981' },
    //   { name: 'Absent', value: Number(absentPercentage), color: '#EF4444' }
    // ];
  };

  const appendSessionAttendance = (sessions) => {
    const appendedSessions = sessions.map(session => {
      const total = session.attendance.length;
      const present = session.attendance.filter(a => a.status === "PRESENT").length;
      const absent = total - present;
      const attendancePercentage = ((present / total) * 100).toFixed(2);
  
      return {
        ...session,
        totalPlayers: total,
        present,
        absent,
        attendancePercentage: Number(attendancePercentage)
      };
    });

    console.log(appendedSessions);
    return appendedSessions;
  };
  

  // --------- Handler mehods ---------------

  const handleLogout = () => {
    localStorage.removeItem('user_role');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    navigate('/');
  };

  // Event navigation functions
  const nextEvent = () => setEventIndex((prev) => (prev + 1) % clubEvents.length);
  const prevEvent = () => setEventIndex((prev) => (prev - 1 + clubEvents.length) % clubEvents.length);

  const getFitnessStatusColor = (status) => {
    switch (status) {
      case 'FIT': return 'text-green-600';
      case 'RECOVERING': return 'text-yellow-600';
      case 'REST': return 'text-blue-600';
      case 'INJURED': return 'text-red-600';
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.backgroundSecondary }}>
      {/* Header */}
      <header className="shadow-sm border-b" style={{ backgroundColor: colors.backgroundPrimary, borderColor: colors.borderLight }}>
        <div className="w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div>
                <img src="/images/logoNSBM.jpg" alt="NSBM Cricket Club" className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full ring-2 ring-white/30 shadow-lg" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-lg lg:text-xl font-semibold truncate" style={{color: colors.textPrimary}}>MIC Dashboard</h1>
                <p className="text-xs sm:text-sm truncate" style={{color: colors.textSecondary}}>{teamData.name} • {teamData.season} Season</p>
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
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden lg:inline">Export CSV</span>
                <span className="lg:hidden">CSV</span>
              </button>
              <button
                onClick={exportToPDF}
                className="hidden sm:inline-flex items-center px-2 sm:px-3 py-1.5 sm:py-2 text-white rounded-lg text-xs sm:text-sm font-medium hover:opacity-90"
                style={{backgroundColor: nsbmGreen}}
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
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
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
                  className={`py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm flex items-center whitespace-nowrap ${
                    activeTab === tab.id ? 'text-gray-900 font-bold' : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{
                    borderBottomColor: activeTab === tab.id ? nsbmGreen : 'transparent',
                    backgroundColor: activeTab === tab.id ? getNsbmGreen(0.08) : 'transparent'
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
            {/* Team Overview */}
            <div className="rounded-xl p-4 sm:p-6 text-white" style={{background: `linear-gradient(135deg, #0A0E27 0%, #1A1A2E 35%, ${nsbmGreen} 100%)`}}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                    {teamData.name} - Season {teamData.season}
                  </h2>
                  <p className="text-sm sm:text-base text-white/80">
                    NRR: {Number(nRRData.netRunRate).toFixed(2)}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  {/* <div className="text-2xl sm:text-3xl font-bold">{teamData.winLoss.wins}-{teamData.winLoss.losses}-{teamData.winLoss.draws}</div> */}
                  <div className="text-2xl sm:text-3xl font-bold">{winLossRatioData.win_count}-{winLossRatioData.loss_count}-{winLossRatioData.draw_count}</div>
                  <div className="text-xs sm:text-sm text-white/80">Win-Loss-Draw</div>
                </div>
              </div>
            </div>

            {/* Club Events */}
            <div className="rounded-xl shadow-sm border p-4 sm:p-6" style={{ backgroundColor: colors.backgroundPrimary, borderColor: colors.borderLight, boxShadow: shadows.sm }}>
            {clubEvents.length > 0 && clubEvents[eventIndex] && (
              <>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: nsbmGreen }} />
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold" style={{ color: colors.textPrimary }}>Club Events</h3>
                  </div>
                  <div className="flex space-x-1">
                    <button onClick={prevEvent} className="p-1 rounded-full hover:bg-gray-100" aria-label="Previous event">
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                    <button onClick={nextEvent} className="p-1 rounded-full hover:bg-gray-100" aria-label="Next event">
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-48 sm:h-64 lg:h-80">
                    <img 
                      // src={clubEvents[eventIndex].image}
                      src={`${base_url}${clubEvents[eventIndex].image_url}`} 
                      alt={clubEvents[eventIndex].event_title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                      <div className="p-3 sm:p-4 text-white w-full">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">{clubEvents[eventIndex].event_title}</h4>
                            <div className="flex items-center space-x-2 text-sm sm:text-base">
                              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span>{new Date(clubEvents[eventIndex].date_time).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {clubEvents[eventIndex].is_featured && (
                      <div className="absolute top-2 right-2">
                        <span className="text-white text-xs px-2 py-1 rounded-full" style={{backgroundColor: nsbmGold}}>
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
              
              <div className="flex justify-center mt-3 space-x-1">
                {clubEvents.map((_, i) => (
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
                {/* <div className="text-3xl font-bold text-gray-900">{teamData.activePlayers}</div> */}
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
                  {/* {Math.round((teamData.winLoss.wins / teamData.winLoss.total) * 100)}% */}
                  {Number(winLossRatioData.winLossRatio).toFixed(2)}%
                </div>
                <div className="text-sm text-gray-500">This season</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Net Run Rate</h3>
                </div>
                {/* <div className="text-3xl font-bold text-gray-900">{teamData.netRunRate}</div> */}
                <div className="text-3xl font-bold text-gray-900">{Number(teamData.netRunRate).toFixed(2)}</div>
                <div className="text-sm text-gray-500">Current NRR</div>
              </div>
            </div>

            {/* Recent & Upcoming Matches Side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Matches */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="w-5 h-5" style={{color: nsbmBlue}} />
                  <h3 className="text-lg font-semibold text-gray-900">Recent Matches</h3>
                </div>
                <div className="space-y-4">
                  {recentMatches.map((match) => (
                    <div key={match.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-gray-900">vs {match.opponent.team_name}</h4>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                            {match.match_type}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getResultColor(match.result)}`}>
                            {match.result}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{match.score}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(match.date_time).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="w-3 h-3" />
                            {/* <span>NRR: {match.nrr}</span> */}
                          </div>
                        </div>
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
                        <h4 className="font-medium text-gray-900">vs {match.opponent.team_name}</h4>
                        <span className="text-xs px-2 py-1 rounded-full" style={{backgroundColor: getNsbmBlue(0.1), color: nsbmBlue}}>
                          {match.match_type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(match.date_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span className="font-medium">{new Date(match.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
        )}

        {/* Team Performance Tab */}
        {activeTab === 'team-performance' && (
          <div className="space-y-6">

            {/* Top Performers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: cardBackground, borderColor: lightBorder }}>
                <div className="flex items-center space-x-2 mb-4">
                  <Trophy className="w-5 h-5" style={{ color: accentBlue }} />
                  <h3 className="text-lg font-semibold" style={{ color: textPrimary }}>Top 5 Batsmen</h3>
                </div>
                <div className="space-y-3">
                  {/* {getTopBatsmen(players).map((player, index) => ( */}
                  {topBatters.map((player, index) => (
                    <div key={player.player_id} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: cardBackgroundAlt }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: `linear-gradient(135deg, ${accentBlue}, ${accentGreen})` }}>
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={`${base_url}${player.image_url}`}
                          alt={player.player_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ color: textPrimary }}>{player.player_name}</p>
                        <p className="text-sm" style={{ color: textSecondary }}>{player.total_runs} runs • {player.batting_average != null ? Number(player.batting_average).toFixed(2) : "0.00"} avg</p>
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
                  {topBowlers.map((player, index) => (
                    <div key={player.player_id} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: cardBackgroundAlt }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: `linear-gradient(135deg, ${errorRed}, #FF6B35)` }}>
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          // src={player.photo} 
                          src={`${base_url}${player.image_url}`}
                          alt={player.player_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ color: textPrimary }}>{player.player_name}</p>
                        <p className="text-sm" style={{ color: textSecondary }}>{player.total_wickets} wickets • {player.batting_average != null ? Number(player.bowling_average).toFixed(2) : "0.00"} avg</p>
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
                  {topFielders.map((player, index) => (
                    <div key={player.id} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: cardBackgroundAlt }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: `linear-gradient(135deg, ${accentGreen}, ${accentBlue})` }}>
                        {index + 1}
                      </div>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={`${base_url}${player.image_url}`}
                          alt={player.player_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ color: textPrimary }}>{player.player_name}</p>
                        <p className="text-sm" style={{ color: textSecondary }}>{player.total_catches} catches • {player.total_run_outs} run-outs</p>
                        <p className="text-sm" style={{ color: textSecondary }}>{player.total_dismissals} dismissals</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Win/Loss Gauge */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Win/Loss Record</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={winLossPieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {winLossPieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {winLossPieChartData.map((item) => (
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

              {/* NRR Trend */}
              {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
              </div> */}
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
                    {fitnessData.map(player => (
                      <option key={player.player_id} value={player.player_id}>{player.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFitnessData.map((player) => (
                  <div key={player.player_id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={`${base_url}${player.image_url}`}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{player.name}</p>
                        <p className="text-sm text-gray-500">{player.player_role}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Sprint 20m:</span>
                        <span className="font-medium">{player.sprint_time}s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Beep Test:</span>
                        <span className="font-medium">{player.beep_level}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${getFitnessStatusColor(player.status)}`}>
                          {player.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fitness Trends */}
            {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
            </div> */}

            {/* Injury Management Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Injury Management</h3>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-600">{injuries.length} Active Injuries</span>
                </div>
              </div>

              {injuryData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {injuryData?.map((injury) => (
                    <div key={injury.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          {/* <h4 className="font-medium text-gray-900">{injury.playerName}</h4> */}
                          <h4 className="font-medium text-gray-900">{injury.player.name}</h4>
                          {/* <p className="text-sm text-gray-500">{injury.injuryType}</p> */}
                          <p className="text-sm text-gray-500">{injury.injury_type}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Date Reported:</span>
                          {/* <span className="font-medium">{new Date(injury.dateReported).toLocaleDateString()}</span> */}
                          <span className="font-medium">{new Date(injury.date_reported).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Recovery Days:</span>
                          {/* <span className="font-medium">{injury.recoveryDays} days</span> */}
                          <span className="font-medium">{injury.recovery_days} days</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            injury.status === 'RECOVERING' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : injury.status === 'RECOVERED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {injury.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Injuries</h3>
                  <p className="text-gray-500">All players are currently injury-free.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Player Analytics Tab */}
        {activeTab === 'player-analytics' && (
          <div className="space-y-6">
            {/* Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {playerPerformanceData.map((player) => (
                <div
                  key={player.player_id}
                  className="rounded-xl border p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                  style={{ borderColor: colors.borderLight }}
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-full overflow-hidden ring-2" style={{ borderColor: 'transparent', boxShadow: shadows.sm }}>
                        <img
                          src={`${base_url}${player.image_url}`}
                          alt={player.player_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold" style={{ color: colors.textPrimary }}>{player.player_name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: getNsbmGreen(0.1), color: nsbmGreen }}>
                          {player.role}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs" style={{ color: colors.textSecondary }}>Season runs</p>
                      {/* <p className="text-lg font-bold" style={{ color: colors.textPrimary }}>{player.batting.runs}</p> */}
                      <p className="text-lg font-bold" style={{ color: colors.textPrimary }}>{player.total_runs}</p>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg p-3" style={{ backgroundColor: colors.backgroundSecondary }}>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>Bat Avg</p>
                      <p className="text-lg font-semibold" style={{ color: colors.textPrimary }}>{Number(player.batting_average).toFixed(2)}</p>
                      {/* <p className="text-xs" style={{ color: colors.textTertiary }}>SR {player.batting.strikeRate}</p> */}
                      <p className="text-xs" style={{ color: colors.textTertiary }}>SR {Number(player.avg_strike_rate).toFixed(2)}</p>
                    </div>
                    <div className="rounded-lg p-3" style={{ backgroundColor: colors.backgroundSecondary }}>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>Wickets</p>
                      <p className="text-lg font-semibold" style={{ color: colors.textPrimary }}>{player.total_wickets}</p>
                      {/* <p className="text-xs" style={{ color: colors.textTertiary }}>Avg {player.bowling.average}</p> */}
                      <p className="text-xs" style={{ color: colors.textTertiary }}>Avg {Number(player.bowling_average).toFixed(2)}</p>
                    </div>
                    <div className="rounded-lg p-3" style={{ backgroundColor: colors.backgroundSecondary }}>
                      <p className="text-xs" style={{ color: colors.textSecondary }}>Fielding</p>
                      {/* <p className="text-lg font-semibold" style={{ color: colors.textPrimary }}>{player.fielding.catches + player.fielding.runOuts}</p> */}
                      <p className="text-lg font-semibold" style={{ color: colors.textPrimary }}>{player.total_dismissals}</p>
                      {/* <p className="text-xs" style={{ color: colors.textTertiary }}>C {player.fielding.catches} • RO {player.fielding.runOuts}</p> */}
                      <p className="text-xs" style={{ color: colors.textTertiary }}>C {player.total_catches} • RO {player.total_run_outs}</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-semibold">
                      <span style={{ color: colors.textSecondary }}>Fitness: </span>
                      <span style={{ 
                        color: player.fitness.status === 'FIT' ? '#10B981' : 
                               player.fitness.status === 'RECOVERING' ? '#F59E0B' : 
                               player.fitness.status === 'REST' ? '#3498db' : 
                               '#EF4444'
                      }}>
                        {player.fitness.status}
                      </span>
                    </div>
                    <div className="text-sm" style={{ color: colors.textSecondary }}>Attendance: {player.attendance_percentage}%</div>
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
                      // data={attendanceData}
                      data={attendancePieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendancePieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {attendancePieChartData.map((item) => (
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
                  {recentSessions?.map((session) => (
                    <div key={session.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{session.title}</h4>
                        {/* <span className="text-sm font-medium text-gray-600">{session.percentage}%</span> */}
                        <span className="text-sm font-medium text-gray-600">{Number(session.attendancePercentage).toFixed(2)}%</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(session.date_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          {/* <span>{session.attendance}/{session.totalPlayers}</span> */}
                          <span>Players: {session.totalPlayers}</span>
                        </div>
                      </div>
                      {/* <div className="mt-2 text-sm text-gray-500">
                        Coach: {session.coach}
                      </div> */}
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
                    {playerPerformanceData.map((player) => (
                      <tr key={player.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={`${base_url}${player.image_url}`}
                                alt={player.player_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{player.player_name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" style={{backgroundColor: getNsbmBlue(0.1), color: nsbmBlue}}>
                            {player.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{player.attendance_percentage}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            player.attendance_percentage >= 90 ? 'bg-green-100 text-green-800' :
                            player.attendance_percentage >= 75 ? 'bg-yellow-100 text-yellow-800' :
                            player.attendance_percentage >= 65 ? 'bg-yellow-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {
                              player.attendance_percentage >= 90 ? 'Excellent' :
                              player.attendance_percentage >= 75 ? 'Good' :
                              player.attendance_percentage >= 65 ? 'Needs Improvement' : 'Weak'
                            }
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
