import { create } from 'zustand';
import { 
  UserProfile, BasicInfo, LanguageInfo, EducationInfo, 
  SpouseInfo, DependentInfo, ConnectionInfo, WorkInfo, JobOfferInfo,
  Education, Dependent, WorkExperience
} from '../types';

const defaultBasicInfo: BasicInfo = {
  fullName: '',
  email: '',
  gender: '',
  age: null,
  citizenCountry: '',
  residenceCountry: '',
  province: '',
  mobileNumber: ''
};

const defaultLanguageInfo: LanguageInfo = {
  primaryLanguage: '',
  hasTakenTest: false,
  primaryLanguageTest: {
    type: '',
    clbScore: 0
  },
  hasSecondLanguage: false,
  secondLanguageTest: {
    type: '',
    clbScore: 0
  }
};

const defaultEducationInfo: EducationInfo = {
  hasHighSchool: false,
  hasPostSecondary: false,
  educationList: []
};

const defaultSpouseInfo: SpouseInfo = {
  maritalStatus: '',
  hasCanadianWorkExp: false,
  hasCanadianStudyExp: false,
  hasRelativeInCanada: false,
  educationLevel: ''
};

const defaultDependentInfo: DependentInfo = {
  hasDependents: false,
  dependentList: []
};

const defaultConnectionInfo: ConnectionInfo = {
  // hasConnections: false,
  // connectionList: []
  doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident: ''
};

const defaultWorkInfo: WorkInfo = {
  hasWorkExperience: '',
  workExperienceList: []
};

const defaultJobOfferInfo: JobOfferInfo = {
  hasJobOffer: false,
  jobOffer: {
    jobTitle: '',
    nocCode: '',
    // isPaid: false,
    // hoursPerWeek: null,
    province: '',
    // isLMIA: false,
    startDate: '',
    // hasEndDate: false,
    // endDate: '',
    teer: 0
  }
};

const initialUserProfile: UserProfile = {
  basicInfo: defaultBasicInfo,
  languageInfo: defaultLanguageInfo,  
  educationInfo: defaultEducationInfo,
  spouseInfo: defaultSpouseInfo,
  dependentInfo: defaultDependentInfo,
  connectionInfo: defaultConnectionInfo,
  workInfo: defaultWorkInfo,
  jobOfferInfo: defaultJobOfferInfo,
  isComplete: false
};

interface UserState {
  userProfile: UserProfile;
  updateBasicInfo: (info: Partial<BasicInfo>) => void;
  updateLanguageInfo: (info: Partial<LanguageInfo>) => void;
  updateEducationInfo: (info: Partial<EducationInfo>) => void;
  addEducation: (education: Education) => void;
  removeEducation: (id: string) => void;
  updateSpouseInfo: (info: Partial<SpouseInfo>) => void;
  updateDependentInfo: (info: Partial<DependentInfo>) => void;
  addDependent: (dependent: Dependent) => void;
  removeDependent: (id: string) => void;
  updateConnectionInfo: (info: boolean) => void;
  // addConnection: (connection: Connection) => void;
  // removeConnection: (id: string) => void;
  updateWorkInfo: (info: Partial<WorkInfo>) => void;
  addWorkExperience: (workExperience: WorkExperience) => void;
  removeWorkExperience: (id: string) => void;
  updateJobOfferInfo: (info: Partial<JobOfferInfo>) => void;
  setProfileComplete: (isComplete: boolean) => void;
  resetUserProfile: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  userProfile: initialUserProfile,
  
  updateBasicInfo: (info) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      basicInfo: { ...state.userProfile.basicInfo, ...info }
    }
  })),
  
  updateLanguageInfo: (info) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      languageInfo: { ...state.userProfile.languageInfo, ...info }
    }
  })),
  
  updateEducationInfo: (info) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      educationInfo: { ...state.userProfile.educationInfo, ...info }
    }
  })),
  
  addEducation: (education) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      educationInfo: {
        ...state.userProfile.educationInfo,
        educationList: [...state.userProfile.educationInfo.educationList, education]
      }
    }
  })),
  
  removeEducation: (id) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      educationInfo: {
        ...state.userProfile.educationInfo,
        educationList: state.userProfile.educationInfo.educationList.filter(
          (edu) => edu.id !== id
        )
      }
    }
  })),
  
  updateSpouseInfo: (info) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      spouseInfo: { ...state.userProfile.spouseInfo, ...info }
    }
  })),
  
  updateDependentInfo: (info) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      dependentInfo: { ...state.userProfile.dependentInfo, ...info }
    }
  })),
  
  addDependent: (dependent) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      dependentInfo: {
        ...state.userProfile.dependentInfo,
        dependentList: [...state.userProfile.dependentInfo.dependentList, dependent]
      }
    }
  })),
  
  removeDependent: (id) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      dependentInfo: {
        ...state.userProfile.dependentInfo,
        dependentList: state.userProfile.dependentInfo.dependentList.filter(
          (dep) => dep.id !== id
        )
      }
    }
  })),
  
  updateConnectionInfo: (info: boolean) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      connectionInfo: { doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident: info }
    }
  })),
  
  // addConnection: (connection) => set((state) => ({
  //   userProfile: {
  //     ...state.userProfile,
  //     connectionInfo: {
  //       ...state.userProfile.connectionInfo,
  //       connectionList: [...state.userProfile.connectionInfo.connectionList, connection]
  //     }
  //   }
  // })),
  
  // removeConnection: (id) => set((state) => ({
  //   userProfile: {
  //     ...state.userProfile,
  //     connectionInfo: {
  //       ...state.userProfile.connectionInfo,
  //       connectionList: state.userProfile.connectionInfo.connectionList.filter(
  //         (conn) => conn.id !== id
  //       )
  //     }
  //   }
  // })),
  
  updateWorkInfo: (info) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      workInfo: { ...state.userProfile.workInfo, ...info }
    }
  })),
  
  addWorkExperience: (workExperience) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      workInfo: {
        ...state.userProfile.workInfo,
        workExperienceList: [...state.userProfile.workInfo.workExperienceList, workExperience]
      }
    }
  })),
  
  removeWorkExperience: (id) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      workInfo: {
        ...state.userProfile.workInfo,
        workExperienceList: state.userProfile.workInfo.workExperienceList.filter(
          (work) => work.id !== id
        )
      }
    }
  })),
  
  updateJobOfferInfo: (info) => set((state) => ({
    userProfile: {
      ...state.userProfile,
      jobOfferInfo: { ...state.userProfile.jobOfferInfo, ...info }
    }
  })),
  
  setProfileComplete: (isComplete) => set((state) => ({
    userProfile: { ...state.userProfile, isComplete }
  })),
  
  resetUserProfile: () => set({ userProfile: initialUserProfile })
}));