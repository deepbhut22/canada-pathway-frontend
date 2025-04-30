import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { FileText, Download, MessageCircle, Edit, ExternalLink, Clipboard, CheckCircle, AlertTriangle, ChevronRight, Loader2 } from 'lucide-react';
import useAuthStore from '../store/authStore';
import api from '../utils/axios';
import { useExpressEntryStore } from '../store/reports';
import { usePNPStore } from '../store/reports';

import { useReportData } from '../hooks/useReportData';
import LoadingSpinner from '../components/ui/LoadinSpinner';
import { PNPOptionsDialog } from '../components/PNPOptionsDialog';
import { SuggestionsDialog } from '../components/SuggestionsDialog';

interface PNPAssessment {
  id?: string;
  province: string;
  stream_name: string;
  status: string;
  reason: string;
}

interface PNPOption {
  id: string;
  province: string;
  stream_name: string;
  status: string;
  reason: string;
  selected: boolean;
}

export default function Report() {
  const navigate = useNavigate();
  const { userProfile } = useUserStore();
  const { isComplete, basicInfo } = userProfile;

  const [showPNPOptionsDialog, setShowPNPOptionsDialog] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPNPOption, setSelectedPNPOption] = useState<string | null>(null);

  // const pnpReport = usePNPStore.getState().report;
  const eligiblePrograms = usePNPStore.getState().eligiblePrograms;
  React.useEffect(() => {
    console.log(usePNPStore.getState().isLoading);
    console.log(eligiblePrograms);
  }, []);

  // const isLoading = useExpressEntryStore((state) => state.isLoading);  
  const profile = useExpressEntryStore((state) => state.profile);

  // Use the useReportData hook to handle fetching both Express Entry and PNP data
  const { isLoading } = useReportData();
  const { isLoading: isLoadingPNP } = usePNPStore();
  
  React.useEffect(() => {
    if (!isComplete || !basicInfo.fullName) {
      navigate('/profile');
    }
  }, [isComplete, basicInfo.fullName, navigate]);
    

  const handlePNPOptionSelect = (optionId: string) => {
    setSelectedPNPOption(optionId);
    // You can add additional logic here when an option is selected
  };

  const transformPNPOptions = (assessments: PNPAssessment[]): PNPOption[] => {
    return assessments.map((assessment, index) => ({
      id: assessment.id || `pnp-${index}`,
      province: assessment.province,
      stream_name: assessment.stream_name,
      status: assessment.status,
      reason: assessment.reason,
      selected: selectedPNPOption === (assessment.id || `pnp-${index}`)
    }));
  };

  return (
    <Layout>
      <div className="py-8 bg-white border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-secondary-900 sm:text-3xl sm:truncate">
                Your Immigration Pathway Report
              </h1>
              <p className="mt-2 text-sm text-secondary-500">
                Last updated: {new Date().toLocaleDateString('en-CA')}
              </p>
            </div>
            <div className="mt-5 flex md:mt-0 md:ml-4 space-x-3">
              <Button
                variant="outline"
                leftIcon={<Download className="h-4 w-4" />}
              >
                Download Report
              </Button>
              <Button
                leftIcon={<Edit className="h-4 w-4" />}
                onClick={() => navigate('/profile')}
              >
                Update Profile
              </Button>
              {/* <Button
                leftIcon={<Edit className="h-4 w-4" />}
                // onClick={generateReport}
              >
                Generate Report
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      
      {isLoading ? <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-primary-50 h-[70vh] flex items-center justify-center"><LoadingSpinner  size='large' message='Loading Report...'/></div>
       : 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {isLoading ? <div className="w-96 mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-primary-50"><LoadingSpinner /></div> : <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader className="bg-primary-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Express Entry Profile</CardTitle>
                  <div className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Primary Recommendation
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900">Comprehensive Ranking System (CRS) Score</h3>
                      <p className="text-secondary-600 text-sm">Based on your profile information</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary-600">{profile?.crsScore}</div>
                      <div className="text-xs text-secondary-500">points</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-secondary-200 pt-4">
                    <h4 className="font-medium text-secondary-900 mb-3 underline">Score Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center flex-wrap">
                        <div>
                          <h4 className="text-sm font-medium">Core/Human Capital Factors : </h4>
                          <p className="text-sm text-secondary-600">{profile?.scoreBreakdown.coreHumanCapital.reason}</p>
                        </div>
                        <span className="text-sm font-medium">{profile?.scoreBreakdown.coreHumanCapital.score} / {profile?.scoreBreakdown.coreHumanCapital.maximum}</span>
                      </div>
                      <div className="flex justify-between items-center flex-wrap">
                        <div>
                          <h4 className="text-sm font-medium">Spouse Factors : </h4>
                          <p className="text-sm text-secondary-600">{profile?.scoreBreakdown.spouseFactors.reason}</p>
                        </div>
                        <span className="text-sm font-medium">{profile?.scoreBreakdown.spouseFactors.score} / {profile?.scoreBreakdown.spouseFactors.maximum}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium">Skill Transferability : </h4>
                          <p className="text-sm text-secondary-600">{profile?.scoreBreakdown.skillTransferability.reason}</p>
                        </div>
                        <span className="text-sm font-medium">{profile?.scoreBreakdown.skillTransferability.score} / {profile?.scoreBreakdown.skillTransferability.maximum}</span>
                        
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium">Additional Points : </h4>
                          <p className="text-sm text-secondary-600">{profile?.scoreBreakdown.additionalPoints.reason}</p>
                        </div>
                        <span className="text-sm font-medium">{profile?.scoreBreakdown.additionalPoints.score} / {profile?.scoreBreakdown.additionalPoints.maximum}</span>
                        
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-secondary-200 pt-4">
                    <h4 className="font-medium text-secondary-900 mb-2 underline">Eligibility Status</h4>
                    <div className="flex items-start mt-2">
                      <div className="flex-shrink-0">
                        {useExpressEntryStore.getState().profile?.eligibilityStatus[0].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {useExpressEntryStore.getState().profile?.eligibilityStatus[0].program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {useExpressEntryStore.getState().profile?.eligibilityStatus[0].details}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {useExpressEntryStore.getState().profile?.eligibilityStatus[1].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {useExpressEntryStore.getState().profile?.eligibilityStatus[1].program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {useExpressEntryStore.getState().profile?.eligibilityStatus[1].details}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {useExpressEntryStore.getState().profile?.eligibilityStatus[2].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {useExpressEntryStore.getState().profile?.eligibilityStatus[2].program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {useExpressEntryStore.getState().profile?.eligibilityStatus[2].details}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-secondary-200 pt-4">
                    <h4 className="font-medium text-secondary-900 mb-2 underline">Category-Based Eligibility</h4>
                    <div className="flex items-start mt-2">
                      <div className="flex-shrink-0">
                        {useExpressEntryStore.getState().profile?.categoryBasedEligibility[0].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[0].program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[0].details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {useExpressEntryStore.getState().profile?.categoryBasedEligibility[1].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[1].program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[1].details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {useExpressEntryStore.getState().profile?.categoryBasedEligibility[2].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[2].program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[2].details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {useExpressEntryStore.getState().profile?.categoryBasedEligibility[3].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[3].program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[3].details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {useExpressEntryStore.getState().profile?.categoryBasedEligibility[4].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[4].program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[4].details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {useExpressEntryStore.getState().profile?.categoryBasedEligibility[5].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[5].program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {useExpressEntryStore.getState().profile?.categoryBasedEligibility[5].details}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* <div className="border-t border-secondary-200 pt-4">
                    <h4 className="font-medium text-secondary-900 mb-3">Recent Draw Information</h4>
                    <p className="text-sm text-secondary-600 mb-2">
                      Based on recent Express Entry draws, your score of <span className="font-medium">{useExpressEntryStore.getState().profile?.crsScore}</span> would have been:
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-md p-3">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-green-800">
                            {useExpressEntryStore.getState().profile?.eligibilityStatus[2].details}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </CardContent>
              <CardFooter className="bg-primary-50">
                <div className="w-full flex justify-between items-center">
                  <a 
                    href="#" 
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                  >
                    Learn more about Express Entry
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                  {/* <Button size="sm">
                    Improve Your Score
                  </Button> */}
                </div>
              </CardFooter>
            </Card>
            
            {isLoading ? <div className="w-96 mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-primary-50"><LoadingSpinner /></div>
             : 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Provincial Nominee Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {eligiblePrograms?.map((program, index) => (
                      <div key={`pnp-${index}`} className="flex items-start">
                        <div className="flex-shrink-0">
                          {program.status === 'Eligible' ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                        </div>
                        <div className="ml-3">
                          <h3>{program.province}</h3>
                          <h5 className="text-sm font-medium text-secondary-900">
                            {program.stream_name}
                          </h5>
                          <p className="text-sm text-secondary-600">
                            {program.reason}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    onClick={() => setShowPNPOptionsDialog(true)}
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    View All PNP Options
                  </Button>
                    <Button
                      onClick={() => setShowSuggestions(true)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Show Suggestions
                    </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Alternative Pathways</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          Atlantic Immigration Program
                        </h5>
                        <p className="text-sm text-secondary-600">
                          Requires job offer from designated employer in Atlantic provinces
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          Rural and Northern Immigration Pilot
                        </h5>
                        <p className="text-sm text-secondary-600">
                          Requires job offer in participating community
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          Start-up Visa Program
                        </h5>
                        <p className="text-sm text-secondary-600">
                          Requires business concept and support from designated organization
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    Explore Alternative Pathways
                  </Button>
                </CardFooter>
              </Card>
            </div>}
            
            <Card>
              <CardHeader>
                <CardTitle>Next Steps and Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-secondary-900 mb-3">Improve Your CRS Score</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                          1
                        </div>
                        <p className="text-secondary-600">
                          <span className="font-medium text-secondary-900">Retake language test:</span> Improving your English scores could add up to 24 more points to your profile.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                          2
                        </div>
                        <p className="text-secondary-600">
                          <span className="font-medium text-secondary-900">Obtain a Canadian job offer:</span> A valid job offer with LMIA can add 50-200 points depending on the NOC code.
                        </p>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                          3
                        </div>
                        <p className="text-secondary-600">
                          <span className="font-medium text-secondary-900">Provincial nomination:</span> Actively pursue provincial nomination, which adds 600 points to your CRS score.
                        </p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-t border-secondary-200 pt-4">
                    <h4 className="font-medium text-secondary-900 mb-3">Required Documents</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Clipboard className="h-4 w-4 text-primary-500 mr-2" />
                        <span className="text-secondary-600">Valid passport</span>
                      </li>
                      <li className="flex items-center">
                        <Clipboard className="h-4 w-4 text-primary-500 mr-2" />
                        <span className="text-secondary-600">Language test results (IELTS, CELPIP, or TEF)</span>
                      </li>
                      <li className="flex items-center">
                        <Clipboard className="h-4 w-4 text-primary-500 mr-2" />
                        <span className="text-secondary-600">Educational Credential Assessment (ECA)</span>
                      </li>
                      <li className="flex items-center">
                        <Clipboard className="h-4 w-4 text-primary-500 mr-2" />
                        <span className="text-secondary-600">Proof of funds</span>
                      </li>
                      <li className="flex items-center">
                        <Clipboard className="h-4 w-4 text-primary-500 mr-2" />
                        <span className="text-secondary-600">Police clearance certificates</span>
                      </li>
                      <li className="flex items-center">
                        <Clipboard className="h-4 w-4 text-primary-500 mr-2" />
                        <span className="text-secondary-600">Medical examination results</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border-t border-secondary-200 pt-4">
                    <h4 className="font-medium text-secondary-900 mb-3">Timeline Estimate</h4>
                    <div className="bg-primary-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-secondary-900">Express Entry Profile Submission</span>
                        <span className="text-sm text-secondary-600">May 2025</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2.5 mb-6">
                        <div className="bg-primary-600 h-2.5 rounded-full w-[10%]"></div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-secondary-900">Invitation to Apply (Estimated)</span>
                        <span className="text-sm text-secondary-600">July-Sep 2025</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2.5 mb-6">
                        <div className="bg-primary-600 h-2.5 rounded-full w-[30%]"></div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-secondary-900">Application Processing</span>
                        <span className="text-sm text-secondary-600">6-9 months</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2.5 mb-6">
                        <div className="bg-primary-600 h-2.5 rounded-full w-[75%]"></div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-secondary-900">Permanent Residence (Estimated)</span>
                        <span className="text-sm text-secondary-600">Q2-Q3 2026</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2.5">
                        <div className="bg-primary-600 h-2.5 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>}
          
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-secondary-500">Name</h4>
                    <p className="text-secondary-900">{basicInfo.fullName || 'John Doe'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-secondary-500">Age</h4>
                    <p className="text-secondary-900">32</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-secondary-500">Country of Citizenship</h4>
                    <p className="text-secondary-900">{basicInfo.citizenCountry || 'India'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-secondary-500">Education</h4>
                    <p className="text-secondary-900">Master's Degree</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-secondary-500">Language Proficiency</h4>
                    <p className="text-secondary-900">English (CLB 9)</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-secondary-500">Work Experience</h4>
                    <p className="text-secondary-900">5+ years (NOC 21311)</p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate('/profile')}
                  >
                    View/Edit Complete Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Expert Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-primary-50 rounded-lg p-4 mb-4">
                  <MessageCircle className="h-8 w-8 text-primary-600 mb-2" />
                  <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                    Have questions?
                  </h3>
                  <p className="text-secondary-600 text-sm mb-3">
                    Our AI assistant can answer common questions about your immigration options.
                  </p>
                  <Button size="sm" className="w-full">Chat with Immigration AI</Button>
                </div>
                
                <div className="border-t border-secondary-200 pt-4 mt-4">
                  <h3 className="font-medium text-secondary-900 mb-2">
                    Connect with Licensed Consultants
                  </h3>
                  <p className="text-sm text-secondary-600 mb-4">
                    Get personalized guidance from a regulated immigration consultant.
                  </p>
                  <div className="space-y-3">
                    <Button variant="outline" size="sm" className="w-full">
                      Book a Consultation
                    </Button>
                    <Button variant="secondary" size="sm" className="w-full">
                      View Consultant Profiles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary-500 pl-3">
                    <h4 className="text-sm font-medium text-secondary-900">Express Entry Draw</h4>
                    <p className="text-xs text-secondary-500 mb-1">April 20, 2025</p>
                    <p className="text-sm text-secondary-600">Minimum CRS score: 475</p>
                  </div>
                  
                  <div className="border-l-2 border-secondary-300 pl-3">
                    <h4 className="text-sm font-medium text-secondary-900">OINP Tech Draw</h4>
                    <p className="text-xs text-secondary-500 mb-1">April 15, 2025</p>
                    <p className="text-sm text-secondary-600">Minimum CRS score: 458</p>
                  </div>
                  
                  <div className="border-l-2 border-secondary-300 pl-3">
                    <h4 className="text-sm font-medium text-secondary-900">NOC Updates</h4>
                    <p className="text-xs text-secondary-500 mb-1">April 10, 2025</p>
                    <p className="text-sm text-secondary-600">IRCC added 5 new TEER 0 occupations</p>
                  </div>
                </div>
                <div className="mt-4">
                  <a 
                    href="#" 
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                  >
                    View all updates
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>}
      <PNPOptionsDialog
        isOpen={showPNPOptionsDialog}
        onClose={() => setShowPNPOptionsDialog(false)}
        options={transformPNPOptions(usePNPStore.getState().report?.pnpAssessment || [])}
        onOptionSelect={handlePNPOptionSelect}
      />
      <SuggestionsDialog
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
        options={usePNPStore.getState().report?.suggestions || []}
        onOptionSelect={() => {}}
      />
    </Layout>
  );
}