import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Requires: npm install react-markdown remark-gfm

export default function MarkdownRenderer({ content }) {
    return (
        <div className="prose prose-sm max-w-none prose-p:my-2 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:text-primary prose-code:before:content-none prose-code:after:content-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    a: ({ node, ...props }) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary underline" />
                    ),
                    code: ({ node, inline, className, children, ...props }) =>
                        inline ? (
                            <code className="bg-gray-100 text-primary px-1.5 py-0.5 rounded text-[0.85em]" {...props}>
                                {children}
                            </code>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}