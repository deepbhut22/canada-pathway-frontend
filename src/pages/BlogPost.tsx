import { useParams } from 'react-router-dom';
import blogPostsData from '../data/blogs.json';
import ReactMarkdown from 'react-markdown';
import { BlogPost as BlogPostType } from '../types';
import Layout from '../components/layout/Layout';
import VantaHaloBackground from '../components/ui/backgrounds/HaloBg';
import { Helmet } from 'react-helmet-async';

const blogPosts = blogPostsData as BlogPostType[];


function BlogPost() {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    if (!post) return <div>Post not found.</div>;

    return (
        <>
            <Helmet>
                <title>{post.title} | Pathpr Blog</title>
                <meta name="description" content={post.description} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description} />
                <meta property="og:image" content={'https://pathpr.ca/assets/canada-logo-light.png'} />
                <meta property="og:url" content={`https://pathpr.ca/blog/${slug}`} />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>
            <Layout>
                <article className="bg-gray-50 min-h-screen mt-20">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                        <p className="text-sm text-gray-500 mb-6">{post.date}</p>
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </article>
            </Layout>
        </>
    );
}

export default BlogPost;
