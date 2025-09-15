import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Save, 
  Upload, 
  Download, 
  Trophy,
  Target,
  Users,
  Calendar,
  MapPin,
  X
} from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
import { NSBM_DESIGN_SYSTEM, getBrandColor } from '../../styles/nsbm-design-system';
import PlayerService from '../../services/PlayerService';
import TeamService from '../../services/TeamService';
import MatchService from '../../services/MatchService';

const samplePlayers = [
  { id: 1, name: 'Monil Jason', role: 'Batsman' },
  { id: 2, name: 'Dulaj Bandara', role: 'All-rounder' },
  { id: 3, name: 'Suviru Sathnidu', role: 'Bowler' },
  { id: 4, name: 'Lahiru Abhesinghe', role: 'Batsman' },
  { id: 5, name: 'Asitha Wanninayake', role: 'Bowler' }
];

// NSBM Brand Colors from Design System
const { colors } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;

// Helper functions for colors with opacity
const getNsbmGreen = (opacity = 1) => getBrandColor('brandPrimary', opacity);

const MatchDataEntry = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const matchEntry = location.state?.match;

  console.log("Selected match:", matchEntry);
  
  // const [matchData, setMatchData] = useState([]);
  const [activeTab, setActiveTab] = useState('batting');
  const [matchData, setMatchData] = useState({
    matchId: '',
    opponent: {id:0},
    date_time: '',
    venue: '',
    match_type: '',
    result: '',
    nsbmScore: '',
    nsbmWickets: '',
    nsbmOvers: '',
    score: '',
    opponentScore: '',
    opponentWickets: '',
    opponentOvers: '',
    opponent_score: '',
    overs_per_inning: '',
    toss: '',
    decision: '',
    scheduled_by: {
      id: parseInt(localStorage.getItem('user_id'), 10)
    },
    status: "COMPLETED"
  });
  const [inningData, setInningData] = useState({
    batting_team: {
        id: 1
    },
    runs: 0,
    wickets: 0,
    balls: 0
  });
  const [battingData, setBattingData] = useState([]);
  const [bowlingData, setBowlingData] = useState([]);
  const [fieldingData, setFieldingData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [opponents, setOpponents] = useState([]);

  const [matches, setMatches] = useState([]); // all matches fetched from BE
  const [filteredMatches, setFilteredMatches] = useState([]); // filtered results
  // const [searchFilters, setSearchFilters] = useState({
  //   opponent: {id:0},
  //   date_time: '',
  //   venue: '',
  //   match_type: ''
  // });

  useEffect(() => {
    populateMatchDataEntryFields();
    getAllPlayers();
    getAllMatches();
    fetchOpponents();
  }, []);

  /* useEffect(() => {
    if (filteredMatches.length === 1) {
      const match = filteredMatches[0];
  
      // Split date_time into date and time
      let date = '';
      let time = '';
      if (match.date_time) {
        date = match.date_time.split('T')[0]; // "2025-09-10"
        time = match.date_time.split('T')[1].slice(0,5); // HH:MM 
      }

      // Split NSBM Score
      let nsbmScore = '';
      let nsbmWickets = '';
      let nsbmOvers = '';
      if(match.score) {
        nsbmScore = match.score.split("/")[0];
        nsbmWickets = match.score.split("/")[1];
        nsbmOvers = match.score.split("/")[2];
      }

      // Split Opponent Score
      let opponentScore = '';
      let opponentWickets = '';
      let opponentOvers = '';
      if(match.opponent_score) {
        opponentScore = match.opponent_score.split("/")[0];
        opponentWickets = match.opponent_score.split("/")[1];
        opponentOvers = match.opponent_score.split("/")[2];
      }
    
  
      setMatchData(prev => ({
        ...prev,
        ...match,
        date: date, // for <input type="date">
        time: time, // for <input type="time">
        date_time: date,
        match_type: match.match_type?.toUpperCase() || '', // normalize casing for select
        result: match.result?.toUpperCase() || '',
        nsbmScore: nsbmScore,
        nsbmWickets: nsbmWickets,
        nsbmOvers: nsbmOvers,
        score: match.score,
        opponentScore: opponentScore,
        opponentWickets: opponentWickets,
        opponentOvers: opponentOvers,
        opponent_score: match.opponent_score,
        overs_per_inning: match.overs_per_inning,
        toss: '',
        decision: '',
        scheduled_by: {
          id: parseInt(localStorage.getItem('user_id'), 10)
        },
        status: match.status.toUpperCase()
      }));

      console.log("Form populated with filtered match:", match);
    } else {
      // clearFields();
    }
  }, [matchData, filteredMatches]); */
  

  /* useEffect(() => {
    let filtered = matches;
  
    // Filter by opponent name
    if (matchData.opponent?.team_name) {
      filtered = filtered.filter(match =>
        match.opponent?.name?.toLowerCase().includes(matchData.opponent.team_name.toLowerCase())
      );
    }

    // Filter by date
    if (matchData.date_time) {
      filtered = filtered.filter(match =>
        match.date_time.startsWith(matchData.date_time) // assumes date in YYYY-MM-DD
      );
    }

    // Filter by venue
    if (matchData.venue) {
      filtered = filtered.filter(match =>
        match.venue?.toLowerCase().includes(matchData.venue.toLowerCase())
      );
    }
  
    // Filter by match_type
    if (matchData.match_type) {
      filtered = filtered.filter(match =>
        match.match_type?.toUpperCase() === matchData.match_type.toUpperCase()
      );
    }

    setFilteredMatches(filtered);
  }, [matches, matchData]); */


  useEffect(() => {
    const inning = calculateInningData(battingData, bowlingData);
    setInningData(prev => ({
      ...prev,
      runs: inning.runs,
      wickets: inning.wickets,
      balls: inning.balls
    }));
  }, [battingData, bowlingData]);

  const populateMatchDataEntryFields = () => {
    if(matchEntry) {
      // Split date_time into date and time
      let date = '';
      let time = '';
      if (matchEntry.date_time) {
        date = matchEntry.date_time.split('T')[0]; // "2025-09-10"
        time = matchEntry.date_time.split('T')[1].slice(0,5); // HH:MM 
      }

      // Split NSBM Score
      let nsbmScore = '';
      let nsbmWickets = '';
      let nsbmOvers = '';
      if(matchEntry.score) {
        nsbmScore = matchEntry.score.split("/")[0];
        nsbmWickets = matchEntry.score.split("/")[1];
        nsbmOvers = matchEntry.score.split("/")[2];
      }

      // Split Opponent Score
      let opponentScore = '';
      let opponentWickets = '';
      let opponentOvers = '';
      if(matchEntry.opponent_score) {
        opponentScore = matchEntry.opponent_score.split("/")[0];
        opponentWickets = matchEntry.opponent_score.split("/")[1];
        opponentOvers = matchEntry.opponent_score.split("/")[2];
      }

      setMatchData(prev => ({
        ...prev,
        ...matchEntry,
        date: date, // for <input type="date">
        time: time, // for <input type="time">
        date_time: date,
        match_type: matchEntry.match_type?.toUpperCase() || '', // normalize casing for select
        result: matchEntry.result?.toUpperCase() || '',
        nsbmScore: nsbmScore,
        nsbmWickets: nsbmWickets,
        nsbmOvers: nsbmOvers,
        score: matchEntry.score,
        opponentScore: opponentScore,
        opponentWickets: opponentWickets,
        opponentOvers: opponentOvers,
        opponent_score: matchEntry.opponent_score,
        overs_per_inning: matchEntry.overs_per_inning,
        toss: '',
        decision: '',
        scheduled_by: {
          id: parseInt(localStorage.getItem('user_id'), 10)
        },
        status: matchEntry.status.toUpperCase()
      }));
      console.log("Form populated with selected match entry :", matchData);
    } else {
      // clearFields();
    }
  }

  const getAllPlayers = async () => {
    try {
      let res = await PlayerService.getAll();
      console.log(res);

    if (res.status == 200) {
      if (res.data.data != 0) {
        console.log(res.data.data);
        setPlayers(res.data.data);
      }
    }
    } catch (err) {
      console.error("Error fetching players:", err);
    }
  };

  const getAllMatches = async () => {
    let res = await MatchService.getAll();
    console.log(res);

    if (res.status == 200) {
      if (res.data.data != 0) {
        console.log(res.data.data);
        setMatches(res.data.data);
        setFilteredMatches(res.data.data);
      }
    }

    console.log(filteredMatches);
  };

  const fetchOpponents = async () => {
    try {

      let res = await TeamService.getAll();
      console.log(res);
      
      if (res.status === 200) {
        setOpponents(res.data.data); // assuming your API returns {data: [...]}
      }
    } catch (err) {
      console.error("Error fetching opponents:", err);
    }
  };

 /*  const handleFilterChange = (field, value) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }));
  }; */

  const handleMatchDataChange = (field, value) => {
    let newValue = value;

    /* if (field === "date_time") {
      // Ensure time is appended only if not already included
      if (!value.includes("T")) {
        newValue = value + "T00:00:00";
      }
    } */

    setMatchData(prev => ({
      ...prev,
      [field]: newValue
    }));
  };

  const addBattingEntry = () => {
    const newEntry = {
      id: Date.now(),
      player_id: '',
      playerName: '',
      runs: 0,
      balls_faced: 0,
      fours: 0,
      sixes: 0,
      strike_rate: 0,
      dismissal_type: '',
      fielder: '',
      bowler: ''
    };
    setBattingData(prev => [...prev, newEntry]);
  };

  const addBowlingEntry = () => {
    const newEntry = {
      id: Date.now(),
      player_id: '',
      playerName: '',
      overs: 0,
      maidens: 0,
      runs_conceded: 0,
      wickets: 0,
      economy: 0,
      // wides: 0,
      // noBalls: 0
    };
    setBowlingData(prev => [...prev, newEntry]);
  };

  const addFieldingEntry = () => {
    const newEntry = {
      id: Date.now(),
      player_id: '',
      playerName: '',
      catches: 0,
      stumpings: 0,
      assisted_run_outs: 0,
      direct_run_outs: 0
    };
    setFieldingData(prev => [...prev, newEntry]);
  };


  const calculateInningData = (battingData, bowlingData) => {
    // Runs = total runs scored by all batsmen
    const totalRuns = battingData.reduce((sum, entry) => sum + (entry.runs || 0), 0);
  
    // Wickets = number of batsmen dismissed (dismissal_type !== "NOTOUT" or "Select")
    const totalWickets = battingData.filter(
      entry => entry.dismissal_type && entry.dismissal_type !== "NOTOUT" && entry.dismissal_type !== "Select"
    ).length;
  
    // Balls = total balls faced by batsmen
    const totalBalls = battingData.reduce((sum, entry) => sum + (entry.balls_faced || 0), 0);
  
    return {
      runs: totalRuns,
      wickets: totalWickets,
      balls: totalBalls
    };
  };
  

  const updateBattingEntry = (id, field, value) => {
    setBattingData(prev => prev.map(entry => {
      if (entry.id === id) {
        const updated = { ...entry, [field]: value };
        if (field === 'runs' || field === 'balls_faced') {
          updated.strike_rate = updated.balls_faced > 0 ? ((updated.runs / updated.balls_faced) * 100).toFixed(2) : 0;
        }
        return updated;
      }
      return entry;
    }));
  };

  const updateBowlingEntry = (id, field, value) => {
    setBowlingData(prev => prev.map(entry => {
      if (entry.id === id) {
        const updated = { ...entry, [field]: value };
        if (field === 'runs_conceded' || field === 'overs') {
          updated.economy = updated.overs > 0 ? (updated.runs_conceded / updated.overs).toFixed(2) : 0;
        }
        return updated;
      }
      return entry;
    }));
  };

  const updateFieldingEntry = (id, field, value) => {
    setFieldingData(prev => prev.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const removeEntry = (type, id) => {
    switch (type) {
      case 'batting':
        setBattingData(prev => prev.filter(entry => entry.id !== id));
        break;
      case 'bowling':
        setBowlingData(prev => prev.filter(entry => entry.id !== id));
        break;
      case 'fielding':
        setFieldingData(prev => prev.filter(entry => entry.id !== id));
        break;
      default:
        break;
    }
  };

  const handleSave = async() => {

    // Build score strings
    const score = `${matchData.nsbmScore || 0}/${matchData.nsbmWickets || 0}/${matchData.nsbmOvers || 0}`;
    const opponent_score = `${matchData.opponentScore || 0}/${matchData.opponentWickets || 0}/${matchData.opponentOvers || 0}`;
    const date_time = `${matchData.date_time}T00:00:00`

    // Create a new object with updated score fields
    const updatedMatchData = {
      ...matchData,
      score,
      opponent_score,
      date_time
    };

    const completeMatchData = {
      match: updatedMatchData,
      inning: inningData,
      batting_stats: battingData,
      bowling_stats: bowlingData,
      fielding_stats: fieldingData
    };

    console.log(completeMatchData);

    try {
      let res = await MatchService.saveMatchStats(completeMatchData);
      console.log(res);

      if (res.status == 200) {
        console.log(res.data.data);
        alert(res.data.message);
        clearFields();
        navigate("/admin/operations")
      } else {
        alert(res.response.data.message)

      }
      
    } catch (err) {
      console.error("Error saving match stats:", err);
    }
  };

  const clearFields = () => {
    const initialMatchData = {
      matchId: '',
      opponent: {id:0},
      date_time: '',
      venue: '',
      match_type: '',
      result: '',
      nsbmScore: '',
      nsbmWickets: '',
      nsbmOvers: '',
      score: '',
      opponentScore: '',
      opponentWickets: '',
      opponentOvers: '',
      opponent_score: '',
      toss: '',
      decision: '',
      scheduled_by: {
        id: parseInt(localStorage.getItem('user_id'), 10)
      },
      overs_per_inning:'',
      date:'',
      time:''
    };
    
    const initialInningData = {
      batting_team: {
        id: 1
      },
      runs: 0,
      wickets: 0,
      balls: 0
    };
    const initialBattingData = [];
    const initialBowlingData = [];
    const initialFieldingData = [];
    // After saving, reset the states to initial values
    setMatchData(initialMatchData);
    setInningData(initialInningData);
    setBattingData(initialBattingData);
    setBowlingData(initialBowlingData);
    setFieldingData(initialFieldingData);
    
  }

  const exportToCSV = (type) => {
    let csvContent = '';
    let filename = '';
    
    switch (type) {
      case 'batting':
        csvContent = [
          ['Player', 'Runs', 'Balls', '4s', '6s', 'SR', 'Dismissal Type', 'Fielder', 'Bowler'],
          ...battingData.map(entry => [
            entry.playerName,
            entry.runs,
            entry.balls_faced,
            entry.fours,
            entry.sixes,
            entry.strike_rate,
            entry.dismissal_type,
            entry.fielder,
            entry.bowler
          ])
        ].map(row => row.join(',')).join('\n');
        filename = 'batting_data.csv';
        break;
      case 'bowling':
        csvContent = [
          ['Player', 'Overs', 'Maidens', 'Runs', 'Wickets', 'Economy'/* , 'Wides', 'No Balls' */],
          ...bowlingData.map(entry => [
            entry.playerName,
            entry.overs,
            entry.maidens,
            entry.runs_conceded,
            entry.wickets,
            entry.economy,
            // entry.wides,
            // entry.noBalls
          ])
        ].map(row => row.join(',')).join('\n');
        filename = 'bowling_data.csv';
        break;
      case 'fielding':
        csvContent = [
          ['Player', 'Catches', 'Stumpings', 'Run Outs', 'Direct Hits'],
          ...fieldingData.map(entry => [
            entry.playerName,
            entry.catches,
            entry.stumpings,
            entry.assisted_run_outs,
            entry.direct_run_outs
          ])
        ].map(row => row.join(',')).join('\n');
        filename = 'fielding_data.csv';
        break;
      default:
        return;
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'batting', name: 'Batting', icon: Trophy },
    { id: 'bowling', name: 'Bowling', icon: Target },
    { id: 'fielding', name: 'Fielding', icon: Users }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: nsbmGreen }}>
            Match Data Entry
          </h1>
          <p className="text-lg text-gray-600">
            Enter match statistics and performance data
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md"
            style={{
              backgroundColor: colors.backgroundPrimary,
              color: colors.textPrimary,
              border: `2px solid ${colors.borderLight}`
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = nsbmGreen;
              e.target.style.color = nsbmGreen;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = colors.borderLight;
              e.target.style.color = colors.textPrimary;
            }}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-6 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
            style={{backgroundColor: nsbmGreen}}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = getNsbmGreen(0.8);
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = nsbmGreen;
            }}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Match
          </button>
        </div>
      </div>

      {/* Match Information */}
      <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8" style={{backgroundColor: colors.backgroundPrimary}}>
        {/* Header with gradient background */}
        <div className="relative px-8 py-6" style={{background: `linear-gradient(135deg, ${getNsbmGreen(0.1)}, ${getNsbmGreen(0.05)})`}}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 rounded-xl mr-4" style={{backgroundColor: nsbmGreen, boxShadow: `0 4px 12px ${getNsbmGreen(0.3)}`}}>
                <Calendar className="w-6 h-6 text-white" />
              </div>
          <div>
                <h2 className="text-2xl font-bold" style={{ color: nsbmGreen }}>
                  Match Information
                </h2>
                <p className="text-sm mt-1 text-gray-600">
                  Enter match details and statistics
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-16 h-16 rounded-full opacity-10" style={{backgroundColor: nsbmGreen}}></div>
            </div>
          </div>
        </div>
        
        {/* Form content with better spacing */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Match ID */}
          {/* <div className="group">
            <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
              <div className="w-6 h-6 rounded-lg mr-3 flex items-center justify-center" style={{backgroundColor: getNsbmGreen(0.1)}}>
                <span className="text-xs font-bold" style={{color: nsbmGreen}}>#</span>
              </div>
              Match ID
            </label>
            <div className="relative">
            <input
              type="text"
              value={matchData.matchId}
              onChange={(e) => handleMatchDataChange('matchId', e.target.value)}
                className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                style={{
                  borderColor: colors.borderLight,
                  backgroundColor: colors.backgroundSecondary,
                  color: colors.textPrimary
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = nsbmGreen;
                  e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.borderLight;
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
            />
          </div>
          </div> */}
          <div className="group">
            <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
              <div className="w-6 h-6 rounded-lg mr-3 flex items-center justify-center" style={{backgroundColor: getNsbmGreen(0.1)}}>
                <span className="text-xs font-bold" style={{color: nsbmGreen}}>T</span>
              </div>
              Opponent
            </label>
            <div className="relative">
                <select
                  value={matchData.opponent.id}
                  onChange={(e) => handleMatchDataChange("opponent", { id: parseInt(e.target.value, 10) })}
                  // value={searchFilters.opponent.id}
                  // onChange={(e) => handleFilterChange('opponent', { id: parseInt(e.target.value, 10) })}
                  className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                  style={{
                    borderColor: colors.borderLight,
                    backgroundColor: colors.backgroundSecondary,
                    color: colors.textPrimary
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = nsbmGreen;
                    e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.borderLight;
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                 <option value={0}>Select</option>
                  {opponents.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.team_name}
                    </option>
                  ))}
                </select>
            </div>
          </div>
          {/* <div className="group">
            <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
              <div className="w-6 h-6 rounded-lg mr-3 flex items-center justify-center" style={{backgroundColor: getNsbmGreen(0.1)}}>
                <span className="text-xs font-bold" style={{color: nsbmGreen}}>vs</span>
              </div>
              Opponent
            </label>
            <div className="relative">
              <input
                type="text"
                value={matchData.opponent}
                onChange={(e) => handleMatchDataChange('opponent', e.target.value)}
                  className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                  style={{
                    borderColor: colors.borderLight,
                    backgroundColor: colors.backgroundSecondary,
                    color: colors.textPrimary
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = nsbmGreen;
                    e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.borderLight;
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
              />
            </div>
          </div> */}
          <div className="group">
            <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
              <div className="w-6 h-6 rounded-lg mr-3 flex items-center justify-center" style={{backgroundColor: getNsbmGreen(0.1)}}>
                <Calendar className="w-3 h-3" style={{color: nsbmGreen}} />
              </div>
              Date
            </label>
            <div className="relative">
            <input
              type="date"
              value={matchData.date_time}
              onChange={(e) => handleMatchDataChange('date_time', e.target.value)}
              // value={searchFilters.date_time}
              // onChange={(e) => handleFilterChange('date_time', e.target.value)}
              className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
              style={{
                borderColor: colors.borderLight,
                backgroundColor: colors.backgroundSecondary,
                color: colors.textPrimary
              }}
              onFocus={(e) => {
                e.target.style.borderColor = nsbmGreen;
                e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.borderLight;
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            />
          </div>
          </div>
          <div className="group">
            <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
              <div className="w-6 h-6 rounded-lg mr-3 flex items-center justify-center" style={{backgroundColor: getNsbmGreen(0.1)}}>
                <MapPin className="w-3 h-3" style={{color: nsbmGreen}} />
              </div>
              Venue
            </label>
            <div className="relative">
            <input
              type="text"
              value={matchData.venue}
              onChange={(e) => handleMatchDataChange('venue', e.target.value)}
              // value={searchFilters.venue}
              // onChange={(e) => handleFilterChange('venue', e.target.value)}
                className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                style={{
                  borderColor: colors.borderLight,
                  backgroundColor: colors.backgroundSecondary,
                  color: colors.textPrimary
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = nsbmGreen;
                  e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.borderLight;
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
            />
          </div>
          </div>
          <div className="group">
            <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
              <div className="w-6 h-6 rounded-lg mr-3 flex items-center justify-center" style={{backgroundColor: getNsbmGreen(0.1)}}>
                <Trophy className="w-3 h-3" style={{color: nsbmGreen}} />
              </div>
              Match Type
            </label>
            <div className="relative">
            <select
              value={matchData.match_type}
              onChange={(e) => handleMatchDataChange('match_type', e.target.value)}
              // value={searchFilters.match_type}
              // onChange={(e) => handleFilterChange('match_type', e.target.value)}
              // value={matchData.match_type}
              // onChange={(e) => setMatchData(prev => ({ ...prev, match_type: e.target.value }))}
              // onChange={(e) => handleMatchDataChange('match_type', e.target.value)}
              className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
              style={{
                borderColor: colors.borderLight,
                backgroundColor: colors.backgroundSecondary,
                color: colors.textPrimary
              }}
              onFocus={(e) => {
                e.target.style.borderColor = nsbmGreen;
                e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                e.target.style.transform = 'translateY(-2px)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = colors.borderLight;
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            >
                <option value="">Select</option>
                <option value="T10">T10</option>
                <option value="T20">T20</option>
                <option value="ODI">ODI</option>
                <option value="TEST">Test</option>
                <option value="FRIENDLY">Friendly</option>
            </select>
          </div>
          </div>
          <div className="group">
            <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
              <div className="w-6 h-6 rounded-lg mr-3 flex items-center justify-center" style={{backgroundColor: getNsbmGreen(0.1)}}>
                <span className="text-xs font-bold" style={{color: nsbmGreen}}>R</span>
              </div>
              Result
            </label>
            <div className="relative">
            <select
              value={matchData.result ? matchData.result : ""}
              onChange={(e) => handleMatchDataChange('result', e.target.value)}
                className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                style={{
                  borderColor: colors.borderLight,
                  backgroundColor: colors.backgroundSecondary,
                  color: colors.textPrimary
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = nsbmGreen;
                  e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.borderLight;
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
            >
              <option value="">Select Result</option>
              <option value="WIN">Win</option>
              <option value="LOSS">Loss</option>
              <option value="DRAW">Draw</option>
              <option value="TIE">Tie</option>
            </select>
          </div>
          </div>
          <div className="group">
            <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
              <div className="w-6 h-6 rounded-lg mr-3 flex items-center justify-center" style={{backgroundColor: getNsbmGreen(0.1)}}>
                <span className="text-xs font-bold" style={{color: nsbmGreen}}>NS</span>
              </div>
              NSBM Score
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="number"
                  value={matchData.nsbmScore}
                  onChange={(e) => handleMatchDataChange('nsbmScore', e.target.value)}
                  placeholder="Runs"
                    className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                    style={{
                      borderColor: colors.borderLight,
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={matchData.nsbmWickets}
                  onChange={(e) => handleMatchDataChange('nsbmWickets', e.target.value)}
                  placeholder="Wickets"
                    className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                    style={{
                      borderColor: colors.borderLight,
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={matchData.nsbmOvers}
                  onChange={(e) => handleMatchDataChange('nsbmOvers', e.target.value)}
                  placeholder="Overs"
                    className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                    style={{
                      borderColor: colors.borderLight,
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                />
              </div>
            </div>
          </div>
          <div className="group">
            <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
              <div className="w-6 h-6 rounded-lg mr-3 flex items-center justify-center" style={{backgroundColor: getNsbmGreen(0.1)}}>
                <span className="text-xs font-bold" style={{color: nsbmGreen}}>OP</span>
              </div>
              Opponent Score
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <input
                  type="number"
                  value={matchData.opponentScore}
                  onChange={(e) => handleMatchDataChange('opponentScore', e.target.value)}
                  placeholder="Runs"
                    className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                    style={{
                      borderColor: colors.borderLight,
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  value={matchData.opponentWickets}
                  onChange={(e) => handleMatchDataChange('opponentWickets', e.target.value)}
                  placeholder="Wickets"
                    className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                    style={{
                      borderColor: colors.borderLight,
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={matchData.opponentOvers}
                  onChange={(e) => handleMatchDataChange('opponentOvers', e.target.value)}
                  placeholder="Overs"
                    className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                    style={{
                      borderColor: colors.borderLight,
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                />
              </div>
            </div>
          </div>
          <div className="group">
            <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
              <div className="w-6 h-6 rounded-lg mr-3 flex items-center justify-center" style={{backgroundColor: getNsbmGreen(0.1)}}>
                <span className="text-xs font-bold" style={{color: nsbmGreen}}>O</span>
              </div>
              Overs
            </label>
            <div className="relative">
            <input
              type="text"
              value={matchData.overs_per_inning}
              onChange={(e) => handleMatchDataChange('overs_per_inning', e.target.value)}
              placeholder="e.g., 20.0"
                className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                style={{
                  borderColor: colors.borderLight,
                  backgroundColor: colors.backgroundSecondary,
                  color: colors.textPrimary
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = nsbmGreen;
                  e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.borderLight;
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'translateY(0)';
                }}
            />
          </div>
          </div>

          {/* Toss */}
          {/* <div className="group">
            <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
              <div className="w-6 h-6 rounded-lg mr-3 flex items-center justify-center" style={{backgroundColor: getNsbmGreen(0.1)}}>
                <span className="text-xs font-bold" style={{color: nsbmGreen}}>T</span>
              </div>
              Toss
            </label>

            <div className="relative">
                <select
                  value={matchData.toss}
                  onChange={(e) => handleMatchDataChange('toss', e.target.value)}
                    className="w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none group-hover:shadow-lg"
                    style={{
                      borderColor: colors.borderLight,
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.boxShadow = `0 0 0 4px ${getNsbmGreen(0.1)}`;
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'translateY(0)';
                    }}
                >
                  <option value="">Select Toss</option>
                  <option value="WIN">Win</option>
                  <option value="LOSS">Loss</option>
                </select>
            </div>
          </div> */}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="rounded-xl shadow-lg overflow-hidden bg-white">
        <div style={{borderBottomColor: colors.borderLight}}>
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-semibold text-sm flex items-center transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-gray-900 font-bold'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                  style={{
                    borderBottomColor: activeTab === tab.id ? nsbmGreen : 'transparent',
                    backgroundColor: activeTab === tab.id ? getNsbmGreen(0.1) : 'transparent'
                  }}
                >
                  <Icon className="w-4 h-4 mr-2" style={{color: activeTab === tab.id ? '#1F2937' : '#4B5563'}} />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Batting Tab */}
          {activeTab === 'batting' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center" style={{ color: nsbmGreen }}>
                  <div className="p-2 rounded-lg mr-3" style={{backgroundColor: getNsbmGreen(0.1)}}>
                    <Trophy className="w-5 h-5" style={{color: nsbmGreen}} />
                  </div>
                  <span style={{color: nsbmGreen}}>Batting Statistics</span>
                </h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => exportToCSV('batting')}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md"
                    style={{
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary,
                      border: `2px solid ${colors.borderLight}`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.color = nsbmGreen;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.color = colors.textPrimary;
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button
                    onClick={addBattingEntry}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
                    style={{backgroundColor: nsbmGreen}}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = getNsbmGreen(0.8);
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = nsbmGreen;
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Entry
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead style={{backgroundColor: getNsbmGreen(0.05)}}>
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Player</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Runs</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Balls</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>4s</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>6s</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>SR</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Dismissal Type</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider" style={{color: 'white', backgroundColor: nsbmGreen}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{borderColor: colors.borderLight}}>
                    {battingData.map((entry, index) => (
                      <tr 
                        key={entry.id}
                        className={`transition-all duration-200 hover:shadow-md ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                        style={{
                          backgroundColor: index % 2 === 0 ? colors.backgroundPrimary : getNsbmGreen(0.02)
                        }}
                      >
                        <td className="px-6 py-4">
                          <select
                            value={entry.player_id}
                            onChange={(e) => {
                              const player = players.find(p => p.id === parseInt(e.target.value));
                              // updateBattingEntry(entry.id, 'player_id', e.target.value);
                              updateBattingEntry(entry.id, 'player_id', parseInt(e.target.value, 10));
                              updateBattingEntry(entry.id, 'playerName', player ? player.name : '');
                            }}
                            className="w-full px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value="">Select Player</option>
                            {players.map(player => (
                              <option key={player.id} value={player.id}>{player.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.runs}
                            onChange={(e) => updateBattingEntry(entry.id, 'runs', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.balls_faced}
                            onChange={(e) => updateBattingEntry(entry.id, 'balls_faced', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.fours}
                            onChange={(e) => updateBattingEntry(entry.id, 'fours', parseInt(e.target.value) || 0)}
                            className="w-16 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.sixes}
                            onChange={(e) => updateBattingEntry(entry.id, 'sixes', parseInt(e.target.value) || 0)}
                            className="w-16 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-semibold" style={{color: nsbmGreen}}>{entry.strike_rate}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <select
                            value={entry.dismissal_type}
                            onChange={(e) => updateBattingEntry(entry.id, 'dismissal_type', e.target.value)}
                            className="w-28 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value="">Select</option>
                            <option value="NOTOUT">Not Out</option>
                            <option value="BOWLED">Bowled</option>
                            <option value="CAUGHT">Caught</option>
                            <option value="LBW">LBW</option>
                            <option value="RUNOUT">Run Out</option>
                            <option value="STUMPED">Stumped</option>
                            <option value="HITWICKET">Hit Wicket</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => removeEntry('batting', entry.id)}
                            className="p-2 rounded-lg transition-all duration-200 hover:shadow-md"
                            style={{
                              backgroundColor: getBrandColor('error', 0.1),
                              color: colors.error
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = getBrandColor('error', 0.2);
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = getBrandColor('error', 0.1);
                            }}
                            title="Remove Entry"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bowling Tab */}
          {activeTab === 'bowling' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center" style={{ color: nsbmGreen }}>
                  <div className="p-2 rounded-lg mr-3" style={{backgroundColor: getNsbmGreen(0.1)}}>
                    <Target className="w-5 h-5" style={{color: nsbmGreen}} />
                  </div>
                  <span style={{color: nsbmGreen}}>Bowling Statistics</span>
                </h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => exportToCSV('bowling')}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md"
                    style={{
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary,
                      border: `2px solid ${colors.borderLight}`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.color = nsbmGreen;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.color = colors.textPrimary;
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button
                    onClick={addBowlingEntry}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
                    style={{backgroundColor: nsbmGreen}}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = getNsbmGreen(0.8);
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = nsbmGreen;
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Entry
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead style={{backgroundColor: getNsbmGreen(0.05)}}>
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Player</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Overs</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Maidens</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Runs</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Wickets</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Economy</th>
                      {/* <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Wides</th> */}
                      {/* <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>No Balls</th> */}
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider" style={{color: 'white', backgroundColor: nsbmGreen}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{borderColor: colors.borderLight}}>
                    {bowlingData.map((entry, index) => (
                      <tr 
                        key={entry.id}
                        className={`transition-all duration-200 hover:shadow-md ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                        style={{
                          backgroundColor: index % 2 === 0 ? colors.backgroundPrimary : getNsbmGreen(0.02)
                        }}
                      >
                        <td className="px-6 py-4">
                          <select
                            value={entry.player_id}
                            onChange={(e) => {
                              const player = players.find(p => p.id === parseInt(e.target.value));
                              // updateBowlingEntry(entry.id, 'player_id', e.target.value);
                              updateBowlingEntry(entry.id, 'player_id', parseInt(e.target.value, 10));
                              updateBowlingEntry(entry.id, 'playerName', player ? player.name : '');
                            }}
                            className="w-full px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value="">Select Player</option>
                            {players.map(player => (
                              <option key={player.id} value={player.id}>{player.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            step="0.1"
                            value={entry.overs}
                            onChange={(e) => updateBowlingEntry(entry.id, 'overs', parseFloat(e.target.value) || 0)}
                            className="w-20 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.maidens}
                            onChange={(e) => updateBowlingEntry(entry.id, 'maidens', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.runs_conceded}
                            onChange={(e) => updateBowlingEntry(entry.id, 'runs_conceded', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.wickets}
                            onChange={(e) => updateBowlingEntry(entry.id, 'wickets', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-sm font-semibold" style={{color: nsbmGreen}}>{entry.economy}</span>
                        </td>
                        {/* <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.wides}
                            onChange={(e) => updateBowlingEntry(entry.id, 'wides', parseInt(e.target.value) || 0)}
                            className="w-16 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td> */}
                        {/* <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.noBalls}
                            onChange={(e) => updateBowlingEntry(entry.id, 'noBalls', parseInt(e.target.value) || 0)}
                            className="w-16 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td> */}
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => removeEntry('bowling', entry.id)}
                            className="p-2 rounded-lg transition-all duration-200 hover:shadow-md"
                            style={{
                              backgroundColor: getBrandColor('error', 0.1),
                              color: colors.error
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = getBrandColor('error', 0.2);
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = getBrandColor('error', 0.1);
                            }}
                            title="Remove Entry"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Fielding Tab */}
          {activeTab === 'fielding' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold flex items-center" style={{ color: nsbmGreen }}>
                  <div className="p-2 rounded-lg mr-3" style={{backgroundColor: getNsbmGreen(0.1)}}>
                    <Users className="w-5 h-5" style={{color: nsbmGreen}} />
                  </div>
                  <span style={{color: nsbmGreen}}>Fielding Statistics</span>
                </h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => exportToCSV('fielding')}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md"
                    style={{
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary,
                      border: `2px solid ${colors.borderLight}`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.color = nsbmGreen;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.color = colors.textPrimary;
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button
                    onClick={addFieldingEntry}
                    className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
                    style={{backgroundColor: nsbmGreen}}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = getNsbmGreen(0.8);
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = nsbmGreen;
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Entry
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead style={{backgroundColor: getNsbmGreen(0.05)}}>
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Player</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Catches</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Stumpings</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Run Outs</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>Direct Hits</th>
                      <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider" style={{color: 'white', backgroundColor: nsbmGreen}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{borderColor: colors.borderLight}}>
                    {fieldingData.map((entry, index) => (
                      <tr 
                        key={entry.id}
                        className={`transition-all duration-200 hover:shadow-md ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                        style={{
                          backgroundColor: index % 2 === 0 ? colors.backgroundPrimary : getNsbmGreen(0.02)
                        }}
                      >
                        <td className="px-6 py-4">
                          <select
                            value={entry.player_id}
                            onChange={(e) => {
                              const player = players.find(p => p.id === parseInt(e.target.value));
                              // updateFieldingEntry(entry.id, 'player_id', e.target.value);
                              updateFieldingEntry(entry.id, 'player_id', parseInt(e.target.value, 10));
                              updateFieldingEntry(entry.id, 'playerName', player ? player.name : '');
                            }}
                            className="w-full px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          >
                            <option value="">Select Player</option>
                            {players.map(player => (
                              <option key={player.id} value={player.id}>{player.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.catches}
                            onChange={(e) => updateFieldingEntry(entry.id, 'catches', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.stumpings}
                            onChange={(e) => updateFieldingEntry(entry.id, 'stumpings', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.assisted_run_outs}
                            onChange={(e) => updateFieldingEntry(entry.id, 'assisted_run_outs', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <input
                            type="number"
                            value={entry.direct_run_outs}
                            onChange={(e) => updateFieldingEntry(entry.id, 'direct_run_outs', parseInt(e.target.value) || 0)}
                            className="w-20 px-3 py-2 rounded-xl transition-all duration-200 focus:outline-none text-center"
                            style={{
                              borderColor: colors.borderLight,
                              backgroundColor: colors.backgroundSecondary,
                              color: colors.textPrimary
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = nsbmGreen;
                              e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = colors.borderLight;
                              e.target.style.boxShadow = 'none';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => removeEntry('fielding', entry.id)}
                            className="p-2 rounded-lg transition-all duration-200 hover:shadow-md"
                            style={{
                              backgroundColor: getBrandColor('error', 0.1),
                              color: colors.error
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = getBrandColor('error', 0.2);
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = getBrandColor('error', 0.1);
                            }}
                            title="Remove Entry"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSV Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-6 border-0 w-11/12 md:w-1/2 shadow-2xl rounded-2xl" style={{backgroundColor: colors.backgroundPrimary}}>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center" style={{ color: nsbmGreen }}>
                  <div className="p-2 rounded-lg mr-3" style={{backgroundColor: getNsbmGreen(0.1)}}>
                    <Upload className="w-5 h-5" style={{color: nsbmGreen}} />
                  </div>
                  <span style={{color: nsbmGreen}}>Import CSV Data</span>
                </h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="p-2 rounded-lg transition-all duration-200 hover:shadow-md"
                  style={{
                    backgroundColor: getBrandColor('error', 0.1),
                    color: colors.error
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = getBrandColor('error', 0.2);
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = getBrandColor('error', 0.1);
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                    Select CSV File
                  </label>
                  <input
                    type="file"
                    accept=".csv"
                    className="w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none"
                    style={{
                      borderColor: colors.borderLight,
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
                    <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                    Data Type
                  </label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none"
                    style={{
                      borderColor: colors.borderLight,
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.boxShadow = `0 0 0 2px ${getNsbmGreen(0.2)}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="batting">Batting Data</option>
                    <option value="bowling">Bowling Data</option>
                    <option value="fielding">Fielding Data</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-4 pt-6" style={{borderTop: `2px solid ${colors.borderLight}`}}>
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-md"
                    style={{
                      backgroundColor: colors.backgroundSecondary,
                      color: colors.textPrimary,
                      border: `2px solid ${colors.borderLight}`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = nsbmGreen;
                      e.target.style.color = nsbmGreen;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = colors.borderLight;
                      e.target.style.color = colors.textPrimary;
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle CSV import logic here
                      alert('CSV import functionality would be implemented here');
                      setShowImportModal(false);
                    }}
                    className="px-6 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
                    style={{backgroundColor: nsbmGreen}}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = getNsbmGreen(0.8);
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = nsbmGreen;
                    }}
                  >
                    Import
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDataEntry;
