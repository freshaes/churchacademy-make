import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp, 
  BarChart3,
  FileDown,
  FileUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X
} from 'lucide-react';
import { PathEditor } from './PathEditor';
import { BadgeManager } from './BadgeManager';
import { UserManager } from './UserManager';

// Mock analytics data
const analyticsData = {
  totalUsers: 1247,
  activeUsers: 892,
  totalPaths: 6,
  totalQuizzes: 42,
  averageCompletion: 68,
  topPaths: [
    { id: 1, name: 'Leadership Fundamentals', completions: 456, avgScore: 87 },
    { id: 2, name: 'Conflict Resolution', completions: 389, avgScore: 82 },
    { id: 3, name: 'Building Strong Communities', completions: 324, avgScore: 91 },
    { id: 4, name: 'Communication Excellence', completions: 298, avgScore: 85 },
    { id: 5, name: 'Volunteer Management', completions: 267, avgScore: 79 }
  ],
  recentActivity: [
    { user: 'Sarah Johnson', action: 'Completed Leadership Fundamentals', time: '2 hours ago' },
    { user: 'Mike Chen', action: 'Started Conflict Resolution', time: '3 hours ago' },
    { user: 'Emily Rodriguez', action: 'Earned "Master Communicator" badge', time: '5 hours ago' },
    { user: 'David Kim', action: 'Completed Communication Excellence', time: '6 hours ago' },
    { user: 'Jessica Thompson', action: 'Started Building Strong Communities', time: '8 hours ago' }
  ]
};

export function AdminDashboard({ onBack }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage learning paths, badges, and users</p>
            </div>
            <Button variant="outline" onClick={onBack}>
              Back to App
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="paths" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Learning Paths</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Badges</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Total Users</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{analyticsData.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">
                    {analyticsData.activeUsers} active this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Learning Paths</CardTitle>
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{analyticsData.totalPaths}</div>
                  <p className="text-xs text-muted-foreground">
                    {analyticsData.totalQuizzes} total quizzes
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Avg Completion</CardTitle>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">{analyticsData.averageCompletion}%</div>
                  <p className="text-xs text-green-600">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm">Active Now</CardTitle>
                  <Users className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl">47</div>
                  <p className="text-xs text-muted-foreground">
                    Users online
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Top Paths */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Paths</CardTitle>
                <CardDescription>Paths with highest completion rates and scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topPaths.map((path, index) => (
                    <div key={path.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{path.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {path.completions} completions
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{path.avgScore}%</p>
                        <p className="text-xs text-muted-foreground">avg score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest user actions and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{' '}
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Paths Tab */}
          <TabsContent value="paths">
            <PathEditor />
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges">
            <BadgeManager />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <UserManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
