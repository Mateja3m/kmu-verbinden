
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { IndustryLandingLayout } from '@/components/website-redesign/IndustryLandingLayout';
import { IndustryHero } from '@/components/website-redesign/IndustryHero';
import { IndustryPainPoints } from '@/components/website-redesign/IndustryPainPoints';
import { IndustryBenefits } from '@/components/website-redesign/IndustryBenefits';
import { IndustryFeatures } from '@/components/website-redesign/IndustryFeatures';
import { IndustryTechnology } from '@/components/website-redesign/IndustryTechnology';
import { MembershipOffer } from '@/components/website-redesign/MembershipOffer';
import { IndustryPricing } from '@/components/website-redesign/IndustryPricing';
import { IndustryContactForm } from '@/components/website-redesign/IndustryContactForm';
import { IndustryLoading } from '@/components/website-redesign/IndustryLoading';
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
      
      <IndustryTechnology 
        industry={industryData.name}
      />
      
      <MembershipOffer 
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
