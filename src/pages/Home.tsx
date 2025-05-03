import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import NewsSection from '../components/home/NewsSection';
import PathwayCard from '../components/home/PathwayCard';
import FeaturesSection from '../components/home/FeaturesSection';
import ProvincialSection from '../components/home/ProvincialSection';
import TestimonialSection from '../components/home/TestimonialSection';
import CtaSection from '../components/home/CtaSection';
import { getGeneralNews, getProvincialNews } from '../data/dummyNews';
import useAuthStore from '../store/authStore';
import { useUserStore } from '../store/userStore';
import { MessagePopup } from '../components/ui/MessagePopup';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadinSpinner';
export default function Home() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { userProfile } = useUserStore();
  const generalNews = getGeneralNews();
  const provincialNews = getProvincialNews();
  const navigate = useNavigate();
  // If still loading auth state, you could show a loading spinner here
  if (isLoading) {
    return (
      <LoadingSpinner fullScreen={true} size='large' />
    );
  }

  return (
    <Layout>
      {/* Hero section remains at the top for immediate impact */}
      <HeroSection />

      {/* Latest News component first as requested */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsSection
            title="Latest Immigration News"
            subtitle="Stay informed about the latest updates and changes in Canadian immigration"
            news={generalNews}
            viewAllLink="/news"
          />
        </div>
      </div>

      {/* Recent Draws and Pathway Card side by side with equal height */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Find Your Pathway */}
            <div className="h-full flex flex-col justify-center">
              <div className="flex bg-white rounded-lg items-center justify-center shadow-xl border border-secondary-100 p-6 h-full">
                <PathwayCard
                  isAuthenticated={isAuthenticated}
                  isProfileComplete={userProfile?.isComplete || false}
                />
              </div>
            </div>

            {/* Recent Draw Results */}
            <div className="h-full flex flex-col shadow-xl border border-secondary-100">
              <div className="flex-grow bg-secondary-50 rounded-lg p-6 border border-secondary-100 h-full">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Recent Draws</h3>
                <p className="text-secondary-700 mb-4">
                  Latest invitation rounds for Canada's immigration programs.
                </p>
                <div className="space-y-4">
                  <div className="border-b border-secondary-200 pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex flex-col">
                        <div className="font-medium text-secondary-800">Express Entry</div>
                        <p className="text-secondary-600">Healthcare And Social Services Occupations</p>
                      </div>
                      <div className="text-sm text-secondary-500">May 02, 2025</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-secondary-600">500 invitations</div>
                      <div className="text-sm font-medium bg-secondary-100 text-secondary-800 px-2 py-1 rounded">CRS: 510</div>
                    </div>
                  </div>

                  <div className="border-b border-secondary-200 pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex flex-col">
                        <div className="font-medium text-secondary-800">Manitoba PNP</div>
                        <p className="text-secondary-600">Skilled Workers Overseas</p>
                      </div>
                      <div className="text-sm text-secondary-500">May 01, 2025</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-secondary-600">26 invitations</div>
                      <div className="text-sm font-medium bg-secondary-100 text-secondary-800 px-2 py-1 rounded">Score: 727</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex flex-col">
                        <div className="font-medium text-secondary-800">Express Entry</div>
                        <p className="text-secondary-600">Education Occupations</p>
                      </div>
                      <div className="text-sm text-secondary-500">May 01, 2025</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-secondary-600">1,000 invitations</div>
                      <div className="text-sm font-medium bg-secondary-100 text-secondary-800 px-2 py-1 rounded">CRS: 479</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Provincial News */}
      <ProvincialSection provincialNews={provincialNews} />

      {/* Provincial section links */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturesSection />
        </div>
      </div>

      {/* Testimonial Section */}
      <TestimonialSection />

      {/* Call to action remains at the bottom to drive conversion */}
      {/* <CtaSection isAuthenticated={isAuthenticated} isProfileComplete={userProfile?.isComplete || false} /> */}
      <MessagePopup
        isOpen={useAuthStore.getState().isPopupOpen}
        onClose={() => useAuthStore.getState().setIsPopupOpen(false)}
        title="Profile Incomplete"
        message="Please complete your profile to access this page."
        type="warning"
        actionText="Go to Profile"
        onAction={() => {
          useAuthStore.getState().setIsPopupOpen(false);
          navigate('/profile');
        }}
        cancelText="Close"
        maxWidth="2xl"
        benefits={benefits}
        illustration={
          <div className="flex items-center justify-center flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Steps to complete your profile</h2>
            <ul className="list-disc list-inside">
              <li>Go to Profile</li>
              <li>Complete each section of the questionnaire</li>
              <li>DO not forget to save your progress</li>
              <li>Get your report</li>
            </ul>
          </div>
        }
      />  
    </Layout>
  );  
}
const benefits = [
  {
    text: "Personalized immigration pathways tailored to your qualifications",
    icon: <CheckCircle className="h-5 w-5" />
  },
  {
    text: "Detailed eligibility assessment for all Canadian immigration programs",
    icon: <CheckCircle className="h-5 w-5" />
  },
  {
    text: "Step-by-step guidance on document requirements and application process",
    icon: <CheckCircle className="h-5 w-5" />
  },
  {
    text: "Real-time updates when your eligibility changes for any program",
    icon: <CheckCircle className="h-5 w-5" />
  }
];