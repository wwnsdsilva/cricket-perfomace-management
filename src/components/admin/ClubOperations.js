import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  MapPin, 
  Clock, 
  Users, 
  Trophy,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  Heart,
  Save,
  Activity
} from 'lucide-react';

const ClubOperations = () => {
  const [activeTab, setActiveTab] = useState('matches');
  const [matches, setMatches] = useState([]);
  const [events, setEvents] = useState([]);
  const [trainingSchedule, setTrainingSchedule] = useState([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingTraining, setEditingTraining] = useState(null);
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [fitnessData, setFitnessData] = useState({});
  const [editingPlayer, setEditingPlayer] = useState(null);

  // Fitness management functions
  const handleFitnessInput = (playerId, field, value) => {
    setFitnessData(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        [field]: value
      }
    }));
  };

  const saveFitnessData = (playerId) => {
    console.log('Saving fitness data for player:', playerId, fitnessData[playerId]);
    setEditingPlayer(null);
  };

  const openFitnessModal = (playerId) => {
    setEditingPlayer(playerId);
  };

  // Sample players data for fitness management
  const samplePlayers = [
    { id: 1, name: 'Maneendra Jayathilaka', role: 'Batsman', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', email: 'maneendra@nsbm.ac.lk', phone: '+94 71 000 0001' },
    { id: 2, name: 'Monil Jason', role: 'All-rounder', photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', email: 'monil@nsbm.ac.lk', phone: '+94 71 000 0002' },
    { id: 3, name: 'Dilhara Polgampola', role: 'Bowler', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', email: 'dilhara@nsbm.ac.lk', phone: '+94 71 000 0003' },
    { id: 4, name: 'Lahiru Abhesinghe', role: 'Batsman', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', email: 'lahiru@nsbm.ac.lk', phone: '+94 71 000 0004' },
    { id: 5, name: 'Asitha Wanninayaka', role: 'Bowler', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', email: 'asitha@nsbm.ac.lk', phone: '+94 71 000 0005' },
    { id: 6, name: 'Suviru Sathnidu', role: 'All-rounder', photo: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face', email: 'suviru@nsbm.ac.lk', phone: '+94 71 000 0006' },
    { id: 7, name: 'Kavisha Weerasinghe', role: 'Wicket-keeper', photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face', email: 'kavisha@nsbm.ac.lk', phone: '+94 71 000 0007' },
    { id: 8, name: 'Chamod Hasalanka', role: 'Batsman', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face', email: 'chamod@nsbm.ac.lk', phone: '+94 71 000 0008' },
    { id: 9, name: 'Dulaj Bandara', role: 'Bowler', photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face', email: 'dulaj@nsbm.ac.lk', phone: '+94 71 000 0009' }
  ];

  // Sample fitness data
  const initialFitnessData = {
    1: { sprint20m: 3.2, beepTest: 12.5, pushUps: 45, sitUps: 60, status: 'Healthy', lastUpdated: '2024-01-15' },
    2: { sprint20m: 3.4, beepTest: 11.8, pushUps: 38, sitUps: 55, status: 'Healthy', lastUpdated: '2024-01-14' },
    3: { sprint20m: 3.1, beepTest: 12.1, pushUps: 42, sitUps: 58, status: 'Recovering', lastUpdated: '2024-01-13' },
    4: { sprint20m: 3.3, beepTest: 12.0, pushUps: 40, sitUps: 52, status: 'Healthy', lastUpdated: '2024-01-12' },
    5: { sprint20m: 3.5, beepTest: 11.5, pushUps: 35, sitUps: 48, status: 'Healthy', lastUpdated: '2024-01-11' }
  };

  const [matchForm, setMatchForm] = useState({
    opponent: '',
    date: '',
    time: '',
    venue: '',
    type: 'T20',
    notes: '',
    image: ''
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    image: '',
    featured: false
  });

  const [trainingForm, setTrainingForm] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    venue: '',
    coach: '',
    type: 'Batting',
    description: '',
    maxPlayers: 20,
    image: ''
  });

  // Sample data
  useEffect(() => {
    const sampleMatches = [
      {
        id: 1,
        opponent: 'City Cricket Club',
        date: '2024-01-15',
        time: '14:00',
        venue: 'Central Ground',
        type: 'T20',
        notes: 'Important league match',
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop',
        status: 'upcoming'
      },
      {
        id: 2,
        opponent: 'Riverside CC',
        date: '2024-01-08',
        time: '10:00',
        venue: 'Riverside Park',
        type: 'ODI',
        notes: 'Friendly match',
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop',
        status: 'completed',
        result: 'Won',
        score: '245/8 (50) vs 198/10 (45.2)'
      }
    ];

    const sampleEvents = [
      {
        id: 1,
        title: 'Annual Cricket Awards Night',
        date: '2024-02-15',
        time: '19:00',
        venue: 'Grand Hotel Ballroom',
        description: 'Celebrating the best performances of the season',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=200&fit=crop',
        featured: true
      },
      {
        id: 2,
        title: 'Youth Training Camp',
        date: '2024-01-20',
        time: '09:00',
        venue: 'Club Ground',
        description: 'Special training session for young players',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
        featured: false
      }
    ];


    const sampleTrainingSchedule = [
      {
        id: 1,
        title: 'Batting Practice Session',
        date: '2024-01-15',
        time: '09:00',
        duration: '2 hours',
        venue: 'Main Ground',
        coach: 'Coach Johnson',
        type: 'Batting',
        description: 'Focus on technique and power hitting',
        maxPlayers: 15,
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop',
        status: 'scheduled',
        registeredPlayers: 12,
        attendance: [
          { id: 1, name: 'John Smith', present: false },
          { id: 2, name: 'Sarah Johnson', present: false },
          { id: 3, name: 'David Wilson', present: false },
          { id: 4, name: 'Mike Brown', present: false },
          { id: 5, name: 'Lisa Davis', present: false }
        ]
      },
      {
        id: 2,
        title: 'Bowling Workshop',
        date: '2024-01-18',
        time: '14:00',
        duration: '1.5 hours',
        venue: 'Practice Nets',
        coach: 'Coach Smith',
        type: 'Bowling',
        description: 'Fast bowling techniques and variations',
        maxPlayers: 10,
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop',
        status: 'scheduled',
        registeredPlayers: 8,
        attendance: [
          { id: 1, name: 'John Smith', present: false },
          { id: 2, name: 'Sarah Johnson', present: false },
          { id: 3, name: 'David Wilson', present: false },
          { id: 4, name: 'Mike Brown', present: false },
          { id: 5, name: 'Lisa Davis', present: false }
        ]
      },
      {
        id: 3,
        title: 'Fielding Drills',
        date: '2024-01-12',
        time: '16:00',
        duration: '1 hour',
        venue: 'Outfield',
        coach: 'Coach Davis',
        type: 'Fielding',
        description: 'Ground fielding and catching practice',
        maxPlayers: 20,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
        status: 'completed',
        registeredPlayers: 18,
        attendance: [
          { id: 1, name: 'John Smith', present: true },
          { id: 2, name: 'Sarah Johnson', present: true },
          { id: 3, name: 'David Wilson', present: false },
          { id: 4, name: 'Mike Brown', present: true },
          { id: 5, name: 'Lisa Davis', present: true }
        ]
      }
    ];

    setMatches(sampleMatches);
    setEvents(sampleEvents);
    setTrainingSchedule(sampleTrainingSchedule);
    setFitnessData(initialFitnessData);
  }, []);

  const handleMatchSubmit = (e) => {
    e.preventDefault();
    if (editingMatch) {
      setMatches(prev => prev.map(match => 
        match.id === editingMatch.id ? { ...match, ...matchForm } : match
      ));
    } else {
      const newMatch = {
        id: Date.now(),
        ...matchForm,
        status: 'upcoming'
      };
      setMatches(prev => [...prev, newMatch]);
    }
    setShowMatchModal(false);
    setEditingMatch(null);
    setMatchForm({
      opponent: '',
      date: '',
      time: '',
      venue: '',
      type: 'T20',
      notes: '',
      image: ''
    });
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id ? { ...event, ...eventForm } : event
      ));
    } else {
      const newEvent = {
        id: Date.now(),
        ...eventForm
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setShowEventModal(false);
    setEditingEvent(null);
    setEventForm({
      title: '',
      date: '',
      time: '',
      venue: '',
      description: '',
      image: '',
      featured: false
    });
  };

  const handleTrainingSubmit = (e) => {
    e.preventDefault();
    if (editingTraining) {
      setTrainingSchedule(prev => prev.map(training => 
        training.id === editingTraining.id ? { ...training, ...trainingForm } : training
      ));
    } else {
      const newTraining = {
        id: Date.now(),
        ...trainingForm,
        status: 'scheduled',
        registeredPlayers: 0,
        attendance: [
          { id: 1, name: 'John Smith', present: false },
          { id: 2, name: 'Sarah Johnson', present: false },
          { id: 3, name: 'David Wilson', present: false },
          { id: 4, name: 'Mike Brown', present: false },
          { id: 5, name: 'Lisa Davis', present: false }
        ]
      };
      setTrainingSchedule(prev => [...prev, newTraining]);
    }
    setShowTrainingModal(false);
    setEditingTraining(null);
    setTrainingForm({
      title: '',
      date: '',
      time: '',
      duration: '',
      venue: '',
      coach: '',
      type: 'Batting',
      description: '',
      maxPlayers: 20,
      image: ''
    });
  };

  const handleEditMatch = (match) => {
    setEditingMatch(match);
    setMatchForm(match);
    setShowMatchModal(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventForm(event);
    setShowEventModal(true);
  };

  const handleEditTraining = (training) => {
    setEditingTraining(training);
    setTrainingForm(training);
    setShowTrainingModal(true);
  };

  const handleDeleteMatch = (id) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      setMatches(prev => prev.filter(match => match.id !== id));
    }
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== id));
    }
  };

  const handleDeleteTraining = (id) => {
    if (window.confirm('Are you sure you want to delete this training session?')) {
      setTrainingSchedule(prev => prev.filter(training => training.id !== id));
    }
  };

  const toggleAttendance = (sessionId, playerId) => {
    setTrainingSchedule(prev => prev.map(session => 
      session.id === sessionId 
        ? {
            ...session,
            attendance: session.attendance.map(player =>
              player.id === playerId ? { ...player, present: !player.present } : player
            )
          }
        : session
    ));
  };

  const getAttendancePercentage = (session) => {
    const present = session.attendance.filter(p => p.present).length;
    return ((present / session.attendance.length) * 100).toFixed(1);
  };

  const getFilteredAttendance = () => {
    if (attendanceFilter === 'all') return trainingSchedule;
    return trainingSchedule.filter(session => {
      const percentage = parseFloat(getAttendancePercentage(session));
      switch (attendanceFilter) {
        case 'high': return percentage >= 80;
        case 'medium': return percentage >= 60 && percentage < 80;
        case 'low': return percentage < 60;
        default: return true;
      }
    });
  };

  const tabs = [
    { id: 'matches', name: 'Match Scheduling', icon: Trophy },
    { id: 'events', name: 'Event Scheduling', icon: Calendar },
    { id: 'training-schedule', name: 'Training Schedule', icon: Calendar },
    { id: 'attendance', name: 'Training Attendance', icon: Users },
    { id: 'fitness', name: 'Player Fitness Management', icon: Heart }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Club Operations</h1>
          <p className="text-gray-600">Manage matches, events, and training sessions</p>
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
          {/* Match Scheduling Tab */}
          {activeTab === 'matches' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Match Schedule</h3>
                <button
                  onClick={() => setShowMatchModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Match
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match) => (
                  <div key={match.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gray-200 relative">
                      {match.image && (
                        <img
                          src={match.image}
                          alt={match.opponent}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          match.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {match.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">vs {match.opponent}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(match.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {match.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {match.venue}
                        </div>
                        <div className="flex items-center">
                          <Trophy className="w-4 h-4 mr-2" />
                          {match.type}
                        </div>
                      </div>
                      {match.notes && (
                        <p className="text-sm text-gray-500 mt-2">{match.notes}</p>
                      )}
                      {match.result && (
                        <div className="mt-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            match.result === 'Won' 
                              ? 'bg-green-100 text-green-800' 
                              : match.result === 'Lost'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {match.result}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">{match.score}</p>
                        </div>
                      )}
                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          onClick={() => handleEditMatch(match)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMatch(match.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Scheduling Tab */}
          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Club Events</h3>
                <button
                  onClick={() => setShowEventModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Event
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gray-200 relative">
                      {event.image && (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {event.featured && (
                        <div className="absolute top-2 right-2">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.venue}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{event.description}</p>
                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Training Schedule Tab */}
          {activeTab === 'training-schedule' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Training Schedule</h3>
                <button
                  onClick={() => setShowTrainingModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Training
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingSchedule.map((training) => (
                  <div key={training.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 bg-gray-200 relative">
                      {training.image && (
                        <img
                          src={training.image}
                          alt={training.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          training.status === 'scheduled' 
                            ? 'bg-blue-100 text-blue-800' 
                            : training.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {training.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{training.title}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(training.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {training.time} ({training.duration})
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {training.venue}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {training.coach}
                        </div>
                        <div className="flex items-center">
                          <Trophy className="w-4 h-4 mr-2" />
                          {training.type}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {training.registeredPlayers}/{training.maxPlayers} players
                          </span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(training.registeredPlayers / training.maxPlayers) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{training.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditTraining(training)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTraining(training.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => setActiveTab('attendance')}
                          className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          <Users className="w-3 h-3 mr-1" />
                          Mark Attendance
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Training Attendance Tab */}
          {activeTab === 'attendance' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Training Attendance</h3>
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={attendanceFilter}
                      onChange={(e) => setAttendanceFilter(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="all">All Sessions</option>
                      <option value="high">High Attendance (≥80%)</option>
                      <option value="medium">Medium Attendance (60-79%)</option>
                      <option value="low">Low Attendance (&lt;60%)</option>
                    </select>
                  </div>
                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {getFilteredAttendance().map((session) => (
                  <div key={session.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {session.title} - {new Date(session.date).toLocaleDateString()}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {session.attendance.filter(p => p.present).length} of {session.attendance.length} players present
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span><Clock className="w-4 h-4 inline mr-1" />{session.time}</span>
                          <span><MapPin className="w-4 h-4 inline mr-1" />{session.venue}</span>
                          <span><Users className="w-4 h-4 inline mr-1" />{session.coach}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {getAttendancePercentage(session)}%
                          </div>
                          <div className="text-sm text-gray-500">Attendance</div>
                        </div>
                        <div className="w-16 h-16">
                          <div className="relative w-16 h-16">
                            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                              <path
                                className="text-gray-200"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                className="text-blue-600"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${getAttendancePercentage(session)}, 100`}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Player</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {session.attendance.map((player) => (
                            <tr key={player.id}>
                              <td className="px-4 py-2 text-sm font-medium text-gray-900">
                                {player.name}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {player.present ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Present
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Absent
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-2 text-center">
                                <button
                                  onClick={() => toggleAttendance(session.id, player.id)}
                                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                                    player.present
                                      ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                                  }`}
                                >
                                  {player.present ? 'Mark Absent' : 'Mark Present'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Match Modal */}
      {showMatchModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingMatch ? 'Edit Match' : 'Schedule New Match'}
                </h3>
                <button
                  onClick={() => {
                    setShowMatchModal(false);
                    setEditingMatch(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleMatchSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opponent *
                    </label>
                    <input
                      type="text"
                      value={matchForm.opponent}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, opponent: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={matchForm.date}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, date: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={matchForm.time}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, time: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Venue *
                    </label>
                    <input
                      type="text"
                      value={matchForm.venue}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, venue: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Match Type *
                    </label>
                    <select
                      value={matchForm.type}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, type: e.target.value }))}
                      required
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={matchForm.image}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    value={matchForm.notes}
                    onChange={(e) => setMatchForm(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMatchModal(false);
                      setEditingMatch(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingMatch ? 'Update Match' : 'Schedule Match'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Training Schedule Modal */}
      {showTrainingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingTraining ? 'Edit Training Session' : 'Schedule New Training'}
                </h3>
                <button
                  onClick={() => {
                    setShowTrainingModal(false);
                    setEditingTraining(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleTrainingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Training Title *
                    </label>
                    <input
                      type="text"
                      value={trainingForm.title}
                      onChange={(e) => setTrainingForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={trainingForm.date}
                      onChange={(e) => setTrainingForm(prev => ({ ...prev, date: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={trainingForm.time}
                      onChange={(e) => setTrainingForm(prev => ({ ...prev, time: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration *
                    </label>
                    <select
                      value={trainingForm.duration}
                      onChange={(e) => setTrainingForm(prev => ({ ...prev, duration: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Duration</option>
                      <option value="30 minutes">30 minutes</option>
                      <option value="1 hour">1 hour</option>
                      <option value="1.5 hours">1.5 hours</option>
                      <option value="2 hours">2 hours</option>
                      <option value="3 hours">3 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Venue *
                    </label>
                    <input
                      type="text"
                      value={trainingForm.venue}
                      onChange={(e) => setTrainingForm(prev => ({ ...prev, venue: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Coach *
                    </label>
                    <input
                      type="text"
                      value={trainingForm.coach}
                      onChange={(e) => setTrainingForm(prev => ({ ...prev, coach: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Training Type *
                    </label>
                    <select
                      value={trainingForm.type}
                      onChange={(e) => setTrainingForm(prev => ({ ...prev, type: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Batting">Batting</option>
                      <option value="Bowling">Bowling</option>
                      <option value="Fielding">Fielding</option>
                      <option value="Fitness">Fitness</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Players *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={trainingForm.maxPlayers}
                      onChange={(e) => setTrainingForm(prev => ({ ...prev, maxPlayers: parseInt(e.target.value) }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={trainingForm.image}
                      onChange={(e) => setTrainingForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={trainingForm.description}
                    onChange={(e) => setTrainingForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTrainingModal(false);
                      setEditingTraining(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingTraining ? 'Update Training' : 'Schedule Training'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingEvent ? 'Edit Event' : 'Schedule New Event'}
                </h3>
                <button
                  onClick={() => {
                    setShowEventModal(false);
                    setEditingEvent(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      value={eventForm.title}
                      onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm(prev => ({ ...prev, time: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Venue *
                    </label>
                    <input
                      type="text"
                      value={eventForm.venue}
                      onChange={(e) => setEventForm(prev => ({ ...prev, venue: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={eventForm.image}
                      onChange={(e) => setEventForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={eventForm.featured}
                      onChange={(e) => setEventForm(prev => ({ ...prev, featured: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      Featured Event
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEventModal(false);
                      setEditingEvent(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingEvent ? 'Update Event' : 'Schedule Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Player Fitness Management Tab */}
      {activeTab === 'fitness' && (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Player Fitness Management</h3>
            <div className="mt-4 sm:mt-0 flex items-center space-x-4">
              <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                <Download className="w-4 h-4 mr-1" />
                Export Data
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {samplePlayers.map((player) => (
              <div key={player.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={player.photo} 
                      alt={player.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{player.name}</h4>
                    <p className="text-sm text-gray-500">{player.role}</p>
                    <p className="text-xs text-gray-400">{player.email}</p>
                  </div>
                  <button
                    onClick={() => openFitnessModal(player.id)}
                    className="p-2 text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">20m Sprint (s)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={fitnessData[player.id]?.sprint20m || ''}
                        onChange={(e) => handleFitnessInput(player.id, 'sprint20m', parseFloat(e.target.value))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Beep Test (level)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={fitnessData[player.id]?.beepTest || ''}
                        onChange={(e) => handleFitnessInput(player.id, 'beepTest', parseFloat(e.target.value))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0.0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Push-ups</label>
                      <input
                        type="number"
                        value={fitnessData[player.id]?.pushUps || ''}
                        onChange={(e) => handleFitnessInput(player.id, 'pushUps', parseInt(e.target.value))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Sit-ups</label>
                      <input
                        type="number"
                        value={fitnessData[player.id]?.sitUps || ''}
                        onChange={(e) => handleFitnessInput(player.id, 'sitUps', parseInt(e.target.value))}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={fitnessData[player.id]?.status || 'Healthy'}
                      onChange={(e) => handleFitnessInput(player.id, 'status', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Healthy">Healthy</option>
                      <option value="Recovering">Recovering</option>
                      <option value="Injured">Injured</option>
                      <option value="Rest">Rest</option>
                    </select>
                  </div>

                  <div className="text-xs text-gray-500">
                    Last updated: {fitnessData[player.id]?.lastUpdated || 'Never'}
                  </div>

                  <button
                    onClick={() => saveFitnessData(player.id)}
                    className="w-full inline-flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save Fitness Data
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Fitness Summary */}
          <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Fitness Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Object.values(fitnessData).filter(data => data?.status === 'Healthy').length}
                </div>
                <div className="text-sm text-gray-600">Healthy Players</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {Object.values(fitnessData).filter(data => data?.status === 'Recovering').length}
                </div>
                <div className="text-sm text-gray-600">Recovering</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {Object.values(fitnessData).filter(data => data?.status === 'Injured').length}
                </div>
                <div className="text-sm text-gray-600">Injured</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Object.values(fitnessData).filter(data => data?.status === 'Rest').length}
                </div>
                <div className="text-sm text-gray-600">Rest</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubOperations;
