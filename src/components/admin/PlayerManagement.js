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
import PlayerService from '../../services/PlayerService';

// NSBM Brand Colors from Design System
const { colors } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;

// Helper functions for colors with opacity
const getNsbmGreen = (opacity = 1) => getBrandColor('brandPrimary', opacity);

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

const roles = ['All', 'BATSMAN', 'BOWLER', 'ALLROUNDER', 'WICKETKEEPER'];

const base_url = "http://localhost:8080/unicricket360";

const PlayerManagement = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [formData, setFormData] = useState({
    university_id: '',
    name: '',
    email: '',
    contact: '',
    dob: '',
    jersey_no: '',
    player_role: '',
    batting_style: '',
    bowling_style: '',
    joined_date: '',
    image: null
  });

  // Sample data - replace with API calls
  useEffect(() => {
    getAllPlayers();
    // setPlayers(samplePlayers);
    // setFilteredPlayers(samplePlayers);
  }, []);

  // Filter and search players
  useEffect(() => {
    let filtered = players;

    if (searchTerm) {
      filtered = filtered.filter(player =>
        player.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.player_role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.university_d?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    console.log(filterRole);

    if (filterRole !== 'All') {
      filtered = filtered.filter(player => player.player_role === filterRole);
    }

    /* if (filterRole !== 'All') {
      filtered = filtered.filter(
        (player) => player.player_role?.toUpperCase() === filterRole
      );
    } */

    setFilteredPlayers(filtered);

  }, [players, searchTerm, filterRole]);


  const getAllPlayers = async () => {
    let res = await PlayerService.getAll();
    console.log(res);

    if (res.status == 200) {
      if (res.data.data != 0) {
        console.log(res.data.data);
        setPlayers(res.data.data);
        setFilteredPlayers(res.data.data);
      }
    }
  };

  const deletePlayer = async (playerId) => {
    let res = await PlayerService.deletePlayer(playerId);
    console.log(res);

    if (res.status == 200) {
      alert(res.data.message);  
      getAllPlayers();
    } else {
      alert(res.response.data.message);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    let newValue = value;
  
    // Handle contact normalization
    if (name === "contact") {
      newValue = value.replace(/\D/g, ""); // keep only numbers
      if (newValue.startsWith("94")) {
        newValue = "0" + newValue.slice(2);
      }
    }
  
    /* setFormData(prev => {
      const updatedData = { ...prev, [name]: newValue };
  
      // Split full name into first_name and last_name
      if (name === "name") {
        const parts = newValue.trim().split(" ");
        updatedData.first_name = parts[0] || "";
        updatedData.last_name = parts.slice(1).join(" ") || ""; // join remaining parts as last_name
      }
  
      return updatedData;
    }); */

    
    // Split full name into first_name and last_name
    if (name === "name") {
      const parts = newValue.trim().split(" ");
      const fName = parts[0] || "";
      const lName = parts.slice(1).join(" ") || ""; // join remaining parts as last_name

      console.log(fName);
      console.log(lName);
      setFormData(prev => ({ ...prev, [name]: newValue, first_name : fName, last_name: lName}));
    }

    setFormData(prev => ({ ...prev, [name]: newValue}));
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
        image: file
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      if (editingPlayer) {
        // Update existing player
        // setPlayers(prev => prev.map(player => 
        //   player.id === editingPlayer.id ? { ...player, ...formData } : player
        // ));
  
        console.log(formData);
  
        let res = await PlayerService.updatePlayer(formData, editingPlayer.id);
        console.log(res);
  
        if (res.status == 200) {
          alert(res.data.message)
          getAllPlayers();
        } else{
          alert(res.response.data.message)
        }
        
      } else {
  
        console.log(formData);
  
        let res = await PlayerService.savePlayer(formData);
        console.log(res);
  
        if (res.status == 201) {
          alert(res.data.message)
          getAllPlayers();
        } else{
          alert(res.response.data.message)
        }
  
        /* // Add new player
        const newPlayer = {
          id: formData.university_id,
          ...formData,
          runs: 0,
          wickets: 0,
          matches: 0,
          average: 0
        };
        setPlayers(prev => [...prev, newPlayer]); */
      }
    } catch (err) {
      console.error("Error saving player:", err);
    }
    
    
    setShowModal(false);
    setEditingPlayer(null);
    clearForm();
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setFormData(player);
    setShowModal(true);
  };

  const handleDelete = (playerId) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      // setPlayers(prev => prev.filter(player => player.id !== playerId));
      deletePlayer(playerId);
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['First Name', 'Last Name', 'Email', 'Contact', 'Player Role', 'Runs', 'Wickets', 'Matches', 'Average'],
      ...filteredPlayers.map(player => [
        player.first_name,
        player.last_name,
        player.name,
        player.email,
        player.contact,
        player.player_role,
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

  const clearForm = () => {
    setFormData({
      university_id: '',
      name: '',
      email: '',
      contact: '',
      dob: '',
      player_role: '',
      batting_style: '',
      bowling_style: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: '',
      joined_date: '',
      image: ''
    });
  }



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
                          // src={player.image_url}
                          // src={`http://localhost:8080/unicricket360${player.image_url}`}
                          src={`${base_url}${player.image_url}`}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-base font-semibold" style={{color: colors.textPrimary}}>
                          {/* {player.first_name} {player.last_name} */}
                          {player.name}
                        </div>
                        <div className="text-sm" style={{color: colors.textMuted}}>
                          ID: {player.university_id || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Jersey Number */}
                  <td className="px-6 py-4 text-center">
                    {player.jersey_no ? (
                      <div 
                        className="inline-flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold text-white"
                        style={{backgroundColor: nsbmGreen}}
                      >
                        {player.jersey_no}
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
                        {player.contact}
                      </div>
                    </div>
                  </td>

                  {/* Cricket Role */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold" style={{backgroundColor: getNsbmGreen(0.1), color: nsbmGreen}}>
                      {player.player_role}
                      </div>
                      <div className="text-sm" style={{color: colors.textSecondary}}>
                        {player.batting_style}
                      </div>
                      <div className="text-sm" style={{color: colors.textSecondary}}>
                        {player.bowling_style}
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
                            {/* {player.runs} runs */}
                            
                            {player.batting_performances?.reduce((total, bp) => total + bp.runs, 0) || 0} runs
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Target className="w-4 h-4" style={{color: nsbmGreen}} />
                          <span className="text-sm font-semibold" style={{color: nsbmGreen}}>
                            {/* {player.wickets} wkts */}
                            {player.bowling_performances?.reduce((total, bp) => total + bp.wickets, 0) || 0} wkts
                          </span>
                        </div>
                      </div>
                      <div className="text-sm" style={{color: colors.textSecondary}}>
                        {/* Avg: {player.average} */}
                        Avg: {player.batting_performances && player.batting_performances.length > 0
                          ? (
                              player.batting_performances.reduce((sum, bp) => sum + bp.runs, 0) / 
                              player.batting_performances.length
                            ).toFixed(2)
                          : 0
                        }
                      </div>
                      <div className="text-sm" style={{color: colors.textSecondary}}>
                        {/* Matches: {player.matches} */}
                        Matches: {player.matches || player.batting_performances?.length || 0}
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
                        src={`${base_url}${player.image_url}`}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-semibold" style={{color: colors.textPrimary}}>
                      {/* {player.first_name} {player.last_name} */}
                      {player.name}
                      </div>
                      <div className="text-sm" style={{color: colors.textMuted}}>
                        ID: {player.university_id || 'N/A'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {player.jersey_no ? (
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{backgroundColor: nsbmGreen}}
                      >
                        {player.jersey_no}
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
                    {player.contact}
                  </div>
                </div>

                {/* Cricket Role */}
                <div className="space-y-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold" style={{backgroundColor: getNsbmGreen(0.1), color: nsbmGreen}}>
                    {player.player_role}
                  </div>
                  <div className="text-sm" style={{color: colors.textSecondary}}>
                    {player.batting_style}
                  </div>
                  <div className="text-sm" style={{color: colors.textSecondary}}>
                    {player.bowling_style}
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Trophy className="w-4 h-4" style={{color: nsbmGreen}} />
                      <span className="text-sm font-semibold" style={{color: nsbmGreen}}>
                        {player.batting_performances.runs} runs
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
                    clearForm();
                  }}
                  className="p-2 rounded-full transition-all duration-200"
                  style={{color: colors.textMuted}}
                  onMouseEnter={(e) => e.target.style.color = colors.error}
                  onMouseLeave={(e) => e.target.style.color = colors.textMuted}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form /* onSubmit={handleSubmit} */ className="space-y-6">
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
                        name="university_id"
                        value={formData.university_id}
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
                      name="contact"
                      value={formData.contact}
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
                      maxLength={10}          // limits to 10 characters
                      pattern="[0-9]{10}"     // requires exactly 10 digits
                    />
                  </div>
                  <div>
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
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
                        name="jersey_no"
                        value={formData.jersey_no}
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
                      name="player_role"
                      value={formData.player_role}
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
                        <option value="BATSMAN">Batsman</option>
                        <option value="BOWLER">Bowler</option>
                        <option value="ALLROUNDER">All-rounder</option>
                        <option value="WICKETKEEPER">Wicket-keeper</option>
                    </select>
                  </div>
                  <div>
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                      Batting Style
                    </label>
                    <select
                      name="batting_style"
                      value={formData.batting_style}
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
                        <option value="">Select</option>
                        <option value="RIGHT_HAND">Right Hand</option>
                        <option value="LEFT_HAND">Left Hand</option>
                    </select>
                  </div>
                  <div>
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                      Bowling Style
                    </label>
                    <select
                      name="bowling_style"
                      value={formData.bowling_style}
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
                      <option value="">Select</option>
                      <option value="RIGHT_ARM_MEDIUM">Right-arm medium</option>
                      <option value="RIGHT_ARM_FAST">Right-arm fast</option>
                      <option value="RIGHT_ARM_OFF_BREAK">Right-arm offbreak</option>
                      <option value="RIGHT_ARM_LEG_BREAK">Right-arm legbreak</option>
                      <option value="LEFT_ARM_FAST">Left-arm fast</option>
                      <option value="LEFT_ARM_MEDIUM">Left-arm medium</option>
                      <option value="LEFT_ARM_ORTHODOX">Left-arm orthodox</option>
                      <option value="LEFT_ARM_CHINAMAN">Left-arm chinaman</option>
                    </select>
                  </div>
                <div>
                      <label className="text-sm font-semibold mb-2 flex items-center" style={{color: colors.textPrimary}}>
                        <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                        Joining Date
                    </label>
                    <input
                        type="date"
                        name="joined_date"
                        value={formData.joined_date}
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
                            htmlFor="image-upload"
                            className="relative cursor-pointer text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                            style={{backgroundColor: nsbmGreen}}
                            onMouseEnter={(e) => e.target.style.backgroundColor = getNsbmGreen(0.8)}
                            onMouseLeave={(e) => e.target.style.backgroundColor = nsbmGreen}
                          >
                            <span>Upload a file</span>
                            <input
                              id="image-upload"
                              name="image"
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
                        {formData.image && (
                          <div 
                            className="mt-3 p-3 rounded-lg border"
                            style={{
                              backgroundColor: getNsbmGreen(0.1),
                              borderColor: getNsbmGreen(0.3)
                            }}
                          >
                            <p className="text-sm font-semibold flex items-center justify-center" style={{color: nsbmGreen}}>
                              <span className="w-2 h-2 rounded-full mr-2" style={{backgroundColor: nsbmGreen}}></span>
                              ✓ {formData.image.name}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs mt-3 text-center" style={{color: colors.textMuted}}>
                      Optional: Upload a clear image of the player (JPG or PNG format)
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
                      clearForm();
                      
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
                    type="button"
                    onClick={handleSubmit}
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
