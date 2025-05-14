// src/pages/ConsultantInfoPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import VantaHaloBackground from '../components/ui/backgrounds/HaloBg';
import consultantsData from '../utils/ConsultanatFakeData.json';
import { Consultant } from '../types';

const ConsultantInfoPage: React.FC = () => {
    const { membershipNumber } = useParams<{ membershipNumber: string }>();
    const navigate = useNavigate();
    const [consultant, setConsultant] = useState<Consultant | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // In a real app, you would fetch this from an API
        // For now, we're using the mock data
        const foundConsultant = consultantsData.find(
            (c) => c.membershipNumber === membershipNumber
        );

        if (foundConsultant) {
            setConsultant(foundConsultant as unknown as Consultant);
        }
        setLoading(false);
    }, [membershipNumber]);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-secondary-900"></div>
                </div>
            </Layout>
        );
    }

    if (!consultant) {
        return (
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
                    <h1 className="text-2xl font-bold text-secondary-800 mb-4">
                        Consultant Not Found
                    </h1>
                    <p className="text-secondary-600 mb-6">
                        The consultant you're looking for could not be found.
                    </p>
                    <button
                        onClick={() => navigate('/consultants')}
                        className="bg-secondary-800 text-white py-2 px-6 rounded hover:bg-secondary-700 transition"
                    >
                        Back to Consultants
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-secondary-50 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <button
                        onClick={() => navigate('/consultants')}
                        className="flex items-center text-black hover:underline py-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back to All Consultants
                    </button>
                </div>

                {/* Content Container */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        {/* Consultant Info Banner */}
                        <div className="bg-secondary-950 text-white p-6 flex flex-col md:flex-row items-center md:items-start justify-between">
                            <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0">
                                <img
                                    src={consultant.logoUrl}
                                    alt={`${consultant.businessName} logo`}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/api/placeholder/96/96';
                                    }}
                                />
                                <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                                    <h2 className="text-2xl font-bold">{consultant.fullName}</h2>
                                    <div className="flex items-center justify-center md:justify-start mt-1">
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-yellow-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                />
                                            </svg>
                                            <span className="ml-1 font-medium">
                                                {consultant.starRating}
                                            </span>
                                            <span className="ml-1 text-gray-300">
                                                ({consultant.totalNumberOfReviews} reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <span className="bg-secondary-700 text-white text-xs px-2 py-1 rounded">
                                            {consultant.licenseStatus} License
                                        </span>
                                        <span className="ml-2 text-sm">
                                            Membership #{consultant.membershipNumber}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-secondary-50 text-secondary-900 font-bold py-3 px-6 rounded hover:bg-white transition shadow-md">
                                Book Now
                            </button>
                        </div>

                        {/* Main Content */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Left Column - Main Details */}
                                <div className="lg:col-span-2">
                                    {/* About Section */}
                                    <section className="mb-8">
                                        <h3 className="text-xl font-semibold text-secondary-800 mb-4 border-b border-secondary-200 pb-2">
                                            About
                                        </h3>
                                        <div className="prose text-secondary-700">
                                            {consultant.about ? (
                                                <p>{consultant.about}</p>
                                            ) : (
                                                <p>{consultant.shortBio}</p>
                                            )}
                                        </div>
                                    </section>

                                    {/* Areas of Expertise */}
                                    {consultant.areasOfExpertise && consultant.areasOfExpertise.length > 0 && (
                                        <section className="mb-8">
                                            <h3 className="text-xl font-semibold text-secondary-800 mb-4 border-b border-secondary-200 pb-2">
                                                Areas of Expertise
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {consultant.areasOfExpertise.map((area, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm"
                                                    >
                                                        {area}
                                                    </span>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Consultation Fees */}
                                    {consultant.consultationFees && consultant.consultationFees.length > 0 && (
                                        <section className="mb-8">
                                            <h3 className="text-xl font-semibold text-secondary-800 mb-4 border-b border-secondary-200 pb-2">
                                                Consultation Fees
                                            </h3>
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-secondary-200">
                                                    <thead className="bg-secondary-50">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
                                                            >
                                                                Service
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
                                                            >
                                                                Duration
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider"
                                                            >
                                                                Cost (CAD)
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-secondary-200">
                                                        {consultant.consultationFees.map((fee, index) => (
                                                            <tr key={index}>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                                                                    {fee.serviceName}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-700">
                                                                    {fee.duration}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-900">
                                                                    ${fee.cost}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <p className="text-sm text-secondary-500 mt-2">
                                                Starting from ${consultant.serviceAreas} CAD
                                            </p>
                                        </section>
                                    )}

                                    {/* Testimonials */}
                                    {consultant.testimonials && consultant.testimonials.length > 0 && (
                                        <section className="mb-8">
                                            <h3 className="text-xl font-semibold text-secondary-800 mb-4 border-b border-secondary-200 pb-2">
                                                Client Testimonials
                                            </h3>
                                            <div className="space-y-4">
                                                {consultant.testimonials.map((testimonial, index) => (
                                                    <div
                                                        key={index}
                                                        className="bg-secondary-50 p-4 rounded-lg border border-secondary-200"
                                                    >
                                                        <div className="flex items-start">
                                                            <svg
                                                                className="h-6 w-6 text-secondary-400 mr-2 mt-1"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                                            </svg>
                                                            <p className="text-secondary-700">{testimonial}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </div>

                                {/* Right Column - Contact Details */}
                                <div className="lg:col-span-1">
                                    <div className="bg-secondary-50 p-6 rounded-lg border border-secondary-200 sticky top-6">
                                        <h3 className="text-xl font-semibold text-secondary-800 mb-4">
                                            Contact Information
                                        </h3>

                                        {/* Location */}
                                        {consultant.officeAddress && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-secondary-500 mb-1">
                                                    Office Address
                                                </h4>
                                                <p className="text-secondary-800 flex items-start">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    {consultant.officeAddress}
                                                </p>
                                            </div>
                                        )}

                                        {/* Service Areas */}
                                        {consultant.serviceAreas && consultant.serviceAreas.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-secondary-500 mb-1">
                                                    Service Areas
                                                </h4>
                                                <p className="text-secondary-800 flex items-start">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                                        />
                                                    </svg>
                                                    {consultant.serviceAreas.join(", ")}
                                                </p>
                                            </div>
                                        )}

                                        {/* Phone */}
                                        {consultant.phoneNumber && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-secondary-500 mb-1">
                                                    Phone
                                                </h4>
                                                <p className="text-secondary-800 flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-secondary-500 mr-2 flex-shrink-0"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                        />
                                                    </svg>
                                                    <a href={`tel:${consultant.phoneNumber}`} className="hover:text-secondary-600">
                                                        {consultant.phoneNumber}
                                                    </a>
                                                </p>
                                            </div>
                                        )}

                                        {/* Email */}
                                        {consultant.emailAddress && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-secondary-500 mb-1">
                                                    Email
                                                </h4>
                                                <p className="text-secondary-800 flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-secondary-500 mr-2 flex-shrink-0"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <a href={`mailto:${consultant.emailAddress}`} className="hover:text-secondary-600">
                                                        {consultant.emailAddress}
                                                    </a>
                                                </p>
                                            </div>
                                        )}

                                        {/* Website */}
                                        {consultant.websiteUrl && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-secondary-500 mb-1">
                                                    Website
                                                </h4>
                                                <p className="text-secondary-800 flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-secondary-500 mr-2 flex-shrink-0"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                                        />
                                                    </svg>
                                                    <a
                                                        href={consultant.websiteUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:text-secondary-600"
                                                    >
                                                        {consultant.websiteUrl.replace(/^https?:\/\//, '')}
                                                    </a>
                                                </p>
                                            </div>
                                        )}

                                        {/* Languages */}
                                        {consultant.languagesSpoken && consultant.languagesSpoken.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-secondary-500 mb-1">
                                                    Languages Spoken
                                                </h4>
                                                <p className="text-secondary-800 flex items-start">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                                                        />
                                                    </svg>
                                                    {consultant.languagesSpoken.join(", ")}
                                                </p>
                                            </div>
                                        )}

                                        {/* License Expiry */}
                                        {consultant.licenseExpiry && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-secondary-500 mb-1">
                                                    License Valid Until
                                                </h4>
                                                <p className="text-secondary-800 flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 text-secondary-500 mr-2 flex-shrink-0"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    {consultant.licenseExpiry}
                                                </p>
                                            </div>
                                        )}

                                        {/* Contact Person */}
                                        {consultant.contactPersonName && (
                                            <div className="mt-6 p-4 bg-white border border-secondary-200 rounded-lg">
                                                <h4 className="font-medium text-secondary-800 mb-2">
                                                    Contact Person
                                                </h4>
                                                <p className="text-secondary-700 mb-1">
                                                    {consultant.contactPersonName}
                                                </p>
                                                {consultant.contactPersonPhone && (
                                                    <p className="text-secondary-700 mb-1 flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 text-secondary-500 mr-1"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                            />
                                                        </svg>
                                                        <a href={`tel:${consultant.contactPersonPhone}`} className="hover:text-secondary-600">
                                                            {consultant.contactPersonPhone}
                                                        </a>
                                                    </p>
                                                )}
                                                {consultant.contactPersonEmail && (
                                                    <p className="text-secondary-700 flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4 text-secondary-500 mr-1"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        <a href={`mailto:${consultant.contactPersonEmail}`} className="hover:text-secondary-600">
                                                            {consultant.contactPersonEmail}
                                                        </a>
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Call to Action Button */}
                                        <div className="mt-6">
                                            <button className="w-full bg-secondary-900 text-white py-3 px-6 rounded-lg hover:bg-secondary-800 transition shadow-md font-bold text-center">
                                                Book a Consultation
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ConsultantInfoPage;