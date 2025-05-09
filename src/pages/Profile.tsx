import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import Layout from '../components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Edit, FileText, Star, Award, CheckCircle2, ChevronRight, CheckCircle } from 'lucide-react';
import { navigationSteps } from '../utils/helpers';
import useAuthStore from '../store/authStore';
import {MessagePopup} from '../components/ui/MessagePopup';
import ChatBox from '../components/ui/ChatBox';

export default function Profile() {
  const navigate = useNavigate();
  const { userProfile, resetUserProfile } = useUserStore();
  const { basicInfo, educationInfo, workInfo, languageInfo, spouseInfo, dependentInfo, connectionInfo, jobOfferInfo, isComplete } = userProfile;

  const hasStartedProfile = !!basicInfo.fullName;
  const [chatOpen, setChatOpen] = useState(false);

  const isPopupOpen = useAuthStore(state => state.isPopupOpen);

  // Determine which steps are completed
  const completedSteps = useMemo(() => {
    return {
      basic: !!basicInfo.fullName && !!basicInfo.email && !!basicInfo.citizenCountry && !!basicInfo.residenceCountry,
      education: educationInfo && (typeof educationInfo.hasHighSchool === 'boolean') && (typeof educationInfo.hasPostSecondary === 'boolean') && (!educationInfo.hasPostSecondary || (educationInfo.hasPostSecondary && educationInfo.educationList.length > 0)),
      work: workInfo && (typeof workInfo.hasWorkExperience === 'boolean') && (!workInfo.hasWorkExperience || (workInfo.hasWorkExperience && workInfo.workExperienceList.length > 0)),
      language: languageInfo && languageInfo.primaryLanguage && 
        (!languageInfo.hasTakenTest || (languageInfo.primaryLanguageTest.type && languageInfo.primaryLanguageTest.clbScore))
        && (!languageInfo.hasSecondLanguage || (languageInfo.secondLanguageTest.type && languageInfo.secondLanguageTest.clbScore)),
      spouse: spouseInfo.maritalStatus && (spouseInfo.maritalStatus === 'single' || (spouseInfo.educationLevel && spouseInfo.hasCanadianWorkExp && spouseInfo.hasCanadianStudyExp && spouseInfo.hasRelativeInCanada)),
      dependent: dependentInfo && (typeof dependentInfo.hasDependents === 'boolean') && (!dependentInfo.hasDependents || (dependentInfo.hasDependents && dependentInfo.dependentList && dependentInfo.dependentList.length > 0)),
      connection: connectionInfo && typeof connectionInfo.doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident === "boolean",
      joboffer: jobOfferInfo && (typeof jobOfferInfo.hasJobOffer === 'boolean') && (!jobOfferInfo.hasJobOffer || (jobOfferInfo.hasJobOffer && jobOfferInfo.jobOffer.jobTitle && jobOfferInfo.jobOffer.nocCode && jobOfferInfo.jobOffer.province && jobOfferInfo.jobOffer.startDate && jobOfferInfo.jobOffer.teer)),
      // Add more steps as needed
    };
  }, [basicInfo, educationInfo, workInfo, languageInfo, spouseInfo, dependentInfo, connectionInfo, jobOfferInfo]);

  // Calculate progress percentage
  const progressPercentage = useMemo(() => {
    const completed = Object.values(completedSteps).filter(Boolean).length;
    const total = Object.keys(completedSteps).length;
    return Math.round((completed / total) * 100);
  }, [completedSteps]);

  const isProfileComplete = useUserStore(state => state.userProfile.isComplete);

  const renderProfileStatus = () => {
    if (isComplete) {
      return (
        <div className="flex items-center space-x-2 text-green-600">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Profile Complete</span>
        </div>
      );
    }

    if (hasStartedProfile) {
      return (
        <div className="text-primary-600">
          <span className="font-medium">Profile In Progress ({progressPercentage}%)</span>
        </div>
      );
    }

    return (
      <div className="text-secondary-500">
        <span className="font-medium">Profile Not Started</span>
      </div>
    );
  };

  const handleStartOrContinue = () => {
    if (hasStartedProfile) {
      // Find the first incomplete step
      const firstIncompleteStep = navigationSteps.find(step =>
        !completedSteps[step.id]
      );

      if (firstIncompleteStep) {
        navigate(`/questionnaire/${firstIncompleteStep.id}`);
      } else {
        navigate('/questionnaire');
      }
    } else {
      // Start from the beginning
      navigate('/questionnaire/basic');
    }
  };

  const handleFindPathway = () => {
    if (isProfileComplete) {
      setChatOpen(true);
    } else {
      useAuthStore.getState().setIsPopupOpen(true);
    }
  };

  return (
    <Layout>
      <div className={`py-12 bg-white mt-12 border-b border-secondary-200 ${chatOpen ? 'blur' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-secondary-900 sm:text-3xl sm:truncate">
                My Profile
              </h1>
              <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-secondary-500">
                  {hasStartedProfile ? basicInfo.email : 'No profile information yet'}
                </div>
              </div>
            </div>
            <div className="mt-5 flex md:mt-0 md:ml-4">
              {renderProfileStatus()}
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${chatOpen ? 'blur-sm' : ''}`}>
        {hasStartedProfile ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      {/* <h3 className="text-lg font-medium leading-6 text-secondary-900">
                        Personal Information
                      </h3> */}
                      <div className="mt-5 border-t border-secondary-200">
                        <dl className="sm:divide-y sm:divide-secondary-200">
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-secondary-500">Full name</dt>
                            <dd className="mt-1 text-sm text-secondary-900 sm:mt-0 sm:col-span-2">
                              {basicInfo.fullName}
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-secondary-500">Email address</dt>
                            <dd className="mt-1 text-sm text-secondary-900 sm:mt-0 sm:col-span-2">
                              {basicInfo.email}
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-secondary-500">Country of citizenship</dt>
                            <dd className="mt-1 text-sm text-secondary-900 sm:mt-0 sm:col-span-2">
                              {basicInfo.citizenCountry.charAt(0).toUpperCase()}
                            </dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-secondary-500">Current residence</dt>
                            <dd className="mt-1 text-sm text-secondary-900 sm:mt-0 sm:col-span-2">
                              {basicInfo.residenceCountry.charAt(0).toUpperCase()}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium leading-6 text-secondary-900">
                        Profile Completion
                      </h3>
                      <div className="mt-5 space-y-4">
                        {navigationSteps.map((step) => {
                          const isStepCompleted = completedSteps[step.id];

                          return (
                            <div key={step.id} className="flex items-center">
                              <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-3 ${isStepCompleted
                                  ? 'bg-secondary-100 text-secondary-900 border border-secondary-200'
                                  : 'bg-secondary-100 text-secondary-500'
                                }`}>
                                {isStepCompleted ? (
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                ) : (
                                  <span className="text-xs font-medium">{navigationSteps.findIndex(s => s.id === step.id) + 1}</span>
                                )}
                              </div>
                              <div className="flex-grow">
                                <div className={`text-sm font-medium ${isStepCompleted ? 'text-secondary-900' : 'text-secondary-500'
                                  }`}>
                                  {step.title}
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border border-secondary-600 text-secondary-900 hover:bg-secondary-900 hover:text-white"
                                onClick={() => navigate(`/questionnaire/${step.id}`)}
                              >
                                
                                {isStepCompleted ? 'Update Info' : 'Complete now'}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
                {/* <CardFooter className="flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    className="border border-secondary-600 text-secondary-900 hover:bg-secondary-900 hover:text-white"
                    onClick={() => {
                      if (confirm('Are you sure you want to reset your profile? This cannot be undone.')) {
                        resetUserProfile();
                      }
                    }}
                  >
                    Reset Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-secondary-600 text-white bg-secondary-900 hover:bg-white hover:text-secondary-900 hover:border-secondary-900"
                    onClick={handleStartOrContinue}
                    leftIcon={<Edit className="h-4 w-4" />}
                  >
                    Edit Profile
                  </Button>
                </CardFooter> */}
              </Card>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Immigration Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {isComplete ? (
                    <div className="text-center py-6">
                      <Award className="h-12 w-12 text-secondary-900 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-secondary-900 mb-2">
                        Profile Complete!
                      </h3>
                      <p className="text-secondary-600 mb-4">
                        You've completed all the required information for your profile.
                      </p>
                      <Button
                        className="bg-secondary-900 text-white hover:bg-secondary-950"
                        onClick={() => navigate('/report')}
                        leftIcon={<FileText className="h-4 w-4" />}
                      >
                        View Your Report
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Star className="h-12 w-12 text-secondary-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-secondary-900 mb-2">
                        Profile Incomplete
                      </h3>
                      <p className="text-secondary-600 mb-4">
                        Complete your profile to receive a personalized immigration pathway report.
                      </p>
                      <Button 
                        className="bg-secondary-800 text-white hover:bg-secondary-950"
                        onClick={handleStartOrContinue}>
                        Continue Profile
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <div>
                    {/* <MessageCircle className="h-6 w-6 text-secondary-900 mb-2" /> */}
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">Have questions?</h3>
                    <p className="text-secondary-700 text-sm mb-3">
                      Get instant, personalized answers to all your immigration questions with MapleAI.
                    </p>
                    <Button
                      onClick={handleFindPathway}
                      variant='outline'
                      rightIcon={<ChevronRight className="h-5 w-5" />}
                      className="w-full bg-secondary-800 text-white justify-between hover:text-white hover:border hover:bg-secondary-950 hover:border-secondary-950"
                    >
                      Chat with MapleAI
                    </Button>
                  </div>
                </CardContent>
              </Card>


              <Card>
                <CardHeader>
                  <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li>
                      <a 
                        className="text-secondary-900 hover:text-secondary-950 font-medium flex items-center"
                        href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations.html" target="_blank">
                        <FileText className="h-4 w-4 mr-2" />
                        Latest Draw Results
                      </a>
                    </li>
                    <li>
                      <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html" target="_blank" className="text-secondary-900 hover:text-secondary-950 font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Provincial Nominee Programs
                      </a>
                    </li>
                    <li>
                      <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/check-score.html" target="_blank" className="text-secondary-900 hover:text-secondary-950 font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        CRS Score Calculator
                      </a>
                    </li>
                    <li>
                      <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html" target="_blank" className="text-secondary-900 hover:text-secondary-950 font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Processing Times
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 max-w-3xl mx-auto">
            <FileText className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Start Your Immigration Journey</h2>
            <p className="text-lg text-secondary-600 mb-8">
              Complete your profile to discover your personalized Canadian immigration pathways. Our AI-powered system will analyze your information and provide tailored recommendations.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('/questionnaire/basic')}
              leftIcon={<Edit className="h-5 w-5" />}
            >
              Create Your Profile
            </Button>
          </div>
        )}
      </div>
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
      <ChatBox
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
      />
    </Layout>
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

