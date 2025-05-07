import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { ChevronRight, MessageCircle } from 'lucide-react';
import useAuthStore from '../../store/authStore';

interface PathwayCardProps {
  isAuthenticated: boolean;
  isProfileComplete: boolean;
  showChatBox: boolean;
  setShowChatBox: (show: boolean) => void;
}

const PathwayCard: React.FC<PathwayCardProps> = ({ isAuthenticated, isProfileComplete, showChatBox, setShowChatBox }) => {
  const navigate = useNavigate();

  const handleChatWithAI = () => {
    if (isAuthenticated && isProfileComplete) {
      setShowChatBox(true);
    } else if (isAuthenticated && !isProfileComplete) {
      useAuthStore.getState().setIsPopupOpen(true);
    } else {
      navigate('/login', { state: { redirectAfterLogin: '/questionnaire/basic' } });
    }
  };

  const handleFindPathway = () => {
    if (isAuthenticated) {
      if (isProfileComplete) {
        navigate('/report');
      } else {
        navigate('/profile');
      }
    } else {
      navigate('/login', { state: { redirectAfterLogin: '/questionnaire/basic' } });
    }
  };

  return (
    <div className="bg-secondary-50 rounded-lg p-6 border border-secondary-100">

      {/* AI Assistant Section - Unified Styling */}
      <div className="mb-5">
        <MessageCircle className="h-6 w-6 text-secondary-900 mb-2" />
        <h3 className="text-lg font-semibold text-secondary-900 mb-1">Have questions?</h3>
        <p className="text-secondary-700 text-sm mb-3">
          Our AI assistant can answer common questions about your immigration options.
        </p>
        <Button
          onClick={handleChatWithAI}
          rightIcon={<ChevronRight className="h-5 w-5" />}
          className="w-full bg-secondary-800 text-white justify-between hover:bg-white/90 hover:text-secondary-800 hover:border hover:border-secondary-800"
        >
          {isAuthenticated && isProfileComplete ? 'Chat with Immigration AI' : 'Login to Chat with AI Assistant'}
        </Button>
      </div>

      {/* Main Pathway Section */}
      <h3 className="text-xl font-semibold text-secondary-900 mb-3">
        Find Your Immigration Pathway And Begin Your Canadian Journey.
      </h3>
      <p className="text-secondary-700 mb-4">
        Answer a few questions about yourself and get personalized immigration recommendations.
      </p>
      <Button
        onClick={handleFindPathway}
        className="w-full bg-secondary-800 text-white justify-between hover:bg-white/90 hover:text-secondary-800 hover:border hover:border-secondary-800"
        rightIcon={<ChevronRight className="h-5 w-5" />}
      >
        {isAuthenticated
          ? (isProfileComplete ? 'View My Pathways' : 'Complete My Profile')
          : 'Start Assessment'}
      </Button>
    </div>
  );
};

export default PathwayCard;
