import React from 'react';
import Header from './Header';
import Footer from './Footer';
import useAuthStore from '../../store/authStore';
import { MessagePopup } from '../ui/MessagePopup';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = '' }: LayoutProps) {

  const isLoginRequiredPopupOpen = useAuthStore((state) => state.isLoginRequiredPopupOpen);
  const isPopupOpen = useAuthStore((state) => state.isPopupOpen);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-secondary-50">
      <Header />
      <main className={`flex-grow ${className}`}>{children}</main>
      <Footer />
      <MessagePopup
        isOpen={isLoginRequiredPopupOpen}
        onClose={() => useAuthStore.getState().setIsLoginRequiredPopupOpen(false)}
        title="Login Required"
        message="Please login to access this feature"
        type="warning"
        actionText="Redirect to Login"
        onAction={() => {
          useAuthStore.getState().setIsLoginRequiredPopupOpen(false);
          navigate('/login');
        }}
        cancelText="Not now"
      />
      <MessagePopup
        isOpen={isPopupOpen}
        onClose={() => useAuthStore.getState().setIsPopupOpen(false)}
        title="Profile Incomplete"
        message="Please complete your profile to access this page."
        type="warning"
        actionText="Complete My Profile (2 Mins)"
        onAction={() => {
          useAuthStore.getState().setIsPopupOpen(false);
          navigate('/profile');
        }}
        cancelText="Not now"
        maxWidth="2xl"
        benefits={benefits}
      />  
    </div>
  );
}

const benefits = [
  {
    text: (
      <p className="text-secondary-600">
        <span className="glow-text-secondary text-secondary-950 font-bold">Free</span> Personalized immigration pathways tailored to your qualifications
      </p>
    ),
    icon: <CheckCircle className="h-5 w-5" />
  },
  {
    text: (
      <p className="text-secondary-600">
        <span className="text-secondary-800 font-bold">Complementary</span> eligibility assessment for all Canadian immigration programs
      </p>
    ),
    icon: <CheckCircle className="h-5 w-5" />
  },
  {
    text: (
      <p className="text-secondary-600">
        <span className="text-secondary-800 font-bold">Real-time</span> updates when your eligibility changes for any program
      </p>
    ),
    icon: <CheckCircle className="h-5 w-5" />
  }
];
