import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

export default function CtaSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Begin Your Canadian Journey?
        </h2>
        <p className="text-primary-100 max-w-2xl mx-auto mb-8">
          Create your profile, find your perfect immigration pathway, and take the first step toward your new life in Canada.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-primary-700 hover:bg-primary-50 w-full sm:w-auto"
            onClick={() => navigate('/questionnaire')}
          >
            Start Free Assessment
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-primary-700 w-full sm:w-auto"
            onClick={() => navigate('/profile')}
          >
            View My Profile
          </Button>
        </div>
      </div>
    </section>
  );
}