import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import Shimmer from '../ui/Shimmer';
import { useUserStore } from '../../store/userStore';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };


  const isActive = (path: string) => location.pathname === path;

  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const isProfileComplete = useUserStore((state) => state.userProfile.isComplete);
  const isLoading = useAuthStore((state) => state.isLoading);
  React.useEffect(() => {    
    // console.log("loading",useAuthStore.getState().isLoading);
  },[isAuth]);

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: isAuth ? '/profile' : '/login', label: 'My Profile' },
    { path:  !isProfileComplete ? '/questionnaire' : '/profile', label: 'Find My Pathway' },
    { path: isAuth ? '/report' : '/login', label: 'My Report' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <MapPin className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-secondary-900">CanadaPath</span>
            </Link>
            
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                    isActive(item.path)
                      ? 'border-primary-500 text-secondary-900'
                      : 'border-transparent text-secondary-500 hover:border-secondary-300 hover:text-secondary-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className='flex items-center gap-4 hidden sm:flex'>
          {isLoading !== true ? 
            useAuthStore.getState().isAuthenticated ? 
              <>
                <span className='text-secondary-900 text-lg'>Welcome, 
                  <span className="text-primary-600 text-2xl font-bold">
                    {useAuthStore.getState().user!.firstName}
                  </span>
                </span>
                <Button onClick={() => useAuthStore.getState().logout()} size="sm" variant="outline"
                  className=''  
                >Logout</Button>
              </>
              :
              <div className="hidden md:flex md:items-center md:space-x-4">
              <Button onClick={() => navigate('/login')} size="sm" variant="outline">Sign In</Button>
              <Button onClick={() => navigate('/register')} size="sm">Sign Up</Button>
            </div>
            :
            <Shimmer className="hidden sm:block w-32 h-8 md:w-40 md:h-10 lg:w-60 lg:h-10" />

          }
          </div>
          
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-secondary-400 hover:text-secondary-500 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-transparent text-secondary-500 hover:bg-secondary-50 hover:border-secondary-300 hover:text-secondary-700'
                }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-secondary-200">
            <div className="flex items-center px-4 space-x-2">
              <Button size="sm" variant="outline" className="w-full">Sign In</Button>
              <Button size="sm" className="w-full">Sign Up</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}