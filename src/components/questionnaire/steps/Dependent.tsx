import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../../store/userStore';
import type { Dependent } from '../../../types/index'
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
import Button from '../../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

const YES_NO_OPTIONS = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' }
];

const COUNTRY_OPTIONS = [
  { value: 'canada', label: 'Canada' },
  { value: 'other', label: 'Other Country' }
];

const RESIDENCY_STATUS_OPTIONS = [
  { value: 'permanent residence', label: 'Permanent Resident' },
  { value: 'work permit', label: 'Work Permit' },
  { value: 'student permit', label: 'Student Permit' },
  { value: 'citizen', label: 'Canadian Citizen' },
  { value: 'refugee', label: 'Refugee' }
];

export default function Dependent({
  onValidationChange
}: {
  onValidationChange: (isValid: boolean) => void;
}) {
  const { userProfile, updateDependentInfo, addDependent, removeDependent } = useUserStore();
  const { dependentInfo } = userProfile;
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newDependent, setNewDependent] = useState<Partial<Dependent>>({
    age: 0,
    citizenCountry: '',
    residenceCountry: '',
    residencyStatus: '',
    relationship: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (dependentInfo.hasDependents === null) {
      newErrors.hasDependents = 'Please indicate if you have any dependents';
    }
    
    if (dependentInfo.hasDependents && dependentInfo.dependentList.length === 0) {
      newErrors.dependentList = 'Please add at least one dependent';
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [dependentInfo]);

  const handleHasDependentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hasDependents = e.target.value === 'true';
    updateDependentInfo({ 
      hasDependents,
      dependentList: hasDependents ? dependentInfo.dependentList : []
    });
  };

  const handleNewDependentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDependent(prev => ({ ...prev, [name]: value }));
  };

  const handleAddDependent = () => {
    if (
      newDependent.age &&
      newDependent.citizenCountry &&
      newDependent.residenceCountry &&
      (newDependent.residenceCountry !== 'canada' || newDependent.residencyStatus)
    ) {
      addDependent({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 8),
        relationship: newDependent.relationship!,
        age: newDependent.age,
        citizenCountry: newDependent.citizenCountry,
        residenceCountry: newDependent.residenceCountry,
        residencyStatus: newDependent.residencyStatus as Dependent['residencyStatus']
      });
      
      setNewDependent({
        age: 0,
        citizenCountry: '',
        residenceCountry: '',
        residencyStatus: ''
      });
    }
  };

  const RELATIONSHIP_OPTIONS = [
    { value: 'child', label: 'Child' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'parent', label: 'Parent' },
    { value: 'grandparent', label: 'Grandparent' },
    { value: 'in-law', label: 'In-Law' },
    { value: 'first cousin', label: 'First Cousin' }
  ];

  return (
    <Form>
      <FormSection 
        title="Dependent Information" 
        description="Information about your dependent children who may accompany you to Canada."
      >
        <FormGroup>
          <FormLabel required>Do you have any dependent children?</FormLabel>
          <FormControl>
            <RadioGroup
              name="hasDependents"
              options={YES_NO_OPTIONS}
              value={dependentInfo.hasDependents === null ? '' : dependentInfo.hasDependents.toString()}
              onChange={handleHasDependentsChange}
              direction="horizontal"
            />
          </FormControl>
          {errors.hasDependents && (
            <div className="text-red-500 text-xs mt-1">{errors.hasDependents}</div>
          )}
          <FormHelperText>
            A dependent child is generally under 22 years old and unmarried, or dependent on their parents due to a physical or mental condition.
          </FormHelperText>
        </FormGroup>

        {dependentInfo.hasDependents && (
          <>
            <div className="border border-secondary-200 rounded-md p-4 mt-6 bg-secondary-50">
              <h3 className="text-lg font-medium mb-4">Add Dependent</h3>
              <div className="space-y-4">
              <FormGroup>
                <FormLabel htmlFor="type" required>Relationship</FormLabel>
                <FormControl>
                  <Select
                    id="relationship"
                    name="relationship"
                    value={newDependent.relationship}
                    options={RELATIONSHIP_OPTIONS}
                    onChange={handleNewDependentChange}
                    placeholder="Enter relationship"
                  />
                </FormControl>
              </FormGroup>
                <FormGroup>
                  <FormLabel htmlFor="age" required>Age</FormLabel>
                  <FormControl>
                    <Input
                      id="age"
                      name="age"
                      type="number"   
                      value={newDependent.age}
                      onChange={handleNewDependentChange}
                    />
                  </FormControl>
                </FormGroup>
                {/* <div className="space-y-4"></div> */}
                <FormGroup>
                  <FormLabel htmlFor="citizenCountry" required>Country of Citizenship</FormLabel>
                  <FormControl>
                    <Select
                      id="citizenCountry"
                      name="citizenCountry"
                      value={newDependent.citizenCountry}
                      onChange={handleNewDependentChange}
                      options={COUNTRY_OPTIONS}
                      placeholder="Select country"
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="residenceCountry" required>Current Country of Residence</FormLabel>
                  <FormControl>
                    <Select
                      id="residenceCountry"
                      name="residenceCountry"
                      value={newDependent.residenceCountry}
                      onChange={handleNewDependentChange}
                      options={COUNTRY_OPTIONS}
                      placeholder="Select country"
                    />
                  </FormControl>
                </FormGroup>

                {newDependent.residenceCountry === 'canada' && (
                  <FormGroup>
                    <FormLabel htmlFor="residencyStatus" required>Current Status in Canada</FormLabel>
                    <FormControl>
                      <Select
                        id="residencyStatus"
                        name="residencyStatus"
                        value={newDependent.residencyStatus}
                        onChange={handleNewDependentChange}
                        options={RESIDENCY_STATUS_OPTIONS}
                        placeholder="Select status"
                      />
                    </FormControl>
                  </FormGroup>
                )}

                <Button
                  onClick={handleAddDependent}
                  disabled={!newDependent.age || !newDependent.citizenCountry || !newDependent.residenceCountry}
                  leftIcon={<Plus className="h-4 w-4" />}
                >
                  Add Dependent
                </Button>
              </div>
            </div>

            {dependentInfo.dependentList.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Added Dependents</h3>
                {dependentInfo.dependentList.map((dependent) => (
                  <div 
                    key={dependent.id} 
                    className="bg-white border border-secondary-200 rounded-md p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-secondary-600">
                          Age: {dependent.age}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Citizenship: {dependent.citizenCountry === 'canada' ? 'Canada' : 'Other Country'}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Residence: {dependent.residenceCountry === 'canada' ? 'Canada' : 'Other Country'}
                          {dependent.residenceCountry === 'canada' && ` (${
                            RESIDENCY_STATUS_OPTIONS.find(opt => opt.value === dependent.residencyStatus)?.label
                          })`}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDependent(dependent.id)}
                        leftIcon={<Trash2 className="h-4 w-4" />}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {errors.dependentList && (
              <div className="text-red-500 text-xs mt-2">{errors.dependentList}</div>
            )}
          </>
        )}
      </FormSection>
    </Form>
  );
}