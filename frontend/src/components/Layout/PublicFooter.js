import React from 'react';
import { Link } from 'react-router-dom';
import './PublicLayout.css';

const PublicFooter = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  return (
    <footer className="public-footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
                <svg className="h-8 w-auto text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.027a2 2 0 01-1.789-2.894l3.5-7A2 2 0 0114 10zM14 10L9 3 4 10h5z" />
                </svg>
                <span className="text-2xl font-bold text-white">Ardent POS</span>
            </Link>
            <p className="text-sm text-slate-400">Empowering businesses with seamless point-of-sale solutions.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.name}><Link to={link.path} className="footer-link">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map(link => (
                <li key={link.name}><Link to={link.path} className="footer-link">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
            <div className="flex space-x-4 mb-4">
                {/* Add social icons here */}
            </div>
            <p className="text-sm text-slate-400 mb-2">Subscribe to our newsletter for updates.</p>
            <form className="flex">
                <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-l-md focus:outline-none"/>
                <button type="submit" className="cta-btn rounded-l-none">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} Ardent POS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
