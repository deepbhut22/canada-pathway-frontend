import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../../store/userStore';
import { 
  Form,
  FormSection,
  FormGroup,
  FormLabel,
  FormControl,
  FormHelperText,
  Select,
  RadioGroup
} from '../../ui/Form';

const MARITAL_STATUS_OPTIONS = [
  { value: 'married', label: 'Married' },
  { value: 'single', label: 'Single' }
];

const YES_NO_OPTIONS = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' }
];

const EDUCATION_LEVEL_OPTIONS = [
  { value: 'trade', label: 'Trade or Apprentice Certification' },
  { value: 'professional', label: 'Professional Degree (Medicine, Law, Veterinary Medicine)' },
  { value: 'bachelor', label: "Bachelor's Degree" },
  { value: 'multiple', label: 'Two or More Certificates/Diplomas/Degrees (one must be 3+ years)' },
  { value: 'certificate', label: 'Non-University Certificate or Diploma' },
  { value: 'masters', label: "Master's Degree" },
  { value: 'doctorate', label: 'Doctorate or PhD' }
];

export default function Spouse({
  onValidationChange
}: {
  onValidationChange: (isValid: boolean) => void;
}) {
  const { userProfile, updateSpouseInfo } = useUserStore();
  const { spouseInfo } = userProfile;
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!spouseInfo.maritalStatus) {
      newErrors.maritalStatus = 'Please select your marital status';
    }
    
    if (spouseInfo.maritalStatus === 'married') {
      if (spouseInfo.hasCanadianWorkExp === null) {
        newErrors.hasCanadianWorkExp = 'Please indicate if your spouse has Canadian work experience';
      }
      
      if (spouseInfo.hasCanadianStudyExp === null) {
        newErrors.hasCanadianStudyExp = 'Please indicate if your spouse has Canadian study experience';
      }
      
      if (spouseInfo.hasRelativeInCanada === null) {
        newErrors.hasRelativeInCanada = 'Please indicate if your spouse has relatives in Canada';
      }
      
      if (!spouseInfo.educationLevel) {
        newErrors.educationLevel = "Please select your spouse's highest education level";
      }
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [spouseInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'maritalStatus') {
      if (value === 'single') {
        // Reset spouse-related fields if user selects 'single'
        updateSpouseInfo({
          maritalStatus: 'single',
          hasCanadianWorkExp: false,
          hasCanadianStudyExp: false,
          hasRelativeInCanada: false,
          educationLevel: ''
        });
      } else {
        updateSpouseInfo({ maritalStatus: value as 'married' | 'single' });
      }
    } else if (['hasCanadianWorkExp', 'hasCanadianStudyExp', 'hasRelativeInCanada'].includes(name)) {
      updateSpouseInfo({ [name]: value === 'true' });
    } else {
      updateSpouseInfo({ [name]: value });
    }
  };

  return (
    <Form>
      <FormSection 
        title="Spouse Information" 
        description="Details about your marital status and spouse's qualifications if applicable."
      >
        <FormGroup>
          <FormLabel htmlFor="maritalStatus" required>What is your marital status?</FormLabel>
          <FormControl>
            <RadioGroup
              name="maritalStatus"
              options={MARITAL_STATUS_OPTIONS}
              value={spouseInfo.maritalStatus}
              onChange={handleChange}
              direction="horizontal"
            />
          </FormControl>
          {errors.maritalStatus && (
            <div className="text-red-500 text-xs mt-1">{errors.maritalStatus}</div>
          )}
          <FormHelperText>
            Your marital status affects your eligibility for certain immigration programs.
          </FormHelperText>
        </FormGroup>

        {spouseInfo.maritalStatus === 'married' && (
          <div className="mt-6 space-y-6">
            <FormGroup>
              <FormLabel required>Does your spouse have any Canadian work experience?</FormLabel>
              <FormControl>
                <RadioGroup
                  name="hasCanadianWorkExp"
                  options={YES_NO_OPTIONS}
                  value={spouseInfo.hasCanadianWorkExp === null ? '' : spouseInfo.hasCanadianWorkExp.toString()}
                  onChange={handleChange}
                  direction="horizontal"
                />
              </FormControl>
              {errors.hasCanadianWorkExp && (
                <div className="text-red-500 text-xs mt-1">{errors.hasCanadianWorkExp}</div>
              )}
              <FormHelperText>
                Work experience in Canada can add points to your immigration profile.
              </FormHelperText>
            </FormGroup>

            <FormGroup>
              <FormLabel required>Has your spouse studied in Canada?</FormLabel>
              <FormControl>
                <RadioGroup
                  name="hasCanadianStudyExp"
                  options={YES_NO_OPTIONS}
                  value={spouseInfo.hasCanadianStudyExp === null ? '' : spouseInfo.hasCanadianStudyExp.toString()}
                  onChange={handleChange}
                  direction="horizontal"
                />
              </FormControl>
              {errors.hasCanadianStudyExp && (
                <div className="text-red-500 text-xs mt-1">{errors.hasCanadianStudyExp}</div>
              )}
              <FormHelperText>
                Canadian education can improve your chances for immigration.
              </FormHelperText>
            </FormGroup>

            <FormGroup>
              <FormLabel required>Does your spouse have any relatives in Canada?</FormLabel>
              <FormControl>
                <RadioGroup
                  name="hasRelativeInCanada"
                  options={YES_NO_OPTIONS}
                  value={spouseInfo.hasRelativeInCanada === null ? '' : spouseInfo.hasRelativeInCanada.toString()}
                  onChange={handleChange}
                  direction="horizontal"
                />
              </FormControl>
              {errors.hasRelativeInCanada && (
                <div className="text-red-500 text-xs mt-1">{errors.hasRelativeInCanada}</div>
              )}
              <FormHelperText>
                Having relatives in Canada might qualify you for family sponsorship programs.
              </FormHelperText>
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="educationLevel" required>What is your spouse's highest level of education?</FormLabel>
              <FormControl>
                <Select
                  id="educationLevel"
                  name="educationLevel"
                  value={spouseInfo.educationLevel}
                  onChange={handleChange}
                  options={EDUCATION_LEVEL_OPTIONS}
                  placeholder="Select education level"
                  error={!!errors.educationLevel}
                />
              </FormControl>
              {errors.educationLevel && (
                <div className="text-red-500 text-xs mt-1">{errors.educationLevel}</div>
              )}
              <FormHelperText>
                Your spouse's education level can affect your eligibility and points for various immigration programs.
              </FormHelperText>
            </FormGroup>
          </div>
        )}
      </FormSection>
    </Form>
  );
}