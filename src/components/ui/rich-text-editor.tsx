
import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, Heading, Image } from "lucide-react";

interface RichTextEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialContent, onChange }) => {
  const [content, setContent] = useState<string>(initialContent || '');
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
  const [parsedContent, setParsedContent] = useState<any[]>([]);

  // Parse initial content only once on mount or when initialContent changes
  useEffect(() => {
    try {
      if (initialContent) {
        const parsed = JSON.parse(initialContent);
        setParsedContent(parsed);
        setContent(initialContent); // Set content to match initialContent
      } else {
        setParsedContent([{ type: 'paragraph', content: '' }]);
        setContent(JSON.stringify([{ type: 'paragraph', content: '' }])); // Initialize content with empty paragraph
      }
    } catch (e) {
      console.error('Error parsing content:', e);
      setParsedContent([{ type: 'paragraph', content: '' }]);
      setContent(JSON.stringify([{ type: 'paragraph', content: '' }])); // Initialize content with empty paragraph on error
    }
  }, [initialContent]); // Only run when initialContent changes

  // Update the serialized content when parsedContent changes
  useEffect(() => {
    const serialized = JSON.stringify(parsedContent);
    // Only update if content is different to avoid infinite loop
    if (serialized !== content) {
      setContent(serialized);
      onChange(serialized);
    }
  }, [parsedContent, onChange]); // Add content to dependencies to prevent unnecessary updates

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    
    try {
      // Only attempt to parse if in code mode
      if (editorMode === 'code') {
        const parsed = JSON.parse(newContent);
        setParsedContent(parsed);
      }
      onChange(newContent);
    } catch (e) {
      // If JSON is invalid in code mode, don't update parsedContent
      // but still update the raw content
      onChange(newContent);
    }
  };

  const updateBlockContent = (index: number, newText: string) => {
    const updatedContent = [...parsedContent];
    updatedContent[index] = { ...updatedContent[index], content: newText };
    setParsedContent(updatedContent);
  };

  const addNewBlock = (type: string = 'paragraph') => {
    setParsedContent([...parsedContent, { type, content: '' }]);
  };

  const toggleVisualMode = () => {
    setEditorMode(editorMode === 'visual' ? 'code' : 'visual');
  };

  return (
    <div className="border rounded-md p-4">
      <div className="flex gap-2 mb-4">
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          onClick={toggleVisualMode}
        >
          {editorMode === 'visual' ? 'Code Editor' : 'Visual Editor'}
        </Button>
        
        {editorMode === 'visual' && (
          <>
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={() => addNewBlock('paragraph')}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => addNewBlock('heading')}
            >
              <Heading className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => addNewBlock('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => addNewBlock('image')}
            >
              <Image className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {editorMode === 'visual' ? (
        <div className="space-y-4">
          {parsedContent.map((block, index) => (
            <div key={index} className="mb-4">
              {block.type === 'paragraph' && (
                <Textarea
                  value={block.content}
                  onChange={(e) => updateBlockContent(index, e.target.value)}
                  placeholder="Paragraph text..."
                  className="w-full"
                />
              )}
              {block.type === 'heading' && (
                <input
                  type="text"
                  value={block.content}
                  onChange={(e) => updateBlockContent(index, e.target.value)}
                  placeholder="Heading text..."
                  className="w-full text-xl font-bold border p-2 rounded"
                />
              )}
              {block.type === 'image' && (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={block.url || ''}
                    onChange={(e) => {
                      const updatedContent = [...parsedContent];
                      updatedContent[index] = { 
                        ...updatedContent[index], 
                        url: e.target.value 
                      };
                      setParsedContent(updatedContent);
                    }}
                    placeholder="Image URL..."
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateBlockContent(index, e.target.value)}
                    placeholder="Image caption..."
                    className="w-full border p-2 rounded"
                  />
                </div>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addNewBlock()}
            className="w-full"
          >
            + Add Paragraph
          </Button>
        </div>
      ) : (
        <Textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Enter JSON content..."
          className="w-full min-h-[300px] font-mono text-sm"
        />
      )}
    </div>
  );
};
