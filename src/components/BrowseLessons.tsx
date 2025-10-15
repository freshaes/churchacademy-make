import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  Search,
  BookOpen,
  Star,
  MessageSquare,
  Heart,
  Music,
  Briefcase,
  Filter,
  ChevronRight,
  Clock,
  Award,
  Users,
  Target
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Map role IDs to display names
const roleDisplayNames = {
  'senior-pastor': 'Senior Pastor',
  'youth-minister': 'Youth Minister',
  'worship-leader': 'Worship Leader',
  'admin-team': 'Admin Team',
  'volunteer-leader': 'Volunteer Leader',
  'tech-team': 'Tech Team'
};

const allPaths = [
  {
    id: 1,
    title: 'Leadership Fundamentals',
    description: 'Master the essential principles of servant leadership in a church context.',
    difficulty: 'Intermediate',
    totalChapters: 3,
    totalLessons: 21,
    estimatedTime: '6 hours',
    xpReward: 300,
    roles: ['senior-pastor', 'volunteer-leader', 'admin-team'],
    categories: ['Leadership', 'Team Building'],
    rating: 4.8,
    enrolledCount: 1240,
    icon: Target,
    color: 'bg-[#7A9B70]'
  },
  {
    id: 2,
    title: 'Conflict Resolution Mastery',
    description: 'Learn advanced techniques for resolving conflicts with grace and wisdom.',
    difficulty: 'Advanced',
    totalChapters: 3,
    totalLessons: 21,
    estimatedTime: '7 hours',
    xpReward: 350,
    roles: ['senior-pastor', 'youth-minister', 'volunteer-leader'],
    categories: ['Communication', 'Leadership'],
    rating: 4.9,
    enrolledCount: 890,
    icon: MessageSquare,
    color: 'bg-[#E66E5A]'
  },
  {
    id: 3,
    title: 'Building Strong Communities',
    description: 'Create lasting connections and foster unity in your ministry.',
    difficulty: 'Beginner',
    totalChapters: 3,
    totalLessons: 21,
    estimatedTime: '5 hours',
    xpReward: 300,
    roles: ['senior-pastor', 'youth-minister', 'volunteer-leader'],
    categories: ['Community', 'Relationships'],
    rating: 4.7,
    enrolledCount: 1580,
    icon: Heart,
    color: 'bg-[#7A9B70]'
  },
  {
    id: 4,
    title: 'Communication Excellence',
    description: 'Develop clear, compassionate communication skills for ministry leadership.',
    difficulty: 'Intermediate',
    totalChapters: 3,
    totalLessons: 21,
    estimatedTime: '6 hours',
    xpReward: 300,
    roles: ['senior-pastor', 'youth-minister', 'admin-team'],
    categories: ['Communication', 'Leadership'],
    rating: 4.6,
    enrolledCount: 720,
    icon: MessageSquare,
    color: 'bg-[#E66E5A]'
  },
  {
    id: 5,
    title: 'Youth Ministry Leadership',
    description: 'Engage and disciple the next generation with effective youth ministry strategies.',
    difficulty: 'Intermediate',
    totalChapters: 4,
    totalLessons: 28,
    estimatedTime: '8 hours',
    xpReward: 400,
    roles: ['youth-minister', 'volunteer-leader'],
    categories: ['Youth Ministry', 'Leadership'],
    rating: 4.9,
    enrolledCount: 950,
    icon: Users,
    color: 'bg-[#7A9B70]'
  },
  {
    id: 6,
    title: 'Worship Leadership Excellence',
    description: 'Lead worship teams with confidence and inspire meaningful worship experiences.',
    difficulty: 'Intermediate',
    totalChapters: 3,
    totalLessons: 21,
    estimatedTime: '6 hours',
    xpReward: 300,
    roles: ['worship-leader', 'tech-team'],
    categories: ['Worship', 'Team Building'],
    rating: 4.8,
    enrolledCount: 640,
    icon: Music,
    color: 'bg-[#E66E5A]'
  },
  {
    id: 7,
    title: 'Administrative Excellence',
    description: 'Streamline church operations and build efficient administrative systems.',
    difficulty: 'Beginner',
    totalChapters: 3,
    totalLessons: 21,
    estimatedTime: '5 hours',
    xpReward: 300,
    roles: ['admin-team', 'senior-pastor'],
    categories: ['Administration', 'Organization'],
    rating: 4.5,
    enrolledCount: 430,
    icon: Briefcase,
    color: 'bg-[#7A9B70]'
  },
  {
    id: 8,
    title: 'Volunteer Management',
    description: 'Recruit, train, and retain dedicated volunteers for your ministry.',
    difficulty: 'Intermediate',
    totalChapters: 3,
    totalLessons: 21,
    estimatedTime: '6 hours',
    xpReward: 300,
    roles: ['volunteer-leader', 'senior-pastor', 'youth-minister'],
    categories: ['Leadership', 'Team Building'],
    rating: 4.7,
    enrolledCount: 820,
    icon: Users,
    color: 'bg-[#E66E5A]'
  },
  {
    id: 9,
    title: 'Spiritual Formation',
    description: 'Deepen your spiritual life and guide others in their faith journey.',
    difficulty: 'Intermediate',
    totalChapters: 4,
    totalLessons: 28,
    estimatedTime: '8 hours',
    xpReward: 400,
    roles: ['senior-pastor', 'youth-minister', 'volunteer-leader'],
    categories: ['Spiritual Growth', 'Discipleship'],
    rating: 4.9,
    enrolledCount: 1340,
    icon: BookOpen,
    color: 'bg-[#7A9B70]'
  }
];

const roleOptions = [
  'All Roles',
  'Senior Pastor',
  'Youth Minister',
  'Worship Leader',
  'Admin Team',
  'Volunteer Leader',
  'Tech Team'
];

