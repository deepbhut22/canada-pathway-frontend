import { create } from 'zustand';
import type { AuthState, UserProfile } from '../types';
import { useUserStore } from './userStore';
import api from '../utils/axios';

// Helper function to check if the user profile is complete
export const isProfileComplete = (profile: UserProfile): boolean => {
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
    (!educationInfo.hasPostSecondary || (educationInfo.hasPostSecondary && educationInfo.educationList.length > 0))
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
        languageInfo.primaryLanguageTest.type &&
        languageInfo.primaryLanguageTest.clbScore)) &&
    (typeof languageInfo.hasSecondLanguage === 'boolean') &&
    (!languageInfo.hasSecondLanguage ||
      (languageInfo.hasSecondLanguage &&
        languageInfo.secondLanguageTest.type &&
        languageInfo.secondLanguageTest.clbScore))
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
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
  setIsPopupOpen: (isPopupOpen: boolean) => void;
  setIsLoginRequiredPopupOpen: (isLoginRequiredPopupOpen: boolean) => void;
  setIsConsultationDialogOpen: (isConsultationDialogOpen: boolean) => void;
}>((set) => ({
  user: null,
  isAuthenticated: false, // make is false for production
  isLoading: true,
  error: null,
  isPopupOpen: false,
  isLoginRequiredPopupOpen: false,
  isConsultationDialogOpen: false,
  setIsPopupOpen: (isPopupOpen: boolean) => set({ isPopupOpen: isPopupOpen }),
  setIsConsultationDialogOpen: (isConsultationDialogOpen: boolean) => set({ isConsultationDialogOpen: isConsultationDialogOpen }),
  setIsLoginRequiredPopupOpen: (isLoginRequiredPopupOpen: boolean) => set({ isLoginRequiredPopupOpen: isLoginRequiredPopupOpen }),  
  initializeAuth: async () => {
    set({ isLoading: true });

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
          userProfile.isComplete = profileComplete;
          // userProfile.isComplete = true;

          useUserStore.setState({ userProfile });
          set({ isLoading: false });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } catch (error) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
  },

  login: async (email: string, password: string): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.status === 200) {
        set({ user: response.data, isAuthenticated: true, isLoading: true });

        const profileResponse = await api.get('/auth/profile');
        useUserStore.getState().resetUserProfile();

        const userProfile = profileResponse.data.userProfile;
        const profileComplete = isProfileComplete(userProfile);
        userProfile.isComplete = profileComplete;
        set({ user: profileResponse.data.user, isAuthenticated: true, isLoading: false });
        useUserStore.setState({ userProfile });
        return true;  
      }
      // If response status is not 200
      set({ isLoading: false });
      return false;

    } catch (error: any) {
      console.log("Login error:", error);
      set({ isLoading: false });

      // Return the error message to be handled by the component
      if (error.response) {
        return Promise.reject(error.response.data.message || "Login failed");
      }
      return Promise.reject(error.message || "Login failed");
    }
  },

  register: async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/register', {
        email,
        firstName,
        lastName,
        password,
      });

      if (response.status === 201) {
        set({ user: response.data, isAuthenticated: true, isLoading: true });

        const profileResponse = await api.get('/auth/profile');
        useUserStore.getState().resetUserProfile();

        const userProfile = profileResponse.data.userProfile;
        const profileComplete = isProfileComplete(userProfile);
        userProfile.isComplete = profileComplete;
        set({ user: profileResponse.data.user, isAuthenticated: true, isLoading: false });
        useUserStore.setState({ userProfile });
        return true; 
      } else if (response.status === 400) {
        set({ isLoading: false, error: "Email already exists" });
        return false;
      } else {
        set({ isLoading: false });
        return false;
      }

    } catch (error) {
      console.log("Register error:", error);
      set({ error: (error as Error).message, isLoading: false });
      return false;
    }
  },

  loginWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/google');
      
      if (response.status === 200) {
        set({ user: response.data, isAuthenticated: true, isLoading: true });

        const profileResponse = await api.get('/auth/profile');

        useUserStore.getState().resetUserProfile();

        // Check if profile is complete and set the isComplete flag
        const userProfile = profileResponse.data.userProfile;
        const profileComplete = isProfileComplete(userProfile);
        userProfile.isComplete = profileComplete;
        set({ user: profileResponse.data.user, isAuthenticated: true, isLoading: false });
        useUserStore.setState({ userProfile });
      } else {
        throw new Error('Google login failed');
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    const res = await api.get('/auth/logout');
    if (res.status === 200) {
      set({ user: null, isAuthenticated: false, error: null });
      useUserStore.getState().resetUserProfile();
    } else {
      throw new Error('Logout failed');
    }  
  }
}));

export default useAuthStore;