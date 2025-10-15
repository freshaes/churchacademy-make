import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy, 
  Medal, 
  Star, 
  Crown,
  TrendingUp,
  Calendar,
  Users,
  Award,
  Flame
} from 'lucide-react';

const leaderboardData = {
  weekly: [
    { rank: 1, name: 'Sarah Martinez', role: 'Pastor', xp: 2485, streak: 12, avatar: 'S', badge: 'crown' },
    { rank: 2, name: 'Michael Johnson', role: 'Youth Leader', xp: 2340, streak: 8, avatar: 'M', badge: 'gold' },
    { rank: 3, name: 'Emily Chen', role: 'Worship Leader', xp: 2180, streak: 15, avatar: 'E', badge: 'silver' },
    { rank: 4, name: 'David Wilson', role: 'Bible Teacher', xp: 1980, streak: 6, avatar: 'D', badge: 'bronze' },
    { rank: 5, name: 'You', role: 'Youth Leader', xp: 1240, streak: 7, avatar: 'Y', isCurrentUser: true },
    { rank: 6, name: 'Lisa Thompson', role: 'Pastor', xp: 1150, streak: 4, avatar: 'L' },
    { rank: 7, name: 'Robert Kim', role: 'Worship Leader', xp: 1089, streak: 9, avatar: 'R' },
    { rank: 8, name: 'Maria Garcia', role: 'Bible Teacher', xp: 987, streak: 3, avatar: 'M' }
  ],
  monthly: [
    { rank: 1, name: 'Sarah Martinez', role: 'Pastor', xp: 8945, streak: 12, avatar: 'S', badge: 'crown' },
    { rank: 2, name: 'Emily Chen', role: 'Worship Leader', xp: 8120, streak: 15, avatar: 'E', badge: 'gold' },
    { rank: 3, name: 'Michael Johnson', role: 'Youth Leader', xp: 7890, streak: 8, avatar: 'M', badge: 'silver' },
    { rank: 4, name: 'You', role: 'Youth Leader', xp: 6240, streak: 7, avatar: 'Y', isCurrentUser: true, badge: 'bronze' },
    { rank: 5, name: 'David Wilson', role: 'Bible Teacher', xp: 5980, streak: 6, avatar: 'D' }
  ],
  allTime: [
    { rank: 1, name: 'Sarah Martinez', role: 'Pastor', xp: 24580, streak: 12, avatar: 'S', badge: 'crown' },
    { rank: 2, name: 'Emily Chen', role: 'Worship Leader', xp: 22340, streak: 15, avatar: 'E', badge: 'gold' },
    { rank: 3, name: 'Michael Johnson', role: 'Youth Leader', xp: 19870, streak: 8, avatar: 'M', badge: 'silver' },
    { rank: 4, name: 'David Wilson', role: 'Bible Teacher', xp: 18990, streak: 6, avatar: 'D', badge: 'bronze' },
    { rank: 12, name: 'You', role: 'Youth Leader', xp: 8240, streak: 7, avatar: 'Y', isCurrentUser: true }
  ]
};

const achievements = [
  { name: 'Learning Streak Master', description: '30-day learning streak', icon: '🔥', rarity: 'legendary' },
  { name: 'Perfect Score Champion', description: '10 perfect scores in a row', icon: '⭐', rarity: 'epic' },
  { name: 'Team Builder', description: 'Completed team leadership course', icon: '👥', rarity: 'rare' },
  { name: 'Conflict Resolver', description: 'Mastered conflict resolution', icon: '🤝', rarity: 'rare' }
];

