import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/brand.css';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="brand-heading text-2xl">Ardent POS</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/" className="brand-text hover:text-blue-600">Home</Link>
              <Link to="/features" className="brand-text hover:text-blue-600">Features</Link>
              <Link to="/contact" className="brand-text hover:text-blue-600">Contact</Link>
              <Link to="/login" className="btn-primary">Sign In</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Ardent Web Services</h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Pioneering the future of business technology with innovative solutions that empower entrepreneurs and enterprises worldwide.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="brand-heading text-4xl mb-6">Our Story</h2>
              <p className="brand-text text-lg mb-6 leading-relaxed">
                Founded in 2020, Ardent Web Services emerged from a simple yet powerful vision: to democratize access to enterprise-grade business technology. 
                Our founders, seasoned entrepreneurs and technology veterans, recognized the gap between what small businesses needed and what was available in the market.
              </p>
              <p className="brand-text text-lg mb-6 leading-relaxed">
                Starting with a small team of passionate developers and business strategists, we set out to build solutions that would level the playing field. 
                Today, we're proud to serve over 10,000 businesses across 50+ countries, processing millions of transactions monthly.
              </p>
              <p className="brand-text text-lg leading-relaxed">
                Our commitment remains unchanged: to provide powerful, intuitive, and affordable technology solutions that help businesses thrive in an increasingly digital world.
              </p>
            </div>
            <div className="brand-card">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                <div className="brand-text mb-6">Active Businesses</div>
                <div className="text-4xl font-bold text-green-600 mb-2">$2.5B+</div>
                <div className="brand-text mb-6">Transactions Processed</div>
                <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                <div className="brand-text">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="brand-card">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-2xl mb-4">Our Mission</h3>
              <p className="brand-text text-lg leading-relaxed">
                To empower businesses of all sizes with cutting-edge technology solutions that drive growth, efficiency, and success. 
                We believe every entrepreneur deserves access to tools that were once exclusive to large corporations.
              </p>
            </div>
            <div className="brand-card">
              <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-2xl mb-4">Our Vision</h3>
              <p className="brand-text text-lg leading-relaxed">
                To become the global leader in business technology solutions, creating a world where every business, 
                regardless of size or location, has the tools to compete and succeed in the digital economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="brand-heading text-4xl mb-6">Our Core Values</h2>
            <p className="brand-text text-xl max-w-3xl mx-auto">
              These principles guide everything we do, from product development to customer service.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">I</span>
              </div>
              <h3 className="brand-subheading text-xl mb-4">Innovation</h3>
              <p className="brand-text">
                We constantly push boundaries, embracing new technologies and methodologies to deliver cutting-edge solutions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">R</span>
              </div>
              <h3 className="brand-subheading text-xl mb-4">Reliability</h3>
              <p className="brand-text">
                Our clients depend on us for mission-critical operations. We deliver consistent, dependable performance every time.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">E</span>
              </div>
              <h3 className="brand-subheading text-xl mb-4">Excellence</h3>
              <p className="brand-text">
                We strive for perfection in every detail, from code quality to customer experience, never settling for "good enough."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="brand-heading text-4xl mb-6">Leadership Team</h2>
            <p className="brand-text text-xl max-w-3xl mx-auto">
              Meet the visionaries and experts driving Ardent Web Services forward.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="brand-card text-center">
              <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-3xl">DY</span>
              </div>
              <h3 className="brand-subheading text-xl mb-2">DeYoung Doer</h3>
              <p className="text-blue-600 font-semibold mb-4">Founder & CEO</p>
              <p className="brand-text">
                Visionary entrepreneur with 15+ years in fintech and business solutions. 
                Passionate about democratizing enterprise technology for small businesses.
              </p>
            </div>
            <div className="brand-card text-center">
              <div className="w-24 h-24 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-3xl">JS</span>
              </div>
              <h3 className="brand-subheading text-xl mb-2">Jane Smith</h3>
              <p className="text-green-600 font-semibold mb-4">CTO</p>
              <p className="brand-text">
                Former Google engineer with expertise in scalable systems and AI. 
                Leads our technical vision and product development initiatives.
              </p>
            </div>
            <div className="brand-card text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-3xl">MJ</span>
              </div>
              <h3 className="brand-subheading text-xl mb-2">Michael Johnson</h3>
              <p className="text-purple-600 font-semibold mb-4">VP of Sales</p>
              <p className="brand-text">
                Sales veteran with deep understanding of retail and hospitality sectors. 
                Drives our global expansion and partnership strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of successful businesses already using Ardent POS to streamline operations and boost revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/demo" className="btn-secondary text-lg px-10 py-4">
              Start Free Trial
            </Link>
            <Link to="/contact" className="btn-outline text-lg px-10 py-4 text-white border-white hover:bg-white hover:text-blue-900">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="font-bold text-xl">Ardent POS</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering businesses with cutting-edge point-of-sale technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/demo" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">API Docs</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
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

export default AboutPage;
