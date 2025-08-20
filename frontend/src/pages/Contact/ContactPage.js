import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Replace with your actual API endpoint
            const response = await axios.post('/api/contact', formData);
            if (response.data.success) {
                toast.success('Message sent! We will get back to you shortly.');
                setFormData({ name: '', email: '', phone: '', message: '' });
            }
        } catch (error) {
            toast.error('Failed to send message. Please try again later.');
            console.error('Contact form error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="relative isolate bg-slate-900">
                <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                    <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                        <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
                                <svg
                                    className="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                                    aria-hidden="true"
                                >
                                    <defs>
                                        <pattern
                                            id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                                            width={200}
                                            height={200}
                                            x="100%"
                                            y={-1}
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <path d="M130 200V.5M.5 .5H200" fill="none" />
                                        </pattern>
                                    </defs>
                                    <svg x="100%" y={-1} className="overflow-visible fill-gray-800/20">
                                        <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                                    </svg>
                                    <rect width="100%" height="100%" strokeWidth={0} fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-white">Get in touch</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                We’re here to help you get started. Fill out the form, and we’ll get back to you as soon as possible. You can also reach out to us directly.
                            </p>
                            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-300">
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Address</span>
                                        <BuildingOffice2Icon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        123 Ardent Way, Suite 100
                                        <br />
                                        San Francisco, CA 94105
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Telephone</span>
                                        <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        <a className="hover:text-white" href="tel:+1 (555) 234-5678">
                                            +1 (555) 234-5678
                                        </a>
                                    </dd>
                                </div>
                                <div className="flex gap-x-4">
                                    <dt className="flex-none">
                                        <span className="sr-only">Email</span>
                                        <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                                    </dt>
                                    <dd>
                                        <a className="hover:text-white" href="mailto:hello@ardentpos.com">
                                            hello@ardentpos.com
                                        </a>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
                        <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold leading-6 text-white">
                                        Full name
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            autoComplete="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">
                                        Email
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            autoComplete="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-white">
                                        Phone number
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            autoComplete="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">
                                        Message
                                    </label>
                                    <div className="mt-2.5">
                                        <textarea
                                            name="message"
                                            id="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-md bg-emerald-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send message'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
