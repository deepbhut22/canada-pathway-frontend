import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../../store/userStore';
import type { WorkExperience } from '../../../types/index';
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

const YES_NO_OPTIONS = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' }
];

const COUNTRY_OPTIONS = [
  { value: 'canada', label: 'Canada' },
  { value: 'other', label: 'Other Country' }
];

const WORK_PERMIT_OPTIONS = [
  { value: 'open', label: 'Open Work Permit' },
  { value: 'closed', label: 'Closed Work Permit' },
  { value: 'refugee', label: 'Refugee Work Permit' }
];

export default function Work({
  onValidationChange
}: {
  onValidationChange: (isValid: boolean) => void;
}) {
  const { userProfile, updateWorkInfo, addWorkExperience, removeWorkExperience } = useUserStore();
  const { workInfo } = userProfile;
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newWork, setNewWork] = useState<Partial<WorkExperience>>({
    jobTitle: '',
    isPaid: true,
    isSelfEmployed: false,
    hoursPerWeek: null as number | null,
    country: '',
    province: '',
    workPermitType: '',
    hasLMIA: false,
    nocCode: '',
    startDate: '',
    isCurrentJob: false,
    endDate: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (workInfo.hasWorkExperience === null) {
      newErrors.hasWorkExperience = 'Please indicate if you have work experience';
    }
    
    if (workInfo.hasWorkExperience && workInfo.workExperienceList.length === 0) {
      newErrors.workExperienceList = 'Please add at least one work experience';
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [workInfo]);

  const handleHasWorkExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hasWorkExperience = e.target.value === 'true';
    updateWorkInfo({ 
      hasWorkExperience,
      workExperienceList: hasWorkExperience ? workInfo.workExperienceList : []
    });
  };

  const handleNewWorkChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setNewWork(prev => ({
        ...prev,
        [name]: checked,
        endDate: name === 'isCurrentJob' && checked ? '' : prev.endDate
      }));
    } else if (type === 'number') {
      const numValue = value ? parseInt(value) : null;
      setNewWork(prev => ({ ...prev, [name]: numValue }));
    } else {
      setNewWork(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddWork = () => {
    // console.log({...newWork, ...userProfile.workInfo});

    if (
      newWork.jobTitle &&
      newWork.country &&
      newWork.startDate &&
      (newWork.isCurrentJob || newWork.endDate)
    ) {
      addWorkExperience({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 8),
        jobTitle: newWork.jobTitle,
        isPaid: newWork.isPaid || false,
        isSelfEmployed: newWork.isSelfEmployed || false,
        hoursPerWeek: newWork.hoursPerWeek || null,
        country: newWork.country,
        province: newWork.province,
        workPermitType: newWork.workPermitType as WorkExperience['workPermitType'],
        hasLMIA: newWork.hasLMIA || false,
        nocCode: newWork.nocCode || '',
        startDate: newWork.startDate,
        isCurrentJob: newWork.isCurrentJob || false,
        endDate: newWork.endDate || ''
      });
      // console.log("added");
      
      setNewWork({
        jobTitle: '',
        isPaid: true,
        isSelfEmployed: false,
        hoursPerWeek: null,
        country: '',
        province: '',
        workPermitType: '',
        hasLMIA: false,
        nocCode: '',
        startDate: '',
        isCurrentJob: false,
        endDate: ''
      });
    }
  };

  return (
    <Form>
      <FormSection 
        title="Work Experience" 
        description="Information about your work experience, both in Canada and abroad."
      >
        <FormGroup>
          <FormLabel required>Do you have any work experience?</FormLabel>
          <FormControl>
            <RadioGroup
              name="hasWorkExperience"
              options={YES_NO_OPTIONS}
              value={workInfo.hasWorkExperience === null ? '' : workInfo.hasWorkExperience.toString()}
              onChange={handleHasWorkExperienceChange}
              direction="horizontal"
            />
          </FormControl>
          {errors.hasWorkExperience && (
            <div className="text-red-500 text-xs mt-1">{errors.hasWorkExperience}</div>
          )}
          <FormHelperText>
            Work experience is an important factor in many immigration programs.
          </FormHelperText>
        </FormGroup>

        {workInfo.hasWorkExperience && (
          <>
            <div className="border border-secondary-200 rounded-md p-4 mt-6 bg-secondary-50">
              <h3 className="text-lg font-medium mb-4">Add Work Experience</h3>
              
              <div className="space-y-4">
                <FormGroup>
                  <FormLabel htmlFor="jobTitle" required>Occupation or Job Title</FormLabel>
                  <FormControl>
                    <Input
                      id="jobTitle"
                      name="jobTitle"
                      value={newWork.jobTitle}
                      onChange={handleNewWorkChange}
                      placeholder="Enter your job title"
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel required>Is / Was the job paid?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      name="isPaid"
                      options={YES_NO_OPTIONS}
                      value={newWork.isPaid ? 'true' : 'false'}
                      onChange={handleNewWorkChange}
                      direction="horizontal"
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel required>Are you self-employed?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      name="isSelfEmployed"
                      options={YES_NO_OPTIONS}
                      value={newWork.isSelfEmployed ? 'true' : 'false'}
                      onChange={handleNewWorkChange}
                      direction="horizontal"
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="hoursPerWeek" required>Hours per Week</FormLabel>
                  <FormControl>
                    <Input
                      id="hoursPerWeek"
                      name="hoursPerWeek"
                      type="number"
                      min="0"
                      max="168"
                      value={newWork.hoursPerWeek || ''}
                      onChange={handleNewWorkChange}
                      placeholder="Enter hours per week"
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="country" required>Country of Employment</FormLabel>
                  <FormControl>
                    <Select
                      id="country"
                      name="country"
                      value={newWork.country}
                      onChange={handleNewWorkChange}
                      options={COUNTRY_OPTIONS}
                      placeholder="Select country"
                    />
                  </FormControl>
                </FormGroup>

                {newWork.country === 'canada' && (
                  <>
                    <FormGroup>
                      <FormLabel htmlFor="province" required>Province</FormLabel>
                      <FormControl>
                        <Select
                          id="province"
                          name="province"
                          value={newWork.province}
                          onChange={handleNewWorkChange}
                          options={getProvinceOptions()}
                          placeholder="Select province"
                        />
                      </FormControl>
                    </FormGroup>

                    <FormGroup>
                      <FormLabel htmlFor="workPermitType" required>Work Permit Type</FormLabel>
                      <FormControl>
                        <Select
                          id="workPermitType"
                          name="workPermitType"
                          value={newWork.workPermitType}
                          onChange={handleNewWorkChange}
                          options={WORK_PERMIT_OPTIONS}
                          placeholder="Select work permit type"
                        />
                      </FormControl>
                    </FormGroup>
                  </>
                )}

                <FormGroup>
                  <FormLabel required>Does this job have an LMIA?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      name="hasLMIA"
                      options={YES_NO_OPTIONS}
                      value={newWork.hasLMIA ? 'true' : 'false'}
                      onChange={handleNewWorkChange}
                      direction="horizontal"
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="nocCode" required>NOC Code</FormLabel>
                  <FormControl>
                    <Input
                      id="nocCode"
                      name="nocCode"
                      value={newWork.nocCode}
                      onChange={handleNewWorkChange}
                      placeholder="Enter NOC code"
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="startDate" required>Start Date</FormLabel>
                  <FormControl>
                    <Input
                      id="startDate"
                      name="startDate"
                      type="date"
                      value={newWork.startDate}
                      onChange={handleNewWorkChange}
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormControl>
                    <Checkbox
                      id="isCurrentJob"
                      name="isCurrentJob"
                      checked={newWork.isCurrentJob}
                      onChange={handleNewWorkChange}
                      label="This is my current job"
                    />
                  </FormControl>
                </FormGroup>

                {!newWork.isCurrentJob && (
                  <FormGroup>
                    <FormLabel htmlFor="endDate" required>End Date</FormLabel>
                    <FormControl>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={newWork.endDate}
                        onChange={handleNewWorkChange}
                      />
                    </FormControl>
                  </FormGroup>
                )}

                <Button
                  onClick={handleAddWork}
                  disabled={!newWork.jobTitle || !newWork.country || !newWork.startDate || (!newWork.isCurrentJob && !newWork.endDate)}
                  // leftIcon={<Plus className="h-4 w-4" />}
                >
                  Add Work Experience
                </Button>
              </div>
            </div>

            {workInfo.workExperienceList.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Added Work Experience</h3>
                {workInfo.workExperienceList.map((work) => (
                  <div 
                    key={work.id} 
                    className="bg-white border border-secondary-200 rounded-md p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-secondary-600">
                          Job Title: {work.jobTitle}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Payment: {work.isPaid ? 'Paid' : 'Unpaid'}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Self-employed: {work.isSelfEmployed ? 'Yes' : 'No'}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Hours per Week: {work.hoursPerWeek}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Country: {work.country === 'canada' ? 'Canada' : 'Other Country'}
                        </p>
                        {work.country === 'canada' && (
                          <>
                            <p className="text-sm text-secondary-600">
                              Province: {work.province}
                            </p>
                            <p className="text-sm text-secondary-600">
                              Work Permit: {WORK_PERMIT_OPTIONS.find(opt => opt.value === work.workPermitType)?.label}
                            </p>
                          </>
                        )}
                        <p className="text-sm text-secondary-600">
                          LMIA: {work.hasLMIA ? 'Yes' : 'No'}
                        </p>
                        <p className="text-sm text-secondary-600">
                          NOC Code: {work.nocCode}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Period: {new Date(work.startDate).toLocaleDateString()} - {work.isCurrentJob ? 'Present' : new Date(work.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWorkExperience(work.id)}
                        leftIcon={<Trash2 className="h-4 w-4" />}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {errors.workExperienceList && (
              <div className="text-red-500 text-xs mt-2">{errors.workExperienceList}</div>
            )}
          </>
        )}
      </FormSection>
    </Form>
  );
} 