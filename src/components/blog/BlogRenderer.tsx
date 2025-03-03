
import React from "react";
import { RichTextContent } from "@/types/database/news";

interface BlogRendererProps {
  content: string;
}

export const BlogRenderer = ({ content }: BlogRendererProps) => {
  let contentBlocks: RichTextContent[] = [];
  
  try {
    contentBlocks = JSON.parse(content);
    if (!Array.isArray(contentBlocks)) {
      // If not an array, treat as legacy plain text
      contentBlocks = [{ type: 'paragraph', content }];
    }
  } catch (error) {
    // If not valid JSON, treat as legacy plain text
    contentBlocks = [{ type: 'paragraph', content }];
  }

  const renderBlock = (block: RichTextContent, index: number) => {
    const { type, content, level, format, url, position } = block;
    
    // Common style classes based on format
    const formatClasses = [];
    if (format?.bold) formatClasses.push('font-bold');
    if (format?.italic) formatClasses.push('italic');
    
    if (format?.size === 'small') formatClasses.push('text-sm');
    if (format?.size === 'large') formatClasses.push('text-lg');
    
    const formatClassName = formatClasses.join(' ');
    
    if (type === 'paragraph') {
      return (
        <p key={index} className={`my-4 ${formatClassName}`}>
          {content}
        </p>
      );
    }
    
    if (type === 'heading') {
      switch (level) {
        case 1:
          return <h2 key={index} className={`text-2xl font-bold mt-8 mb-4 ${formatClassName}`}>{content}</h2>;
        case 2:
          return <h3 key={index} className={`text-xl font-bold mt-6 mb-3 ${formatClassName}`}>{content}</h3>;
        case 3:
          return <h4 key={index} className={`text-lg font-bold mt-4 mb-2 ${formatClassName}`}>{content}</h4>;
        default:
          return <h3 key={index} className={`text-xl font-bold mt-6 mb-3 ${formatClassName}`}>{content}</h3>;
      }
    }
    
    if (type === 'image' && url) {
      let positionClass = 'mx-auto'; // default center
      if (position === 'left') positionClass = 'ml-0 mr-auto';
      if (position === 'right') positionClass = 'mr-0 ml-auto';
      
      return (
        <figure key={index} className="my-6">
          <img 
            src={url} 
            alt={content || 'Blog image'} 
            className={`max-w-full ${positionClass} rounded-md shadow-md`} 
          />
          {content && (
            <figcaption className="text-center text-gray-500 mt-2 text-sm">
              {content}
            </figcaption>
          )}
        </figure>
      );
    }
    
    if (type === 'list') {
      const items = content.split('\n').filter(item => item.trim());
      return (
        <ul key={index} className={`list-disc pl-6 my-4 ${formatClassName}`}>
          {items.map((item, i) => (
            <li key={i} className="my-1">{item}</li>
          ))}
        </ul>
      );
    }
    
    // Fallback
    return <div key={index}>{content}</div>;
  };

  return (
    <div className="prose prose-lg max-w-none">
      {contentBlocks.map(renderBlock)}
    </div>
  );
};
