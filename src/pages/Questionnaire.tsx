import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Step } from '../types';
import { getNextStep } from '../utils/helpers';
import { useUserStore } from '../store/userStore';
import Layout from '../components/layout/Layout';
import QuestionnaireLayout from '../components/questionnaire/QuestionnaireLayout';
import BasicInfo from '../components/questionnaire/steps/BasicInfo';
import Language from '../components/questionnaire/steps/Language';
import Education from '../components/questionnaire/steps/Education';
import Spouse from '../components/questionnaire/steps/Spouse';
import Dependent from '../components/questionnaire/steps/Dependent';
import Connection from '../components/questionnaire/steps/Connection';
import Work from '../components/questionnaire/steps/Work';
import JobOffer from '../components/questionnaire/steps/JobOffer';      

export default function Questionnaire() {
  const { step = 'basic' } = useParams<{ step?: string }>();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { setProfileComplete } = useUserStore();
  
  const currentStep = step as Step;
  
  const handleValidationChange = (valid: boolean) => {
    setIsValid(valid);
  };
  
  const handleNext = () => {
    setIsSubmitting(true);
    
    // Simulating saving to backend
    setTimeout(() => {
      const nextStep = getNextStep(currentStep);
      
      if (nextStep) {
        navigate(`/questionnaire/${nextStep}`);
      } else {
        // This is the last step, mark profile as complete and redirect to report
        setProfileComplete(true);
        navigate('/report');
      }
      
      setIsSubmitting(false);
    }, 500);
  };
  
  const handlePrevious = () => {
    const prevUrl = currentStep === 'basic' ? '/' : `/questionnaire/${getPrevStep()}`;
    navigate(prevUrl);
  };
  
  const handleSave = () => {
    // In a real app, this would save to backend
    alert('Progress saved successfully!');
  };
  
  const getPrevStep = (): string => {
    switch (currentStep) {
      case 'language':
        return 'basic';
      case 'education':
        return 'language';
      case 'spouse':
        return 'education';
      case 'dependent':
        return 'spouse';
      case 'connection':
        return 'dependent';
      case 'work':
        return 'connection';
      case 'joboffer':
        return 'work';
      default:
        return 'basic';
    }
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 'basic':
        return <BasicInfo onValidationChange={handleValidationChange} />;
      case 'language':
        return <Language onValidationChange={handleValidationChange} />;
      case 'education':
        return <Education onValidationChange={handleValidationChange} />;
      case 'spouse':
        return <Spouse onValidationChange={handleValidationChange} />;
      case 'dependent':
        return <Dependent onValidationChange={handleValidationChange} />;
      case 'connection':
        return <Connection onValidationChange={handleValidationChange} />;
      case 'work':
        return <Work onValidationChange={handleValidationChange} />;
      case 'joboffer':
        return <JobOffer onValidationChange={handleValidationChange} />;
      default:
        return <div>Invalid step</div>;
    }
  };
  
  return (
    <Layout>
      <QuestionnaireLayout
        currentStep={currentStep}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSave={handleSave}
      >
        {renderStepContent()}
      </QuestionnaireLayout>
    </Layout>
  );
}