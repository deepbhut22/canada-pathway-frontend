import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

interface CtaSectionProps {
  isAuthenticated: boolean;
  isProfileComplete: boolean;
}

const CtaSection: React.FC<CtaSectionProps> = ({ isAuthenticated, isProfileComplete }) => {
  const navigate = useNavigate();

  const handleCallToAction = () => {
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
    <div className="bg-primary-700 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Begin Your Canadian Journey Today</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Take the first step towards your new life in Canada. Our platform simplifies the complex immigration process with personalized guidance.
        </p>
        <Button 
          size="lg" 
          id="hero-button"
          className="bg-white text-primary-700 hover:bg-primary-50"
          onClick={handleCallToAction}
        >
          {isAuthenticated ? 
            (isProfileComplete ? 'View My Immigration Pathways' : 'Complete My Profile') : 
            'Start My Assessment'}
        </Button>
      </div>
    </div>
  );
};

export default CtaSection;