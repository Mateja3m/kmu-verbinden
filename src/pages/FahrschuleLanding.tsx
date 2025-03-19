
import React from 'react';
import { IndustryLandingLayout } from '@/components/website-redesign/IndustryLandingLayout';
import { IndustryHero } from '@/components/website-redesign/IndustryHero';
import { IndustryPainPoints } from '@/components/website-redesign/IndustryPainPoints';
import { IndustryBenefits } from '@/components/website-redesign/IndustryBenefits';
import { IndustryFeatures } from '@/components/website-redesign/IndustryFeatures';
import { IndustryAssociation } from '@/components/website-redesign/IndustryAssociation';
import { IndustryOffer } from '@/components/website-redesign/IndustryOffer';
import { WebsiteAnalysisDashboard } from '@/components/website-redesign/WebsiteAnalysisDashboard';
import { FAQSection } from '@/components/website-redesign/FAQSection';
import { MembershipOffer } from '@/components/website-redesign/MembershipOffer';

const FahrschuleLanding = () => {
  // Industry name
  const industryName = "Fahrschulen";
  
  // Driving school image from provided URL
  const drivingSchoolImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUJutJC80LqHtdpbfzWGPGWMa1tNJS8VSJJw&s";
  
  // Define pain points specific to driving schools
  const painPoints = [
    {
      title: "Schwierige Neukundengewinnung",
      description: "Potenzielle Fahrschüler finden Ihre Fahrschule im Internet nicht oder entscheiden sich für Mitbewerber mit besserer Online-Präsenz."
    },
    {
      title: "Zeitaufwändige Terminverwaltung",
      description: "Die manuelle Planung und Verwaltung von Fahrstunden bindet wertvolle Ressourcen und führt oft zu Fehlern oder Überschneidungen."
    },
    {
      title: "Mangelnde Online-Präsenz",
      description: "Eine veraltete oder nicht existente Website macht es schwer, neue Fahrschüler zu gewinnen und mit anderen Fahrschulen zu konkurrieren."
    },
    {
      title: "Zu wenige Google-Bewertungen",
      description: "Fehlende oder negative Bewertungen schrecken potenzielle Fahrschüler ab, da Empfehlungen bei der Wahl einer Fahrschule entscheidend sind."
    }
  ];
  
  // Define benefits specific to driving schools
  const benefits = [
    {
      title: "Mehr lokale Sichtbarkeit",
      description: "Werden Sie von Fahrschülern in Ihrer Umgebung leichter gefunden und stärken Sie Ihre lokale Präsenz."
    },
    {
      title: "Online-Terminbuchung",
      description: "Ermöglichen Sie Fahrschülern, Fahrstunden rund um die Uhr online zu buchen und reduzieren Sie Ihren Verwaltungsaufwand."
    },
    {
      title: "Bewertungsmanagement",
      description: "Sammeln Sie automatisch positive Bewertungen und verbessern Sie Ihr Online-Ansehen durch zufriedene Fahrschüler."
    },
    {
      title: "Professioneller Auftritt",
      description: "Präsentieren Sie Ihre Fahrschule modern und vertrauenswürdig, um sich von der Konkurrenz abzuheben."
    },
    {
      title: "Empfehlungsmarketing",
      description: "Nutzen Sie digitale Tools, um Empfehlungen zu fördern und neue Fahrschüler über Mundpropaganda zu gewinnen."
    },
    {
      title: "Mobile Optimierung",
      description: "Erreichen Sie junge Führerscheinanwärter optimal über ihre Smartphones mit einer vollständig mobiloptimierten Website."
    }
  ];
  
  // Define features specific to driving schools
  const features = [
    {
      title: "Online-Terminbuchung",
      description: "Automatisiertes System zur Buchung von Fahrstunden und Theoriekursen rund um die Uhr."
    },
    {
      title: "Bewertungsmanagement",
      description: "Werkzeuge zum Sammeln und Verwalten von Kundenbewertungen für mehr Vertrauen bei Interessenten."
    },
    {
      title: "SEO-Optimierung für Fahrschulen",
      description: "Spezifische Suchmaschinenoptimierung für lokale Suchanfragen nach Fahrschulen in Ihrer Region."
    },
    {
      title: "Führerscheinklassen-Übersicht",
      description: "Übersichtliche Darstellung aller angebotenen Führerscheinklassen mit Details und Preisen."
    },
    {
      title: "Social Media Integration",
      description: "Nahtlose Einbindung von Social-Media-Plattformen für mehr Reichweite und Engagement."
    },
    {
      title: "Automatische Erinnerungen",
      description: "Automatische SMS oder E-Mail-Erinnerungen an bevorstehende Fahrstunden reduzieren No-Shows."
    }
  ];
  
  // Define meta information for SEO
  const metaTitle = "Professionelle Websites für Fahrschulen | Online-Buchungssystem & mehr";
  const metaDescription = "Spezialisierte Website-Lösungen für Fahrschulen: Gewinnen Sie mehr Fahrschüler, optimieren Sie Ihre Terminplanung und verbessern Sie Ihre Online-Präsenz mit unserem modernen Webdesign. Sonderkonditionen für KMU-Vereinsmitglieder.";
  const keywords = [
    'Fahrschule Website', 
    'Fahrschule Webdesign', 
    'Fahrstunden Buchungssystem', 
    'Online-Terminbuchung Fahrschule',
    'Website für Fahrlehrer',
    'Fahrschule Bewertungsmanagement',
    'Lokale SEO Fahrschule',
    'KMU Verein Fahrschule'
  ];
  
  // Define FAQ items specific to driving schools
  const faqItems = [
    {
      question: 'Warum ist eine professionelle Website für eine Fahrschule wichtig?',
      answer: 'Eine professionelle Website ist für Fahrschulen essenziell, da über 80% der Führerscheinanwärter ihre Fahrschule online suchen. Sie ist Ihr digitales Aushängeschild und erster Kontaktpunkt mit potenziellen Schülern. Eine gut gestaltete Website vermittelt Vertrauen, präsentiert Ihre Leistungen übersichtlich und ermöglicht es Interessenten, Sie einfach zu kontaktieren oder direkt Fahrstunden zu buchen. In einem wettbewerbsintensiven Markt kann eine optimierte Website den entscheidenden Unterschied machen.'
    },
    {
      question: 'Welche Funktionen sollte eine Fahrschul-Website unbedingt haben?',
      answer: 'Eine effektive Fahrschul-Website sollte folgende Funktionen bieten: Ein Online-Terminbuchungssystem für Fahrstunden, eine übersichtliche Darstellung aller angebotenen Führerscheinklassen mit Preisen, ein Bewertungsmanagement-System, Informationen über Ausbildungsfahrzeuge und Lehrkräfte, einen Blog für Lernmaterialien, FAQ-Bereich, Anfahrtsbeschreibung, Kontaktformular sowie Mobile Optimierung. Besonders wichtig für Fahrschulen sind auch lokale SEO-Maßnahmen und die Integration von Google Maps.'
    },
    {
      question: 'Wie kann eine Website dazu beitragen, mehr Fahrschüler zu gewinnen?',
      answer: 'Eine optimierte Website kann auf mehreren Wegen helfen, mehr Fahrschüler zu gewinnen: Durch bessere lokale Sichtbarkeit in Suchmaschinen werden Sie von mehr Interessenten gefunden. Ein professionelles Design schafft Vertrauen und hebt Sie von der Konkurrenz ab. Online-Buchungsmöglichkeiten machen es potenziellen Schülern leicht, den ersten Schritt zu gehen. Prominente Darstellung von Kundenbewertungen und Erfolgsgeschichten überzeugt Unentschlossene. Informative Inhalte zu Führerscheinklassen und dem Lernprozess positionieren Sie als Experte. Zudem können integrierte Marketing-Tools wie Newsletter und Social-Media-Verbindungen zusätzliche Reichweite schaffen.'
    },
    {
      question: 'Wie funktioniert das Online-Buchungssystem für Fahrstunden?',
      answer: 'Unser Online-Buchungssystem für Fahrschulen ermöglicht es Schülern, rund um die Uhr Fahrstunden zu buchen. Es zeigt verfügbare Termine in Echtzeit an und verhindert Doppelbuchungen. Fahrlehrer können ihren Kalender verwalten und Verfügbarkeiten festlegen. Das System sendet automatische Bestätigungen und Erinnerungen per SMS oder E-Mail an Schüler, was No-Show-Raten deutlich reduziert. Die Verwaltung kann alle Buchungen in einer übersichtlichen Kalenderansicht einsehen und bei Bedarf Änderungen vornehmen. Das System lässt sich nahtlos in bestehende Verwaltungssoftware integrieren und spart durchschnittlich 5-10 Stunden Verwaltungsaufwand pro Woche.'
    },
    {
      question: 'Wie kann ich als Mitglied des KMU-Vereins von Sonderkonditionen profitieren?',
      answer: 'Als Mitglied des Schweizerischen KMU Vereins erhalten Sie exklusive Vergünstigungen für Website-Dienstleistungen. Sie profitieren von bis zu 30% Rabatt auf unsere Webdesign-Pakete speziell für Fahrschulen, bevorzugter Betreuung durch unsere Spezialisten und Zugang zu zusätzlichen Marketing-Tools ohne Aufpreis. Bei Beauftragung eines Website-Projekts erhalten Neumitglieder außerdem eine kostenlose einjährige Mitgliedschaft im Wert von CHF 360. Kontaktieren Sie uns für eine individuelle Beratung und erfahren Sie mehr über die konkreten Einsparungen für Ihre Fahrschule.'
    }
  ];
  
  // Generate Schema.org structured data for SEO
  const schema = [
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": window.location.origin,
      "name": metaTitle,
      "description": metaDescription,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/suche?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Webdesign für ${industryName}`,
      "provider": {
        "@type": "Organization",
        "name": "SwissKMU Verein",
        "url": "https://www.swisskmu.ch"
      },
      "description": "Professionelle Websites für Fahrschulen mit Online-Buchungssystem und Bewertungsmanagement",
      "areaServed": {
        "@type": "Country",
        "name": "Switzerland"
      },
      "audience": {
        "@type": "Audience",
        "audienceType": "Fahrschulen und Fahrlehrer"
      },
      "offers": {
        "@type": "Offer",
        "description": "Website-Komplettpaket für Fahrschulen zu Sonderkonditionen für Vereinsmitglieder",
        "price": "4900",
        "priceCurrency": "CHF"
      }
    },
    {
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
          "name": "Fahrschulen und Fahrlehrer",
          "item": window.location.href
        }
      ]
    },
    {
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
    }
  ];
  
  return (
    <IndustryLandingLayout
      metaTitle={metaTitle}
      metaDescription={metaDescription}
      industry={industryName}
      keywords={keywords}
      schema={schema}
    >
      <IndustryHero
        headline="Professionelle Websites für Fahrschulen"
        subheadline="Gewinnen Sie neue Fahrschüler durch eine optimierte Online-Präsenz und digitale Buchungssysteme"
        industry={industryName}
        imagePath={drivingSchoolImage}
      />
      
      <IndustryPainPoints
        painPoints={painPoints}
        industry={industryName}
      />
      
      <IndustryBenefits
        benefits={benefits}
        industry={industryName}
      />
      
      <IndustryFeatures
        features={features}
        industry={industryName}
      />
      
      <IndustryAssociation 
        industry={industryName} 
      />
      
      <MembershipOffer
        industry={industryName}
      />
      
      <IndustryOffer 
        industry={industryName} 
      />
      
      <div id="website-check" className="container mx-auto px-4 pt-4 pb-16">
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-swiss-darkblue mb-8 text-center">
            Lassen Sie Ihre Fahrschul-Website analysieren
          </h2>
          
          <div className="w-full mx-auto">
            <WebsiteAnalysisDashboard industryId="fahrschule" />
          </div>
        </div>
      </div>
      
      {/* FAQ Section for SEO and user information */}
      <FAQSection items={faqItems} />
    </IndustryLandingLayout>
  );
};

export default FahrschuleLanding;
