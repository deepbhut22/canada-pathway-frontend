import React, { useState, useEffect } from 'react';
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

const LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'french', label: 'French' }
];

const ENGLISH_TEST_OPTIONS = [
  { value: 'IELTS', label: 'IELTS (International English Language Testing System)' },
  { value: 'CELPIP', label: 'CELPIP (Canadian English Language Proficiency Index Program)' },
  { value: 'PTE', label: 'PTE (Pearson Test of English)' }
];

const FRENCH_TEST_OPTIONS = [
  { value: 'TEF', label: 'TEF (Test d\'évaluation de français)' },
  { value: 'TCF', label: 'TCF (Test de connaissance du français)' }
];

const YES_NO_OPTIONS = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' }
];

export default function Language({
  onValidationChange
}: {
  onValidationChange: (isValid: boolean) => void;
}) {
  const { userProfile, updateLanguageInfo } = useUserStore();
  const { languageInfo } = userProfile;

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!languageInfo.primaryLanguage) {
      newErrors.primaryLanguage = 'Please select your primary language';
    }

    if (languageInfo.hasTakenTest) {
      if (!languageInfo.primaryLanguageTest.type) {
        newErrors.primaryLanguageTest = 'Please select a language test';
      }

      if (languageInfo.primaryLanguageTest.clbScore === null) {
        newErrors.primaryClbScore = 'Please enter your CLB score';
      }
    }

    if (languageInfo.hasSecondLanguage) {
      if (!languageInfo.secondLanguageTest.type) {
        newErrors.secondLanguageTest = 'Please select a language test for your second language';
      }

      if (languageInfo.secondLanguageTest.clbScore === null) {
        newErrors.secondClbScore = 'Please enter your CLB score';
      }
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange(isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [languageInfo]);

  const handlePrimaryLanguageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const selectedLanguage = e.target.value as 'english' | 'french' | '';

    // Reset test information when changing primary language
    updateLanguageInfo({
      primaryLanguage: selectedLanguage,
      primaryLanguageTest: {
        type: '',
        clbScore: 0
      },
      hasSecondLanguage: false,
      secondLanguageTest: {
        type: '',
        clbScore: 0
      }
    });
  };

  const handleHasTakenTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hasTakenTest = e.target.value === 'true';
    updateLanguageInfo({ hasTakenTest });
  };

  const handlePrimaryTestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // For test type changes, reset CLB score
    if (name === 'type') {
      updateLanguageInfo({
        primaryLanguageTest: {
          ...languageInfo.primaryLanguageTest,
          type: value as "" | "IELTS" | "CELPIP" | "PTE" | "TEF" | "TCF",
          clbScore: 0
        }
      });
    } else if (name === 'clbScore') {
      updateLanguageInfo({
        primaryLanguageTest: {
          ...languageInfo.primaryLanguageTest,
          clbScore: value ? parseInt(value, 10) : 0
        }
      });
    } else {
      // For other fields like test date
      updateLanguageInfo({
        primaryLanguageTest: {
          ...languageInfo.primaryLanguageTest,
          [name]: value
        }
      });
    }
  };

  const handleHasSecondLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hasSecondLanguage = e.target.value === 'true';
    updateLanguageInfo({ hasSecondLanguage });
  };

  const handleSecondTestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // For test type changes, reset CLB score
    if (name === 'type') {
      updateLanguageInfo({
        secondLanguageTest: {
          // ...languageInfo.secondLanguageTest,
          type: value as "" | "IELTS" | "CELPIP" | "PTE" | "TEF" | "TCF",
          clbScore: 0
        }
      });
    } else if (name === 'clbScore') {
      updateLanguageInfo({
        secondLanguageTest: {
          ...languageInfo.secondLanguageTest,
          clbScore: value ? parseInt(value, 10) : null
        }
      });
    } 
    // else {
    //   // For other fields like test date
    //   updateLanguageInfo({
    //     secondLanguageTest: {
    //       ...languageInfo.secondLanguageTest,
    //       [name]: value
    //     }
    //   });
    // }
  };

  return (
    <Form>
      <FormSection title="Language Proficiency" description="Information about your language skills in English and/or French.">
        <FormGroup>
          <FormLabel htmlFor="primaryLanguage" required>Primary Language</FormLabel>
          <FormControl>
            <Select
              id="primaryLanguage"
              name="primaryLanguage"
              value={languageInfo.primaryLanguage}
              onChange={handlePrimaryLanguageChange}
              options={LANGUAGE_OPTIONS}
              placeholder="Select your primary language"
              error={!!errors.primaryLanguage}
            />
          </FormControl>
          {errors.primaryLanguage && <div className="text-red-500 text-xs mt-1">{errors.primaryLanguage}</div>}
          <FormHelperText>
            Your strongest official language for communication (English or French).
          </FormHelperText>
        </FormGroup>

        <FormGroup>
          <FormLabel required>Have you taken a language test for your primary language?</FormLabel>
          <FormControl>
            <RadioGroup
              name="hasTakenTest"
              options={YES_NO_OPTIONS}
              value={languageInfo.hasTakenTest ? 'true' : 'false'}
              onChange={handleHasTakenTestChange}
              direction="horizontal"
            />
          </FormControl>
          <FormHelperText>
            Most immigration programs require official language test results for English or French.
          </FormHelperText>
        </FormGroup>

        {languageInfo.hasTakenTest && (
          <div className="border border-secondary-200 rounded-md p-4 mt-4 bg-secondary-50">
            <FormGroup>
              <FormLabel htmlFor="type" required>Language Test Type</FormLabel>
              <FormControl>
                <Select
                  id="type"
                  name="type"
                  value={languageInfo.primaryLanguageTest.type}
                  onChange={handlePrimaryTestChange}
                  options={languageInfo.primaryLanguage === 'english' ? ENGLISH_TEST_OPTIONS : FRENCH_TEST_OPTIONS}
                  placeholder="Select your language test"
                  error={!!errors.primaryLanguageTest}
                />
              </FormControl>
              {errors.primaryLanguageTest && <div className="text-red-500 text-xs mt-1">{errors.primaryLanguageTest}</div>}
            </FormGroup>

            {/* <FormGroup>
              <FormLabel htmlFor="testDate" required>Test Date</FormLabel>
              <FormControl>
                <Input
                  id="testDate"
                  name="testDate"
                  type="date"
                  value={languageInfo.primaryLanguageTest.testDate || ''}
                  onChange={handlePrimaryTestChange}
                  error={!!errors.testDate}
                />
              </FormControl>
              {errors.testDate && <div className="text-red-500 text-xs mt-1">{errors.testDate}</div>}
              <FormHelperText>Language test results are valid for 2 years.</FormHelperText>
            </FormGroup> */}

            <FormGroup>
              <FormLabel htmlFor="clbScore" required>Canadian Language Benchmark (CLB) Score</FormLabel>
              <FormControl>
                <Input
                  id="clbScore"
                  name="clbScore"
                  type="number"
                  min="0"
                  max="10"
                  value={languageInfo.primaryLanguageTest.clbScore === null ? '' : languageInfo?.primaryLanguageTest?.clbScore?.toString()}
                  onChange={handlePrimaryTestChange}
                  error={!!errors.primaryClbScore}
                />
              </FormControl>
              {errors.primaryClbScore && <div className="text-red-500 text-xs mt-1">{errors.primaryClbScore}</div>}
              <FormHelperText>
                Enter your CLB score (0-12). This is a standardized score based on your test results.
              </FormHelperText>
            </FormGroup>
          </div>
        )}

        <FormGroup className="mt-6">
          <FormLabel>Would you like to add details of your second language?</FormLabel>
          <FormControl>
            <RadioGroup
              name="hasSecondLanguage"
              options={YES_NO_OPTIONS}
              value={languageInfo.hasSecondLanguage ? 'true' : 'false'}
              onChange={handleHasSecondLanguageChange}
              direction="horizontal"
            />
          </FormControl>
          <FormHelperText>
            Having proficiency in both English and French can improve your chances for Canadian immigration.
          </FormHelperText>
        </FormGroup>

        {languageInfo.hasSecondLanguage && (
          <div className="border border-secondary-200 rounded-md p-4 mt-4 bg-secondary-50">
            <h3 className="text-lg font-medium mb-4">Second Language Details</h3>

            <FormGroup>
              <FormLabel htmlFor="secondType" required>Language Test Type</FormLabel>
              <FormControl>
                <Select
                  id="secondType"
                  name="type"
                  value={languageInfo.secondLanguageTest.type}
                  onChange={handleSecondTestChange}
                  options={languageInfo.primaryLanguage === 'french' ? ENGLISH_TEST_OPTIONS : FRENCH_TEST_OPTIONS}
                  placeholder="Select your language test"
                  error={!!errors.secondLanguageTest}
                />
              </FormControl>
              {errors.secondLanguageTest && <div className="text-red-500 text-xs mt-1">{errors.secondLanguageTest}</div>}
            </FormGroup>

            {/* <FormGroup>
              <FormLabel htmlFor="secondTestDate">Test Date</FormLabel>
              <FormControl>
                <Input
                  id="secondTestDate"
                  name="testDate"
                  type="date"
                  value={languageInfo.secondLanguageTest.testDate || ''}
                  onChange={handleSecondTestChange}
                />
              </FormControl>
            </FormGroup> */}

            <FormGroup>
              <FormLabel htmlFor="secondClbScore" required>Canadian Language Benchmark (CLB) Score</FormLabel>
              <FormControl>
                <Input
                  id="secondClbScore"
                  name="clbScore"
                  type="number"
                  min="0"
                  max="10"
                  value={languageInfo.secondLanguageTest.clbScore === null ? '' : languageInfo.secondLanguageTest.clbScore?.toString()}
                  onChange={handleSecondTestChange}
                  error={!!errors.secondClbScore}
                />
              </FormControl>
              {errors.secondClbScore && <div className="text-red-500 text-xs mt-1">{errors.secondClbScore}</div>}
              <FormHelperText>
                Enter your CLB score (0-12) for your second language.
              </FormHelperText>
            </FormGroup>
          </div>
        )}
      </FormSection>
    </Form>
  );
}