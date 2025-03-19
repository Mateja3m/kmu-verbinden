
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet';

interface IndustryLandingLayoutProps {
  children: React.ReactNode;
  metaTitle?: string;
  metaDescription?: string;
  industry?: string;
  canonical?: string;
  keywords?: string[];
  schema?: any;
}

export const IndustryLandingLayout = ({ 
  children,
  metaTitle,
  metaDescription,
  industry,
  canonical,
  keywords = [],
  schema
}: IndustryLandingLayoutProps) => {
  const { industry: industrySlug } = useParams<{ industry: string }>();
  
  // Default canonical URL based on current path
  const defaultCanonical = `${window.location.origin}/website-redesign/branche/${industrySlug}`;
  
  // Prepare schema markup as JSON-LD
  const schemaMarkup = schema ? JSON.stringify(schema) : null;

  // Industry-specific additional meta tags
  const getAdditionalMetaTags = () => {
    if (industrySlug === 'fahrschule') {
      return (
        <>
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Schweizerischer KMU Verein" />
          <meta name="geo.region" content="CH" />
          <meta name="geo.placename" content="Schweiz" />
          <meta name="format-detection" content="telephone=yes" />
          <meta property="article:publisher" content="https://www.facebook.com/swisskmu" />
          <meta property="og:image" content="https://ofv-fahrlehrer.ch/wp-content/uploads/2019/07/iStock-914775770-1500x630.jpg" />
          <meta property="og:image:width" content="1500" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content="Fahrlehrer unterrichtet Fahrschüler in einem Fahrschulauto" />
          <meta name="twitter:image" content="https://ofv-fahrlehrer.ch/wp-content/uploads/2019/07/iStock-914775770-1500x630.jpg" />
        </>
      );
    }
    return null;
  };

  const additionalMetaTags = getAdditionalMetaTags();

  return (
    <div className="min-h-screen bg-white pt-14">
      <Helmet>
        {metaTitle && <title>{metaTitle}</title>}
        {metaDescription && <meta name="description" content={metaDescription} />}
        <link rel="canonical" href={canonical || defaultCanonical} />
        {keywords && keywords.length > 0 && (
          <meta name="keywords" content={keywords.join(', ')} />
        )}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonical || defaultCanonical} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="de_CH" />
        {industry && <meta property="og:site_name" content={`SwissKMU - Website-Redesign für ${industry}`} />}
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        
        <link rel="alternate" hrefLang="de-ch" href={canonical || defaultCanonical} />
        <link rel="alternate" hrefLang="x-default" href={canonical || defaultCanonical} />
        
        {/* Industry-specific additional meta tags */}
        {additionalMetaTags}
        
        {schemaMarkup && (
          <script type="application/ld+json">
            {schemaMarkup}
          </script>
        )}
      </Helmet>
      
      {/* Back button */}
      <div className="container mx-auto px-4 py-2">
        <Link 
          to="/website-redesign" 
          className="inline-flex items-center text-sm text-gray-500 hover:text-swiss-red transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Zurück zur Übersicht
        </Link>
      </div>
      
      {/* Main content */}
      {children}
    </div>
  );
};
