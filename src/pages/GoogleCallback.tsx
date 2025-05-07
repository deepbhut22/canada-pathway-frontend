import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadinSpinner";
import useAuthStore from "../store/authStore";
import { useUserStore } from "../store/userStore";

// Auth callback handler component
export default function GoogleCallback() {
    const navigate = useNavigate();
    const { token: paramToken } = useParams();
    const location = useLocation();

    useEffect(() => {
        const processToken = async (token: string) => {
            try {
                // Store token in localStorage
                localStorage.setItem('canda-pathway-auth-token', token);
                
                // Initialize auth state
                await useAuthStore.getState().initializeAuth();
                
                // Redirect to dashboard or home page
                navigate('/');
            } catch (error) {
                console.error('Error processing Google auth:', error);
                navigate('/login');
            }
        };

        // Get token from URL params or search params
        const token = paramToken || new URLSearchParams(location.search).get('token');
        
        if (token) {
            processToken(token);
        } else {
            navigate('/login');
        }
    }, [navigate, paramToken, location]);

    return <LoadingSpinner message="Processing login..." size="large" fullScreen={true} />;
}