import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import NewsSection from '../components/home/NewsSection';
import PathwayCard from '../components/home/PathwayCard';
import FeaturesSection from '../components/home/FeaturesSection';
import ProvincialSection from '../components/home/ProvincialSection';
import TestimonialSection from '../components/home/TestimonialSection';
// import CtaSection from '../components/home/CtaSection';
import { getGeneralNews, getProvincialNews } from '../data/dummyNews';
import useAuthStore from '../store/authStore';
import { useUserStore } from '../store/userStore';

import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadinSpinner';
import ChatBox from '../components/ui/ChatBox';
import { CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ExternalLink } from 'lucide-react';
import { ExpressEntryDrawsChart } from './Charts';
export default function Home() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { userProfile } = useUserStore();
  const generalNews = getGeneralNews();
  const provincialNews = getProvincialNews();
  const navigate = useNavigate();

  const [showChatBox, setShowChatBox] = useState(false);
  const isPopupOpen = useAuthStore((state) => state.isPopupOpen);
  const isLoginRequiredPopupOpen = useAuthStore((state) => state.isLoginRequiredPopupOpen);

  // If still loading auth state, you could show a loading spinner here
  if (isLoading) {
    return (
      <LoadingSpinner fullScreen={true} size='large' />
    );
  }

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // }, []);

  return (
    <Layout>
      {/* Hero section remains at the top for immediate impact */}
      <HeroSection />

      <ExpressEntryDrawsChart className='w-full border-none mt-0 pt-24 md:px-24' />

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
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Find Your Pathway */}
            <div className="h-full flex flex-col justify-center">
              <div className="flex bg-secondary-50 rounded-lg shadow-xl border border-secondary-100 h-full">
                <PathwayCard
                  isAuthenticated={isAuthenticated}
                  isProfileComplete={userProfile?.isComplete || false}
                  showChatBox={showChatBox}
                  setShowChatBox={setShowChatBox}
                />
              </div>
            </div>

            {/* Recent Draw Results */}
            <div className="h-full flex flex-col shadow-xl rounded-lg">
              <div className="flex-grow bg-secondary-50 rounded-lg p-6 border border-secondary-100 h-full">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Recent Draws</h3>
                <p className="text-secondary-700 mb-4">
                  Latest invitation rounds for Canada's immigration programs.
                </p>
                <div className="space-y-4">
                    <div
                      onClick={() => window.open("https://immigratemanitoba.com/2025/05/eoi-draw-244/", "_blank", "noopener,noreferrer")}
                      className="border-b border-secondary-200 pb-1 cursor-pointer hover:bg-secondary-200 transition-all duration-300 rounded-md hover:px-2 hover:py-1">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex flex-col">
                          <div className="font-medium text-secondary-800">Express Entry</div>
                          <p className="text-secondary-600">Canadian Experience Class</p>
                        </div>
                        <div className="text-sm text-secondary-500">May 13, 2025</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-secondary-600">500 invitations</div>
                        <div className="text-sm font-medium bg-secondary-100 text-secondary-800 px-2 py-1 rounded">CRS: 547</div>
                      </div>
                    </div>
                  <div
                    onClick={() => window.open("https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds/invitations.html?q=344", "_blank", "noopener,noreferrer")}
                    className="border-b border-secondary-200 pb-1 cursor-pointer hover:bg-secondary-200 transition-all duration-300 rounded-md hover:px-2 hover:py-1"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex flex-col">
                        <div className="font-medium text-secondary-800">Express Entry</div>
                        <p className="text-secondary-600">Provincial Nominee Program</p>
                      </div>
                      <div className="text-sm text-secondary-500">May 12, 2025</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-secondary-600">511 invitations</div>
                      <div className="text-sm font-medium bg-secondary-100 text-secondary-800 px-2 py-1 rounded">CRS: 706</div>
                    </div>
                  </div>

                  <div 
                    onClick={() => window.open("https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds/invitations.html?q=345", "_blank", "noopener,noreferrer")}
                    className="border-b border-secondary-200 pb-1 cursor-pointer hover:bg-secondary-200 transition-all duration-300 rounded-md hover:px-2 hover:py-1">
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
                  <div className='flex justify-between items-center'>
                    <p className='text-secondary-600'>View all draws</p>
                    <Link className='text-secondary-600 text-sm underline flex items-center gap-1' to="/immigration-statistics"><ExternalLink className='w-4 h-4' /> Private Draws</Link>
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
      <ChatBox
        isOpen={showChatBox}
        onClose={() => setShowChatBox(false)}
      />

    </Layout>
  );  
}
