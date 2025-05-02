import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../../store/userStore';

// import { getProvinceOptions } from '../../../utils/helpers';
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
// import Button from '../../ui/Button';
// import { Plus, Trash2 } from 'lucide-react';

const YES_NO_OPTIONS = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' }
];

// const RELATIONSHIP_OPTIONS = [
//   { value: 'child', label: 'Child' },
//   { value: 'sibling', label: 'Sibling' },
//   { value: 'parent', label: 'Parent' },
//   { value: 'grandparent', label: 'Grandparent' },
//   { value: 'in-law', label: 'In-Law' },
//   { value: 'first cousin', label: 'First Cousin' }
// ];

// const RESIDENCY_STATUS_OPTIONS = [
//   { value: 'permanent residence', label: 'Permanent Resident' },
//   { value: 'work permit', label: 'Work Permit' },
//   { value: 'student permit', label: 'Student Permit' },
//   { value: 'citizen', label: 'Canadian Citizen' },
//   { value: 'refugee', label: 'Refugee' }
// ];

export default function Connection({
  onValidationChange
}: {
  onValidationChange: (isValid: boolean) => void;
}) {
  const { userProfile, updateConnectionInfo } = useUserStore();
  const { connectionInfo } = userProfile;
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (connectionInfo?.doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident === null) {
      newErrors.doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident = 'Please indicate if you have any family members in Canada';
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [connectionInfo]);

  const handleHasConnectionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hasConnections = e.target.value === 'true';
    updateConnectionInfo(hasConnections);
  };

  return (
    <Form>
      <FormSection 
        title="Family Connections in Canada" 
        description="Information about your family members who are currently in Canada."
      >
        <FormGroup>
          <FormLabel required>Do you have any family members (Siblings Only) in Canada who is Canadian citizen or permanent resident?</FormLabel>
          <FormControl>
            <RadioGroup
              name="hasConnections"
              options={YES_NO_OPTIONS}
              value={connectionInfo?.doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident === null ? '' : connectionInfo?.doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident!.toString()}
              onChange={handleHasConnectionsChange}
              direction="horizontal"
            />
          </FormControl>
          {errors.doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident && (
            <div className="text-red-500 text-xs mt-1">{errors.doesUserHaveFamilyInCanadaWhoIsCitizenOrPermanentResident}</div>
          )}
          <FormHelperText>
            Having family members in Canada can affect your eligibility for certain immigration programs.
          </FormHelperText>
        </FormGroup>
      </FormSection>
    </Form>
  );
} 