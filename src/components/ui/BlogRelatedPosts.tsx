import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { BlogPostNew } from '../../types';
import { formatDate } from '../../utils/helpers';
import { useEffect, useState } from 'react';
import api from '../../utils/axios';

interface RelatedPostsProps {
    category?: string;
    slug?: string;
}

export default function RelatedPosts({ category, slug }: RelatedPostsProps) {

    const [posts, setPosts] = useState<BlogPostNew[]>([]);

    useEffect(() => {
        const fetchRelatedPosts = async () => {
            try {
                const response = await api.get(`/blog/related-category/${category}/${slug}`);
                setPosts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRelatedPosts();
    }, [category, slug]);

    if (posts.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {posts.map(post => (
                    <div key={post._id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
                        <Link to={`/blog-post/${post.slug}`} className="block">
                            <div className="h-40 overflow-hidden">
                                <img
                                    src={post.thumbnailUrl}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                        </Link>

                        <div className="p-4">
                            <Link to={`/blog-post/${post.slug}`} className="block">
                                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary-600">
                                    {post.title}
                                </h3>
                            </Link>

                            <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}