import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Star,
  Filter,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { motion, AnimatePresence } from 'motion/react';

// Mock reflection data - will be replaced with real data
const mockReflections = [
  {
    id: 1,
    userId: 1,
    pathId: 1,
    pathTitle: 'Leadership Fundamentals',
    chapterId: 2,
    chapterTitle: 'Servant Leadership',
    questionId: 5,
    question: 'Reflect on a time when you had to make a difficult leadership decision. What did you learn from that experience?',
    reflectionText: 'When I had to restructure our youth ministry team last year, I learned that transparency and involving people in the process makes difficult decisions easier. I scheduled one-on-one conversations with each team member before announcing changes, which helped everyone feel heard and valued even during a challenging transition.',
    submittedAt: '2025-01-15T10:30:00Z',
    lastEditedAt: null,
    adminFeedback: {
      text: 'This is a wonderful example of servant leadership in action! Your approach of prioritizing individual conversations shows great care for your team. Consider how you might document this process to help other leaders navigate similar situations.',
      adminName: 'Pastor John',
      adminId: 5,
      feedbackAt: '2025-01-16T09:15:00Z',
      isFeatured: true
    },
    isPublic: false
  },
  {
    id: 2,
    userId: 1,
    pathId: 1,
    pathTitle: 'Leadership Fundamentals',
    chapterId: 3,
    chapterTitle: 'Building Teams',
    questionId: 8,
    question: 'Describe your ideal team culture. What values and behaviors would you prioritize?',
    reflectionText: 'My ideal team culture values authenticity, collaboration, and grace. I want people to feel safe bringing their whole selves to the team, knowing they can make mistakes and learn together. Prayer and encouragement should be woven into everything we do.',
    submittedAt: '2025-01-14T14:20:00Z',
    lastEditedAt: null,
    adminFeedback: null,
    isPublic: false
  },
  {
    id: 3,
    userId: 1,
    pathId: 2,
    pathTitle: 'Conflict Resolution',
    chapterId: 1,
    chapterTitle: 'Understanding Conflict',
    questionId: 3,
    question: 'Think about a recent conflict you witnessed or experienced. What underlying needs or values were at stake?',
    reflectionText: 'Recently, two volunteers disagreed about the schedule for our Sunday morning setup. On the surface it seemed like a simple logistics issue, but deeper down, one person valued consistency and tradition while the other valued flexibility and innovation. Recognizing these different values helped me facilitate a conversation that honored both perspectives.',
    submittedAt: '2025-01-12T16:45:00Z',
    lastEditedAt: null,
    adminFeedback: {
      text: 'Excellent insight! You\'ve identified the key principle: most conflicts are about values, not just logistics. This kind of awareness will serve you well as a leader.',
      adminName: 'Pastor Sarah',
      adminId: 7,
      feedbackAt: '2025-01-13T11:30:00Z',
      isFeatured: false
    },
    isPublic: false
  }
];

