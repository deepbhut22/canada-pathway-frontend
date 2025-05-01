import React, { useState, useEffect } from 'react';
import { Search, Calendar, Tag, ChevronDown } from 'lucide-react';
import { NewsItem } from '../types';
import { formatDate } from '../utils/helpers';
import NewsCard from '../components/home/NewsCard';
import Layout from '../components/layout/Layout';

// Sample categories for filter - replace with your actual categories
const CATEGORIES = [
    'All Categories',
    'Immigration Policy',
    'Visa Updates',
    'Express Entry',
    'Provincial Programs',
    'Study Permits',
    'Work Permits',
    'Citizenship',
    'Family Sponsorship'
];

interface AllNewsPageProps {
    allNews: NewsItem[];
}

export default function AllNewsPage({ allNews }: AllNewsPageProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [showFilters, setShowFilters] = useState(false);
    const [sortOption, setSortOption] = useState('newest');
    const [filteredNews, setFilteredNews] = useState<NewsItem[]>(allNews);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Filter and sort news whenever the filters change
    useEffect(() => {
        let result = [...allNews];

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.title.toLowerCase().includes(term)
            );
        }

        // Apply category filter
        if (selectedCategory !== 'All Categories') {
            result = result.filter(item => item.category === selectedCategory);
        }

        // Apply sorting
        result.sort((a, b) => {
            if (sortOption === 'newest') {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            } else if (sortOption === 'oldest') {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else if (sortOption === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

        setFilteredNews(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [allNews, searchTerm, selectedCategory, sortOption]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const currentItems = filteredNews.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Navigation functions
    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen mt-8">
                {/* Hero Section */}
                <div className="bg-secondary-900 text-white">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Immigration News & Updates</h1>
                        <p className="text-lg text-gray-300 max-w-3xl">
                            Stay informed about the latest changes in Canadian immigration policies, visa updates, and important announcements.
                        </p>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            {/* Search */}
                            <div className="relative flex-grow max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    placeholder="Search news..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Mobile filter toggle */}
                            <button
                                className="md:hidden flex items-center justify-between w-full py-2 px-4 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <span>Filters</span>
                                <ChevronDown className={`ml-1 h-5 w-5 transform ${showFilters ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Desktop filters */}
                            <div className={`md:flex items-center space-x-4 ${showFilters ? 'block' : 'hidden'} mt-4 md:mt-0`}>
                                {/* Category dropdown */}
                                <div className="relative inline-block w-full md:w-auto">
                                    <select
                                        className="block w-full md:w-48 py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        {CATEGORIES.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <Tag className="h-4 w-4 text-gray-400" />
                                    </div>
                                </div>

                                {/* Sort dropdown */}
                                <div className="relative inline-block w-full md:w-auto mt-4 md:mt-0">
                                    <select
                                        className="block w-full md:w-48 py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="title">Alphabetical</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <Calendar className="h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* News Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {filteredNews.length > 0 ? (
                        <>
                            <p className="text-gray-600 mb-6">Showing {filteredNews.length} results</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {currentItems.map((item) => (
                                    <NewsCard key={item.id} news={item} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="inline-flex rounded-md shadow">
                                        <button
                                            onClick={() => goToPage(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            Previous
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => goToPage(page)}
                                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === page
                                                        ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            Next
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                                <Search className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-900">No results found</h3>
                            <p className="mt-2 text-gray-500">
                                We couldn't find any news matching your search. Try adjusting your filters or search terms.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('All Categories');
                                    setSortOption('newest');
                                }}
                                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}