export function Leaderboard({ userData }) {
  const [activeTab, setActiveTab] = useState('weekly');

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'crown': return <Crown className="w-4 h-4 text-[#F4A460]" />;
      case 'gold': return <Medal className="w-4 h-4 text-[#F4A460]" />;
      case 'silver': return <Medal className="w-4 h-4 text-[#C9B8A8]" />;
      case 'bronze': return <Medal className="w-4 h-4 text-[#E66E5A]" />;
      default: return null;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-[#3A4A46] bg-[#FDD6A1]';
      case 2: return 'text-[#3A4A46] bg-[#E6DFD8]';
      case 3: return 'text-[#3A4A46] bg-[#E66E5A]/30';
      default: return 'text-[#3A4A46] bg-secondary';
    }
  };

  const getRankBorder = (rank) => {
    switch (rank) {
      case 1: return 'border-[#F4A460]';
      case 2: return 'border-[#C9B8A8]';
      case 3: return 'border-[#E66E5A]';
      default: return 'border-[#3A4A46]';
    }
  };

  return (
    <div className="lg:ml-80 p-6 bg-[#FFF8F2] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl mb-2 text-[#3A4A46]">Leaderboard</h1>
            <p className="text-[#6B7B77]">
              See how you rank among fellow church leaders
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FDD6A1] rounded-2xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-[#3A4A46]" />
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="text-lg px-3 py-1 font-bold">
                #{leaderboardData.weekly.find(u => u.isCurrentUser)?.rank || 'N/A'}
              </Badge>
              <p className="text-xs text-[#6B7B77] mt-1">Your Rank</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#7A9B70]/20 rounded-2xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#3A4A46]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#3A4A46]">{userData.xp}</p>
                  <p className="text-sm text-[#6B7B77]">Total XP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#7A9B70]/20 rounded-2xl flex items-center justify-center">
                  <Flame className="w-6 h-6 text-[#3A4A46]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#3A4A46]">{userData.streak}</p>
                  <p className="text-sm text-[#6B7B77]">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#7A9B70]/20 rounded-2xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#3A4A46]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#3A4A46]">3</p>
                  <p className="text-sm text-[#6B7B77]">Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3A4A46]">
                  <Trophy className="w-5 h-5" />
                  <span>Rankings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="weekly" className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Week</span>
                    </TabsTrigger>
                    <TabsTrigger value="monthly">Month</TabsTrigger>
                    <TabsTrigger value="allTime">All Time</TabsTrigger>
                  </TabsList>

                  {Object.entries(leaderboardData).map(([period, data]) => (
                    <TabsContent key={period} value={period} className="space-y-3 mt-6">
                      {data.map((user) => (
                        <div
                          key={user.rank}
                          className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                            user.isCurrentUser 
                              ? 'bg-[#7A9B70]/20' 
                              : 'bg-white hover:bg-secondary'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${getRankColor(user.rank)}`}>
                            {user.rank <= 3 ? getBadgeIcon(user.badge) : user.rank}
                          </div>

                          <Avatar className="w-12 h-12">
                            <AvatarFallback className={user.isCurrentUser ? 'bg-[#7A9B70] text-white' : 'bg-secondary text-[#3A4A46]'}>
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-[#3A4A46]">{user.name}</p>
                              {user.isCurrentUser && (
                                <Badge variant="secondary" className="text-xs">You</Badge>
                              )}
                            </div>
                            <p className="text-sm text-[#6B7B77] capitalize font-medium">
                              {user.role.replace('_', ' ')}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-[#3A4A46]">{user.xp.toLocaleString()}</p>
                            <p className="text-xs text-[#6B7B77]">XP</p>
                          </div>

                          <div className="text-center px-3 py-1.5 bg-accent/20 rounded-xl">
                            <p className="text-sm font-bold text-[#3A4A46]">{user.streak}</p>
                            <p className="text-xs text-[#6B7B77]">streak</p>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3A4A46]">
                  <Medal className="w-5 h-5" />
                  <span>Top Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-2xl bg-white hover:bg-secondary transition-colors">
                    <div className="text-2xl w-10 h-10 flex items-center justify-center bg-secondary rounded-xl">
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <p className="font-bold text-sm text-[#3A4A46]">{achievement.name}</p>
                        <Badge 
                          variant="outline" 
                          className="text-xs border-[#7A9B70] bg-[#7A9B70]/20 text-[#3A4A46]"
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-xs text-[#6B7B77]">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#3A4A46]">
                  <Users className="w-5 h-5" />
                  <span>Community</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 bg-secondary rounded-2xl">
                  <p className="text-3xl font-bold text-[#3A4A46]">2,847</p>
                  <p className="text-sm text-[#6B7B77] mt-1">Active Learners</p>
                </div>
                <Button className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Find Study Partners
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
