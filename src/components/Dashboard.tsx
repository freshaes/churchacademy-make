import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Target, 
  BookOpen, 
  Star, 
  Flame, 
  Users, 
  Award,
  ChevronRight,
  Trophy,
  TrendingUp,
  CheckCircle2,
  PlayCircle,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

// Map role IDs to display names
const roleDisplayNames = {
  'senior-pastor': 'Senior Pastor',
  'youth-minister': 'Youth Minister',
  'worship-leader': 'Worship Leader',
  'admin-team': 'Admin Team',
  'volunteer-leader': 'Volunteer Leader',
  'tech-team': 'Tech Team'
};

const recommendedCourses = [
  {
    id: 4,
    title: 'Communication Excellence',
    description: 'Develop clear, compassionate communication skills for ministry leadership.',
    difficulty: 'Intermediate',
    estimatedTime: '6 hours',
    xpReward: 300,
    roles: ['senior-pastor', 'youth-minister', 'admin-team'],
    icon: BookOpen,
    color: 'bg-[#E66E5A]'
  },
  {
    id: 5,
    title: 'Youth Ministry Leadership',
    description: 'Engage and disciple the next generation with effective youth ministry strategies.',
    difficulty: 'Intermediate',
    estimatedTime: '8 hours',
    xpReward: 400,
    roles: ['youth-minister', 'volunteer-leader'],
    icon: Users,
    color: 'bg-[#7A9B70]'
  },
  {
    id: 6,
    title: 'Volunteer Management',
    description: 'Recruit, train, and retain dedicated volunteers for your ministry.',
    difficulty: 'Intermediate',
    estimatedTime: '6 hours',
    xpReward: 300,
    roles: ['volunteer-leader', 'senior-pastor', 'youth-minister'],
    icon: Users,
    color: 'bg-[#E66E5A]'
  },
  {
    id: 7,
    title: 'Spiritual Formation',
    description: 'Deepen your spiritual life and guide others in their faith journey.',
    difficulty: 'Intermediate',
    estimatedTime: '8 hours',
    xpReward: 400,
    roles: ['senior-pastor', 'youth-minister', 'volunteer-leader'],
    icon: BookOpen,
    color: 'bg-[#7A9B70]'
  }
];

