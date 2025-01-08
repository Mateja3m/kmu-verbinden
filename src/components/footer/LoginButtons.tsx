import { Lock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const LoginButtons = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin/auth');
  };

  const handlePartnerLogin = () => {
    navigate('/auth?type=partner');
  };

  return (
    <div className="flex flex-col space-y-2">
      <button 
        onClick={handleAdminLogin}
        className="flex items-center gap-2 text-white hover:text-swiss-red transition-colors text-sm"
      >
        <Lock className="h-4 w-4" />
        Admin Login
      </button>
      <button 
        onClick={handlePartnerLogin}
        className="flex items-center gap-2 text-white hover:text-swiss-red transition-colors text-sm"
      >
        <Users className="h-4 w-4" />
        Partner Login
      </button>
    </div>
  );
};