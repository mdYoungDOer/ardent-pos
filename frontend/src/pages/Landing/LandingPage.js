import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/brand.css';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="brand-heading text-2xl">Ardent POS</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/features" className="brand-text hover:text-blue-600 transition-colors">Features</Link>
              <Link to="/pricing" className="brand-text hover:text-blue-600 transition-colors">Pricing</Link>
              <Link to="/about" className="brand-text hover:text-blue-600 transition-colors">About</Link>
              <Link to="/contact" className="brand-text hover:text-blue-600 transition-colors">Contact</Link>
              <Link to="/faq" className="brand-text hover:text-blue-600 transition-colors">FAQ</Link>
              <Link to="/login" className="brand-text hover:text-blue-600 transition-colors">Sign In</Link>
              <Link to="/demo" className="btn-primary">Try Demo</Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                <Link to="/features" className="block px-3 py-2 brand-text">Features</Link>
                <Link to="/pricing" className="block px-3 py-2 brand-text">Pricing</Link>
                <Link to="/about" className="block px-3 py-2 brand-text">About</Link>
                <Link to="/contact" className="block px-3 py-2 brand-text">Contact</Link>
                <Link to="/faq" className="block px-3 py-2 brand-text">FAQ</Link>
                <Link to="/login" className="block px-3 py-2 brand-text">Sign In</Link>
                <Link to="/demo" className="block px-3 py-2 btn-primary text-center">Try Demo</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero pt-32 pb-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your Business with
              <span className="block text-yellow-300"> Ardent POS</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
              The most powerful, intuitive, and comprehensive point-of-sale system designed for ambitious businesses. 
              Streamline operations, boost sales, and deliver exceptional customer experiences with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up animate-delay-200">
              <Link to="/demo" className="btn-secondary text-lg px-10 py-4">
                🚀 Start Free Trial
              </Link>
              <Link to="/features" className="btn-outline text-lg px-10 py-4 text-white border-white hover:bg-white hover:text-blue-900">
                📋 View Features
              </Link>
            </div>
            <div className="mt-12 animate-fade-in-up animate-delay-400">
              <p className="text-sm opacity-75 mb-4">Trusted by 10,000+ businesses worldwide</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="text-2xl font-bold">★★★★★</div>
                <span className="text-sm">4.9/5 Rating</span>
                <span className="text-sm">•</span>
                <span className="text-sm">99.9% Uptime</span>
                <span className="text-sm">•</span>
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="brand-heading text-4xl md:text-5xl mb-6">
              Why Choose Ardent POS?
            </h2>
            <p className="brand-text text-xl max-w-3xl mx-auto">
              Built by industry experts, trusted by successful businesses, and designed to scale with your growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="brand-card text-center animate-fade-in-up">
              <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-2xl mb-4">Lightning Fast</h3>
              <p className="brand-text text-lg">
                Process transactions in under 3 seconds with our optimized checkout system. 
                Reduce wait times and increase customer satisfaction.
              </p>
            </div>

            <div className="brand-card text-center animate-fade-in-up animate-delay-100">
              <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-2xl mb-4">Bank-Level Security</h3>
              <p className="brand-text text-lg">
                Your data is protected with enterprise-grade encryption, PCI compliance, 
                and advanced fraud detection systems.
              </p>
            </div>

            <div className="brand-card text-center animate-fade-in-up animate-delay-200">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-2xl mb-4">Smart Analytics</h3>
              <p className="brand-text text-lg">
                Make data-driven decisions with real-time insights, predictive analytics, 
                and comprehensive business intelligence tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Run Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From inventory management to customer analytics, Ardent POS provides 
              all the tools you need in one powerful platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Sales Processing</h3>
              <p className="text-gray-600">
                Lightning-fast checkout with integrated payment processing, 
                receipt printing, and real-time transaction tracking.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inventory Management</h3>
              <p className="text-gray-600">
                Automated stock tracking, low inventory alerts, and 
                comprehensive product catalog management.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">
                Detailed sales reports, customer insights, and business 
                intelligence to drive growth and profitability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">10,000+</div>
              <div className="text-indigo-200">Active Businesses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$50M+</div>
              <div className="text-indigo-200">Processed Monthly</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-indigo-200">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-indigo-200">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses already using Ardent POS to streamline 
            operations and boost revenue.
          </p>
          <Link
            to="/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg inline-block transform hover:scale-105 transition-all duration-200"
          >
            Start Your Free Trial Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Ardent POS</h3>
              <p className="text-gray-400">
                Powered by Ardent Web Services - Building the future of business technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Ardent Web Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
