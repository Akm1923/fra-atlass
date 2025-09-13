import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Bars3Icon } from './icons/Bars3Icon';
import { XMarkIcon } from './icons/XMarkIcon';
import { GlobeAltIcon } from './icons/GlobeAltIcon';
import StarsBackground from './effects/StarsBackground';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);


  const handleLogout = () => {
    auth.logout();
    navigate('/');
    setIsMobileMenuOpen(false); // Close menu on logout
  };

  const handleMobileLinkClick = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const linkClasses = ({ isActive }: { isActive: boolean }) => 
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
      isActive 
      ? 'bg-orange-500 text-white shadow-md' 
      : 'text-slate-200 hover:bg-slate-700/50 hover:text-orange-400'
    }`;
  
  const mobileLinkClasses = 'text-3xl font-bold text-slate-200 hover:text-orange-400 transition-colors';

  const navClasses = `
    fixed top-0 z-50 w-full transition-all duration-300 ease-in-out
    animate-[slide-down-navbar_0.7s_cubic-bezier(0.25,0.46,0.45,0.94)]
    ${scrolled || isMobileMenuOpen ? 'bg-slate-900/80 backdrop-blur-lg shadow-xl' : 'bg-transparent'}
  `;

  return (
    <>
      <nav className={navClasses}>
        <StarsBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-20">
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2 text-2xl font-extrabold transition-transform transform hover:scale-105 z-50">
              <GlobeAltIcon className="w-8 h-8 text-orange-400" />
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  FRA Atlas
              </span>
            </NavLink>
            {/* Desktop Nav */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-2 bg-slate-800/50 p-1 rounded-full border border-slate-700">
                <NavLink to="/atlas" className={linkClasses}>GIS Atlas</NavLink>
                <NavLink to="/drone-surveys" className={linkClasses}>Drone Surveys</NavLink>
                {auth.isLoggedIn && auth.role === 'gov' && (
                  <NavLink to="/gov-dashboard" className={linkClasses}>Gov Dashboard</NavLink>
                )}
                {auth.isLoggedIn && auth.role === 'user' && (
                  <NavLink to="/user-dashboard" className={linkClasses}>My Dashboard</NavLink>
                )}
                <NavLink to="/about" className={linkClasses}>About Us</NavLink>
              </div>
            </div>
            {/* Desktop Auth */}
            <div className="hidden md:block">
              {auth.isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-300">
                      Welcome, <span className="font-bold text-orange-400">{auth.role === 'gov' ? 'Official' : 'User'}</span>
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="border border-red-500 text-red-400 font-bold py-2 px-4 rounded-full transition-all duration-300 hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink 
                  to="/auth" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/40"
                >
                  Login / Sign Up
                </NavLink>
              )}
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden z-50">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-200 hover:text-white hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                aria-controls="mobile-menu" 
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-40 md:hidden animate-[menu-fade-in_0.3s_ease-in-out]">
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 pt-20">
                <button onClick={() => handleMobileLinkClick('/atlas')} className={mobileLinkClasses}>GIS Atlas</button>
                <button onClick={() => handleMobileLinkClick('/drone-surveys')} className={mobileLinkClasses}>Drone Surveys</button>
                {auth.isLoggedIn && auth.role === 'gov' && (
                  <button onClick={() => handleMobileLinkClick('/gov-dashboard')} className={mobileLinkClasses}>Gov Dashboard</button>
                )}
                {auth.isLoggedIn && auth.role === 'user' && (
                  <button onClick={() => handleMobileLinkClick('/user-dashboard')} className={mobileLinkClasses}>My Dashboard</button>
                )}
                <button onClick={() => handleMobileLinkClick('/about')} className={mobileLinkClasses}>About Us</button>

                <div className="border-t border-slate-700 w-1/2 my-8"></div>

                {auth.isLoggedIn ? (
                  <div className="flex flex-col items-center space-y-4">
                    <span className="text-lg text-slate-300">
                        Welcome, <span className="font-bold text-orange-400">{auth.role === 'gov' ? 'Official' : 'User'}</span>
                    </span>
                    <button 
                      onClick={handleLogout}
                      className="border border-red-500 text-red-400 font-bold py-2 px-6 rounded-full transition-all duration-300 hover:bg-red-500 hover:text-white text-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleMobileLinkClick('/auth')}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/40 text-xl"
                  >
                    Login / Sign Up
                  </button>
                )}
            </div>
        </div>
      )}
    </>
  );
};

export default Navbar;