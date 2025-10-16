import React, { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Church, Mail, Lock, AlertCircle, Check } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function Login({ onLogin, onBackToOnboarding }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '', percentage: 0 };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    // Count how many checks pass
    Object.values(checks).forEach(check => {
      if (check) score++;
    });

    // Determine strength level
    if (score <= 1) {
      return { score, label: 'Weak', color: '#E66E5A', percentage: 20, checks };
    } else if (score === 2) {
      return { score, label: 'Fair', color: '#F59E0B', percentage: 40, checks };
    } else if (score === 3) {
      return { score, label: 'Good', color: '#9BB88F', percentage: 60, checks };
    } else if (score === 4) {
      return { score, label: 'Strong', color: '#7A9B70', percentage: 80, checks };
    } else {
      return { score, label: 'Very Strong', color: '#3A4A46', percentage: 100, checks };
    }
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }

    // Simulate login - in a real app, this would call an API
    // For demo purposes, any email/password combo works
    onLogin({
      name: email.split('@')[0],
      firstName: email.split('@')[0],
      lastName: 'User',
      email: email,
      role: 'pastor',
      goals: ['Improve conflict resolution skills', 'Develop team leadership abilities'],
      selectedPaths: [1, 2, 3]
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mb-6 border-2 border-[#3A4A46] shadow-[0_4px_0_0_rgba(58,74,70,0.15)]">
            <Church className="w-10 h-10 text-[#3A4A46]" />
          </div>
          <CardTitle className="text-3xl text-[#3A4A46]">Welcome Back!</CardTitle>
          <p className="text-[#6B7B77] mt-2">
            Sign in to continue your leadership journey
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#3A4A46]">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-[#6B7B77]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@church.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#3A4A46]">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-[#6B7B77]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11"
                />
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6B7B77]">Password Strength:</span>
                    <span 
                      className="text-xs font-medium"
                      style={{ color: passwordStrength.color }}
                    >
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-2 bg-[#F5F0E8] rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-300 rounded-full"
                      style={{ 
                        width: `${passwordStrength.percentage}%`,
                        backgroundColor: passwordStrength.color
                      }}
                    />
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="space-y-1 pt-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Check 
                        className={`w-3 h-3 ${passwordStrength.checks?.length ? 'text-[#7A9B70]' : 'text-[#D1D5D3]'}`} 
                      />
                      <span className={passwordStrength.checks?.length ? 'text-[#3A4A46]' : 'text-[#6B7B77]'}>
                        At least 8 characters
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Check 
                        className={`w-3 h-3 ${passwordStrength.checks?.uppercase ? 'text-[#7A9B70]' : 'text-[#D1D5D3]'}`} 
                      />
                      <span className={passwordStrength.checks?.uppercase ? 'text-[#3A4A46]' : 'text-[#6B7B77]'}>
                        One uppercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Check 
                        className={`w-3 h-3 ${passwordStrength.checks?.lowercase ? 'text-[#7A9B70]' : 'text-[#D1D5D3]'}`} 
                      />
                      <span className={passwordStrength.checks?.lowercase ? 'text-[#3A4A46]' : 'text-[#6B7B77]'}>
                        One lowercase letter
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Check 
                        className={`w-3 h-3 ${passwordStrength.checks?.number ? 'text-[#7A9B70]' : 'text-[#D1D5D3]'}`} 
                      />
                      <span className={passwordStrength.checks?.number ? 'text-[#3A4A46]' : 'text-[#6B7B77]'}>
                        One number
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Check 
                        className={`w-3 h-3 ${passwordStrength.checks?.special ? 'text-[#7A9B70]' : 'text-[#D1D5D3]'}`} 
                      />
                      <span className={passwordStrength.checks?.special ? 'text-[#3A4A46]' : 'text-[#6B7B77]'}>
                        One special character
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-indigo-600 hover:underline">
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-muted-foreground">New to ChurchAcademy?</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onBackToOnboarding}
            >
              Create New Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
