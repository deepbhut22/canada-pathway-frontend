// import { useEffect, useRef } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import rehypeRaw from 'rehype-raw';
// import rehypeSlug from 'rehype-slug';
// import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { Components } from 'react-markdown';

// interface MarkdownRendererProps {
//     content: string;
// }

// export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
//     const contentRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         if (!contentRef.current) return;

//         const headings = contentRef.current.querySelectorAll<HTMLElement>('h2, h3, h4, h5, h6');
//         const unbind: (() => void)[] = [];

//         headings.forEach((heading) => {
//             if (!heading.id) return;

//             heading.style.cursor = 'pointer';

//             const clickHandler = () => {
//                 navigator.clipboard.writeText(`${window.location.href.split('#')[0]}#${heading.id}`);
//                 const original = heading.style.color;
//                 heading.style.color = '#2563eb';
//                 setTimeout(() => (heading.style.color = original), 500);
//             };

//             heading.addEventListener('click', clickHandler);
//             unbind.push(() => heading.removeEventListener('click', clickHandler));
//         });

//         return () => unbind.forEach((f) => f());
//     }, [content]);

//     return (
//         <div ref={contentRef} className="markdown-content">
//             <ReactMarkdown
//                 remarkPlugins={[remarkGfm]}
//                 rehypePlugins={[rehypeRaw, rehypeSlug]}
//                 components={{
//                     code({ node, inline, className, children, ...props }: any) {
//                         const match = /language-(\w+)/.exec(className || '');

//                         if (!inline && match) {
//                             return (
//                                 <SyntaxHighlighter
//                                     style={atomDark as Record<string, React.CSSProperties>}
//                                     language={match[1]}
//                                     PreTag="div"
//                                     className="rounded-md"
//                                     {...props}
//                                 >
//                                     {String(children).replace(/\n$/, '')}
//                                 </SyntaxHighlighter>
//                             );
//                         }

//                         return (
//                             <code className={className} {...props}>
//                                 {children}
//                             </code>
//                         );
//                     },
//                     a: ({ children, href, ...props }) => {
//                         const isExternal = href?.startsWith('http');
//                         return (
//                             <a
//                                 href={href}
//                                 target={isExternal ? "_blank" : undefined}
//                                 rel={isExternal ? "noopener noreferrer" : undefined}
//                                 className="text-primary-600 hover:text-primary-800 hover:underline"
//                                 {...props}
//                             >
//                                 {children}
//                             </a>
//                         );
//                     },
//                     h2: ({ children, ...props }) => (
//                         <h2 className="group relative flex items-center mt-12 mb-4 text-2xl font-bold" {...props}>
//                             <span>{children}</span>
//                             <span className="absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity">
//                                 🔗
//                             </span>
//                         </h2>
//                     ),
//                     h3: ({ children, ...props }) => (
//                         <h3 className="group relative flex items-center mt-8 mb-3 text-xl font-bold" {...props}>
//                             <span>{children}</span>
//                             <span className="absolute -left-5 opacity-0 group-hover:opacity-100 transition-opacity">
//                                 🔗
//                             </span>
//                         </h3>
//                     ),
//                     img: ({ src, alt, ...props }) => (
//                         <div className="my-6">
//                             <img
//                                 src={src || ''}
//                                 alt={alt || ''}
//                                 className="max-w-full h-auto rounded-lg mx-auto"
//                                 loading="lazy"
//                                 {...props}
//                             />
//                             {alt && <p className="text-center text-sm text-gray-500 mt-2">{alt}</p>}
//                         </div>
//                     ),
//                 }}
//             >
//                 {content}
//             </ReactMarkdown>
//         </div>
//     );
// }


export default function MarkdownRendered({ content }: { content: string }) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
}