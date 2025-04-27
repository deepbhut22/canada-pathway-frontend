import React, { useState, useEffect } from 'react';
import { useUserStore } from '../../../store/userStore';
import type { Connection } from '../../../types/index';
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
  RadioGroup
} from '../../ui/Form';
import Button from '../../ui/Button';
import { Plus, Trash2 } from 'lucide-react';

const YES_NO_OPTIONS = [
  { value: 'true', label: 'Yes' },
  { value: 'false', label: 'No' }
];

const RELATIONSHIP_OPTIONS = [
  { value: 'child', label: 'Child' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'parent', label: 'Parent' },
  { value: 'grandparent', label: 'Grandparent' },
  { value: 'in-law', label: 'In-Law' },
  { value: 'first cousin', label: 'First Cousin' }
];

const RESIDENCY_STATUS_OPTIONS = [
  { value: 'permanent residence', label: 'Permanent Resident' },
  { value: 'work permit', label: 'Work Permit' },
  { value: 'student permit', label: 'Student Permit' },
  { value: 'citizen', label: 'Canadian Citizen' },
  { value: 'refugee', label: 'Refugee' }
];

export default function Connection({
  onValidationChange
}: {
  onValidationChange: (isValid: boolean) => void;
}) {
  const { userProfile, updateConnectionInfo, addConnection, removeConnection } = useUserStore();
  const { connectionInfo } = userProfile;
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newConnection, setNewConnection] = useState<Partial<Connection>>({
    relationship: '',
    // dateOfBirth: '',
    residencyStatus: '',
    province: '',
    residencyStartDate: ''
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (connectionInfo.hasConnections === null) {
      newErrors.hasConnections = 'Please indicate if you have any family members in Canada';
    }
    
    if (connectionInfo.hasConnections && connectionInfo.connectionList.length === 0) {
      newErrors.connectionList = 'Please add at least one family member';
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
    updateConnectionInfo({ 
      hasConnections,
      connectionList: hasConnections ? connectionInfo.connectionList : []
    });
  };

  const handleNewConnectionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewConnection(prev => ({ ...prev, [name]: value }));

    console.log({...newConnection, ...userProfile.connectionInfo});
  };

  const handleAddConnection = () => {
    if (
      newConnection.relationship &&
      //newConnection.dateOfBirth &&
      newConnection.residencyStatus &&
      newConnection.province &&
      newConnection.residencyStartDate
    ) {
      addConnection({
        id: Date.now().toString() + Math.random().toString(36).substring(2, 8),
        relationship: newConnection.relationship as Connection['relationship'],
        // dateOfBirth: newConnection.dateOfBirth,
        residencyStatus: newConnection.residencyStatus as Connection['residencyStatus'],
        province: newConnection.province,
        residencyStartDate: newConnection.residencyStartDate
      });
      
      setNewConnection({
        relationship: '',
        // dateOfBirth: '',
        residencyStatus: '',
        province: '',
        residencyStartDate: ''
      });
    }
  };

  return (
    <Form>
      <FormSection 
        title="Family Connections in Canada" 
        description="Information about your family members who are currently in Canada."
      >
        <FormGroup>
          <FormLabel required>Do you have any family members in Canada?</FormLabel>
          <FormControl>
            <RadioGroup
              name="hasConnections"
              options={YES_NO_OPTIONS}
              value={connectionInfo.hasConnections === null ? '' : connectionInfo.hasConnections.toString()}
              onChange={handleHasConnectionsChange}
              direction="horizontal"
            />
          </FormControl>
          {errors.hasConnections && (
            <div className="text-red-500 text-xs mt-1">{errors.hasConnections}</div>
          )}
          <FormHelperText>
            Having family members in Canada can affect your eligibility for certain immigration programs.
          </FormHelperText>
        </FormGroup>

        {connectionInfo.hasConnections && (
          <>
            <div className="border border-secondary-200 rounded-md p-4 mt-6 bg-secondary-50">
              <h3 className="text-lg font-medium mb-4">Add Family Member</h3>
              
              <div className="space-y-4">
                <FormGroup>
                  <FormLabel htmlFor="relationship" required>Relationship</FormLabel>
                  <FormControl>
                    <Select
                      id="relationship"
                      name="relationship"
                      value={newConnection.relationship}
                      onChange={handleNewConnectionChange}
                      options={RELATIONSHIP_OPTIONS}
                      placeholder="Select relationship"
                    />
                  </FormControl>
                </FormGroup>
{/* 
                <FormGroup>
                  <FormLabel htmlFor="dateOfBirth" required>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      // value={newConnection.dateOfBirth}
                      onChange={handleNewConnectionChange}
                    />
                  </FormControl>
                </FormGroup> */}

                <FormGroup>
                  <FormLabel htmlFor="residencyStatus" required>Residency Status</FormLabel>
                  <FormControl>
                    <Select
                      id="residencyStatus"
                      name="residencyStatus"
                      value={newConnection.residencyStatus}
                      onChange={handleNewConnectionChange}
                      options={RESIDENCY_STATUS_OPTIONS}
                      placeholder="Select status"
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="province" required>Province</FormLabel>
                  <FormControl>
                    <Select
                      id="province"
                      name="province"
                      value={newConnection.province}
                      onChange={handleNewConnectionChange}
                      options={getProvinceOptions()}
                      placeholder="Select province"
                    />
                  </FormControl>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="residencyStartDate" required>Residency Start Date</FormLabel>
                  <FormControl>
                    <Input
                      id="residencyStartDate"
                      name="residencyStartDate"
                      type="date"
                      value={newConnection.residencyStartDate}
                      onChange={handleNewConnectionChange}
                    />
                  </FormControl>
                </FormGroup>

                <Button
                  onClick={handleAddConnection}
                  disabled={!newConnection.relationship || !newConnection.residencyStatus || !newConnection.province || !newConnection.residencyStartDate}
                  leftIcon={<Plus className="h-4 w-4" />}
                >
                  Add Family Member
                </Button>
              </div>
            </div>

            {connectionInfo.connectionList.length > 0 && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Added Family Members</h3>
                {connectionInfo.connectionList.map((connection) => (
                  <div 
                    key={connection.id} 
                    className="bg-white border border-secondary-200 rounded-md p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-secondary-600">
                          Relationship: {RELATIONSHIP_OPTIONS.find(opt => opt.value === connection.relationship)?.label}
                        </p>
                        {/* <p className="text-sm text-secondary-600">
                          Born: {new Date(connection.dateOfBirth).toLocaleDateString()}
                        </p> */}
                        <p className="text-sm text-secondary-600">
                          Status: {RESIDENCY_STATUS_OPTIONS.find(opt => opt.value === connection.residencyStatus)?.label}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Province: {connection.province}
                        </p>
                        <p className="text-sm text-secondary-600">
                          Residency Start: {new Date(connection.residencyStartDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeConnection(connection.id)}
                        leftIcon={<Trash2 className="h-4 w-4" />}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {errors.connectionList && (
              <div className="text-red-500 text-xs mt-2">{errors.connectionList}</div>
            )}
          </>
        )}
      </FormSection>
    </Form>
  );
} 