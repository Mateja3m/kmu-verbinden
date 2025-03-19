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
        
        // Override name for specific industries
        let industryName = industryResult.name;
        if (industryResult.slug === 'zahnarzt') {
          industryName = "Zahnärzte";
        } else if (industryResult.slug === 'fahrschule') {
          industryName = "Fahrschulen";
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
              pricing_deals: "Vergünstigungen von bis zu 30% auf Websites mit Terminbuchungssystem",
              meta_title: "Webdesign für Zahnärzte | Patienten gewinnen mit moderner Website",
              meta_description: "Spezialisierte Website-Lösungen für Zahnärzte mit Online-Terminbuchung und SEO-Optimierung. Gewinnen Sie mehr Patienten und sparen Sie Zeit.",
              keywords: ["Zahnarzt Website", "Webdesign Zahnarztpraxis", "SEO für Zahnärzte", "Online-Terminbuchung Zahnarzt", "Zahnarzt-Marketing"]
            });
          } 
          // For driving schools, create custom content
          else if (industryResult.slug === 'fahrschule') {
            setIndustryContent({
              hero_headline: `Optimierte Websites für Fahrschulen`,
              hero_subheadline: `Professionelle und schülerorientierte Website-Lösungen speziell für Fahrschulen und Fahrlehrer`,
              pain_points: [
                { title: "Geringe Online-Sichtbarkeit", description: "Potenzielle Fahrschüler finden Ihre Fahrschule nicht im Internet" },
                { title: "Veralteter Webauftritt", description: "Ihre aktuelle Website spiegelt nicht die Qualität Ihrer Fahrausbildung wider" },
                { title: "Zeitaufwändige Terminplanung", description: "Sie verbringen zu viel Zeit mit der manuellen Verwaltung von Fahrstunden" },
                { title: "Wenige Neuanmeldungen", description: "Ihre Website generiert nicht genügend qualifizierte Anfragen von Fahrschülern" },
                { title: "Fehlende Bewertungssammlung", description: "Sie schöpfen das Potenzial von Empfehlungen und Bewertungen nicht aus" },
                { title: "Schwierige Erreichbarkeit", description: "Fahrschüler können Sie außerhalb der Bürozeiten nicht erreichen" }
              ],
              benefits: [
                { title: "Mehr lokale Sichtbarkeit", description: "Steigern Sie Ihre lokale Präsenz und werden Sie von Fahrschülern in Ihrer Nähe gefunden" },
                { title: "Professioneller Auftritt", description: "Präsentieren Sie Ihre Fahrschule modern und vertrauenswürdig online" },
                { title: "Online-Buchungssystem", description: "Automatisieren Sie Ihre Terminvergabe und ermöglichen Sie 24/7 Buchungen" },
                { title: "Mehr Neuanmeldungen", description: "Gewinnen Sie neue Fahrschüler durch optimierte Konversions-Elemente" },
                { title: "Automatisierte Bewertungen", description: "Sammeln Sie automatisch Bewertungen nach bestandenen Prüfungen" },
                { title: "Reduzierter Verwaltungsaufwand", description: "Sparen Sie wertvolle Zeit durch digitalisierte administrative Prozesse" }
              ],
              features: [
                { title: "Online-Fahrstundenbuchung", description: "Schüler können direkt online Termine buchen und verwalten" },
                { title: "SEO für Fahrschulen", description: "Spezialisierte lokale Suchmaschinenoptimierung für Fahrschulen" },
                { title: "Führerscheinklassen-Übersicht", description: "Ansprechende Darstellung Ihrer angebotenen Führerscheinklassen" },
                { title: "Fahrlehrer-Vorstellung", description: "Professionelle Präsentation Ihres Teams und Ihrer Fahrzeuge" },
                { title: "Bewertungsmanagement", description: "Automatisierte Sammlung und Anzeige von Schülerbewertungen" },
                { title: "Responsives Design", description: "Optimale Darstellung auf allen Geräten, besonders wichtig für junge Zielgruppen" }
              ],
              case_studies: [
                { title: "Fahrschule Muster", description: "40% mehr Neuanmeldungen innerhalb von 3 Monaten nach dem Relaunch", image: "/placeholder.svg" },
                { title: "Fahrschule Drive Smart", description: "Reduzierung des Verwaltungsaufwands um 35% durch Online-Buchungssystem", image: "/placeholder.svg" }
              ],
              pricing_deals: "Vergünstigungen von bis zu 40% auf Websites mit Buchungssystem für Fahrschulen",
              meta_title: "Webdesign für Fahrschulen | Buchungssystem & Online-Präsenz für Fahrlehrer",
              meta_description: "Spezialisierte Website-Lösungen für Fahrschulen mit Online-Terminbuchung und Bewertungsmanagement. Gewinnen Sie mehr Fahrschüler und sparen Sie Zeit.",
              keywords: ["Fahrschule Website", "Webdesign Fahrschule", "SEO für Fahrschulen", "Online-Terminbuchung Fahrschule", "Fahrschul-Marketing", "Fahrschul-Buchungssystem", "Homepage Fahrlehrer", "Fahrschule Online-Anmeldung"]
            });
          } 
          // For all other industries
          else {
            setIndustryContent({
              hero_headline: `Optimierte Websites für ${industryData.name}`,
              hero_subheadline: `Professionelle und kundenorientierte Website-Lösungen speziell für ${industryData.name}`,
              pain_points: [
                { title: "Geringe Online-Sichtbarkeit", description: "Potenzielle Kunden finden Ihr Unternehmen nicht im Internet" },
                { title: "Veralteter Webauftritt", description: "Ihre aktuelle Website spiegelt nicht die Qualität Ihrer Dienstleistungen wider" },
                { title: "Wenige Neukundenanfragen", description: "Ihre Website generiert nicht genügend qualifizierte Anfragen" },
                { title: "Komplizierte Kontaktaufnahme", description: "Kunden haben Schwierigkeiten, mit Ihnen in Kontakt zu treten" }
              ],
              benefits: [
                { title: "Mehr lokale Sichtbarkeit", description: "Steigern Sie Ihre lokale Präsenz und werden Sie von Kunden in Ihrer Nähe gefunden" },
                { title: "Professioneller Auftritt", description: "Präsentieren Sie Ihr Unternehmen modern und vertrauenswürdig" },
                { title: "Mehr Neukundenanfragen", description: "Gewinnen Sie neue Kunden durch optimierte Konversions-Elemente" },
                { title: "Optimierte Kundenkommunikation", description: "Verbessern Sie den Dialog mit Ihren Kunden durch integrierte Kontaktmöglichkeiten" }
              ],
              features: [
                { title: "Responsives Design", description: "Optimale Darstellung auf allen Geräten, vom Desktop bis zum Smartphone" },
                { title: "SEO-Optimierung", description: "Professionelle Suchmaschinenoptimierung für bessere Rankings" },
                { title: "Kontaktformulare", description: "Benutzerfreundliche Möglichkeiten zur Kontaktaufnahme" },
                { title: "Content Management", description: "Einfaches Backend zur selbständigen Aktualisierung von Inhalten" }
              ],
              case_studies: [
                { title: "Beispielunternehmen", description: "30% mehr Neukundenanfragen durch verbesserte Online-Präsenz", image: "/placeholder.svg" },
                { title: "Musterfirma GmbH", description: "Umsatzsteigerung von 25% durch optimierte Website", image: "/placeholder.svg" }
              ],
              pricing_deals: "Vergünstigungen von bis zu 25% auf Websites für Vereinsmitglieder",
              meta_title: `Webdesign für ${industryData.name} | Professionelle Websites für mehr Kunden`,
              meta_description: `Spezialisierte Website-Lösungen für ${industryData.name} mit optimierter Benutzerfreundlichkeit. Gewinnen Sie mehr Kunden und stärken Sie Ihre Online-Präsenz.`,
              keywords: [`${industryData.name} Website`, `Webdesign ${industryData.name}`, `${industryData.name} Online-Präsenz`]
            });
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error in useIndustryData:", error);
        setLoading(false);
        setNotFound(true);
        toast({
          title: "Fehler beim Laden der Branchendaten",
          description: "Bitte versuchen Sie es später erneut.",
          variant: "destructive"
        });
      }
    };
    
    fetchIndustryData();
  }, [industrySlug, toast]);
  
  return { loading, industryData, industryContent, notFound };
};
