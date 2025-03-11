
/**
 * Fetches the URL of the Statuten PDF from Supabase storage
 */
export async function fetchStatutenPdf(): Promise<string> {
  // Return the static URL for the Statuten document
  return "https://uqxvvjdegwukvvrefkho.supabase.co/storage/v1/object/public/documents/Statuten.pdf";
}
