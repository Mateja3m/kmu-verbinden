import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { IndustryData, IndustryContent } from '@/types/industry';
import { useToast } from '@/hooks/use-toast';

export const useIndustryData = (industrySlug: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [industryData, setIndustryData] = useState<IndustryData | null>(null);
  const [industryContent, setIndustryContent] = useState<IndustryContent | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchIndustryData = async () => {
      if (!industrySlug) return;
      
      try {
        setLoading(true);
        
        // Fetch industry base data
        const { data: industryResult, error: industryError } = await supabase
          .from('industries')
          .select('*')
          .eq('slug', industrySlug)
          .eq('active', true)
          .single();
        
        if (industryError || !industryResult) {
          console.error("Error fetching industry:", industryError);
          setNotFound(true);
          return;
        }
        
        const typedIndustryData: IndustryData = {
          id: industryResult.id,
          slug: industryResult.slug,
          name: industryResult.name,
          category: industryResult.category
        };
        
        setIndustryData(typedIndustryData);
        
        // Fetch industry content
        const { data: contentResult, error: contentError } = await supabase
          .from('industry_content')
          .select('*')
          .eq('industry_id', industryResult.id)
          .single();
        
        if (contentError && contentError.code !== 'PGRST116') {
          console.error("Error fetching industry content:", contentError);
          toast({
            title: "Fehler beim Laden der Inhalte",
            description: "Bitte versuchen Sie es später erneut.",
            variant: "destructive"
          });
          return;
        }
        
        // If we found specific content, use it
        if (contentResult) {
          const typedContent: IndustryContent = {
            hero_headline: contentResult.hero_headline,
            hero_subheadline: contentResult.hero_subheadline,
            pain_points: contentResult.pain_points,
            benefits: contentResult.benefits,
            features: contentResult.features,
            case_studies: contentResult.case_studies,
            pricing_deals: contentResult.pricing_deals,
            meta_title: contentResult.meta_title,
            meta_description: contentResult.meta_description,
            keywords: contentResult.keywords
          };
          
          setIndustryContent(typedContent);
        } 
        // Otherwise generate generic content as a fallback
        else {
          setIndustryContent({
            hero_headline: `Optimierte Websites für ${typedIndustryData.name}`,
            hero_subheadline: `Professionelle und kundenorientierte Website-Lösungen speziell für ${typedIndustryData.name}`,
            pain_points: [
              { title: "Geringe Online-Sichtbarkeit", description: "Potenzielle Kunden finden Sie nicht im Internet" },
              { title: "Veralteter Webauftritt", description: "Ihre aktuelle Website spiegelt nicht die Qualität Ihrer Arbeit wider" },
              { title: "Wenige Neukundenanfragen", description: "Ihre Website generiert nicht genügend qualifizierte Anfragen" },
              { title: "Zeitaufwändige Verwaltung", description: "Sie verbringen zu viel Zeit mit administrativen Aufgaben" }
            ],
            benefits: [
              { title: "Mehr Sichtbarkeit", description: "Steigern Sie Ihre lokale Sichtbarkeit und werden Sie gefunden" },
              { title: "Professioneller Auftritt", description: "Präsentieren Sie Ihr Unternehmen modern und ansprechend" },
              { title: "Mehr Anfragen", description: "Gewinnen Sie neue Kunden durch optimierte Conversion-Elemente" },
              { title: "Zeitersparnis", description: "Automatisieren Sie Prozesse und sparen Sie wertvolle Zeit" }
            ],
            features: [
              { title: "Responsive Design", description: "Perfekte Darstellung auf allen Geräten" },
              { title: "SEO-Optimierung", description: "Bessere Platzierungen in den Suchergebnissen" },
              { title: "Kontaktformulare", description: "Einfache Kontaktaufnahme für Ihre Kunden" },
              { title: "Content Management", description: "Einfache Verwaltung Ihrer Inhalte" }
            ],
            case_studies: [
              { title: "Beispiel Unternehmen", description: "30% mehr Anfragen innerhalb von 3 Monaten", image: "/placeholder.svg" },
              { title: "Lokales Geschäft", description: "Deutliche Zeitersparnis durch Prozessautomatisierung", image: "/placeholder.svg" }
            ],
            pricing_deals: "Website-Komplettpaket ab CHF 4.900 statt CHF 8.900 | Monatliche Betreuung ab CHF 290",
            meta_title: `${typedIndustryData.name} Website Redesign | SwissKMU`,
            meta_description: `Professionelle Websites für ${typedIndustryData.name}. Steigern Sie Ihre Sichtbarkeit und gewinnen Sie mehr Kunden.`,
            keywords: [`${typedIndustryData.name} Website`, 'Webdesign', 'Website Redesign', 'SwissKMU']
          });
        }
      } catch (error) {
        console.error("Error in data fetching:", error);
        toast({
          title: "Fehler beim Laden der Daten",
          description: "Bitte versuchen Sie es später erneut.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (industrySlug) {
      fetchIndustryData();
    }
  }, [industrySlug, toast]);

  return { loading, industryData, industryContent, notFound };
};
