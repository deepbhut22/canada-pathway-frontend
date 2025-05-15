// import React, { useState, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import Layout from '../components/layout/Layout';
// import VantaHaloBackground from '../components/ui/backgrounds/HaloBg';
// import consultantsData from '../utils/ConsultanatFakeData.json';
// // import { Helmet } from 'react-helmet-async';

// export interface Consultant {
//     about: string;
//     category: string;
//     businessName: string;
//     logoUrl: string;
//     fullName: string;
//     shortBio: string;
//     serviceStartsFrom: number;
//     officeAddress: string;
//     serviceAreas: string[];
//     city: string;
//     membershipNumber: string; // used as unique ID in URLs
//     licenseStatus: string;
//     licenseExpiry: string;
//     phoneNumber: string;
//     emailAddress: string;
//     websiteUrl: string;
//     contactPersonName: string;
//     contactPersonPhone: string;
//     contactPersonEmail: string;
//     deliveryEmail: string;
//     languagesSpoken: string[];
//     starRating: number;
//     testimonials: string[];
//     areasOfExpertise: string[];
//     totalReviews: number;
//     consultationFees: {
//         serviceName: string;
//         cost: number;
//         duration: string;
//     }[];
// }

// const ITEMS_PER_PAGE = 5;

// const ConsultantListPage: React.FC = () => {
//     const [cityFilter, setCityFilter] = useState<string>('All');
//     const [sortOption, setSortOption] = useState<string>('default');
//     const [currentPage, setCurrentPage] = useState<number>(1);

//     // get unique cities for filter dropdown
//     const cities = useMemo(() => {
//         const set = new Set(consultantsData.map(c => c.city).filter(c => c));
//         return ['All', ...Array.from(set)];
//     }, []);

//     // apply filtering and sorting
//     const processed = useMemo(() => {
//         let arr = consultantsData.slice();

//         if (cityFilter !== 'All') {
//             arr = arr.filter(c => c.city === cityFilter);
//         }

//         switch (sortOption) {
//             case 'feeAsc':
//                 arr.sort((a, b) => a.serviceStartsFrom - b.serviceStartsFrom);
//                 break;
//             case 'feeDesc':
//                 arr.sort((a, b) => b.serviceStartsFrom - a.serviceStartsFrom);
//                 break;
//             case 'ratingDesc':
//                 arr.sort((a, b) => b.starRating - a.starRating);
//                 break;
//             default:
//                 break;
//         }

//         return arr;
//     }, [cityFilter, sortOption]);

//     const totalPages = Math.ceil(processed.length / ITEMS_PER_PAGE);
//     const paginated = processed.slice(
//         (currentPage - 1) * ITEMS_PER_PAGE,
//         currentPage * ITEMS_PER_PAGE
//     );

//     return (
//         <Layout>
//             {/* <div className="bg-secondary-50 min-h-screen mt-8 relative"> */}
//                 <div className="hidden md:block absolute inset-0 pointer-events-none w-full mt-20">
//                     <VantaHaloBackground xOffset={0.25} yOffset={0.0} size={1.5} height="10vh" />
//                 </div>
//                 <div className="block md:hidden absolute inset-0 pointer-events-none w-full mt-20">
//                     <VantaHaloBackground xOffset={0.35} yOffset={0.4} size={1.5} height="10vh" />
//                 </div>
//                 <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
//                     <h1 className="text-3xl md:text-4xl font-bold text-white my-4">Find Your Consultant</h1>
//                     <p className="text-sm md:text-lg text-secondary-300 max-w-3xl">
//                         Browse and connect with certified Canadian immigration consultants tailored to your needs.
//                     </p>
//                 </div>

