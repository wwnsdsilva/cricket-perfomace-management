import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Save, 
  Upload, 
  Download, 
  RefreshCw,
  Trophy,
  Target,
  Users,
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const MatchDataEntry = () => {
  const [activeTab, setActiveTab] = useState('batting');
  const [matchData, setMatchData] = useState({
    matchId: '',
    opponent: '',
    date: '',
    venue: '',
    matchType: 'T10',
    result: '',
    score: '',
    overs: '',
    toss: '',
    decision: ''
  });
  const [battingData, setBattingData] = useState([]);
  const [bowlingData, setBowlingData] = useState([]);
  const [fieldingData, setFieldingData] = useState([]);
  const [players, setPlayers] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);

  // Sample players data
  useEffect(() => {
    const samplePlayers = [
      { id: 1, name: 'Maneendra Jayathilaka', role: 'Batsman' },
      { id: 2, name: 'Monil Jason', role: 'All-rounder' },
      { id: 3, name: 'Dilhara Polgampola', role: 'Bowler' },
      { id: 4, name: 'Lahiru Abhesinghe', role: 'Batsman' },
      { id: 5, name: 'Asitha Wanninayaka', role: 'Bowler' },
      { id: 6, name: 'Suviru Sathnidu', role: 'All-rounder' },
      { id: 7, name: 'Kavisha Weerasinghe', role: 'Wicket-keeper' },
      { id: 8, name: 'Chamod Hasalanka', role: 'Batsman' },
      { id: 9, name: 'Dulaj Bandara', role: 'Bowler' }
    ];
    setPlayers(samplePlayers);
  }, []);

  const handleMatchDataChange = (field, value) => {
    setMatchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addBattingEntry = () => {
    const newEntry = {
      id: Date.now(),
      playerId: '',
      playerName: '',
      runs: 0,
      balls: 0,
      fours: 0,
      sixes: 0,
      strikeRate: 0,
      howOut: 'Not Out',
      fielder: '',
      bowler: ''
    };
    setBattingData(prev => [...prev, newEntry]);
  };

  const addBowlingEntry = () => {
    const newEntry = {
      id: Date.now(),
      playerId: '',
      playerName: '',
      overs: 0,
      maidens: 0,
      runs: 0,
      wickets: 0,
      economy: 0,
      wides: 0,
      noBalls: 0
    };
    setBowlingData(prev => [...prev, newEntry]);
  };

  const addFieldingEntry = () => {
    const newEntry = {
      id: Date.now(),
      playerId: '',
      playerName: '',
      catches: 0,
      stumpings: 0,
      runOuts: 0,
      directHits: 0
    };
    setFieldingData(prev => [...prev, newEntry]);
  };

  const updateBattingEntry = (id, field, value) => {
    setBattingData(prev => prev.map(entry => {
      if (entry.id === id) {
        const updated = { ...entry, [field]: value };
        if (field === 'runs' || field === 'balls') {
          updated.strikeRate = updated.balls > 0 ? ((updated.runs / updated.balls) * 100).toFixed(2) : 0;
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
        if (field === 'runs' || field === 'overs') {
          updated.economy = updated.overs > 0 ? (updated.runs / updated.overs).toFixed(2) : 0;
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

  const handleSave = () => {
    const completeMatchData = {
      match: matchData,
      batting: battingData,
      bowling: bowlingData,
      fielding: fieldingData
    };
    
    // Here you would typically send to API
    console.log('Saving match data:', completeMatchData);
    alert('Match data saved successfully!');
  };

  const exportToCSV = (type) => {
    let csvContent = '';
    let filename = '';
    
    switch (type) {
      case 'batting':
        csvContent = [
          ['Player', 'Runs', 'Balls', '4s', '6s', 'SR', 'How Out', 'Fielder', 'Bowler'],
          ...battingData.map(entry => [
            entry.playerName,
            entry.runs,
            entry.balls,
            entry.fours,
            entry.sixes,
            entry.strikeRate,
            entry.howOut,
            entry.fielder,
            entry.bowler
          ])
        ].map(row => row.join(',')).join('\n');
        filename = 'batting_data.csv';
        break;
      case 'bowling':
        csvContent = [
          ['Player', 'Overs', 'Maidens', 'Runs', 'Wickets', 'Economy', 'Wides', 'No Balls'],
          ...bowlingData.map(entry => [
            entry.playerName,
            entry.overs,
            entry.maidens,
            entry.runs,
            entry.wickets,
            entry.economy,
            entry.wides,
            entry.noBalls
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
            entry.runOuts,
            entry.directHits
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Match Data Entry</h1>
          <p className="text-gray-600">Enter match statistics and performance data</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Match
          </button>
        </div>
      </div>

      {/* Match Information */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Match Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Match ID</label>
            <input
              type="text"
              value={matchData.matchId}
              onChange={(e) => handleMatchDataChange('matchId', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opponent</label>
            <input
              type="text"
              value={matchData.opponent}
              onChange={(e) => handleMatchDataChange('opponent', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={matchData.date}
              onChange={(e) => handleMatchDataChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
            <input
              type="text"
              value={matchData.venue}
              onChange={(e) => handleMatchDataChange('venue', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Match Type</label>
            <select
              value={matchData.matchType}
              onChange={(e) => handleMatchDataChange('matchType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="T10">T10</option>
              <option value="T20">T20</option>
              <option value="ODI">ODI</option>
              <option value="Test">Test</option>
              <option value="Friendly">Friendly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
            <select
              value={matchData.result}
              onChange={(e) => handleMatchDataChange('result', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Result</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="Draw">Draw</option>
              <option value="Tie">Tie</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
            <input
              type="text"
              value={matchData.score}
              onChange={(e) => handleMatchDataChange('score', e.target.value)}
              placeholder="e.g., 150/5"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Overs</label>
            <input
              type="text"
              value={matchData.overs}
              onChange={(e) => handleMatchDataChange('overs', e.target.value)}
              placeholder="e.g., 20.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Toss</label>
            <select
              value={matchData.toss}
              onChange={(e) => handleMatchDataChange('toss', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Toss</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
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

        <div className="p-6">
          {/* Batting Tab */}
          {activeTab === 'batting' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Batting Statistics</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => exportToCSV('batting')}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </button>
                  <button
                    onClick={addBattingEntry}
                    className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Entry
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Player</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Runs</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Balls</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">4s</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">6s</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">SR</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">How Out</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {battingData.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-3 py-2">
                          <select
                            value={entry.playerId}
                            onChange={(e) => {
                              const player = players.find(p => p.id === parseInt(e.target.value));
                              updateBattingEntry(entry.id, 'playerId', e.target.value);
                              updateBattingEntry(entry.id, 'playerName', player ? player.name : '');
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="">Select Player</option>
                            {players.map(player => (
                              <option key={player.id} value={player.id}>{player.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.runs}
                            onChange={(e) => updateBattingEntry(entry.id, 'runs', parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.balls}
                            onChange={(e) => updateBattingEntry(entry.id, 'balls', parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.fours}
                            onChange={(e) => updateBattingEntry(entry.id, 'fours', parseInt(e.target.value) || 0)}
                            className="w-12 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.sixes}
                            onChange={(e) => updateBattingEntry(entry.id, 'sixes', parseInt(e.target.value) || 0)}
                            className="w-12 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <span className="text-sm text-gray-900">{entry.strikeRate}</span>
                        </td>
                        <td className="px-3 py-2">
                          <select
                            value={entry.howOut}
                            onChange={(e) => updateBattingEntry(entry.id, 'howOut', e.target.value)}
                            className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="Not Out">Not Out</option>
                            <option value="Bowled">Bowled</option>
                            <option value="Caught">Caught</option>
                            <option value="LBW">LBW</option>
                            <option value="Run Out">Run Out</option>
                            <option value="Stumped">Stumped</option>
                            <option value="Hit Wicket">Hit Wicket</option>
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => removeEntry('batting', entry.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-4 h-4" />
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Bowling Statistics</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => exportToCSV('bowling')}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </button>
                  <button
                    onClick={addBowlingEntry}
                    className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Entry
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Player</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Overs</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Maidens</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Runs</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Wickets</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Economy</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Wides</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">No Balls</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bowlingData.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-3 py-2">
                          <select
                            value={entry.playerId}
                            onChange={(e) => {
                              const player = players.find(p => p.id === parseInt(e.target.value));
                              updateBowlingEntry(entry.id, 'playerId', e.target.value);
                              updateBowlingEntry(entry.id, 'playerName', player ? player.name : '');
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="">Select Player</option>
                            {players.map(player => (
                              <option key={player.id} value={player.id}>{player.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            step="0.1"
                            value={entry.overs}
                            onChange={(e) => updateBowlingEntry(entry.id, 'overs', parseFloat(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.maidens}
                            onChange={(e) => updateBowlingEntry(entry.id, 'maidens', parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.runs}
                            onChange={(e) => updateBowlingEntry(entry.id, 'runs', parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.wickets}
                            onChange={(e) => updateBowlingEntry(entry.id, 'wickets', parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <span className="text-sm text-gray-900">{entry.economy}</span>
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.wides}
                            onChange={(e) => updateBowlingEntry(entry.id, 'wides', parseInt(e.target.value) || 0)}
                            className="w-12 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.noBalls}
                            onChange={(e) => updateBowlingEntry(entry.id, 'noBalls', parseInt(e.target.value) || 0)}
                            className="w-12 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => removeEntry('bowling', entry.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-4 h-4" />
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Fielding Statistics</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => exportToCSV('fielding')}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </button>
                  <button
                    onClick={addFieldingEntry}
                    className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Entry
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Player</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Catches</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stumpings</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Run Outs</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Direct Hits</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fieldingData.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-3 py-2">
                          <select
                            value={entry.playerId}
                            onChange={(e) => {
                              const player = players.find(p => p.id === parseInt(e.target.value));
                              updateFieldingEntry(entry.id, 'playerId', e.target.value);
                              updateFieldingEntry(entry.id, 'playerName', player ? player.name : '');
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            <option value="">Select Player</option>
                            {players.map(player => (
                              <option key={player.id} value={player.id}>{player.name}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.catches}
                            onChange={(e) => updateFieldingEntry(entry.id, 'catches', parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.stumpings}
                            onChange={(e) => updateFieldingEntry(entry.id, 'stumpings', parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.runOuts}
                            onChange={(e) => updateFieldingEntry(entry.id, 'runOuts', parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <input
                            type="number"
                            value={entry.directHits}
                            onChange={(e) => updateFieldingEntry(entry.id, 'directHits', parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-3 py-2">
                          <button
                            onClick={() => removeEntry('fielding', entry.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-4 h-4" />
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Import CSV Data</h3>
                <button
                  onClick={() => setShowImportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select CSV File
                  </label>
                  <input
                    type="file"
                    accept=".csv"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="batting">Batting Data</option>
                    <option value="bowling">Bowling Data</option>
                    <option value="fielding">Fielding Data</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle CSV import logic here
                      alert('CSV import functionality would be implemented here');
                      setShowImportModal(false);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
