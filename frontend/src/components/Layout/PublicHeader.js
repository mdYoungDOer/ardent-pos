import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './PublicLayout.css';

const PublicHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`public-header sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <NavLink to="/" className="flex items-center space-x-2">
            <svg className="h-8 w-auto text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.027a2 2 0 01-1.789-2.894l3.5-7A2 2 0 0114 10zM14 10L9 3 4 10h5z" />
            </svg>
            <span className="text-2xl font-bold brand-text-gradient">Ardent POS</span>
          </NavLink>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                className={({ isActive }) => 
                  `text-base font-medium transition-colors ${isActive ? 'text-emerald-500' : 'text-slate-700 hover:text-emerald-500'}`
                }>
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <NavLink to="/login" className="login-btn">Sign In</NavLink>
            <NavLink to="/register" className="cta-btn">Get Started Free</NavLink>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu lg:hidden">
          <nav className="flex flex-col space-y-4 px-4 py-6">
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.path} className="text-slate-700 hover:text-emerald-500" onClick={() => setMobileMenuOpen(false)}>{link.name}</NavLink>
            ))}
            <hr className="my-4"/>
            <NavLink to="/login" className="login-btn w-full text-center">Sign In</NavLink>
            <NavLink to="/register" className="cta-btn w-full text-center">Get Started Free</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PublicHeader;