//                 <div className="min-h-screen mt-14 w-[90%] mx-auto">
//                     {/* Filters */}
//                     <div className="flex flex-col md:flex-row items-start md:items-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
//                         <div>
//                             <label className="block text-secondary-700 mb-1">City</label>
//                             <select
//                                 value={cityFilter}
//                                 onChange={e => { setCityFilter(e.target.value); setCurrentPage(1); }}
//                                 className="border border-secondary-200 rounded p-2"
//                             >
//                                 {cities.map(city => (
//                                     <option key={city} value={city}>{city}</option>
//                                 ))}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="block text-secondary-700 mb-1">Sort by</label>
//                             <select
//                                 value={sortOption}
//                                 onChange={e => { setSortOption(e.target.value); setCurrentPage(1); }}
//                                 className="border border-secondary-200 rounded p-2"
//                             >
//                                 <option value="default">Default</option>
//                                 <option value="feeAsc">Fee: Low to High</option>
//                                 <option value="feeDesc">Fee: High to Low</option>
//                                 <option value="ratingDesc">Rating: High to Low</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* Cards */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
//                         {paginated.map((c: any) => (
//                             <Link
//                                 to={`/consultants/${c.membershipNumber}`}
//                                 key={c.membershipNumber}
//                                 className="bg-white rounded-lg shadow p-4 border border-secondary-200 hover:shadow-md transition"
//                             > 
//                         <img src={c.logoUrl} alt={c.businessName} className="h-16 w-16 object-contain mb-4" />
//                         <h2 className="text-xl font-semibold text-secondary-800 mb-1">{c.businessName}</h2>
//                         <p className="text-secondary-600 mb-2">{c.fullName}</p>
//                         <p className="text-secondary-700 text-sm line-clamp-3 mb-2">{c.shortBio}</p>
//                         <div className="flex items-center text-secondary-600 text-sm space-x-2">
//                             <span>{c.city}</span>
//                             <span>·</span>
//                             <span>From ${c.startsFrom} CAD</span>
//                         </div>
//                         <div className="flex items-center text-secondary-600 text-sm mt-2">
//                             <span>⭐ {c.starRating}</span>
//                             <span className="ml-2">({c.totalReviews} reviews)</span>
//                         </div>
//                     </Link>
//                     ))}
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                     <div className="flex justify-center items-center space-x-2 mt-8">
//                         <button
//                             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                             disabled={currentPage === 1}
//                             className="px-3 py-1 border border-secondary-200 rounded disabled:opacity-50"
//                         >
//                             Prev
//                         </button>
//                         {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                             <button
//                                 key={page}
//                                 onClick={() => setCurrentPage(page)}
//                                 className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-secondary-200' : 'border-secondary-200'}`}
//                             >
//                                 {page}
//                             </button>
//                 ))}
//                 <button
//                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1 border border-secondary-200 rounded disabled:opacity-50"
//                 >
//                     Next
//                 </button>
//             </div>
//           )}
//         </div>
//       {/* </div > */}
//     </Layout >
//   );
// };

// export default ConsultantListPage;


// src/components/ConsultantCard.tsx
import React from 'react';
import { Consultant } from '../types/index';
import { Link, useNavigate } from 'react-router-dom';

interface ConsultantCardProps {
    consultant: Consultant;
    className?: string;
}

