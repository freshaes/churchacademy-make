import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Award,
  Star,
  Trophy,
  Target,
  Zap,
  Heart,
  Crown,
  Sparkles
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const iconOptions = [
  { value: 'star', label: 'Star', icon: Star },
  { value: 'trophy', label: 'Trophy', icon: Trophy },
  { value: 'target', label: 'Target', icon: Target },
  { value: 'zap', label: 'Lightning', icon: Zap },
  { value: 'heart', label: 'Heart', icon: Heart },
  { value: 'crown', label: 'Crown', icon: Crown },
  { value: 'sparkles', label: 'Sparkles', icon: Sparkles },
  { value: 'award', label: 'Award', icon: Award }
];

const colorOptions = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { value: 'green', label: 'Green', class: 'bg-green-500' },
  { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
  { value: 'red', label: 'Red', class: 'bg-red-500' },
  { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
  { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500' },
  { value: 'orange', label: 'Orange', class: 'bg-orange-500' }
];

const mockBadges = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Complete your first learning path',
    icon: 'star',
    color: 'blue',
    criteria: 'Complete 1 path',
    earnedBy: 892,
    rarity: 'common'
  },
  {
    id: 2,
    name: 'Leadership Master',
    description: 'Excel in all leadership modules',
    icon: 'crown',
    color: 'purple',
    criteria: 'Score 90%+ on all leadership paths',
    earnedBy: 127,
    rarity: 'rare'
  },
  {
    id: 3,
    name: 'Community Builder',
    description: 'Master community building skills',
    icon: 'heart',
    color: 'pink',
    criteria: 'Complete Building Strong Communities with 85%+',
    earnedBy: 324,
    rarity: 'uncommon'
  },
  {
    id: 4,
    name: 'Perfect Score',
    description: 'Achieve 100% on any quiz',
    icon: 'trophy',
    color: 'yellow',
    criteria: 'Score 100% on any quiz',
    earnedBy: 456,
    rarity: 'uncommon'
  },
  {
    id: 5,
    name: 'Rising Star',
    description: 'Top of the leaderboard',
    icon: 'sparkles',
    color: 'indigo',
    criteria: 'Reach #1 on leaderboard',
    earnedBy: 12,
    rarity: 'legendary'
  }
];

function DeleteBadgeDialog({ badgeId, badgeName, onDelete }) {
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
          <DialogTitle>Delete Badge</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{badgeName}"? Users who earned this badge will lose it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            variant="destructive" 
            onClick={() => {
              onDelete(badgeId);
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

export function BadgeManager() {
  const [badges, setBadges] = useState(mockBadges);
  const [isCreating, setIsCreating] = useState(false);
  const [newBadge, setNewBadge] = useState({
    name: '',
    description: '',
    icon: 'star',
    color: 'blue',
    criteria: '',
    rarity: 'common'
  });

  const handleCreateBadge = () => {
    const badge = {
      id: badges.length + 1,
      ...newBadge,
      earnedBy: 0
    };
    setBadges([...badges, badge]);
    setIsCreating(false);
    setNewBadge({
      name: '',
      description: '',
      icon: 'star',
      color: 'blue',
      criteria: '',
      rarity: 'common'
    });
  };

  const handleDeleteBadge = (id) => {
    setBadges(badges.filter(b => b.id !== id));
  };

  const BadgePreview = ({ badge }) => {
    const IconComponent = iconOptions.find(i => i.value === badge.icon)?.icon || Star;
    const colorClass = colorOptions.find(c => c.value === badge.color)?.class || 'bg-blue-500';
    
    return (
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full ${colorClass} flex items-center justify-center`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium">{badge.name}</h4>
          <p className="text-sm text-muted-foreground">{badge.description}</p>
        </div>
      </div>
    );
  };

  const getRarityBadge = (rarity) => {
    const variants = {
      common: { variant: 'secondary', label: 'Common' },
      uncommon: { variant: 'default', label: 'Uncommon' },
      rare: { variant: 'default', label: 'Rare' },
      legendary: { variant: 'default', label: 'Legendary' }
    };
    return variants[rarity] || variants.common;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="pt-6">
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Badge
          </Button>
        </CardContent>
      </Card>

      {/* Create Badge Dialog */}
      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Badge</DialogTitle>
            <DialogDescription>
              Design a badge to reward learner achievements
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Badge Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., First Steps"
                  value={newBadge.name}
                  onChange={(e) => setNewBadge({ ...newBadge, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="rarity">Rarity</Label>
                <Select value={newBadge.rarity} onValueChange={(value) => setNewBadge({ ...newBadge, rarity: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="common">Common</SelectItem>
                    <SelectItem value="uncommon">Uncommon</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                    <SelectItem value="legendary">Legendary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What this badge represents..."
                value={newBadge.description}
                onChange={(e) => setNewBadge({ ...newBadge, description: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="criteria">Earning Criteria</Label>
              <Input
                id="criteria"
                placeholder="e.g., Complete 5 learning paths"
                value={newBadge.criteria}
                onChange={(e) => setNewBadge({ ...newBadge, criteria: e.target.value })}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Select value={newBadge.icon} onValueChange={(value) => setNewBadge({ ...newBadge, icon: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map(icon => {
                      const IconComp = icon.icon;
                      return (
                        <SelectItem key={icon.value} value={icon.value}>
                          <div className="flex items-center gap-2">
                            <IconComp className="w-4 h-4" />
                            {icon.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <Select value={newBadge.color} onValueChange={(value) => setNewBadge({ ...newBadge, color: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(color => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded ${color.class}`} />
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <Label className="text-sm text-muted-foreground mb-2 block">Preview</Label>
              <BadgePreview badge={newBadge} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateBadge}>
              Create Badge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Badges List */}
      <Card>
        <CardHeader>
          <CardTitle>Badges ({badges.length})</CardTitle>
          <CardDescription>Manage achievement badges and rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-indigo-200 transition-colors"
              >
                <div className="flex-1">
                  <BadgePreview badge={badge} />
                  <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground pl-15">
                    <Badge {...getRarityBadge(badge.rarity)}>
                      {getRarityBadge(badge.rarity).label}
                    </Badge>
                    <span>Criteria: {badge.criteria}</span>
                    <span>Earned by {badge.earnedBy} users</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <DeleteBadgeDialog badgeId={badge.id} badgeName={badge.name} onDelete={handleDeleteBadge} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
