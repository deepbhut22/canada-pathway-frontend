// News Types
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  imageUrl: string;
  source: string;
  category: 'general' | 'provincial' | 'regional' | 'immigration policy' | 'Express Entry' | 'Family Sponsorship' | 'Study' | 'Work';
  province?: string;
  url?: string;
}

// User Profile Types
export interface BasicInfo {
  fullName: string;
  email: string;
  mobileNumber?: string | '';
  gender: 'male' | 'female' | 'other' | '';
  age: number | null;
  citizenCountry: string;
  residenceCountry: string;
  province?: string;
}

export interface LanguageTest {
  type: 'IELTS' | 'CELPIP' | 'PTE' | 'TEF' | 'TCF' | '';
  clbScore: number | null;
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
  // startDate: string;
  inProgress: boolean;
  // endDate: string;
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
  // relationship: string;
}

export interface DependentInfo {
  hasDependents: boolean;
  dependentList: Dependent[];
}

// export interface Connection {
//   id: string;
//   relationship: 'child' | 'sibling' | 'parent' | 'grandparent' | 'in-law' | 'first cousin' | '';
//   // dateOfBirth: string;
//   residencyStatus: 'permanent residence' | 'work permit' | 'student permit' | 'citizen' | 'refugee' | '';
//   province: string;
//   residencyStartDate: string;
// }

export interface ConnectionInfo {
  doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident: boolean | '';
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  // isPaid: boolean;
  isSelfEmployed: boolean;
  // hoursPerWeek: number | null;
  country: string;
  province?: string;
  workPermitType?: 'open' | 'closed' | 'refugee' | '';
  // hasLMIA: boolean;
  nocCode: string;
  // startDate: string;
  isCurrentJob: boolean;
  // endDate: string;
  numberOfMonths: number;
  teer: Number
}

export interface WorkInfo {
  hasWorkExperience: boolean | '';
  workExperienceList: WorkExperience[];
}

export interface JobOffer {
  jobTitle: string;
  nocCode: string;
  // isPaid: boolean;
  // hoursPerWeek: number | null;
  province: string;
  // isLMIA: boolean;
  startDate: string;
  // hasEndDate: boolean;
  // endDate: string;
  teer: Number;
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
  isLoginRequiredPopupOpen: boolean;
  isConsultationDialogOpen: boolean;
}
// src/types.ts (or inline if preferred)
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}


export interface ConsultationFee {
  serviceName: string;
  cost: number;
  duration: string;
}

export interface Consultant {
  about: string;
  category: string;
  businessName: string;
  logoUrl: string;
  fullName: string;
  shortBio: string;
  officeAddress: string;
  serviceAreas: string[];
  city: string;
  membershipNumber: string;
  licenseStatus: string;
  licenseExpiry: string;
  phoneNumber: string;
  emailAddress: string;
  websiteUrl: string;
  contactPersonName: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  deliveryEmail: string;
  languagesSpoken: string[];
  starRating: number;
  testimonials: string[];
  areasOfExpertise: string[];
  totalNumberOfReviews: number;
  serviceStartsFrom: number;
  consultationFees: ConsultationFee[];
}

// — Supporting types for structured embeds —
export interface TableData {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface ImageData {
  src: string;               // image URL
  alt: string;               // alt text for accessibility & SEO
  caption?: string;
  position?: 'left' | 'center' | 'right';
}

export interface VideoData {
  url: string;               // embed URL or direct link
  type: 'youtube' | 'vimeo' | 'mp4';
  caption?: string;
}

// — Main blog post type —
export interface BlogPostNew {
  _id: string;                // renamed from _id for clarity
  slug: string;              // “how-to-immigrate-to-canada”
  title: string;
  author: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  thumbnailUrl: string;      // explicit URL field
  excerpt: string;           // short summary for listings
  content: string;           // markdown or HTML
  categories: string[];      // allow multiple
  tags?: string[] | '';           // for finer filtering
  tableData?: TableData[] | '';
  imageData?: ImageData[] | '';
  videoData?: VideoData[] | '';

  // publishing & workflow
  status: 'draft' | 'published' | 'archived';
  readingTime?: number;      // in minutes

  // timestamps
  createdAt: string;         // ISO date string
  updatedAt: string;         // ISO date string
  publishedAt?: string;      // ISO date string when status = published

  // SEO / social share
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    openGraphImageUrl?: string;
  };
}