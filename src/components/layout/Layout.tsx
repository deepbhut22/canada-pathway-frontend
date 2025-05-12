import React from 'react';
import Header from './Header';
import Footer from './Footer';
import useAuthStore from '../../store/authStore';
import { MessagePopup } from '../ui/MessagePopup';
import { useNavigate } from 'react-router-dom';
interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = '' }: LayoutProps) {

  const isLoginRequiredPopupOpen = useAuthStore((state) => state.isLoginRequiredPopupOpen);
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
    </div>
  );
}