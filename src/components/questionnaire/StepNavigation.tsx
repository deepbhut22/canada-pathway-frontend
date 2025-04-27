import { Link } from 'react-router-dom';
import { Check, ChevronRight } from 'lucide-react';
import { Step, UserProfile } from '../../types';
import { navigationSteps } from '../../utils/helpers';

interface StepNavigationProps {
  currentStep: Step;
  userProfile: UserProfile;
}

export default function StepNavigation({ currentStep, userProfile }: StepNavigationProps) {

  const isStepComplete = (stepId: Step): boolean => {
    switch (stepId) {
      case 'basic':
        return !!userProfile.basicInfo.fullName && !!userProfile.basicInfo.email;
      case 'language':
        return userProfile.languageInfo.primaryLanguage !== '';
      case 'education':
        return userProfile.educationInfo.hasHighSchool !== null;
      case 'spouse':
        return userProfile.spouseInfo.maritalStatus !== '';
      case 'dependent':
        return userProfile.dependentInfo.hasDependents !== null;
      case 'connection':
        return userProfile.connectionInfo.hasConnections !== null;
      case 'work':
        return userProfile.workInfo.hasWorkExperience !== null;
      case 'joboffer':
        return userProfile.jobOfferInfo.hasJobOffer !== null;
      default:
        return false;
    }
  };

  const isStepActive = (stepId: Step): boolean => {
    return currentStep === stepId;
  };

  return (
    <nav className="mb-8">
      <ol className="flex flex-col space-y-2">
        {navigationSteps.map((step, index) => {
          const stepComplete = isStepComplete(step.id);
          const stepActive = isStepActive(step.id);
          
          return (
            <li key={step.id} className="relative">
              <Link
                to={`/questionnaire/${step.id}`}
                className={`flex items-center p-3 rounded-md ${
                  stepActive
                    ? 'bg-primary-50 border border-primary-200'
                    : stepComplete
                    ? 'hover:bg-secondary-50'
                    : 'text-secondary-400 hover:bg-secondary-50'
                }`}
              >
                <div className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                  stepComplete
                    ? 'bg-primary-100 text-primary-600'
                    : stepActive
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-secondary-100 text-secondary-500'
                }`}>
                  {stepComplete ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <div className={`text-sm font-medium ${
                    stepActive || stepComplete
                      ? 'text-secondary-900'
                      : 'text-secondary-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className={`text-xs ${
                    stepActive
                      ? 'text-secondary-600'
                      : 'text-secondary-400'
                  }`}>
                    {step.description}
                  </div>
                </div>
                <ChevronRight className={`h-4 w-4 ${
                  stepActive ? 'text-primary-500' : 'text-secondary-400'
                }`} />
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}