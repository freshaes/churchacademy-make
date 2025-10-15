import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Star, 
  ChevronRight,
  CheckCircle2,
  PlayCircle,
  Lock,
  Award,
  TrendingUp
} from 'lucide-react';

// Mock chapter data structure
const getMockChapters = (courseId) => {
  // Different chapter structures based on course
  const chapterStructures = {
    4: [ // Communication Excellence
      {
        id: 1,
        title: 'Foundations of Communication',
        description: 'Learn the core principles of effective ministry communication.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'not-started',
        xpReward: 100
      },
      {
        id: 2,
        title: 'Active Listening Skills',
        description: 'Develop deep listening skills for pastoral care.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Public Speaking Mastery',
        description: 'Communicate with confidence from the pulpit.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      }
    ],
    5: [ // Youth Ministry Leadership
      {
        id: 1,
        title: 'Understanding Gen Z',
        description: 'Connect with the next generation effectively.',
        totalQuestions: 8,
        completedQuestions: 0,
        status: 'not-started',
        xpReward: 120
      },
      {
        id: 2,
        title: 'Building Trust',
        description: 'Create authentic relationships with youth.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Event Planning',
        description: 'Design impactful youth events and retreats.',
        totalQuestions: 8,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 120
      }
    ],
    6: [ // Volunteer Management
      {
        id: 1,
        title: 'Recruitment Strategies',
        description: 'Attract and onboard dedicated volunteers.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'not-started',
        xpReward: 100
      },
      {
        id: 2,
        title: 'Training & Development',
        description: 'Equip volunteers for effective ministry.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      },
      {
        id: 3,
        title: 'Retention & Recognition',
        description: 'Keep volunteers engaged and appreciated.',
        totalQuestions: 7,
        completedQuestions: 0,
        status: 'locked',
        xpReward: 100
      }
    ]
  };
  
  return chapterStructures[courseId] || chapterStructures[4];
};

export function CourseDetail({ course, onBack, onStartLesson }) {
  const [chapters] = useState(getMockChapters(course.id));
  
  // Calculate overall progress
  const totalQuestions = chapters.reduce((sum, ch) => sum + ch.totalQuestions, 0);
  const completedQuestions = chapters.reduce((sum, ch) => sum + ch.completedQuestions, 0);
  const overallProgress = totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0;
  const completedChapters = chapters.filter(ch => ch.status === 'completed').length;

  return (
    <div className="lg:ml-80 p-6 bg-[#FFF8F2] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-2 text-[#3A4A46] hover:text-[#3A4A46] hover:bg-[#E8F1E5]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Course Header Card */}
        <Card className="border-2 border-[#3A4A46] shadow-[0_4px_0_0_rgba(58,74,70,0.1)]">
          <CardHeader className="bg-gradient-to-r from-[#E8F1E5] to-[#FFF8F2] border-b-2 border-[#3A4A46]/10">
            <div className="space-y-4">
              {/* Title and Difficulty */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-14 h-14 rounded-2xl ${course.color} border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.15)] flex items-center justify-center`}>
                      <BookOpen className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl mb-1 text-[#3A4A46]">{course.title}</h1>
                      <Badge variant="secondary" className="text-sm">
                        {course.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-[#6B7B77]">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-white/60 rounded-xl p-3 border-2 border-[#3A4A46]/10">
                  <Clock className="w-4 h-4 text-[#3A4A46]" />
                  <div>
                    <div className="text-xs text-[#6B7B77]">Duration</div>
                    <div className="font-bold text-[#3A4A46] text-sm">{course.estimatedTime}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 bg-white/60 rounded-xl p-3 border-2 border-[#3A4A46]/10">
                  <Star className="w-4 h-4 text-[#3A4A46]" />
                  <div>
                    <div className="text-xs text-[#6B7B77]">Total XP</div>
                    <div className="font-bold text-[#3A4A46] text-sm">{course.xpReward} XP</div>
                  </div>
                </div>
              </div>

              {/* Categories and Roles */}
              <div className="space-y-2">
                {course.categories && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-[#6B7B77]">Categories:</span>
                    {course.categories.map((cat) => (
                      <Badge key={cat} variant="outline" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                )}
                
                {course.roles && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-[#6B7B77]">For:</span>
                    {course.roles.slice(0, 3).map((role) => (
                      <Badge key={role} variant="outline" className="text-xs">
                        {role}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Overall Progress */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#3A4A46]">
                    {completedChapters} of {chapters.length} chapters
                  </span>
                  <span className="text-sm font-bold text-[#3A4A46]">
                    {Math.round(overallProgress)}%
                  </span>
                </div>
                <Progress value={overallProgress} className="h-3" />
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* What You'll Learn */}
        <Card className="border-2 border-[#3A4A46] shadow-[0_3px_0_0_rgba(58,74,70,0.1)]">
          <CardHeader>
            <h3 className="font-bold text-[#3A4A46] flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              What You'll Learn
            </h3>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-[#6B7B77]">
                <CheckCircle2 className="w-4 h-4 text-[#7A9B70] mt-0.5 flex-shrink-0" />
                <span>Master {course.title.toLowerCase()} principles and best practices</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#6B7B77]">
                <CheckCircle2 className="w-4 h-4 text-[#7A9B70] mt-0.5 flex-shrink-0" />
                <span>Apply biblical wisdom to real-world ministry scenarios</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#6B7B77]">
                <CheckCircle2 className="w-4 h-4 text-[#7A9B70] mt-0.5 flex-shrink-0" />
                <span>Complete interactive exercises and receive personalized feedback</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#6B7B77]">
                <CheckCircle2 className="w-4 h-4 text-[#7A9B70] mt-0.5 flex-shrink-0" />
                <span>Earn {course.xpReward} XP and unlock achievement badges</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Chapters List */}
        <div className="space-y-4">
          {chapters.map((chapter, index) => {
            const chapterProgress = chapter.totalQuestions > 0 
              ? (chapter.completedQuestions / chapter.totalQuestions) * 100 
              : 0;
            
            return (
              <Card 
                key={chapter.id}
                className={`border-2 border-[#3A4A46] shadow-[0_3px_0_0_rgba(58,74,70,0.1)] overflow-hidden transition-all ${
                  chapter.status === 'locked' ? 'opacity-60' : 'hover:shadow-[0_5px_0_0_rgba(58,74,70,0.15)] hover:-translate-y-0.5'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Chapter Number/Status Icon */}
                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.15)] flex items-center justify-center ${
                      chapter.status === 'completed' ? 'bg-[#7A9B70]' :
                      chapter.status === 'in-progress' ? 'bg-[#E66E5A]' :
                      chapter.status === 'locked' ? 'bg-[#E8E8E8]' :
                      'bg-white'
                    }`}>
                      {chapter.status === 'completed' ? (
                        <CheckCircle2 className="w-8 h-8 text-white" />
                      ) : chapter.status === 'locked' ? (
                        <Lock className="w-6 h-6 text-[#9B9B9B]" />
                      ) : (
                        <span className={`text-2xl font-bold ${
                          chapter.status === 'in-progress' ? 'text-white' : 'text-[#3A4A46]'
                        }`}>
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {/* Chapter Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-3">
                        <h3 className="font-bold text-[#3A4A46] mb-1">
                          {chapter.title}
                        </h3>
                        <p className="text-sm text-[#6B7B77]">
                          {chapter.description}
                        </p>
                      </div>

                      {/* Progress (if started) */}
                      {(chapter.status === 'in-progress' || chapter.status === 'completed') && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-[#6B7B77]">
                              {chapter.completedQuestions} of {chapter.totalQuestions} questions
                            </span>
                            {chapter.status === 'completed' && chapter.score && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#7A9B70] font-medium">
                                  Score: {chapter.score}%
                                </span>
                                <div className="flex items-center">
                                  {[1, 2, 3].map((star) => (
                                    <Star
                                      key={star}
                                      className={`w-3 h-3 ${
                                        star <= (chapter.stars || 0)
                                          ? 'fill-[#F4A460] text-[#F4A460]'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          <Progress value={chapterProgress} className="h-2" />
                        </div>
                      )}

                      {/* Chapter Stats & Actions */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-1 text-[#6B7B77]">
                          <Star className="w-4 h-4 text-[#3A4A46]" />
                          <span className="text-sm font-medium">{chapter.xpReward} XP</span>
                        </div>

                        <Button 
                          size="sm"
                          onClick={() => onStartLesson(chapter)}
                          disabled={chapter.status === 'locked'}
                          className={
                            chapter.status === 'completed' 
                              ? 'bg-[#7A9B70] hover:bg-[#6A8B60] text-white border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.2)]' 
                              : chapter.status === 'in-progress'
                              ? 'bg-[#E66E5A] hover:bg-[#D65E4A] text-white border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.2)]'
                              : chapter.status === 'locked'
                              ? 'bg-[#E8E8E8] text-[#9B9B9B] border-2 border-[#CCCCCC] cursor-not-allowed'
                              : 'bg-[#7A9B70] hover:bg-[#6A8B60] text-white border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.2)]'
                          }
                        >
                          {chapter.status === 'completed' ? (
                            <>Review <ChevronRight className="w-4 h-4 ml-1" /></>
                          ) : chapter.status === 'in-progress' ? (
                            <>Continue <ChevronRight className="w-4 h-4 ml-1" /></>
                          ) : chapter.status === 'locked' ? (
                            <>Locked <Lock className="w-4 h-4 ml-1" /></>
                          ) : (
                            <>Start <PlayCircle className="w-4 h-4 ml-1" /></>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Course Completion Card (if all chapters done) */}
        {completedChapters === chapters.length && (
          <Card className="border-2 border-[#7A9B70] bg-gradient-to-r from-[#E8F1E5] to-[#FFF8F2] shadow-[0_4px_0_0_rgba(122,155,112,0.2)]">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#7A9B70] border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.15)] flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#3A4A46] mb-1">
                    Course Complete! 🎉
                  </h3>
                  <p className="text-sm text-[#6B7B77]">
                    Congratulations on completing {course.title}! You've earned {course.xpReward} XP.
                  </p>
                </div>
                <Button className="bg-[#7A9B70] hover:bg-[#6A8B60] text-white border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.2)]">
                  View Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
