import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../styles/brand.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    inquiry_type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/contact', formData);
      if (response.data.success) {
        toast.success('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          message: '',
          inquiry_type: 'general'
        });
      }
    } catch (error) {
      toast.error('Sorry, there was an error sending your message. Please try again or contact us directly.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Link to="/about" className="brand-text hover:text-blue-600">About</Link>
              <Link to="/login" className="btn-primary">Sign In</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Ready to transform your business? Our team of experts is here to help you succeed with Ardent POS.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="brand-card text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-xl mb-4">Live Chat Support</h3>
              <p className="brand-text mb-4">Get instant answers from our support team</p>
              <p className="text-sm text-gray-600 mb-4">Available 24/7</p>
              <button className="btn-primary">Start Chat</button>
            </div>

            <div className="brand-card text-center">
              <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-xl mb-4">Phone Support</h3>
              <p className="brand-text mb-4">Speak directly with our experts</p>
              <p className="text-sm text-gray-600 mb-4">Mon-Fri 8AM-8PM EST</p>
              <a href="tel:+1-800-ARDENT-1" className="btn-secondary">+1 (800) ARDENT-1</a>
            </div>

            <div className="brand-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-xl mb-4">Email Support</h3>
              <p className="brand-text mb-4">Send us a detailed message</p>
              <p className="text-sm text-gray-600 mb-4">Response within 1 hour</p>
              <a href="mailto:support@ardentpos.com" className="btn-outline">support@ardentpos.com</a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <div className="brand-card">
              <div className="text-center mb-8">
                <h2 className="brand-heading text-3xl mb-4">Send Us a Message</h2>
                <p className="brand-text text-lg">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block brand-text font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block brand-text font-semibold mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block brand-text font-semibold mb-2">Company Name</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block brand-text font-semibold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block brand-text font-semibold mb-2">Inquiry Type</label>
                  <select
                    name="inquiry_type"
                    value={formData.inquiry_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="demo">Schedule Demo</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="enterprise">Enterprise Solutions</option>
                  </select>
                </div>

                <div>
                  <label className="block brand-text font-semibold mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <label className="block brand-text font-semibold mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Please provide details about your inquiry, including your business type, number of locations, and specific requirements..."
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary text-lg px-12 py-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <p className="text-sm text-gray-600 mt-4">
                    We'll respond within 24 hours. For urgent matters, please call us directly.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="brand-heading text-4xl mb-6">Our Offices</h2>
            <p className="brand-text text-xl max-w-3xl mx-auto">
              With offices around the world, we're always close to our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="brand-card text-center">
              <h3 className="brand-subheading text-xl mb-4">San Francisco, CA</h3>
              <p className="brand-text mb-2">123 Tech Street, Suite 400</p>
              <p className="brand-text mb-2">San Francisco, CA 94105</p>
              <p className="brand-text mb-4">United States</p>
              <p className="text-blue-600 font-semibold">Headquarters</p>
            </div>

            <div className="brand-card text-center">
              <h3 className="brand-subheading text-xl mb-4">New York, NY</h3>
              <p className="brand-text mb-2">456 Business Ave, Floor 15</p>
              <p className="brand-text mb-2">New York, NY 10001</p>
              <p className="brand-text mb-4">United States</p>
              <p className="text-green-600 font-semibold">Sales Office</p>
            </div>

            <div className="brand-card text-center">
              <h3 className="brand-subheading text-xl mb-4">London, UK</h3>
              <p className="brand-text mb-2">789 Innovation Road</p>
              <p className="brand-text mb-2">London EC1A 1BB</p>
              <p className="brand-text mb-4">United Kingdom</p>
              <p className="text-purple-600 font-semibold">European HQ</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't wait - start your free trial today and see how Ardent POS can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/demo" className="btn-secondary text-lg px-10 py-4">
              Start Free Trial
            </Link>
            <Link to="/features" className="btn-outline text-lg px-10 py-4 text-white border-white hover:bg-white hover:text-blue-900">
              View Features
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

export default ContactPage;