const categoryOptions = [
  'All Categories',
  'Leadership',
  'Communication',
  'Team Building',
  'Community',
  'Youth Ministry',
  'Worship',
  'Administration',
  'Spiritual Growth',
  'Discipleship',
  'Relationships',
  'Organization'
];

const difficultyOptions = [
  'All Levels',
  'Beginner',
  'Intermediate',
  'Advanced'
];

export function BrowseLessons({ onStartPath, userProfile, onViewCourse }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');

  const filteredPaths = allPaths.filter(path => {
    const matchesSearch = 
      path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      path.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = 
      selectedRole === 'All Roles' || 
      path.roles.includes(selectedRole);
    
    const matchesCategory = 
      selectedCategory === 'All Categories' || 
      path.categories.includes(selectedCategory);
    
    const matchesDifficulty = 
      selectedDifficulty === 'All Levels' || 
      path.difficulty === selectedDifficulty;

    return matchesSearch && matchesRole && matchesCategory && matchesDifficulty;
  });

  // PROTOTYPE: Hardcoded suggestions (in production, this would be personalized by role)
  const suggestedForRole = userProfile ? [
    allPaths[3], // Communication Excellence
    allPaths[0], // Leadership Fundamentals
    allPaths[7]  // Volunteer Management
  ] : [];

  return (
    <div className="lg:ml-80 p-6 bg-[#FFF8F2] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl mb-2 text-[#3A4A46]">Browse All Courses</h1>
          <p className="text-[#6B7B77]">
            Discover learning paths tailored to your ministry role and goals
          </p>
        </div>

        {/* Suggested for Role */}
        {userProfile && suggestedForRole.length > 0 && (
          <Card className="mb-6 border-2 border-[#7A9B70]/30 bg-gradient-to-r from-[#E8F1E5] to-[#FFF8F2]">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#7A9B70] border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.15)] flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#3A4A46] mb-1">
                    Suggested for You
                  </h3>
                  <p className="text-sm text-[#6B7B77]">
                    Courses tailored to your ministry role and goals
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {suggestedForRole.map((path) => {
                  const IconComponent = path.icon;
                  return (
                    <div 
                      key={path.id}
                      className="bg-white border-2 border-[#3A4A46] rounded-xl p-3 hover:shadow-[0_3px_0_0_rgba(58,74,70,0.15)] hover:-translate-y-0.5 transition-all cursor-pointer"
                      onClick={() => onViewCourse ? onViewCourse(path) : onStartPath(path)}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-lg ${path.color} border-2 border-[#3A4A46] flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-[#3A4A46] line-clamp-1">
                            {path.title}
                          </h4>
                        </div>
                      </div>
                      <p className="text-xs text-[#6B7B77] mb-2 line-clamp-2">
                        {path.description}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#6B7B77]">{path.estimatedTime}</span>
                        <Badge variant="secondary" className="text-xs h-5">
                          {path.xpReward} XP
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7B77]" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Role Filter */}
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Difficulty Filter */}
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyOptions.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Summary */}
            {(selectedRole !== 'All Roles' || selectedCategory !== 'All Categories' || selectedDifficulty !== 'All Levels' || searchQuery) && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-sm text-[#6B7B77]">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {searchQuery}
                  </Badge>
                )}
                {selectedRole !== 'All Roles' && (
                  <Badge variant="secondary">{selectedRole}</Badge>
                )}
                {selectedCategory !== 'All Categories' && (
                  <Badge variant="secondary">{selectedCategory}</Badge>
                )}
                {selectedDifficulty !== 'All Levels' && (
                  <Badge variant="secondary">{selectedDifficulty}</Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRole('All Roles');
                    setSelectedCategory('All Categories');
                    setSelectedDifficulty('All Levels');
                  }}
                  className="h-7 text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#6B7B77]">
            Showing {filteredPaths.length} {filteredPaths.length === 1 ? 'course' : 'courses'}
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path) => {
            const IconComponent = path.icon;
            return (
              <Card 
                key={path.id} 
                className="hover:shadow-[0_6px_0_0_rgba(58,74,70,0.15)] transition-all hover:-translate-y-1 cursor-pointer group"
              >
                <CardContent className="pt-6">
                  {/* Icon Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${path.color} border-2 border-[#3A4A46] shadow-[0_3px_0_0_rgba(58,74,70,0.15)] flex items-center justify-center`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#F4A460] text-[#F4A460]" />
                      <span className="text-sm font-bold text-[#3A4A46]">{path.rating}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-[#3A4A46] mb-2">{path.title}</h3>
                  <p className="text-sm text-[#6B7B77] mb-4 line-clamp-2">
                    {path.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {path.difficulty}
                    </Badge>
                    {path.categories.slice(0, 2).map(category => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-t border-b border-[#3A4A46]/10">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#3A4A46]" />
                      <span className="text-xs text-[#6B7B77]">{path.totalChapters} chapters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#3A4A46]" />
                      <span className="text-xs text-[#6B7B77]">{path.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#3A4A46]" />
                      <span className="text-xs text-[#6B7B77] col-span-2">{path.xpReward} XP</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full group-hover:scale-[1.02] transition-transform"
                    onClick={() => onViewCourse ? onViewCourse(path) : onStartPath(path)}
                  >
                    View Course
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredPaths.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Filter className="w-12 h-12 text-[#6B7B77] mx-auto mb-4" />
              <h3 className="font-bold text-[#3A4A46] mb-2">No courses found</h3>
              <p className="text-[#6B7B77] mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRole('All Roles');
                  setSelectedCategory('All Categories');
                  setSelectedDifficulty('All Levels');
                }}
              >
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
