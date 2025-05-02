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

      if (!languageInfo.primaryLanguageTest.testDate) {
        newErrors.testDate = 'Please enter your test date';
      }

      // For English test, validate all four scores
      if (languageInfo.primaryLanguage === 'english') {
        const scores = [
          'readingScore',
          'writingScore',
          'speakingScore',
          'listeningScore'
        ];

        scores.forEach(score => {
          if (languageInfo.primaryLanguageTest[score] === null) {
            newErrors[score] = 'Please enter your score';
          }
        });
      }
      // For French test, validate if the minimum score question is answered
      else if (languageInfo.primaryLanguage === 'french') {
        if (languageInfo.primaryLanguageTest.meetsMinimumScore === undefined) {
          newErrors.meetsMinimumScore = 'Please indicate if you meet the minimum score requirement';
        }
      }
    }

    if (languageInfo.hasSecondLanguage && languageInfo.secondLanguageTest.type) {
      // Check if second language test type is selected
      if (!languageInfo.secondLanguageTest.type) {
        newErrors.secondLanguageTest = 'Please select a language test for your second language';
      }

      if (!languageInfo.secondLanguageTest.testDate) {
        newErrors.secondTestDate = 'Please enter your test date';
      }

      // For second language that is French, validate minimum score
      if (isFrenchTest(languageInfo.secondLanguageTest.type)) {
        if (languageInfo.secondLanguageTest.meetsMinimumScore === undefined) {
          newErrors.secondMeetsMinimumScore = 'Please indicate if you meet the minimum score requirement';
        }
      }
      // For second language that is English, validate all four scores if provided
      else {
        const scores = [
          'readingScore',
          'writingScore',
          'speakingScore',
          'listeningScore'
        ];

        scores.forEach(score => {
          if (languageInfo.secondLanguageTest[score] === null) {
            newErrors[`second${score.charAt(0).toUpperCase() + score.slice(1)}`] = 'Please enter your score';
          }
        });
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
    // For French, only include necessary fields
    if (selectedLanguage === 'french') {
      updateLanguageInfo({
        primaryLanguage: selectedLanguage,
        primaryLanguageTest: {
          type: '',
          testDate: '',
          meetsMinimumScore: undefined
        }
      });
    } else {
      // For English, include all score fields
      updateLanguageInfo({
        primaryLanguage: selectedLanguage,
        primaryLanguageTest: {
          type: '',
          testDate: '',
          readingScore: null,
          writingScore: null,
          speakingScore: null,
          listeningScore: null
        }
      });
    }
  };

  const handleHasTakenTestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hasTakenTest = e.target.value === 'true';
    updateLanguageInfo({ hasTakenTest });
  };

  const handlePrimaryTestChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Special handling for French test's minimum score question
    if (name === 'meetsMinimumScore') {
      updateLanguageInfo({
        primaryLanguageTest: {
          ...languageInfo.primaryLanguageTest,
          meetsMinimumScore: value === 'true'
        }
      });
    }
    // For test type changes, reset appropriate fields based on language
    else if (name === 'type') {
      if (languageInfo.primaryLanguage === 'french') {
        updateLanguageInfo({
          primaryLanguageTest: {
            ...languageInfo.primaryLanguageTest,
            type: value,
            // Remove score fields for French tests
            readingScore: undefined,
            writingScore: undefined,
            speakingScore: undefined,
            listeningScore: undefined
          }
        });
      } else {
        updateLanguageInfo({
          primaryLanguageTest: {
            ...languageInfo.primaryLanguageTest,
            type: value,
            // Ensure score fields exist for English tests
            readingScore: languageInfo.primaryLanguageTest.readingScore || null,
            writingScore: languageInfo.primaryLanguageTest.writingScore || null,
            speakingScore: languageInfo.primaryLanguageTest.speakingScore || null,
            listeningScore: languageInfo.primaryLanguageTest.listeningScore || null
          }
        });
      }
    }
    // For other fields (test date for French, or any English test field)
    else {
      updateLanguageInfo({
        primaryLanguageTest: {
          ...languageInfo.primaryLanguageTest,
          [name]: name.includes('Score') ? (value ? parseFloat(value) : null) : value
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

    // Special handling for French test's minimum score question
    if (name === 'meetsMinimumScore') {
      updateLanguageInfo({
        secondLanguageTest: {
          ...languageInfo.secondLanguageTest,
          meetsMinimumScore: value === 'true'
        }
      });
    }
    // For test type changes, reset appropriate fields based on selected test
    else if (name === 'type') {
      const isFrench = isFrenchTest(value);

      if (isFrench) {
        // For French tests, remove individual score fields
        updateLanguageInfo({
          secondLanguageTest: {
            ...languageInfo.secondLanguageTest,
            type: value,
            // Remove score fields for French tests
            readingScore: undefined,
            writingScore: undefined,
            speakingScore: undefined,
            listeningScore: undefined
          }
        });
      } else {
        // For English tests, ensure score fields exist
        updateLanguageInfo({
          secondLanguageTest: {
            ...languageInfo.secondLanguageTest,
            type: value,
            // Ensure score fields exist for English tests
            readingScore: languageInfo.secondLanguageTest.readingScore || null,
            writingScore: languageInfo.secondLanguageTest.writingScore || null,
            speakingScore: languageInfo.secondLanguageTest.speakingScore || null,
            listeningScore: languageInfo.secondLanguageTest.listeningScore || null,
            // Remove minimum score field if switching from French to English
            meetsMinimumScore: undefined
          }
        });
      }
    }
    // For other fields (test date or English test fields)
    else {
      updateLanguageInfo({
        secondLanguageTest: {
          ...languageInfo.secondLanguageTest,
          [name]: name.includes('Score') ? (value ? parseFloat(value) : null) : value
        }
      });
    }
  };

  // Helper function to check if the test is French
  const isFrenchTest = (testType: string) => {
    return testType === 'TEF' || testType === 'TCF';
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

            <FormGroup>
              <FormLabel htmlFor="testDate" required>Test Date</FormLabel>
              <FormControl>
                <Input
                  id="testDate"
                  name="testDate"
                  type="date"
                  value={languageInfo.primaryLanguageTest.testDate}
                  onChange={handlePrimaryTestChange}
                  error={!!errors.testDate}
                />
              </FormControl>
              {errors.testDate && <div className="text-red-500 text-xs mt-1">{errors.testDate}</div>}
              <FormHelperText>Language test results are valid for 2 years.</FormHelperText>
            </FormGroup>

            {/* Display different form fields based on language */}
            {languageInfo.primaryLanguage === 'english' ? (
              // English test - display four score fields
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormGroup>
                  <FormLabel htmlFor="readingScore" required>Reading Score</FormLabel>
                  <FormControl>
                    <Input
                      id="readingScore"
                      name="readingScore"
                      type="number"
                      step="0.5"
                      min="0"
                      value={languageInfo.primaryLanguageTest.readingScore === null ? '' : languageInfo.primaryLanguageTest.readingScore.toString()}
                      onChange={handlePrimaryTestChange}
                      error={!!errors.readingScore}
                    />
                  </FormControl>
                  {errors.readingScore && <div className="text-red-500 text-xs mt-1">{errors.readingScore}</div>}
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="writingScore" required>Writing Score</FormLabel>
                  <FormControl>
                    <Input
                      id="writingScore"
                      name="writingScore"
                      type="number"
                      step="0.5"
                      min="0"
                      value={languageInfo.primaryLanguageTest.writingScore === null ? '' : languageInfo.primaryLanguageTest.writingScore.toString()}
                      onChange={handlePrimaryTestChange}
                      error={!!errors.writingScore}
                    />
                  </FormControl>
                  {errors.writingScore && <div className="text-red-500 text-xs mt-1">{errors.writingScore}</div>}
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="speakingScore" required>Speaking Score</FormLabel>
                  <FormControl>
                    <Input
                      id="speakingScore"
                      name="speakingScore"
                      type="number"
                      step="0.5"
                      min="0"
                      value={languageInfo.primaryLanguageTest.speakingScore === null ? '' : languageInfo.primaryLanguageTest.speakingScore.toString()}
                      onChange={handlePrimaryTestChange}
                      error={!!errors.speakingScore}
                    />
                  </FormControl>
                  {errors.speakingScore && <div className="text-red-500 text-xs mt-1">{errors.speakingScore}</div>}
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="listeningScore" required>Listening Score</FormLabel>
                  <FormControl>
                    <Input
                      id="listeningScore"
                      name="listeningScore"
                      type="number"
                      step="0.5"
                      min="0"
                      value={languageInfo.primaryLanguageTest.listeningScore === null ? '' : languageInfo.primaryLanguageTest.listeningScore.toString()}
                      onChange={handlePrimaryTestChange}
                      error={!!errors.listeningScore}
                    />
                  </FormControl>
                  {errors.listeningScore && <div className="text-red-500 text-xs mt-1">{errors.listeningScore}</div>}
                </FormGroup>
              </div>
            ) : (
              // French test - display single question about minimum score
              <FormGroup className="mt-4">
                <FormLabel required>Did you achieve a minimum score of 7 in all 4 language abilities on the Niveaux de compétence linguistique canadiens?</FormLabel>
                <FormControl>
                  <RadioGroup
                    name="meetsMinimumScore"
                    options={YES_NO_OPTIONS}
                    value={languageInfo.primaryLanguageTest.meetsMinimumScore === undefined
                      ? ''
                      : languageInfo?.primaryLanguageTest?.meetsMinimumScore?.toString()}
                    onChange={handlePrimaryTestChange}
                    direction="horizontal"
                    // error={!!errors.meetsMinimumScore}
                  />
                </FormControl>
                {errors.meetsMinimumScore && <div className="text-red-500 text-xs mt-1">{errors.meetsMinimumScore}</div>}
                <FormHelperText>
                  This refers to your scores in Reading, Writing, Speaking, and Listening abilities.
                </FormHelperText>
              </FormGroup>
            )}
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

            <FormGroup>
              <FormLabel htmlFor="secondTestDate">Test Date</FormLabel>
              <FormControl>
                <Input
                  id="secondTestDate"
                  name="testDate"
                  type="date"
                  value={languageInfo.secondLanguageTest.testDate}
                  onChange={handleSecondTestChange}
                />
              </FormControl>
            </FormGroup>

            {/* Conditionally render based on second language test type */}
            {(languageInfo.primaryLanguage === 'english' && isFrenchTest(languageInfo.secondLanguageTest.type)) ? (
              // French as second language - display single question about minimum score
              <FormGroup className="mt-4">
                <FormLabel required>Did you achieve a minimum score of 7 in all 4 language abilities on the Niveaux de compétence linguistique canadiens?</FormLabel>
                <FormControl>
                  <RadioGroup
                    name="meetsMinimumScore"
                    options={YES_NO_OPTIONS}
                    value={languageInfo.secondLanguageTest.meetsMinimumScore === undefined
                      ? ''
                      : languageInfo?.secondLanguageTest?.meetsMinimumScore?.toString()}
                    onChange={handleSecondTestChange}
                    direction="horizontal"
                  />
                </FormControl>
                {errors.secondMeetsMinimumScore && <div className="text-red-500 text-xs mt-1">{errors.secondMeetsMinimumScore}</div>}
                <FormHelperText>
                  This refers to your scores in Reading, Writing, Speaking, and Listening abilities.
                </FormHelperText>
              </FormGroup>
            ) : (
              // English as second language - display four score fields
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormGroup>
                  <FormLabel htmlFor="secondReadingScore">Reading Score</FormLabel>
                  <FormControl>
                    <Input
                      id="secondReadingScore"
                      name="readingScore"
                      type="number"
                      step="0.5"
                      min="0"
                      value={languageInfo.secondLanguageTest.readingScore === null ? '' : languageInfo.secondLanguageTest.readingScore.toString()}
                      onChange={handleSecondTestChange}
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="secondWritingScore">Writing Score</FormLabel>
                  <FormControl>
                    <Input
                      id="secondWritingScore"
                      name="writingScore"
                      type="number"
                      step="0.5"
                      min="0"
                      value={languageInfo.secondLanguageTest.writingScore === null ? '' : languageInfo.secondLanguageTest.writingScore.toString()}
                      onChange={handleSecondTestChange}
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="secondSpeakingScore">Speaking Score</FormLabel>
                  <FormControl>
                    <Input
                      id="secondSpeakingScore"
                      name="speakingScore"
                      type="number"
                      step="0.5"
                      min="0"
                      value={languageInfo.secondLanguageTest.speakingScore === null ? '' : languageInfo.secondLanguageTest.speakingScore.toString()}
                      onChange={handleSecondTestChange}
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="secondListeningScore">Listening Score</FormLabel>
                  <FormControl>
                    <Input
                      id="secondListeningScore"
                      name="listeningScore"
                      type="number"
                      step="0.5"
                      min="0"
                      value={languageInfo.secondLanguageTest.listeningScore === null ? '' : languageInfo.secondLanguageTest.listeningScore.toString()}
                      onChange={handleSecondTestChange}
                    />
                  </FormControl>
                </FormGroup>
              </div>
            )}
          </div>
        )}
      </FormSection>
    </Form>
  );
}