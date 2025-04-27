import React, { useState } from 'react';
import { useUserStore } from '../../../store/userStore';
import { 
  Form,
  FormSection,
  FormGroup,
  FormLabel,
  FormControl,
  FormHelperText,
  Input,
  Select,
  Checkbox,
  RadioGroup
} from '../../ui/Form';

const COUNTRY_OPTIONS = [
  { value: 'afghanistan', label: 'Afghanistan' },
  { value: 'albania', label: 'Albania' },
  { value: 'algeria', label: 'Algeria' },
  { value: 'andorra', label: 'Andorra' },
  { value: 'india', label: 'India' },
  { value: 'usa', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'china', label: 'China' },
  { value: 'philippines', label: 'Philippines' },
  { value: 'nigeria', label: 'Nigeria' },
  { value: 'pakistan', label: 'Pakistan' },
  { value: 'brazil', label: 'Brazil' },
  { value: 'mexico', label: 'Mexico' },
  // Add more countries as needed
];

const RESIDENCE_OPTIONS = [
  { value: 'canada', label: 'Canada' },
  { value: 'usa', label: 'United States' },
  { value: 'other', label: 'Other' }
];

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other/Prefer not to say' }
];

export default function BasicInfo({
  onValidationChange
}: {
  onValidationChange: (isValid: boolean) => void;
}) {
  const { userProfile, updateBasicInfo } = useUserStore();
  const { basicInfo } = userProfile;

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!basicInfo.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!basicInfo.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(basicInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!basicInfo.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!basicInfo.citizenCountry) {
      newErrors.citizenCountry = 'Please select your country of citizenship';
    }
    
    if (!basicInfo.residenceCountry) {
      newErrors.residenceCountry = 'Please select your country of residence';
    }
    
    if (basicInfo.availableFunds === null) {
      newErrors.availableFunds = 'Please enter your available funds';
    } else if (basicInfo.availableFunds < 0) {
      newErrors.availableFunds = 'Available funds cannot be negative';
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  React.useEffect(() => {
    validateForm();
  }, [basicInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      updateBasicInfo({ [name]: checked });
    } else if (name === 'availableFunds') {
      updateBasicInfo({ [name]: value ? parseFloat(value) : null });
    } else {
      updateBasicInfo({ [name]: value });
    }
  };

  return (
    <Form>
      <FormSection title="Personal Information" description="Please provide your basic personal details.">
        <FormGroup>
          <FormLabel htmlFor="fullName" required>Full Name</FormLabel>
          <FormControl>
            <Input
              id="fullName"
              name="fullName"
              value={basicInfo.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={!!errors.fullName}
            />
          </FormControl>
          {errors.fullName && <div className="text-red-500 text-xs mt-1">{errors.fullName}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="email" required>Email Address</FormLabel>
          <FormControl>
            <Input
              id="email"
              name="email"
              type="email"
              value={basicInfo.email}
              disabled={true}
              onChange={handleChange}
              placeholder="your.email@example.com"
              error={!!errors.email}
              className='cursor-not-allowed bg-gray-100 text-gray-400'
            />
          </FormControl>
          {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
          <FormHelperText>We'll use this to send you updates about your immigration process.</FormHelperText>
        </FormGroup>

        <FormGroup>
          <FormLabel required>Gender</FormLabel>
          <FormControl>
            <RadioGroup
              name="gender"
              options={GENDER_OPTIONS}
              value={basicInfo.gender}
              onChange={handleChange}
              direction="horizontal"
            />
          </FormControl>
          {errors.gender && <div className="text-red-500 text-xs mt-1">{errors.gender}</div>}
        </FormGroup>
      </FormSection>

      <FormSection title="Citizenship & Residence" description="Information about your citizenship and current residence.">
        <FormGroup>
          <FormLabel htmlFor="citizenCountry" required>Country of Citizenship</FormLabel>
          <FormControl>
            <Select
              id="citizenCountry"
              name="citizenCountry"
              value={basicInfo.citizenCountry}
              onChange={handleChange}
              options={COUNTRY_OPTIONS}
              placeholder="Select your country of citizenship"
              error={!!errors.citizenCountry}
            />
          </FormControl>
          {errors.citizenCountry && <div className="text-red-500 text-xs mt-1">{errors.citizenCountry}</div>}
          <FormHelperText>The country where you currently hold citizenship.</FormHelperText>
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="residenceCountry" required>Current Country of Residence</FormLabel>
          <FormControl>
            <Select
              id="residenceCountry"
              name="residenceCountry"
              value={basicInfo.residenceCountry}
              onChange={handleChange}
              options={RESIDENCE_OPTIONS}
              placeholder="Select your current country of residence"
              error={!!errors.residenceCountry}
            />
          </FormControl>
          {errors.residenceCountry && <div className="text-red-500 text-xs mt-1">{errors.residenceCountry}</div>}
          <FormHelperText>The country where you are currently living.</FormHelperText>
        </FormGroup>
      </FormSection>

      <FormSection title="Immigration Factors" description="Additional factors that may affect your immigration application.">
        <FormGroup>
          <FormLabel htmlFor="admissibilityIssue">Admissibility Issues</FormLabel>
          <FormControl>
            <Checkbox
              id="admissibilityIssue"
              name="admissibilityIssue"
              checked={basicInfo.admissibilityIssue}
              onChange={handleChange}
              label="I have legal or medical conditions that might affect my admissibility to Canada"
            />
          </FormControl>
          <FormHelperText>
            This includes criminal history, security concerns, health conditions, or previous immigration issues.
          </FormHelperText>
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="residencyIntent">Residency Intent</FormLabel>
          <FormControl>
            <Checkbox
              id="residencyIntent"
              name="residencyIntent"
              checked={basicInfo.residencyIntent}
              onChange={handleChange}
              label="I intend to reside permanently in Canada after obtaining my immigration status"
            />
          </FormControl>
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="availableFunds" required>Available Settlement Funds (CAD)</FormLabel>
          <FormControl>
            <Input
              id="availableFunds"
              name="availableFunds"
              type="number"
              value={basicInfo.availableFunds === null ? '' : basicInfo.availableFunds.toString()}
              onChange={handleChange}
              placeholder="Enter amount in Canadian dollars"
              error={!!errors.availableFunds}
            />
          </FormControl>
          {errors.availableFunds && <div className="text-red-500 text-xs mt-1">{errors.availableFunds}</div>}
          <FormHelperText>
            The amount of money available for your settlement in Canada. This is an important factor for many immigration programs.
          </FormHelperText>
        </FormGroup>
      </FormSection>
    </Form>
  );
}