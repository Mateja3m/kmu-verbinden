import { supabase } from "@/integrations/supabase/client";

export async function uploadFile(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('expert-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('expert-images')
    .getPublicUrl(filePath);

  return publicUrl;
}