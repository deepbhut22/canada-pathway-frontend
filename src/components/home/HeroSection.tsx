import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, MapPin, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Find Your Perfect <br />
                Canadian Immigration Pathway
              </h1>
              <p className="text-lg md:text-xl text-primary-100 max-w-lg">
                AI-powered guidance to navigate your journey to Canada with personalized recommendations and expert support.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-2 text-primary-300 mt-0.5 flex-shrink-0" />
                <p className="text-primary-100">Comprehensive assessment of over 80+ immigration programs</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-2 text-primary-300 mt-0.5 flex-shrink-0" />
                <p className="text-primary-100">Real-time program matching based on your unique profile</p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 mr-2 text-primary-300 mt-0.5 flex-shrink-0" />
                <p className="text-primary-100">Personalized CRS score calculation and program eligibility</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="text-primary-700 bg-white text-indigo-900 hover:text-white hover:border hover:border-white"
                onClick={() => navigate('/questionnaire')}
                leftIcon={<Compass className="h-5 w-5" />}
              >
                Find My Pathway
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-primary-700 hover:text-primary-700"
                onClick={() => navigate('/profile')}
                leftIcon={<MapPin className="h-5 w-5" />}
              >
                View My Profile
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block relative h-96">
            <div className="absolute inset-0 bg-primary-900 bg-opacity-100 rounded-lg overflow-hidden ">
              <img 
                src="https://images.pexels.com/photos/756790/pexels-photo-756790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Canada Landscape" 
                // className="w-full h-full object-cover mix-blend-overlay opacity-100"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-md">
                <h2 className="text-primary-700 text-xl font-semibold mb-3">Trusted by thousands of immigrants</h2>
                <p className="text-secondary-700 mb-4">
                  Join over 10,000 users who have successfully navigated their Canadian immigration journey with our guidance.
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="text-center">
                    <div className="text-primary-600 font-bold text-2xl">97%</div>
                    <div className="text-xs text-secondary-500">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary-600 font-bold text-2xl">10k+</div>
                    <div className="text-xs text-secondary-500">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary-600 font-bold text-2xl">4.9</div>
                    <div className="text-xs text-secondary-500">User Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}