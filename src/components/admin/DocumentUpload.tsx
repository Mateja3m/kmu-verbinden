
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Clipboard, FileX, FileCheck, Upload } from "lucide-react";

export function DocumentUpload() {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [filename, setFilename] = useState<string>('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      setFilename(file.name);
      setUploading(true);
      
      // Upload the file to the "documents" bucket
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(file.name, file, {
          cacheControl: '3600',
          upsert: true // Replace if exists
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(file.name);
      
      setUploadedUrl(publicUrl);
      toast({
        title: "Erfolg",
        description: "Dokument wurde erfolgreich hochgeladen."
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Fehler",
        description: "Dokument konnte nicht hochgeladen werden.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = () => {
    if (uploadedUrl) {
      navigator.clipboard.writeText(uploadedUrl);
      toast({
        title: "Kopiert",
        description: "URL wurde in die Zwischenablage kopiert."
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Dokumente Hochladen</h2>
      
      <div className="border-2 border-dashed border-gray-200 p-8 rounded-lg mb-6 hover:border-swiss-red transition-colors">
        <div className="relative">
          <Input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            className="cursor-pointer opacity-0 absolute inset-0 w-full h-full"
          />
          <div className="text-center">
            <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-2">
              {uploading ? 'Wird hochgeladen...' : 'Klicken Sie hier oder ziehen Sie eine Datei hierher, um sie hochzuladen'}
            </p>
            <p className="text-xs text-gray-400">PDF, DOC, TXT, etc.</p>
          </div>
        </div>
      </div>

      {uploadedUrl && (
        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-2 rounded-full">
              <FileCheck className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 mb-1">Erfolgreich hochgeladen</h3>
              <p className="text-sm text-gray-600 mb-2">{filename}</p>
              <div className="flex items-center gap-2 bg-white p-2 rounded border text-sm text-gray-600 break-all">
                {uploadedUrl}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  <Clipboard className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg mt-6 border border-blue-100">
        <h3 className="font-medium text-blue-800 mb-2">Hinweis zur Dokumentenverwaltung</h3>
        <p className="text-sm text-blue-700">
          Dateien mit identischen Namen werden überschrieben. Für Statuten und wichtige Dokumente 
          verwenden Sie am besten statische Namen wie "statuten.pdf", damit sie immer unter der 
          gleichen URL verfügbar sind.
        </p>
      </div>
    </div>
  );
}
