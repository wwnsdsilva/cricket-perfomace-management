import React, { useEffect, useMemo, useState } from 'react';
import { Trophy, Calendar, Users, Newspaper, Clock, MapPin, Star, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Filter, Activity, Mail, Phone, Globe, ArrowRight, Camera, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { samplePlayers, upcomingMatches, clubAnnouncements, sampleEvents, sampleMatches } from '../data/sampleData';
import { NSBM_DESIGN_SYSTEM, getBrandColor } from '../styles/nsbm-design-system';
import { NSBMCard, NSBMBadge, NSBMSectionHeader, NSBMButton } from './ui/NSBMComponents';

// NSBM Brand Colors from Design System
const { colors } = NSBM_DESIGN_SYSTEM;
const nsbmGreen = colors.brandPrimary;
const nsbmBlue = colors.brandSecondary;
const nsbmGold = colors.brandAccent;

// Helper functions for colors with opacity
const getNsbmBlue = (opacity = 1) => getBrandColor('brandSecondary', opacity);
const getNsbmGreen = (opacity = 1) => getBrandColor('brandPrimary', opacity);
const getTopBatsmen = (players) =>
  [...players]
    .sort((a, b) => (b.runs || 0) - (a.runs || 0))
    .slice(0, 3);

const getTopBowlers = (players) =>
  [...players]
    .sort((a, b) => (b.wickets || 0) - (a.wickets || 0))
    .slice(0, 3);

const getTopFielders = (players) =>
  [...players]
    .sort((a, b) => (b.catches || 0) + (b.runOuts || 0) - ((a.catches || 0) + (a.runOuts || 0)))
    .slice(0, 3);

const ClubInformation = () => {
  const navigate = useNavigate();
  const [showFullSquad, setShowFullSquad] = useState(false);
  const [expandedPlayers, setExpandedPlayers] = useState({});
  const clubHistory = `NSBM Cricket Club has a proud legacy of excellence and community spirit. From its humble beginnings to a modern performance-driven club, NSBM has nurtured talent and achieved milestones across university and league competitions.`;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const togglePlayer = (playerId) => {
    setExpandedPlayers(prev => ({
      ...prev,
      [playerId]: !prev[playerId]
    }));
  };

  const toggleFullSquad = () => {
    setShowFullSquad(!showFullSquad);
  };

  const topBatsmen = getTopBatsmen(samplePlayers);
  const topBowlers = getTopBowlers(samplePlayers);
  const topFielders = getTopFielders(samplePlayers);

  // Events carousel state
  const [eventIndex, setEventIndex] = useState(0);
  const totalEvents = sampleEvents.length;

  // Photos slideshow state
  const [photoIndex, setPhotoIndex] = useState(0);
  const clubPhotos = [
    {
      id: 1,
      image: "/images/gallery/nsbm_gallery.jpg",
      caption: "NSBM Cricket Gallery",
      date: "February 15, 2024",
      featured: true
    },
    {
      id: 2,
      image: "/images/gallery/nsbm gallery_12.jpg",
      caption: "Gallery Collection 12",
      date: "February 28, 2024",
      featured: false
    },
    {
      id: 3,
      image: "/images/gallery/nsbm gallery_ss.jpg",
      caption: "Special Gallery Collection",
      date: "March 10, 2024",
      featured: false
    },
    {
      id: 4,
      image: "/images/gallery/nsbm_gallerry_e.jpg",
      caption: "Extended Gallery",
      date: "March 15, 2024",
      featured: false
    },
    {
      id: 5,
      image: "/images/gallery/nsbm_gallery_14.jpg",
      caption: "Gallery Collection 14",
      date: "March 20, 2024",
      featured: false
    },
    {
      id: 6,
      image: "/images/gallery/nsbm_gallery_15.jpg",
      caption: "Gallery Collection 15",
      date: "March 25, 2024",
      featured: false
    },
    {
      id: 7,
      image: "/images/gallery/nsbm_gallery_c.jpg",
      caption: "Cricket Action Gallery",
      date: "March 30, 2024",
      featured: false
    },
    {
      id: 8,
      image: "/images/gallery/nsbm_gallery_sf.jpg",
      caption: "Special Features Gallery",
      date: "April 5, 2024",
      featured: false
    }
  ];
  useEffect(() => {
    const id = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % totalEvents);
    }, 5000);
    return () => clearInterval(id);
  }, [totalEvents]);

  const nextEvent = () => setEventIndex((prev) => (prev + 1) % totalEvents);
  const prevEvent = () => setEventIndex((prev) => (prev - 1 + totalEvents) % totalEvents);

  // Photos navigation functions
  const nextPhoto = () => setPhotoIndex((prev) => (prev + 1) % clubPhotos.length);
  const prevPhoto = () => setPhotoIndex((prev) => (prev - 1 + clubPhotos.length) % clubPhotos.length);

  // Schedule filters and expand/collapse
  const [typeFilter, setTypeFilter] = useState('All');
  const [expanded, setExpanded] = useState({});
  const filteredMatches = useMemo(() => {
    if (typeFilter === 'All') return upcomingMatches;
    return upcomingMatches.filter((m) => m.type === typeFilter);
  }, [typeFilter]);
  const toggleExpand = (id) => setExpanded((e) => ({ ...e, [id]: !e[id] }));

  // Key profiles
  const captain = {
    name: 'Monil Jason',
    position: 'Captain',
    jerseyNumber: '-',
    photo: '/images/team leadership/captain.jpg'
  };
  const viceCaptain = {
    name: 'Maneendra Jayathilaka',
    position: 'Vice Captain',
    jerseyNumber: '55',
    photo: '/images/team leadership/vice_captain.jpg'
  };
  const micProfile = {
    name: 'Mr. Gayan Perera',
    position: 'MIC',
    jerseyNumber: '-',
    photo: '/images/team leadership/MIC.jpg'
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{backgroundColor: colors.backgroundSecondary}}>
      {/* NSBM Pitch Stripe Background Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{background: NSBM_DESIGN_SYSTEM.cricket.pitchStripe}}
      ></div>
      
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{backgroundColor: getNsbmGreen(0.08)}}></div>
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{backgroundColor: getNsbmBlue(0.08)}}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse delay-2000" style={{backgroundColor: getNsbmGreen(0.06)}}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl animate-pulse delay-3000" style={{backgroundColor: getNsbmBlue(0.06)}}></div>
      </div>

      <header className="text-white shadow-lg relative overflow-hidden backdrop-blur-sm" style={{backgroundColor: nsbmGreen}}>
        {/* Transparent overlay with subtle pattern */}
        <div className="absolute inset-0" style={{background: `linear-gradient(135deg, ${getNsbmGreen(0.8)} 0%, ${getNsbmBlue(0.7)} 100%)`}}></div>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16" style={{backgroundColor: 'rgba(255,255,255,0.15)'}}></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-12 -translate-x-12" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full" style={{backgroundColor: 'rgba(255,255,255,0.05)'}}></div>
        
        <div className="relative w-full mx-auto px-4 sm:px-6 xl:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img src="/images/logoNSBM.jpg" alt="NSBM Cricket Club" className="w-20 h-20 rounded-full ring-4 ring-white/30 shadow-lg" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-sm">NSBM Cricket Club</h1>
              <p className="text-sm text-white/90 font-medium drop-shadow-sm">Official Fan Dashboard – Read-only</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center px-4 py-2 rounded-lg text-white text-sm font-semibold" style={{backgroundColor: 'transparent'}}>
              Since 2017
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white text-sm font-semibold backdrop-blur-sm shadow-md hover:bg-white/20 transition-all duration-200"
              style={{backgroundColor: 'rgba(255,255,255,0.15)'}}
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative w-full mx-auto px-4 sm:px-6 xl:px-12 py-8">
        {/* Hero Image Section with NSBM Branding */}
        <NSBMCard className="mb-8 overflow-hidden relative p-0" elevated>
          <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[28rem]">
            <img
              src="/images/nsbm_cover.jpg"
              alt="NSBM Cricket Team in Action"
              className="w-full h-full object-cover"
            />
            {/* NSBM Crest Watermark */}
            <div 
              className="absolute top-4 right-4 w-16 h-16 opacity-20"
              style={{backgroundImage: 'url(/images/logoNSBM.jpg)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}
            ></div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-center">
              <div className="p-8 sm:p-12 text-white max-w-3xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 drop-shadow-lg">
                  NSBM Cricket Club
                </h2>
                <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 drop-shadow-md">
                  Excellence in Cricket Since 2017
                </p>
                <div className="flex items-center space-x-6 mt-6">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-6 h-6" style={{color: nsbmGold}} />
                    <span className="text-base font-medium">Multiple Championships</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-6 h-6" style={{color: nsbmBlue}} />
                    <span className="text-base font-medium">Elite Squad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NSBMCard>

        {/* Recent Match Results - Full Width with NSBM Branding */}
        <NSBMCard className="mb-8 p-6" elevated>
          <NSBMSectionHeader icon={Activity} title="Recent Match Results" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([...sampleMatches]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 3)
            ).map((match) => (
              <NSBMCard key={match.id} className="p-5" variant="secondary">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold" style={{color: colors.textPrimary}}>NSBM vs {match.opponent}</h4>
                  <NSBMBadge 
                    variant={match.result === 'Win' ? 'success' : match.result === 'Loss' ? 'error' : 'default'}
                    size="sm"
                  >
                    {match.result}
                  </NSBMBadge>
                </div>
                <p className="text-sm md:text-base" style={{color: colors.textSecondary}}>{match.score}</p>
                <div className="mt-3 flex items-center flex-wrap gap-4 text-sm" style={{color: colors.textMuted}}>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" style={{color: nsbmBlue}} />
                    <span>{new Date(match.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" style={{color: nsbmBlue}} />
                    <span>{match.venue}</span>
                  </div>
                </div>
              </NSBMCard>
            ))}
          </div>
        </NSBMCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Club Events - Structured Layout with NSBM Branding */}
            <NSBMCard className="overflow-hidden" elevated>
              <div className="flex items-center justify-between p-4">
                <NSBMSectionHeader icon={Calendar} title="Club Events" />
                <div className="flex space-x-1">
                  <NSBMButton 
                    variant="tertiary" 
                    size="sm" 
                    onClick={prevEvent} 
                    className="p-2"
                    aria-label="Previous event"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </NSBMButton>
                  <NSBMButton 
                    variant="tertiary" 
                    size="sm" 
                    onClick={nextEvent} 
                    className="p-2"
                    aria-label="Next event"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </NSBMButton>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="relative h-80 sm:h-96 lg:h-[28rem] xl:h-[32rem]">
                  <img
                    src={sampleEvents[eventIndex].image}
                    alt={sampleEvents[eventIndex].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 text-white w-full">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-2 drop-shadow-sm">{sampleEvents[eventIndex].name}</h4>
                          <div className="flex items-center space-x-2 text-sm sm:text-base lg:text-lg">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                            <span className="text-white/90 font-medium">{new Date(sampleEvents[eventIndex].date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {sampleEvents[eventIndex].featured && (
                          <NSBMBadge variant="warning" size="sm">Featured</NSBMBadge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-3 space-x-1">
                {sampleEvents.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setEventIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${i === eventIndex ? 'shadow-sm' : 'bg-gray-300'}`}
                    style={i === eventIndex ? {backgroundColor: nsbmGreen} : {}}
                    aria-label={`Go to event ${i + 1}`}
                  />
                ))}
              </div>
            </NSBMCard>

            {/* Club Gallery - Structured Layout with NSBM Branding */}
            <NSBMCard className="overflow-hidden" elevated>
              <div className="flex items-center justify-between p-4">
                <NSBMSectionHeader icon={Camera} title="Club Gallery" />
                <div className="flex space-x-1">
                  <NSBMButton 
                    variant="tertiary" 
                    size="sm" 
                    onClick={prevPhoto} 
                    className="p-2"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </NSBMButton>
                  <NSBMButton 
                    variant="tertiary" 
                    size="sm" 
                    onClick={nextPhoto} 
                    className="p-2"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </NSBMButton>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="relative h-80 sm:h-96 lg:h-[28rem] xl:h-[32rem]">
                  <img
                    src={clubPhotos[photoIndex].image}
                    alt={clubPhotos[photoIndex].caption}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 text-white w-full">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-2 drop-shadow-sm">{clubPhotos[photoIndex].caption}</h4>
                          <div className="flex items-center space-x-2 text-sm sm:text-base lg:text-lg">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                            <span className="text-white/90 font-medium">{clubPhotos[photoIndex].date}</span>
                          </div>
                        </div>
                        {clubPhotos[photoIndex].featured && (
                          <NSBMBadge variant="warning" size="sm">Featured</NSBMBadge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-3 space-x-1">
                {clubPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${i === photoIndex ? 'shadow-sm' : 'bg-gray-300'}`}
                    style={i === photoIndex ? {backgroundColor: nsbmGreen} : {}}
                    aria-label={`Go to photo ${i + 1}`}
                  />
                ))}
              </div>
            </NSBMCard>

            {/* Upcoming Schedule removed here (moved up) */}
          </div>

          {/* Right sidebar */}
          <aside className="space-y-8">
            {/* Club History - moved under events (right sidebar) with NSBM Branding */}
            <NSBMCard className="overflow-hidden" variant="primary">
              <div className="p-6">
                <NSBMSectionHeader icon={Star} title="Club History" />
                <p className="leading-relaxed" style={{color: colors.textSecondary}}>{clubHistory}</p>
              </div>
            </NSBMCard>

            {/* Recent News/Announcements with NSBM Branding */}
            <NSBMCard className="p-6" elevated>
              <NSBMSectionHeader icon={Newspaper} title="Recent News/Announcements" />
              <div className="space-y-3">
                {clubAnnouncements.map((item, index) => (
                  <NSBMCard key={index} className="p-3" variant="secondary">
                    <p className="text-sm" style={{color: colors.textSecondary}}>{item}</p>
                  </NSBMCard>
                ))}
              </div>
            </NSBMCard>

            {/* Upcoming Schedule - Moved from main content with NSBM Branding */}
            <NSBMCard className="p-6" elevated>
              <div className="flex items-center justify-between mb-6">
                <NSBMSectionHeader icon={Calendar} title="Upcoming Schedule" />
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" style={{color: colors.textMuted}} />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm"
                    style={{borderColor: colors.borderLight, color: colors.textPrimary, backgroundColor: colors.backgroundPrimary}}
                  >
                    <option>All</option>
                    <option>T10</option>
                    <option>T20</option>
                    <option>ODI</option>
                    <option>Test</option>
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                {filteredMatches.map((match) => (
                  <NSBMCard
                    key={match.id}
                    className="p-4 transition-all duration-200"
                    variant="secondary"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold" style={{color: colors.textPrimary}}>vs {match.opponent}</p>
                      <NSBMBadge variant="primary" size="sm">{match.type}</NSBMBadge>
                    </div>
                    <div className="flex items-center flex-wrap gap-4 mt-3 text-sm" style={{color: nsbmBlue}}>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" style={{color: nsbmBlue}} />
                        <span className="font-medium">{new Date(match.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" style={{color: nsbmBlue}} />
                        <span className="font-medium">{match.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" style={{color: nsbmBlue}} />
                        <span className="font-medium">{match.venue}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <NSBMButton
                        variant="tertiary"
                        size="sm"
                        onClick={() => toggleExpand(match.id)}
                        className="text-sm"
                      >
                        {expanded[match.id] ? 'Hide details' : 'View details'}
                      </NSBMButton>
                    </div>
                    {expanded[match.id] && (
                      <NSBMCard className="mt-3 text-sm p-3" variant="secondary">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <p className="font-semibold" style={{color: colors.textPrimary}}>Gates Open</p>
                            <p style={{color: colors.textMuted}}>1 hour before start</p>
                          </div>
                          <div>
                            <p className="font-semibold" style={{color: colors.textPrimary}}>Broadcast</p>
                            <p style={{color: colors.textMuted}}>NSBM Sports Live</p>
                          </div>
                        </div>
                      </NSBMCard>
                    )}
                  </NSBMCard>
                ))}
              </div>
            </NSBMCard>
          </aside>
        </div>

        {/* Top Performers - Full Width with NSBM Branding */}
        <NSBMCard className="mt-8 p-6" elevated>
          <NSBMSectionHeader icon={Trophy} title="Top Performers" badge="Updated" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Batsmen */}
            <div>
              <NSBMBadge variant="primary" size="md" className="mb-3">Batsmen</NSBMBadge>
              <div className="space-y-3">
                {topBatsmen.map((p) => (
                  <NSBMCard key={p.id} className="group relative overflow-hidden" variant="primary">
                    <div className="flex items-center p-4">
                      <img src={p.photo} alt={p.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm" />
                      <div className="ml-4 flex-1">
                        <p className="font-semibold" style={{color: nsbmBlue}}>{p.name}</p>
                        <p className="text-xs text-gray-500">#{p.jerseyNumber} • {p.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold" style={{color: nsbmGreen}}>{p.runs} runs</p>
                        <p className="text-xs text-gray-500">Avg {p.average}</p>
                      </div>
                    </div>
                  </NSBMCard>
                ))}
              </div>
            </div>

            {/* Top Bowlers */}
            <div>
              <NSBMBadge variant="primary" size="md" className="mb-3">Bowlers</NSBMBadge>
              <div className="space-y-3">
                {topBowlers.map((p) => (
                  <NSBMCard key={p.id} className="group relative overflow-hidden" variant="primary">
                    <div className="flex items-center p-4">
                      <img src={p.photo} alt={p.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm" />
                      <div className="ml-4 flex-1">
                        <p className="font-semibold" style={{color: nsbmBlue}}>{p.name}</p>
                        <p className="text-xs text-gray-500">#{p.jerseyNumber} • {p.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold" style={{color: nsbmGreen}}>{p.wickets} wickets</p>
                        <p className="text-xs text-gray-500">Econ {p.economyRate}</p>
                      </div>
                    </div>
                  </NSBMCard>
                ))}
              </div>
            </div>

            {/* Top Fielders */}
            <div>
              <NSBMBadge variant="primary" size="md" className="mb-3">Fielders</NSBMBadge>
              <div className="space-y-3">
                {topFielders.map((p) => (
                  <NSBMCard key={p.id} className="group relative overflow-hidden" variant="primary">
                    <div className="flex items-center p-4">
                      <img src={p.photo} alt={p.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm" />
                      <div className="ml-4 flex-1">
                        <p className="font-semibold" style={{color: nsbmBlue}}>{p.name}</p>
                        <p className="text-xs text-gray-500">#{p.jerseyNumber} • {p.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold" style={{color: nsbmGreen}}>{(p.catches||0)+(p.runOuts||0)} dismissals</p>
                      </div>
                    </div>
                  </NSBMCard>
                ))}
              </div>
            </div>
          </div>
        </NSBMCard>

        {/* Key Profiles and Squad link at bottom with NSBM Branding */}
        <NSBMCard className="mt-8 p-6" variant="secondary">
          <NSBMSectionHeader icon={Users} title="Team Leadership" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[{label: 'Vice Captain', p: viceCaptain}, {label: 'Captain', p: captain}, {label: 'Master In Charge (MIC)', p: micProfile}].map(({label, p}) => (
              <div key={label} className="text-center">
                <div className="mx-auto w-36 h-36 rounded-full overflow-hidden ring-4 ring-white shadow-lg" style={{backgroundColor: colors.backgroundSecondary}}>
                  <img src={p.photo} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <p className="mt-4 text-lg font-bold" style={{color: colors.textPrimary}}>{label}</p>
                <p className="text-base font-semibold" style={{color: colors.textSecondary}}>{p.name}</p>
              </div>
            ))}
          </div>
          
          {/* View Full Squad Button */}
          <div className="mt-6 text-center">
            <NSBMButton
              onClick={toggleFullSquad}
              variant="primary"
              size="lg"
              className="hover:scale-105 transition-all duration-300"
            >
              <Users className="w-5 h-5 mr-2" />
              {showFullSquad ? 'Hide Full Squad' : 'View Full Squad'}
              <ArrowRight className={`w-4 h-4 ml-2 transition-transform duration-300 ${showFullSquad ? 'rotate-180' : ''}`} />
            </NSBMButton>
          </div>
        </NSBMCard>

        {/* Full Squad Section with NSBM Branding */}
        {showFullSquad && (
          <NSBMCard className="mt-8 p-6 relative overflow-hidden" elevated>
            {/* Faded Background Image */}
            <div 
              className="absolute inset-0 opacity-5 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(/images/logoNSBM.jpg)'
              }}
            />
            {/* Content */}
            <div className="relative z-10">
              <NSBMSectionHeader icon={Users} title="Full Squad" />
              <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {samplePlayers.map(player => (
                      <NSBMCard
                        key={player.id}
                        className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-[1.02]"
                        variant="primary"
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: `linear-gradient(135deg, ${getNsbmGreen(0.05)} 0%, ${getNsbmBlue(0.05)} 100%)`}}></div>
                        <div className="relative p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between h-full min-h-[120px]">
                          <div className="flex items-center space-x-3 sm:space-x-4 flex-1 w-full sm:w-auto">
                            <div className="relative flex-shrink-0">
                              <img 
                                src={player.photo}
                                alt={player.name}
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover ring-2 sm:ring-3 ring-white shadow-md group-hover:ring-green-300 transition-all duration-300"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm sm:text-base lg:text-lg font-bold truncate" style={{color: colors.textPrimary}}>{player.name}</h3>
                              <p className="text-xs sm:text-sm font-medium truncate" style={{color: colors.textSecondary}}>{player.position}</p>
                            </div>
                          </div>
                          
                          {/* Jersey Number - Right Side Full Height */}
                          <div className="flex flex-col items-center justify-center h-full min-h-[60px] sm:min-h-[80px] mt-2 sm:mt-0">
                            <div 
                              className="flex flex-col items-center justify-center px-2 sm:px-4 py-2 sm:py-3 rounded-lg font-bold text-sm sm:text-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                              style={{
                                backgroundColor: nsbmGreen,
                                color: 'white',
                                minWidth: '50px',
                                textAlign: 'center',
                                border: `2px solid ${nsbmGreen}`,
                                boxShadow: `0 4px 8px ${getNsbmGreen(0.3)}`,
                                height: '100%',
                                minHeight: '50px'
                              }}
                            >
                              <span className="text-xs opacity-90">JERSEY</span>
                              <span className="text-sm sm:text-lg font-black">#{player.jerseyNumber}</span>
                            </div>
                          </div>
                          
                          <NSBMButton
                            onClick={() => togglePlayer(player.id)}
                            variant="tertiary"
                            size="sm"
                            className="p-2 rounded-full ml-2"
                          >
                            {expandedPlayers[player.id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </NSBMButton>
                        </div>
                        
                        {expandedPlayers[player.id] && (
                          <div className="mt-4 pt-4 border-t" style={{borderColor: colors.borderLight}}>
                            {/* Statistics Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                              <div className="text-center">
                                <p className="text-lg sm:text-xl lg:text-2xl font-bold" style={{color: nsbmGreen}}>{player.runs || 0}</p>
                                <p className="text-xs" style={{color: colors.textMuted}}>Runs</p>
                              </div>
                              <div className="text-center">
                                <p className="text-lg sm:text-xl lg:text-2xl font-bold" style={{color: nsbmBlue}}>{player.wickets || 0}</p>
                                <p className="text-xs" style={{color: colors.textMuted}}>Wickets</p>
                              </div>
                              <div className="text-center">
                                <p className="text-lg sm:text-xl lg:text-2xl font-bold" style={{color: nsbmGreen}}>{player.catches || 0}</p>
                                <p className="text-xs" style={{color: colors.textMuted}}>Catches</p>
                              </div>
                              <div className="text-center">
                                <p className="text-lg sm:text-xl lg:text-2xl font-bold" style={{color: nsbmBlue}}>{player.runOuts || 0}</p>
                                <p className="text-xs" style={{color: colors.textMuted}}>Run Outs</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </NSBMCard>
                ))}
              </div>
              </div>
            </div>
          </NSBMCard>
        )}
      </div>
      {/* Footer with NSBM Branding */}
      <footer className="mt-10 text-white shadow-lg relative overflow-hidden backdrop-blur-sm" style={{backgroundColor: nsbmGreen}}>
        {/* NSBM Crest Watermark */}
        <div 
          className="absolute top-4 right-4 w-20 h-20 opacity-10"
          style={{backgroundImage: 'url(/images/logoNSBM.jpg)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}}
        ></div>
        
        {/* Transparent overlay with subtle pattern */}
        <div className="absolute inset-0" style={{background: `linear-gradient(135deg, ${getNsbmGreen(0.8)} 0%, ${getNsbmBlue(0.7)} 100%)`}}></div>
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full -translate-y-16 -translate-x-16" style={{backgroundColor: 'rgba(255,255,255,0.15)'}}></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full translate-y-12 translate-x-12" style={{backgroundColor: 'rgba(255,255,255,0.1)'}}></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full" style={{backgroundColor: 'rgba(255,255,255,0.05)'}}></div>
        
        <div className="relative w-full mx-auto px-4 sm:px-6 xl:px-12 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center space-x-3">
              <img src="/images/logoNSBM.jpg" alt="NSBM Cricket Club" className="w-12 h-12 rounded-full ring-2 ring-white/30 shadow-lg" />
              <div>
                <p className="text-xl font-bold text-white drop-shadow-sm">NSBM Cricket Club</p>
                <p className="text-sm text-white/90 font-medium drop-shadow-sm">Since 2017 • Excellence and Sportsmanship</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="p-1 rounded" style={{backgroundColor: 'rgba(255,255,255,0.15)'}}>
                  <Mail className="w-4 h-4 text-white/90" />
                </div>
                <a href="mailto:cricket@nsbm.ac.lk" className="hover:underline font-medium text-white/90">cricket@nsbm.ac.lk</a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="p-1 rounded" style={{backgroundColor: 'rgba(255,255,255,0.15)'}}>
                  <Phone className="w-4 h-4 text-white/90" />
                </div>
                <a href="tel:+94112345678" className="hover:underline font-medium text-white/90">+94 11 234 5678</a>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="p-1 rounded" style={{backgroundColor: 'rgba(255,255,255,0.15)'}}>
                  <MapPin className="w-4 h-4 text-white/90" />
                </div>
                <span className="font-medium text-white/90">NSBM Green University, Pitipana - Thalagala Rd, Homagama</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="p-1 rounded" style={{backgroundColor: 'rgba(255,255,255,0.15)'}}>
                  <Globe className="w-4 h-4 text-white/90" />
                </div>
                <a href="https://nsbm.ac.lk" target="_blank" rel="noreferrer" className="hover:underline font-medium text-white/90">nsbm.ac.lk</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/90 font-medium">
            © 2024 NSBM Cricket Club. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClubInformation;


