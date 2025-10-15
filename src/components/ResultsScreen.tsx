import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Star, 
  RotateCcw, 
  ChevronRight, 
  Award,
  Sparkles,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function ResultsScreen({ 
  score, 
  totalQuestions,
  questionsCorrect,
  questionsWrong,
  wrongQuestionIds = [],
  chapterTitle,
  pathTitle,
  isLastChapter = false,
  passThreshold = 70, // Percentage needed to pass
  onRetakeWrong,
  onContinue,
  onBackToDashboard
}) {
  const [showConfetti, setShowConfetti] = useState(false);
  const percentage = Math.round((questionsCorrect / totalQuestions) * 100);
  const passed = percentage >= passThreshold;
  
  // Calculate bonus points
  const chapterBonus = passed ? 50 : 0; // 50 points for completing a chapter
  const pathBonus = passed && isLastChapter ? 100 : 0; // 100 points for completing entire path
  const totalScore = score + chapterBonus + pathBonus;
  
  // Calculate stars (1-3 based on performance)
  const getStars = () => {
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    return 1;
  };
  
  const stars = getStars();

  useEffect(() => {
    if (passed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [passed]);

  return (
    <div className="min-h-screen bg-[#FFF8F2] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                top: -20, 
                left: `${Math.random() * 100}%`,
                rotate: 0 
              }}
              animate={{ 
                top: '100vh', 
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 0.5,
                ease: 'easeOut'
              }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#A7B6A0', '#E66E5A', '#FDD6A1', '#C5D1BF', '#F0AA9E'][Math.floor(Math.random() * 5)]
                }}
              />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl shadow-xl">
          <CardContent className="p-8 md:p-12 text-center">
            {/* Trophy/Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: 260, 
                damping: 20,
                delay: 0.2 
              }}
              className="mx-auto w-24 h-24 mb-6"
            >
              {passed ? (
                <div className="relative">
                  <Trophy className="w-24 h-24 text-[#F4A460]" />
                  {stars === 3 && (
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                        scale: { duration: 2, repeat: Infinity }
                      }}
                      className="absolute -top-2 -right-2"
                    >
                      <Sparkles className="w-8 h-8 text-[#7A9B70]" />
                    </motion.div>
                  )}
                </div>
              ) : (
                <Award className="w-24 h-24 text-[#6B7B77]" />
              )}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl mb-2"
            >
              {passed ? 'Chapter Complete!' : 'Keep Trying!'}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground mb-6"
            >
              {pathTitle} • {chapterTitle}
            </motion.p>

            {/* Stars */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="flex justify-center gap-4 mb-8"
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.5 + (i * 0.1),
                    type: 'spring',
                    stiffness: 200
                  }}
                >
                  <Star
                    className={`w-16 h-16 ${
                      i <= stars 
                        ? 'fill-[#F4A460] text-[#F4A460]' 
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Score */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-8"
            >
              <div className="text-6xl mb-2">
                {percentage}<span className="text-3xl text-muted-foreground">%</span>
              </div>
              <div className="text-muted-foreground">
                {questionsCorrect} of {totalQuestions} correct
              </div>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto mt-4">
                <Progress value={percentage} className="h-3" />
              </div>

              {/* Pass/Fail Indicator */}
              <div className="mt-4">
                {passed ? (
                  <Badge className="bg-[#7A9B70]/20 text-[#3A4A46] border-2 border-[#7A9B70] px-4 py-2">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Passed - {passThreshold}% required
                  </Badge>
                ) : (
                  <Badge className="bg-[#E66E5A]/20 text-[#3A4A46] border-2 border-[#E66E5A] px-4 py-2">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {passThreshold}% needed to continue
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto"
            >
              <div className="bg-[#7A9B70]/20 rounded-2xl p-4 border-2 border-[#7A9B70] shadow-[0_2px_0_0_rgba(122,155,112,0.1)]">
                <div className="text-[#3A4A46] mb-1">
                  <CheckCircle className="w-5 h-5 mx-auto" />
                </div>
                <div className="text-2xl text-[#3A4A46] font-bold">{questionsCorrect}</div>
                <div className="text-sm text-[#6B7B77]">Correct</div>
              </div>
              <div className="bg-[#E66E5A]/20 rounded-2xl p-4 border-2 border-[#E66E5A] shadow-[0_2px_0_0_rgba(230,110,90,0.1)]">
                <div className="text-[#3A4A46] mb-1">
                  <AlertCircle className="w-5 h-5 mx-auto" />
                </div>
                <div className="text-2xl text-[#3A4A46] font-bold">{questionsWrong}</div>
                <div className="text-sm text-[#6B7B77]">Incorrect</div>
              </div>
            </motion.div>

            {/* Points Breakdown */}
            {passed && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mb-8 max-w-md mx-auto"
              >
                <div className="bg-[#FDD6A1]/40 rounded-2xl p-4 border-2 border-[#3A4A46] shadow-[0_2px_0_0_rgba(58,74,70,0.1)]">
                  <div className="text-sm font-bold text-[#3A4A46] mb-3">Points Earned</div>
                  
                  <div className="space-y-2 text-sm text-[#3A4A46]">
                    <div className="flex justify-between">
                      <span>Question Points:</span>
                      <span className="font-bold">+{score}</span>
                    </div>
                    
                    {chapterBonus > 0 && (
                      <div className="flex justify-between">
                        <span>Chapter Completion:</span>
                        <span className="font-bold text-[#7A9B70]">+{chapterBonus}</span>
                      </div>
                    )}
                    
                    {pathBonus > 0 && (
                      <div className="flex justify-between">
                        <span>🎉 Path Completion:</span>
                        <span className="font-bold text-[#F4A460]">+{pathBonus}</span>
                      </div>
                    )}
                    
                    <div className="border-t-2 border-[#3A4A46] pt-2 mt-2 flex justify-between">
                      <span className="font-bold">Total Points:</span>
                      <span className="font-bold text-lg text-[#3A4A46]">{totalScore}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Motivational Message */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: passed ? 1.2 : 1 }}
              className="mb-8 p-4 bg-[#7A9B70]/20 rounded-2xl border-2 border-[#7A9B70] shadow-[0_2px_0_0_rgba(122,155,112,0.1)]"
            >
              <p className="text-[#3A4A46] font-medium">
                {percentage >= 90 && "Outstanding work! You've mastered this chapter."}
                {percentage >= 70 && percentage < 90 && "Great job! You're making excellent progress."}
                {percentage >= 50 && percentage < 70 && "Good effort! Review the missed questions to strengthen your understanding."}
                {percentage < 50 && "Keep practicing! Learning takes time and repetition."}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: passed ? 1.3 : 1.1 }}
              className="space-y-3"
            >
              {passed ? (
                <>
                  <Button 
                    onClick={onContinue}
                    className="w-full"
                    size="lg"
                  >
                    {isLastChapter ? 'Complete Path' : 'Continue to Next Chapter'}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                  
                  {questionsWrong > 0 && (
                    <Button 
                      onClick={onRetakeWrong}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Review Missed Questions ({questionsWrong})
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button 
                    onClick={onRetakeWrong}
                    className="w-full"
                    size="lg"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Retry Incorrect Questions
                  </Button>
                  
                  <Button 
                    onClick={onBackToDashboard}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Back to Dashboard
                  </Button>
                </>
              )}
            </motion.div>

            {/* XP Gained (if passed) */}
            {passed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: 'spring' }}
                className="mt-6 flex items-center justify-center gap-2 text-[#7A9B70] font-bold"
              >
                <TrendingUp className="w-5 h-5" />
                <span>+{totalScore} XP earned!</span>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
