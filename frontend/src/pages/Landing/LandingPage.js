import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CurrencyDollarIcon, CubeIcon, UsersIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {

  const features = [
    { 
      icon: CurrencyDollarIcon, 
      title: 'Seamless Sales',
      description: 'Intuitive interface for quick checkouts, split payments, and hassle-free returns.'
    },
    { 
      icon: CubeIcon, 
      title: 'Smart Inventory',
      description: 'Track stock levels in real-time, set low-stock alerts, and manage suppliers effortlessly.'
    },
    { 
      icon: UsersIcon, 
      title: 'Customer Insights',
      description: 'Build customer profiles, track purchase history, and create targeted marketing campaigns.'
    },
  ];

  const testimonials = [
    {
      quote: 'Ardent POS transformed our boutique. The inventory management is a lifesaver, and our checkout process is twice as fast. We couldn\'t be happier!',
      name: 'Sarah L.',
      role: 'Owner, The Chic Boutique'
    },
    {
      quote: 'As a multi-location cafe, we needed a system that could keep up. Ardent\'s analytics and centralized data are game-changers for our business strategy.',
      name: 'David Chen',
      role: 'Operations Manager, Morning Brew Cafes'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold brand-text-gradient mb-6">Run Your Business, Not Just Your Register</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">The all-in-one Point of Sale platform designed to help you sell more, manage smarter, and build the business of your dreams.</p>
          <div className="flex justify-center items-center space-x-4">
            <Link to="/register" className="cta-btn text-lg px-8 py-3">Start Free Trial</Link>
            <Link to="/features" className="font-medium text-slate-700 hover:text-emerald-600 transition-colors flex items-center">
              See All Features <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Everything You Need to Succeed</h2>
            <p className="text-md text-slate-500 mt-2">One platform to manage your entire retail operation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map(feature => (
              <div key={feature.title} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-emerald-100 rounded-full">
                    <feature.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Trusted by Businesses Like Yours</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map(testimonial => (
              <div key={testimonial.name} className="bg-white p-8 rounded-lg shadow-sm">
                <p className="text-slate-600 italic mb-6">\"{testimonial.quote}\"</p>
                <div>
                  <p className="font-semibold text-slate-800">{testimonial.name}</p>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Ready to Grow Your Business?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">Join thousands of successful retailers. Get started with a free, no-risk 14-day trial.</p>
          <Link to="/register" className="cta-btn text-xl px-10 py-4">Start Selling Smarter</Link>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
