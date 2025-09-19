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
  AlertTriangle,
  X
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { NSBM_DESIGN_SYSTEM, getBrandColor } from '../../styles/nsbm-design-system';
import MatchService from '../../services/MatchService';
import TeamService from '../../services/TeamService';
import EventService from '../../services/EventService';
import SessionService from '../../services/SessionService';
import PlayerService from '../../services/PlayerService';
import FitnessService from '../../services/FitnessService';
import InjuryService from '../../services/InjuryService';

// NSBM Brand Colors from Design System
const { colors } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;
const nsbmBlue = colors.brandSecondary;
const nsbmGold = colors.brandAccent;

// Helper functions for colors with opacity
const getNsbmGreen = (opacity = 1) => getBrandColor('brandPrimary', opacity);
const getNsbmBlue = (opacity = 1) => getBrandColor('brandSecondary', opacity);

// done
const sampleMatches = [
  {
    id: 1,
    opponent: 'APIIT',
    date: '2024-01-15',
    time: '14:00',
    venue: 'Central Ground',
    match_type: 'T20',
    description: 'Important league match',
    status: 'upcoming'
  },
  {
    id: 2,
    opponent: 'KDU',
    date: '2024-01-08',
    time: '10:00',
    venue: 'Riverside Park',
    match_type: 'T10',
    description: 'Friendly match',
    status: 'completed',
    result: 'WIN',
    score: '245/8 (50) vs 198/10 (45.2)'
  }
];

// done
const sampleEvents = [
  {
    id: 1,
    event_title: 'Annual Cricket Awards Night',
    date: '2024-02-15',
    time: '19:00',
    venue: 'Grand Hotel Ballroom',
    description: 'Celebrating the best performances of the season',
    is_featured: true,
    image: null
  },
  {
    id: 2,
    event_title: 'Youth Training Camp',
    date: '2024-01-20',
    time: '09:00',
    venue: 'Club Ground',
    description: 'Special training session for young players',
    is_featured: false,
    image: null
  }
];

