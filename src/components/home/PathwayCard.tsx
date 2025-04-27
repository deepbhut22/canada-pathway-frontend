import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';

export default function PathwayCard() {
  const navigate = useNavigate();

  return (
    <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-100">
      <CardHeader>
        <div className="flex items-center mb-2">
          <div className="p-2 rounded-full bg-primary-100 text-primary-600">
            <Compass className="h-6 w-6" />
          </div>
        </div>
        <CardTitle className="text-xl md:text-2xl">Find Your Best PR Pathway to Canada</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-secondary-600">
          Answer a series of questions about your background, skills, and preferences to receive a personalized immigration pathway recommendation.
        </p>
        
        <div className="mt-6 space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs">
              1
            </div>
            <p className="ml-3 text-sm text-secondary-700">
              Complete your detailed profile assessment
            </p>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs">
              2
            </div>
            <p className="ml-3 text-sm text-secondary-700">
              Get matched with suitable immigration programs
            </p>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 h-5 w-5 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs">
              3
            </div>
            <p className="ml-3 text-sm text-secondary-700">
              Receive personalized next steps and requirements
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full"
          rightIcon={<ChevronRight className="h-4 w-4" />}
          onClick={() => navigate('/questionnaire')}
        >
          Start My Assessment
        </Button>
      </CardFooter>
    </Card>
  );
}