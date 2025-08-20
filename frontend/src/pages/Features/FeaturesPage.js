import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingCartIcon,
  ArchiveBoxIcon,
  UsersIcon,
  ChartBarIcon,
  BuildingStorefrontIcon,
  CloudIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Sales & Checkout',
    description: 'Streamline your sales with a lightning-fast, intuitive checkout process that delights customers.',
    icon: ShoppingCartIcon,
    details: [
      '3-second checkout process',
      'Accepts card, cash, & mobile payments',
      'Split payments and partial refunds',
      'Offline mode for uninterrupted sales',
    ],
  },
  {
    name: 'Inventory Management',
    description: 'Keep track of your stock in real-time with powerful tools that prevent stockouts and reduce waste.',
    icon: ArchiveBoxIcon,
    details: [
      'Real-time stock tracking',
      'Automated low-stock alerts',
      'Supplier and purchase order management',
      'Batch and serial number tracking',
    ],
  },
  {
    name: 'Customer Management',
    description: 'Build lasting relationships with a built-in CRM that tracks purchase history and powers loyalty programs.',
    icon: UsersIcon,
    details: [
      'Comprehensive customer profiles',
      'Integrated loyalty and rewards programs',
      'Customer segmentation and targeting',
      'Automated marketing campaigns',
    ],
  },
  {
    name: 'Analytics & Reporting',
    description: 'Make data-driven decisions with comprehensive reports and predictive analytics at your fingertips.',
    icon: ChartBarIcon,
    details: [
      'Real-time sales dashboards',
      'Predictive analytics and forecasting',
      'Profit margin analysis by product',
      'Staff performance tracking',
    ],
  },
  {
    name: 'Multi-Location Support',
    description: 'Manage your entire enterprise from a single dashboard with centralized control and reporting.',
    icon: BuildingStorefrontIcon,
    details: [
      'Centralized management dashboard',
      'Location-specific pricing and promotions',
      'Inter-store inventory transfers',
      'Consolidated reporting across all locations',
    ],
  },
  {
    name: 'Integrations & API',
    description: 'Connect Ardent POS to your favorite tools with seamless integrations and a robust developer API.',
    icon: CloudIcon,
    details: [
      'E-commerce platform sync (Shopify, etc.)',
      'Accounting software integration (QuickBooks, etc.)',
      'Email marketing and delivery platform sync',
      'Custom API development support',
    ],
  },
];

const differentiators = [
    {
        name: 'AI-Powered Insights',
        description: 'Our machine learning algorithms provide predictive insights, demand forecasting, and personalized recommendations to drive growth.',
        icon: SparklesIcon,
    },
    {
        name: 'Enterprise-Grade Security',
        description: 'With bank-level encryption and PCI DSS compliance, we ensure your business and customer data are protected 24/7.',
        icon: ShieldCheckIcon,
    },
    {
        name: 'Lightning-Fast Performance',
        description: 'Engineered for speed, our system processes transactions in under 3 seconds, even during your busiest hours.',
        icon: BoltIcon,
    },
];

const FeaturesPage = () => {
  return (
    <>
      <div className="bg-slate-900">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden pt-14">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Powerful Features to <span className="text-emerald-400">Elevate Your Business</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Ardent POS is more than just a cash register. It’s a complete ecosystem of tools designed to streamline operations, engage customers, and accelerate your growth.
                    </p>
                </div>
            </div>
        </div>

        {/* Features Grid */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-emerald-400">Everything You Need</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                A Better Way to Manage Your Business
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                From front-of-house to back-office, our comprehensive feature set is designed to handle every aspect of your operations with ease and efficiency.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col p-8 bg-slate-800/50 rounded-2xl ring-1 ring-white/10">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                      <feature.icon className="h-8 w-8 flex-none text-emerald-400" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                      <p className="flex-auto">{feature.description}</p>
                      <ul className="mt-6 space-y-2 text-sm">
                        {feature.details.map((detail) => (
                            <li key={detail} className="flex items-center gap-x-2">
                                <CheckBadgeIcon className="h-5 w-5 text-emerald-500" />
                                <span>{detail}</span>
                            </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Differentiators Section */}
        <div className="mx-auto my-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base font-semibold leading-7 text-emerald-400">What Sets Us Apart</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    Enterprise-Grade Power, Small Business Simplicity
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                    We combine cutting-edge technology with user-friendly design to give you an unparalleled advantage.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {differentiators.map((item) => (
                        <div key={item.name} className="flex flex-col items-center text-center p-8 bg-slate-800/50 rounded-2xl ring-1 ring-white/10">
                            <div className="p-4 bg-slate-900 rounded-full ring-1 ring-emerald-400/50">
                                <item.icon className="h-10 w-10 text-emerald-400" />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-white">{item.name}</h3>
                            <p className="mt-4 text-base text-gray-300">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* CTA Section */}
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to see it in action?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Explore our full feature set with a no-obligation demo or start your free trial today.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                <Link to="/register" className="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500">
                    Start Free Trial
                </Link>
                <Link to="/contact" className="text-sm font-semibold leading-6 text-white">
                    Schedule a demo <span aria-hidden="true">→</span>
                </Link>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default FeaturesPage;
