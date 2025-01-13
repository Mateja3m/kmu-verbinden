import { supabase } from "@/integrations/supabase/client";

export async function uploadFile(file: File) {
  if (!file) {
    throw new Error('No file provided');
  }

  // Sanitize filename to remove non-ASCII characters
  const sanitizedName = file.name.replace(/[^\x00-\x7F]/g, '');
  const fileExt = sanitizedName.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;

  const { error: uploadError, data } = await supabase.storage
    .from('expert-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
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