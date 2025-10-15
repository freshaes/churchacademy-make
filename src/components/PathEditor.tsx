import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { PathEditorFull } from './PathEditorFull';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save,
  X,
  FileDown,
  FileUp,
  ChevronRight,
  GripVertical,
  PlayCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Switch } from './ui/switch';

// Mock existing paths
const mockPaths = [
  { 
    id: 1, 
    title: 'Leadership Fundamentals', 
    status: 'published', 
    chapters: 3, 
    quizzes: 8,
    enrollments: 456,
    created: '2024-01-15'
  },
  { 
    id: 2, 
    title: 'Conflict Resolution', 
    status: 'published', 
    chapters: 2, 
    quizzes: 7,
    enrollments: 389,
    created: '2024-02-01'
  },
  { 
    id: 3, 
    title: 'Building Strong Communities', 
    status: 'published', 
    chapters: 1, 
    quizzes: 7,
    enrollments: 324,
    created: '2024-02-15'
  },
  { 
    id: 4, 
    title: 'Communication Excellence', 
    status: 'draft', 
    chapters: 2, 
    quizzes: 5,
    enrollments: 0,
    created: '2024-03-01'
  }
];

const questionTypes = [
  { value: 'multiple-choice', label: 'Multiple Choice' },
  { value: 'true-false', label: 'True/False' },
  { value: 'multiple-answer', label: 'Multiple Answer' },
  { value: 'matching', label: 'Matching' },
  { value: 'fill-blank', label: 'Fill in the Blank' },
  { value: 'image', label: 'Image-based' },
  { value: 'video', label: 'Video-based' },
  { value: 'content', label: 'Content Slide' }
];

function DeletePathDialog({ pathId, pathTitle, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Learning Path</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{pathTitle}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            variant="destructive" 
            onClick={() => {
              onDelete(pathId);
              setOpen(false);
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function PathEditor() {
  const [paths, setPaths] = useState(mockPaths);
  const [isCreating, setIsCreating] = useState(false);
  const [editingPathId, setEditingPathId] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // New path form state
  const [newPath, setNewPath] = useState({
    title: '',
    description: '',
    status: 'draft',
    chapters: [
      {
        id: 1,
        title: 'Chapter 1',
        questions: []
      }
    ]
  });

  const handleCreatePath = () => {
    setIsCreating(true);
  };

  const handleSavePath = () => {
    const pathToSave = {
      id: paths.length + 1,
      title: newPath.title,
      status: newPath.status,
      chapters: newPath.chapters.length,
      quizzes: newPath.chapters.reduce((sum, ch) => sum + ch.questions.length, 0),
      enrollments: 0,
      created: new Date().toISOString().split('T')[0]
    };
    setPaths([...paths, pathToSave]);
    setIsCreating(false);
    setNewPath({
      title: '',
      description: '',
      status: 'draft',
      chapters: [{ id: 1, title: 'Chapter 1', questions: [] }]
    });
  };

  const handleDeletePath = (id) => {
    setPaths(paths.filter(p => p.id !== id));
  };

  const handleToggleStatus = (id) => {
    setPaths(paths.map(p => 
      p.id === id 
        ? { ...p, status: p.status === 'published' ? 'draft' : 'published' }
        : p
    ));
  };

  const addChapter = () => {
    setNewPath({
      ...newPath,
      chapters: [
        ...newPath.chapters,
        { id: newPath.chapters.length + 1, title: `Chapter ${newPath.chapters.length + 1}`, questions: [] }
      ]
    });
  };

  const addQuestion = (chapterIndex) => {
    const updatedChapters = [...newPath.chapters];
    updatedChapters[chapterIndex].questions.push({
      id: updatedChapters[chapterIndex].questions.length + 1,
      type: 'multiple-choice',
      question: '',
      points: 5
    });
    setNewPath({ ...newPath, chapters: updatedChapters });
  };

  const handleExportCSV = () => {
    // Mock CSV export
    const csv = paths.map(p => `${p.id},${p.title},${p.status},${p.chapters},${p.quizzes}`).join('\n');
    const blob = new Blob([`ID,Title,Status,Chapters,Quizzes\n${csv}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'learning-paths.csv';
    a.click();
  };

  // Show full editor when editing
  if (editingPathId !== null) {
    return (
      <PathEditorFull
        pathId={editingPathId}
        onSave={(pathData) => {
          // Update the path in the list
          setPaths(paths.map(p => p.id === editingPathId ? { ...p, title: pathData.title } : p));
          setEditingPathId(null);
        }}
        onCancel={() => setEditingPathId(null)}
      />
    );
  }

  if (isCreating) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Create New Learning Path</CardTitle>
                <CardDescription>Build a comprehensive learning experience step by step</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Path Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Leadership Fundamentals"
                  value={newPath.title}
                  onChange={(e) => setNewPath({ ...newPath, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what learners will achieve..."
                  value={newPath.description}
                  onChange={(e) => setNewPath({ ...newPath, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="publish"
                  checked={newPath.status === 'published'}
                  onCheckedChange={(checked) => 
                    setNewPath({ ...newPath, status: checked ? 'published' : 'draft' })
                  }
                />
                <Label htmlFor="publish">Publish immediately</Label>
              </div>
            </div>

            {/* Chapters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Chapters</h3>
                <Button onClick={addChapter} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Chapter
                </Button>
              </div>

              {newPath.chapters.map((chapter, chapterIndex) => (
                <Card key={chapter.id} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-muted-foreground" />
                      <Input
                        value={chapter.title}
                        onChange={(e) => {
                          const updatedChapters = [...newPath.chapters];
                          updatedChapters[chapterIndex].title = e.target.value;
                          setNewPath({ ...newPath, chapters: updatedChapters });
                        }}
                        className="font-medium"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {chapter.questions.map((question, qIndex) => (
                      <div key={question.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1 grid gap-2 md:grid-cols-3">
                          <Select defaultValue={question.type}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {questionTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input 
                            placeholder="Question text..."
                            value={question.question}
                            className="md:col-span-2"
                          />
                        </div>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      onClick={() => addQuestion(chapterIndex)} 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Question
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={handleSavePath} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Path
              </Button>
              <Button variant="outline" onClick={() => setShowPreview(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleCreatePath}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Path
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Paths List */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Paths ({paths.length})</CardTitle>
          <CardDescription>Manage your learning content and curriculum</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paths.map((path) => (
              <div
                key={path.id}
                className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-indigo-200 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{path.title}</h3>
                    <Badge variant={path.status === 'published' ? 'default' : 'secondary'}>
                      {path.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{path.chapters} chapters</span>
                    <span>{path.quizzes} quizzes</span>
                    <span>{path.enrollments} enrollments</span>
                    <span>Created {path.created}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setEditingPathId(path.id)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <DeletePathDialog pathId={path.id} pathTitle={path.title} onDelete={handleDeletePath} />
                  <Button
                    variant={path.status === 'published' ? 'secondary' : 'default'}
                    size="sm"
                    onClick={() => handleToggleStatus(path.id)}
                  >
                    {path.status === 'published' ? 'Unpublish' : 'Publish'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
