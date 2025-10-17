import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ChevronRight, Church, Users, Heart, BookOpen, Briefcase, UserCircle, Monitor, Music, Clock, Award, Search, Check } from 'lucide-react';

const roles = [
  { 
    id: 'senior-pastor', 
    name: 'Senior Pastor', 
    icon: Church,
    description: 'Leading congregation and spiritual guidance' 
  },
  { id: 'youth-minister', name: 'Youth Minister', icon: Users, description: 'Mentoring and guiding young people' },
  { id: 'worship-leader', name: 'Worship Leader', icon: Music, description: 'Leading musical worship and praise' },
  { id: 'admin-team', name: 'Admin Team', icon: Briefcase, description: 'Managing church operations and administration' },
  { id: 'volunteer-leader', name: 'Volunteer Leader', icon: Heart, description: 'Coordinating and leading volunteers' },
  { id: 'tech-team', name: 'Tech Team', icon: Monitor, description: 'Supporting technology and media needs' }
];

const goals = [
  'Lead with Confidence',
  'Speak with Clarity',
  'Create Team Unity',
  'Resolve Conflicts Fast',
  'Develop Your People'
];

const countries = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Kenya', flag: '🇰🇪' },
  { name: 'Philippines', flag: '🇵🇭' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'Uganda', flag: '🇺🇬' },
  { name: 'New Zealand', flag: '🇳🇿' },
  { name: 'Singapore', flag: '🇸🇬' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'Indonesia', flag: '🇮🇩' },
  { name: 'Jamaica', flag: '🇯🇲' },
  { name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { name: 'Barbados', flag: '🇧🇧' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Norway', flag: '🇳🇴' },
  { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Finland', flag: '🇫🇮' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Chile', flag: '🇨🇱' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Peru', flag: '🇵🇪' },
  { name: 'Venezuela', flag: '🇻🇪' },
  { name: 'Ecuador', flag: '🇪🇨' },
  { name: 'Costa Rica', flag: '🇨🇷' },
  { name: 'Panama', flag: '🇵🇦' },
  { name: 'Guatemala', flag: '🇬🇹' },
  { name: 'Honduras', flag: '🇭🇳' },
  { name: 'El Salvador', flag: '🇸🇻' },
  { name: 'Dominican Republic', flag: '🇩🇴' },
  { name: 'Puerto Rico', flag: '🇵🇷' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'Ethiopia', flag: '🇪🇹' },
  { name: 'Tanzania', flag: '🇹🇿' },
  { name: 'Rwanda', flag: '🇷🇼' },
  { name: 'Zambia', flag: '🇿🇲' },
  { name: 'Zimbabwe', flag: '🇿🇼' },
  { name: 'Cameroon', flag: '🇨🇲' },
  { name: 'Senegal', flag: '🇸🇳' },
  { name: 'Ivory Coast', flag: '🇨🇮' },
  { name: 'China', flag: '🇨🇳' },
  { name: 'Thailand', flag: '🇹🇭' },
  { name: 'Vietnam', flag: '🇻🇳' },
  { name: 'Myanmar', flag: '🇲🇲' },
  { name: 'Cambodia', flag: '🇰🇭' },
  { name: 'Laos', flag: '🇱🇦' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Sri Lanka', flag: '🇱🇰' },
  { name: 'Nepal', flag: '🇳🇵' },
  { name: 'Israel', flag: '🇮🇱' },
  { name: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Lebanon', flag: '🇱🇧' },
  { name: 'Jordan', flag: '🇯🇴' },
];

const getRecommendedPaths = (role, goals) => {
  const allPaths = [
    {
      id: 1,
      title: 'Leadership Fundamentals',
      description: 'Master the basics of Christian leadership with biblical foundations',
      lessons: 12,
      duration: '4 weeks',
      difficulty: 'Beginner',
      matches: ['Lead with Confidence', 'Develop Your People'],
      roles: ['senior-pastor', 'youth-minister', 'worship-leader', 'admin-team', 'volunteer-leader', 'tech-team']
    },
    {
      id: 2,
      title: 'Conflict Resolution Mastery',
      description: 'Advanced techniques for resolving conflicts with grace and wisdom',
      lessons: 8,
      duration: '3 weeks',
      difficulty: 'Intermediate',
      matches: ['Resolve Conflicts Fast', 'Speak with Clarity'],
      roles: ['senior-pastor', 'youth-minister', 'admin-team', 'volunteer-leader']
    },
    {
      id: 3,
      title: 'Building Strong Communities',
      description: 'Create lasting connections and foster unity in your ministry',
      lessons: 10,
      duration: '3 weeks',
      difficulty: 'Beginner',
      matches: ['Create Team Unity', 'Develop Your People'],
      roles: ['senior-pastor', 'youth-minister', 'worship-leader', 'volunteer-leader']
    },
    {
      id: 4,
      title: 'Communication Excellence',
      description: 'Develop powerful communication skills for ministry impact',
      lessons: 6,
      duration: '2 weeks',
      difficulty: 'Beginner',
      matches: ['Speak with Clarity', 'Lead with Confidence'],
      roles: ['senior-pastor', 'worship-leader', 'admin-team', 'volunteer-leader']
    },
    {
      id: 5,
      title: 'Youth Ministry Leadership',
      description: 'Specialized training for effective youth ministry leadership',
      lessons: 15,
      duration: '5 weeks',
      difficulty: 'Intermediate',
      matches: ['Create Team Unity', 'Develop Your People'],
      roles: ['youth-minister', 'volunteer-leader']
    },
    {
      id: 6,
      title: 'Worship Leadership Excellence',
      description: 'Lead worship teams with confidence and spiritual depth',
      lessons: 12,
      duration: '4 weeks',
      difficulty: 'Intermediate',
      matches: ['Lead with Confidence', 'Create Team Unity'],
      roles: ['worship-leader', 'tech-team']
    }
  ];

  return allPaths
    .filter(path => path.roles.includes(role))
    .map(path => ({
      ...path,
      relevanceScore: path.matches.filter(match => goals.includes(match)).length
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 4);
};

const timeCommitments = [
  { id: 1, time: '5 mins', minutes: 5, dailyGoal: 50, icon: Clock, description: 'Quick daily practice' },
  { id: 2, time: '15 mins', minutes: 15, dailyGoal: 150, icon: Clock, description: 'Steady progress' },
  { id: 3, time: '30+ mins', minutes: 30, dailyGoal: 300, icon: Clock, description: 'Deep learning' }
];

export function Onboarding({ onComplete, onNavigateToLogin }) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [dailyTimeCommitment, setDailyTimeCommitment] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [churchName, setChurchName] = useState('');
  const [churchSize, setChurchSize] = useState('');
  const [website, setWebsite] = useState('');
  const [selectedPath, setSelectedPath] = useState(null);

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '', percentage: 0 };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    // Count how many checks pass
    Object.values(checks).forEach(check => {
      if (check) score++;
    });

    // Determine strength level
    if (score <= 1) {
      return { score, label: 'Weak', color: '#E66E5A', percentage: 20, checks };
    } else if (score === 2) {
      return { score, label: 'Fair', color: '#F59E0B', percentage: 40, checks };
    } else if (score === 3) {
      return { score, label: 'Good', color: '#9BB88F', percentage: 60, checks };
    } else if (score === 4) {
      return { score, label: 'Strong', color: '#7A9B70', percentage: 80, checks };
    } else {
      return { score, label: 'Very Strong', color: '#3A4A46', percentage: 100, checks };
    }
  }, [password]);
  
  // Country dropdown states
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef(null);
  
  // Filter countries based on search
  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGoalToggle = (goal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handlePathSelect = (pathId) => {
    setSelectedPath(pathId);
  };

  const handleComplete = () => {
    const timeData = timeCommitments.find(t => t.id === dailyTimeCommitment);
    
    onComplete({
      name: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      username,
      email,
      password,
      role: selectedRole,
      goals: selectedGoals,
      dailyTimeCommitment: timeData?.minutes || 15,
      dailyPointsGoal: timeData?.dailyGoal || 150,
      country,
      churchName,
      churchSize,
      website,
      selectedPath
    });
  };

  const handleSkipChurchInfo = () => {
    setStep(6); // Skip to recommendations
  };

  const recommendedPaths = getRecommendedPaths(selectedRole, selectedGoals);

  return (
    <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-3xl flex items-center justify-center mb-3 border-2 border-[#3A4A46] shadow-[0_4px_0_0_rgba(58,74,70,0.15)]">
            <Church className="w-8 h-8 text-[#3A4A46]" />
          </div>
          <CardTitle className="text-2xl text-[#3A4A46] mb-1">Welcome to ChurchAcademy!</CardTitle>
          <p className="text-[#6B7B77] font-medium text-sm">
            Your personalized leadership development journey starts here
          </p>
          
          {/* Step Progress Indicator */}
          <div className="flex justify-center mt-4 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i <= step ? 'w-8 bg-primary' : 'w-2 bg-secondary'
                } border-2 border-[#3A4A46]`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#3A4A46] mb-1">What's your primary role?</h3>
                <p className="text-[#6B7B77] text-sm">Choose the role that best describes your ministry</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-4 rounded-2xl text-left transition-all border-2 shadow-[0_3px_0_0_rgba(58,74,70,0.1)] active:shadow-none active:translate-y-[2px] ${
                        isSelected
                          ? 'border-[#3A4A46] bg-[#7A9B70]'
                          : 'border-[#3A4A46] bg-white hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.1)] ${
                          isSelected ? 'bg-white' : 'bg-secondary'
                        }`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-[#7A9B70]' : 'text-[#6B7B77]'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold mb-1 ${isSelected ? 'text-white' : 'text-[#3A4A46]'}`}>
                            {role.name}
                          </div>
                          <div className={`text-sm ${isSelected ? 'text-white/90' : 'text-[#6B7B77]'}`}>
                            {role.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Goal Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#3A4A46] mb-1">What are your goals?</h3>
                <p className="text-[#6B7B77] text-sm">Select at least 1 skill you'd like to develop</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {goals.map((goal) => {
                  const isSelected = selectedGoals.includes(goal);
                  
                  return (
                    <button
                      key={goal}
                      onClick={() => handleGoalToggle(goal)}
                      className={`p-4 rounded-2xl text-left transition-all border-2 shadow-[0_3px_0_0_rgba(58,74,70,0.1)] active:shadow-none active:translate-y-[2px] ${
                        isSelected
                          ? 'border-[#3A4A46] bg-[#7A9B70]'
                          : 'border-[#3A4A46] bg-white hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${isSelected ? 'text-white' : 'text-[#3A4A46]'}`}>
                          {goal}
                        </span>
                        {isSelected && (
                          <Badge className="bg-white border-white text-[#7A9B70]">✓ Selected</Badge>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <p className="text-center text-sm text-[#6B7B77]">
                {selectedGoals.length} skill{selectedGoals.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}

          {/* Step 3: Daily Time Commitment */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#3A4A46] mb-1">How much time can you give each day?</h3>
                <p className="text-[#6B7B77] text-sm">We'll set your daily points goal based on your commitment</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {timeCommitments.map((commitment) => {
                  const isSelected = dailyTimeCommitment === commitment.id;
                  const Icon = commitment.icon;
                  
                  return (
                    <button
                      key={commitment.id}
                      onClick={() => setDailyTimeCommitment(commitment.id)}
                      className={`p-4 rounded-2xl text-left transition-all border-2 shadow-[0_3px_0_0_rgba(58,74,70,0.1)] active:shadow-none active:translate-y-[2px] ${
                        isSelected
                          ? 'border-[#3A4A46] bg-[#7A9B70]'
                          : 'border-[#3A4A46] bg-white hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.1)] ${
                          isSelected ? 'bg-white' : 'bg-secondary'
                        }`}>
                          <Icon className={`w-6 h-6 ${isSelected ? 'text-[#7A9B70]' : 'text-[#6B7B77]'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-bold ${isSelected ? 'text-white' : 'text-[#3A4A46]'}`}>{commitment.time}</h3>
                            <div className="flex items-center gap-2">
                              <Award className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#F4A460]'}`} />
                              <span className={`font-bold ${isSelected ? 'text-white' : 'text-[#3A4A46]'}`}>{commitment.dailyGoal} pts/day</span>
                            </div>
                          </div>
                          <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-[#6B7B77]'}`}>{commitment.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Personal Info */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#3A4A46] mb-1">Tell us about yourself</h3>
                <p className="text-[#6B7B77] text-sm">We'll use this to personalize your experience</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#3A4A46]">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#3A4A46]">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[#3A4A46]">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a unique username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#3A4A46]">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@church.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#3A4A46]">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#6B7B77]">Password Strength:</span>
                      <span 
                        className="text-xs font-medium"
                        style={{ color: passwordStrength.color }}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-2 bg-[#F5F0E8] rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300 rounded-full"
                        style={{ 
                          width: `${passwordStrength.percentage}%`,
                          backgroundColor: passwordStrength.color
                        }}
                      />
                    </div>
                    
                    {/* Password Requirements */}
                    <div className="space-y-1 pt-2">
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.length ? 'text-[#7A9B70]' : 'text-[#D1D5D3]'}`} 
                        />
                        <span className={passwordStrength.checks?.length ? 'text-[#3A4A46]' : 'text-[#6B7B77]'}>
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.uppercase ? 'text-[#7A9B70]' : 'text-[#D1D5D3]'}`} 
                        />
                        <span className={passwordStrength.checks?.uppercase ? 'text-[#3A4A46]' : 'text-[#6B7B77]'}>
                          One uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.lowercase ? 'text-[#7A9B70]' : 'text-[#D1D5D3]'}`} 
                        />
                        <span className={passwordStrength.checks?.lowercase ? 'text-[#3A4A46]' : 'text-[#6B7B77]'}>
                          One lowercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.number ? 'text-[#7A9B70]' : 'text-[#D1D5D3]'}`} 
                        />
                        <span className={passwordStrength.checks?.number ? 'text-[#3A4A46]' : 'text-[#6B7B77]'}>
                          One number
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Check 
                          className={`w-3 h-3 ${passwordStrength.checks?.special ? 'text-[#7A9B70]' : 'text-[#D1D5D3]'}`} 
                        />
                        <span className={passwordStrength.checks?.special ? 'text-[#3A4A46]' : 'text-[#6B7B77]'}>
                          One special character
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Church Information */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#3A4A46] mb-1">Tell us about your church</h3>
                <p className="text-[#6B7B77] text-sm">This helps us personalize your experience (optional)</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2" ref={countryDropdownRef}>
                  <Label className="text-[#3A4A46]">Country</Label>
                  
                  {/* Searchable Country Input */}
                  <div className="relative">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3A4A46]/50" />
                      <Input
                        type="text"
                        placeholder="Search for your country..."
                        value={country ? `${countries.find(c => c.name === country)?.flag || ''} ${country}` : countrySearch}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Remove flag emoji if it exists
                          const searchValue = value.replace(/^[\u{1F1E6}-\u{1F1FF}]{2}\s*/u, '');
                          setCountrySearch(searchValue);
                          setCountry('');
                          setIsCountryDropdownOpen(true);
                        }}
                        onFocus={() => setIsCountryDropdownOpen(true)}
                        className="pl-10"
                      />
                    </div>
                    
                    {/* Dropdown List */}
                    {isCountryDropdownOpen && filteredCountries.length > 0 && (
                      <div className="absolute z-50 w-full mt-2 bg-white border-2 border-[#3A4A46] rounded-2xl shadow-[0_4px_0_0_rgba(58,74,70,0.2)] max-h-60 overflow-y-auto">
                        {filteredCountries.map((countryOption) => (
                          <button
                            key={countryOption.name}
                            type="button"
                            onClick={() => {
                              setCountry(countryOption.name);
                              setCountrySearch('');
                              setIsCountryDropdownOpen(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-[#FFF8F2] transition-colors flex items-center gap-3 first:rounded-t-2xl last:rounded-b-2xl"
                          >
                            <span className="text-2xl">{countryOption.flag}</span>
                            <span className="text-[#3A4A46]">{countryOption.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* No results message */}
                    {isCountryDropdownOpen && filteredCountries.length === 0 && countrySearch && (
                      <div className="absolute z-50 w-full mt-2 bg-white border-2 border-[#3A4A46] rounded-2xl shadow-[0_4px_0_0_rgba(58,74,70,0.2)] p-4 text-center text-[#3A4A46]/60">
                        No countries found
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="churchName" className="text-[#3A4A46]">Church Name</Label>
                  <Input
                    id="churchName"
                    type="text"
                    placeholder="Your Church Name"
                    value={churchName}
                    onChange={(e) => setChurchName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="churchSize" className="text-[#3A4A46]">Church Size</Label>
                  <select
                    id="churchSize"
                    value={churchSize}
                    onChange={(e) => setChurchSize(e.target.value)}
                    className="w-full h-11 px-4 rounded-2xl border-2 border-[#3A4A46] bg-white text-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.1)] focus:outline-none focus:ring-2 focus:ring-primary/30 font-medium"
                  >
                    <option value="">Select size</option>
                    <option value="1-50">1-50 members</option>
                    <option value="51-200">51-200 members</option>
                    <option value="201-500">201-500 members</option>
                    <option value="501-1000">501-1,000 members</option>
                    <option value="1001-2000">1,001-2,000 members</option>
                    <option value="2001+">2,001+ members</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-[#3A4A46]">Church Website (optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourchurch.org"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="text-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSkipChurchInfo}
                  className="text-[#6B7B77]"
                >
                  Skip this step
                </Button>
              </div>
            </div>
          )}

          {/* Step 6: Path Recommendations */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-[#3A4A46] mb-1">Your Recommended Path</h3>
                <p className="text-[#6B7B77] text-sm">
                  Based on your role and goals, we recommend starting with one of these paths
                </p>
              </div>
              
              <div className="space-y-3">
                {recommendedPaths.map((path) => {
                  const isSelected = selectedPath === path.id;
                  
                  return (
                    <button
                      key={path.id}
                      onClick={() => handlePathSelect(path.id)}
                      className={`w-full p-4 rounded-2xl text-left transition-all border-2 shadow-[0_3px_0_0_rgba(58,74,70,0.1)] active:shadow-none active:translate-y-[2px] ${
                        isSelected
                          ? 'border-[#3A4A46] bg-[#7A9B70]'
                          : 'border-[#3A4A46] bg-white hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className={`font-bold text-base mb-1 ${isSelected ? 'text-white' : 'text-[#3A4A46]'}`}>
                            {path.title}
                          </h4>
                          <p className={`text-xs mb-2 ${isSelected ? 'text-white/90' : 'text-[#6B7B77]'}`}>
                            {path.description}
                          </p>
                        </div>
                        {isSelected && (
                          <Badge className="ml-3 bg-white border-white text-[#7A9B70] flex-shrink-0">✓ Selected</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <div className={`flex items-center gap-1 text-xs ${isSelected ? 'text-white/90' : 'text-[#6B7B77]'}`}>
                          <BookOpen className="w-3 h-3" />
                          <span className="font-medium">{path.lessons} lessons</span>
                        </div>
                        <div className={`flex items-center gap-1 text-xs ${isSelected ? 'text-white/90' : 'text-[#6B7B77]'}`}>
                          <Users className="w-3 h-3" />
                          <span className="font-medium">{path.duration}</span>
                        </div>
                        <Badge variant="outline" className={`${isSelected ? 'border-white bg-white/20 text-white' : 'border-[#3A4A46] bg-white text-[#3A4A46]'}`}>
                          {path.difficulty}
                        </Badge>
                        {path.relevanceScore > 0 && (
                          <Badge className="bg-accent text-white border-white">
                            {path.relevanceScore} goal{path.relevanceScore > 1 ? 's' : ''} match
                          </Badge>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <p className="text-center text-sm text-[#6B7B77] bg-secondary rounded-2xl p-4 border-2 border-[#3A4A46]/20">
                💡 Choose the path that interests you most. You can explore other paths anytime from your dashboard!
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4 border-t-2 border-[#3A4A46]/10">
            {step === 1 ? (
              <Button
                variant="outline"
                onClick={onNavigateToLogin}
              >
                Sign In Instead
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            )}
            
            {step < 6 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedRole) ||
                  (step === 2 && selectedGoals.length < 1) ||
                  (step === 3 && !dailyTimeCommitment) ||
                  (step === 4 && (!firstName.trim() || !lastName.trim() || !username.trim() || !email.trim() || !email.includes('@')))
                }
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!selectedPath}
                className="bg-accent hover:bg-[#D45B47]"
              >
                Start Learning <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
