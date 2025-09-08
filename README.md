# Cricket Club Performance Management System

A modern, responsive web application for managing cricket club performance, player statistics, match results, and club events. Built with React and designed with a beautiful green and blue color theme.

## 🏏 Features

### 🔐 Role-Based Authentication
- **Admin**: Full access to player data management, match data, scheduling, and reports
- **MIC (Manager in Charge)**: Access to performance tracking, fitness monitoring, and match records
- **Player**: Access to personal statistics, fitness history, and training schedule

### 📊 Dashboard Features
- **Top Performers Panel**: Top 5 batsmen and bowlers with detailed statistics
- **Recent Match Results**: Last 3 matches with color-coded results
- **Upcoming Matches**: Calendar preview with match details
- **Club Events**: Featured events with carousel slider
- **Performance Charts**: Win/loss ratio and performance trends
- **Player of the Month**: Highlighted achievement
- **Live Announcements**: Scrolling ticker with club updates

### 🎨 Modern UI/UX Design
- Beautiful gradient backgrounds with green and blue theme
- Responsive design for all devices
- Smooth animations and transitions
- Interactive charts and visualizations
- Glass morphism effects
- Modern card-based layout

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cricket-perfomace-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 Sample Login Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | admin | admin123 |
| MIC | mic | mic123 |
| Player | player | player123 |

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Login.js        # Authentication component
│   ├── Dashboard.js    # Main dashboard
│   └── ProtectedRoute.js # Route protection
├── data/               # Sample data
│   └── sampleData.js   # Hardcoded sample data
├── services/           # API services
│   └── apiService.js   # API client and endpoints
├── styles/             # Custom styles
├── utils/              # Utility functions
└── pages/              # Page components
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3B82F6
- **Secondary Green**: #10B981
- **Accent Yellow**: #FACC15
- **Neutral Grays**: #F9FAFB, #6B7280, #1F2937

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Headings**: Bold weights (600-700)
- **Body Text**: Regular weight (400)

### Components
- **Cards**: Rounded corners (12px), soft shadows
- **Buttons**: Gradient backgrounds, hover effects
- **Forms**: Clean inputs with focus states
- **Charts**: Recharts integration with custom colors

## 🔌 API Integration

The application is designed to work with a Spring Boot backend. All API endpoints are documented in `API_ENDPOINTS.md`.

### Key API Features
- JWT-based authentication
- Role-based access control
- RESTful endpoints
- Comprehensive error handling
- Pagination support

### Backend Requirements
- Spring Boot 2.7+
- Spring Security for JWT
- Spring Data JPA
- MySQL/PostgreSQL database

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Key Components

### Login Component
- Role-based authentication
- Beautiful form design
- Input validation
- Loading states
- Error handling

### Dashboard Component
- Top performers leaderboard
- Match results with color coding
- Upcoming matches calendar
- Club events carousel
- Performance charts
- Live announcements

### Protected Routes
- Role-based access control
- Automatic redirection
- Token validation

## 🛠️ Technologies Used

- **React 19.1.1**: Frontend framework
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Recharts**: Chart library
- **Lucide React**: Icon library
- **Axios**: HTTP client

## 📊 Sample Data

The application includes comprehensive sample data:
- 5 sample players with realistic statistics
- 3 recent match results
- 3 upcoming matches
- 4 club events
- Player of the month data
- Club announcements

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  primary: { /* Blue shades */ },
  secondary: { /* Green shades */ },
  accent: { /* Yellow shades */ }
}
```

### Sample Data
Modify `src/data/sampleData.js` to customize:
- Player information
- Match results
- Club events
- Announcements

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Build the project
2. Upload the `build` folder
3. Configure environment variables if needed

## 🔧 Development

### Available Scripts
- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

### Code Style
- ESLint configuration included
- Prettier formatting recommended
- Component-based architecture
- Functional components with hooks

## 📈 Performance Features

- Lazy loading for components
- Optimized images
- Efficient state management
- Minimal bundle size
- Fast loading times

## 🔒 Security Features

- JWT token authentication
- Role-based access control
- Protected routes
- Input validation
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the API documentation
- Review the sample data structure
- Test with provided credentials
- Ensure all dependencies are installed

## 🎉 Features Showcase

### Login Page
- Beautiful gradient background
- Role selection with descriptions
- Sample credentials display
- Smooth animations

### Dashboard
- Real-time data visualization
- Interactive charts
- Responsive grid layout
- Modern card design

### Performance Tracking
- Top performers leaderboard
- Match statistics
- Win/loss ratios
- Player achievements

### Event Management
- Featured events
- Event carousel
- Registration buttons
- Event details

---

**Built with ❤️ for Cricket Clubs Worldwide**