
export interface IndustryData {
  id: string;
  slug: string;
  name: string;
  category: string;
}

export interface IndustryContent {
  hero_headline: string;
  hero_subheadline: string;
  pain_points: Array<{ title: string; description: string }>;
  benefits: Array<{ title: string; description: string }>;
  features: Array<{ title: string; description: string }>;
  case_studies: Array<{ title: string; description: string; image: string }>;
  pricing_deals: string;
  meta_title: string;
  meta_description: string;
  keywords: string[];
}
