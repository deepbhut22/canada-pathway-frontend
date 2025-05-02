// News Types
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  imageUrl: string;
  source: string;
  category: 'general' | 'provincial' | 'regional';
  province?: string;
  url?: string;
}

// User Profile Types
export interface BasicInfo {
  fullName: string;
  email: string;
  gender: 'male' | 'female' | 'other' | '';
  citizenCountry: string;
  residenceCountry: string;
  admissibilityIssue: boolean;
  residencyIntent: boolean;
  availableFunds: number | null;
}

export interface LanguageTest {
  type: 'IELTS' | 'CELPIP' | 'PTE' | 'TEF' | 'TCF' | '';
  testDate: string;
  readingScore: number | null;
  writingScore: number | null;
  speakingScore: number | null;
  listeningScore: number | null;
}

export interface LanguageInfo {
  primaryLanguage: 'english' | 'french' | '';
  hasTakenTest: boolean;
  primaryLanguageTest: LanguageTest;
  hasSecondLanguage: boolean;
  secondLanguageTest: LanguageTest;
}

export interface Education {
  id: string;
  type: '1 year program' | '2 year program' | '3 year program' | 'trade certificate' | 'bachelor' | 'masters' | 'phd' | '';
  country: string;
  fieldOfStudy: string;
  province?: string;
  startDate: string;
  inProgress: boolean;
  endDate: string;
}

export interface EducationInfo {
  hasHighSchool: boolean;
  hasPostSecondary: boolean;
  educationList: Education[];
}

export interface SpouseInfo {
  maritalStatus: 'married' | 'single' | '';
  hasCanadianWorkExp: boolean;
  hasCanadianStudyExp: boolean;
  hasRelativeInCanada: boolean;
  educationLevel: 'trade' | 'professional' | 'bachelor' | 'multiple' | 'certificate' | 'masters' | 'doctorate' | '';
}

export interface Dependent {
  id: string;
  age: number;
  citizenCountry: string;
  residenceCountry: string;
  residencyStatus: 'permanent residence' | 'work permit' | 'student permit' | 'citizen' | 'refugee' | '';
  relationship: string;
}

export interface DependentInfo {
  hasDependents: boolean;
  dependentList: Dependent[];
}

export interface Connection {
  id: string;
  relationship: 'child' | 'sibling' | 'parent' | 'grandparent' | 'in-law' | 'first cousin' | '';
  // dateOfBirth: string;
  residencyStatus: 'permanent residence' | 'work permit' | 'student permit' | 'citizen' | 'refugee' | '';
  province: string;
  residencyStartDate: string;
}

export interface ConnectionInfo {
  hasConnections: boolean;
  connectionList: Connection[];
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  isPaid: boolean;
  isSelfEmployed: boolean;
  hoursPerWeek: number | null;
  country: string;
  province?: string;
  workPermitType?: 'open' | 'closed' | 'refugee' | '';
  hasLMIA: boolean;
  nocCode: string;
  startDate: string;
  isCurrentJob: boolean;
  endDate: string;
}

export interface WorkInfo {
  hasWorkExperience: boolean;
  workExperienceList: WorkExperience[];
}

export interface JobOffer {
  jobTitle: string;
  nocCode: string;
  isPaid: boolean;
  hoursPerWeek: number | null;
  province: string;
  isLMIA: boolean;
  startDate: string;
  hasEndDate: boolean;
  endDate: string;
}

export interface JobOfferInfo {
  hasJobOffer: boolean;
  jobOffer: JobOffer;
}

export interface UserProfile {
  basicInfo: BasicInfo;
  languageInfo: LanguageInfo;
  educationInfo: EducationInfo;
  spouseInfo: SpouseInfo;
  dependentInfo: DependentInfo;
  connectionInfo: ConnectionInfo;
  workInfo: WorkInfo;
  jobOfferInfo: JobOfferInfo;
  isComplete: boolean;
}

export type Step = 'basic' | 'language' | 'education' | 'spouse' | 'dependent' | 'connection' | 'work' | 'joboffer';

export interface NavigationStep {
  id: Step;
  title: string;
  description: string;
}

// Auth Types
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileComplete: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isPopupOpen: boolean;
}