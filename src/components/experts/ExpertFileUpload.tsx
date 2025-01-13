import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Upload, ImagePlus, Building2 } from "lucide-react";
import { Card } from "../ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/uploadFile";

interface ExpertFileUploadProps {
  onProfileImageChange: (url: string) => void;
  onLogoImageChange: (url: string) => void;
}

export const ExpertFileUpload = ({
  onProfileImageChange,
  onLogoImageChange,
}: ExpertFileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'logo') => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      
      setUploading(true);
      const file = e.target.files[0];
      const publicUrl = await uploadFile(file);
      
      if (type === 'profile') {
        onProfileImageChange(publicUrl);
      } else {
        onLogoImageChange(publicUrl);
      }

      toast({
        title: "Erfolg",
        description: `${type === 'profile' ? 'Profilbild' : 'Logo'} wurde erfolgreich hochgeladen.`
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Fehler",
        description: `${type === 'profile' ? 'Profilbild' : 'Logo'} konnte nicht hochgeladen werden.`,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card className="p-6 border-2 border-dashed border-gray-200 hover:border-swiss-red transition-colors duration-300 group">
        <Label 
          htmlFor="profile-image"
          className="text-lg font-medium text-swiss-darkblue flex items-center gap-2 mb-4"
        >
          <ImagePlus className="h-6 w-6 text-swiss-red group-hover:scale-110 transition-transform duration-300" />
          Profilbild
        </Label>
        <div className="relative">
          <Input
            id="profile-image"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'profile')}
            disabled={uploading}
            className="cursor-pointer opacity-0 absolute inset-0 w-full h-full"
          />
          <div className="bg-gray-50 p-8 rounded-lg text-center group-hover:bg-gray-100 transition-colors duration-300">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400 group-hover:text-swiss-red transition-colors duration-300" />
            <p className="text-sm text-gray-600 group-hover:text-swiss-darkblue transition-colors duration-300">
              {uploading ? 'Wird hochgeladen...' : 'Klicken Sie hier, um Ihr Profilbild hochzuladen'}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              JPG, PNG oder GIF, max. 10MB
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-2 border-dashed border-gray-200 hover:border-swiss-red transition-colors duration-300 group">
        <Label 
          htmlFor="logo-image"
          className="text-lg font-medium text-swiss-darkblue flex items-center gap-2 mb-4"
        >
          <Building2 className="h-6 w-6 text-swiss-red group-hover:scale-110 transition-transform duration-300" />
          Firmenlogo
        </Label>
        <div className="relative">
          <Input
            id="logo-image"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, 'logo')}
            disabled={uploading}
            className="cursor-pointer opacity-0 absolute inset-0 w-full h-full"
          />
          <div className="bg-gray-50 p-8 rounded-lg text-center group-hover:bg-gray-100 transition-colors duration-300">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400 group-hover:text-swiss-red transition-colors duration-300" />
            <p className="text-sm text-gray-600 group-hover:text-swiss-darkblue transition-colors duration-300">
              {uploading ? 'Wird hochgeladen...' : 'Klicken Sie hier, um Ihr Firmenlogo hochzuladen'}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              JPG, PNG oder GIF, max. 10MB
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};