const mockLearningPaths = [
  {
    id: 1,
    title: 'Leadership Fundamentals',
    description: 'Master the essential principles of servant leadership in a church context.',
    difficulty: 'Intermediate',
    totalChapters: 3,
    completedChapters: 1,
    chapters: [
      {
        id: 1,
        title: 'Introduction to Leadership',
        description: 'Understanding the basics of Christian leadership and team dynamics.',
        totalQuestions: 7,
        completedQuestions: 7,
        status: 'completed',
        xpReward: 100,
        score: 92,
        stars: 3
      },
      {
        id: 2,
        title: 'Team Building',
        description: 'Learn to build and develop high-performing ministry teams.',
        totalQuestions: 7,
        completedQuestions: 3,
        status: 'in-progress',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Decision Making',
        description: 'Make wise decisions through prayer, counsel, and discernment.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      }
    ]
  },
  {
    id: 2,
    title: 'Conflict Resolution Mastery',
    description: 'Learn advanced techniques for resolving conflicts with grace and wisdom.',
    difficulty: 'Intermediate',
    totalChapters: 3,
    completedChapters: 0,
    chapters: [
      {
        id: 1,
        title: 'Understanding Conflict',
        description: 'Identify the root causes and types of conflicts in ministry.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'not-started',
        xpReward: 100
      },
      {
        id: 2,
        title: 'Resolution Strategies',
        description: 'Learn practical tools for mediating and resolving disputes.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Restoration & Healing',
        description: 'Guide relationships toward reconciliation and restoration.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      }
    ]
  },
  {
    id: 3,
    title: 'Building Strong Communities',
    description: 'Create lasting connections and foster unity in your ministry.',
    difficulty: 'Beginner',
    totalChapters: 3,
    completedChapters: 0,
    chapters: [
      {
        id: 1,
        title: 'Welcoming Newcomers',
        description: 'Make first-time visitors feel welcomed and valued.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'not-started',
        xpReward: 100
      },
      {
        id: 2,
        title: 'Building Relationships',
        description: 'Foster deep, meaningful connections within your community.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Creating Culture',
        description: 'Develop a healthy, vibrant community culture.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      }
    ]
  }
];

const friends = [
  { name: 'Sarah M.', xp: 2485, avatar: 'S' },
  { name: 'Mike D.', xp: 980, avatar: 'M' },
  { name: 'You', xp: 1240, avatar: 'Y', isCurrentUser: true }
];

export function Dashboard({ userProfile, userData, onStartScenario, onViewCourse }) {
  const [expandedPaths, setExpandedPaths] = useState([1]); // Start with first path expanded
  const todaysGoal = 200;
  const progressToday = (userData.xp % todaysGoal) / todaysGoal * 100;

  const togglePath = (pathId) => {
    setExpandedPaths(prev => 
      prev.includes(pathId) 
        ? prev.filter(id => id !== pathId)
        : [...prev, pathId]
    );
  };

  // PROTOTYPE: Hardcoded recommendations (in production, this would be personalized by role)
  const personalizedRecommendations = [
    recommendedCourses[0], // Communication Excellence
    recommendedCourses[1], // Youth Ministry Leadership
    recommendedCourses[2]  // Volunteer Management
  ];

  return (
    <div className="lg:ml-80 p-6 space-y-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl mb-2">Welcome back, {userProfile.name}!</h1>
        <p className="text-muted-foreground">
          Continue your leadership development journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Progress */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target className="w-5 h-5 text-[#3A4A46]" />
                  <CardTitle className="text-lg">Daily Goal</CardTitle>
                </div>
                <Badge variant="secondary">{userData.xp % todaysGoal}/{todaysGoal} XP</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={progressToday} className="mb-3" />
              <p className="text-sm text-muted-foreground">
                {todaysGoal - (userData.xp % todaysGoal)} XP to reach today's goal
              </p>
            </CardContent>
          </Card>

          {/* Learning Paths with Chapters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Continue Learning</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockLearningPaths.map((path) => {
                const isExpanded = expandedPaths.includes(path.id);
                const pathProgress = (path.completedChapters / path.totalChapters) * 100;
                
                // Find the next chapter to continue (first non-completed chapter)
                const nextChapter = path.chapters.find(ch => ch.status !== 'completed') || path.chapters[0];
                
                return (
                  <Collapsible
                    key={path.id}
                    open={isExpanded}
                    onOpenChange={() => togglePath(path.id)}
                  >
                    <div className="border-2 border-[#3A4A46] rounded-2xl shadow-[0_3px_0_0_rgba(58,74,70,0.1)] overflow-hidden">
                      {/* Path Header - Quick Summary */}
                      <div className="bg-gradient-to-r from-[#E8F1E5] to-[#FFF8F2] p-4">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[#3A4A46] mb-1">{path.title}</h3>
                            <p className="text-sm text-[#6B7B77] line-clamp-1">{path.description}</p>
                          </div>
                          
                          {/* Details Toggle Button */}
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex-shrink-0 h-8 px-2 hover:bg-white/50"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="text-xs text-[#6B7B77] mr-1">Details</span>
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-[#3A4A46]" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-[#3A4A46]" />
                              )}
                            </Button>
                          </CollapsibleTrigger>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-[#3A4A46]/70">
                              {path.completedChapters} of {path.totalChapters} chapters
                            </span>
                            <span className="text-xs font-bold text-[#3A4A46]">
                              {Math.round(pathProgress)}%
                            </span>
                          </div>
                          <Progress value={pathProgress} className="h-2" />
                        </div>
                        
                        {/* Continue Button */}
                        <Button
                          onClick={() => onStartScenario({
                            id: path.id,
                            pathId: path.id,
                            chapterId: nextChapter.id,
                            title: nextChapter.title,
                            pathTitle: path.title,
                            description: nextChapter.description,
                            xpReward: nextChapter.xpReward
                          })}
                          className="w-full bg-[#7A9B70] hover:bg-[#6B8A61] text-white border-2 border-[#3A4A46] rounded-xl shadow-[0_3px_0_0_rgba(58,74,70,0.3)] active:shadow-none active:translate-y-[3px] transition-all"
                        >
                          {path.completedChapters === path.totalChapters ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Review Path
                            </>
                          ) : path.completedChapters > 0 ? (
                            <>
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Continue: {nextChapter.title}
                            </>
                          ) : (
                            <>
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Start Learning
                            </>
                          )}
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        </Button>
                      </div>

                      {/* Detailed Chapters List */}
                      <CollapsibleContent>
                        <div className="bg-white border-t-2 border-[#3A4A46]/10">
                          {/* Path Metadata (shown when expanded) */}
                          <div className="p-4 border-b-2 border-[#3A4A46]/10 bg-[#FFF8F2]/50">
                            <div className="flex items-center gap-4 text-sm">
                              <Badge variant="secondary" className="text-xs">
                                {path.difficulty}
                              </Badge>
                              <span className="text-[#6B7B77]">
                                {path.totalChapters} chapters
                              </span>
                            </div>
                          </div>
                          
                          {/* Chapter List */}
                          <div className="divide-y-2 divide-[#3A4A46]/10">
                            {path.chapters.map((chapter, index) => (
                              <div
                                key={chapter.id}
                                className={`p-4 transition-colors ${
                                  chapter.status === 'locked' 
                                    ? 'opacity-60 bg-gray-50' 
                                    : 'hover:bg-[#FFF8F2]'
                                }`}
                              >
                                <div className="flex items-start gap-4">
                                  {/* Chapter Number */}
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border-2 flex-shrink-0 ${
                                    chapter.status === 'completed'
                                      ? 'bg-[#7A9B70] border-[#3A4A46] text-white'
                                      : chapter.status === 'in-progress'
                                      ? 'bg-[#E66E5A] border-[#3A4A46] text-white'
                                      : chapter.status === 'locked'
                                      ? 'bg-white border-[#3A4A46]/30 text-[#3A4A46]/30'
                                      : 'bg-white border-[#3A4A46] text-[#3A4A46]'
                                  }`}>
                                    {chapter.status === 'completed' ? (
                                      <CheckCircle2 className="w-5 h-5" />
                                    ) : chapter.status === 'locked' ? (
                                      <Lock className="w-5 h-5" />
                                    ) : (
                                      index + 1
                                    )}
                                  </div>

                                  {/* Chapter Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                      <div>
                                        <h4 className="font-bold text-[#3A4A46] mb-1">
                                          {chapter.title}
                                        </h4>
                                        <p className="text-sm text-[#6B7B77]">
                                          {chapter.description}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Chapter Progress */}
                                    {(chapter.status === 'in-progress' || chapter.status === 'completed') && (
                                      <div className="mb-3">
                                        <div className="flex items-center justify-between mb-1">
                                          <span className="text-xs text-[#6B7B77]">
                                            {chapter.completedQuestions} of {chapter.totalQuestions} questions
                                          </span>
                                          {chapter.status === 'completed' && (
                                            <div className="flex items-center gap-2">
                                              <span className="text-xs text-[#7A9B70] font-medium">
                                                Score: {chapter.score}%
                                              </span>
                                              <div className="flex items-center">
                                                {[1, 2, 3].map((star) => (
                                                  <Star
                                                    key={star}
                                                    className={`w-3 h-3 ${
                                                      star <= chapter.stars
                                                        ? 'fill-[#F4A460] text-[#F4A460]'
                                                        : 'text-gray-300'
                                                    }`}
                                                  />
                                                ))}
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                        <Progress 
                                          value={(chapter.completedQuestions / chapter.totalQuestions) * 100} 
                                          className="h-2"
                                        />
                                      </div>
                                    )}

                                    {/* Chapter Actions */}
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-1 text-sm text-[#6B7B77]">
                                        <Star className="w-4 h-4 text-[#3A4A46]" />
                                        <span className="font-medium">{chapter.xpReward} XP</span>
                                      </div>
                                      
                                      <Button
                                        onClick={() => onStartScenario({
                                          id: path.id, // Use path ID (1-6) for LearningScenario to find question data
                                          pathId: path.id,
                                          chapterId: chapter.id,
                                          title: chapter.title,
                                          pathTitle: path.title,
                                          description: chapter.description,
                                          xpReward: chapter.xpReward
                                        })}
                                        size="sm"
                                        disabled={chapter.status === 'locked'}
                                        variant={chapter.status === 'completed' ? 'outline' : 'default'}
                                      >
                                        {chapter.status === 'completed' ? (
                                          <>Review <ChevronRight className="w-4 h-4 ml-1" /></>
                                        ) : chapter.status === 'in-progress' ? (
                                          <>Continue <ChevronRight className="w-4 h-4 ml-1" /></>
                                        ) : chapter.status === 'locked' ? (
                                          <>Locked <Lock className="w-4 h-4 ml-1" /></>
                                        ) : (
                                          <>Start <ChevronRight className="w-4 h-4 ml-1" /></>
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </CardContent>
          </Card>

          {/* Recommended for You */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-[#3A4A46]" />
                  <span>Recommended for You</span>
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  Based on your role
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {personalizedRecommendations.map((course) => {
                  const IconComponent = course.icon;
                  return (
                    <div 
                      key={course.id}
                      className="border-2 border-[#3A4A46] rounded-2xl p-4 hover:shadow-[0_4px_0_0_rgba(58,74,70,0.15)] hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl ${course.color} border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.15)] flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-bold text-[#3A4A46]">{course.title}</h4>
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              {course.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-[#6B7B77] mb-3 line-clamp-2">
                            {course.description}
                          </p>

                          {/* Stats & CTA */}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-3 text-xs text-[#6B7B77]">
                              <div className="flex items-center gap-1">
                                <Target className="w-3.5 h-3.5 text-[#3A4A46]" />
                                <span>{course.estimatedTime}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 text-[#3A4A46]" />
                                <span className="font-medium">{course.xpReward} XP</span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onViewCourse(course)}
                            >
                              View Course
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-[#3A4A46]" />
                  <span className="text-sm">Streak</span>
                </div>
                <span className="font-medium">{userData.streak}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-[#3A4A46]" />
                  <span className="text-sm">XP earned</span>
                </div>
                <span className="font-medium">120</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-[#3A4A46]" />
                  <span className="text-sm">Lessons</span>
                </div>
                <span className="font-medium">{userData.lessonsCompleted}</span>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {userData.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#7A9B70]/20 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-[#3A4A46]" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Friends Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>This Week</span>
                </div>
                <Button variant="ghost" size="sm">
                  <TrendingUp className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {friends.map((friend, index) => (
                <div key={friend.name} className="flex items-center space-x-3">
                  <div className="text-sm text-muted-foreground w-4">
                    #{index + 1}
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={friend.isCurrentUser ? 'bg-[#7A9B70] text-white' : ''}>
                      {friend.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{friend.name}</p>
                    <p className="text-xs text-muted-foreground">{friend.xp} XP</p>
                  </div>
                  {friend.isCurrentUser && (
                    <Badge variant="secondary" className="text-xs">You</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {/* Quick Actions card hidden */}
          {/* <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Lessons
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Find Friends
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="w-4 h-4 mr-2" />
                View Achievements
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}