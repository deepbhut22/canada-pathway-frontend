import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white min-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <img src="../../../../assets/canada-logo-light.png" alt="PathPR Logo" className="w-40 sm:w-48" />
              {/* <MapPin className="h-6 w-6 text-primary-400" />
              <span className="ml-2 text-xl font-bold">PathPR</span> */}
            </Link>
            <p className="text-secondary-300 text-sm max-w-xs">
              Your trusted guide to navigating Canadian immigration pathways with personalized assistance.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-secondary-300 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-secondary-300 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-secondary-300 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary-100">Programs</h3>
            <ul className="space-y-2">
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" className="text-secondary-300 hover:text-white text-sm" target="_blank">Express Entry</a></li>
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html" className="text-secondary-300 hover:text-white text-sm" target="_blank">Provincial Nominee</a></li>
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship.html" className="text-secondary-300 hover:text-white text-sm" target="_blank">Family Sponsorship</a></li>
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/atlantic-immigration.html" className="text-secondary-300 hover:text-white text-sm" target="_blank">Atlantic Immigration</a></li>
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/quebec-skilled-workers.html" className="text-secondary-300 hover:text-white text-sm" target="_blank">Quebec Skilled Worker</a></li>
              {/* <li><a href="#" className="text-secondary-300 hover:text-white text-sm">LMIA Work Permits</a></li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary-100">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/news.html" className="text-secondary-300 hover:text-white text-sm" target="_blank">Immigration News</a></li>
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/check-score.html" className="text-secondary-300 hover:text-white text-sm" target="_blank">CRS Calculator</a></li>
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html" className="text-secondary-300 hover:text-white text-sm" target="_blank">Processing Times</a></li>
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/find-national-occupation-code.html" className="text-secondary-300 hover:text-white text-sm" target="_blank">NOC Finder</a></li>
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/language-test.html" className="text-secondary-300 hover:text-white text-sm" target="_blank">Language Testing</a></li>
              <li><a href="https://www.canada.ca/en/immigration-refugees-citizenship/corporate/partners-service-providers/funding/frequently-asked-questions.html" className="text-secondary-300 hover:text-white text-sm" target="_blank">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-secondary-100">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-secondary-300 text-sm">contact@pathpr.ca</span>
              </div>
              {/* <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-secondary-300 text-sm">+1 (800) 123-4567</span>
              </div> */}
              <div className="flex items-start">
                <Globe className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-secondary-300 text-sm">www.pathpr.ca</span>
              </div>
            </div>
            {/* <div className="mt-6">
              <button className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                Book a Consultation
              </button>
            </div> */}
          </div>
        </div>
        
        <div className="border-t border-secondary-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-secondary-400">
              © {new Date().getFullYear()} PathPR. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy-policy" className="text-sm text-secondary-400 hover:text-white">Privacy Policy</a>
              <a href="/privacy-policy" className="text-sm text-secondary-400 hover:text-white">Terms of Service</a>
              <a href="/privacy-policy" className="text-sm text-secondary-400 hover:text-white">Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}