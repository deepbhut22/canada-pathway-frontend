import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { ChevronRight } from 'lucide-react';

interface PathwayCardProps {
  isAuthenticated: boolean;
  isProfileComplete: boolean;
}

const PathwayCard: React.FC<PathwayCardProps> = ({ isAuthenticated, isProfileComplete }) => {
  const navigate = useNavigate();

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
    <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
      <h3 className="text-xl font-semibold text-primary-900 mb-3">Find Your Immigration Pathway</h3>
      <p className="text-primary-700 mb-4">
        Answer a few questions about yourself and get personalized immigration recommendations.
      </p>
      <Button
        onClick={handleFindPathway}
        className="w-full justify-between"
        rightIcon={<ChevronRight className="h-5 w-5" />}
      >
        {isAuthenticated ?
          (isProfileComplete ? 'View My Pathways' : 'Complete My Profile') :
          'Start Assessment'}
      </Button>
    </div>
  );
};

export default PathwayCard;