import { create } from 'zustand';

// Types for Express Entry Profile
interface CategoryEligibility {
  program: string;
  isEligible: boolean;
  details: string;
}

interface EligibilityStatus {
  program: string;
  isEligible: boolean;
  details: string;
}

interface ScoreBreakdown {
  score: number;
  maximum: number;
  reason: string;
}

interface ExpressEntryProfile {
  categoryBasedEligibility: CategoryEligibility[];
  crsScore: number;
  eligibilityStatus: EligibilityStatus[];
  scoreBreakdown: {
    additionalPoints: ScoreBreakdown;
    coreHumanCapital: ScoreBreakdown;
    skillTransferability: ScoreBreakdown;
    spouseFactors: ScoreBreakdown;
  };
}

interface ReportState {
  expressEntryProfile: ExpressEntryProfile | null;
  updateExpressEntryProfile: (profile: ExpressEntryProfile) => void;
  updateCategoryEligibility: (eligibility: CategoryEligibility[]) => void;
  updateEligibilityStatus: (status: EligibilityStatus[]) => void;
  updateScoreBreakdown: (breakdown: ExpressEntryProfile['scoreBreakdown']) => void;
  updateCRSScore: (score: number) => void;
  resetExpressEntryProfile: () => void;
}

const useReportStore = create<ReportState>((set) => ({
  expressEntryProfile: null,

  updateExpressEntryProfile: (profile) => set({ expressEntryProfile: profile }),

  updateCategoryEligibility: (eligibility) => set((state) => ({
    expressEntryProfile: state.expressEntryProfile
      ? { ...state.expressEntryProfile, categoryBasedEligibility: eligibility }
      : null
  })),

  updateEligibilityStatus: (status) => set((state) => ({
    expressEntryProfile: state.expressEntryProfile
      ? { ...state.expressEntryProfile, eligibilityStatus: status }
      : null
  })),

  updateScoreBreakdown: (breakdown) => set((state) => ({
    expressEntryProfile: state.expressEntryProfile
      ? { ...state.expressEntryProfile, scoreBreakdown: breakdown }
      : null
  })),

  updateCRSScore: (score) => set((state) => ({
    expressEntryProfile: state.expressEntryProfile
      ? { ...state.expressEntryProfile, crsScore: score }
      : null
  })),

  resetExpressEntryProfile: () => set({ expressEntryProfile: null })
}));

export default useReportStore; 