import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ChevronRight, Church, Users, Heart, BookOpen, Briefcase, UserCircle, Monitor, Music } from 'lucide-react';

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

export function Onboarding({ onComplete, onNavigateToLogin }) {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [churchName, setChurchName] = useState('');
  const [churchSize, setChurchSize] = useState('');
  const [website, setWebsite] = useState('');
  const [selectedPaths, setSelectedPaths] = useState([]);

  const handleGoalToggle = (goal) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handlePathToggle = (pathId) => {
    setSelectedPaths(prev => 
      prev.includes(pathId) 
        ? prev.filter(id => id !== pathId)
        : [...prev, pathId]
    );
  };

  const handleComplete = () => {
    onComplete({
      name: `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      email,
      role: selectedRole,
      goals: selectedGoals,
      country,
      churchName,
      churchSize,
      website,
      selectedPaths
    });
  };

  const handleSkipChurchInfo = () => {
    setStep(5); // Skip to recommendations
  };

  const recommendedPaths = getRecommendedPaths(selectedRole, selectedGoals);

  return (
    <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-6 border-2 border-[#3A4A46] shadow-[0_4px_0_0_rgba(58,74,70,0.15)]">
            <Church className="w-10 h-10 text-[#3A4A46]" />
          </div>
          <CardTitle className="text-3xl text-[#3A4A46] mb-2">Welcome to ChurchAcademy!</CardTitle>
          <p className="text-[#6B7B77] font-medium">
            Your personalized leadership development journey starts here
          </p>
          
          {/* Step Progress Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i <= step ? 'w-8 bg-primary' : 'w-2 bg-secondary'
                } border-2 border-[#3A4A46]`}
              />
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#3A4A46] mb-2">What's your primary role?</h3>
                <p className="text-[#6B7B77]">Choose the role that best describes your ministry</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-5 rounded-2xl text-left transition-all border-2 shadow-[0_3px_0_0_rgba(58,74,70,0.1)] active:shadow-none active:translate-y-[2px] ${
                        isSelected
                          ? 'border-[#3A4A46] bg-[#7A9B70]'
                          : 'border-[#3A4A46] bg-white hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.1)] ${
                          isSelected ? 'bg-white' : 'bg-secondary'
                        }`}>
                          <Icon className={`w-7 h-7 ${isSelected ? 'text-[#7A9B70]' : 'text-[#6B7B77]'}`} />
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
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#3A4A46] mb-2">What are your goals?</h3>
                <p className="text-[#6B7B77]">Select 2-4 skills you'd like to develop</p>
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
                {selectedGoals.length} of 2-4 goals selected
              </p>
            </div>
          )}

          {/* Step 3: Personal Info */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#3A4A46] mb-2">Tell us about yourself</h3>
                <p className="text-[#6B7B77]">We'll use this to personalize your experience</p>
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
                <Label htmlFor="email" className="text-[#3A4A46]">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@church.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 4: Church Information */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#3A4A46] mb-2">Tell us about your church</h3>
                <p className="text-[#6B7B77]">This helps us personalize your experience (optional)</p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-[#3A4A46]">Country</Label>
                  <Input
                    id="country"
                    type="text"
                    placeholder="United States"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
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

          {/* Step 5: Path Recommendations */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#3A4A46] mb-2">Your Personalized Paths</h3>
                <p className="text-[#6B7B77]">
                  Based on your role and goals, we've curated these learning paths
                </p>
              </div>
              
              <div className="space-y-4">
                {recommendedPaths.map((path) => {
                  const isSelected = selectedPaths.includes(path.id);
                  
                  return (
                    <button
                      key={path.id}
                      onClick={() => handlePathToggle(path.id)}
                      className={`w-full p-6 rounded-2xl text-left transition-all border-2 shadow-[0_3px_0_0_rgba(58,74,70,0.1)] active:shadow-none active:translate-y-[2px] ${
                        isSelected
                          ? 'border-[#3A4A46] bg-[#7A9B70]'
                          : 'border-[#3A4A46] bg-white hover:bg-secondary'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className={`font-bold text-lg mb-2 ${isSelected ? 'text-white' : 'text-[#3A4A46]'}`}>
                            {path.title}
                          </h4>
                          <p className={`text-sm mb-3 ${isSelected ? 'text-white/90' : 'text-[#6B7B77]'}`}>
                            {path.description}
                          </p>
                        </div>
                        {isSelected && (
                          <Badge className="ml-3 bg-white border-white text-[#7A9B70] flex-shrink-0">✓ Selected</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3">
                        <div className={`flex items-center gap-1.5 text-sm ${isSelected ? 'text-white/90' : 'text-[#6B7B77]'}`}>
                          <BookOpen className="w-4 h-4" />
                          <span className="font-medium">{path.lessons} lessons</span>
                        </div>
                        <div className={`flex items-center gap-1.5 text-sm ${isSelected ? 'text-white/90' : 'text-[#6B7B77]'}`}>
                          <Users className="w-4 h-4" />
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
                💡 Select 1-3 paths to start with. You can always add more later!
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t-2 border-[#3A4A46]/10">
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
            
            {step < 5 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedRole) ||
                  (step === 2 && selectedGoals.length < 2) ||
                  (step === 3 && (!firstName.trim() || !lastName.trim() || !email.trim() || !email.includes('@')))
                }
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={selectedPaths.length === 0}
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
