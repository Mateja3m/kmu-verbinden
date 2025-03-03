
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { IndustryLandingLayout } from '@/components/website-redesign/IndustryLandingLayout';
import { IndustryHero } from '@/components/website-redesign/IndustryHero';
import { IndustryPainPoints } from '@/components/website-redesign/IndustryPainPoints';
import { IndustryBenefits } from '@/components/website-redesign/IndustryBenefits';
import { IndustryFeatures } from '@/components/website-redesign/IndustryFeatures';
import { IndustryCaseStudies } from '@/components/website-redesign/IndustryCaseStudies';
import { IndustryPricing } from '@/components/website-redesign/IndustryPricing';
import { IndustryContactForm } from '@/components/website-redesign/IndustryContactForm';
import { useToast } from '@/hooks/use-toast';

interface IndustryData {
  id: string;
  slug: string;
  name: string;
  category: string;
}

interface IndustryContent {
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

const IndustryLanding = () => {
  const { industry } = useParams<{ industry: string }>();
  const [loading, setLoading] = useState(true);
  const [industryData, setIndustryData] = useState<IndustryData | null>(null);
  const [industryContent, setIndustryContent] = useState<IndustryContent | null>(null);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchIndustryData = async () => {
      try {
        setLoading(true);
        
        // Use a more typesafe approach with explicit typing
        interface IndustryRecord {
          id: string;
          slug: string;
          name: string;
          category: string;
          active: boolean;
          created_at: string;
        }
        
        // Type assertion for the query
        const { data: industryResult, error: industryError } = await (supabase
          .from('industries' as any)
          .select('*')
          .eq('slug', industry)
          .eq('active', true)
          .single() as unknown as Promise<{ data: IndustryRecord | null, error: any }>);
        
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
        
        // Type for industry content
        interface IndustryContentRecord {
          id: string;
          industry_id: string;
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
          created_at: string;
        }
        
        // Type assertion for the query
        const { data: contentResult, error: contentError } = await (supabase
          .from('industry_content' as any)
          .select('*')
          .eq('industry_id', industryResult.id)
          .single() as unknown as Promise<{ data: IndustryContentRecord | null, error: any }>);
        
        if (contentError) {
          console.error("Error fetching industry content:", contentError);
          toast({
            title: "Fehler beim Laden der Inhalte",
            description: "Bitte versuchen Sie es später erneut.",
            variant: "destructive"
          });
          return;
        }
        
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
        } else {
          // Default content if not found
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
              { title: "Beispiel Firma", description: "Deutliche Zeitersparnis durch Prozessautomatisierung", image: "/placeholder.svg" }
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
    
    if (industry) {
      fetchIndustryData();
    }
  }, [industry, toast]);
  
  if (notFound) {
    return <Navigate to="/website-redesign" replace />;
  }
  
  if (loading || !industryData || !industryContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-swiss-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Inhalte werden geladen...</p>
        </div>
      </div>
    );
  }
  
  return (
    <IndustryLandingLayout
      metaTitle={industryContent.meta_title}
      metaDescription={industryContent.meta_description}
    >
      <IndustryHero
        headline={industryContent.hero_headline}
        subheadline={industryContent.hero_subheadline}
        industry={industryData.name}
      />
      
      <IndustryPainPoints
        painPoints={industryContent.pain_points}
        industry={industryData.name}
      />
      
      <IndustryBenefits
        benefits={industryContent.benefits}
        industry={industryData.name}
      />
      
      <IndustryFeatures
        features={industryContent.features}
        industry={industryData.name}
      />
      
      <IndustryCaseStudies
        caseStudies={industryContent.case_studies}
        industry={industryData.name}
      />
      
      <IndustryPricing
        pricingDeals={industryContent.pricing_deals}
        industry={industryData.name}
      />
      
      <IndustryContactForm
        industry={industryData.name}
        industrySlug={industryData.slug}
      />
    </IndustryLandingLayout>
  );
};

export default IndustryLanding;
