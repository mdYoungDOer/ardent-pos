import React from 'react';
import PublicLayout from '../../components/Layout/PublicLayout';
import { BuildingOffice2Icon, RocketLaunchIcon, EyeIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'DeYoung Doer',
      role: 'Founder & CEO',
      bio: 'Visionary entrepreneur with 15+ years in fintech. Passionate about democratizing enterprise technology for small businesses.',
      initials: 'DD'
    },
    {
      name: 'Jane Smith',
      role: 'Chief Technology Officer',
      bio: 'Former Google engineer with expertise in scalable systems and AI. Leads our technical vision and product development.',
      initials: 'JS'
    },
    {
      name: 'Michael Johnson',
      role: 'VP of Sales',
      bio: 'Sales veteran with a deep understanding of retail and hospitality. Drives our global expansion and partnership strategies.',
      initials: 'MJ'
    }
  ];

  const values = [
    {
      name: 'Innovation',
      description: 'We constantly push boundaries, embracing new technologies to deliver cutting-edge solutions.'
    },
    {
      name: 'Customer-Centric',
      description: 'Our customers are at the heart of everything we do. Their success is our success.'
    },
    {
      name: 'Integrity',
      description: 'We operate with transparency and honesty, building trust with our clients and partners.'
    }
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold brand-text-gradient mb-4">The People Behind the Platform</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We're a team of innovators, problem-solvers, and customer champions dedicated to empowering businesses.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Story</h2>
            <p className="text-slate-600 mb-4">
              Ardent POS was born from a simple observation: small and medium-sized businesses were being left behind by complex, expensive, and outdated technology. Founders, who were seasoned entrepreneurs themselves, knew there had to be a better way.
            </p>
            <p className="text-slate-600">
              In 2020, a small, passionate team came together to build a solution that was powerful yet intuitive, robust yet affordable. Today, Ardent POS serves thousands of businesses, helping them compete and win in a digital-first world.
            </p>
          </div>
          <div className="bg-slate-100 p-12 rounded-lg">
            <div className="grid grid-cols-2 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold text-emerald-600">10,000+</p>
                <p className="text-slate-500">Happy Customers</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-600">50+</p>
                <p className="text-slate-500">Countries Served</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-600">99.9%</p>
                <p className="text-slate-500">Uptime</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-emerald-600">24/7</p>
                <p className="text-slate-500">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 p-3 bg-emerald-100 rounded-full">
              <RocketLaunchIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Our Mission</h3>
              <p className="text-slate-600">To empower businesses with powerful, affordable, and intuitive tools that drive growth and efficiency, leveling the playing field for all.</p>
            </div>
          </div>
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0 p-3 bg-emerald-100 rounded-full">
              <EyeIcon className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Our Vision</h3>
              <p className="text-slate-600">To be the most trusted and customer-centric POS provider, creating a future where every business can thrive in the digital economy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Our Core Values</h2>
            <p className="text-slate-600 mt-2">The principles that guide our work and culture.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(value => (
              <div key={value.name} className="bg-slate-50 p-8 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{value.name}</h3>
                <p className="text-slate-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">Meet the Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <div key={member.name} className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 brand-bg-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-3xl">{member.initials}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-slate-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </PublicLayout>
  );
};

export default AboutPage;
