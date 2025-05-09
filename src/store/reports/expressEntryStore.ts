import { create } from 'zustand';
import api from '../../utils/axios';

// Types for Express Entry Profile
interface CategoryEligibility {
  program: string;
  isEligible: boolean;
  reason: string;
}

interface EligibilityStatus {
  program: string;
  isEligible: boolean;
  reason: [string];
}

interface ScoreBreakdown {
  score: number;
  maximum: number;
  reason: string[];
}

interface ExpressEntryProfile {
  categoryBasedEligibility: CategoryEligibility[];
  eligibilityStatus: EligibilityStatus[];
  expressEntryProfile: {
    crsScore: number;
    scoreBreakdown: {
      additionalPoints: ScoreBreakdown;
      coreHumanCapital: ScoreBreakdown;
      skillTransferability: ScoreBreakdown;
      spouseFactors: ScoreBreakdown;
    };
  };
}

interface ExpressEntryState {
  profile: ExpressEntryProfile | null;
  isLoading: boolean;
  recommendations: ExpressEntryRecommendation[] | null;
  error: string | null;
  updateProfile: (profile: ExpressEntryProfile) => void;
  updateCategoryEligibility: (eligibility: CategoryEligibility[]) => void;
  updateEligibilityStatus: (status: EligibilityStatus[]) => void;
  updateScoreBreakdown: (breakdown: ExpressEntryProfile['expressEntryProfile']['scoreBreakdown']) => void;
  updateCRSScore: (score: number) => void;
  fetchReportData: (userId: string) => Promise<void>;
  fetchRecommendations: (userId: string) => Promise<void>;
  setExpressEntryData: (data: ExpressEntryProfile) => void;
  reset: () => void;
}

interface ExpressEntryRecommendation {
  question: string;
  answer: string;
  reason: string;
}

const useExpressEntryStore = create<ExpressEntryState>((set) => ({
  profile: null,
  recommendations: null,
  isLoading: false,
  error: null,

  updateProfile: (profile) => set({ profile }),

  updateCategoryEligibility: (eligibility) => set((state) => ({
    profile: state.profile
      ? { ...state.profile, categoryBasedEligibility: eligibility }
      : null
  })),

  updateEligibilityStatus: (status) => set((state) => ({
    profile: state.profile
      ? { ...state.profile, eligibilityStatus: status }
      : null
  })),

  updateScoreBreakdown: (breakdown) => set((state) => ({
    profile: state.profile
      ? { ...state.profile, scoreBreakdown: breakdown }
      : null
  })),

  updateCRSScore: (score) => set((state) => ({
    profile: state.profile
      ? { ...state.profile, crsScore: score }
      : null
  })),

  fetchReportData: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/report/express-entry/${userId}`);
      // console.log(response);
      if (response.status === 200) {
        set({ profile: response.data, isLoading: false });
        
      } else {
        set({ error: 'Failed to fetch report data', isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  setExpressEntryData: (data: ExpressEntryProfile) => set({ profile: data }),

  fetchRecommendations: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/report/recommendations/${userId}`);
      console.log(response);
      if (response.status === 200) {
        set({ recommendations: response.data, isLoading: false });
      } else {
        set({ error: 'Failed to fetch recommendations', isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  reset: () => set({ profile: null, isLoading: false, error: null })
}));

export default useExpressEntryStore; 