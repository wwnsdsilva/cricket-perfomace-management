# Cricket Club Performance Management System - API Endpoints

This document outlines all the REST API endpoints that need to be implemented in your Spring Boot backend to support the React frontend.

## Base URL
```
http://localhost:8080/api
```

## Authentication Endpoints

### POST /api/auth/login
**Description:** Authenticate user and return JWT token
**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "role": "string" // "Admin", "MIC", "Player"
}
```
**Response:**
```json
{
  "token": "jwt-token-string",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "Admin",
    "name": "John Smith",
    "email": "admin@cricketclub.com"
  }
}
```

### POST /api/auth/logout
**Description:** Logout user and invalidate token
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### GET /api/auth/me
**Description:** Get current user information
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "id": 1,
  "username": "admin",
  "role": "Admin",
  "name": "John Smith",
  "email": "admin@cricketclub.com"
}
```

### POST /api/auth/refresh
**Description:** Refresh JWT token
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "token": "new-jwt-token-string"
}
```

## Players API Endpoints

### GET /api/players
**Description:** Get all players
**Headers:** Authorization: Bearer {token}
**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 20)
- `sort` (optional): Sort field (default: "name")
- `order` (optional): Sort order "asc" or "desc" (default: "asc")

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "name": "David Warner",
      "position": "Batsman",
      "jerseyNumber": 31,
      "photo": "base64-string-or-url",
      "runs": 1250,
      "average": 45.2,
      "strikeRate": 142.5,
      "wickets": 0,
      "economyRate": 0,
      "bowlingAverage": 0,
      "matches": 15,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-15T00:00:00Z"
    }
  ],
  "totalElements": 25,
  "totalPages": 2,
  "size": 20,
  "number": 0
}
```

### GET /api/players/{id}
**Description:** Get player by ID
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "id": 1,
  "name": "David Warner",
  "position": "Batsman",
  "jerseyNumber": 31,
  "photo": "base64-string-or-url",
  "runs": 1250,
  "average": 45.2,
  "strikeRate": 142.5,
  "wickets": 0,
  "economyRate": 0,
  "bowlingAverage": 0,
  "matches": 15,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

### POST /api/players
**Description:** Create new player (Admin only)
**Headers:** Authorization: Bearer {token}
**Request Body:**
```json
{
  "name": "string",
  "position": "string", // "Batsman", "Bowler", "All-rounder", "Wicket-keeper"
  "jerseyNumber": "integer",
  "photo": "base64-string-or-url",
  "email": "string",
  "phone": "string",
  "dateOfBirth": "2024-01-01",
  "joiningDate": "2024-01-01"
}
```
**Response:**
```json
{
  "id": 1,
  "name": "New Player",
  "position": "Batsman",
  "jerseyNumber": 99,
  "photo": "base64-string-or-url",
  "runs": 0,
  "average": 0,
  "strikeRate": 0,
  "wickets": 0,
  "economyRate": 0,
  "bowlingAverage": 0,
  "matches": 0,
  "createdAt": "2024-01-15T00:00:00Z",
  "updatedAt": "2024-01-15T00:00:00Z"
}
```

### PUT /api/players/{id}
**Description:** Update player (Admin only)
**Headers:** Authorization: Bearer {token}
**Request Body:** Same as POST
**Response:** Updated player object

