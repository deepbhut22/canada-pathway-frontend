import { useEffect, useState } from 'react';
import { useUserStore } from '../store/userStore';
import { useExpressEntryStore, usePNPStore, useRecommendationStore } from '../store/reports';
import useAuthStore from '../store/authStore';
import api from '../utils/axios';

export const useReportData = (regenerateReport: boolean, setRegenerateReport: (value: boolean) => void) => {
  const { userProfile } = useUserStore();
  const { user } = useAuthStore();
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (userProfile.isComplete && user?._id) {
        const response = await api.get(`/report/${regenerateReport ? 'regenerate' : 'generate'}/${user._id}`);

        useExpressEntryStore.getState().setExpressEntryData(response.data.expressEntry);
        usePNPStore.getState().setPNPData(response.data.pnp);
        useRecommendationStore.getState().setRecommendations(response.data.recommendations.result);
        usePNPStore.getState().setEligiblePrograms(response.data.pnp.pnpAssessment);

        if (regenerateReport) {
          setRegenerateReport(false);
        }
        
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userProfile.isComplete, user?._id, regenerateReport]);

  return { 
    isLoading: isLoading
    // error: expressEntryError || pnpError || expressEntryRecommendationsError
  };
}; 