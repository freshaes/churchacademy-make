import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { 
  MessageSquare, 
  Star,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock reflection data
const mockReflections = [
  {
    id: 1,
    userId: 15,
    userName: 'Sarah Martinez',
    userEmail: 'sarah@church.org',
    pathId: 1,
    pathTitle: 'Leadership Fundamentals',
    chapterId: 2,
    chapterTitle: 'Servant Leadership',
    questionId: 5,
    question: 'Reflect on a time when you had to make a difficult leadership decision. What did you learn from that experience?',
    reflectionText: 'When I had to restructure our youth ministry team last year, I learned that transparency and involving people in the process makes difficult decisions easier. I scheduled one-on-one conversations with each team member before announcing changes, which helped everyone feel heard and valued even during a challenging transition.',
    submittedAt: '2025-01-15T10:30:00Z',
    adminFeedback: null,
    status: 'pending'
  },
  {
    id: 2,
    userId: 23,
    userName: 'John Davis',
    userEmail: 'john@church.org',
    pathId: 2,
    pathTitle: 'Team Building',
    chapterId: 1,
    chapterTitle: 'Understanding Teams',
    questionId: 3,
    question: 'Describe your ideal team culture. What values and behaviors would you prioritize?',
    reflectionText: 'I believe in creating a culture where people feel safe to be themselves and make mistakes. Prayer should be at the center, along with open communication and mutual support. I want team members to know they\'re valued for who they are, not just what they do.',
    submittedAt: '2025-01-14T14:20:00Z',
    adminFeedback: null,
    status: 'pending'
  },
  {
    id: 3,
    userId: 8,
    userName: 'Maria Lopez',
    userEmail: 'maria@church.org',
    pathId: 1,
    pathTitle: 'Leadership Fundamentals',
    chapterId: 3,
    chapterTitle: 'Building Teams',
    questionId: 8,
    question: 'Think about a recent conflict you witnessed or experienced. What underlying needs or values were at stake?',
    reflectionText: 'In our worship team, two members disagreed about song selection. At first it seemed like personal preference, but I realized one person valued familiar hymns that connect to tradition, while the other wanted contemporary songs to reach younger people. Both were trying to help people connect with God, just in different ways.',
    submittedAt: '2025-01-13T16:45:00Z',
    adminFeedback: {
      text: 'Excellent insight! You\'ve identified the key principle: most conflicts are about values, not just preferences. This kind of awareness will serve you well as a leader.',
      adminName: 'Pastor Sarah',
      adminId: 2,
      feedbackAt: '2025-01-14T11:30:00Z',
      isFeatured: true
    },
    status: 'reviewed'
  },
  {
    id: 4,
    userId: 45,
    userName: 'David Kim',
    userEmail: 'david@church.org',
    pathId: 1,
    pathTitle: 'Leadership Fundamentals',
    chapterId: 2,
    chapterTitle: 'Servant Leadership',
    questionId: 5,
    question: 'Reflect on a time when you had to make a difficult leadership decision. What did you learn from that experience?',
    reflectionText: 'I had to let go of a volunteer who wasn\'t reliable. It was hard because they were enthusiastic, but their inconsistency was affecting the whole team. I learned that sometimes loving someone means having difficult conversations for the good of the ministry.',
    submittedAt: '2025-01-12T09:15:00Z',
    adminFeedback: {
      text: 'This shows real maturity in leadership. Setting healthy boundaries is an act of service to your team. Well done!',
      adminName: 'Pastor John',
      adminId: 1,
      feedbackAt: '2025-01-13T08:20:00Z',
      isFeatured: false
    },
    status: 'reviewed'
  }
];

export function AdminReflections() {
  const [reflections, setReflections] = useState(mockReflections);
  const [selectedPath, setSelectedPath] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedReflection, setExpandedReflection] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  // Get unique paths
  const paths = [...new Set(reflections.map(r => ({ id: r.pathId, title: r.pathTitle })))];

  // Filter reflections
  const filteredReflections = reflections.filter(reflection => {
    const pathMatch = selectedPath === 'all' || reflection.pathId === parseInt(selectedPath);
    const statusMatch = statusFilter === 'all' || 
      (statusFilter === 'pending' && !reflection.adminFeedback) ||
      (statusFilter === 'reviewed' && reflection.adminFeedback);
    const searchMatch = searchQuery === '' || 
      reflection.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reflection.reflectionText.toLowerCase().includes(searchQuery.toLowerCase());
    
    return pathMatch && statusMatch && searchMatch;
  });

  const handleExpandReflection = (reflection) => {
    if (expandedReflection?.id === reflection.id) {
      setExpandedReflection(null);
      setFeedbackText('');
      setIsFeatured(false);
    } else {
      setExpandedReflection(reflection);
      setFeedbackText(reflection.adminFeedback?.text || '');
      setIsFeatured(reflection.adminFeedback?.isFeatured || false);
    }
  };

  const handleSaveFeedback = () => {
    const updatedReflections = reflections.map(r => {
      if (r.id === expandedReflection.id) {
        return {
          ...r,
          adminFeedback: {
            text: feedbackText,
            adminName: 'Current Admin', // This would come from auth
            adminId: 1,
            feedbackAt: new Date().toISOString(),
            isFeatured: isFeatured
          },
          status: 'reviewed'
        };
      }
      return r;
    });
    
    setReflections(updatedReflections);
    setExpandedReflection(null);
    setFeedbackText('');
    setIsFeatured(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingCount = reflections.filter(r => !r.adminFeedback).length;
  const reviewedCount = reflections.filter(r => r.adminFeedback).length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-4 border-[#3A4A46] rounded-3xl shadow-[0_4px_0_0_rgba(58,74,70,0.3)] bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-[#6B7B77]">Total Reflections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-[#3A4A46]">{reflections.length}</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#3A4A46] rounded-3xl shadow-[0_4px_0_0_rgba(58,74,70,0.3)] bg-gradient-to-br from-[#FDD6A1] to-[#FCB859]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-[#3A4A46]">Awaiting Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-[#3A4A46]">{pendingCount}</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-[#3A4A46] rounded-3xl shadow-[0_4px_0_0_rgba(58,74,70,0.3)] bg-gradient-to-br from-[#A7B6A0] to-[#7A9B70]">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white">Reviewed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white">{reviewedCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-4 border-[#3A4A46] rounded-3xl shadow-[0_4px_0_0_rgba(58,74,70,0.3)] bg-white">
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm text-[#6B7B77] mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7B77]" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or content..."
                  className="pl-10 rounded-2xl border-2 border-[#3A4A46] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#6B7B77] mb-2 block">Learning Path</label>
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

            <div>
              <label className="text-sm text-[#6B7B77] mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="rounded-2xl border-2 border-[#3A4A46] bg-white">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Awaiting Feedback</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reflections Table */}
      <Card className="border-4 border-[#3A4A46] rounded-3xl shadow-[0_4px_0_0_rgba(58,74,70,0.3)] bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-[#C5D1BF]">
              <TableHead className="text-[#3A4A46]">User</TableHead>
              <TableHead className="text-[#3A4A46]">Path</TableHead>
              <TableHead className="text-[#3A4A46]">Question</TableHead>
              <TableHead className="text-[#3A4A46]">Submitted</TableHead>
              <TableHead className="text-[#3A4A46]">Status</TableHead>
              <TableHead className="text-[#3A4A46]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReflections.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-[#6B7B77]">
                  No reflections found matching your filters
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filteredReflections.map((reflection) => (
                  <React.Fragment key={reflection.id}>
                    <TableRow className="border-b border-[#C5D1BF]">
                      <TableCell>
                        <div>
                          <div className="text-[#3A4A46]">{reflection.userName}</div>
                          <div className="text-xs text-[#6B7B77]">{reflection.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-[#C5D1BF] text-[#3A4A46] border-2 border-[#3A4A46] rounded-xl">
                          {reflection.pathTitle}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate text-sm text-[#6B7B77]">
                          {reflection.question}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-[#6B7B77]">
                        {formatDate(reflection.submittedAt)}
                      </TableCell>
                      <TableCell>
                        {reflection.adminFeedback ? (
                          <Badge className="bg-[#7A9B70] text-white border-2 border-[#3A4A46] rounded-xl">
                            ✅ Reviewed
                          </Badge>
                        ) : (
                          <Badge className="bg-[#FDD6A1] text-[#3A4A46] border-2 border-[#3A4A46] rounded-xl">
                            📝 Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleExpandReflection(reflection)}
                          size="sm"
                          variant="ghost"
                          className="rounded-2xl hover:bg-[#FFF8F2]"
                        >
                          {expandedReflection?.id === reflection.id ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-1" />
                              Close
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-1" />
                              View
                            </>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>

                    {/* Expanded Row */}
                    <AnimatePresence>
                      {expandedReflection?.id === reflection.id && (
                        <TableRow>
                          <TableCell colSpan={6} className="p-0 border-0">
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 bg-gradient-to-br from-[#FFF8F2] to-[#F5F1EC] border-t-2 border-b-2 border-[#C5D1BF]">
                                {/* Question */}
                                <div className="mb-4">
                                  <h4 className="text-sm text-[#6B7B77] mb-2">Question</h4>
                                  <p className="text-[#3A4A46]">{reflection.question}</p>
                                </div>

                                {/* User's Reflection */}
                                <div className="mb-6">
                                  <h4 className="text-sm text-[#6B7B77] mb-2">User's Reflection</h4>
                                  <div className="bg-white rounded-2xl border-2 border-[#C5D1BF] p-4">
                                    <p className="text-[#3A4A46]">{reflection.reflectionText}</p>
                                  </div>
                                </div>

                                {/* Feedback Form */}
                                <div className="space-y-4">
                                  <h4 className="text-sm text-[#6B7B77]">Your Feedback</h4>
                                  <Textarea
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    placeholder="Provide encouraging and constructive feedback..."
                                    className="min-h-[120px] rounded-2xl border-2 border-[#3A4A46] bg-white"
                                  />

                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`featured-${reflection.id}`}
                                      checked={isFeatured}
                                      onCheckedChange={setIsFeatured}
                                    />
                                    <Label
                                      htmlFor={`featured-${reflection.id}`}
                                      className="text-sm text-[#3A4A46] flex items-center gap-1 cursor-pointer"
                                    >
                                      <Star className="w-4 h-4 text-[#FFD700]" />
                                      Mark as Featured Reflection
                                    </Label>
                                  </div>

                                  <div className="flex gap-2">
                                    <Button
                                      onClick={handleSaveFeedback}
                                      disabled={!feedbackText.trim()}
                                      className="bg-[#7A9B70] hover:bg-[#6B8A61] text-white rounded-2xl border-2 border-[#3A4A46] shadow-[0_4px_0_0_rgba(58,74,70,0.3)] active:shadow-none active:translate-y-[2px] transition-all"
                                    >
                                      <Send className="w-4 h-4 mr-2" />
                                      Save Feedback
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        setExpandedReflection(null);
                                        setFeedbackText('');
                                        setIsFeatured(false);
                                      }}
                                      variant="outline"
                                      className="rounded-2xl border-2 border-[#3A4A46]"
                                    >
                                      <X className="w-4 h-4 mr-2" />
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </TableCell>
                        </TableRow>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