### DELETE /api/players/{id}
**Description:** Delete player (Admin only)
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "message": "Player deleted successfully"
}
```

### GET /api/players/top-performers
**Description:** Get top performing players
**Headers:** Authorization: Bearer {token}
**Query Parameters:**
- `type` (optional): "batsmen" or "bowlers" (default: "all")
- `limit` (optional): Number of players to return (default: 5)

**Response:**
```json
{
  "topBatsmen": [
    {
      "id": 1,
      "name": "David Warner",
      "runs": 1250,
      "average": 45.2,
      "strikeRate": 142.5,
      "photo": "base64-string-or-url"
    }
  ],
  "topBowlers": [
    {
      "id": 3,
      "name": "Mitchell Starc",
      "wickets": 28,
      "economyRate": 4.8,
      "bowlingAverage": 18.9,
      "photo": "base64-string-or-url"
    }
  ]
}
```

### GET /api/players/{id}/statistics
**Description:** Get detailed player statistics
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "playerId": 1,
  "playerName": "David Warner",
  "battingStats": {
    "totalRuns": 1250,
    "average": 45.2,
    "strikeRate": 142.5,
    "highestScore": 156,
    "centuries": 3,
    "halfCenturies": 8,
    "fours": 120,
    "sixes": 25
  },
  "bowlingStats": {
    "totalWickets": 0,
    "economyRate": 0,
    "bowlingAverage": 0,
    "bestFigures": "0/0",
    "maidens": 0
  },
  "fieldingStats": {
    "catches": 12,
    "stumpings": 0,
    "runOuts": 3
  },
  "matchStats": {
    "totalMatches": 15,
    "matchesWon": 10,
    "matchesLost": 4,
    "matchesDrawn": 1
  }
}
```

## Matches API Endpoints

### GET /api/matches
**Description:** Get all matches
**Headers:** Authorization: Bearer {token}
**Query Parameters:**
- `page`, `size`, `sort`, `order` (same as players)
- `status` (optional): "upcoming", "ongoing", "completed"
- `type` (optional): "T20", "ODI", "Test"

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "opponent": "Lions CC",
      "date": "2024-01-15",
      "venue": "Central Cricket Ground",
      "result": "Win",
      "score": "245/8 (45.2) vs 189/10 (38.1)",
      "topPerformer": "David Warner - 89 runs",
      "type": "T20",
      "status": "completed",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "totalElements": 50,
  "totalPages": 3,
  "size": 20,
  "number": 0
}
```

### GET /api/matches/{id}
**Description:** Get match by ID
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "id": 1,
  "opponent": "Lions CC",
  "date": "2024-01-15",
  "venue": "Central Cricket Ground",
  "result": "Win",
  "score": "245/8 (45.2) vs 189/10 (38.1)",
  "topPerformer": "David Warner - 89 runs",
  "type": "T20",
  "status": "completed",
  "teamScore": {
    "runs": 245,
    "wickets": 8,
    "overs": 45.2
  },
  "opponentScore": {
    "runs": 189,
    "wickets": 10,
    "overs": 38.1
  },
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### POST /api/matches
**Description:** Create new match (Admin/MIC only)
**Headers:** Authorization: Bearer {token}
**Request Body:**
```json
{
  "opponent": "string",
  "date": "2024-01-22",
  "venue": "string",
  "type": "T20", // "T20", "ODI", "Test"
  "time": "10:00 AM"
}
```

### PUT /api/matches/{id}
**Description:** Update match (Admin/MIC only)
**Headers:** Authorization: Bearer {token}

### DELETE /api/matches/{id}
**Description:** Delete match (Admin only)
**Headers:** Authorization: Bearer {token}

### GET /api/matches/recent
**Description:** Get recent matches
**Headers:** Authorization: Bearer {token}
**Query Parameters:**
- `limit` (optional): Number of matches (default: 3)

### GET /api/matches/upcoming
**Description:** Get upcoming matches
**Headers:** Authorization: Bearer {token}

### GET /api/matches/statistics
**Description:** Get match statistics
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "totalMatches": 50,
  "matchesWon": 32,
  "matchesLost": 15,
  "matchesDrawn": 3,
  "winPercentage": 64.0,
  "recentForm": ["W", "L", "W", "W", "L"]
}
```

## Events API Endpoints

