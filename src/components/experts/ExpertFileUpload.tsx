import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Upload, ImagePlus, Building2 } from "lucide-react";
import { Card } from "../ui/card";

interface ExpertFileUploadProps {
  onProfileImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ExpertFileUpload = ({
  onProfileImageChange,
  onLogoImageChange,
}: ExpertFileUploadProps) => {
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
            onChange={onProfileImageChange}
            className="cursor-pointer opacity-0 absolute inset-0 w-full h-full"
          />
          <div className="bg-gray-50 p-8 rounded-lg text-center group-hover:bg-gray-100 transition-colors duration-300">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400 group-hover:text-swiss-red transition-colors duration-300" />
            <p className="text-sm text-gray-600 group-hover:text-swiss-darkblue transition-colors duration-300">
              Klicken Sie hier, um Ihr Profilbild hochzuladen
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
            onChange={onLogoImageChange}
            className="cursor-pointer opacity-0 absolute inset-0 w-full h-full"
          />
          <div className="bg-gray-50 p-8 rounded-lg text-center group-hover:bg-gray-100 transition-colors duration-300">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400 group-hover:text-swiss-red transition-colors duration-300" />
            <p className="text-sm text-gray-600 group-hover:text-swiss-darkblue transition-colors duration-300">
              Klicken Sie hier, um Ihr Firmenlogo hochzuladen
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