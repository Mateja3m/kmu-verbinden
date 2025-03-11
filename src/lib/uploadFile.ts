
import { supabase } from "@/integrations/supabase/client";

export async function uploadFile(file: File, bucket: string = 'expert-images') {
  if (!file) {
    throw new Error('No file provided');
  }

  // Generate a unique filename with original extension
  const fileExt = file.name.split('.').pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError, data } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true // Set to true to replace if exists
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return publicUrl;
}

export async function uploadFileWithOriginalName(file: File, bucket: string = 'documents') {
  if (!file) {
    throw new Error('No file provided');
  }

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(file.name, file, {
      cacheControl: '3600',
      upsert: true // Set to true to replace if exists
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(file.name);

  return publicUrl;
}
