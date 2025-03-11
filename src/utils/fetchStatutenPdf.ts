
import { supabase } from "@/integrations/supabase/client";

export async function fetchStatutenPdf(): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .storage
      .from('documents')
      .list('', {
        search: 'statuten.pdf'
      });

    if (error) {
      console.error('Error fetching statuten PDF:', error);
      return null;
    }

    if (data && data.length > 0) {
      const { data: { publicUrl } } = supabase
        .storage
        .from('documents')
        .getPublicUrl('statuten.pdf');
      
      return publicUrl;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return null;
  }
}
