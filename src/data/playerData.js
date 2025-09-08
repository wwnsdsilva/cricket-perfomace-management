// Sample player data for the Player Dashboard
export const samplePlayerData = {
  id: 1,
  name: 'Monil Jason',
  role: 'All-rounder',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  team: 'Cricket Club A',
  joiningDate: '2023-01-15',
  currentSeason: {
    batting: {
      matches: 15,
      runs: 1250,
      balls: 890,
      average: 45.2,
      strikeRate: 140.4,
      boundaries: 45,
      boundaryPercentage: 15.2,
      fours: 38,
      sixes: 7,
      highest: 89,
      fifties: 8,
      hundreds: 1
    },
    bowling: {
      matches: 15,
      overs: 45.2,
      runs: 320,
      wickets: 12,
      average: 26.7,
      economy: 7.1,
      bestFigures: '4/25',
      maidens: 3
    },
    fielding: {
      catches: 8,
      stumpings: 0,
      runOuts: 3,
      directHits: 2
    }
  },
  fitness: {
    sprint20m: {
      current: 3.2,
      best: 2.9,
      average: 3.1,
      trend: 'improving'
    },
    beepTest: {
      current: 12.5,
      best: 13.2,
      average: 11.8,
      level: 'Excellent'
    },
    injuries: [
      {
        id: 1,
        type: 'Hamstring Strain',
        date: '2024-01-15',
        status: 'Recovered',
        recoveryTime: '2 weeks',
        severity: 'Minor'
      },
      {
        id: 2,
        type: 'Shoulder Impingement',
        date: '2023-11-20',
        status: 'Recovered',
        recoveryTime: '3 weeks',
        severity: 'Moderate'
      }
    ]
  },
  upcomingMatches: [
    {
      id: 1,
      opponent: 'City Cricket Club',
      date: '2024-01-20',
      time: '14:00',
      venue: 'Central Ground',
      type: 'T20',
      status: 'Confirmed'
    },
    {
      id: 2,
      opponent: 'Riverside CC',
      date: '2024-01-25',
      time: '10:00',
      venue: 'Riverside Park',
      type: 'ODI',
      status: 'Confirmed'
    }
  ],
  trainingSessions: [
    {
      id: 1,
      type: 'Batting Practice',
      date: '2024-01-18',
      time: '18:00',
      coach: 'Mike Johnson',
      attendance: 'Present'
    },
    {
      id: 2,
      type: 'Fitness Training',
      date: '2024-01-19',
      time: '17:00',
      coach: 'Sarah Wilson',
      attendance: 'Present'
    }
  ],
  recentResults: [
    {
      id: 1,
      opponent: 'Valley CC',
      date: '2024-01-10',
      result: 'Win',
      score: '245/8 (50) vs 198/10 (45.2)',
      myPerformance: '65 runs, 2/25',
      outcome: 'victory'
    },
    {
      id: 2,
      opponent: 'Hillside CC',
      date: '2024-01-05',
      result: 'Loss',
      score: '180/10 (42) vs 185/6 (38.5)',
      myPerformance: '28 runs, 1/30',
      outcome: 'defeat'
    },
    {
      id: 3,
      opponent: 'Lakeside CC',
      date: '2024-01-02',
      result: 'Draw',
      score: '220/8 (50) vs 220/9 (50)',
      myPerformance: '45 runs, 0/35',
      outcome: 'draw'
    }
  ],
  announcements: [
    "🏆 Congratulations to John Smith for being selected for the regional team!",
    "📅 Next training session scheduled for Saturday at 9:00 AM",
    "🎯 Team meeting on Friday to discuss upcoming tournament strategy",
    "⚡ New fitness program starting next week - all players welcome!"
  ]
};

export const performanceTrendData = [
  { month: 'Jan', runs: 120, wickets: 2, average: 42.1 },
  { month: 'Feb', runs: 135, wickets: 3, average: 45.2 },
  { month: 'Mar', runs: 118, wickets: 1, average: 38.9 },
  { month: 'Apr', runs: 142, wickets: 4, average: 48.7 },
  { month: 'May', runs: 128, wickets: 2, average: 44.3 },
  { month: 'Jun', runs: 155, wickets: 3, average: 52.1 }
];

export const fitnessTrendData = [
  { month: 'Jan', sprint: 3.4, beepTest: 11.2 },
  { month: 'Feb', sprint: 3.3, beepTest: 11.8 },
  { month: 'Mar', sprint: 3.2, beepTest: 12.1 },
  { month: 'Apr', sprint: 3.1, beepTest: 12.3 },
  { month: 'May', sprint: 3.0, beepTest: 12.4 },
  { month: 'Jun', sprint: 2.9, beepTest: 12.5 }
];

export const boundaryBreakdown = [
  { name: 'Fours', value: 38, color: '#3B82F6' },
  { name: 'Sixes', value: 7, color: '#EF4444' },
  { name: 'Singles/Doubles', value: 45, color: '#10B981' }
];
