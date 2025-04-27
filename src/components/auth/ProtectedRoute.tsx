import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import LoadingSpinner from '../ui/LoadinSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const location = useLocation();

  // Show loading spinner while checking authentication status
  if (isLoading) {
    return <LoadingSpinner fullScreen size="large" message="Verifying access..." />;
  }

  // Only redirect if we've finished loading AND user is not authenticated
  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated, show the protected content
  return <>{children}</>;
}