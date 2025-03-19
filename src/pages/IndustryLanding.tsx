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
import { FAQSection } from '@/components/website-redesign/FAQSection';
import { useIndustryData } from '@/hooks/use-industry-data';
import { IndustryIntroduction } from '@/components/website-redesign/IndustryIntroduction';
import { IndustryStats } from '@/components/website-redesign/IndustryStats';
import { IndustryCaseStudies } from '@/components/website-redesign/IndustryCaseStudies';
import { Skeleton } from '@/components/ui/skeleton';

const IndustryLanding = () => {
  const { industry } = useParams<{ industry: string }>();
  const { loading, industryData, industryContent, notFound } = useIndustryData(industry);
  
  if (notFound) {
    return <Navigate to="/website-redesign" replace />;
  }
  
  if (loading || !industryData || !industryContent) {
    return <IndustryLoading />;
  }

  const getFaqItems = (industrySlug: string) => {
    if (industrySlug === 'zahnarzt') {
      return [
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
          answer: 'Als Mitglied des Schweizerischen KMU Vereins erhalten Sie exklusive Vergünstigungen für Website-Dienstleistungen speziell für Zahnarztpraxen. Sie profitieren von Sonderkonditionen bei unseren zertifizierten Partnern, die wir speziell für Sie ausgehandelt haben. Die Komplettlösung beinhaltet ein Buchungssystem, Online-Bewertungsmanagement und SEO-Optimierung zu einem Vorzugspreis mit Einsparungen von bis zu 40% gegenüber Marktpreisen.'
        }
      ];
    } else if (industrySlug === 'fahrschule') {
      return [
        {
          question: 'Warum ist eine professionelle Website für eine Fahrschule wichtig?',
          answer: 'Eine professionelle Website ist für Fahrschulen entscheidend, da sie häufig der erste Kontaktpunkt mit potenziellen Fahrschülern ist. Sie vermittelt Vertrauen, präsentiert Ihre Kurse und Ausbildungsangebote und ermöglicht es Interessenten, Sie einfach zu finden und zu kontaktieren. Laut Statistik informieren sich über 80% der Fahrschüler zuerst online, bevor sie sich für eine Fahrschule entscheiden.'
        },
        {
          question: 'Welche speziellen Funktionen sollte eine Fahrschule-Website haben?',
          answer: 'Eine effektive Website für Fahrschulen sollte folgende Funktionen bieten: Online-Terminbuchung für Fahrstunden, Darstellung der Ausbildungsangebote und Preise, Online-Anmeldung zu Kursen, ein Bereich für Lernmaterialien, Vorstellung der Fahrlehrer, Erfolgsgeschichten früherer Schüler, FAQs zur Führerscheinprüfung und integrierte Bewertungen. All diese Elemente optimieren wir für maximale Benutzerfreundlichkeit und Conversion.'
        },
        {
          question: 'Wie kann ein Online-Buchungssystem meiner Fahrschule helfen?',
          answer: 'Ein digitales Buchungssystem revolutioniert den Arbeitsalltag einer Fahrschule: Es reduziert den administrativen Aufwand erheblich, verhindert Terminüberschneidungen, ermöglicht Fahrschülern 24/7 Buchungen vorzunehmen, sendet automatische Erinnerungen für anstehende Fahrstunden, vereinfacht die Rechnungsstellung und gibt Ihnen wertvolle Einblicke in Ihre Auslastung. Die Zeitersparnis liegt bei durchschnittlich 8-12 Stunden pro Woche.'
        },
        {
          question: 'Wie wird meine Fahrschule in den lokalen Suchergebnissen besser gefunden?',
          answer: 'Für eine bessere lokale Sichtbarkeit optimieren wir Ihre Website mit lokalem SEO, erstellen oder optimieren Ihren Google Business-Eintrag, implementieren strukturierte Daten (Schema.org) für Ihre Fahrschule, integrieren eine Google Maps-Karte auf Ihrer Website und stellen sicher, dass Ihre NAP-Daten (Name, Adresse, Telefonnummer) konsistent auf allen Plattformen erscheinen. Zusätzlich optimieren wir für lokale Suchbegriffe wie "Fahrschule [Ihre Stadt]" und "Führerschein machen in [Region]".'
        },
        {
          question: 'Wie kann das Online-Bewertungssystem meiner Fahrschule neue Kunden bringen?',
          answer: 'Unser integriertes Bewertungssystem für Fahrschulen ist ein starkes Werkzeug zur Kundenakquise: 92% der Fahrschüler lesen Online-Bewertungen vor der Anmeldung. Das System sammelt automatisch Feedback nach bestandenen Prüfungen, macht positive Erfahrungen auf Ihrer Website und Google Business Profil sichtbar und baut durch authentische Erfahrungsberichte Vertrauen bei Interessenten auf. Fahrschulen mit mehr als 15 positiven Bewertungen verzeichnen durchschnittlich 40% mehr Anfragen.'
        },
        {
          question: 'Wie kann ich als Mitglied des KMU-Vereins von Sonderkonditionen für das Website-Redesign profitieren?',
          answer: 'Als Mitglied des Schweizerischen KMU Vereins erhalten Sie exklusive Vergünstigungen für Website-Dienstleistungen speziell für Fahrschulen. Sie profitieren von Sonderkonditionen bei unseren zertifizierten Partnern, die wir speziell für Sie ausgehandelt haben. Die Komplettlösung beinhaltet ein Buchungssystem, Online-Bewertungsmanagement und SEO-Optimierung zu einem Vorzugspreis mit Einsparungen von bis zu 40% gegenüber Marktpreisen.'
        }
      ];
    } else {
      return [
        {
          question: 'Warum ist eine professionelle Website für ein KMU wichtig?',
          answer: 'Eine professionelle Website ist für KMUs wichtig, da sie oft der erste Kontaktpunkt mit potenziellen Kunden ist. Sie vermittelt Vertrauen, präsentiert Ihre Dienstleistungen und ermöglicht es Kunden, Sie einfach zu finden und zu kontaktieren. Eine optimal gestaltete Website kann neue Kunden gewinnen und bestehende binden.'
        },
        {
          question: 'Wie lange dauert die Erstellung einer neuen Website für mein Unternehmen?',
          answer: 'Die Erstellung einer Website für Ihr Unternehmen dauert in der Regel 4-6 Wochen. Der genaue Zeitrahmen hängt von verschiedenen Faktoren ab, wie dem Umfang des Projekts, der Verfügbarkeit von Inhalten und Bildern sowie der Geschwindigkeit Ihres Feedbacks während des Entwicklungsprozesses.'
        },
        {
          question: 'Welche speziellen Funktionen sollte eine KMU-Website haben?',
          answer: 'Eine effektive Website für KMUs sollte folgende Funktionen bieten: Klare Darstellung Ihrer Produkte oder Dienstleistungen, Kontaktformulare, Integrationen mit Ihren Social-Media-Kanälen, SEO-Optimierung, ein responsives Design für mobile Geräte und vertrauensbildende Elemente wie Kundenbewertungen oder Zertifikate. All diese Elemente optimieren wir für maximale Benutzerfreundlichkeit und Conversion.'
        },
        {
          question: 'Wie wird mein Unternehmen in den lokalen Suchergebnissen besser gefunden?',
          answer: 'Für eine bessere lokale Sichtbarkeit optimieren wir Ihre Website mit lokalem SEO, erstellen oder optimieren Ihren Google Business-Eintrag, implementieren strukturierte Daten (Schema.org), integrieren eine Google Maps-Karte auf Ihrer Website und stellen sicher, dass Ihre NAP-Daten (Name, Adresse, Telefonnummer) konsistent auf allen Plattformen erscheinen.'
        },
        {
          question: 'Wie kann ich als Mitglied des KMU-Vereins von Sonderkonditionen für das Website-Redesign profitieren?',
          answer: 'Als Mitglied des Schweizerischen KMU Vereins erhalten Sie exklusive Vergünstigungen für Website-Dienstleistungen. Sie profitieren von Sonderkonditionen bei unseren zertifizierten Partnern, die wir speziell für Sie ausgehandelt haben. Kontaktieren Sie uns für eine individuelle Beratung und erfahren Sie mehr über die konkreten Einsparungen für Ihr Unternehmen.'
        }
      ];
    }
  };
  
  const generateSchema = () => {
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
    
    const getServiceSchema = () => {
      if (industryData.slug === 'zahnarzt') {
        return {
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
      } else if (industryData.slug === 'fahrschule') {
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": `Webdesign für ${industryData.name}`,
          "provider": organizationSchema,
          "description": "Professionelle Website-Lösungen mit Online-Buchungssystem und Bewertungsmanagement speziell für Fahrschulen in der Schweiz",
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
            "description": "Website-Komplettpaket für Fahrschulen mit Buchungssystem zu Sonderkonditionen für Vereinsmitglieder",
            "price": "4900",
            "priceCurrency": "CHF"
          },
          "keywords": "Fahrschule Website, Fahrschule Webdesign, Online-Buchungssystem Fahrschule, Fahrschule Internetseite, Homepage für Fahrlehrer, Fahrschul-Software"
        };
      } else {
        return {
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
            "description": `Website-Komplettpaket für ${industryData.name} zu Sonderkonditionen für Vereinsmitglieder`,
            "price": "4900",
            "priceCurrency": "CHF"
          }
        };
      }
    };
    
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
    
    const faqItems = getFaqItems(industryData.slug);
    
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
    
    return [
      organizationSchema,
      websiteSchema,
      getServiceSchema(),
      breadcrumbSchema,
      faqSchema
    ];
  };
  
  const schema = generateSchema();
  
  let metaTitle = industryContent.meta_title;
  let metaDescription = industryContent.meta_description;
  let keywords = industryContent.keywords || [];
  
  if (industryData.slug === 'zahnarzt') {
    metaTitle = "Professionelles Webdesign für Zahnarztpraxen | Patientengewinnung mit modernen Websites";
    metaDescription = "Spezialisierte Website-Lösungen für Zahnärzte: Gewinnen Sie mehr Patienten, optimieren Sie Ihre Online-Präsenz und präsentieren Sie Ihre Zahnarztpraxis modern und vertrauenerweckend. Sonderkonditionen für KMU-Vereinsmitglieder.";
  } else if (industryData.slug === 'fahrschule') {
    metaTitle = "Webdesign für Fahrschulen | Buchungssystem & Online-Präsenz für Fahrlehrer";
    metaDescription = "Spezialisierte Website-Lösungen für Fahrschulen: Digitalisieren Sie Ihre Terminbuchung, gewinnen Sie mehr Fahrschüler und steigern Sie Empfehlungen durch Online-Bewertungen. Bis zu 40% günstigere Konditionen für Vereinsmitglieder.";
    keywords = [
      "Webdesign Fahrschule", 
      "Homepage Fahrschule", 
      "Website Fahrlehrer", 
      "Fahrschule Buchungssystem", 
      "Fahrschule online Terminbuchung", 
      "Fahrschul-Software", 
      "Fahrschule Digitalisierung", 
      "Fahrschule SEO", 
      "Fahrschule Website erstellen", 
      "Fahrschule Internetseite"
    ];
  }
  
  const faqItems = getFaqItems(industryData.slug);
  
  let heroImage = '';
  if (industryData.slug === 'zahnarzt') {
    heroImage = "https://image.brigitte.de/11752034/t/sd/v3/w1440/r1.5/-/jobprofil-zahnarzt.jpg";
  } else if (industryData.slug === 'fahrschule') {
    heroImage = "https://ofv-fahrlehrer.ch/wp-content/uploads/2019/07/iStock-914775770-1500x630.jpg";
  }

  const getIndustryIntroContent = () => {
    if (industryData.slug === 'fahrschule') {
      return {
        title: "Digitale Lösungen für zukunftsorientierte Fahrschulen",
        paragraphs: [
          "Als Fahrschule stehen Sie vor einzigartigen Herausforderungen: Die Verwaltung von Terminen, das Tracking von Schülerfortschritten und das Marketing für neue Fahrschüler erfordern viel Zeit und Ressourcen. Eine professionelle Website kann diese Prozesse erheblich vereinfachen und Ihre Fahrschule zum digitalen Vorreiter machen.",
          "Mit einer modernen, auf Fahrschulen spezialisierten Website-Lösung können Sie Ihre Arbeitsabläufe optimieren und gleichzeitig mehr Fahrschüler gewinnen. Unsere Erfahrung aus zahlreichen Projekten mit Schweizer Fahrschulen zeigt, dass eine gute digitale Präsenz entscheidend für den Erfolg ist."
        ],
        bulletPoints: [
          "Zeit sparen: Durch automatisierte Terminbuchung reduzieren Fahrschulen ihren Verwaltungsaufwand um durchschnittlich 35%",
          "Neue Fahrschüler gewinnen: 83% der Führerscheinanwärter suchen online nach einer geeigneten Fahrschule",
          "Kosten senken: Digitalisierte Prozesse reduzieren Personalkosten und steigern Ihre Effizienz",
          "Ihr Image verbessern: Eine professionelle Website signalisiert Qualität und Zuverlässigkeit"
        ],
        conclusion: "Als Mitglied des Schweizerischen KMU Vereins profitieren Sie von exklusiven Konditionen bei unseren spezialisierten Partnern, die die besonderen Anforderungen von Fahrschulen kennen und passgenaue Lösungen entwickeln."
      };
    }
    return null;
  };
  
  const introContent = getIndustryIntroContent();
  
  const getIndustryStats = () => {
    if (industryData.slug === 'fahrschule') {
      return {
        title: "Warum Fahrschulen eine optimierte Website brauchen",
        stats: [
          { value: "83%", label: "der Fahrschüler informieren sich online, bevor sie sich für eine Fahrschule entscheiden" },
          { value: "8-12h", label: "Zeitersparnis pro Woche durch ein Online-Buchungssystem für Fahrstunden" },
          { value: "+40%", label: "mehr Anfragen durch positive Online-Bewertungen und digitale Präsenz" }
        ]
      };
    }
    return null;
  };
  
  const statsData = getIndustryStats();
  
  const getIndustryCaseStudies = () => {
    if (industryData.slug === 'fahrschule') {
      return {
        title: "Erfolgsgeschichten von Fahrschulen",
        caseStudies: [
          {
            title: "Fahrschule Müller steigert Effizienz",
            quote: "Seit wir unser Online-Buchungssystem auf der neuen Website eingeführt haben, sparen wir über 10 Stunden pro Woche an Verwaltungsaufwand. Gleichzeitig sind unsere Neuanmeldungen um 35% gestiegen.",
            personName: "Martin Müller",
            position: "Inhaber, Fahrschule Müller",
            initials: "MM"
          },
          {
            title: "Fahrschule Sicher & Gut wächst digital",
            quote: "Unsere neue Website mit integriertem Bewertungssystem hat uns geholfen, das Vertrauen neuer Fahrschüler zu gewinnen. Die Conversion-Rate ist um 48% gestiegen und wir konnten zwei neue Fahrlehrer einstellen.",
            personName: "Sarah Keller",
            position: "Geschäftsführerin, Fahrschule Sicher & Gut",
            initials: "SK"
          }
        ]
      };
    }
    return null;
  };
  
  const caseStudiesData = getIndustryCaseStudies();
  
  return (
    <IndustryLandingLayout
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      industry={industryData.name}
      keywords={keywords}
      schema={schema}
    >
      <IndustryHero
        headline={industryData.slug === 'zahnarzt' ? "Professionelles Webdesign für Zahnarztpraxen" : 
                 industryData.slug === 'fahrschule' ? "Professionelles Webdesign für Fahrschulen" : 
                 industryContent.hero_headline}
        subheadline={industryData.slug === 'fahrschule' 
          ? "Digitale Komplettlösungen für moderne Fahrschulen: Online-Buchungssystem, optimierte Website und Bewertungsmanagement" 
          : industryContent.hero_subheadline}
        industry={industryData.name}
        imagePath={heroImage}
      />
      
      {introContent && (
        <IndustryIntroduction
          title={introContent.title}
          paragraphs={introContent.paragraphs}
          bulletPoints={introContent.bulletPoints}
          conclusion={introContent.conclusion}
          industry={industryData.name}
        />
      )}
      
      {statsData && (
        <IndustryStats
          title={statsData.title}
          stats={statsData.stats}
        />
      )}
      
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
      
      {caseStudiesData && (
        <IndustryCaseStudies
          title={caseStudiesData.title}
          caseStudies={caseStudiesData.caseStudies}
        />
      )}
      
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
      
      <FAQSection items={faqItems} />
    </IndustryLandingLayout>
  );
};

export default IndustryLanding;
