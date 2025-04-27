import { Step, NavigationStep } from '../types';
import { useUserStore } from '../store/userStore';

export const navigationSteps: NavigationStep[] = [
  { id: 'basic', title: 'Basic Information', description: 'Personal details and background' },
  { id: 'language', title: 'Language Proficiency', description: 'English and French language skills' },
  { id: 'education', title: 'Education', description: 'Academic qualifications and history' },
  { id: 'spouse', title: 'Spouse Information', description: 'Details about your spouse or partner' },
  { id: 'dependent', title: 'Dependents', description: 'Information about your dependent children' },
  { id: 'connection', title: 'Canadian Connections', description: 'Family members in Canada' },
  { id: 'work', title: 'Work Experience', description: 'Your employment history' },
  { id: 'joboffer', title: 'Job Offer', description: 'Details about any Canadian job offers' }
];

export const getStepIndex = (currentStep: Step): number => {
  return navigationSteps.findIndex(step => step.id === currentStep);
};

export const getNextStep = (currentStep: Step): Step | null => {
  const currentIndex = getStepIndex(currentStep);
  if (currentIndex < navigationSteps.length - 1) {
    return navigationSteps[currentIndex + 1].id;
  }
  return null;
};

export const getPreviousStep = (currentStep: Step): Step | null => {
  const currentIndex = getStepIndex(currentStep);
  if (currentIndex > 0) {
    return navigationSteps[currentIndex - 1].id;
  }
  return null;
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export const getProvinceOptions = () => [
  { value: 'alberta', label: 'Alberta' },
  { value: 'british_columbia', label: 'British Columbia' },
  { value: 'manitoba', label: 'Manitoba' },
  { value: 'new_brunswick', label: 'New Brunswick' },
  { value: 'newfoundland', label: 'Newfoundland and Labrador' },
  { value: 'nova_scotia', label: 'Nova Scotia' },
  { value: 'ontario', label: 'Ontario' },
  { value: 'pei', label: 'Prince Edward Island' },
  { value: 'quebec', label: 'Quebec' },
  { value: 'saskatchewan', label: 'Saskatchewan' }
];

export const getCurrentStepName = (step: Step) => {
  switch (step) {
    case 'basic':
      return useUserStore.getState().userProfile.basicInfo;
    case 'language':
      return useUserStore.getState().userProfile.languageInfo;
    case 'education':
      return useUserStore.getState().userProfile.educationInfo;
    case 'spouse':
      return useUserStore.getState().userProfile.spouseInfo;
    case 'dependent':
      return useUserStore.getState().userProfile.dependentInfo;
    case 'connection':
      return useUserStore.getState().userProfile.connectionInfo;
    case 'work':
      return useUserStore.getState().userProfile.workInfo;
    case 'joboffer':
      return useUserStore.getState().userProfile.jobOfferInfo;
  }
};