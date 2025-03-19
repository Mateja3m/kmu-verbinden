
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
      
      <IndustryAssociation 
        industry={industryData.name} 
      />
      
      <IndustryOffer 
        industry={industryData.name} 
      />
      
      <div id="website-check" className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-6">
              Lassen Sie Ihre {industryData.name}-Website analysieren
            </h2>
            <WebsiteAnalysisDashboard industryId={industryData.slug} />
          </div>
          <div className="md:col-span-1">
            <IndustryQuickStats industry={industryData.name} />
          </div>
        </div>
      </div>
    </IndustryLandingLayout>
  );
};

export default IndustryLanding;
