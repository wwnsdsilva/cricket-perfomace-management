// Sample data for Cricket Club Performance Management System

export const sampleUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "Admin",
    name: "John Smith",
    email: "admin@cricketclub.com"
  },
  {
    id: 2,
    username: "mic",
    password: "mic123",
    role: "MIC",
    name: "Sarah Johnson",
    email: "mic@cricketclub.com"
  },
  {
    id: 3,
    username: "player",
    password: "player123",
    role: "Player",
    name: "Mike Wilson",
    email: "mike@cricketclub.com"
  },
  {
    id: 4,
    username: "normal",
    password: "normal123",
    role: "Normal",
    name: "Guest User",
    email: "guest@cricketclub.com"
  }
];

export const samplePlayers = [
  {
    id: 1,
    name: "Maneendra Jayathilaka",
    position: "Batsman",
    jerseyNumber: 18,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    runs: 1120,
    average: 46.8,
    strikeRate: 136.2,
    wickets: 2,
    economyRate: 6.1,
    bowlingAverage: 30.4,
    matches: 14,
    catches: 11,
    runOuts: 2
  },
  {
    id: 2,
    name: "Monil Jason",
    position: "All-rounder",
    jerseyNumber: 27,
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    runs: 780,
    average: 35.4,
    strikeRate: 124.5,
    wickets: 15,
    economyRate: 5.7,
    bowlingAverage: 24.3,
    matches: 13,
    catches: 16,
    runOuts: 3
  },
  {
    id: 3,
    name: "Dilhara Polgampola",
    position: "Bowler",
    jerseyNumber: 33,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    runs: 210,
    average: 14.2,
    strikeRate: 92.1,
    wickets: 29,
    economyRate: 4.9,
    bowlingAverage: 19.5,
    matches: 16,
    catches: 8,
    runOuts: 1
  },
  {
    id: 4,
    name: "Lahiru Abhesinghe",
    position: "Batsman",
    jerseyNumber: 7,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    runs: 980,
    average: 41.3,
    strikeRate: 131.7,
    wickets: 0,
    economyRate: 0,
    bowlingAverage: 0,
    matches: 12,
    catches: 10,
    runOuts: 2
  },
  {
    id: 5,
    name: "Asitha Wanninayaka",
    position: "Bowler",
    jerseyNumber: 21,
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
    runs: 150,
    average: 11.5,
    strikeRate: 88.2,
    wickets: 26,
    economyRate: 5.1,
    bowlingAverage: 20.8,
    matches: 15,
    catches: 6,
    runOuts: 1
  },
  {
    id: 6,
    name: "Suviru Sathnidu",
    position: "All-rounder",
    jerseyNumber: 45,
    photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=150&h=150&fit=crop&crop=face",
    runs: 640,
    average: 32.0,
    strikeRate: 119.4,
    wickets: 12,
    economyRate: 5.9,
    bowlingAverage: 26.7,
    matches: 12,
    catches: 9,
    runOuts: 2
  },
  {
    id: 7,
    name: "Kavisha Weerasinghe",
    position: "Wicket-keeper",
    jerseyNumber: 63,
    photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
    runs: 710,
    average: 37.1,
    strikeRate: 128.6,
    wickets: 0,
    economyRate: 0,
    bowlingAverage: 0,
    matches: 13,
    catches: 24,
    runOuts: 6
  },
  {
    id: 8,
    name: "Chamod Hasalanka",
    position: "Batsman",
    jerseyNumber: 14,
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
    runs: 860,
    average: 39.0,
    strikeRate: 126.9,
    wickets: 1,
    economyRate: 6.5,
    bowlingAverage: 32.0,
    matches: 13,
    catches: 13,
    runOuts: 3
  },
  {
    id: 9,
    name: "Dulaj Bandara",
    position: "Bowler",
    jerseyNumber: 90,
    photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face",
    runs: 190,
    average: 13.1,
    strikeRate: 91.7,
    wickets: 22,
    economyRate: 5.3,
    bowlingAverage: 22.6,
    matches: 14,
    catches: 5,
    runOuts: 1
  }
];

export const sampleMatches = [
  {
    id: 1,
    opponent: "Lions CC",
    date: "2024-01-15",
    venue: "Central Cricket Ground",
    result: "Win",
    score: "245/8 (45.2) vs 189/10 (38.1)",
    topPerformer: "David Warner - 89 runs",
    type: "T20"
  },
  {
    id: 2,
    opponent: "Eagles CC",
    date: "2024-01-08",
    venue: "Riverside Stadium",
    result: "Loss",
    score: "156/10 (32.4) vs 198/7 (40.0)",
    topPerformer: "Mitchell Starc - 4/28",
    type: "ODI"
  },
  {
    id: 3,
    opponent: "Tigers CC",
    date: "2024-01-01",
    venue: "Sunset Park",
    result: "Win",
    score: "312/6 (50.0) vs 298/9 (50.0)",
    topPerformer: "Virat Kohli - 112 runs",
    type: "ODI"
  }
];

export const upcomingMatches = [
  {
    id: 4,
    opponent: "Panthers CC",
    date: "2024-01-22",
    venue: "Mountain View Ground",
    time: "10:00 AM",
    type: "T20"
  },
  {
    id: 5,
    opponent: "Sharks CC",
    date: "2024-01-29",
    venue: "Ocean Park Stadium",
    time: "2:00 PM",
    type: "ODI"
  },
  {
    id: 6,
    opponent: "Falcons CC",
    date: "2024-02-05",
    venue: "Sky High Ground",
    time: "11:00 AM",
    type: "T20"
  }
];

export const sampleEvents = [
  {
    id: 1,
    name: "NSBM Official Jersey Launch",
    date: "2024-02-15",
    venue: "NSBM Cricket Ground",
    description: "Official launch of NSBM Cricket Club's new jersey collection",
    image: "/images/events/nsbm_official_jersey_event.jpg",
    type: "Launch",
    featured: true
  },
  {
    id: 2,
    name: "NSBM Cricket Events",
    date: "2024-02-28",
    venue: "NSBM Auditorium",
    description: "Special cricket events and activities organized by NSBM Cricket Club",
    image: "/images/events/nsbm events.jpg",
    type: "Events",
    featured: false
  },
  {
    id: 3,
    name: "NSBM Special Gallery",
    date: "2024-03-10",
    venue: "NSBM Sports Complex",
    description: "Special events gallery showcasing NSBM cricket club activities",
    image: "/images/events/nsbm_gallery_sf.jpg",
    type: "Gallery",
    featured: false
  }
];

export const playerOfTheMonth = {
  name: "David Warner",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
  achievement: "Player of the Month - January 2024",
  stats: "1,250 runs in 15 matches with 3 centuries"
};

export const clubAnnouncements = [
  "🏆 Congratulations to David Warner for being Player of the Month!",
  "📅 Annual Cricket Festival registration is now open!",
  "⚡ New training schedule available for all players",
  "🎯 Youth development program starting next month"
];
