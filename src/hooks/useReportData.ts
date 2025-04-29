import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useExpressEntryStore, usePNPStore } from '../store/reports';
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

  useEffect(() => {
    const fetchData = async () => {
      if (userProfile.isComplete && user?._id) {
        await Promise.all([
          fetchExpressEntryData(user._id),
          fetchPNPData(user._id)
        ]);
      }
    };

    fetchData();
  }, [userProfile.isComplete, user?._id, fetchExpressEntryData, fetchPNPData]);

  return { 
    isLoading: isExpressEntryLoading || isPNPLoading,
    error: expressEntryError || pnpError
  };
}; 