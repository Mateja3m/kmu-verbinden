
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NewsHeader } from "./news/NewsHeader";
import { NewsForm } from "./news/NewsForm";
import { SamplePostGenerator } from "./news/SamplePostGenerator";

export function NewsSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  
  const { 
    checkAndCreateSamplePosts, 
    permissionError, 
    hasInitializedSamples 
  } = SamplePostGenerator();

  useEffect(() => {
    // Check if we're in edit mode based on the URL query param
    const searchParams = new URLSearchParams(location.search);
    const editPostId = searchParams.get('edit');
    
    if (editPostId) {
      setEditMode(true);
    } else {
      setEditMode(false);
      // Only try to create sample posts when not in edit mode
      checkAndCreateSamplePosts();
    }
  }, [location, checkAndCreateSamplePosts]);

  const handleCancel = () => {
    navigate('/admin?tab=blog-manager');
  };

  return (
    <div>
      <NewsHeader 
        editMode={editMode} 
        onCancel={handleCancel} 
      />
      <NewsForm />
    </div>
  );
}
