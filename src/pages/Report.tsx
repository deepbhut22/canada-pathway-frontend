import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Download, MessageCircle, Edit, ExternalLink, Clipboard, CheckCircle, AlertTriangle, ChevronRight, Loader2 } from 'lucide-react';
import useAuthStore from '../store/authStore';
import api from '../utils/axios';
import { useExpressEntryStore, useRecommendationStore } from '../store/reports';
import { usePNPStore } from '../store/reports';

import { useReportData } from '../hooks/useReportData';
import LoadingSpinner from '../components/ui/LoadinSpinner';
import { PNPOptionsDialog } from '../components/PNPOptionsDialog';
import { SuggestionsDialog } from '../components/SuggestionsDialog';
import { alternativePrograms } from '../utils/dummyData';
import { AlternativePathwaysDialog } from '../components/AlternativePathwaysDialog';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ChatBox from '../components/ui/ChatBox';
import { MessagePopup } from '../components/ui/MessagePopup';

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
  const reportContentRef = useRef(null);

  const [showPNPOptionsDialog, setShowPNPOptionsDialog] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAlternativePathwaysDialog, setShowAlternativePathwaysDialog] = useState(false);  
  const [selectedPNPOption, setSelectedPNPOption] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  // const [isConsultancyLoading, setIsConsultancyLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // const pnpReport = usePNPStore.getState().report;
  const eligiblePrograms = usePNPStore.getState().eligiblePrograms;
  // const isLoading = useExpressEntryStore((state) => state.isLoading);  
  const expressEntryProfile = useExpressEntryStore((state) => state.profile);
  const expressEntryRecommendations = useRecommendationStore((state) => state.recommendations);
  // Use the useReportData hook to handle fetching both Express Entry and PNP data
  const { isLoading } = useReportData();

  const isConsultationDialogOpen = useAuthStore((state) => state.isConsultationDialogOpen);
  
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

  async function generateReport(): Promise<void> {
    try {
      const response = await api.get(`/report/recommendation/${useAuthStore.getState().user?._id}`);
      console.log(response);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  }

  const downloadReport = async () => {
    setIsDownloading(true);
    console.log('Downloading report...');
    try {
      // Get the report content using the ref instead of getElementById
      const reportContent = reportContentRef.current;

      if (!reportContent) {
        console.error('Report content not found');
        setIsDownloading(false);
        return;
      }

      // Create a new PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');

      // Add title page
      pdf.setFontSize(24);
      pdf.setTextColor(33, 33, 33);
      pdf.text('Immigration Pathway Report', 105, 50, { align: 'center' });
      pdf.setFontSize(14);
      pdf.text(`For: ${basicInfo.fullName || 'User'}`, 105, 65, { align: 'center' });
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleDateString('en-CA')}`, 105, 75, { align: 'center' });

      // Add logo placeholder
      pdf.setFillColor(230, 244, 255);
      pdf.rect(65, 100, 80, 30, 'F');
      pdf.setTextColor(30, 64, 175);
      pdf.setFontSize(16);
      pdf.text('PATHWAY FINDER', 105, 115, { align: 'center' });
      pdf.setFontSize(10);
      pdf.text('Your Immigration Journey Simplified', 105, 122, { align: 'center' });

      pdf.addPage();
      // Get each section of the report that we want to include
      const reportSections = (reportContent as HTMLElement).querySelectorAll('.pdf-section') || [];

      // If no sections with the pdf-section class are found, try to convert the entire reportContent
      if (reportSections.length === 0) {
        console.log('No sections found, using entire report content');
        try {
          // Convert entire report content
          const canvas = await html2canvas(reportContent, {
            scale: 2,
            useCORS: true,
            logging: false,
            allowTaint: true
          });

          // Calculate dimensions to fit on PDF
          const imgWidth = 190;
          const imgHeight = canvas.height * imgWidth / canvas.width;

          // Add content
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', 10, 15, imgWidth, imgHeight);
        } catch (error) {
          console.error('Error converting entire report content:', error);
        }
      } else {
        console.log(`Found ${reportSections.length} sections`);
        let yOffset = 15;

        // Add each section to PDF
        for (let i = 0; i < reportSections.length; i++) {
          const section = reportSections[i];

          if (i > 0 && yOffset > 250) {
            // Add a new page if we're running out of space
            pdf.addPage();
            yOffset = 15;
          }

          // Convert section to canvas
          const canvas = await html2canvas(section as HTMLElement, {
            scale: 2,
            useCORS: true,
            logging: false,
            allowTaint: true
          });

          // Calculate dimensions to fit on PDF
          const imgWidth = 190;
          const imgHeight = canvas.height * imgWidth / canvas.width;

          // Add section title
          const sectionTitle = section.getAttribute('data-title');
          if (sectionTitle) {
            pdf.setFontSize(14);
            pdf.setTextColor(30, 64, 175);
            pdf.text(sectionTitle, 10, yOffset);
            yOffset += 8;
          }

          // Add section content
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', 10, yOffset, imgWidth, imgHeight);

          yOffset += imgHeight + 15;

          // Add page break if not the last section
          if (i < reportSections.length - 1 && yOffset > 250) {
            pdf.addPage();
            yOffset = 15;
          }
        }
      }

      // Save the PDF
      pdf.save(`Immigration_Pathway_Report_${basicInfo.fullName || 'User'}_${new Date().toLocaleDateString('en-CA')}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };


  async function handleConsultationRequest() {
    try {
      // setIsConsultancyLoading(true);
      const response = await api.get(`/consultancy/${useAuthStore.getState().user?._id}`);

      if (response.status === 200) {
        setMsg('You have already requested a consultation. Please wait for our response.');
      } else if (response.status === 201) {
        setMsg('Consultation request sent successfully. Please wait for our response.');
      }

      // setIsConsultancyLoading(false);

      // Wait 5 seconds before closing popup and clearing the message
      // setTimeout(() => {
      //   useAuthStore.getState().setIsConsultationDialogOpen(false);
      //   setMsg('');
      // }, 5000);

    } catch (error) {
      // setIsConsultancyLoading(false);
      setMsg('Something went wrong. Please try again later.');
      console.error(error);

      setTimeout(() => {
        useAuthStore.getState().setIsConsultationDialogOpen(false);
        setMsg('');
      }, 5000);
    }
  }


  return (
    <Layout>
      <div className="py-8 bg-white mt-16 border-b border-secondary-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex flex-col w-full">
              <h1 className="text-2xl font-bold text-secondary-900 sm:text-3xl">
                Your Immigration Pathway Report
              </h1>
              <p className="mt-2 text-sm text-secondary-500">
                Last updated: {new Date().toLocaleDateString('en-CA')}
              </p>
            </div>
            <div className="mt-5 flex flex-col md:flex-row md:mt-0 md:ml-4 space-y-3 md:space-y-0 md:space-x-3 w-full">
              <Button
                variant="outline"
                onClick={downloadReport}
                leftIcon={<Download className="h-4 w-4" />}
                className="w-full md:w-auto bg-white text-secondary-950 border border-secondary-950 hover:bg-white hover:text-secondary-950"
              >
                Download Report
              </Button>

              <Button
                leftIcon={<Edit className="h-4 w-4" />}
                onClick={() => navigate('/profile')}
                variant="outline"
                className="w-full md:w-auto bg-secondary-950 text-white hover:bg-secondary-950 hover:text-white"
              >
                Update Profile
              </Button>

              <Button
                leftIcon={<Edit className="h-4 w-4" />}
                // onClick={generateReport}
                variant="outline"
                className="w-full md:w-auto bg-white text-secondary-950 border border-secondary-950 hover:bg-white hover:text-secondary-950"
              >
                Re-Generate Report
              </Button>
            </div>

          </div>
        </div>
      </div>
      
      {isLoading ? <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-primary-50 h-[70vh] flex items-center justify-center"><LoadingSpinner  size='large' message='Loading Report...'/></div>
       : 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" ref={reportContentRef}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {isLoading ? <div className="w-96 mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-primary-50"><LoadingSpinner /></div> : <div className="lg:col-span-2 space-y-8">
            <Card className="pdf-section" data-title="Express Entry Profile">
              <CardHeader className="bg-secondary-100">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Express Entry Profile</CardTitle>
                  <div className="bg-primary-100 text-secondary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
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
                        <div className="text-2xl font-bold text-secondary-950">{expressEntryProfile?.expressEntryProfile?.crsScore}</div>
                        {/* <div className="text-2xl font-bold text-secondary-950">{expressEntryProfile?.expressEntryProfile?.crsScore !== 0 ? expressEntryProfile?.expressEntryProfile?.crsScore! - 10 : 0} - {expressEntryProfile?.expressEntryProfile?.crsScore! + 10}</div> */}
                      <div className="text-xs text-secondary-500">points</div>
                    </div>
                  </div>
                  
                  <div className="border-t border-secondary-200 pt-4">
                    <h4 className="font-medium text-secondary-900 mb-3 underline">Score Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <div className="flex-[1_1_0%] min-w-0 pr-2">
                          <h4 className="text-sm font-medium">Core/Human Capital Factors:</h4>
                          {expressEntryProfile?.expressEntryProfile?.scoreBreakdown.coreHumanCapital?.reason?.map((bd, idx) =>
                            <p key={`additional-point-${idx}`} className="text-sm text-secondary-600">{bd}</p>
                          )}                          
                      </div>
                        <span className="text-sm font-medium whitespace-nowrap">
                          {expressEntryProfile?.expressEntryProfile?.scoreBreakdown?.coreHumanCapital?.score} / {expressEntryProfile?.expressEntryProfile?.scoreBreakdown?.coreHumanCapital?.maximum}
                        </span>
                      </div>

                      <hr className="my-2" />

                      <div className="flex justify-between items-center flex-wrap">
                        <div className="flex-[1_1_0%] min-w-0 pr-2">
                          <h4 className="text-sm font-medium">Spouse Factors : </h4>
                            {expressEntryProfile?.expressEntryProfile?.scoreBreakdown.spouseFactors?.reason?.map((bd, idx) =>
                              <p key={`additional-point-${idx}`} className="text-sm text-secondary-600">{bd}</p>
                            )}                       
                         </div>
                        <span className="text-sm font-medium">{expressEntryProfile?.expressEntryProfile?.scoreBreakdown?.spouseFactors?.score} / {expressEntryProfile?.expressEntryProfile?.scoreBreakdown?.spouseFactors?.maximum}</span>
                      </div>

                      <hr className="my-2" />

                      <div className="flex justify-between items-center">
                        <div className="flex-[1_1_0%] min-w-0 pr-2">
                          <h4 className="text-sm font-medium">Skill Transferability : </h4>
                            {expressEntryProfile?.expressEntryProfile?.scoreBreakdown.skillTransferability?.reason?.map((bd, idx) =>
                              <p key={`additional-point-${idx}`} className="text-sm text-secondary-600">{bd}</p>
                            )}                        
                        </div>
                        <span className="text-sm font-medium">{expressEntryProfile?.expressEntryProfile?.scoreBreakdown?.skillTransferability?.score} / {expressEntryProfile?.expressEntryProfile?.scoreBreakdown?.skillTransferability?.maximum}</span>
                      </div>

                      <hr className="my-2" />

                      <div className="flex justify-between items-center">
                        <div className="flex-[1_1_0%] min-w-0 pr-2">
                          <h4 className="text-sm font-medium">Additional Points : </h4>
                          {expressEntryProfile?.expressEntryProfile?.scoreBreakdown.additionalPoints?.reason?.map((bd, idx) => 
                            <p key={`additional-point-${idx}`} className="text-sm text-secondary-600">{bd}</p>
                          )}
                        </div>
                        <span className="text-sm font-medium">{expressEntryProfile?.expressEntryProfile?.scoreBreakdown?.additionalPoints?.score} / {expressEntryProfile?.expressEntryProfile?.scoreBreakdown?.additionalPoints?.maximum}</span>
                        
                      </div>
                    </div>
                  </div>

                  
                  <div className="border-t border-secondary-200 pt-4">
                    <h4 className="font-medium text-secondary-900 mb-2 underline">Eligibility Status</h4>
                    <div className="flex items-start mt-2">
                      <div className="flex-shrink-0">
                        {expressEntryProfile?.eligibilityStatus[0]?.isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {expressEntryProfile?.eligibilityStatus[0]?.program}
                        </h5>
                        {expressEntryProfile?.eligibilityStatus[0]?.reason?.map((bd, idx) =>
                          <p key={`additional-point-${idx}`} className="text-sm text-secondary-600">{bd}</p>
                        )}
                        {/* <p className="text-sm text-secondary-600">
                          {expressEntryProfile?.eligibilityStatus[0]?.reason}
                        </p> */}
                      </div>
                    </div>
                    
                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {expressEntryProfile?.eligibilityStatus[1]?.isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {expressEntryProfile?.eligibilityStatus[1]?.program}
                        </h5>
                          {expressEntryProfile?.eligibilityStatus[1]?.reason?.map((bd, idx) =>
                            <p key={`additional-point-${idx}`} className="text-sm text-secondary-600">{bd}</p>
                          )}
                      </div>
                    </div>
                    
                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {expressEntryProfile?.eligibilityStatus[2]?.isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {expressEntryProfile?.eligibilityStatus[2]?.program}
                        </h5>
                          {expressEntryProfile?.eligibilityStatus[2]?.reason?.map((bd, idx) =>
                            <p key={`additional-point-${idx}`} className="text-sm text-secondary-600">{bd}</p>
                          )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-secondary-200 pt-4">
                    <h4 className="font-medium text-secondary-900 mb-2 underline">Category-Based Eligibility</h4>

                    {expressEntryProfile?.categoryBasedEligibility.map((eligibility, index) => (
                      <div
                        key={`eligibility-${index}`}
                        className="flex items-start mt-2"
                      >
                        <div className="flex-shrink-0">
                          {eligibility.isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                        </div>
                        <div className="ml-3">
                          <h5 className="text-sm font-medium text-secondary-900">
                            {eligibility.program}
                          </h5>
                          <p className="text-sm text-secondary-600">
                            {eligibility.reason}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* <div className="flex items-start mt-2">
                      <div className="flex-shrink-0">
                        {expressEntryProfile?.categoryBasedEligibility[0].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {expressEntryProfile?.categoryBasedEligibility[0].program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {expressEntryProfile?.categoryBasedEligibility[0]?.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {expressEntryProfile?.categoryBasedEligibility[1].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {expressEntryProfile?.categoryBasedEligibility[1]?.program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {expressEntryProfile?.categoryBasedEligibility[1]?.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {expressEntryProfile?.categoryBasedEligibility[2].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {expressEntryProfile?.categoryBasedEligibility[2]?.program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {expressEntryProfile?.categoryBasedEligibility[2]?.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {expressEntryProfile?.categoryBasedEligibility[3].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {expressEntryProfile?.categoryBasedEligibility[3].program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {expressEntryProfile?.categoryBasedEligibility[3].details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                          {expressEntryProfile?.categoryBasedEligibility[4].isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                            {expressEntryProfile?.categoryBasedEligibility[4]?.program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                            {expressEntryProfile?.categoryBasedEligibility[4]?.details}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start mt-4">
                      <div className="flex-shrink-0">
                        {expressEntryProfile?.categoryBasedEligibility[5]?.isEligible ? <CheckCircle className="h-5 w-5 text-green-500" /> : <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium text-secondary-900">
                          {expressEntryProfile?.categoryBasedEligibility[5]?.program}
                        </h5>
                        <p className="text-sm text-secondary-600">
                          {expressEntryProfile?.categoryBasedEligibility[5]?.details}
                        </p>
                      </div>
                    </div>
                  </div> */}
                  
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
                    </div> */}
                  </div> 
                </div>
              </CardContent>
              <CardFooter className="bg-primary-50">
                <div className="w-full flex justify-between items-center">
                  <a 
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://ircc.canada.ca/english/immigrate/skilled/crs-tool.asp
"
                    className="text-secondary-900 hover:text-secondary-950 text-sm font-medium flex items-center"
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
              <Card className='flex flex-col gap-2 justify-between pdf-section' data-title="Provincial Nominee Program">
                <CardHeader>
                  <CardTitle>Provincial Nominee Program</CardTitle>
                </CardHeader>
                    <CardContent >
                  <div className="space-y-4">
                    {eligiblePrograms?.length === 0 && 
                      <div>
                        <h4 className="text-sm font-medium text-yellow-500 mb-2">Since you are not eligible for any PNP, here are some suggestions:</h4>
                        {usePNPStore.getState().report?.suggestions?.slice(0, 3).map((suggestion, index) => (
                          <div key={`pnp-suggestion-${index}`} className="flex items-start">
                            <div key={`pnp-suggestion-${index}`} className="flex items-start">
                              <div className="flex-shrink-0 w-full">
                                <h3 className="text-sm font-medium text-secondary-900">{suggestion.action}</h3>
                                <p className="text-sm text-secondary-600">{suggestion.reason}</p>
                                {index !== 2 && <hr className="my-2" />}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    }
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
                      Show PNP Suggestions
                    </Button>
                </CardFooter>
              </Card>
              
              <Card className='pdf-section' data-title="Alternative Pathways">
                <CardHeader>
                  <CardTitle>Alternative Pathways</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">


                    {alternativePrograms.slice(0, 3).map((program, idx) => (
                      <div 
                        key={`alternative-${idx}`}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0">
                          {program.status === 'Active' ? <CheckCircle className="h-5 w-5 text-green-500" /> : program.status === 'Temporarily Paused' ? <AlertTriangle className="h-5 w-5 text-yellow-500" /> : <AlertTriangle className="h-5 w-5 text-red-500" />}
                        </div>
                        <div className="ml-3">
                          <h5 className="text-sm font-medium text-secondary-900">
                            {program.title}
                          </h5>
                          <p className={`text-sm text-secondary-600 ${program.status === 'Active' ? 'text-green-400' : program.status === 'Temporarily Paused' ? 'text-yellow-500' : 'text-red-900'}`}>
                            {program.status}
                          </p>
                          <p className="text-sm text-secondary-600">
                            {program.description}
                          </p>
                        </div>
                      </div>

                    ))}

                    
                    {/* <div className="flex items-start">
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
                    </div> */}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => setShowAlternativePathwaysDialog(true)}
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                  >
                    Explore All Alternative Pathways
                  </Button>
                </CardFooter>
              </Card>
            </div>}
            
            <Card className='pdf-section' data-title="Next Steps and Recommendations">
              <CardHeader>
                <CardTitle>Next Steps and Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6"> 
                  <div>
                    <h4 className="font-medium text-secondary-900 mb-3">Improve Your CRS Score</h4>
                    <ul className="space-y-3">

                      {!isLoading && expressEntryRecommendations?.map((recommendation, index) => (
                        <li 
                          key={`recommendation-${index}`}
                          className="flex items-start"
                        >
                          <div className="flex-shrink-0 h-5 w-5 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs mr-3 mt-0.5">
                            {index + 1  }
                          </div>
                          <p className="text-secondary-600">
                            <span className="font-medium text-secondary-900">{recommendation.question}</span> {recommendation.answer}
                          </p>
                        </li>
                      ))}

                      {/* <li className="flex items-start">
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
                      </li> */}
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
                    <p className="text-secondary-900">{basicInfo.age || '32'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-secondary-500">Country of Citizenship</h4>
                    <p className="text-secondary-900">{basicInfo.citizenCountry || 'India'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-secondary-500">Education</h4>
                    <p className="text-secondary-900">{useUserStore.getState().userProfile?.educationInfo.educationList[0]?.type || 'Master\'s Degree'}</p>
                  </div>
                  {/* <div>
                    <h4 className="text-sm font-medium text-secondary-500">Language Proficiency</h4>
                    <p className="text-secondary-900">English (CLB 9)</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-secondary-500">Work Experience</h4>
                    <p className="text-secondary-900">5+ years (NOC 21311)</p>
                  </div> */}
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
                <div className="bg-secondary-100 rounded-lg p-4 mb-4">
                  <MessageCircle className="h-8 w-8 text-secondary-900 mb-2" />
                  <h3 className="text-lg font-semibold text-secondary-900 mb-1">Have questions?</h3>
                  <p className="text-secondary-600 text-sm mb-3">
                    Our AI assistant can answer common questions about your immigration options.
                  </p>
                  <Button 
                    onClick={() => setShowChatBox(true)}
                    size="sm" 
                    className="w-full bg-secondary-900 text-white hover:bg-secondary-950"
                  >Chat with Immigration AI</Button>
                </div>

                
                <div className="border-t border-secondary-200 pt-4 mt-4">
                  <h3 className="font-medium text-secondary-900 mb-2">
                    Connect with Licensed(RCIC) Consultants For Free
                  </h3>
                  <p className="text-sm text-secondary-600 mb-4">
                    Get personalized guidance from a regulated immigration consultant.
                  </p>

                    <div className="relative">
                      <div className="space-y-3">
                        <Button 
                          onClick={() => useAuthStore.getState().setIsConsultationDialogOpen(true)}
                          variant="outline" size="sm" className="w-full">
                          Pre-Book Consultation
                        </Button>
                        {/* <Button variant="secondary" size="sm" className="w-full disabled:opacity-50">
                          View Consultant Profiles
                        </Button> */}
                      </div>
                    </div>

                    
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Draws</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="h-full flex flex-col shadow-xl rounded-lg">
                    <div className="flex-grow bg-secondary-50 rounded-lg p-6 border border-secondary-100 h-full">
                      <h3 className="text-xl font-semibold text-secondary-900 mb-3">Recent Draws</h3>
                      <p className="text-secondary-700 mb-4">
                        Latest invitation rounds for Canada's immigration programs.
                      </p>
                      <div className="space-y-4">
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

                        <div
                          onClick={() => window.open("https://immigratemanitoba.com/2025/05/eoi-draw-244/", "_blank", "noopener,noreferrer")}
                          className="border-b border-secondary-200 pb-1 cursor-pointer hover:bg-secondary-200 transition-all duration-300 rounded-md hover:px-2 hover:py-1">
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

                        <div
                          onClick={() => window.open("https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds/invitations.html?q=344", "_blank", "noopener,noreferrer")}
                          className="border-b border-secondary-200 pb-1 cursor-pointer hover:bg-secondary-200 transition-all duration-300 rounded-md hover:px-2 hover:py-1"
                        >
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
      <AlternativePathwaysDialog
        isOpen={showAlternativePathwaysDialog}
        onClose={() => setShowAlternativePathwaysDialog(false)}
        options={alternativePrograms}
        onOptionSelect={() => {}}
      />
      <ChatBox
        isOpen={showChatBox}
        onClose={() => setShowChatBox(false)}
      />
      <MessagePopup
        isOpen={isConsultationDialogOpen}
        onClose={() => useAuthStore.getState().setIsConsultationDialogOpen(false)}
        title="Consultation Request"
        message={msg === '' ? "This feature is currently under development. Raise your request and we will get back to you soon." : msg}
        type={msg === '' ? 'info' : msg === 'You have already requested a consultation. Please wait for our response.' ? 'warning' : 'success'}
        actionText="Raise Request"
        onAction={() => {
          handleConsultationRequest();
        }}
        cancelText="Not now"
        maxWidth="2xl"
      />  
    </Layout>
  );
}