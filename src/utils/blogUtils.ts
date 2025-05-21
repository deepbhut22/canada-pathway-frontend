// // Import the BlogPost type
// import { TableData, ImageData, VideoData, BlogPostNew, BlogPost } from '../types';

// // Example blog posts data for the listing page
// export const blogPostsData: BlogPostNew[] = [
//     {
//         id: "1",
//         slug: "getting-started-with-react",
//         title: "Getting Started with React in 2025",
//         excerpt: "Learn how to build modern React applications with the latest features and best practices.",
//         thumbnailUrl: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
//         author: {
//             id: "a1",
//             name: "Sarah Johnson",
//             avatarUrl: "/images/authors/sarah.jpg"
//         },
//         content: `# Getting Started with React in 2025

// React continues to evolve and improve with each passing year. In this guide, we'll explore the latest best practices, tools, and techniques for building modern React applications in 2025.

// ## Setting Up Your Development Environment

// First, let's set up a new React project using the latest tools:

// \`\`\`bash
// # Using Create React App
// npx create-react-app my-app --template typescript

// # Or using Vite (recommended for faster builds)
// npm create vite@latest my-app -- --template react-ts
// \`\`\`

// ## Key Concepts to Understand

// ### 1. React Hooks

// Hooks remain the cornerstone of React development...`,
//         categories: ["Development", "React", "Frontend"],
//         tags: ["React", "JavaScript", "TypeScript", "Web Development"],
//         status: "published",
//         readingTime: 8,
//         createdAt: "2025-05-10T10:30:00Z",
//         updatedAt: "2025-05-15T14:45:00Z",
//         publishedAt: "2025-05-15T15:00:00Z",
//         seo: {
//             metaTitle: "Getting Started with React in 2025 | Dev Blog",
//             metaDescription: "A comprehensive guide to building modern React applications with the latest features and best practices in 2025.",
//             metaKeywords: ["React", "JavaScript", "Frontend", "Web Development"],
//             openGraphImageUrl: "/images/og/react-guide-og.jpg"
//         },
//         tableData: [
//             {
//                 headers: ["Tool", "Purpose", "Recommendation"],
//                 rows: [
//                     ["Vite", "Build Tool", "Highly Recommended"],
//                     ["TypeScript", "Type Safety", "Recommended"],
//                     ["React Query", "Data Fetching", "Recommended"],
//                     ["Zustand", "State Management", "Optional"]
//                 ],
//                 caption: "Popular React Tools in 2025"
//             }
//         ],
//         imageData: [
//             {
//                 src: "/images/blog/react-architecture.jpg",
//                 alt: "React Component Architecture Diagram",
//                 caption: "Modern React Component Architecture",
//                 position: "center"
//             }
//         ]
//     },
//     {
//         id: "2",
//         slug: "advanced-css-techniques",
//         title: "Advanced CSS Techniques You Should Know",
//         excerpt: "Discover powerful CSS techniques that will take your web designs to the next level.",
//         thumbnailUrl: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
//         author: {
//             id: "a2",
//             name: "Alex Chen",
//             avatarUrl: "/images/authors/alex.jpg"
//         },
//         content: `# Advanced CSS Techniques You Should Know

// CSS continues to evolve with powerful features that make complex designs easier to implement...`,
//         categories: ["Design", "CSS", "Frontend"],
//         tags: ["CSS", "Web Design", "Animation", "Layout"],
//         status: "published",
//         readingTime: 6,
//         createdAt: "2025-05-05T09:15:00Z",
//         updatedAt: "2025-05-10T11:30:00Z",
//         publishedAt: "2025-05-10T12:00:00Z",
//         imageData: [
//             {
//                 src: "/images/blog/css-grid-example.jpg",
//                 alt: "CSS Grid Layout Example",
//                 caption: "Complex layouts made simple with CSS Grid",
//                 position: "center"
//             },
//             {
//                 src: "/images/blog/css-animation.jpg",
//                 alt: "CSS Animation Example",
//                 caption: "Smooth animations with CSS transitions",
//                 position: "right"
//             }
//         ],
//         videoData: [
//             {
//                 url: "https://www.youtube.com/embed/xYkz0Ueg0L4",
//                 type: "youtube",
//                 caption: "CSS Grid Tutorial"
//             }
//         ]
//     },
//     {
//         id: "3",
//         slug: "mastering-typescript",
//         title: "Mastering TypeScript for Modern Development",
//         excerpt: "A comprehensive guide to leveraging TypeScript in your projects for better code quality.",
//         thumbnailUrl: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
//         author: {
//             id: "a3",
//             name: "Michael Brown",
//             avatarUrl: "/images/authors/michael.jpg"
//         },
//         content: `# Mastering TypeScript for Modern Development

