import axios from 'axios';

// Base URL for your Spring Boot backend
const BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API endpoints
export const authAPI = {
  // POST /api/auth/login
  login: (credentials) => apiClient.post('/auth/login', credentials),
  
  // POST /api/auth/logout
  logout: () => apiClient.post('/auth/logout'),
  
  // GET /api/auth/me
  getCurrentUser: () => apiClient.get('/auth/me'),
  
  // POST /api/auth/refresh
  refreshToken: () => apiClient.post('/auth/refresh'),
};

// Players API endpoints
export const playersAPI = {
  // GET /api/players
  getAllPlayers: () => apiClient.get('/players'),
  
  // GET /api/players/{id}
  getPlayerById: (id) => apiClient.get(`/players/${id}`),
  
  // POST /api/players
  createPlayer: (playerData) => apiClient.post('/players', playerData),
  
  // PUT /api/players/{id}
  updatePlayer: (id, playerData) => apiClient.put(`/players/${id}`, playerData),
  
  // DELETE /api/players/{id}
  deletePlayer: (id) => apiClient.delete(`/players/${id}`),
  
  // GET /api/players/top-performers
  getTopPerformers: () => apiClient.get('/players/top-performers'),
  
  // GET /api/players/{id}/statistics
  getPlayerStatistics: (id) => apiClient.get(`/players/${id}/statistics`),
};

// Matches API endpoints
export const matchesAPI = {
  // GET /api/matches
  getAllMatches: () => apiClient.get('/matches'),
  
  // GET /api/matches/{id}
  getMatchById: (id) => apiClient.get(`/matches/${id}`),
  
  // POST /api/matches
  createMatch: (matchData) => apiClient.post('/matches', matchData),
  
  // PUT /api/matches/{id}
  updateMatch: (id, matchData) => apiClient.put(`/matches/${id}`, matchData),
  
  // DELETE /api/matches/{id}
  deleteMatch: (id) => apiClient.delete(`/matches/${id}`),
  
  // GET /api/matches/recent
  getRecentMatches: (limit = 3) => apiClient.get(`/matches/recent?limit=${limit}`),
  
  // GET /api/matches/upcoming
  getUpcomingMatches: () => apiClient.get('/matches/upcoming'),
  
  // GET /api/matches/statistics
  getMatchStatistics: () => apiClient.get('/matches/statistics'),
};

// Events API endpoints
export const eventsAPI = {
  // GET /api/events
  getAllEvents: () => apiClient.get('/events'),
  
  // GET /api/events/{id}
  getEventById: (id) => apiClient.get(`/events/${id}`),
  
  // POST /api/events
  createEvent: (eventData) => apiClient.post('/events', eventData),
  
  // PUT /api/events/{id}
  updateEvent: (id, eventData) => apiClient.put(`/events/${id}`, eventData),
  
  // DELETE /api/events/{id}
  deleteEvent: (id) => apiClient.delete(`/events/${id}`),
  
  // GET /api/events/upcoming
  getUpcomingEvents: () => apiClient.get('/events/upcoming'),
  
  // GET /api/events/featured
  getFeaturedEvents: () => apiClient.get('/events/featured'),
};

// Dashboard API endpoints
export const dashboardAPI = {
  // GET /api/dashboard/stats
  getDashboardStats: () => apiClient.get('/dashboard/stats'),
  
  // GET /api/dashboard/performance-summary
  getPerformanceSummary: () => apiClient.get('/dashboard/performance-summary'),
  
  // GET /api/dashboard/announcements
  getAnnouncements: () => apiClient.get('/dashboard/announcements'),
};

// Reports API endpoints
export const reportsAPI = {
  // GET /api/reports/player-performance
  getPlayerPerformanceReport: (playerId, dateRange) => 
    apiClient.get(`/reports/player-performance/${playerId}?start=${dateRange.start}&end=${dateRange.end}`),
  
  // GET /api/reports/team-performance
  getTeamPerformanceReport: (dateRange) => 
    apiClient.get(`/reports/team-performance?start=${dateRange.start}&end=${dateRange.end}`),
  
  // GET /api/reports/match-summary
  getMatchSummaryReport: (matchId) => apiClient.get(`/reports/match-summary/${matchId}`),
};

// Utility functions
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('authToken');
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export const clearAuth = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  delete apiClient.defaults.headers.common['Authorization'];
};

export default apiClient;
