import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import PublicLayout from '../../components/Layout/PublicLayout';

const PricingPage = () => {

  const tiers = [
    {
      name: 'Starter',
      price: '49',
      description: 'For new businesses & startups getting off the ground.',
      features: [
        'Core POS System',
        'Inventory Management (500 Products)',
        'Basic Sales Analytics',
        'Email Support',
      ],
      cta: 'Choose Starter',
      popular: false,
    },
    {
      name: 'Professional',
      price: '99',
      description: 'For growing businesses that need more power and support.',
      features: [
        'Everything in Starter, plus:',
        'Advanced Analytics & Reporting',
        'Customer Relationship Management (CRM)',
        'E-commerce Integration',
        'Priority Phone & Email Support',
      ],
      cta: 'Choose Professional',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale operations with specific needs.',
      features: [
        'Everything in Professional, plus:',
        'Multi-location Management',
        'Dedicated Account Manager',
        'API Access & Custom Integrations',
        '24/7/365 Emergency Support',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <PublicLayout>
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold brand-text-gradient mb-4">Find the Perfect Plan</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">Simple, transparent pricing that scales with your business. No hidden fees, ever.</p>
        </div>

        <div className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div key={tier.name} className={`border rounded-lg p-8 flex flex-col ${tier.popular ? 'border-emerald-500 border-2 relative' : 'border-slate-200'}`}>
                {tier.popular && <span className="bg-emerald-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full absolute -top-4 left-1/2 -translate-x-1/2">Most Popular</span>}
                <h2 className="text-2xl font-bold text-slate-800">{tier.name}</h2>
                <p className="text-slate-500 mt-2 flex-grow">{tier.description}</p>
                <div className="my-8">
                  <span className="text-5xl font-extrabold text-slate-900">${tier.price}</span>
                  {tier.name !== 'Enterprise' && <span className="text-slate-500">/ month</span>}
                </div>
                <a href="#" className={tier.popular ? 'cta-btn w-full text-center' : 'login-btn w-full text-center'}>{tier.cta}</a>
                <ul className="mt-8 space-y-4 text-left">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PricingPage;
