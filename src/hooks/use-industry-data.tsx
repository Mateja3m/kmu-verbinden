
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
        
        // Override name for zahnarzt to zahnärzte
        let industryName = industryResult.name;
        if (industryResult.slug === 'zahnarzt') {
          industryName = "Zahnärzte";
        }
        
        const typedIndustryData: IndustryData = {
          id: industryResult.id,
          slug: industryResult.slug,
          name: industryName,
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
          // Parse JSON fields correctly
          const painPoints = typeof contentResult.pain_points === 'string' 
            ? JSON.parse(contentResult.pain_points) 
            : contentResult.pain_points;
            
          const benefits = typeof contentResult.benefits === 'string' 
            ? JSON.parse(contentResult.benefits) 
            : contentResult.benefits;
            
          const features = typeof contentResult.features === 'string' 
            ? JSON.parse(contentResult.features) 
            : contentResult.features;
            
          const caseStudies = typeof contentResult.case_studies === 'string' 
            ? JSON.parse(contentResult.case_studies) 
            : contentResult.case_studies;

          const typedContent: IndustryContent = {
            hero_headline: contentResult.hero_headline,
            hero_subheadline: contentResult.hero_subheadline,
            pain_points: painPoints,
            benefits: benefits,
            features: features,
            case_studies: caseStudies,
            pricing_deals: contentResult.pricing_deals,
            meta_title: contentResult.meta_title,
            meta_description: contentResult.meta_description,
            keywords: contentResult.keywords
          };
          
          setIndustryContent(typedContent);
        } 
        // Otherwise generate generic content as a fallback
        else {
          // For zahnarzt, create custom content
          if (industryResult.slug === 'zahnarzt') {
            setIndustryContent({
              hero_headline: `Optimierte Websites für Zahnärzte`,
              hero_subheadline: `Professionelle und patientenorientierte Website-Lösungen speziell für Zahnärzte und Zahnarztpraxen`,
              pain_points: [
                { title: "Geringe Online-Sichtbarkeit", description: "Potenzielle Patienten finden Ihre Praxis nicht im Internet" },
                { title: "Veralteter Webauftritt", description: "Ihre aktuelle Website spiegelt nicht die Qualität Ihrer Behandlungen wider" },
                { title: "Wenige Neupatientenanfragen", description: "Ihre Website generiert nicht genügend qualifizierte Anfragen" },
                { title: "Zeitaufwändige Terminverwaltung", description: "Sie verbringen zu viel Zeit mit der manuellen Terminplanung" }
              ],
              benefits: [
                { title: "Mehr lokale Sichtbarkeit", description: "Steigern Sie Ihre lokale Präsenz und werden Sie von Patienten in Ihrer Nähe gefunden" },
                { title: "Professioneller Auftritt", description: "Präsentieren Sie Ihre Zahnarztpraxis modern und vertrauenswürdig" },
                { title: "Mehr Neupatientenanfragen", description: "Gewinnen Sie neue Patienten durch optimierte Konversions-Elemente" },
                { title: "Digitale Terminbuchung", description: "Automatisieren Sie Ihre Terminvergabe und sparen Sie wertvolle Zeit" },
                { title: "Optimierte Patientenkommunikation", description: "Verbessern Sie den Dialog mit Ihren Patienten durch integrierte Kontaktmöglichkeiten" },
                { title: "Verbesserte Patientenaufklärung", description: "Informieren Sie Patienten über Behandlungen mit hochwertigen Inhalten und steigern Sie so Ihr Praxismarketing" }
              ],
              features: [
                { title: "Online-Terminbuchung", description: "Patienten können direkt online Termine buchen" },
                { title: "SEO-Optimierung für Zahnärzte", description: "Spezialisierte Suchmaschinenoptimierung für Zahnarztpraxen" },
                { title: "Behandlungsübersicht", description: "Ansprechende Darstellung Ihrer zahnmedizinischen Behandlungen" },
                { title: "Vertrauensbildende Elemente", description: "Bewertungen, Zertifikate und Ausbildungsnachweise integriert" },
                { title: "Praxistour & Team-Vorstellung", description: "Virtuelle Einblicke in Ihre Praxis und Vorstellung Ihres Teams" },
                { title: "Automatisierte Erinnerungen", description: "Automatische Terminerinnerungen per E-Mail oder SMS" }
              ],
              case_studies: [
                { title: "Zahnarztpraxis Dr. Müller", description: "35% mehr Neupatientenanfragen innerhalb von 3 Monaten", image: "/placeholder.svg" },
                { title: "Zahnärzte im Zentrum", description: "Reduzierung des Verwaltungsaufwands um 25% durch Online-Terminbuchung", image: "/placeholder.svg" }
              ],
              pricing_deals: "Website-Komplettpaket für Zahnärzte ab CHF 4.900 statt CHF 7.900 | Monatliche Betreuung ab CHF 290",
              meta_title: `Zahnärzte Website Lösungen | Speziell für Zahnarztpraxen | SwissKMU`,
              meta_description: `Professionelle Websites für Zahnärzte. Steigern Sie Ihre lokale Sichtbarkeit und gewinnen Sie mehr Patienten.`,
              keywords: ['Zahnarzt Website', 'Zahnarztpraxis Webdesign', 'Website für Zahnärzte', 'SwissKMU']
            });
          } else {
            // Standard fallback for other industries
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
