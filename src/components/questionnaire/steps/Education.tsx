import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../../store/userStore';
import type { Education } from '../../../types/index';
import { getProvinceOptions } from '../../../utils/helpers';
import { 
  Form,
  FormSection,
  FormGroup,
  FormLabel,
  FormControl,
  FormHelperText,
  Input,
  Select,
  RadioGroup,
  Checkbox
} from '../../ui/Form';
import Button from '../../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

const EDUCATION_TYPE_OPTIONS = [
  { value: '1 year program', label: '1 Year Post-Secondary Program' },
  { value: '2 year program', label: '2 Year Post-Secondary Program' },
  { value: '3 year program', label: '3 Year Post-Secondary Program' },
  { value: 'trade certificate', label: 'Trade Certificate' },
  { value: 'bachelor', label: "Bachelor's Degree" },
  { value: 'masters', label: "Master's Degree" },
  { value: 'phd', label: 'Doctorate (PhD)' }
];

const COUNTRY_OPTIONS = [
  { value: 'canada', label: 'Canada' },
  { value: 'other', label: 'Other Country' }
];

const YES_NO_OPTIONS = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' }
];

export default function Education({
  onValidationChange
}: {
  onValidationChange: (isValid: boolean) => void;
}) {
  const { userProfile, updateEducationInfo, addEducation, removeEducation } = useUserStore();
  const { educationInfo } = userProfile;
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newEducation, setNewEducation] = useState<Partial<Education>>({
    type: '',
    fieldOfStudy: '',
    country: '',
    province: '',
    inProgress: false,
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (educationInfo.hasHighSchool === null) {
      newErrors.hasHighSchool = 'Please indicate if you have completed high school';
    }
    
    if (educationInfo.hasHighSchool && educationInfo.hasPostSecondary === null) {
      newErrors.hasPostSecondary = 'Please indicate if you have post-secondary education';
    }
    
    if (educationInfo.hasPostSecondary && educationInfo.educationList.length === 0) {
      newErrors.educationList = 'Please add at least one post-secondary education';
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [educationInfo]);

  const handleHighSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hasHighSchool = e.target.value === 'true';
    updateEducationInfo({ 
      hasHighSchool,
      hasPostSecondary: hasHighSchool ? educationInfo.hasPostSecondary : false
    });
  };

  const handlePostSecondaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hasPostSecondary = e.target.value === 'true';
    updateEducationInfo({ hasPostSecondary });
  };

  const handleNewEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewEducation(prev => ({
        ...prev,
        [name]: checked,
        // endDate: checked ? '' : prev.endDate
      }));
    } else {
      setNewEducation(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddEducation = () => {
    if (newEducation.type && newEducation.country && newEducation.fieldOfStudy) {
      addEducation({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 8),
        type: newEducation.type as Education['type'],
        country: newEducation.country,
        province: newEducation.province,
        // startDate: newEducation.startDate,
        inProgress: newEducation.inProgress || false,
        // endDate: newEducation.endDate || '',
        fieldOfStudy: newEducation.fieldOfStudy!
      } as Education);
      
      setNewEducation({
        type: '',
        country: '',
        province: '',
        // startDate: '',
        inProgress: false,
        // endDate: ''
      });
    }
  };

  return (
    <Form>
      <FormSection 
        title="Educational Background" 
        description="Information about your educational qualifications and history."
      >
        <FormGroup>
          <FormLabel required>
            Have you completed high school or an equivalent education qualification?
          </FormLabel>
          <FormControl>
            <RadioGroup
              name="hasHighSchool"
              options={YES_NO_OPTIONS}
              value={educationInfo.hasHighSchool === null ? '' : educationInfo.hasHighSchool.toString()}
              onChange={handleHighSchoolChange}
              direction="horizontal"
            />
          </FormControl>
          {errors.hasHighSchool && (
            <div className="text-red-500 text-xs mt-1">{errors.hasHighSchool}</div>
          )}
          <FormHelperText>
            This includes secondary school, high school diploma, or equivalent qualification.
          </FormHelperText>
        </FormGroup>

        {educationInfo.hasHighSchool && (
          <FormGroup>
            <FormLabel required>
              Have you completed any post-secondary education?
            </FormLabel>
            <FormControl>
              <RadioGroup
                name="hasPostSecondary"
                options={YES_NO_OPTIONS}
                value={educationInfo.hasPostSecondary === null ? '' : educationInfo.hasPostSecondary.toString()}
                onChange={handlePostSecondaryChange}
                direction="horizontal"
              />
            </FormControl>
            {errors.hasPostSecondary && (
              <div className="text-red-500 text-xs mt-1">{errors.hasPostSecondary}</div>
            )}
            <FormHelperText>
              This includes college diplomas, university degrees, trade certificates, etc.
            </FormHelperText>
          </FormGroup>
        )}

        {educationInfo.hasPostSecondary && (
          <>
            <div className="border border-secondary-200 rounded-md p-4 mt-6 bg-secondary-50">
              <h3 className="text-lg font-medium mb-4">Add Post-Secondary Education</h3>
              
              <div className="space-y-4">
                <FormGroup>
                  <FormLabel htmlFor="type" required>Type of Education</FormLabel>
                  <FormControl>
                    <Select
                      id="type"
                      name="type"
                      value={newEducation.type}
                      onChange={handleNewEducationChange}
                      options={EDUCATION_TYPE_OPTIONS}
                      placeholder="Select education type"
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="type" required>Field of Education</FormLabel>
                  <FormControl>
                    <Input
                      id="fieldOfStudy"
                      name="fieldOfStudy"
                      value={newEducation.fieldOfStudy}
                      onChange={handleNewEducationChange}
                      // options={EDUCATION_TYPE_OPTIONS}
                      placeholder="Enter field of education"
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="country" required>Country of Institution</FormLabel>
                  <FormControl>
                    <Select
                      id="country"
                      name="country"
                      value={newEducation.country}
                      onChange={handleNewEducationChange}
                      options={COUNTRY_OPTIONS}
                      placeholder="Select country"
                    />
                  </FormControl>
                </FormGroup>

                {newEducation.country === 'canada' && (
                  <FormGroup>
                    <FormLabel htmlFor="province" required>Province</FormLabel>
                    <FormControl>
                      <Select
                        id="province"
                        name="province"
                        value={newEducation.province}
                        onChange={handleNewEducationChange}
                        options={getProvinceOptions()}
                        placeholder="Select province"
                      />
                    </FormControl>
                  </FormGroup>
                )}

                {/* <FormGroup>
                  <FormLabel htmlFor="startDate" required>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={newEducation.startDate}
                      onChange={handleNewEducationChange}
                    />
                  </FormControl>
                </FormGroup> */}

                <FormGroup>
                  <FormControl>
                    <Checkbox
                      id="inProgress"
                      name="inProgress"
                      checked={newEducation.inProgress}
                      onChange={handleNewEducationChange}
                      label="This program is still in progress"
                    />
                  </FormControl>
                </FormGroup>

                {/* {!newEducation.inProgress && (
                  <FormGroup>
                    <FormLabel htmlFor="endDate" required>End Date</FormLabel>
                    <FormControl>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={newEducation.endDate}
                        onChange={handleNewEducationChange}
                      />
                    </FormControl>
                  </FormGroup>
                )} */}

                <Button
                  onClick={handleAddEducation}
                  disabled={!newEducation.type || !newEducation.country || !newEducation.fieldOfStudy}
                  // leftIcon={<Plus className="h-4 w-4" />}
                >
                  Add Education
                </Button>
              </div>
            </div>

            {educationInfo.educationList.length > 0 && (
              <div 
              className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Added Education</h3>
                {educationInfo.educationList.map((education, idx) => (
                  <div 
                    key={`ed- ${idx}`} 
                    className="bg-white border border-secondary-200 rounded-md p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        {/* <h4 className="font-medium text-secondary-900">{education.type}</h4> */}
                        <h4 className="font-medium text-secondary-900">
                          {EDUCATION_TYPE_OPTIONS.find(opt => opt.value === education.type)?.label}
                        </h4>
                        <h4 className="font-medium text-secondary-900">{education.fieldOfStudy}</h4>
                        <p className="text-sm text-secondary-600">
                          {education.country === 'canada' 
                            ? `${getProvinceOptions().find(opt => opt.value === education.province)?.label}, Canada`
                            : 'Other Country'
                          }
                        </p>
                        <p className="text-sm text-secondary-500 mt-1">
                          {/* {new Date(education.startDate).toLocaleDateString()} - {' '} */}
                          {education.inProgress ? 'In Progress' : ''}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(education.id)}
                        leftIcon={<Trash2 className="h-4 w-4" />}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {errors.educationList && (
              <div className="text-red-500 text-xs mt-2">{errors.educationList}</div>
            )}
          </>
        )}
      </FormSection>
    </Form>
  );
}