export function MyReflections({ onBack, userProfile }) {
  const [reflections, setReflections] = useState(mockReflections);
  const [selectedPath, setSelectedPath] = useState('all');
  const [feedbackFilter, setFeedbackFilter] = useState('all');
  const [expandedReflections, setExpandedReflections] = useState(new Set([1])); // First one expanded by default

  // Get unique paths from reflections
  const pathsMap = new Map();
  reflections.forEach(r => {
    if (!pathsMap.has(r.pathId)) {
      pathsMap.set(r.pathId, { id: r.pathId, title: r.pathTitle });
    }
  });
  const paths = Array.from(pathsMap.values());

  // Filter reflections
  const filteredReflections = reflections.filter(reflection => {
    const pathMatch = selectedPath === 'all' || reflection.pathId === parseInt(selectedPath);
    const feedbackMatch = feedbackFilter === 'all' || 
      (feedbackFilter === 'with-feedback' && reflection.adminFeedback) ||
      (feedbackFilter === 'no-feedback' && !reflection.adminFeedback);
    return pathMatch && feedbackMatch;
  });

  const toggleExpanded = (id) => {
    setExpandedReflections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="lg:ml-80 p-6 bg-[#FFF8F2] min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl mb-2 text-[#3A4A46] flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            My Reflections
          </h1>
          <p className="text-[#6B7B77]">Your thoughts and feedback</p>
        </div>

        {/* Main Content */}
        <div>
          {/* Filters */}
          <Card className="border-4 border-[#3A4A46] rounded-3xl shadow-[0_4px_0_0_rgba(58,74,70,0.3)] bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm text-[#6B7B77] mb-2 block">Filter by Path</label>
                  <Select value={selectedPath} onValueChange={setSelectedPath}>
                    <SelectTrigger className="rounded-2xl border-2 border-[#3A4A46] bg-white">
                      <SelectValue placeholder="All Paths" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Paths</SelectItem>
                      {paths.map(path => (
                        <SelectItem key={path.id} value={path.id.toString()}>
                          {path.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <label className="text-sm text-[#6B7B77] mb-2 block">Feedback Status</label>
                  <Select value={feedbackFilter} onValueChange={setFeedbackFilter}>
                    <SelectTrigger className="rounded-2xl border-2 border-[#3A4A46] bg-white">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reflections</SelectItem>
                      <SelectItem value="with-feedback">With Feedback</SelectItem>
                      <SelectItem value="no-feedback">Awaiting Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reflections List */}
          <div className="mt-6">
            {filteredReflections.length === 0 ? (
            <Card className="border-4 border-[#3A4A46] rounded-3xl shadow-[0_4px_0_0_rgba(58,74,70,0.3)] bg-white">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-[#6B7B77] mx-auto mb-4" />
                <h3 className="text-xl text-[#3A4A46] mb-2">No Reflections Yet</h3>
                <p className="text-[#6B7B77]">
                  Start a learning path to write your first reflection
                </p>
                <Button
                  onClick={onBack}
                  className="mt-6 bg-[#7A9B70] hover:bg-[#6B8A61] text-white rounded-2xl border-2 border-[#3A4A46] shadow-[0_4px_0_0_rgba(58,74,70,0.3)] active:shadow-none active:translate-y-[2px] transition-all px-8 py-6"
                >
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredReflections.map((reflection, index) => {
                  const isExpanded = expandedReflections.has(reflection.id);
                  const hasNewFeedback = reflection.adminFeedback && 
                    new Date(reflection.adminFeedback.feedbackAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

                  return (
                    <motion.div
                      key={reflection.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-4 border-[#3A4A46] rounded-3xl shadow-[0_4px_0_0_rgba(58,74,70,0.3)] bg-white overflow-hidden">
                        <CardHeader className="bg-gradient-to-br from-[#C5D1BF] to-[#A7B6A0] pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge 
                                  variant="secondary" 
                                  className="bg-white text-[#3A4A46] border-2 border-[#3A4A46] rounded-xl"
                                >
                                  {reflection.pathTitle}
                                </Badge>
                                {reflection.adminFeedback?.isFeatured && (
                                  <Badge 
                                    variant="secondary" 
                                    className="bg-[#FFD700] text-[#3A4A46] border-2 border-[#3A4A46] rounded-xl"
                                  >
                                    <Star className="w-3 h-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                {hasNewFeedback && (
                                  <Badge 
                                    variant="secondary" 
                                    className="bg-[#E66E5A] text-white border-2 border-[#3A4A46] rounded-xl"
                                  >
                                    New Feedback
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-lg text-[#3A4A46] mb-1">
                                {reflection.chapterTitle}
                              </CardTitle>
                              <p className="text-sm text-[#3A4A46] opacity-90">
                                {reflection.question}
                              </p>
                            </div>
                            <Button
                              onClick={() => toggleExpanded(reflection.id)}
                              variant="ghost"
                              size="icon"
                              className="rounded-2xl hover:bg-white/50 flex-shrink-0"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-[#3A4A46]" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-[#3A4A46]" />
                              )}
                            </Button>
                          </div>
                        </CardHeader>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CardContent className="p-6">
                                {/* User's Reflection */}
                                <div className="mb-6">
                                  <h4 className="text-sm text-[#6B7B77] mb-3">Your Reflection</h4>
                                  <div className="bg-[#FFF8F2] rounded-2xl border-2 border-[#C5D1BF] p-4">
                                    <p className="text-[#3A4A46]">
                                      {reflection.reflectionText}
                                    </p>
                                  </div>
                                </div>

                                {/* Admin Feedback */}
                                {reflection.adminFeedback ? (
                                  <div className="bg-gradient-to-br from-[#E8F0E5] to-[#D4E5CF] rounded-2xl border-2 border-[#7A9B70] p-4">
                                    <div className="flex items-center gap-2 mb-3">
                                      <MessageSquare className="w-4 h-4 text-[#3A4A46]" />
                                      <h4 className="text-sm text-[#3A4A46]">
                                        Feedback from {reflection.adminFeedback.adminName}
                                      </h4>
                                    </div>
                                    <p className="text-[#3A4A46] mb-3">
                                      {reflection.adminFeedback.text}
                                    </p>
                                    <p className="text-xs text-[#6B7B77]">
                                      {formatDate(reflection.adminFeedback.feedbackAt)}
                                    </p>
                                  </div>
                                ) : (
                                  <div className="bg-[#F5F1EC] rounded-2xl border-2 border-dashed border-[#C5D1BF] p-4 text-center">
                                    <p className="text-sm text-[#6B7B77]">
                                      Awaiting feedback from your mentor
                                    </p>
                                  </div>
                                )}

                                {/* Footer */}
                                <Separator className="my-4 bg-[#C5D1BF]" />
                                <div className="flex items-center justify-between text-xs text-[#6B7B77]">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    Written {formatDate(reflection.submittedAt)}
                                  </div>
                                </div>
                              </CardContent>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Collapsed Preview */}
                        {!isExpanded && (
                          <CardContent className="p-6 pt-0">
                            <p className="text-[#6B7B77] text-sm line-clamp-2">
                              {reflection.reflectionText}
                            </p>
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2 text-xs text-[#6B7B77]">
                                <Calendar className="w-3 h-3" />
                                {formatDate(reflection.submittedAt)}
                              </div>
                              {reflection.adminFeedback && (
                                <Badge 
                                  variant="secondary" 
                                  className="bg-[#7A9B70] text-white border-2 border-[#3A4A46] rounded-xl text-xs"
                                >
                                  <MessageSquare className="w-3 h-3 mr-1" />
                                  Has Feedback
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
