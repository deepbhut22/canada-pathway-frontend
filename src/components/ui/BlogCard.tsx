import { Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogPostNew } from '../../types';
import { formatDate } from '../../utils/helpers';

interface BlogCardProps {
    blog: BlogPostNew;
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <Link to={`/blog-post/${blog.slug}`} className="block">
                <div className="h-48 overflow-hidden">
                    <img
                        src={blog.thumbnailUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </Link>

            <div className="p-5">
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {blog.categories.slice(0, 2).map(category => (
                        <Link
                            key={category}
                            to={`/blog-list?category=${encodeURIComponent(category)}`}
                            className="inline-block px-2.5 py-0.5 bg-primary-100 text-primary-800 text-xs font-medium rounded-full hover:bg-primary-200"
                        >
                            {category}
                        </Link>
                    ))}
                    {blog.categories.length > 2 && (
                        <span className="inline-block px-2.5 py-0.5 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                            +{blog.categories.length - 2}
                        </span>
                    )}
                </div>

                {/* Title */}
                <Link to={`/blog-post/${blog.slug}`} className="block">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary-700">
                        {blog.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                </p>

                {/* Meta information */}
                <div className="flex flex-wrap items-center text-xs text-gray-500 gap-3">
                    <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                    </div>

                    {blog.readingTime && (
                        <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{blog.readingTime} min read</span>
                        </div>
                    )}

                    <div className="flex items-center">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span>{blog.author.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}