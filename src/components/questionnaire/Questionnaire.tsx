import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Step } from '../../types/index';
import { getCurrentStepName, getNextStep } from '../../utils/helpers';
import { useUserStore } from '../../store/userStore';
import Layout from '../../components/layout/Layout';
import QuestionnaireLayout from '../../components/questionnaire/QuestionnaireLayout';
import BasicInfo from '../../components/questionnaire/steps/BasicInfo';
import Language from '../../components/questionnaire/steps/Language';
import Education from '../../components/questionnaire/steps/Education';
import Spouse from '../../components/questionnaire/steps/Spouse';
import Dependent from '../../components/questionnaire/steps/Dependent';
import Connection from '../../components/questionnaire/steps/Connection';
import Work from './steps/Work';
import JobOffer from './steps/JobOffer';
import api from '../../utils/axios';

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

  const handleNext = async () => {
    setIsSubmitting(true);

    try {
      // If you want to save the data before navigation, uncomment this
      await handleSave();
      
      const nextStep = getNextStep(currentStep);

      if (nextStep) {
        navigate(`/questionnaire/${nextStep}`);
      } else {
        // This is the last step, mark profile as complete and redirect to report
        setProfileComplete(true);
        navigate('/report');
      }
    } catch (error) {
      console.error('Error during navigation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    const prevStep = getPrevStep();
    const prevUrl = currentStep === 'basic' ? '/' : `/questionnaire/${prevStep}`;
    navigate(prevUrl);
  };

  const handleSave = async () => {    
    try {
      const currentStepData = getCurrentStepName(currentStep);
      const response = await api.put(`/profile/${currentStep}`, currentStepData);
      alert('Progress saved successfully!');
    } catch (error) {
      console.error('Error saving progress:', error);
      alert('Error saving progress!');
    }
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