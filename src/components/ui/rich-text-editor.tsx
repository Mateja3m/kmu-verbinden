
import { useState, useEffect } from "react";
import { Bold, Italic, Heading1, Heading2, Heading3, List, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RichTextContent } from "@/types/database/news";
import { uploadFile } from "@/lib/uploadFile";
import { useToast } from "@/hooks/use-toast";

interface RichTextEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export function RichTextEditor({ initialContent = '', onChange }: RichTextEditorProps) {
  const [blocks, setBlocks] = useState<RichTextContent[]>([]);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Parse initial content if provided in JSON format
  useEffect(() => {
    if (initialContent) {
      try {
        const parsedContent = JSON.parse(initialContent);
        if (Array.isArray(parsedContent)) {
          setBlocks(parsedContent);
        }
      } catch (error) {
        // If not valid JSON, create a paragraph block with the content
        setBlocks([{ type: 'paragraph', content: initialContent }]);
      }
    } else {
      // Start with an empty paragraph if no content
      setBlocks([{ type: 'paragraph', content: '' }]);
    }
  }, [initialContent]);

  // Update parent component when blocks change
  useEffect(() => {
    onChange(JSON.stringify(blocks));
  }, [blocks, onChange]);

  const addBlock = (type: RichTextContent['type']) => {
    const newBlock: RichTextContent = { type, content: '' };
    
    if (type === 'heading') {
      newBlock.level = 1;
    }
    
    const newIndex = selectedBlockIndex !== null ? selectedBlockIndex + 1 : blocks.length;
    const updatedBlocks = [
      ...blocks.slice(0, newIndex),
      newBlock,
      ...blocks.slice(newIndex)
    ];
    
    setBlocks(updatedBlocks);
    setSelectedBlockIndex(newIndex);
  };

  const updateBlock = (index: number, updates: Partial<RichTextContent>) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index] = { ...updatedBlocks[index], ...updates };
    setBlocks(updatedBlocks);
  };

  const removeBlock = (index: number) => {
    if (blocks.length === 1) {
      // Don't remove the last block, just clear it
      updateBlock(index, { content: '' });
      return;
    }
    
    const updatedBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(updatedBlocks);
    
    if (selectedBlockIndex === index) {
      setSelectedBlockIndex(index > 0 ? index - 1 : 0);
    } else if (selectedBlockIndex !== null && selectedBlockIndex > index) {
      setSelectedBlockIndex(selectedBlockIndex - 1);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      setUploading(true);
      const file = e.target.files[0];
      const publicUrl = await uploadFile(file);
      
      updateBlock(index, { url: publicUrl });
      toast({
        title: "Erfolg",
        description: "Bild wurde erfolgreich hochgeladen."
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Fehler",
        description: "Bild konnte nicht hochgeladen werden.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const toggleFormat = (index: number, format: keyof RichTextContent['format']) => {
    const block = blocks[index];
    const currentFormat = block.format || {};
    
    updateBlock(index, {
      format: {
        ...currentFormat,
        [format]: !currentFormat[format as keyof typeof currentFormat]
      }
    });
  };

  const renderBlockEditor = (block: RichTextContent, index: number) => {
    const isSelected = selectedBlockIndex === index;
    
    return (
      <div 
        key={index} 
        className={`my-3 border p-3 rounded-md ${isSelected ? 'border-blue-500' : 'border-gray-200'}`}
        onClick={() => setSelectedBlockIndex(index)}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {block.type === 'paragraph' && <span>Paragraph</span>}
            {block.type === 'heading' && <span>Heading {block.level}</span>}
            {block.type === 'image' && <span>Image</span>}
            {block.type === 'list' && <span>List</span>}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => removeBlock(index)}
          >
            Remove
          </Button>
        </div>
        
        {block.type === 'image' ? (
          <div className="space-y-3">
            <Input 
              type="file" 
              accept="image/*" 
              onChange={(e) => handleImageUpload(e, index)}
              disabled={uploading}
            />
            {block.url && (
              <div className="mt-2">
                <img 
                  src={block.url} 
                  alt="Content" 
                  className="max-h-48 object-contain"
                />
              </div>
            )}
            <div className="flex space-x-2 mt-2">
              <Button
                variant={block.position === 'left' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateBlock(index, { position: 'left' })}
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant={block.position === 'center' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateBlock(index, { position: 'center' })}
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant={block.position === 'right' ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateBlock(index, { position: 'right' })}
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
            <Input
              value={block.content || ''}
              onChange={(e) => updateBlock(index, { content: e.target.value })}
              placeholder="Image caption (optional)"
              className="mt-2"
            />
          </div>
        ) : block.type === 'heading' ? (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Button
                variant={block.level === 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateBlock(index, { level: 1 })}
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                variant={block.level === 2 ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateBlock(index, { level: 2 })}
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                variant={block.level === 3 ? 'default' : 'outline'}
                size="sm"
                onClick={() => updateBlock(index, { level: 3 })}
              >
                <Heading3 className="h-4 w-4" />
              </Button>
            </div>
            <Input
              value={block.content}
              onChange={(e) => updateBlock(index, { content: e.target.value })}
              placeholder="Heading text"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Button
                variant={(block.format?.bold) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFormat(index, 'bold')}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant={(block.format?.italic) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFormat(index, 'italic')}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <select
                className="px-2 py-1 border rounded text-sm"
                value={block.format?.size || 'medium'}
                onChange={(e) => updateBlock(index, { 
                  format: { ...block.format, size: e.target.value as 'small' | 'medium' | 'large' } 
                })}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <Textarea
              value={block.content}
              onChange={(e) => updateBlock(index, { content: e.target.value })}
              placeholder={block.type === 'paragraph' ? 'Paragraph text' : 'List items (one per line)'}
              className="min-h-[120px]"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border rounded-md p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => addBlock('paragraph')}>
          Add Paragraph
        </Button>
        <Button variant="outline" onClick={() => addBlock('heading')}>
          Add Heading
        </Button>
        <Button variant="outline" onClick={() => addBlock('image')}>
          <ImageIcon className="h-4 w-4 mr-2" /> Add Image
        </Button>
        <Button variant="outline" onClick={() => addBlock('list')}>
          <List className="h-4 w-4 mr-2" /> Add List
        </Button>
      </div>
      
      <div className="space-y-4">
        {blocks.map(renderBlockEditor)}
      </div>
    </div>
  );
}