export const ConsultantCard: React.FC<ConsultantCardProps> = ({ consultant, className }) => {
    return (
        <div className={`bg-secondary-50 rounded-lg shadow-md overflow-hidden transition-all border border-secondary-200 duration-500 ease-in-out hover:shadow-lg hover:-translate-y-2 hover:shadow-xl ${className}`}>
            <div className="p-6">
                <div className="flex items-center mb-4">
                    <img
                        src={consultant.logoUrl}
                        alt={`${consultant.businessName} logo`}
                        className="w-20 h-20 rounded-full object-cover mr-4"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/api/placeholder/60/60';
                        }}
                    />
                    <div>
                        <h3 className="text-xl font-semibold text-secondary-800">{consultant.businessName}</h3>
                        <p className="text-secondary-600">{consultant.fullName}</p>
                    </div>
                </div>

                <p className="text-secondary-700 mb-4 line-clamp-3">{consultant.shortBio}</p>

                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-secondary-700 font-medium">{consultant.starRating}</span>
                        <span className="ml-1 text-secondary-500">({consultant.totalNumberOfReviews})</span>
                    </div>
                    <div className="text-secondary-700">
                        <span className="text-secondary-500">Starting from </span>
                        <span className="font-semibold">${consultant.serviceStartsFrom} CAD</span>
                    </div>
                </div>

                {consultant.city && (
                    <div className="flex items-center text-secondary-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {consultant.city}
                    </div>
                )}

                <Link
                    to={`/consultants/${consultant.membershipNumber}`}
                    className="block w-full text-center bg-secondary-900 text-white hover:bg-secondary-50 hover:text-secondary-900 hover:border-2 hover:border-secondary-900 py-1 rounded-lg px-4 transition-colors duration-300"
                >
                    View Profile
                </Link>
            </div>
        </div>
    );
};

// src/components/FilterSection.tsx

