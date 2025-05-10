import { create } from 'zustand';
import api from '../../utils/axios';

// Types for PNP Report
interface PNPAssessment {
  province: string;
  stream_name: string;
  status: string;
  reason: string;
}

interface Suggestion {
  action: string;
  reason: string;
}

interface PNPReport {
  pnpAssessment: PNPAssessment[];
  suggestions: Suggestion[];
}

interface PNPState {
  report: PNPReport | null;
  isLoading: boolean;
  error: string | null;
  eligiblePrograms: PNPAssessment[] | null;
  updateReport: (report: PNPReport) => void;
  updateAssessment: (assessment: PNPAssessment[]) => void;
  updateSuggestions: (suggestions: Suggestion[]) => void;
  fetchReportData: (userId: string) => Promise<void>;
  setEligiblePrograms: (programs: PNPAssessment[]) => void;
  setPNPData: (data: PNPReport) => void;
  reset: () => void;
}

const usePNPStore = create<PNPState>((set) => ({
  report: null,
  eligiblePrograms: null,
  isLoading: false,
  error: null,

  updateReport: (report) => set({ report }),

  updateAssessment: (assessment) => set((state) => ({
    report: state.report
      ? { ...state.report, pnpAssessment: assessment }
      : null
  })),

  updateSuggestions: (suggestions) => set((state) => ({
    report: state.report
      ? { ...state.report, suggestions }
      : null
  })),

  setPNPData: (data: PNPReport) => set({ report: data }),

  setEligiblePrograms: (programs: PNPAssessment[]) => set({ eligiblePrograms: programs.filter((program: PNPAssessment) => program.status === 'Eligible' || program.status === 'Partially Eligible') }),

  fetchReportData: async (userId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/report/pnp/${userId}`);
      // console.log('PNP Response:', response);
      if (response.status === 200) {
        set({ 
          report: response.data, 
          isLoading: false,
          eligiblePrograms: response.data.pnpAssessment.filter((program: PNPAssessment) => program.status === 'Eligible' || program.status === 'Partially Eligible')
        });
      } else {
        set({ error: 'Failed to fetch PNP report data', isLoading: false });
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  reset: () => set({ report: null, isLoading: false, error: null })
}));

export default usePNPStore; 