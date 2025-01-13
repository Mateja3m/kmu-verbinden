import { supabase } from "@/integrations/supabase/client";

export async function uploadFile(file: File) {
  if (!file) {
    throw new Error('No file provided');
  }

  try {
    // Generate a unique filename
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${fileExt}`;

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from('expert-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('expert-images')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw error;
  }
}