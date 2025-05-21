import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, User, Calendar, ArrowLeft, Share2, BookmarkPlus, Tag as TagIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { formatDate } from '../utils/helpers';
import { BlogPostNew, ImageData, TableData, VideoData } from '../types';
import MarkdownRenderer from '../components/ui/MarkdownRendered';
import RelatedPosts from '../components/ui/BlogRelatedPosts';
import TableComponent from '../components/ui/BlogTableData';
import ImageComponent from '../components/ui/BlogImageComponent';
import VideoComponent from '../components/ui/BlogVideoComponent';
import VantaHaloBackground from '../components/ui/backgrounds/HaloBg';
import api from '../utils/axios';
interface BlogPostPageProps {
    // fetchBlogPost: (slug: string) => BlogPostNew;
    // getRelatedPosts: (slug: string, limit?: number) => BlogPostNew[];
    // isLoading?: boolean;
}

export default function BlogPostPage({
    // fetchBlogPost,
    // getRelatedPosts,
    // isLoading: initialLoading = false
}: BlogPostPageProps) {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const [post, setPost] = useState<BlogPostNew | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPostNew[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const loadBlogPost = async () => {
            if (!slug) return;

            setIsLoading(true);
            try {
                const blogPost = await api.get(`/blog/${slug}`);

                if (!blogPost) {
                    setError('Blog post not found');
                    return;
                }

                setPost(blogPost.data);

                // Load related posts
                // const related = await getRelatedPosts(blogPost.data.slug, 3);
                // setRelatedPosts(related);

            } catch (err) {
                console.error('Error loading blog post:', err);
                setError('Failed to load blog post');
            } finally {
                setIsLoading(false);
            }
        };

        loadBlogPost();
        // Scroll to top when slug changes
        window.scrollTo(0, 0);
    }, [slug, 
        // fetchBlogPost, 
        // getRelatedPosts
    ]);

    // Share functionality
    const shareUrl = window.location.href;
    const shareTitle = post?.title || 'Immigration Blog Post';

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`, '_blank');
    };

    const shareOnLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                    </div>
                    <p className="ml-3 text-gray-600">Loading blog post...</p>
                </div>
            </Layout>
        );
    }

    if (error || !post) {
        return (
            <Layout>
                <div className="max-w-4xl mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Blog post not found'}</h2>
                    <p className="text-gray-600 mb-8">The blog post you are looking for might have been removed or is temporarily unavailable.</p>
                    <button
                        onClick={() => navigate('/blog')}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Blog
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <>
            <Helmet>
                <title>{post.seo?.metaTitle || post.title}</title>
                <meta name="description" content={post.seo?.metaDescription || post.excerpt} />
                <meta property="og:title" content={post.seo?.metaTitle || post.title} />
                <meta property="og:description" content={post.seo?.metaDescription || post.excerpt} />
                <meta property="og:image" content={post.seo?.openGraphImageUrl || post.thumbnailUrl} />
                <meta property="og:url" content={window.location.href} />
                {post.seo?.metaKeywords && post.seo.metaKeywords.length > 0 && (
                    <meta name="keywords" content={post.seo.metaKeywords.join(', ')} />
                )}
            </Helmet>

            <Layout>
                <div className="bg-white">
                    {/* Hero section with thumbnail */}
                    <div className="hidden md:block absolute inset-0 pointer-events-none w-full mt-20">
                        {/* <BackgroundAnimation /> */}
                        <VantaHaloBackground xOffset={0.25} yOffset={0.0} size={1.5} height='10vh' />
                    </div>
                    <div className="block md:hidden absolute inset-0 pointer-events-none w-full mt-20">
                        {/* <BackgroundAnimation /> */}
                        <VantaHaloBackground xOffset={0.35} yOffset={0.4} size={1.5} height='10vh' />
                    </div>
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative mt-20 z-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-white my-4">{post.title}</h1>
                        <p className="text-sm md:text-lg text-gray-300 max-w-3xl">
                            {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center text-white text-opacity-90 text-sm md:text-base gap-4 md:gap-6">
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                            </div>
                            <div className="flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                <span>{post.author.name}</span>
                            </div>
                            {post.readingTime && (
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2" />
                                    <span>{post.readingTime} min read</span>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
                        <img
                            src={post.thumbnailUrl}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="max-w-4xl mx-auto text-center px-4">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                                    {post.title}
                                </h1>
                                <div className="flex flex-wrap justify-center items-center text-white text-opacity-90 text-sm md:text-base gap-4 md:gap-6">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <User className="h-4 w-4 mr-2" />
                                        <span>{post.author.name}</span>
                                    </div>
                                    {post.readingTime && (
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>{post.readingTime} min read</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Content section */}
                    <div className="max-w-4xl mx-auto px-4 py-12">
                        {/* Back to blog link */}
                        <div className="mb-8">
                            <Link
                                to="/blog-list"
                                className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to all blogs
                            </Link>
                        </div>

                        {/* Categories and tags */}
                        <div className="mb-8 flex flex-wrap gap-2">
                            {post.categories.map(category => (
                                <p
                                    key={category}
                                    // to={`/blog-list?category=${encodeURIComponent(category)}`}
                                    className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-800 text-sm hover:bg-primary-200 transition-colors"
                                >
                                    {category}
                                </p>
                            ))}
                            {post.tags && post.tags.map(tag => (
                                <p  
                                    key={tag}
                                    // to={`/blog-list?tag=${encodeURIComponent(tag)}`}
                                    className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm hover:bg-gray-200 transition-colors"
                                >
                                    <TagIcon className="h-3 w-3 mr-1" />
                                    {tag}
                                </p>
                            ))}
                        </div>

                        {/* Share options */}
                        <div className="mb-8 flex items-center space-x-2">
                            <span className="text-gray-600 text-sm">Share:</span>
                            <button
                                onClick={shareOnFacebook}
                                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                                aria-label="Share on Facebook"
                            >
                                <FacebookIcon className="h-4 w-4" />
                            </button>
                            <button
                                onClick={shareOnTwitter}
                                className="p-2 rounded-full bg-blue-100 text-blue-400 hover:bg-blue-200 transition-colors"
                                aria-label="Share on Twitter"
                            >
                                <TwitterIcon className="h-4 w-4" />
                            </button>
                            <button
                                onClick={shareOnLinkedIn}
                                className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                                aria-label="Share on LinkedIn"
                            >
                                <LinkedinIcon className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => navigator.clipboard.writeText(window.location.href)}
                                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                                aria-label="Copy link"
                            >
                                <Share2 className="h-4 w-4" />
                            </button>
                            {/* <button
                                className="ml-auto p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex items-center"
                                aria-label="Save blog post"
                            >
                                <BookmarkPlus className="h-4 w-4 mr-1" />
                                <span className="text-sm">Save</span>
                            </button> */}
                        </div>

                        {/* Blog content */}
                        <div className="prose prose-lg max-w-none">
                            {/* Render main content */}
                            <MarkdownRenderer content={post.content} />

                            {/* Render tables if present */}
                            {post.tableData && post.tableData.length > 0 && (
                                <div className="my-8">
                                    {post.tableData.map((table, index) => (
                                        <TableComponent key={index} tableData={table} />
                                    ))}
                                </div>
                            )}

                            {/* Render images if present */}
                            {post.imageData && post.imageData.length > 0 && (
                                <div className="my-8">
                                    {post.imageData.map((image, index) => (
                                        <ImageComponent key={index} imageData={image} />
                                    ))}
                                </div>
                            )}

                            {/* Render videos if present */}
                            {post.videoData && post.videoData.length > 0 && (
                                <div className="my-8">
                                    {post.videoData.map((video, index) => (
                                        <VideoComponent key={index} videoData={video} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Author section */}
                        <div className="mt-12 p-6 bg-gray-50 rounded-lg flex items-start flex-col md:flex-row gap-4">
                            {post.author.avatarUrl ? (
                                <img
                                    src={post.author.avatarUrl}
                                    alt={post.author.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                                    <User className="h-8 w-8 text-primary-600" />
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">About the author</h3>
                                <p className="text-gray-800 font-medium">{post.author.name}</p>
                                <p className="mt-2 text-gray-600">
                                    Immigration expert with extensive knowledge of Canadian immigration pathways and processes. Dedicated to helping newcomers navigate their journey to Canada successfully.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Related posts section */}
                    {post.categories.length > 0 && (
                        <div className="bg-gray-50 py-12">
                            <div className="max-w-4xl mx-auto px-4">
                                <RelatedPosts category={post.categories[0]} slug={post.slug} />
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
}