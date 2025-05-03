import { useState } from 'react';
import Layout from '../components/layout/Layout';

export default function LegalInfoComponent({ initialTab = 'privacy' }) {
    const [activeTab, setActiveTab] = useState(initialTab);

    const tabStyle = (tab: string) => ({
        padding: '0.75rem 1.5rem',
        fontWeight: activeTab === tab ? '600' : '400',
        backgroundColor: activeTab === tab ? '#102954' : '#1e3a6d',
        color: 'white',
        border: 'none',
        borderRadius: activeTab === tab ? '0.25rem 0.25rem 0 0' : '0.25rem',
        cursor: 'pointer',
        marginRight: '0.25rem',
        transition: 'all 0.3s ease'
    });

    return (
        <Layout>
        <div className="bg-gray-100 min-h-screen p-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gray-100 p-4">
                        <h1 className="text-2xl font-bold text-center text-gray-800">PathPR.ca Legal Information</h1>

                        {/* Tab Navigation */}
                        <div className="flex mt-6">
                            <button
                                onClick={() => setActiveTab('faqs')}
                                style={tabStyle('faqs')}
                            >
                                FAQs
                            </button>
                            <button
                                onClick={() => setActiveTab('privacy')}
                                style={tabStyle('privacy')}
                            >
                                Privacy Policy
                            </button>
                            <button
                                onClick={() => setActiveTab('disclaimer')}
                                style={tabStyle('disclaimer')}
                            >
                                Disclaimer
                            </button>
                            <button
                                onClick={() => setActiveTab('terms')}
                                style={tabStyle('terms')}
                            >
                                Terms of Service
                            </button>
                        </div>

                        {/* Content Area */}
                        <div
                            className="bg-white p-6 border-t-4"
                            style={{ borderColor: '#102954' }}
                        >
                            {activeTab === 'faqs' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h2>

                                    <div className="space-y-6">
                                        {faqs.map((faq, index) => (
                                            <FaqItem key={index} question={faq.question} answer={faq.answer} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'privacy' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-6 text-gray-800">Privacy Policy</h2>

                                    <div className="space-y-4">
                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Introduction</h3>
                                            <p className="text-gray-600">
                                                PathPR.ca is committed to protecting the privacy and confidentiality of personal information provided by users. This Privacy Policy outlines our practices concerning data collection, usage, protection, and disclosure in compliance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA).
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Information Collection</h3>
                                            <p className="text-gray-600">
                                                We collect personal information such as name, age, education, work experience, language proficiency, family status, and contact details solely for the purpose of generating educational reports about potential Canadian Permanent Residency (PR) pathways.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Use of Information</h3>
                                            <p className="text-gray-600">
                                                Information provided is used exclusively to generate personalized AI-driven immigration pathway reports. Your data helps create accurate insights for educational purposes only and is not used for any immigration applications or consultations.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Data Security</h3>
                                            <p className="text-gray-600">
                                                We employ robust security protocols, including encryption and secure servers, to ensure the protection of your personal information. We do not sell, trade, or otherwise transfer your information without explicit consent.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Information Disclosure</h3>
                                            <p className="text-gray-600">
                                                Personal information will not be disclosed to third parties unless required by Canadian law or explicitly authorized by you. In future phases, users opting in may share information with licensed Canadian immigration consultants at their discretion.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">User Rights</h3>
                                            <p className="text-gray-600">
                                                You have the right to access, modify, and delete your personal information stored on PathPR.ca at any time.
                                            </p>
                                        </section>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'disclaimer' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-6 text-gray-800">Disclaimer</h2>

                                    <div className="space-y-4">
                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Educational Purpose Only</h3>
                                            <p className="text-gray-600">
                                                Reports and content generated by PathPR.ca are provided strictly for educational and informational purposes. They are not intended as, nor should they be used as, legal or immigration advice.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">No Immigration Consulting</h3>
                                            <p className="text-gray-600">
                                                PathPR.ca is not a registered immigration consultancy and does not provide immigration consultation or application submission services. For professional advice and services, users must consult licensed immigration professionals or legal representatives.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Accuracy and Updates</h3>
                                            <p className="text-gray-600">
                                                While we strive to provide current and accurate information based on official Canadian immigration sources, immigration laws, policies, and criteria frequently change. We cannot guarantee absolute accuracy or completeness at all times.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Third-party Consultants</h3>
                                            <p className="text-gray-600">
                                                In future phases, PathPR.ca may list licensed immigration consultants for user convenience. However, interactions with these consultants are entirely independent of PathPR.ca, and we bear no responsibility for any engagements or outcomes arising from these interactions.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Liability</h3>
                                            <p className="text-gray-600">
                                                PathPR.ca holds no liability for any actions, outcomes, or decisions made by users based on the content provided.
                                            </p>
                                        </section>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'terms' && (
                                <div>
                                    <h2 className="text-xl font-bold mb-6 text-gray-800">Terms of Service</h2>

                                    <div className="space-y-4">
                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Introduction</h3>
                                            <p className="text-gray-600">
                                                By accessing PathPR.ca, you agree to comply with these Terms of Service. This platform provides educational content through AI-generated reports related to potential Canadian immigration pathways.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Intended Use</h3>
                                            <p className="text-gray-600">
                                                The content and reports generated by PathPR.ca are intended exclusively for educational purposes. PathPR.ca does not offer immigration consulting services, legal advice, or direct assistance with immigration applications.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">User Responsibilities</h3>
                                            <p className="text-gray-600">
                                                Users agree to provide truthful and accurate information to ensure report accuracy. Misrepresentation may result in inaccurate assessments.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Limitations</h3>
                                            <p className="text-gray-600">
                                                PathPR.ca is not liable for decisions users make based on generated reports. Immigration eligibility is determined solely by Canadian immigration authorities.
                                            </p>
                                        </section>

                                        <section>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-700">Modification of Terms</h3>
                                            <p className="text-gray-600">
                                                We reserve the right to modify these Terms of Service at any time, and it is the responsibility of users to regularly review them.
                                            </p>
                                        </section>
                                    </div>
                                </div>
                            )}
                            <div className="mt-6 text-sm text-gray-500 text-center">
                                Effective Date: May 3, 2025<br />
                                For further questions or concerns, please contact us at contact@pathpr.ca
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        </Layout>
    );
}

// FAQ Item Component with expand/collapse functionality
function FaqItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 pb-4">
            <button
                className="flex justify-between items-center w-full text-left font-semibold text-gray-700 hover:text-gray-900 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{question}</span>
                <svg
                    className={`w-5 h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            {isOpen && (
                <div className="mt-3 text-gray-600">
                    <p className="pl-4 border-l-2" style={{ borderColor: '#1e3a6d' }}>
                        {answer}
                    </p>
                </div>
            )}
        </div>
    );
}

// FAQ Data
const faqs = [
    {
        question: "What is PathPR.ca and how can it assist me?",
        answer: "PathPR.ca is a platform designed to help individuals explore potential pathways to Canadian permanent residency (PR). By submitting your information, the website generates a personalized report outlining the PR programs you may be eligible for, streamlining your immigration planning process."
    },
    {
        question: "What information is required to generate my personalized immigration report?",
        answer: "We require details about your age, educational background, work experience, language proficiency (IELTS, CELPIP, TEF), family details, Canadian connections (relatives, previous Canadian work or study), and job offers (if any)."
    },
    {
        question: "How accurate are the immigration pathway reports generated by PathPR.ca?",
        answer: "Our reports are based on current immigration rules and eligibility criteria provided by IRCC and provincial immigration authorities. While we ensure accuracy, immigration policies can change. We recommend consulting directly with immigration professionals to confirm eligibility."
    },
    {
        question: "Can I update or modify my information after the report is generated?",
        answer: "Yes, you can log into your PathPR.ca account and update your details. A new report reflecting updated eligibility will then be generated automatically."
    },
    {
        question: "Does PathPR.ca guarantee my approval for Canadian Permanent Residency?",
        answer: "While PathPR.ca provides a clear analysis of potential PR pathways based on your profile, approval for immigration is exclusively determined by Canadian immigration authorities. Our service enhances your understanding and planning but cannot guarantee outcomes."
    },
    {
        question: "How secure is my personal information submitted on PathPR.ca?",
        answer: "We use industry-standard encryption and security measures to protect your data. Your personal information is confidential, never shared without your explicit consent, and used solely for generating your immigration report."
    },
    {
        question: "What are the main immigration pathways to Canada?",
        answer: "Canada offers several immigration programs, including: Express Entry (for skilled workers under the Federal Skilled Worker Program, Canadian Experience Class, and Federal Skilled Trades Program), Provincial Nominee Program (PNP), Family Sponsorship, Business Immigration, and Refugee and Humanitarian Programs."
    },
    {
        question: "How does Express Entry work?",
        answer: "Express Entry is a points-based system that manages applications for permanent residence. Candidates are ranked based on factors like age, education, work experience, and language proficiency. The highest-ranking candidates receive Invitations to Apply (ITAs) during periodic draws."
    },
    {
        question: "How can I check the status of my immigration application?",
        answer: "You can check your application status through the IRCC online portal. After submitting your application, you'll receive an application number, which you can use to track progress. Ensure your contact information is up-to-date to receive timely updates."
    }
];