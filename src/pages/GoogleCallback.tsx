import { useEffect } from "react";
import LoadingSpinner from "../components/ui/LoadinSpinner";

// Auth callback handler component
export default function GoogleCallback() {

    useEffect(() => {
        // Get token from URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            // Store token in localStorage or your auth state management
            localStorage.setItem('canda-pathway-auth-token', token);

            // Redirect to dashboard or home page
            window.location.href = '/';
        }
    }, []);

    return <LoadingSpinner message="Processing login..." size="large" fullScreen={true} />;
};