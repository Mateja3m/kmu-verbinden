import { supabase } from "@/integrations/supabase/client";

export async function uploadFile(file: File) {
  if (!file) {
    throw new Error('No file provided');
  }

  // Sanitize filename
  const fileName = 'statuten.pdf';

  const { error: uploadError, data } = await supabase.storage
    .from('expert-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true // Set to true to replace if exists
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('expert-images')
    .getPublicUrl(fileName);

  return publicUrl;
}