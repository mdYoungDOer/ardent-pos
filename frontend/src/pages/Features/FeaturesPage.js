import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/brand.css';

const FeaturesPage = () => {
  const features = [
    {
      category: "Sales & Checkout",
      icon: "💳",
      items: [
        "Lightning-fast 3-second checkout process",
        "Multiple payment methods (card, cash, mobile)",
        "Split payments and partial refunds",
        "Digital receipt generation and email delivery",
        "Offline mode for uninterrupted sales",
        "Barcode scanning and product lookup",
        "Tax calculation and compliance",
        "Tip management and distribution"
      ]
    },
    {
      category: "Inventory Management",
      icon: "📦",
      items: [
        "Real-time stock tracking across locations",
        "Automated low-stock alerts and reordering",
        "Batch and serial number tracking",
        "Expiry date management for perishables",
        "Supplier management and purchase orders",
        "Stock transfer between locations",
        "Waste tracking and loss prevention",
        "Product bundling and variants"
      ]
    },
    {
      category: "Customer Management",
      icon: "👥",
      items: [
        "Comprehensive customer profiles",
        "Purchase history and preferences",
        "Loyalty programs and rewards",
        "Customer segmentation and targeting",
        "Automated marketing campaigns",
        "Birthday and anniversary reminders",
        "Customer feedback collection",
        "VIP customer identification"
      ]
    },
    {
      category: "Analytics & Reporting",
      icon: "📊",
      items: [
        "Real-time sales dashboards",
        "Predictive analytics and forecasting",
        "Profit margin analysis by product",
        "Staff performance tracking",
        "Peak hours and seasonal trends",
        "Customer behavior insights",
        "Inventory turnover reports",
        "Tax and financial reporting"
      ]
    },
    {
      category: "Multi-Location Support",
      icon: "🏢",
      items: [
        "Centralized management dashboard",
        "Location-specific pricing and promotions",
        "Inter-store inventory transfers",
        "Consolidated reporting across locations",
        "Role-based access by location",
        "Local tax and compliance settings",
        "Franchise management tools",
        "Regional performance comparisons"
      ]
    },
    {
      category: "Integration & API",
      icon: "🔗",
      items: [
        "E-commerce platform sync (Shopify, WooCommerce)",
        "Accounting software integration (QuickBooks, Xero)",
        "Payment gateway connections",
        "Email marketing tools (Mailchimp, Klaviyo)",
        "Delivery platform integration",
        "Social media advertising sync",
        "Webhook notifications",
        "Custom API development"
      ]
    }
  ];

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
              <Link to="/about" className="brand-text hover:text-blue-600">About</Link>
              <Link to="/contact" className="brand-text hover:text-blue-600">Contact</Link>
              <Link to="/login" className="btn-primary">Sign In</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Powerful Features for Every Business</h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            Discover why Ardent POS is the complete solution for modern businesses. From lightning-fast checkout to advanced analytics, we've got you covered.
          </p>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="brand-heading text-4xl mb-6">Everything You Need to Succeed</h2>
            <p className="brand-text text-xl max-w-3xl mx-auto">
              Our comprehensive feature set is designed to handle every aspect of your business operations, from the first sale to long-term growth.
            </p>
          </div>

          <div className="grid gap-12">
            {features.map((category, index) => (
              <div key={index} className="brand-card">
                <div className="flex items-center mb-8">
                  <div className="text-4xl mr-4">{category.icon}</div>
                  <h3 className="brand-subheading text-3xl">{category.category}</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 gradient-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="brand-text text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="brand-heading text-4xl mb-6">What Sets Us Apart</h2>
            <p className="brand-text text-xl max-w-3xl mx-auto">
              While others offer basic POS functionality, Ardent POS delivers enterprise-grade capabilities at small business prices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="brand-card text-center">
              <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-2xl mb-4">AI-Powered Insights</h3>
              <p className="brand-text text-lg">
                Machine learning algorithms analyze your data to provide predictive insights, demand forecasting, and personalized recommendations.
              </p>
            </div>

            <div className="brand-card text-center">
              <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-2xl mb-4">Enterprise Security</h3>
              <p className="brand-text text-lg">
                Bank-level encryption, PCI DSS compliance, and advanced fraud detection protect your business and customer data 24/7.
              </p>
            </div>

            <div className="brand-card text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="brand-subheading text-2xl mb-4">Lightning Performance</h3>
              <p className="brand-text text-lg">
                Optimized for speed with sub-3-second transaction processing, even during peak hours with hundreds of concurrent users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="brand-heading text-4xl mb-6">Built for Every Industry</h2>
            <p className="brand-text text-xl max-w-3xl mx-auto">
              Tailored solutions and industry-specific features for different business types.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Retail Stores", icon: "🛍️", features: ["Product variants", "Size/color management", "Seasonal pricing"] },
              { name: "Restaurants", icon: "🍽️", features: ["Table management", "Kitchen display", "Menu modifiers"] },
              { name: "Salons & Spas", icon: "💅", features: ["Appointment booking", "Service packages", "Staff scheduling"] },
              { name: "Grocery Stores", icon: "🥬", features: ["Barcode scanning", "Weight-based pricing", "Bulk discounts"] }
            ].map((industry, index) => (
              <div key={index} className="brand-card text-center">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="brand-subheading text-xl mb-4">{industry.name}</h3>
                <ul className="space-y-2">
                  {industry.features.map((feature, fIndex) => (
                    <li key={fIndex} className="brand-text text-sm">{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-hero py-20 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience These Features?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start your free trial today and see how Ardent POS can transform your business operations.
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

export default FeaturesPage;
