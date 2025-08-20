import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/brand.css';

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How quickly can I set up Ardent POS?",
          answer: "Most businesses are up and running within 30 minutes. Our setup wizard guides you through adding products, configuring payment methods, and training your staff. For complex setups, our support team provides free onboarding assistance."
        },
        {
          question: "Do I need special hardware to use Ardent POS?",
          answer: "Ardent POS works on any device with a web browser - tablets, smartphones, laptops, or desktop computers. For optimal experience, we recommend tablets with barcode scanners and receipt printers, but these are optional."
        },
        {
          question: "Can I import my existing product catalog?",
          answer: "Yes! We support CSV imports and have direct integrations with popular e-commerce platforms like Shopify, WooCommerce, and Square. Our migration team can help transfer data from your current POS system at no extra cost."
        }
      ]
    },
    {
      category: "Pricing & Plans",
      questions: [
        {
          question: "What's included in the free trial?",
          answer: "The 30-day free trial includes full access to all features with no limitations. You can process real transactions, set up multiple locations, and use all integrations. No credit card required to start."
        },
        {
          question: "Are there any transaction fees?",
          answer: "Ardent POS doesn't charge transaction fees. You only pay standard payment processing fees to your chosen payment provider (typically 2.9% + 30¢ for card payments). We integrate with all major processors."
        },
        {
          question: "Can I change plans anytime?",
          answer: "Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments on your next invoice."
        }
      ]
    },
    {
      category: "Features & Functionality",
      questions: [
        {
          question: "Does Ardent POS work offline?",
          answer: "Yes! Our offline mode ensures you can continue processing sales even without internet connection. All data syncs automatically when connection is restored. Critical for businesses in areas with unreliable internet."
        },
        {
          question: "How does inventory management work?",
          answer: "Real-time inventory tracking across all locations, automatic low-stock alerts, purchase order management, and detailed reporting. You can set reorder points, track supplier information, and manage product variants effortlessly."
        },
        {
          question: "Can I manage multiple store locations?",
          answer: "Yes! Our multi-location features include centralized dashboard, location-specific pricing, inventory transfers, consolidated reporting, and role-based access control. Perfect for franchises and chain stores."
        },
        {
          question: "What payment methods are supported?",
          answer: "We support all major payment methods: credit/debit cards, mobile payments (Apple Pay, Google Pay), cash, checks, gift cards, and buy-now-pay-later options. Full EMV and contactless payment support."
        }
      ]
    },
    {
      category: "Security & Compliance",
      questions: [
        {
          question: "Is my data secure with Ardent POS?",
          answer: "Absolutely. We use bank-level encryption, are PCI DSS compliant, and store data in SOC 2 certified data centers. All sensitive information is encrypted both in transit and at rest. Regular security audits ensure ongoing protection."
        },
        {
          question: "Who owns my business data?",
          answer: "You own 100% of your data. We never sell or share your information with third parties. You can export your data at any time in standard formats, and we provide data portability if you ever decide to switch systems."
        },
        {
          question: "What happens if there's a system outage?",
          answer: "Our 99.9% uptime SLA is backed by redundant systems and automatic failover. In the rare event of an outage, offline mode keeps you operational, and we provide real-time status updates and compensation for any downtime."
        }
      ]
    },
    {
      category: "Support & Training",
      questions: [
        {
          question: "What kind of support do you provide?",
          answer: "24/7 support via chat, email, and phone. Free onboarding and training for all new customers. Dedicated account managers for enterprise clients. Comprehensive help center with video tutorials and guides."
        },
        {
          question: "Do you provide staff training?",
          answer: "Yes! We offer free training sessions for your team, both virtual and on-site (for larger accounts). Our training covers all features and best practices. We also provide ongoing training materials and certification programs."
        },
        {
          question: "How do I get help if I'm stuck?",
          answer: "Multiple ways: in-app chat support, phone support, email tickets, and our comprehensive help center. Average response time is under 2 minutes for chat and 1 hour for email. Emergency support available 24/7."
        }
      ]
    },
    {
      category: "Integrations & API",
      questions: [
        {
          question: "What integrations are available?",
          answer: "200+ integrations including accounting (QuickBooks, Xero), e-commerce (Shopify, WooCommerce), marketing (Mailchimp, Klaviyo), delivery (DoorDash, Uber Eats), and payment processors. New integrations added monthly."
        },
        {
          question: "Do you have an API for custom integrations?",
          answer: "Yes! Our REST API allows custom integrations and app development. Comprehensive documentation, SDKs for popular languages, and webhook support. Perfect for businesses with unique requirements or existing systems."
        },
        {
          question: "Can I connect my existing accounting software?",
          answer: "Absolutely! Direct integrations with QuickBooks, Xero, Sage, and other popular accounting platforms. Automatic sync of sales, inventory, and customer data. Reduces manual data entry and ensures accuracy."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenFAQ(openFAQ === key ? null : key);
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
              <Link to="/contact" className="brand-text hover:text-blue-600">Contact</Link>
              <Link to="/login" className="btn-primary">Sign In</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Find answers to common questions about Ardent POS. Can't find what you're looking for? Our support team is here to help 24/7.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
            <svg className="absolute right-4 top-4 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="brand-heading text-3xl mb-8 pb-4 border-b-2 border-blue-200">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => (
                  <div key={questionIndex} className="brand-card">
                    <button
                      onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                      className="w-full text-left flex justify-between items-center focus:outline-none"
                    >
                      <h3 className="brand-subheading text-xl pr-4">{faq.question}</h3>
                      <svg
                        className={`w-6 h-6 text-blue-600 transform transition-transform ${
                          openFAQ === `${categoryIndex}-${questionIndex}` ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFAQ === `${categoryIndex}-${questionIndex}` && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="brand-text text-lg leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="brand-heading text-4xl mb-6">Still Have Questions?</h2>
          <p className="brand-text text-xl mb-8 max-w-2xl mx-auto">
            Our expert support team is available 24/7 to help you succeed with Ardent POS.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="brand-card text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-xl mb-2">Live Chat</h3>
              <p className="brand-text mb-4">Get instant help from our support team</p>
              <button className="btn-primary">Start Chat</button>
            </div>
            <div className="brand-card text-center">
              <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-xl mb-2">Email Support</h3>
              <p className="brand-text mb-4">Send us a detailed message</p>
              <Link to="/contact" className="btn-secondary">Send Email</Link>
            </div>
            <div className="brand-card text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-xl mb-2">Phone Support</h3>
              <p className="brand-text mb-4">Speak directly with an expert</p>
              <a href="tel:+1-800-ARDENT-1" className="btn-outline">Call Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses already using Ardent POS to streamline operations and boost revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/demo" className="btn-secondary text-lg px-10 py-4">
              Start Free Trial
            </Link>
            <Link to="/contact" className="btn-outline text-lg px-10 py-4 text-white border-white hover:bg-white hover:text-blue-900">
              Schedule Demo
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

export default FAQPage;
