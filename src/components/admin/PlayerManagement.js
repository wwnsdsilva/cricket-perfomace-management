import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  User,
  Trophy,
  Target,
  X
} from 'lucide-react';
import { NSBM_DESIGN_SYSTEM, getBrandColor } from '../../styles/nsbm-design-system';

// NSBM Brand Colors from Design System
const { colors } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;

// Helper functions for colors with opacity
const getNsbmGreen = (opacity = 1) => getBrandColor('brandPrimary', opacity);

const PlayerManagement = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [formData, setFormData] = useState({
    universityId: '',
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    jerseyNumber: '',
    role: 'Batsman',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    joiningDate: '',
    photo: null
  });

  // Sample data - replace with API calls
  useEffect(() => {
    const samplePlayers = [
      {
        id: 'NSBM001',
        universityId: 'NSBM001',
        name: 'Monil Jason',
        email: 'maniya@nsbm.lk',
        phone: '+94 77 123 4567',
        dateOfBirth: '1995-03-15',
        role: 'Batsman',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm offbreak',
        joiningDate: '2023-01-15',
        photo: '/images/gallery/players/maniya.jpg',
        runs: 1250,
        wickets: 5,
        matches: 15,
        average: 45.2
      },
      {
        id: 'NSBM002',
        universityId: 'NSBM002',
        name: 'Dulaj Bandara',
        email: 'dulaj@nsbm.lk',
        phone: '+94 77 234 5678',
        dateOfBirth: '1992-07-22',
        role: 'Bowler',
        battingStyle: 'Left-hand bat',
        bowlingStyle: 'Left-arm fast',
        joiningDate: '2023-02-01',
        photo: '/images/gallery/players/dulaj.jpg',
        runs: 320,
        wickets: 28,
        matches: 12,
        average: 18.5
      },
      {
        id: 'NSBM003',
        universityId: 'NSBM003',
        name: 'Suviru Sathnidu',
        email: 'suviru@nsbm.lk',
        phone: '+94 77 345 6789',
        dateOfBirth: '1988-11-08',
        role: 'All-rounder',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm medium',
        joiningDate: '2022-09-10',
        photo: '/images/gallery/players/suviru.jpg',
        runs: 890,
        wickets: 15,
        matches: 18,
        average: 32.1
      }
    ];
    setPlayers(samplePlayers);
    setFilteredPlayers(samplePlayers);
  }, []);

  // Filter and search players
  useEffect(() => {
    let filtered = players;

    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.universityId?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterRole !== 'All') {
      filtered = filtered.filter(player => player.role === filterRole);
    }

    setFilteredPlayers(filtered);
  }, [players, searchTerm, filterRole]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPG or PNG)');
        return;
      }
      
      // Validate file size (10MB max)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        alert('File size must be less than 10MB');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPlayer) {
      // Update existing player
      setPlayers(prev => prev.map(player => 
        player.id === editingPlayer.id ? { ...player, ...formData } : player
      ));
    } else {
      // Add new player
      const newPlayer = {
        id: formData.universityId,
        ...formData,
        runs: 0,
        wickets: 0,
        matches: 0,
        average: 0
      };
      setPlayers(prev => [...prev, newPlayer]);
    }
    
    setShowModal(false);
    setEditingPlayer(null);
    setFormData({
      universityId: '',
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      role: 'Batsman',
      battingStyle: 'Right-hand bat',
      bowlingStyle: 'Right-arm medium',
      address: '',
      emergencyContact: '',
      emergencyPhone: '',
      joiningDate: '',
      photo: ''
    });
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setFormData(player);
    setShowModal(true);
  };

  const handleDelete = (playerId) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      setPlayers(prev => prev.filter(player => player.id !== playerId));
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Role', 'Runs', 'Wickets', 'Matches', 'Average'],
      ...filteredPlayers.map(player => [
        player.name,
        player.email,
        player.phone,
        player.role,
        player.runs,
        player.wickets,
        player.matches,
        player.average
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'players.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const roles = ['All', 'Batsman', 'Bowler', 'All-rounder', 'Wicket-keeper'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: nsbmGreen }}>
            Player Management
          </h1>
          <p className="text-lg text-white/70">
            Manage your cricket club players
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={exportToCSV}
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
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-6 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
            style={{backgroundColor: nsbmGreen}}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = getNsbmGreen(0.8);
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = nsbmGreen;
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Player
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="p-6 rounded-xl shadow-lg mb-6" style={{backgroundColor: colors.backgroundPrimary}}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: colors.textMuted}} />
              <input
                type="text"
                placeholder="Search players by name, email, ID, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none"
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
          </div>
          <div className="sm:w-48">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 focus:outline-none"
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
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Players Table - Enhanced View */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{backgroundColor: colors.backgroundPrimary}}>
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full">
            <thead style={{backgroundColor: getNsbmGreen(0.1)}}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>
                  Player Details
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>
                  Jersey #
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>
                  Contact Info
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>
                  Cricket Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider border-r" style={{color: 'white', backgroundColor: nsbmGreen, borderColor: getNsbmGreen(0.3)}}>
                  Performance Stats
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider" style={{color: 'white', backgroundColor: nsbmGreen}}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{borderColor: colors.borderLight}}>
              {filteredPlayers.map((player, index) => (
                <tr 
                  key={player.id} 
                  className={`transition-all duration-200 hover:shadow-md ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}
                  style={{
                    backgroundColor: index % 2 === 0 ? colors.backgroundPrimary : getNsbmGreen(0.02)
                  }}
                >
                  {/* Player Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2" style={{ringColor: nsbmGreen}}>
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-semibold" style={{color: colors.textPrimary}}>
                          {player.name}
                        </div>
                        <div className="text-sm" style={{color: colors.textMuted}}>
                          ID: {player.universityId || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Jersey Number */}
                  <td className="px-6 py-4 text-center">
                    {player.jerseyNumber ? (
                      <div 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold text-white"
                        style={{backgroundColor: nsbmGreen}}
                      >
                        {player.jerseyNumber}
                      </div>
                    ) : (
                      <div 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full text-sm font-medium"
                        style={{backgroundColor: colors.borderLight, color: colors.textMuted}}
                      >
                        ?
                      </div>
                    )}
                  </td>

                  {/* Contact Info */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm font-medium" style={{color: colors.textPrimary}}>
                        {player.email}
                      </div>
                      <div className="text-sm" style={{color: colors.textSecondary}}>
                        {player.phone}
                      </div>
                    </div>
                  </td>

                  {/* Cricket Role */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold" style={{backgroundColor: getNsbmGreen(0.1), color: nsbmGreen}}>
                      {player.role}
                      </div>
                      <div className="text-sm" style={{color: colors.textSecondary}}>
                        {player.battingStyle}
                      </div>
                      <div className="text-sm" style={{color: colors.textSecondary}}>
                        {player.bowlingStyle}
                      </div>
                    </div>
                  </td>

                  {/* Performance Stats */}
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4" style={{color: nsbmGreen}} />
                          <span className="text-sm font-semibold" style={{color: nsbmGreen}}>
                            {player.runs} runs
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" style={{color: nsbmGreen}} />
                          <span className="text-sm font-semibold" style={{color: nsbmGreen}}>
                            {player.wickets} wkts
                          </span>
                        </div>
                      </div>
                      <div className="text-sm" style={{color: colors.textSecondary}}>
                        Avg: {player.average}
                      </div>
                      <div className="text-sm" style={{color: colors.textSecondary}}>
                        Matches: {player.matches}
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(player)}
                        className="p-2 rounded-lg transition-all duration-200 hover:shadow-md"
                        style={{
                          backgroundColor: getNsbmGreen(0.1),
                          color: nsbmGreen
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = getNsbmGreen(0.2);
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = getNsbmGreen(0.1);
                        }}
                        title="Edit Player"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(player.id)}
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
                        title="Delete Player"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden">
          {filteredPlayers.map((player, index) => (
            <div 
              key={player.id}
              className="p-4 border-b last:border-b-0 transition-all duration-200 hover:shadow-md"
              style={{
                backgroundColor: index % 2 === 0 ? colors.backgroundPrimary : getNsbmGreen(0.02),
                borderColor: colors.borderLight
              }}
            >
              <div className="space-y-4">
                {/* Player Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2" style={{ringColor: nsbmGreen}}>
                      <img
                        src={player.photo}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-semibold" style={{color: colors.textPrimary}}>
                        {player.name}
                      </div>
                      <div className="text-sm" style={{color: colors.textMuted}}>
                        ID: {player.universityId || 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {player.jerseyNumber ? (
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{backgroundColor: nsbmGreen}}
                      >
                        {player.jerseyNumber}
                      </div>
                    ) : (
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium"
                        style={{backgroundColor: colors.borderLight, color: colors.textMuted}}
                      >
                        ?
                      </div>
                    )}
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(player)}
                        className="p-2 rounded-lg transition-all duration-200"
                        style={{
                          backgroundColor: getNsbmGreen(0.1),
                          color: nsbmGreen
                        }}
                        title="Edit Player"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(player.id)}
                        className="p-2 rounded-lg transition-all duration-200"
                        style={{
                          backgroundColor: getBrandColor('error', 0.1),
                          color: colors.error
                        }}
                        title="Delete Player"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-1">
                  <div className="text-sm font-medium" style={{color: colors.textPrimary}}>
                    {player.email}
                  </div>
                  <div className="text-sm" style={{color: colors.textSecondary}}>
                    {player.phone}
                  </div>
                </div>

                {/* Cricket Role */}
                <div className="space-y-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold" style={{backgroundColor: getNsbmGreen(0.1), color: nsbmGreen}}>
                    {player.role}
                  </div>
                  <div className="text-sm" style={{color: colors.textSecondary}}>
                    {player.battingStyle}
                  </div>
                  <div className="text-sm" style={{color: colors.textSecondary}}>
                    {player.bowlingStyle}
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" style={{color: nsbmGreen}} />
                      <span className="text-sm font-semibold" style={{color: nsbmGreen}}>
                        {player.runs} runs
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" style={{color: nsbmGreen}} />
                      <span className="text-sm font-semibold" style={{color: nsbmGreen}}>
                        {player.wickets} wkts
                      </span>
                    </div>
                  </div>
                  <div className="text-sm" style={{color: colors.textSecondary}}>
                    Avg: {player.average}
                  </div>
                  <div className="text-sm" style={{color: colors.textSecondary}}>
                    Matches: {player.matches}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{backgroundColor: getNsbmGreen(0.1)}}>
              <User className="w-8 h-8" style={{color: nsbmGreen}} />
            </div>
            <h3 className="text-lg font-semibold mb-2" style={{ color: nsbmGreen }}>
              No players found
            </h3>
            <p className="text-sm" style={{color: colors.textMuted}}>
              {searchTerm || filterRole !== 'All' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Get started by adding your first player.'
              }
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Player Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-6 border-0 w-11/12 md:w-4/5 lg:w-3/5 xl:w-1/2 shadow-2xl rounded-2xl" style={{backgroundColor: colors.backgroundPrimary}}>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl" style={{backgroundColor: getNsbmGreen(0.1)}}>
                    <User className="w-6 h-6" style={{color: nsbmGreen}} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: nsbmGreen }}>
                  {editingPlayer ? 'Edit Player' : 'Add New Player'}
                </h3>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingPlayer(null);
                  }}
                  className="p-2 rounded-full transition-all duration-200"
                  style={{color: colors.textMuted}}
                  onMouseEnter={(e) => e.target.style.color = colors.error}
                  onMouseLeave={(e) => e.target.style.color = colors.textMuted}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information Section */}
                <div className="p-6 rounded-xl shadow-lg" style={{backgroundColor: getNsbmGreen(0.05)}}>
                  <h4 className="text-xl font-bold mb-6 flex items-center" style={{color: colors.textPrimary}}>
                    <div className="p-2 rounded-lg mr-3" style={{backgroundColor: getNsbmGreen(0.1)}}>
                      <User className="w-5 h-5" style={{color: nsbmGreen}} />
                    </div>
                    <span style={{color: nsbmGreen}}>
                      Personal Information
                    </span>
                  </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                        University ID *
                      </label>
                      <input
                        type="text"
                        name="universityId"
                        value={formData.universityId}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., NSBM001"
                        className="w-full px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          borderColor: colors.borderLight,
                          backgroundColor: colors.backgroundPrimary,
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
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                        className="w-full px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          borderColor: colors.borderLight,
                          backgroundColor: colors.backgroundPrimary,
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
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                        Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                        className="w-full px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          borderColor: colors.borderLight,
                          backgroundColor: colors.backgroundPrimary,
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
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                        Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                        placeholder="+94 XX XXX XXXX"
                        className="w-full px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          borderColor: colors.borderLight,
                          backgroundColor: colors.backgroundPrimary,
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
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          borderColor: colors.borderLight,
                          backgroundColor: colors.backgroundPrimary,
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
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                        Jersey Number *
                      </label>
                      <input
                        type="number"
                        name="jerseyNumber"
                        value={formData.jerseyNumber}
                        onChange={handleInputChange}
                        required
                        min="1"
                        max="99"
                        placeholder="1-99"
                        className="w-full px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          borderColor: colors.borderLight,
                          backgroundColor: colors.backgroundPrimary,
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
                  </div>
                </div>

                {/* Cricket Information Section */}
                <div className="p-6 rounded-xl shadow-lg" style={{backgroundColor: getNsbmGreen(0.05)}}>
                  <h4 className="text-xl font-bold mb-6 flex items-center" style={{color: colors.textPrimary}}>
                    <div className="p-2 rounded-lg mr-3" style={{backgroundColor: getNsbmGreen(0.1)}}>
                      <Trophy className="w-5 h-5" style={{color: nsbmGreen}} />
                    </div>
                    <span style={{color: nsbmGreen}}>
                      Cricket Information
                    </span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                        Playing Role *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                        className="w-full px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          borderColor: colors.borderLight,
                          backgroundColor: colors.backgroundPrimary,
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
                        <option value="">Select Role</option>
                      <option value="Batsman">Batsman</option>
                      <option value="Bowler">Bowler</option>
                      <option value="All-rounder">All-rounder</option>
                      <option value="Wicket-keeper">Wicket-keeper</option>
                    </select>
                  </div>
                  <div>
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                      Batting Style
                    </label>
                    <select
                      name="battingStyle"
                      value={formData.battingStyle}
                      onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          borderColor: colors.borderLight,
                          backgroundColor: colors.backgroundPrimary,
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
                      <option value="Right-hand bat">Right-hand bat</option>
                      <option value="Left-hand bat">Left-hand bat</option>
                    </select>
                  </div>
                  <div>
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                      Bowling Style
                    </label>
                    <select
                      name="bowlingStyle"
                      value={formData.bowlingStyle}
                      onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          borderColor: colors.borderLight,
                          backgroundColor: colors.backgroundPrimary,
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
                      <option value="Right-arm medium">Right-arm medium</option>
                      <option value="Right-arm fast">Right-arm fast</option>
                      <option value="Right-arm offbreak">Right-arm offbreak</option>
                      <option value="Right-arm legbreak">Right-arm legbreak</option>
                      <option value="Left-arm fast">Left-arm fast</option>
                      <option value="Left-arm medium">Left-arm medium</option>
                      <option value="Left-arm orthodox">Left-arm orthodox</option>
                      <option value="Left-arm chinaman">Left-arm chinaman</option>
                    </select>
                  </div>
                <div>
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                        Joining Date
                    </label>
                    <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                      onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl transition-all duration-200"
                        style={{
                          borderColor: colors.borderLight,
                          backgroundColor: colors.backgroundPrimary,
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
                  </div>
                </div>

                {/* Image Upload Section */}
                <div className="p-6 rounded-xl shadow-lg" style={{backgroundColor: getNsbmGreen(0.05)}}>
                  <h4 className="text-xl font-bold mb-6 flex items-center" style={{color: colors.textPrimary}}>
                    <div className="p-2 rounded-lg mr-3" style={{backgroundColor: getNsbmGreen(0.1)}}>
                      <Upload className="w-5 h-5" style={{color: nsbmGreen}} />
                    </div>
                    <span style={{color: nsbmGreen}}>
                      Image Upload
                    </span>
                  </h4>
                <div>
                    <label className="text-sm font-semibold mb-3 flex items-center" style={{color: colors.textPrimary}}>
                      <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                      Player Photo
                  </label>
                    <div 
                      className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-dashed rounded-xl transition-all duration-300"
                      style={{
                        borderColor: getNsbmGreen(0.3),
                        backgroundColor: getNsbmGreen(0.02)
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = nsbmGreen;
                        e.target.style.backgroundColor = getNsbmGreen(0.05);
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = getNsbmGreen(0.3);
                        e.target.style.backgroundColor = getNsbmGreen(0.02);
                      }}
                    >
                      <div className="space-y-3 text-center">
                        <div 
                          className="p-3 rounded-full mx-auto w-16 h-16 flex items-center justify-center"
                          style={{backgroundColor: getNsbmGreen(0.1)}}
                        >
                          <Upload className="h-8 w-8" style={{color: nsbmGreen}} />
                        </div>
                        <div className="flex text-sm" style={{color: colors.textSecondary}}>
                          <label
                            htmlFor="photo-upload"
                            className="relative cursor-pointer text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                            style={{backgroundColor: nsbmGreen}}
                            onMouseEnter={(e) => e.target.style.backgroundColor = getNsbmGreen(0.8)}
                            onMouseLeave={(e) => e.target.style.backgroundColor = nsbmGreen}
                          >
                            <span>Upload a file</span>
                  <input
                              id="photo-upload"
                    name="photo"
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              onChange={handleFileChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-3 self-center">or drag and drop</p>
                        </div>
                        <p 
                          className="text-xs px-3 py-1 rounded-full inline-block"
                          style={{color: colors.textMuted, backgroundColor: colors.backgroundPrimary}}
                        >
                          PNG, JPG up to 10MB
                        </p>
                        {formData.photo && (
                          <div 
                            className="mt-3 p-3 rounded-lg border"
                            style={{
                              backgroundColor: getNsbmGreen(0.1),
                              borderColor: getNsbmGreen(0.3)
                            }}
                          >
                            <p className="text-sm font-semibold flex items-center justify-center" style={{color: nsbmGreen}}>
                              <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                              ✓ {formData.photo.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs mt-3 text-center" style={{color: colors.textMuted}}>
                      Optional: Upload a clear photo of the player (JPG or PNG format)
                    </p>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-4 pt-8" style={{borderTop: `2px solid ${colors.borderLight}`}}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingPlayer(null);
                      setFormData({
                        universityId: '',
                        name: '',
                        email: '',
                        phone: '',
                        dateOfBirth: '',
                        jerseyNumber: '',
                        role: 'Batsman',
                        battingStyle: 'Right-hand bat',
                        bowlingStyle: 'Right-arm medium',
                        joiningDate: '',
                        photo: null
                      });
                    }}
                    className="px-8 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                    style={{
                      borderColor: colors.borderLight,
                      color: colors.textPrimary,
                      backgroundColor: colors.backgroundPrimary
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = colors.backgroundSecondary;
                      e.target.style.borderColor = colors.borderMedium;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = colors.backgroundPrimary;
                      e.target.style.borderColor = colors.borderLight;
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 text-white rounded-xl transition-all duration-200 font-semibold flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
                    style={{backgroundColor: nsbmGreen}}
                    onMouseEnter={(e) => e.target.style.backgroundColor = getNsbmGreen(0.8)}
                    onMouseLeave={(e) => e.target.style.backgroundColor = nsbmGreen}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    {editingPlayer ? 'Update Player' : 'Add New Player'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerManagement;
