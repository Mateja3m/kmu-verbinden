
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { IndustryLandingLayout } from '@/components/website-redesign/IndustryLandingLayout';
import { IndustryHero } from '@/components/website-redesign/IndustryHero';
import { IndustryPainPoints } from '@/components/website-redesign/IndustryPainPoints';
import { IndustryBenefits } from '@/components/website-redesign/IndustryBenefits';
import { IndustryFeatures } from '@/components/website-redesign/IndustryFeatures';
import { IndustryAssociation } from '@/components/website-redesign/IndustryAssociation';
import { IndustryOffer } from '@/components/website-redesign/IndustryOffer';
import { WebsiteAnalysisDashboard } from '@/components/website-redesign/WebsiteAnalysisDashboard';
import { IndustryLoading } from '@/components/website-redesign/IndustryLoading';
import { IndustryQuickStats } from '@/components/website-redesign/IndustryQuickStats';
import { FAQSection } from '@/components/website-redesign/FAQSection';
import { useIndustryData } from '@/hooks/use-industry-data';

const IndustryLanding = () => {
  const { industry } = useParams<{ industry: string }>();
  const { loading, industryData, industryContent, notFound } = useIndustryData(industry);
  
  if (notFound) {
    return <Navigate to="/website-redesign" replace />;
  }
  
  if (loading || !industryData || !industryContent) {
    return <IndustryLoading />;
  }

  // Default FAQ items
  const faqItems = [
    {
      question: 'Warum ist eine professionelle Website für eine Zahnarztpraxis wichtig?',
      answer: 'Eine professionelle Website ist für Zahnarztpraxen wichtig, da sie oft der erste Kontaktpunkt mit potenziellen Patienten ist. Sie vermittelt Vertrauen, präsentiert Ihre Dienstleistungen und ermöglicht es Patienten, Sie einfach zu finden und zu kontaktieren. Eine optimal gestaltete Website kann neue Patienten gewinnen und bestehende binden.'
    },
    {
      question: 'Wie lange dauert die Erstellung einer neuen Website für meine Zahnarztpraxis?',
      answer: 'Die Erstellung einer Website für Ihre Zahnarztpraxis dauert in der Regel 4-6 Wochen. Der genaue Zeitrahmen hängt von verschiedenen Faktoren ab, wie dem Umfang des Projekts, der Verfügbarkeit von Inhalten und Bildern sowie der Geschwindigkeit Ihres Feedbacks während des Entwicklungsprozesses.'
    },
    {
      question: 'Welche speziellen Funktionen sollte eine Zahnarztpraxis-Website haben?',
      answer: 'Eine effektive Website für Zahnarztpraxen sollte folgende Funktionen bieten: Online-Terminbuchung, Darstellung Ihrer Behandlungen und Leistungen, Vorstellung des Praxisteams, Anfahrtsbeschreibung, Patienteninformationen, Notfallkontakt und vertrauensbildende Elemente wie Bewertungen oder Zertifikate. All diese Elemente optimieren wir für maximale Benutzerfreundlichkeit und Conversion.'
    },
    {
      question: 'Wie wird meine Zahnarztpraxis in den lokalen Suchergebnissen besser gefunden?',
      answer: 'Für eine bessere lokale Sichtbarkeit optimieren wir Ihre Website mit lokalem SEO, erstellen oder optimieren Ihren Google Business-Eintrag, implementieren strukturierte Daten (Schema.org) für Ihre Praxis, integrieren eine Google Maps-Karte auf Ihrer Website und stellen sicher, dass Ihre NAP-Daten (Name, Adresse, Telefonnummer) konsistent auf allen Plattformen erscheinen.'
    },
    {
      question: 'Wie kann ich als Mitglied des KMU-Vereins von Sonderkonditionen für das Website-Redesign profitieren?',
      answer: 'Als Mitglied des Schweizerischen KMU Vereins erhalten Sie exklusive Vergünstigungen für Website-Dienstleistungen. Sie profitieren von Sonderkonditionen bei unseren zertifizierten Partnern, die wir speziell für Sie ausgehandelt haben. Kontaktieren Sie uns für eine individuelle Beratung und erfahren Sie mehr über die konkreten Einsparungen für Ihre Zahnarztpraxis.'
    }
  ];
  
  // Generate Schema.org structured data
  const generateSchema = () => {
    // Base organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SwissKMU Verein",
      "url": "https://www.swisskmu.ch",
      "logo": "https://www.swisskmu.ch/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+41-XX-XXX-XX-XX",
        "contactType": "customer service",
        "availableLanguage": ["German", "French", "Italian", "English"]
      }
    };
    
    // Website schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": window.location.origin,
      "name": industryContent.meta_title,
      "description": industryContent.meta_description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/suche?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };
    
    // Service schema specifically for dental websites
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Webdesign für ${industryData.name}`,
      "provider": organizationSchema,
      "description": industryContent.hero_subheadline,
      "areaServed": {
        "@type": "Country",
        "name": "Switzerland"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": industryData.name
      },
      "offers": {
        "@type": "Offer",
        "description": "Website-Komplettpaket für Zahnärzte zu Sonderkonditionen für Vereinsmitglieder",
        "price": "4900",
        "priceCurrency": "CHF"
      }
    };
    
    // BreadcrumbList schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Startseite",
          "item": window.location.origin
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Website-Redesign",
          "item": `${window.location.origin}/website-redesign`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": `${industryData.name}`,
          "item": window.location.href
        }
      ]
    };
    
    // FAQ schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
    
    // Return an array of all schema objects
    return [
      organizationSchema,
      websiteSchema,
      serviceSchema,
      breadcrumbSchema,
      faqSchema
    ];
  };
  
  const schema = generateSchema();
  
  // Enhance meta title and description specifically for dentists if needed
  let metaTitle = industryContent.meta_title;
  let metaDescription = industryContent.meta_description;
  
  if (industryData.slug === 'zahnarzt') {
    metaTitle = "Professionelles Webdesign für Zahnarztpraxen | Patientengewinnung mit modernen Websites";
    metaDescription = "Spezialisierte Website-Lösungen für Zahnärzte: Gewinnen Sie mehr Patienten, optimieren Sie Ihre Online-Präsenz und präsentieren Sie Ihre Zahnarztpraxis modern und vertrauenerweckend. Sonderkonditionen für KMU-Vereinsmitglieder.";
  }
  
  return (
    <IndustryLandingLayout
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      industry={industryData.name}
      keywords={industryContent.keywords}
      schema={schema}
    >
      <IndustryHero
        headline={industryData.slug === 'zahnarzt' ? "Professionelles Webdesign für Zahnarztpraxen" : industryContent.hero_headline}
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
      
      <IndustryAssociation 
        industry={industryData.name} 
      />
      
      <IndustryOffer 
        industry={industryData.name} 
      />
      
      <div id="website-check" className="container mx-auto px-4 pt-4 pb-16">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-8 text-center">
            Lassen Sie Ihre Website analysieren
          </h2>
          
          <div className="w-full mx-auto">
            <WebsiteAnalysisDashboard industryId={industryData.slug} />
          </div>
        </div>
      </div>
      
      {/* Add FAQ Section for SEO and user information */}
      <FAQSection items={faqItems} />
    </IndustryLandingLayout>
  );
};

export default IndustryLanding;
