import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, LogOutIcon, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import Shimmer from '../ui/Shimmer';
import { useUserStore } from '../../store/userStore';
import canadaLogoLight from '../../../assets/canada-logo-light.png';
import canadaLogoDark from '../../../assets/canada-logo-dark.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const isHome = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Track scroll position to add styling when scrolled
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when screen size changes to prevent menu issues
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/profile', label: 'My Profile' },
    { path: "/report", label: 'My Report' },
    { path: '/news', label: 'News' },
  ];

  const handleRedirect = (path: string) => {
    // console.log(isAuth, isProfileComplete, path);
    console.log(path);
    
    if (path === '/news') {
      navigate(path);
    } else if (!isAuth && path !== '/') {
      useAuthStore.getState().setIsLoginRequiredPopupOpen(true);
    } else if (isAuth && !isProfileComplete && path === '/report') {
      useAuthStore.getState().setIsPopupOpen(true);
    } else {
      navigate(path);
    }

    // Always close the menu when navigating
    closeMenu();
  };

  return (
    <header className={`fixed top-0 pt-2 pb-2 left-0 right-0 z-50 transition-all duration-300 ${isHome ? isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent' : 'bg-white/90 backdrop-blur-sm shadow-md'}`}>
      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
              {isHome ? !isScrolled ? (
                <img src={canadaLogoLight} alt="CanadaPath" className="h-8 sm:h-10 md:h-12 object-contain rounded-lg" />
              ) : (
                <img src={canadaLogoDark} alt="CanadaPath" className="h-8 sm:h-10 md:h-12 object-contain rounded-lg" />
              ) :
                <img src={canadaLogoDark} alt="CanadaPath" className="h-8 sm:h-10 md:h-12 object-contain rounded-lg" />
              }
            </Link>
            <nav className="hidden md:ml-6 lg:ml-10 xl:ml-20 md:flex md:space-x-4 lg:space-x-8">
              {navigationItems.map((item, idx) => ( (!isAuthPage ) &&
                <p
                  key={item.path + " " + idx}
                  // to={item.path}
                  onClick={() => handleRedirect(item.path)}
                  className={`inline-flex items-center px-1 pt-1 text-sm lg:text-md font-medium border-b-2 cursor-pointer
                    ${isHome ? isScrolled ?
                      isActive(item.path)
                        ? 'border-secondary-950 font-bold text-secondary-950'
                        : 'border-transparent font-bold text-secondary-700 hover:border-secondary-950 hover:text-secondary-950'
                      :
                      isActive(item.path)
                        ? 'border-white text-white'
                        : 'border-transparent text-blue-200 hover:border-white hover:text-white'
                      :
                      isActive(item.path)
                        ? 'border-black font-bold text-black'
                        : 'border-transparent font-bold text-secondary-700 hover:border-secondary-900 hover:text-secondary-900'
                    }`}
                >
                  {item.label}
                </p>
              ))}
            </nav>
          </div>

          <div className='flex items-center gap-2 sm:gap-4 hidden sm:flex'>
            {isLoading !== true ?
              useAuthStore.getState().isAuthenticated ?
                <>
                  <span className={`text-sm md:text-base lg:text-lg ${isHome ? isScrolled ? 'text-secondary-700' : 'text-blue-200' : 'text-secondary-700'}`}>
                    Welcome,
                    <span className={`md:text-lg lg:text-2xl font-bold ${isHome ? isScrolled ? 'text-secondary-950' : 'text-white' : 'text-secondary-950'}`}>
                      {useAuthStore.getState().user!.firstName}
                    </span>
                  </span>
                  <Button
                    onClick={() => useAuthStore.getState().logout()}
                    size="sm"
                    variant="outline"
                    className={`${isHome ? isScrolled ? 'text-secondary-950 border border-secondary-950' : 'text-white hover:bg-white hover:text-black' : 'text-secondary-950 border border-secondary-950'}`}
                  >
                    <LogOutIcon className={`w-4 h-4 ${isHome ? isScrolled ? 'text-secondary-950' : 'hover:text-secondary-950' : 'text-secondary-800'}`} />
                  </Button>
                </>
                :
                !isAuthPage && <div className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
                  <Button
                    onClick={() => navigate('/login')}
                    size="sm" variant="outline"
                    className={`${isHome ? isScrolled ? 'text-secondary-950 border border-secondary-950' : 'text-white hover:bg-transparent' : 'text-white bg-secondary-950 border border-secondary-950'}`}>Sign In</Button>
                  <Button
                    onClick={() => navigate('/register')}
                    size="sm" variant="outline"
                    className={`${isScrolled ? 'text-white bg-secondary-950 border border-secondary-950 hover:text-white hover:bg-secondary-950' : 'bg-white text-secondary-950 border-secondary-950'}`}>Sign Up</Button>
                </div>
              :
              <Shimmer className="hidden sm:block w-24 h-8 md:w-32 md:h-9 lg:w-40 lg:h-10" />
            }
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${isHome ? isScrolled ? 'text-secondary-400 hover:text-secondary-500 hover:bg-secondary-100' : 'text-white hover:text-blue-200' : 'text-secondary-400 hover:text-secondary-500 hover:bg-secondary-100'} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary-950 border`}
              aria-expanded={isMenuOpen}
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

      {/* Mobile menu - with improved transitions and styling */}
      {isMenuOpen && (
        <div className={`md:hidden transition-all duration-300 ${isHome ? isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent shadow-md backdrop-blur-md' : 'bg-white/95 backdrop-blur-md shadow-md'}`}>
          <div className="pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isHome ? isScrolled ?
                  isActive(item.path)
                    ? 'border-secondary-950 text-secondary-900 bg-secondary-50/80'
                    : 'border-transparent text-secondary-500 hover:border-secondary-700 hover:text-secondary-700 hover:bg-secondary-50/50'
                  :
                  isActive(item.path)
                    ? 'bg-secondary-950 border-blue-400 text-white'
                    : 'border-transparent text-blue-200 hover:bg-gray-800/40 hover:border-blue-300 hover:text-white'
                  :
                  isActive(item.path)
                    ? 'border-secondary-950 text-secondary-900 bg-secondary-50/80'
                    : 'border-transparent text-secondary-500 hover:border-secondary-700 hover:text-secondary-700 hover:bg-secondary-50/50'
                  }`}
                onClick={() => handleRedirect(item.path)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile authentication buttons */}
          <div className={`pt-3 pb-3 border-t ${isHome ? isScrolled ? 'bg-white/90' : 'bg-secondary-950 border-y border-secondary-50' : 'bg-white/95'}`}>
            {isLoading !== true ?
              useAuthStore.getState().isAuthenticated ?
                <div className="flex items-center justify-between px-4">
                  <span className={`text-base ${isHome ? isScrolled ? 'text-secondary-700' : 'text-blue-200' : 'text-secondary-700'}`}>
                    Welcome,
                    <span className={`ml-1 text-lg font-bold ${isHome ? isScrolled ? 'text-secondary-950' : 'text-white' : 'text-secondary-950'}`}>
                      {useAuthStore.getState().user!.firstName}
                    </span>
                  </span>
                  <Button
                    onClick={() => {
                      useAuthStore.getState().logout();
                      closeMenu();
                    }}
                    size="sm"
                    variant="outline"
                    className={`${isHome ? isScrolled ? 'text-secondary-950' : 'text-white' : 'text-secondary-950 border border-secondary-950'}`}
                  >
                    <LogOutIcon className={`w-4 h-4 mr-1 ${isHome ? isScrolled ? 'text-secondary-950' : 'text-white' : 'text-secondary-800 border border-secondary-800'}`} />
                    Logout
                  </Button>
                </div>
                :
                <div className="flex items-center px-4 space-x-2">
                  <Button
                    onClick={() => {
                      navigate('/login');
                      closeMenu();
                    }}
                    size="sm"
                    variant="outline"
                    className={`w-full ${isHome ? isScrolled ? 'bg-secondary-950 border border-white text-white hover:bg-white hover:text-secondary-950' : 'bg-transparent text-white border border-white hover:bg-white hover:text-secondary-950' : 'bg-transparent border-secondary-950 text-secondary-950'}`}
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/register');
                      closeMenu();
                    }}
                    size="sm"
                    variant="outline"
                    className={`w-full ${isHome ? isScrolled ? 'bg-white border border-secondary-950 text-black' : 'bg-white text-black border border-secondary-950 ' : 'bg-transparent border-secondary-950 text-secondary-950'}`}
                  >
                    Sign Up
                  </Button>
                </div>
              :
              <div className="px-4">
                <Shimmer className="w-full h-10" />
              </div>
            }
          </div>
        </div>
      )}
    </header>
  );
}

