import React from 'react';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/home/HeroSection';
import NewsSection from '../components/home/NewsSection';
import PathwayCard from '../components/home/PathwayCard';
import FeaturesSection from '../components/home/FeaturesSection';
import ProvincialSection from '../components/home/ProvincialSection';
import TestimonialSection from '../components/home/TestimonialSection';
import CtaSection from '../components/home/CtaSection';
import { dummyNews, getGeneralNews, getProvincialNews } from '../data/dummyNews';

export default function Home() {
  const generalNews = getGeneralNews();
  const provincialNews = getProvincialNews();

  return (
    <Layout>
      <HeroSection />
      
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsSection 
                title="Latest Immigration News" 
                subtitle="Stay informed about the latest updates and changes in Canadian immigration"
                news={generalNews.slice(0, 3)}
                viewAllLink="/news"
              />
            </div>
            
            <div className="lg:col-span-1">
              <PathwayCard />
              
              <div className="mt-8 bg-secondary-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">Recent Draw Results</h3>
                <div className="space-y-4">
                  <div className="border-b border-secondary-200 pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">Express Entry</div>
                      <div className="text-sm text-secondary-500">Apr 20, 2025</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">3,500 invitations</div>
                      <div className="text-sm font-medium">CRS: 475</div>
                    </div>
                  </div>
                  
                  <div className="border-b border-secondary-200 pb-3">
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">PNP Only</div>
                      <div className="text-sm text-secondary-500">Apr 12, 2025</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">1,200 invitations</div>
                      <div className="text-sm font-medium">CRS: 772</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="font-medium">Healthcare Workers</div>
                      <div className="text-sm text-secondary-500">Apr 5, 2025</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">1,500 invitations</div>
                      <div className="text-sm font-medium">CRS: 458</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <FeaturesSection />
      <ProvincialSection provincialNews={provincialNews} />
      <TestimonialSection />
      <CtaSection />
    </Layout>
  );
}