### GET /api/events
**Description:** Get all events
**Headers:** Authorization: Bearer {token}
**Query Parameters:**
- `page`, `size`, `sort`, `order`
- `type` (optional): "Festival", "Ceremony", "Workshop", "Fundraising"
- `status` (optional): "upcoming", "ongoing", "completed"

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "name": "Annual Cricket Festival 2024",
      "date": "2024-02-15",
      "venue": "Central Cricket Ground",
      "description": "Join us for our biggest event of the year",
      "image": "base64-string-or-url",
      "type": "Festival",
      "featured": true,
      "status": "upcoming",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "totalElements": 10,
  "totalPages": 1,
  "size": 20,
  "number": 0
}
```

### GET /api/events/{id}
**Description:** Get event by ID
**Headers:** Authorization: Bearer {token}

### POST /api/events
**Description:** Create new event (Admin only)
**Headers:** Authorization: Bearer {token}
**Request Body:**
```json
{
  "name": "string",
  "date": "2024-02-15",
  "venue": "string",
  "description": "string",
  "image": "base64-string-or-url",
  "type": "Festival",
  "featured": false
}
```

### PUT /api/events/{id}
**Description:** Update event (Admin only)
**Headers:** Authorization: Bearer {token}

### DELETE /api/events/{id}
**Description:** Delete event (Admin only)
**Headers:** Authorization: Bearer {token}

### GET /api/events/upcoming
**Description:** Get upcoming events
**Headers:** Authorization: Bearer {token}

### GET /api/events/featured
**Description:** Get featured events
**Headers:** Authorization: Bearer {token}

## Dashboard API Endpoints

### GET /api/dashboard/stats
**Description:** Get dashboard statistics
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "totalPlayers": 25,
  "totalMatches": 50,
  "totalEvents": 10,
  "winPercentage": 64.0,
  "playerOfTheMonth": {
    "name": "David Warner",
    "photo": "base64-string-or-url",
    "achievement": "Player of the Month - January 2024",
    "stats": "1,250 runs in 15 matches with 3 centuries"
  }
}
```

### GET /api/dashboard/performance-summary
**Description:** Get performance summary for charts
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "winLossData": [
    { "name": "Wins", "value": 8, "color": "#10B981" },
    { "name": "Losses", "value": 4, "color": "#EF4444" },
    { "name": "Draws", "value": 1, "color": "#6B7280" }
  ],
  "performanceTrend": [
    { "month": "Jan", "runs": 1200, "wickets": 15 },
    { "month": "Feb", "runs": 1350, "wickets": 18 }
  ]
}
```

### GET /api/dashboard/announcements
**Description:** Get club announcements
**Headers:** Authorization: Bearer {token}
**Response:**
```json
{
  "announcements": [
    "🏆 Congratulations to David Warner for being Player of the Month!",
    "📅 Annual Cricket Festival registration is now open!",
    "⚡ New training schedule available for all players"
  ]
}
```

## Reports API Endpoints

### GET /api/reports/player-performance/{playerId}
**Description:** Get player performance report
**Headers:** Authorization: Bearer {token}
**Query Parameters:**
- `start`: Start date (YYYY-MM-DD)
- `end`: End date (YYYY-MM-DD)

### GET /api/reports/team-performance
**Description:** Get team performance report
**Headers:** Authorization: Bearer {token}
**Query Parameters:**
- `start`: Start date (YYYY-MM-DD)
- `end`: End date (YYYY-MM-DD)

### GET /api/reports/match-summary/{matchId}
**Description:** Get match summary report
**Headers:** Authorization: Bearer {token}

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "string",
  "message": "string",
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/players"
}
```

## HTTP Status Codes

- `200 OK`: Successful GET, PUT requests
- `201 Created`: Successful POST requests
- `204 No Content`: Successful DELETE requests
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## Authentication

All endpoints (except login) require a valid JWT token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

## Role-Based Access Control

- **Admin**: Full access to all endpoints
- **MIC**: Access to players, matches, events (read/write), reports (read)
- **Player**: Access to own data, match results, events (read-only)

## Sample Data

The frontend includes sample data that matches these API structures. You can use this as a reference for implementing your Spring Boot backend.
