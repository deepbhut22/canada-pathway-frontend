import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { 
  Form,
  FormSection,
  FormGroup,
  FormLabel,
  FormControl,
  FormHelperText,
  Input,
} from '../components/ui/Form';
import Button from '../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();
  const { register, loginWithGoogle, isLoading, error } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    await register(email, password, firstName, lastName);
    navigate('/');
  };
  
  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-secondary-900 tracking-tight">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-secondary-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
        
        <Form onSubmit={handleSubmit}>
          <FormSection>
            <div className="grid grid-cols-2 gap-4">
              <FormGroup>
                <FormLabel htmlFor="firstName" required>First Name</FormLabel>
                <FormControl>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="focus:ring-primary-500 focus:border-primary-500"
                  />
                </FormControl>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="lastName" required>Last Name</FormLabel>
                <FormControl>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="focus:ring-primary-500 focus:border-primary-500"
                  />
                </FormControl>
              </FormGroup>
            </div>

            <FormGroup>
              <FormLabel htmlFor="email" required>Email address</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="focus:ring-primary-500 focus:border-primary-500"
                />
              </FormControl>
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="password" required>Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="focus:ring-primary-500 focus:border-primary-500"
                />
              </FormControl>
              <FormHelperText className="text-secondary-500">
                Password must be at least 8 characters long
              </FormHelperText>
            </FormGroup>

            {error && (
              <div className="text-red-500 text-sm mt-2 bg-red-50 p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <div className="mt-6">
              <Button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-secondary-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-secondary-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-secondary-200 hover:bg-secondary-50 text-secondary-700 font-medium py-2 px-4 rounded-md transition-colors duration-200"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                  </svg>
                  Sign up with Google
                </Button>
              </div>
            </div>
          </FormSection>
        </Form>
      </div>
    </div>
  );
} 