import { useParams } from 'react-router-dom';
import blogPostsData from '../data/blogs.json';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../types';
import Layout from '../components/layout/Layout';
import VantaHaloBackground from '../components/ui/backgrounds/HaloBg';

const blogPosts = blogPostsData as BlogPost[];


function BlogPostPage() {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) return <div>Post not found.</div>;

    return (
        <Layout>
            <div className="bg-gray-50 min-h-screen mt-20">
                <div className="p-6">
                    <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                    <p className="text-sm text-gray-500 mb-6">{post.date}</p>
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </div>
        </Layout>
    );
}

export default BlogPostPage;
