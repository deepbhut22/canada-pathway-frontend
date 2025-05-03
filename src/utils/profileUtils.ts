import { UserProfile } from '../types';

export const isProfileComplete = (profile: UserProfile): boolean => {
  const {
    basicInfo,
    educationInfo,
    workInfo,
    languageInfo,
    spouseInfo,
    dependentInfo,
    connectionInfo,
    jobOfferInfo
  } = profile;

  // Check basic info completeness
  const basicComplete = !!(
    basicInfo.fullName &&
    basicInfo.email &&
    basicInfo.citizenCountry &&
    basicInfo.residenceCountry
  );

  // Education checks
  const educationComplete = !!(
    (typeof educationInfo.hasHighSchool === 'boolean') &&
    (typeof educationInfo.hasPostSecondary === 'boolean') &&
    (!educationInfo.hasPostSecondary ||
      (educationInfo.hasPostSecondary && educationInfo.educationList.length > 0))
  );

  // Work experience checks
  const workComplete = !!(
    (typeof workInfo.hasWorkExperience === 'boolean') &&
    (!workInfo.hasWorkExperience ||
      (workInfo.hasWorkExperience && workInfo.workExperienceList.length > 0))
  );

  // Language checks
  const languageComplete = !!(
    languageInfo.primaryLanguage &&
    (typeof languageInfo.hasTakenTest === 'boolean') &&
    (!languageInfo.hasTakenTest ||
      (languageInfo.hasTakenTest &&
        languageInfo.primaryLanguageTest.type &&
        languageInfo.primaryLanguageTest.testDate)) &&
    (typeof languageInfo.hasSecondLanguage === 'boolean') &&
    (!languageInfo.hasSecondLanguage ||
      (languageInfo.hasSecondLanguage &&
        languageInfo.secondLanguageTest.type &&
        languageInfo.secondLanguageTest.testDate))
  );

  // Spouse checks
  const spouseComplete = !!(
    spouseInfo.maritalStatus &&
    (spouseInfo.maritalStatus !== 'married' ||
      (typeof spouseInfo.hasCanadianWorkExp === 'boolean' &&
        typeof spouseInfo.hasCanadianStudyExp === 'boolean' &&
        typeof spouseInfo.hasRelativeInCanada === 'boolean' &&
        spouseInfo.educationLevel))
  );

  // Dependent checks
  const dependentComplete = !!(
    (typeof dependentInfo.hasDependents === 'boolean') &&
    (!dependentInfo.hasDependents ||
      (dependentInfo.hasDependents && dependentInfo.dependentList.length > 0))
  );

  // Connection checks
  const connectionComplete = !!(
    (typeof connectionInfo?.doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident === 'boolean')
  );

  // Job offer checks
  const jobOfferComplete = !!(
    (typeof jobOfferInfo.hasJobOffer === 'boolean') &&
    (!jobOfferInfo.hasJobOffer ||
      (jobOfferInfo.hasJobOffer &&
        jobOfferInfo.jobOffer.jobTitle &&
        jobOfferInfo.jobOffer.nocCode &&
        jobOfferInfo.jobOffer.province &&
        jobOfferInfo.jobOffer.startDate
      ))
  );

  return !!(
    basicComplete &&
    educationComplete &&
    workComplete &&
    languageComplete &&
    spouseComplete &&
    dependentComplete &&
    connectionComplete &&
    jobOfferComplete
  );
}; 