interface FilterSectionProps {
    cities: string[];
    selectedCity: string;
    onCityChange: (city: string) => void;
    sortOption: string;
    onSortChange: (option: string) => void;
    searchQuery?: string;
    onSearchChange: (query: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
    cities,
    selectedCity,
    onCityChange,
    sortOption,
    onSortChange,
    searchQuery,
    onSearchChange
}) => {
    return (
        <div className="bg-white rounded-lg shadow-md mb-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center p-2">
            {/* <h2 className="text-xl w-max font-semibold text-secondary-800">Filter & Sort</h2> */}
                {/* City Filter */}
                <div>
                    <label htmlFor="city-filter" className="block text-secondary-700 text-sm mb-2">
                        Filter by City
                    </label>
                    <select
                        id="city-filter"
                        value={selectedCity}
                        onChange={(e) => onCityChange(e.target.value)}
                        className="w-full border border-secondary-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
                    >
                        <option value="">All Cities</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort Options */}
                <div>
                    <label htmlFor="sort-options" className="block text-secondary-700 text-sm mb-2">
                        Sort By
                    </label>
                    <select
                        id="sort-options"
                        value={sortOption}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="w-full border border-secondary-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
                    >
                        <option value="rating-desc">Highest Rating</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="search" className="block text-secondary-700 text-sm mb-2">Search by Name</label>
                    <GeneralSearchSelect
                        items={consultantsData.map((consultant) => ({ value: consultant.membershipNumber, label: consultant.businessName }))}
                        label="Search"
                        name="search"
                        value={{ value: searchQuery!, label: searchQuery! }}
                        onChange={(value) => onSearchChange(value?.value!)}
                        className="w-full border border-secondary-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
                    />
                </div>
            </div>
        </div>
    );
};

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center mt-8">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-secondary-300 bg-white text-sm font-medium ${currentPage === 1
                            ? 'text-secondary-300 cursor-not-allowed'
                            : 'text-secondary-500 hover:bg-secondary-50'
                        }`}
                >
                    <span className="sr-only">Previous</span>
                    <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

                {/* Page Numbers */}
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => onPageChange(number)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === number
                                ? 'z-10 bg-secondary-950 border-secondary-950 text-white'
                                : 'bg-white border-secondary-300 text-secondary-700 hover:bg-secondary-50'
                            }`}
                    >
                        {number}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-secondary-300 bg-white text-sm font-medium ${currentPage === totalPages
                            ? 'text-secondary-300 cursor-not-allowed'
                            : 'text-secondary-500 hover:bg-secondary-50'
                        }`}
                >
                    <span className="sr-only">Next</span>
                    <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </nav>
        </div>
    );
};

// src/pages/ConsultantListingPage.tsx
import { useState, useEffect, useMemo } from 'react';
import consultantsData from '../utils/ConsultanatFakeData.json';
import Layout from '../components/layout/Layout';
import VantaHaloBackground from '../components/ui/backgrounds/HaloBg';
import { GeneralSearchSelect } from '../components/ui/Form';

const ConsultantListingPage: React.FC = () => {
    const [selectedCity, setSelectedCity] = useState('');
    const [sortOption, setSortOption] = useState('rating-desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const itemsPerPage = 6;

    // Extract unique cities for the filter
    const cities = useMemo(() => {
        const uniqueCities = [...new Set(consultantsData.map(consultant => consultant.city))];
        return uniqueCities.filter(city => city !== '');
    }, []);

    // Apply filters and sorting
    const filteredAndSortedConsultants = useMemo(() => {
        let filtered = [...consultantsData];

        // Apply city filter
        if (selectedCity) {
            filtered = filtered.filter(consultant => consultant.city === selectedCity);
        }

        // Apply sorting
        switch (sortOption) {
            case 'rating-desc':
                filtered.sort((a, b) => b.starRating - a.starRating);
                break;
            case 'price-asc':
                filtered.sort((a, b) => a.serviceStartsFrom - b.serviceStartsFrom);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.serviceStartsFrom - a.serviceStartsFrom);
                break;
            default:
                break;
        }

        return filtered;
    }, [selectedCity, sortOption]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredAndSortedConsultants.length / itemsPerPage);
    const currentConsultants = filteredAndSortedConsultants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to first page when filters change
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        setCurrentPage(1);
    }, [selectedCity, sortOption]);

    const handleCityChange = (city: string) => {
        setSelectedCity(city);
    };

    const handleSortChange = (option: string) => {
        setSortOption(option);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to top of results
        window.scrollTo({
            top: document.getElementById('results-container')?.offsetTop || 0,
            behavior: 'smooth',
        });
    };

    const handleSearchChange = (membershipNumber: string) => {
        const consultant = consultantsData.find(c => c.membershipNumber === membershipNumber);
        if (consultant) {
            navigate(`/consultants/${consultant.membershipNumber}`);
        }
    };

    return (
        <Layout>
            <div className="bg-white min-h-screen mt-8">
                <div className="hidden md:block absolute inset-0 pointer-events-none w-full mt-20">
                    <VantaHaloBackground xOffset={0.25} yOffset={0.0} size={1.5} height='10vh' />
                </div>
                <div className="block md:hidden absolute inset-0 pointer-events-none w-full mt-20">
                    <VantaHaloBackground xOffset={0.35} yOffset={0.4} size={1.5} height='10vh' />
                </div>
                <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-white my-4">Find Immigration Consultants</h1>
                    <p className="text-sm md:text-lg text-gray-300 max-w-3xl">
                        Connect with experienced Regulated Canadian Immigration Consultants (RCICs) who can help with your immigration journey.
                    </p>
                </div>
                <div className="min-h-screen mt-8 w-[90%] mx-auto">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative z-10" id="results-container">
                    <div className="mb-6 flex justify-between items-center">
                        {/* Results Summary */}
                        <h2 className="text-xl font-semibold text-secondary-800">
                            {filteredAndSortedConsultants.length} Consultants Available
                            {selectedCity && ` in ${selectedCity}`}
                        </h2>
                        {/* Filter Section */}
                        <div>
                            <FilterSection
                                cities={cities}
                                selectedCity={selectedCity}
                                onCityChange={handleCityChange}
                                sortOption={sortOption}
                                onSortChange={handleSortChange}
                                searchQuery={searchQuery}
                                onSearchChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    {/* Consultants Grid */}
                    {currentConsultants.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentConsultants.map((consultant) => (
                                <ConsultantCard key={consultant.membershipNumber} consultant={consultant} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-8 text-center">
                            <h3 className="text-xl font-medium text-secondary-800 mb-2">No consultants found</h3>
                            <p className="text-secondary-600">
                                Try adjusting your filters to find available consultants.
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            </div>
        </Layout>
    );
};

export default ConsultantListingPage;