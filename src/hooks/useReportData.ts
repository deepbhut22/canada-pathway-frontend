import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { useExpressEntryStore, usePNPStore, useRecommendationStore } from '../store/reports';
import useAuthStore from '../store/authStore';
import api from '../utils/axios';

export const useReportData = (regenerateReport: boolean, setRegenerateReport: (value: boolean) => void) => {
  const { userProfile } = useUserStore();
  const { user } = useAuthStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (userProfile.isComplete && user?._id) {
        try {
          const response = await api.get(`/report/${regenerateReport ? 'regenerate' : 'generate'}/${user._id}`);
          if (response.status === 400) {
            setIsLoading(false);
            setError(response.data.error);
            return;
          }
  
          useExpressEntryStore.getState().setExpressEntryData(response.data.expressEntry);
          usePNPStore.getState().setPNPData(response.data.pnp);
          useRecommendationStore.getState().setRecommendations(response.data.recommendations.result);
          usePNPStore.getState().setEligiblePrograms(response.data.pnp.pnpAssessment);
  
          if (regenerateReport) {
            setRegenerateReport(false);
          }
          
          setIsLoading(false);
          setError('');
          
        } catch (error: any) {
          setIsLoading(false);
          setError(error.response.data.error);
        }
      }
    };

    fetchData();
  }, [userProfile.isComplete, user?._id, regenerateReport]);

  return { 
    isLoading: isLoading,
    error: error !== '' ? error : null,
    setError: setError
  };
}; 