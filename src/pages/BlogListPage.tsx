import { useState, useEffect } from 'react';
import { Search, Calendar, Tag, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Layout from '../components/layout/Layout';
import VantaHaloBackground from '../components/ui/backgrounds/HaloBg';
import { BlogPostNew } from '../types';
import BlogCard from '../components/ui/BlogCard';

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

// Sample tags for filter - replace with your actual tags
const TAGS = [
    'All Tags',
    'IRCC',
    'Work Permit',
    'Study Permit',
    'PR Card',
    'NOC',
    'LMIA',
    'ECA',
    'CEC',
    'FSW'
];

interface BlogListingPageProps {
    blogs: BlogPostNew[];
    isLoading?: boolean;
}

export default function BlogListingPage({ blogs, isLoading = false }: BlogListingPageProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All Categories');
    const [selectedTag, setSelectedTag] = useState('All Tags');
    const [showFilters, setShowFilters] = useState(false);
    const [sortOption, setSortOption] = useState('newest');
    const [filteredBlogs, setFilteredBlogs] = useState<BlogPostNew[]>(blogs);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const navigate = useNavigate();

    // Filter and sort blogs whenever the filters change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        let result = [...blogs];

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.title.toLowerCase().includes(term) ||
                item.excerpt.toLowerCase().includes(term)
            );
        }

        // Apply category filter
        if (selectedCategory !== 'All Categories') {
            result = result.filter(item => item.categories.includes(selectedCategory));
        }

        // Apply tag filter
        if (selectedTag !== 'All Tags') {
            result = result.filter(item => item.tags?.includes(selectedTag));
        }

        // Apply sorting
        result.sort((a, b) => {
            if (sortOption === 'newest') {
                return new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime();
            } else if (sortOption === 'oldest') {
                return new Date(a.publishedAt || a.createdAt).getTime() - new Date(b.publishedAt || b.createdAt).getTime();
            } else if (sortOption === 'title') {
                return a.title.localeCompare(b.title);
            } else if (sortOption === 'readingTime') {
                return (b.readingTime || 0) - (a.readingTime || 0);
            }
            return 0;
        });

        setFilteredBlogs(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [blogs, searchTerm, selectedCategory, selectedTag, sortOption]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const currentItems = filteredBlogs.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Navigation functions
    const goToPage = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <Helmet>
                <title>Immigration Blog | Expert Insights & Updates</title>
                <meta name="description" content="Explore expert insights on Canadian immigration with our comprehensive blog. Tips, guides and latest updates to help your immigration journey." />
                <meta property="og:title" content="Immigration Blog | Expert Insights & Updates" />
                <meta property="og:description" content="Detailed guides and expert analysis on Canadian immigration pathways, requirements, and processes." />
                <meta property="og:url" content="https://pathpr.ca/blog-list" />
            </Helmet>
            <Layout>
                <div className="bg-gray-50 min-h-screen mt-8">
                    <div className="hidden md:block absolute inset-0 pointer-events-none w-full mt-20">
                        <VantaHaloBackground xOffset={0.25} yOffset={0.0} size={1.5} height='10vh' />
                    </div>
                    <div className="block md:hidden absolute inset-0 pointer-events-none w-full mt-20">
                        <VantaHaloBackground xOffset={0.35} yOffset={0.4} size={1.5} height='10vh' />
                    </div>
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative z-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white my-4">Immigration Blog</h1>
                        <p className="text-sm md:text-lg text-gray-300 max-w-3xl">
                            In-depth articles, guides, and expert analysis on Canadian immigration pathways, requirements, and processes.
                        </p>
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
                                        placeholder="Search blogs..."
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
                                    <div className="relative inline-block w-full md:w-auto mb-4 md:mb-0">
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

                                    {/* Tag dropdown */}
                                    <div className="relative inline-block w-full md:w-auto mb-4 md:mb-0">
                                        <select
                                            className="block w-full md:w-48 py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                            value={selectedTag}
                                            onChange={(e) => setSelectedTag(e.target.value)}
                                        >
                                            {TAGS.map((tag) => (
                                                <option key={tag} value={tag}>
                                                    {tag}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <Tag className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Sort dropdown */}
                                    <div className="relative inline-block w-full md:w-auto">
                                        <select
                                            className="block w-full md:w-48 py-2 pl-3 pr-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                            value={sortOption}
                                            onChange={(e) => setSortOption(e.target.value)}
                                        >
                                            <option value="newest">Newest First</option>
                                            <option value="oldest">Oldest First</option>
                                            <option value="title">Alphabetical</option>
                                            <option value="readingTime">Reading Time</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blog Grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        {isLoading ? (
                            <div className="text-center py-16">
                                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                </div>
                                <p className="mt-4 text-gray-600">Loading blogs...</p>
                            </div>
                        ) : filteredBlogs.length > 0 ? (
                            <>
                                <p className="text-gray-600 mb-6">Showing {filteredBlogs.length} results</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {currentItems.map((blog) => (
                                        <BlogCard key={blog.id} blog={blog} />
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
                                    We couldn't find any blogs matching your search. Try adjusting your filters or search terms.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('All Categories');
                                        setSelectedTag('All Tags');
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
        </>
    );
}