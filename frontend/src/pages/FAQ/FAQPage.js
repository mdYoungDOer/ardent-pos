import React from 'react';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import PublicLayout from '../../components/Layout/PublicLayout';

const faqs = [
    {
        question: 'How quickly can I set up Ardent POS?',
        answer: 'Most businesses are up and running within 30 minutes. Our setup wizard guides you through adding products, configuring payment methods, and training your staff. For complex setups, our support team provides free onboarding assistance.',
    },
    {
        question: 'Do I need special hardware?',
        answer: 'No. Ardent POS works on any device with a modern web browser, including iPads, laptops, and desktop computers. You can use your existing hardware or purchase a recommended bundle from us.',
    },
    {
        question: 'Can I import my existing product catalog?',
        answer: 'Yes! We support CSV imports and have direct integrations with popular e-commerce platforms like Shopify and WooCommerce. Our migration team can help transfer data from your current POS system at no extra cost.',
    },
    {
        question: 'What are the payment processing fees?',
        answer: 'Ardent POS does not charge any transaction fees. You only pay the standard rate from your chosen payment processor (e.g., Stripe, Square). We support all major processors, so you can choose the one with the best rates for you.',
    },
    {
        question: 'Does Ardent POS work offline?',
        answer: 'Yes! Our robust offline mode ensures you can continue processing sales even without an internet connection. All data syncs automatically and securely once your connection is restored.',
    },
    {
        question: 'Is my business data secure?',
        answer: 'Absolutely. We use bank-level encryption (AES-256), are fully PCI DSS compliant, and host our infrastructure in SOC 2 certified data centers. You own 100% of your data, always.',
    },
];

const FAQPage = () => {
    return (
        <PublicLayout>
            <div className="bg-slate-900">
                {/* Hero */}
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Frequently Asked Questions</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Have a question? We're here to help. If you don't see your question here, feel free to contact our support team.
                        </p>
                    </div>
                </div>

                {/* FAQ section */}
                <div className="mx-auto max-w-4xl px-6 pb-24 sm:pb-32 lg:px-8 lg:pb-40">
                    <dl className="space-y-6 divide-y divide-white/10">
                        {faqs.map((faq) => (
                            <Disclosure as="div" key={faq.question} className="pt-6">
                                {({ open }) => (
                                    <>
                                        <dt>
                                            <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                                                <span className="text-base font-semibold leading-7">{faq.question}</span>
                                                <span className="ml-6 flex h-7 items-center">
                                                    {open ? (
                                                        <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                    ) : (
                                                        <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </Disclosure.Button>
                                        </dt>
                                        <Disclosure.Panel as="dd" className="mt-4 pr-12">
                                            <p className="text-base leading-7 text-gray-300">{faq.answer}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </dl>
                </div>

                {/* CTA Section */}
                <div className="bg-slate-800/50">
                    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Still have questions?
                            <br />
                            Our team is here to help.
                        </h2>
                        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
                            <Link
                                to="/contact"
                                className="rounded-md bg-emerald-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                            >
                                Contact Us
                            </Link>
                            <Link to="/features" className="text-sm font-semibold leading-6 text-white">
                                See all features <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default FAQPage;
