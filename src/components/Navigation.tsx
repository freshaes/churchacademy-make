import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card } from './ui/card';
import { 
  Home, 
  Trophy, 
  User, 
  Menu, 
  X,
  Church,
  Flame,
  Star,
  Heart,
  Lightbulb,
  Shield,
  Camera,
  BookOpen,
  LogOut
} from 'lucide-react';
import { useState } from 'react';

export function Navigation({ currentView, onNavigate, userProfile, userData, onUpdateProfile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedProfile = { ...userProfile, profilePicture: imageUrl };
      onUpdateProfile(updatedProfile);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'browse', label: 'Browse Courses', icon: BookOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  // Add admin link if user is an admin
  if (userData.isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin Panel', icon: Shield });
  }

  const handleLogout = () => {
    // Navigate to logout screen
    onNavigate('logout');
    setMobileMenuOpen(false);
  };

  const NavContent = () => (
    <>
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center border-2 border-[#3A4A46] shadow-[0_3px_0_0_rgba(58,74,70,0.15)]">
          <Church className="w-7 h-7 text-[#3A4A46]" />
        </div>
        <div>
          <h1 className="font-bold text-xl text-[#3A4A46]">ChurchAcademy</h1>
          <p className="text-sm text-[#6B7B77]">Leadership Development</p>
        </div>
      </div>

      {userProfile && (
        <Card className="p-4 mb-6 bg-gradient-to-br from-[#C5D1BF] to-[#A7B6A0]">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative group">
              <Avatar className="w-12 h-12 border-2 border-[#3A4A46]">
                {userProfile.profilePicture ? (
                  <img src={userProfile.profilePicture} alt={userProfile.name} className="w-full h-full object-cover" />
                ) : (
                  <AvatarFallback className="bg-white text-[#3A4A46] font-bold text-lg">
                    {userProfile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <label 
                htmlFor="nav-profile-pic-upload" 
                className="absolute inset-0 flex items-center justify-center bg-[#3A4A46]/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-4 h-4 text-white" />
              </label>
              <input
                id="nav-profile-pic-upload"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
            <div>
              <h3 className="font-bold text-[#3A4A46]">{userProfile.name}</h3>
              <p className="text-sm text-[#3A4A46]/70 capitalize">
                {userProfile.role.replace('_', ' ')} Leader
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/60 rounded-xl p-2 border-2 border-[#3A4A46]/30 shadow-[0_2px_0_0_rgba(58,74,70,0.1)]">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="w-4 h-4 text-[#3A4A46]" />
                <span className="font-bold text-[#3A4A46]">{userData.xp}</span>
              </div>
              <p className="text-xs text-[#3A4A46]/70 text-center">XP</p>
            </div>

            <div className="bg-white/60 rounded-xl p-2 border-2 border-[#3A4A46]/30 shadow-[0_2px_0_0_rgba(58,74,70,0.1)]">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Flame className="w-4 h-4 text-[#3A4A46]" />
                <span className="font-bold text-[#3A4A46]">{userData.streak}</span>
              </div>
              <p className="text-xs text-[#3A4A46]/70 text-center">Streak</p>
            </div>

            <div className="bg-white/60 rounded-xl p-2 border-2 border-[#3A4A46]/30 shadow-[0_2px_0_0_rgba(58,74,70,0.1)]">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Heart className="w-4 h-4 text-[#3A4A46]" />
                <span className="font-bold text-[#3A4A46]">{userData.lives}/{userData.maxLives}</span>
              </div>
              <p className="text-xs text-[#3A4A46]/70 text-center">Lives</p>
            </div>

            <div className="bg-white/60 rounded-xl p-2 border-2 border-[#3A4A46]/30 shadow-[0_2px_0_0_rgba(58,74,70,0.1)]">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Lightbulb className="w-4 h-4 text-[#3A4A46]" />
                <span className="font-bold text-[#3A4A46]">{userData.hintsAvailable}/{userData.maxHints}</span>
              </div>
              <p className="text-xs text-[#3A4A46]/70 text-center">Hints</p>
            </div>
          </div>
        </Card>
      )}

      <nav className="space-y-2 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-5 py-3.5 rounded-2xl transition-all font-bold border-2 shadow-[0_3px_0_0_rgba(58,74,70,0.1)] active:shadow-none active:translate-y-[2px] ${
                isActive 
                  ? 'bg-primary border-[#3A4A46] text-[#3A4A46]' 
                  : 'bg-white border-[#3A4A46] text-[#6B7B77] hover:bg-secondary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className={isActive ? 'text-white' : ''}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Button - Sticky at Bottom */}
      <div className="mt-auto pt-4 border-t-2 border-[#3A4A46]/20">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl font-bold border-2 border-[#3A4A46] text-[#6B7B77] hover:bg-[#E66E5A] hover:text-white hover:border-[#3A4A46] shadow-[0_3px_0_0_rgba(58,74,70,0.1)] active:shadow-none active:translate-y-[2px] transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-[#3A4A46] px-4 py-3 shadow-[0_4px_0_0_rgba(58,74,70,0.1)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.1)]">
              <Church className="w-6 h-6 text-[#3A4A46]" />
            </div>
            <h1 className="font-bold text-lg text-[#3A4A46]">ChurchAcademy</h1>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="border-2 border-[#3A4A46]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 w-80 h-full bg-[#FFF8F2] p-6 overflow-y-auto border-r-4 border-[#3A4A46] flex flex-col">
            <NavContent />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 w-80 h-full bg-[#FFF8F2] border-r-4 border-[#3A4A46] p-6 overflow-y-auto flex flex-col">
        <NavContent />
      </div>
    </>
  );
}
