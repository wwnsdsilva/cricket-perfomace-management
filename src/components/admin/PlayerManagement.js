import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Download, 
  Upload,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Trophy,
  Target,
  TrendingUp,
  X
} from 'lucide-react';

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
    role: 'Batsman',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    joiningDate: '',
    photo: ''
  });

  // Sample data - replace with API calls
  useEffect(() => {
    const samplePlayers = [
      {
        id: 'NSBM001',
        universityId: 'NSBM001',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 234-567-8900',
        dateOfBirth: '1995-03-15',
        role: 'Batsman',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm offbreak',
        address: '123 Main St, City, State',
        emergencyContact: 'Jane Smith',
        emergencyPhone: '+1 234-567-8901',
        joiningDate: '2023-01-15',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        runs: 1250,
        wickets: 5,
        matches: 15,
        average: 45.2
      },
      {
        id: 'NSBM002',
        universityId: 'NSBM002',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1 234-567-8902',
        dateOfBirth: '1992-07-22',
        role: 'Bowler',
        battingStyle: 'Left-hand bat',
        bowlingStyle: 'Left-arm fast',
        address: '456 Oak Ave, City, State',
        emergencyContact: 'Mike Johnson',
        emergencyPhone: '+1 234-567-8903',
        joiningDate: '2023-02-01',
        photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        runs: 320,
        wickets: 28,
        matches: 12,
        average: 18.5
      },
      {
        id: 'NSBM003',
        universityId: 'NSBM003',
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        phone: '+1 234-567-8904',
        dateOfBirth: '1988-11-08',
        role: 'All-rounder',
        battingStyle: 'Right-hand bat',
        bowlingStyle: 'Right-arm medium',
        address: '789 Pine St, City, State',
        emergencyContact: 'Lisa Wilson',
        emergencyPhone: '+1 234-567-8905',
        joiningDate: '2022-09-10',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Player Management</h1>
          <p className="text-gray-600">Manage your cricket club players</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Player
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Player
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={player.photo}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{player.name}</div>
                        <div className="text-sm text-gray-500">University ID: {player.universityId || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{player.email}</div>
                    <div className="text-sm text-gray-500">{player.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {player.role}
                    </span>
                    <div className="text-sm text-gray-500 mt-1">{player.battingStyle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
                          <span>{player.runs} runs</span>
                        </div>
                        <div className="flex items-center">
                          <Target className="w-4 h-4 text-red-500 mr-1" />
                          <span>{player.wickets} wkts</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Avg: {player.average} | Matches: {player.matches}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(player)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(player.id)}
                        className="text-red-600 hover:text-red-900"
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
      </div>

      {/* Add/Edit Player Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingPlayer ? 'Edit Player' : 'Add New Player'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingPlayer(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      University ID *
                    </label>
                    <input
                      type="text"
                      name="universityId"
                      value={formData.universityId}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., NSBM001"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Batsman">Batsman</option>
                      <option value="Bowler">Bowler</option>
                      <option value="All-rounder">All-rounder</option>
                      <option value="Wicket-keeper">Wicket-keeper</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Joining Date
                    </label>
                    <input
                      type="date"
                      name="joiningDate"
                      value={formData.joiningDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Batting Style
                    </label>
                    <select
                      name="battingStyle"
                      value={formData.battingStyle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Right-hand bat">Right-hand bat</option>
                      <option value="Left-hand bat">Left-hand bat</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bowling Style
                    </label>
                    <select
                      name="bowlingStyle"
                      value={formData.bowlingStyle}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Phone
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photo"
                    value={formData.photo}
                    onChange={handleInputChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingPlayer(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingPlayer ? 'Update Player' : 'Add Player'}
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
