import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useExpressEntryStore, usePNPStore, useRecommendationStore } from '../store/reports';
import useAuthStore from '../store/authStore';

export const useReportData = () => {
  const { userProfile } = useUserStore();
  const { user } = useAuthStore();
  
  const { 
    fetchReportData: fetchExpressEntryData, 
    isLoading: isExpressEntryLoading, 
    error: expressEntryError 
  } = useExpressEntryStore();
  
  const { 
    fetchReportData: fetchPNPData, 
    isLoading: isPNPLoading, 
    error: pnpError 
  } = usePNPStore();

  const {
    fetchRecommendations: fetchExpressEntryRecommendations,
    isLoading: isExpressEntryRecommendationsLoading,
    error: expressEntryRecommendationsError
  } = useRecommendationStore();

  useEffect(() => {
    const fetchData = async () => {
      if (userProfile.isComplete && user?._id) {
        await Promise.all([
          fetchExpressEntryData(user._id),
          fetchPNPData(user._id),
          fetchExpressEntryRecommendations(user._id)
        ]);
      }
    };

    fetchData();
  }, [userProfile.isComplete, user?._id, fetchExpressEntryData, fetchPNPData, fetchExpressEntryRecommendations]);

  return { 
    isLoading: isExpressEntryLoading || isPNPLoading || isExpressEntryRecommendationsLoading,
    error: expressEntryError || pnpError || expressEntryRecommendationsError
  };
}; 