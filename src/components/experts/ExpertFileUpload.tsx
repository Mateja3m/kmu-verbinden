import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Upload } from "lucide-react";

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
      <div className="group transition-all duration-300 hover:scale-[1.02]">
        <Label className="text-lg font-medium text-swiss-darkblue flex items-center gap-2">
          <Upload className="h-5 w-5 text-swiss-red" />
          Profilbild
        </Label>
        <Input
          type="file"
          accept="image/*"
          onChange={onProfileImageChange}
          className="mt-2 cursor-pointer transition-all duration-300 focus:ring-2 focus:ring-swiss-red
            file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium
            file:bg-swiss-red file:text-white hover:file:bg-swiss-red/90"
        />
      </div>

      <div className="group transition-all duration-300 hover:scale-[1.02]">
        <Label className="text-lg font-medium text-swiss-darkblue flex items-center gap-2">
          <Upload className="h-5 w-5 text-swiss-red" />
          Firmenlogo
        </Label>
        <Input
          type="file"
          accept="image/*"
          onChange={onLogoImageChange}
          className="mt-2 cursor-pointer transition-all duration-300 focus:ring-2 focus:ring-swiss-red
            file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-medium
            file:bg-swiss-red file:text-white hover:file:bg-swiss-red/90"
        />
      </div>
    </div>
  );
};