// done
const sampleTrainingSchedule = [
  {
    id: 1,
    title: 'Batting Practice Session',
    date: '2024-01-15',
    time: '09:00',
    venue: 'Main Ground',
    coach: 'Coach Johnson',
    description: 'Focus on technique and power hitting',
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
    venue: 'Practice Nets',
    coach: 'Coach Smith',
    description: 'Fast bowling techniques and variations',
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
    venue: 'Outfield',
    coach: 'Coach Davis',
    description: 'Ground fielding and catching practice',
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

// Sample fitness data
const initialFitnessData = {
  1: { sprint_time: 3.2, beep_level: 12.5, status: 'Fit (Excellent)', date: '2024-01-15' },
  2: { sprint_time: 3.4, beep_level: 11.8, status: 'Fit (Excellent)', date: '2024-01-14' },
  3: { sprint_time: 3.1, beep_level: 12.1, status: 'Recovering', date: '2024-01-13' },
  4: { sprint_time: 3.3, beep_level: 12.0, status: 'Fit (Excellent)', date: '2024-01-12' },
  5: { sprint_time: 3.5, beep_level: 11.5, status: 'Fit (Excellent)', date: '2024-01-11' }
};

// done
const sampleInjuries = [
  {
    id: 1,
    playerName: 'Monil Jason',
    injury_type: 'Ankle Sprain',
    date_reported: '2024-01-10',
    recovery_days: 14,
    status: 'Recovering'
  },
  {
    id: 2,
    playerName: 'Dulaj Bandara',
    injury_type: 'Shoulder Strain',
    date_reported: '2024-01-08',
    recovery_days: 21,
    status: 'Recovering'
  },
  {
    id: 3,
    playerName: 'Suviru Sathnidu',
    injury_type: 'Knee Injury',
    date_reported: '2024-01-05',
    recovery_days: 30,
    status: 'Recovering'
  }
];

// Sample players data for fitness management - done
const samplePlayers = [
  { id: 1, name: 'Maniya Silva', role: 'Batsman', photo: '/images/gallery/players/maniya.jpg', email: 'maniya@nsbm.ac.lk', phone: '+94 77 123 4567' },
  { id: 2, name: 'Dulaj Rajapaksa', role: 'All-rounder', photo: '/images/gallery/players/dulaj.jpg', email: 'dulaj@nsbm.ac.lk', phone: '+94 77 234 5678' },
  { id: 3, name: 'Suviru Perera', role: 'Bowler', photo: '/images/gallery/players/suviru.jpg', email: 'suviru@nsbm.ac.lk', phone: '+94 77 345 6789' },
  { id: 4, name: 'Lahiru Fernando', role: 'Batsman', photo: '/images/gallery/players/lahiru.jpeg', email: 'lahiru@nsbm.ac.lk', phone: '+94 77 456 7890' },
  { id: 5, name: 'Asitha', role: 'Bowler', photo: '/images/gallery/players/asitha.jpeg', email: 'asitha@nsbm.ac.lk', phone: '+94 77 567 8901' },
  { id: 6, name: 'Suviru Perera', role: 'All-rounder', photo: '/images/gallery/players/suviru.jpg', email: 'suviru@nsbm.ac.lk', phone: '+94 77 678 9012' },
  { id: 7, name: 'Maniya Silva', role: 'Wicket-keeper', photo: '/images/gallery/players/maniya.jpg', email: 'maniya@nsbm.ac.lk', phone: '+94 77 789 0123' },
  { id: 8, name: 'Lahiru Fernando', role: 'Batsman', photo: '/images/gallery/players/lahiru.jpeg', email: 'lahiru@nsbm.ac.lk', phone: '+94 77 890 1234' },
  { id: 9, name: 'Dulaj Rajapaksa', role: 'Bowler', photo: '/images/gallery/players/dulaj.jpg', email: 'dulaj@nsbm.ac.lk', phone: '+94 77 901 2345' }
];

const tabs = [
  { id: 'matches', name: 'Match Scheduling', icon: Trophy },
  { id: 'events', name: 'Event Scheduling', icon: Calendar },
  { id: 'training-schedule', name: 'Training Schedule', icon: Calendar },
  { id: 'attendance', name: 'Training Attendance', icon: Users },
  { id: 'fitness', name: 'Player Fitness Management', icon: Heart },
  { id: 'injuries', name: 'Injury Management', icon: AlertTriangle }
];

const base_url = "http://localhost:8080/unicricket360";

const ClubOperations = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('matches');
  const [matches, setMatches] = useState([]); // all matches fetched from BE
  const [events, setEvents] = useState([]);
  const [players, setPlayers] = useState([]);
  const [trainingSchedule, setTrainingSchedule] = useState([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [editingMatch, setEditingMatch] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingTraining, setEditingTraining] = useState(null);
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [fitnessData, setFitnessData] = useState([]);
  const [injuries, setInjuries] = useState([]);
  const [showInjuryModal, setShowInjuryModal] = useState(false);
  const [editingInjury, setEditingInjury] = useState(null);
  const [injuryForm, setInjuryForm] = useState({
    player: {
      id: 0,
      name: '',
    },
    injury_type: '',
    date_reported: '',
    recovery_days: '',
    status: ''
  });
  const [matchForm, setMatchForm] = useState({
    opponent: '',
    date: '',
    time: '',
    venue: '',
    match_type: '',
    description: '',
    scheduled_by: {
      id: parseInt(localStorage.getItem('user_id'), 10)
    },
    status: ""
  });

  const [eventForm, setEventForm] = useState({
    event_title: '',
    date: '',
    time: '',
    venue: '',
    description: '',
    is_featured: false,
    image: null,
    created_by: {
      id: parseInt(localStorage.getItem('user_id'), 10)
    },
  });

  const [trainingForm, setTrainingForm] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    coach: '',
    description: ''
  });
  const [opponents, setOpponents] = useState([]);
  

  useEffect(() => {
    getAllMatches();
    fetchOpponents();
    getAllEvents();
    getAllTrainingSessionsWithAttendance();
    getAllPlayers();
    getAllFitnessData();
    getAllInjuries();
    // setMatches(sampleMatches);
    // setEvents(sampleEvents);
    // setTrainingSchedule(sampleTrainingSchedule);
    // setFitnessData(initialFitnessData);
    // setInjuries(sampleInjuries);

  }, []);


  // ------------------------------- API CALLS ------------------------------------

  // ----- Match --------

  const getAllMatches = async () => {
    let res = await MatchService.getAll();
    console.log(res);

    if (res.status == 200) {
      if (res.data.data != 0) {
        console.log(res.data.data);
        setMatches(res.data.data);
      }
    }
  };

  const deleteMatch = async (matchId) => {
    let res = await MatchService.deleteMatch(matchId);
    console.log(res);

    if (res.status == 200) {
      alert(res.data.message);  
      getAllMatches();
    } else {
      alert(res.data.message);
    }
  }

  // -------- Event ------------

  const getAllEvents = async () => {
    try {
      const res = await EventService.getAll();
      console.log(res);

      if (res.status === 200) {
        // Check if data exists
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data.data);
          setEvents(res.data.data); 
        } else {
          console.log("No events found");
          setEvents([]); // Clear state if no events
        }
      } else {
        console.log("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const deleteEvent = async (eventId) => {
    let res = await EventService.deleteEvent(eventId);
    console.log(res);

    if (res.status == 200) {
      alert(res.data.message);  
      getAllEvents();
    } else {
      alert(res.data.message);
    }
  }

  // -------- Training Session ------------

  const getAllTrainingSessionsWithAttendance = async () => {
    try {
      const res = await SessionService.getAllSessionsWithAttendance();
      console.log(res);

      if (res.status === 200) {
        // Check if data exists
        if (res.data.data && res.data.data.length > 0) {
          console.log(res.data.data);
          setTrainingSchedule(res.data.data); 
        } else {
          console.log("No sessions found");
          setTrainingSchedule([]);
        }
      } else {
        console.log("Failed to fetch sessions");
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };


  const deleteSession = async (sessionId) => {
    let res = await SessionService.deleteSession(sessionId);
    console.log(res);

    if (res.status == 200) {
      alert(res.data.message);  
      getAllTrainingSessionsWithAttendance();
    } else {
      alert(res.data.message);
    }
  }

  // -------- Players ------------

  const getAllPlayers = async () => {
    let res = await PlayerService.getAll();
    console.log(res);

    if (res.status == 200) {
      if (res.data.data != 0) {
        console.log(res.data.data);
        setPlayers(res.data.data);
      }
    }
  };

  // -------- Team ------------

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
  
  // -------- Attendance ------------
  
  const markAttendance = async(attendanceDTO) => {
    try {
      const res = await SessionService.markAttendance(attendanceDTO);
      console.log(res);

      if (res.status === 200) {
        console.log(res.data.data);
        console.log("Attendance updated:", res.data.data);
      } else {
        console.log("Failed to fetch events");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  }

  // ---------- Fitness Data--------------------

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

  const updateFitnessData = async (data, fitness_id) => {
    let res = await FitnessService.update(data, fitness_id);
    console.log(res);

    if (res.status === 200) {
      setFitnessData(prev =>
        prev.map(fd =>
          fd.fitness_id === data.fitness_id ? res.data.data : fd
        )
      );
      alert(res.data.message);
    } else {
      alert(res.data.message);
    }
  }

  // --------- Injury --------

  const getAllInjuries = async() => {
    try {
      let res = await InjuryService.getAll();
      console.log(res);
      
      if (res.status === 200) {
        console.log(res.data.data)
        setInjuries(res.data.data);
        
      } else {
        alert(res.data.message)
      }
    } catch (err) {
      console.error("Error fetching fitness data:", err);
    }
  }

  const deleteInjury = async (injuryId) => {
    let res = await InjuryService.deleteInjury(injuryId);
    console.log(res);

    if (res.status == 200) {
      alert(res.data.message);  
      getAllInjuries();
    } else {
      alert(res.response.data.message);
    }
  }

  // ----------------- HELPER methods ----------------------

  const determineMatchStatus = (date_time) => {
    let status = "UPCOMING"; // default

    if (date_time) {
      const dateTime = new Date(date_time);
      const now = new Date();

      // Check if same day
      const isToday =
        dateTime.getFullYear() === now.getFullYear() &&
        dateTime.getMonth() === now.getMonth() &&
        dateTime.getDate() === now.getDate();

      if (dateTime > now && !isToday) {
        status = editingMatch ? "UPCOMING" : "SCHEDULED";
      } else if (dateTime < now && !isToday) {
        status = "COMPLETED";
      } else if (isToday) {
        status = "ONGOING";
      }
    }
    return status;
  }

  const clearMatchScheduleForm = () => {
    // Reset modal + form
    setShowMatchModal(false);
    setEditingMatch(null);
    setMatchForm({
      opponent: '',
      date: '',
      time: '',
      venue: '',
      match_type: '',
      description: '',
      scheduled_by: {
        id: parseInt(localStorage.getItem('user_id'), 10)
      },
      status:''
    });
  }

  const clearEventForm = () => {
    // Reset modal + form
    setShowEventModal(false);
    setEditingEvent(null);
    setEventForm({
      event_title: '',
      date: '',
      time: '',
      venue: '',
      description: '',
      is_featured: false,
      image: null,
      created_by: {
        id: parseInt(localStorage.getItem('user_id'), 10)
      },
    });
  }

  const clearTrainingForm = () => {
    // Reset modal + form
    setShowTrainingModal(false);
    setEditingTraining(null);
    setTrainingForm({
      title: '',
      date: '',
      time: '',
      venue: '',
      coach: '',
      description: '',
      status: ''
    });
  }

  const clearInjuryForm = () => {
    setInjuryForm({
      player: {
        id: 0,
        name: '',
      },
      injury_type: '',
      date_reported: '',
      recovery_days: '',
      status: ''
    });
  }

  /* const splitDateTime = (match) => {
    // Split date_time if it exists
    let date = "";
    let time = "";
    if (match.date_time) {
      const [d, t] = match.date_time.split("T");
      date = d;
      time = t ? t.slice(0, 5) : ""; // keep HH:mm only
    }

    // Build updated matchForm with date & time extracted
    const updatedMatch = {
      ...match,
      date,
      time,
    };

    return updatedMatch;
  } */

  const splitDateTime = (date_time) => {
    // Split date_time if it exists
    let date = "";
    let time = "";
    if (date_time) {
      const [d, t] = date_time.split("T");
      date = d;
      time = t ? t.slice(0, 5) : ""; // keep HH:mm only
    }

    return [date, time];
  }

  const navigateToDataEntryPanel = (selectedMatch) => {
    console.log("selectedMatch: ", selectedMatch);

    // Step 1: Split to  date
    const date = selectedMatch.date_time ? selectedMatch.date_time.split("T")[0] : "";

    const updatedSelectedMatch = {
      ...selectedMatch,
      date,
    };

    console.log("updatedselectedmatch: ", updatedSelectedMatch);

    navigate("/admin/matches", { state: { match: updatedSelectedMatch } })
  }

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

  const toNormalCase = (str) => {
    return str
      .toLowerCase()                // ankle_sprain
      .replace(/_/g, " ")           // ankle sprain
      .replace(/\b\w/g, c => c.toUpperCase()); // Ankle Sprain
  }

  // ------------- handler methods - SUBMIT -------------------

  // Fitness management functions
  const handleFitnessInput = (playerId, field, value) => {
    /* setFitnessData(prev => ({
      ...prev,
      // [playerId]: {
      //   ...prev[playerId],
      //   [field]: value
      // }
      [field]: value
    })); */

    setFitnessData(data =>
      data.map(record =>
        record.player_id === playerId
          ? { ...record, [field]: value }
          : record
      )
    );
  };

  const handleInjuryFormInput = (playerId, field, value) => {
    console.log(playerId);
    console.log(value);
    if(field == 'name') {
      const fPlayer = players.filter((player) => player.id == value)
      console.log(fPlayer);
      const updatedInjury = {
        // ...injuryForm,
        player: {
          id: value,
          name: fPlayer[0].name,
        }
      }

      setInjuryForm((prev)=>({
        ...prev,
        player: {
          id: value,
          name: fPlayer[0].name
        }
      }));
    }
  }

  const handleMatchSubmit = async (e) => {
    e.preventDefault();
  
    // Step 1: Build date_time
    const date_time = matchForm.date && matchForm.time
      ? `${matchForm.date}T${matchForm.time}:00`
      : "";

    // Step 2: Determine match status
    const status = determineMatchStatus(date_time);
  
    const updatedForm = {
      ...matchForm,
      date_time,
      status, // dynamically set
    };
  
    try {
      if (editingMatch) {
        // === UPDATE EXISTING MATCH ===

        // --- Test without API integrateion---

        /* setMatches(prev => prev.map(match => 
          match.id === editingMatch.id ? { ...match, ...updatedForm } : match
        )); */


        // ---API call-----

        let res = await MatchService.updateScheduledMatch(updatedForm);
        console.log(res);
  
        if (res.status === 200) {
          setMatches(prev =>
            prev.map(match =>
              match.id === editingMatch.id ? res.data.data : match
            )
          );
          alert(res.data.message);
          setShowMatchModal(false);
          clearMatchScheduleForm();
        } else {
          alert(res.data.message);
        }

      } else {
        // === CREATE NEW MATCH === 

        const newMatch = {
          id: Date.now(),
          ...updatedForm,
          // status: 'UPCOMING'
        };

        // --- Test without API integrateion---

        /* setMatches(prev => [...prev, newMatch]); */

        // ---API call-----

        let res = await MatchService.saveMatch(newMatch);
        console.log(res);
  
        if (res.status === 201) {
          setMatches(prev => [...prev, res.data.data]); // BE returns created match with id
          alert(res.data.message);
          setShowMatchModal(false);
          clearMatchScheduleForm();
        } else {
          alert(res.data.message);
        }
      }
    } catch (error) {
      console.error("Error saving match:", error);
      alert("Failed to save match");
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Build date_time
    const date_time = eventForm.date && eventForm.time
      ? `${eventForm.date}T${eventForm.time}:00`
      : "";

    const updatedEvent = {
      ...eventForm,
      date_time,
    };

    if (editingEvent) {
      // === UPDATE EXISTING EVENT ===

      // --- Test without API integrateion---

      /* setEvents(prev => prev.map(event => 
        event.id === editingEvent.id ? { ...event, ...updatedEvent } : event
      )); */

      // ---API call-----

      let res = await EventService.updateEvent(updatedEvent, editingEvent.id);
      console.log(res);

      if (res.status === 200) {
        setEvents(prev =>
          prev.map(event =>
            event.id === editingEvent.id ? res.data.data : event
          )
        );
        alert(res.data.message);
        setShowEventModal(false);
        clearEventForm();
      } else {
        alert(res.data.message);
      }

    } else {

      // === CREATE NEW EVENT === 

      const newEvent = {
        id: Date.now(),
        ...updatedEvent
      };

      // --- Test without API integrateion---

      // setEvents(prev => [...prev, newEvent]);

      // ---API call-----

      let res = await EventService.saveEvent(newEvent);
      console.log(res);

      if (res.status === 201) {
        setEvents(prev => [...prev, res.data.data]); // BE returns created event with id
        alert(res.data.message);
        setShowEventModal(false);
        clearEventForm();
      } else {
        alert(res.data.message);
      }

    }
  };

  const handleTrainingSubmit = async(e) => {
    e.preventDefault();

     // Step 1: Build date_time
    const date_time = trainingForm.date && trainingForm.time
      ? `${trainingForm.date}T${trainingForm.time}:00`
      : "";

    // Step 2: Determine match status
    const status = determineMatchStatus(date_time);

    const updatedTraining = {
      ...trainingForm,
      date_time,
      status
    };

    console.log("------ updatedTraining ------------")
    console.log(updatedTraining)
    
    if (editingTraining) {
      console.log(" ------------- editingTraining --------------")
      console.log(editingTraining)
      // === UPDATE EXISTING SESSION ===

      // --- Test without API integrateion---

      // setTrainingSchedule(prev => prev.map(training => 
      //   training.id === editingTraining.id ? { ...training, ...updatedTraining } : training
      // ));

      // ---API call-----

      let res = await SessionService.updateSession(updatedTraining, editingTraining.id);
      console.log(res);

      if (res.status === 200) {
        /* setTrainingSchedule(prev =>
          prev.map(training =>
            training.id === editingTraining.id ? res.data.data : training
          )
        ); */

        setTrainingSchedule(prev =>
          prev.map(training =>
            training.id === editingTraining.id
              ? {
                  ...res.data.data, 
                  attendance: training.attendance ?? []   // 👈 preserve old attendance
                }
              : training
          )
        );
        alert(res.data.message);
        setShowTrainingModal(false);
        setEditingTraining(null);
        clearTrainingForm();
      } else {
        alert(res.data.message);
      }


    } else {

      // === CREATE NEW EVENT === 

      // --- Test without API integrateion---

      /* const newTrainingSchedule = {
        id: Date.now(),
        ...updatedTraining,
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
      setTrainingSchedule(prev => [...prev, newTrainingSchedule]); */

      // ---API call-----

      const newTrainingSchedule = {
        id: Date.now(),
        ...updatedTraining,
        /* attendance: players.map(player => ({
          id: player.id,
          name: `${player.first_name} ${player.last_name}`,
          present: false
        })) */
      };

      let res = await SessionService.saveSession(newTrainingSchedule);
      console.log(res);

      if (res.status === 201) {
        setTrainingSchedule(prev => [...prev, res.data.data]); 
        alert(res.data.message);
        setShowTrainingModal(false);
        setEditingTraining(null);
        clearTrainingForm();
      } else {
        alert(res.data.message);
      }
    }
  };

  const handleInjurySubmit = async(e) => {
    e.preventDefault();

    console.log(injuryForm);

    try {
      if (editingInjury) {
        console.log(editingInjury);
        // === UPDATE EXISTING Injury ===

        // --- Test without API integrateion---

        /* setInjuries(prev => prev.map(injury => 
          injury.id === editingInjury.id ? { ...injury, ...injuryForm } : injury
        )); */

        // ---API call-----

        let res = await InjuryService.updateInjury(injuryForm, editingInjury.id);
        console.log(res);
  
        if (res.status === 200) {
          setInjuries(prev => prev.map(injury => 
            injury.id === editingInjury.id ? res.data.data : injury
          ));
          alert(res.data.message);

          setShowInjuryModal(false);
          clearInjuryForm();
          
        } else {
          alert(res.response.data.message);
        }

      } else {
        // === CREATE NEW Injury === 

        const newInjury = {
          id: Date.now(),
          ...injuryForm,
        };

        console.log(newInjury);

        // --- Test without API integrateion---

        // setInjuries(prev => [...prev, newInjury]);

        // ---API call-----

        let res = await InjuryService.saveInjury(newInjury);
        console.log(res);
  
        if (res.status === 201) {
          setInjuries(prev => [...prev, res.data.data]); 
          alert(res.data.message);
          
          setShowInjuryModal(false);
          clearInjuryForm();

        } else {
          alert(res.response.data.message);
        }

      }
    } catch (error) {
      console.error("Error saving injury:", error);
      alert("Failed to save injury");
    }
   
    setShowInjuryModal(false);
    setEditingInjury(null);
    clearInjuryForm();
  };

  // ------------- handler methods - EDIT -------------------

  const handleEditMatch = (match) => {
    console.log("---- editing match before splitting------");
    console.log(match);
    
    // const updatedMatch = splitDateTime(match);
    const [date, time] = splitDateTime(match.date_time);

    // Build updated matchForm with date & time extracted
    const updatedMatch = {
      ...match,
      date,
      time,
    };
    
    console.log("---- editing match after splitting------");
    console.log(updatedMatch);

    setEditingMatch(updatedMatch);
    setMatchForm(updatedMatch);
    setShowMatchModal(true);
  };

  const handleEditEvent = (event) => {
    console.log("---- editing event before splitting------");
    console.log(event);
    
    const [date, time] = splitDateTime(event.date_time);

    // Build updated eventForm with date & time extracted
    const updatedEvent = {
      ...event,
      date,
      time,
    };
    
    console.log("---- editing event after splitting------");
    console.log(updatedEvent);

    setEditingEvent(updatedEvent);
    setEventForm(updatedEvent);
    setShowEventModal(true);
  };

  const handleEditTraining = (training) => {
    console.log("---- editing session before splitting------");
    console.log(training);
    
    // const updatedMatch = splitDateTime(match);
    const [date, time] = splitDateTime(training.date_time);

    // Build updated matchForm with date & time extracted
    const updatedTraining = {
      ...training,
      date,
      time,
    };
    
    console.log("---- editing session after splitting------");
    console.log(updatedTraining);

    setEditingTraining(updatedTraining);
    setTrainingForm(updatedTraining);
    setShowTrainingModal(true);
  };
  
  const handleFitnessUpdate = (playerId) => {
    console.log(fitnessData)
    console.log('Saving fitness data for player:', playerId);
    const data = fitnessData.filter((data)=> data.player_id == playerId)[0];
    console.log(data)

    const dataToUpdate = {
      player: { id: data.player_id},
      sprint_time: data.sprint_time,
      beep_level: data.beep_level,
      date: new Date().toISOString().split("T")[0], // ✅ "2025-09-15"
      status: data.status,
    }

    console.log(dataToUpdate);

    updateFitnessData(dataToUpdate, data.fitness_id);

  };
  
  const handleEditInjury = (injury) => {
    setEditingInjury(injury);
    setInjuryForm(injury);
    setShowInjuryModal(true);
  };

  // ------------- handler methods - DELETE -------------------

  const handleDeleteMatch = (id) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      // setMatches(prev => prev.filter(match => match.id !== id));
      deleteMatch(id);
    }
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      // setEvents(prev => prev.filter(event => event.id !== id));
      deleteEvent(id);
    }
  };

  const handleDeleteTraining = (id) => {
    if (window.confirm('Are you sure you want to delete this training session?')) {
      // setTrainingSchedule(prev => prev.filter(training => training.id !== id));
      deleteSession(id);
    }
  };

  const handleDeleteInjury = (injuryId) => {
    if (window.confirm('Are you sure you want to delete this injury record?')) {
      // setInjuries(prev => prev.filter(injury => injury.id !== injuryId));
      deleteInjury(injuryId);
    }
  };

  // ----------- Attendance Metrics-------------

  const toggleAttendance = (sessionId, playerId, currentStatus ) => {
    console.log("----inside  toggleAttendance -----");
    console.log(sessionId, playerId, currentStatus);
    // 1. Update local state immediately for UI responsiveness
    setTrainingSchedule(prev => prev.map(session => 
      session.id === sessionId 
        ? {
            ...session,
            attendance: session.attendance.map(player =>
              player.player_id === playerId ? { ...player, present: !player.present, status: currentStatus === "PRESENT" ? "ABSENT" : "PRESENT" } : player
            )
          }
        : session
    ));

    // 2. Build DTO for BE
    const dto = {
      player: { id: playerId },
      session: { id: sessionId },
      status: currentStatus === "PRESENT" ? "ABSENT" : "PRESENT" // toggle
    };

    markAttendance(dto);
  };

  const getAttendancePercentage = (session) => {
    console.log("---inside getAttendancePercentage");
    console.log(session);

    const present = session.attendance.filter(p => p.status === "PRESENT").length;
    return ((present / session.attendance.length) * 100).toFixed(1);
  };

  const getFilteredAttendance = () => {
    console.log("------inside getFilteredAttendance --------");
    console.log(trainingSchedule);
    
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: nsbmGreen }}>Club Operations</h1>
          <p className="text-white/70 mt-1">Manage matches, events, and training sessions</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg border-0 overflow-hidden" style={{ backgroundColor: colors.backgroundPrimary }}>
        <div className="border-b" style={{ borderColor: getNsbmGreen(0.2) }}>
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-semibold text-sm flex items-center transition-all duration-200 ${
                    activeTab === tab.id
                      ? `border-2 text-white px-3 py-2 rounded-lg`
                      : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                  }`}
                  style={activeTab === tab.id ? { 
                    backgroundColor: nsbmGreen, 
                    borderColor: nsbmGreen 
                  } : {}}
                >
                  <Icon className="w-4 h-4 mr-2" style={{ color: activeTab === tab.id ? 'white' : '#6B7280' }} />
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
                <h3 className="text-xl font-bold flex items-center" style={{ color: nsbmGreen }}>
                  <Trophy className="w-6 h-6 mr-3 p-1 rounded-lg" style={{ backgroundColor: getNsbmGreen(0.1) }} />
                  Match Schedule
                </h3>
                <button
                  onClick={() => setShowMatchModal(true)}
                  className="inline-flex items-center px-6 py-3 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: nsbmGreen }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Match
                </button>
              </div>

              {/* Display All Matches */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match) => (
                  <div key={match.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200" style={{ backgroundColor: colors.backgroundPrimary }}>
                    <div className="h-32 relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${getNsbmGreen(0.1)}, ${getNsbmGreen(0.05)})` }}>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800">vs {match.opponent.team_name}</div>
                        <div className="text-sm text-gray-600">{match.match_type} Match</div>
                        <div className="text-xs text-gray-500">{match.venue}</div>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          match.status === 'upcoming' 
                            ? 'text-white' 
                            : 'text-white'
                        }`} style={{ 
                          backgroundColor: match.status === 'upcoming' ? getNsbmGreen(0.8) : nsbmGreen 
                        }}>
                          {match.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">Match Details</h4>
                          <span className="text-xs font-semibold text-white px-3 py-1 rounded-lg" style={{ backgroundColor: nsbmBlue }}>
                            {match.match_type}
                          </span>
                        </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" style={{ color: nsbmGreen }} />
                          {/* <span className="font-medium">{new Date(match.date).toLocaleDateString()}</span> */}
                          <span className="font-medium">{new Date(match.date_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" style={{ color: nsbmGreen }} />
                            {/* <span className="font-medium">{match.time}</span> */}
                            <span className="font-medium">{new Date(match.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" style={{ color: nsbmGreen }} />
                            <span className="font-medium">{match.venue}</span>
                        </div>
                      </div>
                      {match.description && (
                          <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: getNsbmGreen(0.05) }}>
                            <p className="text-xs font-semibold mb-1" style={{ color: nsbmGreen }}>Notes:</p>
                            <p className="text-sm text-gray-700">{match.description}</p>
                          </div>
                      )}
                      {/* -----Match Result------- */}
                      {match.result && (
                        <div className="mt-3 p-3 rounded-lg" style={{ backgroundColor: getNsbmGreen(0.1) }}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Result</span>
                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                              match.result === 'WIN' 
                                    ? 'text-white' 
                                : match.result === 'LOSS'
                                    ? 'text-white'
                                    : 'text-white'
                                }`} style={{ 
                                  backgroundColor: match.result === 'WIN' ? nsbmGold : match.result === 'LOSS' ? '#ef4444' : '#6b7280'
                                }}>
                              {match.result}
                            </span>
                          </div>
                          {match.score && (
                            <p className="text-sm text-gray-700 mt-2 font-mono">{match.score}</p>
                          )}
                        </div>
                      )}
                        <div className="flex justify-end space-x-2 mt-4 pt-3" style={{ borderTop: `1px solid ${getNsbmBlue(0.2)}` }}>
                        <button
                          onClick={() => navigateToDataEntryPanel(match)}
                          className="flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                          style={{ 
                            color: nsbmBlue, 
                            backgroundColor: getNsbmBlue(0.1),
                            border: `1px solid ${getNsbmBlue(0.3)}`
                          }}
                          title="Enter Match Stats"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          <span className="text-sm font-semibold">Enter Match Stats</span>
                        </button>
                        <button
                          onClick={() => handleEditMatch(match)}
                            className="flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                            style={{ 
                              color: nsbmGreen, 
                              backgroundColor: getNsbmGreen(0.1),
                              border: `1px solid ${getNsbmGreen(0.3)}`
                            }}
                            title="Edit Match"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            <span className="text-sm font-semibold">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteMatch(match.id)}
                            className="flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                            style={{ 
                              color: '#ef4444', 
                              backgroundColor: '#fef2f2',
                              border: '1px solid #fecaca'
                            }}
                            title="Delete Match"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            <span className="text-sm font-semibold">Delete</span>
                        </button>
                        </div>
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
                <h3 className="text-xl font-bold flex items-center" style={{ color: nsbmGreen }}>
                  <Calendar className="w-6 h-6 mr-3 p-1 rounded-lg" style={{ backgroundColor: getNsbmGreen(0.1) }} />
                  Club Events
                </h3>
                <button
                  onClick={() => setShowEventModal(true)}
                  className="inline-flex items-center px-6 py-3 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: nsbmGreen }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Event
                </button>
              </div>

               {/* Display All Events */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200" style={{ backgroundColor: colors.backgroundPrimary }}>
                    <div className="h-32 relative">
                      {event.image_url ? (
                        <img
                          // src={URL.createObjectURL(event.image)}
                          src={`${base_url}${event.image_url}`}
                          alt={event.event_title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${getNsbmGreen(0.1)}, ${getNsbmGreen(0.05)})` }}>
                          <div className="text-center">
                            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <span className="text-sm text-gray-500">{event.event_title}</span>
                          </div>
                        </div>
                      )}
                      {event.is_featured && (
                        <div className="absolute top-2 right-2">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: nsbmGreen }}>
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{event.event_title}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" style={{ color: nsbmGreen }} />
                          <span className="font-medium">{new Date(event.date_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" style={{ color: nsbmGreen }} />
                          {/* <span className="font-medium">{event.time}</span> */}
                          <span className="font-medium">{new Date(event.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" style={{ color: nsbmGreen }} />
                          <span className="font-medium">{event.venue}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{event.description}</p>
                      <div className="flex justify-end space-x-2 mt-4 pt-3" style={{ borderTop: `1px solid ${getNsbmGreen(0.2)}` }}>
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                          style={{ 
                            color: nsbmGreen, 
                            backgroundColor: getNsbmGreen(0.1),
                            border: `1px solid ${getNsbmGreen(0.3)}`
                          }}
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          <span className="text-sm font-semibold">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md"
                          style={{ 
                            color: '#ef4444', 
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca'
                          }}
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          <span className="text-sm font-semibold">Delete</span>
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
                <h3 className="text-xl font-bold flex items-center" style={{ color: nsbmGreen }}>
                  <Users className="w-6 h-6 mr-3 p-1 rounded-lg" style={{ backgroundColor: getNsbmGreen(0.1) }} />
                  Training Schedule
                </h3>
                <button
                  onClick={() => setShowTrainingModal(true)}
                  className="inline-flex items-center px-6 py-3 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: nsbmGreen }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Training
                </button>
              </div>

              {/* Display All Training Sessions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingSchedule.map((training) => (
                  <div key={training.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-200" style={{ backgroundColor: colors.backgroundPrimary }}>
                    <div className="h-32 relative flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${getNsbmGreen(0.1)}, ${getNsbmGreen(0.05)})` }}>
                      <div className="text-center">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-500">{training.title}</span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                          training.status === 'scheduled' 
                            ? '' 
                            : training.status === 'completed'
                            ? ''
                            : ''
                        }`} style={{ 
                          backgroundColor: training.status === 'scheduled' ? getNsbmGreen(0.8) : training.status === 'completed' ? nsbmGreen : '#6b7280'
                        }}>
                          {training.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{training.title}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" style={{ color: nsbmGreen }} />
                          {/* <span className="font-medium">{new Date(training.date).toLocaleDateString()}</span> */}
                          <span className="font-medium">{new Date(training.date_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" style={{ color: nsbmGreen }} />
                          {/* <span className="font-medium">{training.time}</span> */}
                          <span className="font-medium">{new Date(training.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" style={{ color: nsbmGreen }} />
                          <span className="font-medium">{training.venue}</span>
                        </div>
                        {/* <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" style={{ color: nsbmGreen }} />
                          <span className="font-medium">{training.coach}</span>
                        </div> */}
                        {/* <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {training.registeredPlayers} players registered
                          </span>
                          <div className="w-16 rounded-full h-2" style={{ backgroundColor: getNsbmGreen(0.2) }}>
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${Math.min((training.registeredPlayers / 20) * 100, 100)}%`,
                                backgroundColor: nsbmGreen 
                              }}
                            ></div>
                          </div>
                        </div> */}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{training.description}</p>
                      <div className="flex justify-between items-center mt-4 pt-3" style={{ borderTop: `1px solid ${getNsbmGreen(0.2)}` }}>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditTraining(training)}
                            className="flex items-center px-3 py-1 rounded-lg transition-all duration-200 hover:shadow-md"
                            style={{ 
                              color: nsbmGreen, 
                              backgroundColor: getNsbmGreen(0.1),
                              border: `1px solid ${getNsbmGreen(0.3)}`
                            }}
                            title="Edit Training"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            <span className="text-sm font-semibold">Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteTraining(training.id)}
                            className="flex items-center px-3 py-1 rounded-lg transition-all duration-200 hover:shadow-md"
                            style={{ 
                              color: '#ef4444', 
                              backgroundColor: '#fef2f2',
                              border: '1px solid #fecaca'
                            }}
                            title="Delete Training"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            <span className="text-sm font-semibold">Delete</span>
                          </button>
                        </div>
                        <button
                          onClick={() => setActiveTab('attendance')}
                          className="inline-flex items-center px-4 py-2 text-white rounded-lg text-sm font-semibold hover:shadow-md transition-all duration-200"
                          style={{ backgroundColor: nsbmGreen }}
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
                <h3 className="text-lg font-medium text-white/70">Training Attendance</h3>
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select
                      value={attendanceFilter}
                      onChange={(e) => setAttendanceFilter(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="">Select</option>
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

              {/* Display All Attendances */}
              <div className="space-y-6">
                {getFilteredAttendance().map((session) => (
                  <div key={session.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {session.title} - {new Date(session.date_time).toLocaleDateString()}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {session.attendance.filter(p => p.status === "PRESENT").length} of {session.attendance.length} players present
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          {/* <span><Clock className="w-4 h-4 inline mr-1" />{session.time}</span> */}
                          <span><Clock className="w-4 h-4 inline mr-1" />{new Date(session.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span><MapPin className="w-4 h-4 inline mr-1" />{session.venue}</span>
                          {/* <span><Users className="w-4 h-4 inline mr-1" />{session.coach}</span> */}
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
                            <tr key={player.player_id}>
                              <td className="px-4 py-2 text-sm font-medium text-gray-900">
                                {player.name}
                              </td>
                              <td className="px-4 py-2 text-center">
                                {player.status == "PRESENT" ? (
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
                                  onClick={() => toggleAttendance(session.id, player.player_id, player.status)}
                                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                                    player.status == "PRESENT"
                                      ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                                  }`}
                                >
                                  {player.status == "PRESENT" ? 'Mark Absent' : 'Mark Present'}
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

          {/* Player Fitness Management Tab */}
          {activeTab === 'fitness' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h3 className="text-lg font-medium text-white/70">Player Fitness Management</h3>
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-1" />
                    Export Data
                  </button>
                </div>
              </div>

              {/* Fitness Summary */}
              <div className="mb-8 bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Fitness Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {Object.values(fitnessData).filter(data => data?.status === 'FIT').length}
                    </div>
                    <div className="text-sm text-gray-600">Healthy Players</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">
                      {Object.values(fitnessData).filter(data => data?.status === 'RECOVERING').length}
                    </div>
                    <div className="text-sm text-gray-600">Recovering</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {Object.values(fitnessData).filter(data => data?.status === 'INJURED').length}
                    </div>
                    <div className="text-sm text-gray-600">Injured</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {Object.values(fitnessData).filter(data => data?.status === 'REST').length}
                    </div>
                    <div className="text-sm text-gray-600">On Rest</div>
                  </div>
                </div>
              </div>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {players.map((player) => (
                  <div key={player.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          // src={player.photo} 
                          src={`${base_url}${player.image_url}`}
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{player.name}</h4>
                        <p className="text-sm text-gray-500">{player.player_role}</p>
                        <p className="text-xs text-gray-400">{player.email}</p>
                      </div>
                      <button
                        onClick={() => handleFitnessUpdate(player.id)}
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
                            value={fitnessData[player.id]?.sprint_time || ''}
                            onChange={(e) => handleFitnessInput(player.id, 'sprint_time', parseFloat(e.target.value))}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0.0"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Beep Test (level)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={fitnessData[player.id]?.beep_level || ''}
                            onChange={(e) => handleFitnessInput(player.id, 'beep_level', parseFloat(e.target.value))}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0.0"
                          />
                        </div>
                      </div>


                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={fitnessData[player.id]?.status || ''}
                          onChange={(e) => handleFitnessInput(player.id, 'status', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          <option value="Fit (Excellent)">Fit (Excellent)</option>
                          <option value="Recovering">Recovering</option>
                          <option value="Injured">Injured</option>
                          <option value="Rest">Rest</option>
                        </select>
                      </div>

                      <div className="text-xs text-gray-500">
                        Last updated: {fitnessData[player.id]?.date || 'Never'}
                      </div>

                      <button
                        onClick={() => handleFitnessUpdate(player.id)}
                        className="w-full inline-flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save Fitness Data
                      </button>
                    </div>
                  </div>
                ))}
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fitnessData.map((data) => (
                  <div key={data.player_id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          // src={player.photo} 
                          src={`${base_url}${data.image_url}`}
                          alt={data.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{data.name}</h4>
                        <p className="text-sm text-gray-500">{data.player_role}</p>
                        <p className="text-xs text-gray-400">{data.email}</p>
                      </div>
                      {/* <button
                        onClick={() => handleFitnessUpdate(data.player_id)}
                        className="p-2 text-gray-400 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button> */}
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">20m Sprint (s)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={data?.sprint_time || ''}
                            onChange={(e) => handleFitnessInput(data.player_id, 'sprint_time', parseFloat(e.target.value))}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0.0"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Beep Test (level)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={data?.beep_level || ''}
                            onChange={(e) => handleFitnessInput(data.player_id, 'beep_level', parseFloat(e.target.value))}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0.0"
                          />
                        </div>
                      </div>


                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={data?.status || ''}
                          onChange={(e) => handleFitnessInput(data.player_id, 'status', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select</option>
                          <option value="FIT">Fit (Excellent)</option>
                          <option value="RECOVERING">Recovering</option>
                          <option value="INJURED">Injured</option>
                          <option value="REST">On Rest</option>
                        </select>
                      </div>

                      <div className="text-xs text-gray-500">
                        Last updated: {data?.date || 'Never'}
                      </div>

                      <button
                        onClick={() => handleFitnessUpdate(data.player_id)}
                        className="w-full inline-flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700"
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Save Fitness Data
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
            </div>
          )}

          {/* Injury Management Tab */}
          {activeTab === 'injuries' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h3 className="text-lg font-medium text-white/70">Injury Management</h3>
                <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                  <button
                    onClick={() => setShowInjuryModal(true)}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Injury
                  </button>
                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                    <Download className="w-4 h-4 mr-1" />
                    Export Data
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {injuries.map((injury) => (
                  <div key={injury.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{injury.player.name}</h4>
                          <p className="text-sm text-gray-500">{toNormalCase(injury.injury_type)}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditInjury(injury)}
                          className="p-2 text-gray-400 hover:text-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteInjury(injury.id)}
                          className="p-2 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Date Reported:</span>
                        <span className="font-medium">{new Date(injury.date_reported).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Recovery Days:</span>
                        <span className="font-medium">{injury.recovery_days} days</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
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

              {injuries.length === 0 && (
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Injuries Reported</h3>
                  <p className="text-gray-500">All players are currently injury-free.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Match Modal */}
      {showMatchModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border-0 w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl" style={{ backgroundColor: colors.backgroundPrimary }}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center" style={{ color: nsbmGreen }}>
                  <Trophy className="w-6 h-6 mr-3 p-1 rounded-lg" style={{ backgroundColor: getNsbmGreen(0.1) }} />
                  {editingMatch ? 'Edit Match' : 'Schedule New Match'}
                </h3>
                <button
                  onClick={() => {
                    setShowMatchModal(false);
                    setEditingMatch(null);
                    clearMatchScheduleForm();
                  }}
                  className="p-2 rounded-lg transition-all duration-200 hover:shadow-md"
                  style={{ 
                    color: '#ef4444', 
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca'
                  }}
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleMatchSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* ---Opponent----- */}
                  {/* <div>
                    <label className="text-sm font-semibold mb-3 flex items-center" style={{ color: nsbmGreen }}>
                      <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: nsbmGreen }}></div>
                      Opponent *
                    </label>
                    <input
                      type="text"
                      value={matchForm.opponent}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, opponent: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-200"
                      style={{ 
                        backgroundColor: colors.backgroundSecondary,
                        borderColor: colors.borderLight,
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
                  </div> */}
                  <div>
                    {/* <label className="text-sm font-semibold mb-3 flex items-center" style={{ color: nsbmGreen }}> */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {/* <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: nsbmGreen }}></div> */}
                      Opponent *
                    </label>
                    <select
                      value={matchForm.opponent.id}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, opponent: { id: parseInt(e.target.value, 10) }}))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={0}>Select</option>
                      {opponents.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.team_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    {/* <label className="text-sm font-semibold mb-3 flex items-center" style={{ color: nsbmGreen }}> */}
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {/* <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: nsbmGreen }}></div> */}
                      Date *
                    </label>
                    <input
                      type="date"
                      value={matchForm.date}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, date: e.target.value }))}
                      required
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all duration-200"
                      style={{ 
                        backgroundColor: colors.backgroundSecondary,
                        borderColor: colors.borderLight,
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
                      value={matchForm.match_type}
                      onChange={(e) => setMatchForm(prev => ({ ...prev, match_type: e.target.value }))}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={matchForm.description}
                    onChange={(e) => setMatchForm(prev => ({ ...prev, description: e.target.value }))}
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
                      clearMatchScheduleForm();
                    }}
                    className="px-6 py-3 rounded-xl text-gray-700 hover:shadow-md transition-all duration-200"
                    style={{ 
                      backgroundColor: colors.backgroundSecondary,
                      border: `1px solid ${colors.borderLight}`
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                    style={{ backgroundColor: nsbmGreen }}
                  >
                    {editingMatch ? 'Update Match' : 'Schedule Match'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border-0 w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl" style={{ backgroundColor: colors.backgroundPrimary }}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center" style={{ color: nsbmGreen }}>
                  <Calendar className="w-6 h-6 mr-3 p-1 rounded-lg" style={{ backgroundColor: getNsbmGreen(0.1) }} />
                  {editingEvent ? 'Edit Event' : 'Schedule New Event'}
                </h3>
                <button
                  onClick={() => {
                    setShowEventModal(false);
                    setEditingEvent(null);
                    clearEventForm();
                  }}
                  className="p-2 rounded-lg transition-all duration-200 hover:shadow-md"
                  style={{ 
                    color: '#ef4444', 
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca'
                  }}
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
                      value={eventForm.event_title}
                      onChange={(e) => setEventForm(prev => ({ ...prev, event_title: e.target.value }))}
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
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_featured"
                      checked={eventForm.is_featured}
                      onChange={(e) => setEventForm(prev => ({ ...prev, is_featured: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Event Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      id="eventImage"
                      name="image"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          // Validate file type
                          if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
                            alert('Please select a valid JPG or PNG image file.');
                            return;
                          }
                          // Validate file size (max 5MB)
                          if (file.size > 5 * 1024 * 1024) {
                            alert('File size must be less than 5MB.');
                            return;
                          }
                          setEventForm(prev => ({ ...prev, image: file }));
                        }
                      }}
                      className="hidden"
                    />
                    <label htmlFor="eventImage" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {eventForm.image ? eventForm.image.name : 'Click to upload image'}
                        </p>
                        <p className="text-xs text-gray-500">JPG or PNG, max 5MB</p>
                      </div>
                    </label>
                    {eventForm.image && (
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={() => setEventForm(prev => ({ ...prev, image: null }))}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEventModal(false);
                      setEditingEvent(null);
                      clearEventForm();
                    }}
                    className="px-6 py-3 rounded-xl text-gray-700 hover:shadow-md transition-all duration-200"
                    style={{ 
                      backgroundColor: colors.backgroundSecondary,
                      border: `1px solid ${colors.borderLight}`
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                    style={{ backgroundColor: nsbmGreen }}
                  >
                    {editingEvent ? 'Update Event' : 'Schedule Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Training Schedule Modal */}
      {showTrainingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border-0 w-11/12 md:w-3/4 lg:w-1/2 shadow-2xl rounded-2xl" style={{ backgroundColor: colors.backgroundPrimary }}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center" style={{ color: nsbmGreen }}>
                  <Users className="w-6 h-6 mr-3 p-1 rounded-lg" style={{ backgroundColor: getNsbmGreen(0.1) }} />
                  {editingTraining ? 'Edit Training Session' : 'Schedule New Training'}
                </h3>
                <button
                  onClick={() => {
                    setShowTrainingModal(false);
                    setEditingTraining(null);
                    clearTrainingForm();
                  }}
                  className="p-2 rounded-lg transition-all duration-200 hover:shadow-md"
                  style={{ 
                    color: '#ef4444', 
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca'
                  }}
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
                  {/* <div>
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
                  </div> */}
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
                      clearTrainingForm();
                    }}
                    className="px-6 py-3 rounded-xl text-gray-700 hover:shadow-md transition-all duration-200"
                    style={{ 
                      backgroundColor: colors.backgroundSecondary,
                      border: `1px solid ${colors.borderLight}`
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-white rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                    style={{ backgroundColor: nsbmGreen }}
                  >
                    {editingTraining ? 'Update Training' : 'Schedule Training'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Injury Modal */}
      {showInjuryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingInjury ? 'Edit Injury' : 'Add New Injury'}
              </h3>
              <button
                onClick={() => {
                  setShowInjuryModal(false);
                  setEditingInjury(null);
                  clearInjuryForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleInjurySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Player Name *
                </label>
                {/* <input
                  type="text"
                  value={injuryForm.playerName}
                  onChange={(e) => setInjuryForm(prev => ({ ...prev, playerName: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter player name"
                /> */}
                <select
                  value={injuryForm.player.id}
                  // onChange={(e) => setInjuryForm(prev => ({ ...prev, player: {id: e.target.value} }))}
                  onChange={(e) => handleInjuryFormInput(injuryForm.player.id, 'name', e.target.value)}
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
                    e.target.
                    style.boxShadow = 'none';
                  }}
                  required
                >
                  <option value="">Select</option>
                  {players.map(player => (
                    <option key={player.id} value={player.id}>{player.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Injury Type *
                </label>
                {/* <input
                  type="text"
                  value={injuryForm.injury_type}
                  onChange={(e) => setInjuryForm(prev => ({ ...prev, injury_type: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Ankle Sprain, Shoulder Strain"
                /> */}
                <select
                  value={injuryForm.injury_type}
                  onChange={(e) => setInjuryForm(prev => ({ ...prev, injury_type: e.target.value }))}
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
                  required
                >
                  <option value="">Select</option>
                  <option value="HAMSTRING_STRAIN">Hamstring Strain</option>
                  <option value="GROIN_STRAIN">Groin Strain</option>
                  <option value="SIDE_STRAIN">Side Strain</option>
                  <option value="SHOULDER_INJURY">Shoulder Injury</option>
                  <option value="ELBOW_TENDONITIS">Elbow Tendonitis</option>
                  <option value="WRIST_SPRAIN">Wrist Sprain</option>
                  <option value="FINGER_FRACTURE">Finger Fracture</option>
                  <option value="CONCUSSION">Concussion</option>
                  <option value="STRESS_FRACTURE">Stress Fracture</option>
                  <option value="ANKLE_SPRAIN">Ankle Sprain</option>
                  <option value="KNEE_LIGAMENT_INJURY">Knee Ligament Injury</option>
                  <option value="ACHILLES_RUPTURE">Achilles Rupture</option>
                  <option value="BLISTERS">Blisters</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Reported *
                </label>
                <input
                  type="date"
                  value={injuryForm.date_reported}
                  onChange={(e) => setInjuryForm(prev => ({ ...prev, date_reported: e.target.value }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recovery Days *
                </label>
                <input
                  type="number"
                  min="1"
                  value={injuryForm.recovery_days}
                  onChange={(e) => setInjuryForm(prev => ({ ...prev, recovery_days: parseInt(e.target.value) }))}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Expected recovery days"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  value={injuryForm.status}
                  onChange={(e) => setInjuryForm(prev => ({ ...prev, status: e.target.value }))}
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
                  required
                >
                  <option value="">Select</option>
                  <option value="INJURED">Injured</option>
                  <option value="RECOVERING">Recovering</option>
                  <option value="RECOVERED">Recovered</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowInjuryModal(false);
                    setEditingInjury(null);
                    clearInjuryForm();
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                >
                  {editingInjury ? 'Update Injury' : 'Add Injury'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ClubOperations;
