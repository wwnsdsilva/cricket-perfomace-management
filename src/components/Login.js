import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Trophy, Shield, Users, User, Info, Star, Award, Target, BarChart3 } from 'lucide-react';
import { sampleUsers } from '../data/sampleData';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'Admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user in sample data
      const user = sampleUsers.find(
        u => u.username === formData.username && 
        u.password === formData.password && 
        u.role === formData.role
      );

      if (user) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', 'sample-jwt-token-' + user.id);
        
        // Navigate based on role
        switch (user.role) {
          case 'Admin':
            navigate('/admin/dashboard');
            break;
          case 'MIC':
            navigate('/mic/dashboard');
            break;
          case 'Player':
            navigate('/player/dashboard');
            break;
          case 'Normal':
            navigate('/club');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        setError('Invalid credentials. Please check your username, password, and role.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'Admin':
        return <Shield className="w-5 h-5" />;
      case 'MIC':
        return <Users className="w-5 h-5" />;
      case 'Player':
        return <User className="w-5 h-5" />;
      case 'Normal':
        return <Info className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRoleDescription = (role) => {
    switch (role) {
      case 'Admin':
        return 'Full access to player data, matches, and reports';
      case 'MIC':
        return 'Access to performance tracking and match records';
      case 'Player':
        return 'View personal statistics and training schedule';
      case 'Normal':
        return 'Public, read-only access to general club information';
      default:
        return '';
    }
  };

  // NSBM Brand Colors
  const nsbmGreen = '#8BC34A'; // Same as normal user dashboard
  const nsbmBlue = '#0D47A1';
  const accentGreen = '#4CAF50';
  const accentBlue = '#2196F3';
  const lightGreen = '#E8F5E8';
  const lightBlue = '#E3F2FD';

  return (
    <div className="h-screen relative overflow-hidden" style={{background: `linear-gradient(135deg, #0A0E27, #1A1A2E, #16213E)`}}>
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{background: `linear-gradient(135deg, rgba(10,14,39,0.9), rgba(26,26,46,0.8), rgba(22,33,62,0.7))`}}></div>
        <div className="absolute inset-0" style={{background: `linear-gradient(90deg, rgba(10,14,39,0.6), transparent, rgba(22,33,62,0.5))`}}></div>
        <div className="absolute inset-0" style={{background: `linear-gradient(0deg, rgba(0,0,0,0.8), transparent, rgba(10,14,39,0.4))`}}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full blur-xl animate-pulse" style={{backgroundColor: `rgba(10,14,39,0.5)`}}></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full blur-2xl animate-pulse delay-1000" style={{backgroundColor: `rgba(22,33,62,0.4)`}}></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 rounded-full blur-xl animate-pulse delay-2000" style={{backgroundColor: `rgba(26,26,46,0.4)`}}></div>
        <div className="absolute bottom-20 right-1/3 w-16 h-16 rounded-full blur-lg animate-pulse delay-3000" style={{backgroundColor: `rgba(22,33,62,0.3)`}}></div>
        <div className="absolute top-1/2 left-1/3 w-12 h-12 rounded-full blur-lg animate-pulse delay-4000" style={{backgroundColor: `rgba(0,0,0,0.6)`}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-18 h-18 rounded-full blur-xl animate-pulse delay-5000" style={{backgroundColor: `rgba(10,14,39,0.3)`}}></div>
      </div>

      <div className="relative z-20 h-screen flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 lg:gap-12 items-center min-h-full py-4 sm:py-8">
          {/* Left Side - Logo and Branding */}
          <div className="text-center lg:text-left text-white space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Logo and Title */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="flex flex-col items-center lg:items-start space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Large Round Logo */}
                <div className="relative">
                  <img 
                    src="/images/logoNSBM.jpg" 
                    alt="NSBM Logo" 
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full ring-4 sm:ring-6 lg:ring-8 ring-white/30 shadow-2xl object-cover"
                  />
                </div>
                
                {/* Title and Description */}
                <div className="text-center lg:text-left px-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent leading-tight">
                    NSBM Cricket Club
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-green-200/90 font-medium mt-2 sm:mt-4">
                    Performance Management System
                  </p>
                </div>
              </div>
              
              {/* Copyright */}
              <div className="mt-4 sm:mt-6 lg:mt-8 text-center lg:text-left px-2">
                <p className="text-white/70 text-xs sm:text-sm">
                  © 2024 NSBM Cricket Club. All rights reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto max-h-screen overflow-y-auto order-1 lg:order-2">

        {/* Login Form */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/20 overflow-hidden">
              {/* Logo Background */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="/images/logoNSBM.jpg" 
                  alt="NSBM Logo Background" 
                  className="w-full h-full object-cover opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>
          </div>
              
              {/* Form Content */}
              <div className="relative z-10">

          {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/20 border border-red-400/50 rounded-xl backdrop-blur-sm">
                  <p className="text-red-200 text-xs sm:text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Username Field */}
            <div>
                  <label htmlFor="username" className="block text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2">
                Username
              </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base bg-white/20 border border-white/20 rounded-lg sm:rounded-xl focus:ring-1 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 text-white placeholder-white/70 backdrop-blur-sm"
                    placeholder="Enter your username"
                    required
                  />
            </div>

            {/* Password Field */}
            <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2">
                Password
              </label>
              <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 pr-10 sm:pr-12 text-sm sm:text-base bg-white/20 border border-white/20 rounded-lg sm:rounded-xl focus:ring-1 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 text-white placeholder-white/70 backdrop-blur-sm"
                      placeholder="Enter your password"
                      required
                    />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
                  <label htmlFor="role" className="block text-xs sm:text-sm font-semibold text-white mb-1 sm:mb-2">
                Role
              </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base bg-white/20 border border-white/20 rounded-lg sm:rounded-xl focus:ring-1 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 text-white backdrop-blur-sm"
                    required
                  >
                    <option value="Admin" className="bg-gray-800 text-white">Admin</option>
                    <option value="MIC" className="bg-gray-800 text-white">MIC (Manager in Charge)</option>
                    <option value="Player" className="bg-gray-800 text-white">Player</option>
                    <option value="Normal" className="bg-gray-800 text-white">Normal User</option>
              </select>
            </div>

            {/* Role Description */}
                <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-white/20">
                {getRoleIcon(formData.role)}
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-white">{formData.role}</span>
              </div>
                  <p className="text-xs sm:text-sm text-white/80">{getRoleDescription(formData.role)}</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
                  className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-white text-sm sm:text-base lg:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-white/20 border-2 border-white/30 backdrop-blur-sm hover:bg-white/30"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 sm:mr-3"></div>
                  <span className="text-xs sm:text-sm lg:text-base">Signing In...</span>
                </div>
              ) : (
                    <div className="flex items-center justify-center">
                      <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm lg:text-base">Sign In</span>
                    </div>
              )}
            </button>
          </form>

          {/* Sample Credentials */}
              <div className="mt-4 sm:mt-6 lg:mt-8 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm">
                <h3 className="text-xs sm:text-sm font-bold mb-2 sm:mb-4 text-white">Sample Credentials:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
                  <div className="p-1.5 sm:p-2 rounded-lg bg-white/20">
                    <div className="font-semibold text-white text-xs">Admin</div>
                    <div className="text-white/70 text-xs">admin / admin123</div>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-white/20">
                    <div className="font-semibold text-white text-xs">MIC</div>
                    <div className="text-white/70 text-xs">mic / mic123</div>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-white/20">
                    <div className="font-semibold text-white text-xs">Player</div>
                    <div className="text-white/70 text-xs">player / player123</div>
                  </div>
                  <div className="p-1.5 sm:p-2 rounded-lg bg-white/20">
                    <div className="font-semibold text-white text-xs">Normal</div>
                    <div className="text-white/70 text-xs">normal / normal123</div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
