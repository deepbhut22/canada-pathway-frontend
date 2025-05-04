import { create } from 'zustand';
import type { User, AuthState, UserProfile } from '../types';
import { useUserStore } from './userStore';

import api from '../utils/axios';

// Helper function to check if the user profile is complete
// const isProfileComplete = (profile: UserProfile): boolean => {
//   const {
//     basicInfo,
//     educationInfo,
//     workInfo,
//     languageInfo,
//     spouseInfo,
//     dependentInfo,
//     connectionInfo,
//     jobOfferInfo
//   } = profile;

//   // Check basic info completeness
//   const basicComplete = !!(
//     basicInfo.fullName &&
//     basicInfo.email &&
//     basicInfo.citizenCountry &&
//     basicInfo.residenceCountry &&
//     basicInfo.availableFunds !== null &&
//     typeof basicInfo.admissibilityIssue === 'boolean' &&
//     typeof basicInfo.residencyIntent === 'boolean'
//   );

//   // Education checks
//   const educationComplete =
//     (educationInfo.hasHighSchool === true || educationInfo.hasHighSchool === false) &&
//     (educationInfo.hasPostSecondary === true || educationInfo.hasPostSecondary === false) &&
//     (!educationInfo.hasPostSecondary ||
//       (educationInfo.hasPostSecondary && educationInfo.educationList.length > 0));

//   // Work experience checks
//   const workComplete =
//     (workInfo.hasWorkExperience === true || workInfo.hasWorkExperience === false) &&
//     (!workInfo.hasWorkExperience ||
//       (workInfo.hasWorkExperience && workInfo.workExperienceList.length > 0));

//   // Language checks
//   const languageComplete =
//     !!languageInfo.primaryLanguage &&
//     (languageInfo.hasTakenTest === true || languageInfo.hasTakenTest === false) &&
//     (!languageInfo.hasTakenTest ||
//       (languageInfo.hasTakenTest &&
//         languageInfo.primaryLanguageTest.type &&
//         languageInfo.primaryLanguageTest.testDate)) &&
//     (languageInfo.hasSecondLanguage === true || languageInfo.hasSecondLanguage === false) &&
//     (!languageInfo.hasSecondLanguage ||
//       (languageInfo.hasSecondLanguage &&
//         languageInfo.secondLanguageTest.type &&
//         languageInfo.secondLanguageTest.testDate));

//   // Spouse checks
//   const spouseComplete =
//     !!spouseInfo.maritalStatus &&
//     (spouseInfo.maritalStatus !== 'married' ||
//       (typeof spouseInfo.hasCanadianWorkExp === 'boolean' &&
//         typeof spouseInfo.hasCanadianStudyExp === 'boolean' &&
//         typeof spouseInfo.hasRelativeInCanada === 'boolean' &&
//         !!spouseInfo.educationLevel));

//   // Dependent checks
//   const dependentComplete =
//     (dependentInfo.hasDependents === true || dependentInfo.hasDependents === false) &&
//     (!dependentInfo.hasDependents ||
//       (dependentInfo.hasDependents && dependentInfo.dependentList.length > 0));

//   // Connection checks
//   const connectionComplete =
//     (connectionInfo.hasConnections === true || connectionInfo.hasConnections === false) &&
//     (!connectionInfo.hasConnections ||
//       (connectionInfo.hasConnections && connectionInfo.connectionList.length > 0));

//   // Job offer checks
//   const jobOfferComplete =
//     (jobOfferInfo.hasJobOffer === true || jobOfferInfo.hasJobOffer === false) &&
//     (!jobOfferInfo.hasJobOffer ||
//       (jobOfferInfo.hasJobOffer &&
//         jobOfferInfo.jobOffer.jobTitle &&
//         jobOfferInfo.jobOffer.nocCode &&
//         typeof jobOfferInfo.jobOffer.isPaid === 'boolean' &&
//         jobOfferInfo.jobOffer.hoursPerWeek !== null &&
//         jobOfferInfo.jobOffer.province &&
//         typeof jobOfferInfo.jobOffer.isLMIA === 'boolean' &&
//         jobOfferInfo.jobOffer.startDate &&
//         typeof jobOfferInfo.jobOffer.hasEndDate === 'boolean' &&
//         (!jobOfferInfo.jobOffer.hasEndDate || jobOfferInfo.jobOffer.endDate)));

//   return (
//     basicComplete &&
//     educationComplete &&
//     workComplete &&
//     languageComplete &&
//     spouseComplete &&
//     dependentComplete &&
//     connectionComplete &&
//     jobOfferComplete
//   );
// };