// TypeScript has become an essential tool for JavaScript developers seeking type safety and improved tooling...`,
//         categories: ["Development", "TypeScript", "Programming"],
//         tags: ["TypeScript", "JavaScript", "Programming", "Type Safety"],
//         status: "published",
//         readingTime: 10,
//         createdAt: "2025-04-28T14:20:00Z",
//         updatedAt: "2025-05-03T16:45:00Z",
//         publishedAt: "2025-05-04T10:00:00Z",
//         tableData: [
//             {
//                 headers: ["Feature", "Description", "Benefit"],
//                 rows: [
//                     ["Type Inference", "Automatic type detection", "Less manual typing"],
//                     ["Interfaces", "Type definitions for objects", "Better IDE suggestions"],
//                     ["Generics", "Reusable components", "Type-safe flexibility"]
//                 ],
//                 caption: "Key TypeScript Features"
//             }
//         ]
//     },
//     {
//         id: "4",
//         slug: "responsive-design-principles",
//         title: "Core Principles of Responsive Web Design",
//         excerpt: "Learn the fundamental principles that make websites work beautifully across all device sizes.",
//         thumbnailUrl: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
//         author: {
//             id: "a2",
//             name: "Alex Chen",
//             avatarUrl: "/images/authors/alex.jpg"
//         },
//         content: `# Core Principles of Responsive Web Design

// Creating websites that provide an optimal viewing experience across a wide range of devices has become essential...`,
//         categories: ["Design", "CSS", "UX"],
//         tags: ["Responsive Design", "Mobile First", "Web Design", "Media Queries"],
//         status: "published",
//         readingTime: 7,
//         createdAt: "2025-05-01T08:45:00Z",
//         updatedAt: "2025-05-02T13:20:00Z",
//         publishedAt: "2025-05-02T15:00:00Z",
//         imageData: [
//             {
//                 src: "/images/blog/responsive-example.jpg",
//                 alt: "Responsive design across multiple devices",
//                 caption: "One design, many devices",
//                 position: "center"
//             }
//         ]
//     }
// ];

// // Example of a detailed blog post (what getBlogPost would return)
// export const getSingleBlogPost = (slug: string): BlogPostNew => {
//     const post = blogPostsData.find(post => post.slug === slug);
//     if (!post) throw new Error(`Blog post with slug ${slug} not found`);
//     return post;
// };

// // Example of related blog posts (what getRelatedBlogPosts would return)
// export const getRelatedBlogPosts = (slug: string, limit: number = 3): BlogPostNew[] => {
//     // Find the current post
//     const currentPost = blogPostsData.find(post => post.slug === slug);

//     if (!currentPost) return [];

//     // Find posts with matching categories (excluding the current post)
//     return blogPostsData
//         .filter(post =>
//             post.id !== currentPost.id &&
//             post.categories.some(category =>
//                 currentPost.categories.includes(category)
//             )
//         )
//         .slice(0, 3); // Return up to 3 related posts
// };

// // Example of how you might implement the API functions
// export const blogApi = {
//     getBlogPosts: () => {
//         return Promise.resolve(blogPostsData);
//     },

//     getBlogPost: (slug: string) => {
//         const post = getSingleBlogPost(slug);
//         return Promise.resolve(post);
//     },

//     getRelatedBlogPosts: (slug: string) => {
//         const relatedPosts = getRelatedBlogPosts(slug);
//         return Promise.resolve(relatedPosts);
//     },

//     // Additional API methods you might need
//     getBlogPostsByCategory: (category: string) => {
//         const filteredPosts = blogPostsData.filter(post =>
//             post.categories.includes(category)
//         );
//         return Promise.resolve(filteredPosts);
//     },

//     getBlogPostsByTag: (tag: string) => {
//         const filteredPosts = blogPostsData.filter(post =>
//             post.tags?.includes(tag)
//         );
//         return Promise.resolve(filteredPosts);
//     },

//     searchBlogPosts: (query: string) => {
//         const lowercaseQuery = query.toLowerCase();
//         const searchResults = blogPostsData.filter(post =>
//             post.title.toLowerCase().includes(lowercaseQuery) ||
//             post.excerpt.toLowerCase().includes(lowercaseQuery) ||
//             post.content.toLowerCase().includes(lowercaseQuery) ||
//             (post.tags && post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))) ||
//             post.categories.some(category => category.toLowerCase().includes(lowercaseQuery))
//         );
//         return Promise.resolve(searchResults);
//     }
// };

// // Example utility function for formatting dates (to match your component)
// export const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     });
// };