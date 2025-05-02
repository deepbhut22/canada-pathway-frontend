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

const PROVINCE_OPTIONS = [
  { value: 'Alberta', label: 'Alberta' },
  { value: 'British Columbia', label: 'British Columbia' },
  { value: 'Manitoba', label: 'Manitoba' },
  { value: 'New Brunswick', label: 'New Brunswick' },
  { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador' },
  { value: 'Nova Scotia', label: 'Nova Scotia' },
  { value: 'Ontario', label: 'Ontario' },
  { value: 'Prince Edward Island', label: 'Prince Edward Island' },
  { value: 'Quebec', label: 'Quebec' },
  { value: 'Saskatchewan', label: 'Saskatchewan' },
  { value: 'Northwest Territories', label: 'Northwest Territories' },
  { value: 'Nunavut', label: 'Nunavut' },
  { value: 'Yukon', label: 'Yukon' }
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

    if (basicInfo.age === null) {
      newErrors.age = 'Age is required';
    } else if (basicInfo.age < 18 || basicInfo.age > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }
    
    if (!basicInfo.citizenCountry) {
      newErrors.citizenCountry = 'Please select your country of citizenship';
    }
    
    if (!basicInfo.residenceCountry) {
      newErrors.residenceCountry = 'Please select your country of residence';
    }

    if (basicInfo.residenceCountry === 'canada' && !basicInfo.province) {
      newErrors.province = 'Please select your province';
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
    
    if (name === 'age') {
      updateBasicInfo({ [name]: value ? parseInt(value) : null });
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
          <FormLabel htmlFor="age" required>Age</FormLabel>
          <FormControl>
            <Input
              id="age"
              name="age"
              type="number"
              value={basicInfo.age === null ? '' : String(basicInfo.age)}
              onChange={handleChange}
              placeholder="Enter your age"
              error={!!errors.age}
              min={18}
              max={100}
            />
          </FormControl>
          {errors.age && <div className="text-red-500 text-xs mt-1">{errors.age}</div>}
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

        {basicInfo.residenceCountry === 'canada' && (
          <FormGroup>
            <FormLabel htmlFor="province" required>Province/Territory</FormLabel>
            <FormControl>
              <Select
                id="province"
                name="province"
                value={basicInfo.province || ''}
                onChange={handleChange}
                options={PROVINCE_OPTIONS}
                placeholder="Select your province or territory"
                error={!!errors.province}
              />
            </FormControl>
            {errors.province && <div className="text-red-500 text-xs mt-1">{errors.province}</div>}
            <FormHelperText>Select the province or territory where you currently reside.</FormHelperText>
          </FormGroup>
        )}
      </FormSection>

      {/* <FormSection title="Financial Information" description="Information about your available funds for immigration.">
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
      </FormSection> */}
    </Form>
  );
}