// Helper function to check if the user profile is complete
const isProfileComplete = (profile: UserProfile): boolean => {
  const {
    basicInfo,
    educationInfo,
    workInfo,
    languageInfo,
    spouseInfo,
    dependentInfo,
    connectionInfo,
    jobOfferInfo
  } = profile;

  // Check basic info completeness
  const basicComplete: boolean = !!(
    basicInfo.fullName &&
    basicInfo.email &&
    basicInfo.citizenCountry &&
    basicInfo.residenceCountry
  );

  // Education checks
  const educationComplete: boolean = !!(
    (typeof educationInfo.hasHighSchool === 'boolean') &&
    (typeof educationInfo.hasPostSecondary === 'boolean') && 
    (educationInfo.hasPostSecondary && educationInfo.educationList.length > 0)
  );

  // Work experience checks
  const workComplete: boolean = !!(
    (typeof workInfo.hasWorkExperience === 'boolean') &&
    (!workInfo.hasWorkExperience ||
      (workInfo.hasWorkExperience && workInfo.workExperienceList.length > 0))
  );

  // Language checks
  const languageComplete: boolean = !!(
    languageInfo.primaryLanguage &&
    (typeof languageInfo.hasTakenTest === 'boolean') &&
    (!languageInfo.hasTakenTest ||
      (languageInfo.hasTakenTest &&
        languageInfo.primaryLanguageTest.type)) &&
    (typeof languageInfo.hasSecondLanguage === 'boolean') &&
    (!languageInfo.hasSecondLanguage ||
      (languageInfo.hasSecondLanguage &&
        languageInfo.secondLanguageTest.type))
  );

  // Spouse checks
  const spouseComplete: boolean = !!(
    spouseInfo.maritalStatus &&
    (spouseInfo.maritalStatus !== 'married' ||
      (typeof spouseInfo.hasCanadianWorkExp === 'boolean' &&
        typeof spouseInfo.hasCanadianStudyExp === 'boolean' &&
        typeof spouseInfo.hasRelativeInCanada === 'boolean' &&
        spouseInfo.educationLevel))
  );

  // Dependent checks
  const dependentComplete: boolean = !!(
    (typeof dependentInfo.hasDependents === 'boolean') &&
    (!dependentInfo.hasDependents ||
      (dependentInfo.hasDependents && dependentInfo.dependentList.length > 0))
  );

  // Connection checks
  const connectionComplete: boolean = !!(
    (typeof connectionInfo?.doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident === 'boolean')
  );

  // Job offer checks
  const jobOfferComplete: boolean = !!(
    (typeof jobOfferInfo.hasJobOffer === 'boolean') &&
    (!jobOfferInfo.hasJobOffer ||
      (jobOfferInfo.hasJobOffer &&
        jobOfferInfo.jobOffer.jobTitle &&
        jobOfferInfo.jobOffer.nocCode &&
        // typeof jobOfferInfo.jobOffer.isPaid === 'boolean' &&
        // jobOfferInfo.jobOffer.hoursPerWeek !== null &&
        jobOfferInfo.jobOffer.province &&
        // typeof jobOfferInfo.jobOffer.isLMIA === 'boolean' &&
        jobOfferInfo.jobOffer.startDate
        // typeof jobOfferInfo.jobOffer.hasEndDate === 'boolean' &&
        // (!jobOfferInfo.jobOffer.hasEndDate || jobOfferInfo.jobOffer.endDate)
      ))
  );

  return !!(
    basicComplete &&
    educationComplete &&
    workComplete &&
    languageComplete &&
    spouseComplete &&
    dependentComplete &&
    connectionComplete &&
    jobOfferComplete
  );
};

const useAuthStore = create<AuthState & {
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
  setIsPopupOpen: (isPopupOpen: boolean) => void;
}>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  isPopupOpen: false,

  setIsPopupOpen: (isPopupOpen: boolean) => set({ isPopupOpen: isPopupOpen }),

  initializeAuth: async () => {
    set({ isLoading: true });

    const token = localStorage.getItem('canda-pathway-auth-token');
    if (token) {
      try {
        const response = await api.get('/auth/profile');
        if (response.status === 200) {
          set({
            user: response.data.user,
            isAuthenticated: true,
          });

          useUserStore.getState().resetUserProfile();

          // Check if profile is complete and set the isComplete flag
          const userProfile = response.data.userProfile;
          const profileComplete = isProfileComplete(userProfile);
          // userProfile.isComplete = profileComplete;
          userProfile.isComplete = true;

          useUserStore.setState({ userProfile });
          set({ isLoading: false });
        } else {
          localStorage.removeItem('canda-pathway-auth-token');
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } catch (error) {
        localStorage.removeItem('canda-pathway-auth-token');
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } else {
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        set({ user: response.data, isAuthenticated: true, isLoading: false });
        localStorage.setItem('canda-pathway-auth-token', response.data.token);

        const profileResponse = await api.get('/auth/profile');

        useUserStore.getState().resetUserProfile();

        // Check if profile is complete and set the isComplete flag
        const userProfile = profileResponse.data.userProfile;
        const profileComplete = isProfileComplete(userProfile);
        userProfile.isComplete = profileComplete;

        useUserStore.setState({ userProfile });

        return true;
      } else {
        return false;
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return false;
    }
  },

  register: async (email: string, password: string, firstName: string, lastName: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/register', {
        email,
        firstName,
        lastName,
        password,
      });

      if (response.status === 201) {
        set({ user: response.data, isAuthenticated: true, isLoading: false });
        localStorage.setItem('canda-pathway-auth-token', response.data.token);
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/google');
      
      if (response.status === 200) {
        set({ user: response.data, isAuthenticated: true, isLoading: false });
        localStorage.setItem('canda-pathway-auth-token', response.data.token);

        const profileResponse = await api.get('/auth/profile');

        useUserStore.getState().resetUserProfile();

        // Check if profile is complete and set the isComplete flag
        const userProfile = profileResponse.data.userProfile;
        const profileComplete = isProfileComplete(userProfile);
        userProfile.isComplete = profileComplete;

        useUserStore.setState({ userProfile });
      } else {
        throw new Error('Google login failed');
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('canda-pathway-auth-token');
    set({ user: null, isAuthenticated: false, error: null });
    useUserStore.getState().resetUserProfile();
  }
}));

export default useAuthStore;