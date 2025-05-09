import { create } from 'zustand';
import api from '../../utils/axios';

interface ExpressEntryRecommendation {
    question: string;
    answer: string;
    reason: string;
}

interface RecommendationState {
    recommendations: ExpressEntryRecommendation[] | null;
    isLoading: boolean;
    error: string | null;
    fetchRecommendations: (userId: string) => Promise<void>;
    setRecommendations: (recommendations: ExpressEntryRecommendation[]) => void;
}

const useRecommendationStore = create<RecommendationState>((set) => ({
    recommendations: null,
    isLoading: false,
    error: null,
    fetchRecommendations: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.get(`/report/recommendations/${userId}`);
            // console.log(response);
            if (response.status === 200) {
                set({ recommendations: response.data.result, isLoading: false });
            } else {
                set({ error: 'Failed to fetch recommendations', isLoading: false });
            }
            
        } catch (error) {
            set({ error: (error as Error).message, isLoading: false });
        }
    },
    setRecommendations: (recommendations: ExpressEntryRecommendation[]) => set({ recommendations })
}));

export default useRecommendationStore;
