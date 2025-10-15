import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Star, 
  Award, 
  BookOpen, 
  Target,
  Calendar,
  Edit3,
  Trophy,
  Flame,
  TrendingUp,
  Church,
  Globe,
  Users as UsersIcon,
  Camera
} from 'lucide-react';

export function Profile({ userProfile, userData, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userProfile.name,
    email: userProfile.email || '',
    role: userProfile.role,
    goals: userProfile.goals,
    country: userProfile.country || '',
    churchName: userProfile.churchName || '',
    churchSize: userProfile.churchSize || '',
    website: userProfile.website || ''
  });

  const totalLessonsInCourse = 50;
  const progressPercentage = (userData.lessonsCompleted / totalLessonsInCourse) * 100;

  const stats = [
    {
      label: 'Total XP',
      value: userData.xp.toLocaleString(),
      icon: Star,
      color: 'text-[#3A4A46] bg-[#7A9B70]/20'
    },
    {
      label: 'Current Streak',
      value: `${userData.streak} days`,
      icon: Flame,
      color: 'text-[#3A4A46] bg-[#7A9B70]/20'
    },
    {
      label: 'Lessons Completed',
      value: userData.lessonsCompleted,
      icon: BookOpen,
      color: 'text-[#3A4A46] bg-[#7A9B70]/20'
    },
    {
      label: 'Achievements',
      value: userData.achievements.length,
      icon: Trophy,
      color: 'text-[#3A4A46] bg-[#7A9B70]/20'
    }
  ];

  const recentActivity = [
    { date: '2025-01-20', activity: 'Completed "Conflict Resolution Basics"', xp: 120 },
    { date: '2025-01-19', activity: 'Earned "Team Builder" achievement', xp: 50 },
    { date: '2025-01-18', activity: 'Completed "Leadership Scenarios"', xp: 100 },
    { date: '2025-01-17', activity: 'Started new learning path', xp: 0 },
    { date: '2025-01-16', activity: 'Completed "Communication Skills"', xp: 90 }
  ];

  const handleSaveProfile = () => {
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedProfile = { ...userProfile, profilePicture: imageUrl };
      onUpdateProfile(updatedProfile);
    }
  };

  return (
    <div className="lg:ml-80 p-6 bg-[#FFF8F2] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative group">
                <Avatar className="w-20 h-20 border-2 border-[#3A4A46]">
                  {userProfile.profilePicture ? (
                    <img src={userProfile.profilePicture} alt={userProfile.name} className="w-full h-full object-cover" />
                  ) : (
                    <AvatarFallback className="bg-primary text-white text-2xl">
                      {userProfile.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <label 
                  htmlFor="profile-pic-upload" 
                  className="absolute inset-0 flex items-center justify-center bg-[#3A4A46]/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="w-6 h-6 text-white" />
                </label>
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="font-bold"
                      placeholder="Full Name"
                    />
                    <select
                      value={editForm.role}
                      onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                      className="w-full h-11 px-4 rounded-2xl border-2 border-[#3A4A46] bg-white text-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.1)] focus:outline-none focus:ring-2 focus:ring-primary/30 font-medium"
                    >
                      <option value="senior-pastor">Senior Pastor</option>
                      <option value="youth-minister">Youth Minister</option>
                      <option value="worship-leader">Worship Leader</option>
                      <option value="admin-team">Admin Team</option>
                      <option value="volunteer-leader">Volunteer Leader</option>
                      <option value="tech-team">Tech Team</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <h1 className="text-2xl font-bold text-[#3A4A46]">{userProfile.name}</h1>
                    <p className="text-[#6B7B77] capitalize font-medium">
                      {userProfile.role.replace('-', ' ')}
                    </p>
                    {userProfile.churchName && (
                      <p className="text-[#6B7B77] text-sm mt-1 flex items-center gap-1.5">
                        <Church className="w-3.5 h-3.5" />
                        {userProfile.churchName}
                      </p>
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-3 mt-3 flex-wrap">
                  <Badge variant="secondary" className="flex items-center gap-1.5">
                    <Star className="w-3 h-3" />
                    <span>Level {userData.level}</span>
                  </Badge>
                  <Badge variant="outline">
                    {userData.xp} XP
                  </Badge>
                  {userProfile.country && (
                    <Badge variant="outline" className="flex items-center gap-1.5">
                      <Globe className="w-3 h-3" />
                      {userProfile.country}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile}>Save</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form - Church Information */}
        {isEditing && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#3A4A46]">
                <Church className="w-5 h-5" />
                <span>Church Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#3A4A46]">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    placeholder="your.email@church.org"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-[#3A4A46]">Country</Label>
                  <Input
                    id="country"
                    type="text"
                    value={editForm.country}
                    onChange={(e) => setEditForm({...editForm, country: e.target.value})}
                    placeholder="United States"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="churchName" className="text-[#3A4A46]">Church Name</Label>
                  <Input
                    id="churchName"
                    type="text"
                    value={editForm.churchName}
                    onChange={(e) => setEditForm({...editForm, churchName: e.target.value})}
                    placeholder="Your Church Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="churchSize" className="text-[#3A4A46]">Church Size</Label>
                  <select
                    id="churchSize"
                    value={editForm.churchSize}
                    onChange={(e) => setEditForm({...editForm, churchSize: e.target.value})}
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website" className="text-[#3A4A46]">Church Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={editForm.website}
                  onChange={(e) => setEditForm({...editForm, website: e.target.value})}
                  placeholder="https://yourchurch.org"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl border-2 border-[#3A4A46] flex items-center justify-center shadow-[0_2px_0_0_rgba(58,74,70,0.1)] ${stat.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#3A4A46]">{stat.value}</p>
                      <p className="text-xs text-[#6B7B77]">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Progress and Goals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#3A4A46]">
                <TrendingUp className="w-5 h-5" />
                <span>Learning Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-[#3A4A46]">Course Completion</span>
                  <span className="text-sm text-[#6B7B77]">
                    {userData.lessonsCompleted}/{totalLessonsInCourse}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-[#3A4A46]">Next Level</span>
                  <span className="text-sm text-[#6B7B77]">
                    {userData.xp}/2000 XP
                  </span>
                </div>
                <Progress value={(userData.xp % 2000) / 2000 * 100} className="h-2" />
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-[#6B7B77]">
                  {2000 - (userData.xp % 2000)} XP until Level {userData.level + 1}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#3A4A46]">
                <Target className="w-5 h-5" />
                <span>Learning Goals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userProfile.goals.map((goal, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm font-medium text-[#3A4A46]">{goal}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements and Activity */}
        <Tabs defaultValue="achievements" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3A4A46]">
                  <Award className="w-5 h-5" />
                  <span>Your Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userData.achievements.map((achievement) => (
                    <div key={achievement.id} className="border-2 border-[#3A4A46] rounded-2xl p-4 text-center bg-white shadow-[0_2px_0_0_rgba(58,74,70,0.1)]">
                      <div className="w-12 h-12 bg-[#7A9B70]/20 border-2 border-[#3A4A46] rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <Award className="w-6 h-6 text-[#3A4A46]" />
                      </div>
                      <h4 className="font-bold text-sm mb-1 text-[#3A4A46]">{achievement.name}</h4>
                      <p className="text-xs text-[#6B7B77]">{achievement.description}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">Earned</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3A4A46]">
                  <Calendar className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b-2 border-[#3A4A46]/10 pb-3 last:border-b-0">
                      <div>
                        <p className="text-sm font-bold text-[#3A4A46]">{item.activity}</p>
                        <p className="text-xs text-[#6B7B77]">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      {item.xp > 0 && (
                        <Badge variant="secondary" className="flex items-center gap-1.5">
                          <Star className="w-3 h-3" />
                          <span>+{item.xp} XP</span>
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
