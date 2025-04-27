import React from 'react';
import { Heart, BarChart, Lightbulb, RefreshCw, Clock, MessageSquare } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <BarChart className="h-6 w-6 text-primary-600" />,
      title: 'Express Entry Calculator',
      description: 'Estimate your Comprehensive Ranking System (CRS) score to determine your chances in the Express Entry pool.'
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary-600" />,
      title: 'Program Matching',
      description: 'Our AI analyzes your profile against all Canadian immigration programs to find your best options.'
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-primary-600" />,
      title: 'Real-time Updates',
      description: 'Stay informed with the latest changes to immigration policies, draw results, and program requirements.'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-600" />,
      title: 'Processing Times',
      description: 'Track current processing times for different immigration programs and application types.'
    },
    {
      icon: <Heart className="h-6 w-6 text-primary-600" />,
      title: 'PNP Guidance',
      description: 'Navigate provincial nomination programs with province-specific eligibility assessments.'
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-primary-600" />,
      title: 'AI-powered Chat',
      description: 'Get instant answers to your immigration questions from our intelligent assistant.'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900">Comprehensive Immigration Tools</h2>
          <p className="mt-4 text-lg text-secondary-600 max-w-3xl mx-auto">
            Everything you need to plan, prepare, and succeed in your Canadian immigration journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border border-secondary-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="p-2 bg-primary-50 rounded-full inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">{feature.title}</h3>
              <p className="text-secondary-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}