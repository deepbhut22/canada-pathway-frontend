import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../../store/userStore';
import type { JobOffer } from '../../../types/index';
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
  Checkbox,
  SearchSelect
} from '../../ui/Form';
import { getNocOptions } from '../../../utils/dummyData';

const YES_NO_OPTIONS = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' }
];

export default function JobOffer({
  onValidationChange
}: {
  onValidationChange: (isValid: boolean) => void;
}) {
  const { userProfile, updateJobOfferInfo } = useUserStore();
  const { jobOfferInfo } = userProfile;
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const jobOffer = jobOfferInfo.jobOffer;
  // const [jobOffer, setJobOffer] = useState<JobOffer>(jobOfferObj || {
  //   jobTitle: '',
  //   nocCode: '',
  //   isPaid: true,
  //   hoursPerWeek: null,
  //   province: '',
  //   isLMIA: false,
  //   startDate: '',
  //   hasEndDate: false,
  //   endDate: '',
  //   tier: 0
  // });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (jobOfferInfo.hasJobOffer === null) {
      newErrors.hasJobOffer = 'Please indicate if you have a Canadian job offer';
    }
    
    if (jobOfferInfo.hasJobOffer) {
      if (!jobOffer.jobTitle) {
        newErrors.jobTitle = 'Please enter the job title';
      }
      if (!jobOffer.nocCode) {
        newErrors.nocCode = 'Please enter the NOC code';
      }
      // if (!jobOffer.hoursPerWeek) {
      //   newErrors.hoursPerWeek = 'Please enter hours per week';
      // }
      if (!jobOffer.province) {
        newErrors.province = 'Please select the province';
      }
      if (!jobOffer.startDate) {
        newErrors.startDate = 'Please enter the start date';
      }
      // if (jobOffer.hasEndDate && !jobOffer.endDate) {
      //   newErrors.endDate = 'Please enter the end date';
      // }
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [jobOfferInfo, jobOffer]);

  const handleHasJobOfferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hasJobOffer = e.target.value === 'true';
    updateJobOfferInfo({ 
      hasJobOffer,
      jobOffer: hasJobOffer ? jobOffer : {
        jobTitle: '',
        nocCode: '',
        // isPaid: true,
        // hoursPerWeek: null,
        province: '',
        // isLMIA: false,
        startDate: '',
        // hasEndDate: false,
        // endDate: '',
        tier: 0
      }
    });
  };

  const handleJobOfferChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | any) => {
    const { name, value, type } = e.target || {};
    // console.log(jobOfferInfo.jobOffer);
    

    // Handle SearchSelect component selection
    if (name === 'nocCode' && typeof value === 'object' && value !== null) {
      // When selecting an item from SearchSelect
      if (value) {
        updateJobOfferInfo({
          hasJobOffer: jobOfferInfo.hasJobOffer,
          jobOffer: {
            ...jobOffer,
            nocCode: value.noc,
            jobTitle: value.title,
            tier: value.tier
          }
        });
      }
      // When clearing the selection
      else {
        updateJobOfferInfo({
          hasJobOffer: jobOfferInfo.hasJobOffer,
          jobOffer: {
            ...jobOffer,
            nocCode: '',
            jobTitle: '',
            tier: 0
          }
        });
      }
      return;
    }

    // Handle other form inputs
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      updateJobOfferInfo({
        hasJobOffer: jobOfferInfo.hasJobOffer,
        jobOffer: {
          ...jobOffer,
          [name]: checked,
          // endDate: name === 'hasEndDate' && !checked ? '' : jobOffer.endDate
        }
      });
    } else if (type === 'number') {
      updateJobOfferInfo({
        hasJobOffer: jobOfferInfo.hasJobOffer,
        jobOffer: {
          ...jobOffer,
          [name]: value ? parseInt(value) : null
        }
      });
    } else {
      updateJobOfferInfo({
        hasJobOffer: jobOfferInfo.hasJobOffer,
        jobOffer: {
          ...jobOffer,
          [name]: value
        }
      });
    }
  };


  return (
    <Form>
      <FormSection 
        title="Canadian Job Offer" 
        description="Information about your job offer in Canada, if applicable."
      >
        <FormGroup>
          <FormLabel required>Do you have a Canadian job offer?</FormLabel>
          <FormControl>
            <RadioGroup
              name="hasJobOffer"
              options={YES_NO_OPTIONS}
              value={jobOfferInfo.hasJobOffer === null ? '' : jobOfferInfo.hasJobOffer.toString()}
              onChange={handleHasJobOfferChange}
              direction="horizontal"
            />
          </FormControl>
          {errors.hasJobOffer && (
            <div className="text-red-500 text-xs mt-1">{errors.hasJobOffer}</div>
          )}
          <FormHelperText>
            A valid job offer can significantly improve your chances for immigration.
          </FormHelperText>
        </FormGroup>

        {jobOfferInfo.hasJobOffer && (
          <div className="mt-6 space-y-4">

            <SearchSelect
              items={getNocOptions()}
              value={jobOffer.nocCode ? {
                title: jobOffer.jobTitle || '',
                tier: (jobOffer.tier || 0).toString(),
                noc: jobOffer.nocCode || ''
              } : null}
              onChange={(value) => handleJobOfferChange({
                target: {
                  name: 'nocCode',
                  value: value
                }
              })}
              label="Search Your Job Title And NOC Code"
              placeholder="Search By Job Title"
              name="nocCode"
            />


            {/* <FormGroup>
              <FormLabel htmlFor="jobTitle" required>Job Title / Occupation</FormLabel>
              <FormControl>
                <Input
                  id="jobTitle"
                  name="jobTitle"
                  value={jobOffer.jobTitle}
                  onChange={handleJobOfferChange}
                  placeholder="Enter the type of job"
                />
              </FormControl>
              {errors.jobTitle && (
                <div className="text-red-500 text-xs mt-1">{errors.jobTitle}</div>
              )}
            </FormGroup> */}

            <FormGroup>
              <FormLabel htmlFor="nocCode" required>NOC Code</FormLabel>
              <FormControl>
                <Input
                  id="nocCode"
                  name="nocCode"
                  value={jobOffer.nocCode}
                  disabled={true}
                  className='bg-gray-100 text-gray-500 cursor-not-allowed'
                  onChange={handleJobOfferChange}
                  placeholder="Enter NOC code"
                />
              </FormControl>
              {errors.nocCode && (
                <div className="text-red-500 text-xs mt-1">{errors.nocCode}</div>
              )}
            </FormGroup>

            {/* <FormGroup>
              <FormLabel required>Will the job be paid?</FormLabel>
              <FormControl>
                <RadioGroup
                  name="isPaid"
                  options={YES_NO_OPTIONS}
                  value={jobOffer.isPaid ? 'true' : 'false'}
                  onChange={handleJobOfferChange}
                  direction="horizontal"
                />
              </FormControl>
            </FormGroup> */}

            {/* <FormGroup>
              <FormLabel htmlFor="hoursPerWeek" required>Hours per Week</FormLabel>
              <FormControl>
                <Input
                  id="hoursPerWeek"
                  name="hoursPerWeek"
                  type="number"
                  min="0"
                  max="168"
                  value={jobOffer.hoursPerWeek || ''}
                  onChange={handleJobOfferChange}
                  placeholder="Enter hours per week"
                />
              </FormControl>
              {errors.hoursPerWeek && (
                <div className="text-red-500 text-xs mt-1">{errors.hoursPerWeek}</div>
              )}
            </FormGroup> */}

            <FormGroup>
              <FormLabel htmlFor="province" required>Province of Employment</FormLabel>
              <FormControl>
                <Select
                  id="province"
                  name="province"
                  value={jobOffer.province}
                  onChange={handleJobOfferChange}
                  options={getProvinceOptions()}
                  placeholder="Select province"
                />
              </FormControl>
              {errors.province && (
                <div className="text-red-500 text-xs mt-1">{errors.province}</div>
              )}
            </FormGroup>

            {/* <FormGroup>
              <FormLabel required>Is this job LMIA exempt?</FormLabel>
              <FormControl>
                <RadioGroup
                  name="isLMIA"
                  options={YES_NO_OPTIONS}
                  value={jobOffer.isLMIA ? 'true' : 'false'}
                  onChange={handleJobOfferChange}
                  direction="horizontal"
                />
              </FormControl>
            </FormGroup> */}

            <FormGroup>
              <FormLabel htmlFor="startDate" required>Start Date (If this job offer is of your current job then enter today's date)</FormLabel>
              <FormControl>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={jobOffer.startDate}
                  onChange={handleJobOfferChange}
                />
              </FormControl>
              {errors.startDate && (
                <div className="text-red-500 text-xs mt-1">{errors.startDate}</div>
              )}
            </FormGroup>

            {/* <FormGroup>
              <FormControl>
                <Checkbox
                  id="hasEndDate"
                  name="hasEndDate"
                  checked={jobOffer.hasEndDate}
                  onChange={handleJobOfferChange}
                  label="This job offer has an end date"
                />
              </FormControl>
            </FormGroup> */}

            {/* {jobOffer.hasEndDate && (
              <FormGroup>
                <FormLabel htmlFor="endDate" required>End Date</FormLabel>
                <FormControl>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={jobOffer.endDate}
                    onChange={handleJobOfferChange}
                  />
                </FormControl>
                {errors.endDate && (
                  <div className="text-red-500 text-xs mt-1">{errors.endDate}</div>
                )}
              </FormGroup>
            )} */}
          </div>
        )}
      </FormSection>
    </Form>
  );
} 