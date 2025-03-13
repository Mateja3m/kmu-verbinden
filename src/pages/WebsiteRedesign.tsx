import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { nationalPartners } from '@/data/partners';
import { IndustryLinks } from '@/components/website-redesign/IndustryLinks';
import { motion } from 'framer-motion';
import { WebsiteCheckSection } from '@/components/website-redesign/WebsiteCheckSection';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WebsiteRedesign = () => {
  const [selectedPartners, setSelectedPartners] = useState(() => {
    // Get 6 partners for the showcase
    return nationalPartners.slice(0, 6);
  });

  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  // Industry cards data with icon property
  const industryCards = [
    {
      id: 'gastgewerbe',
      title: 'Gastronomie',
      description: 'Maßgeschneiderte Webauftritte für Restaurants, Cafés und Gastronomiebetriebe',
      color: 'from-blue-400 to-blue-600',
      icon: 'ChefHat'
    },
    {
      id: 'handwerk',
      title: 'Handwerk',
      description: 'Professionelle Webseiten für Handwerksbetriebe und Dienstleister',
      color: 'from-green-400 to-green-600',
      icon: 'Building'
    },
    {
      id: 'einzelhandel',
      title: 'Einzelhandel',
      description: 'Ansprechende Webpräsenzen für lokale Einzelhändler und Boutiquen',
      color: 'from-amber-400 to-amber-600',
      icon: 'Store'
    },
    {
      id: 'gesundheit',
      title: 'Gesundheitswesen',
      description: 'Vertrauenerweckende Websites für Praxen, Therapeuten und Wellness-Anbieter',
      color: 'from-red-400 to-red-600',
      icon: 'Stethoscope'
    },
    {
      id: 'finanzen',
      title: 'Finanzen & Beratung',
      description: 'Seriöse Online-Präsenzen für Berater, Anwälte und Finanzdienstleister',
      color: 'from-indigo-400 to-indigo-600',
      icon: 'Briefcase'
    },
    {
      id: 'bildung',
      title: 'Bildung & Coaching',
      description: 'Inspirierende Websites für Bildungseinrichtungen und Coaches',
      color: 'from-purple-400 to-purple-600',
      icon: 'BookOpen'
    }
  ];

  // FAQ data
  const faqItems = [
    {
      question: 'Wie lange dauert ein Website-Redesign?',
      answer: 'Die Dauer eines Website-Redesigns hängt von verschiedenen Faktoren ab, wie der Größe der Website, der Komplexität des Designs und den gewünschten Funktionen. In der Regel dauert ein umfassendes Redesign zwischen 4 und 12 Wochen. Durch unsere bewährten Prozesse und erfahrenen Partner können wir jedoch auch beschleunigte Timelines anbieten.'
    },
    {
      question: 'Was kostet ein Website-Redesign?',
      answer: 'Die Kosten für ein Website-Redesign variieren je nach Umfang und Anforderungen. Einfache Redesigns beginnen bei etwa CHF 3.000, während komplexere Projekte mit umfangreichen Funktionen bis zu CHF 15.000 oder mehr kosten können. Als Mitglied des KMU-Vereins profitieren Sie von Vorzugskonditionen bei unseren Partnern.'
    },
    {
      question: 'Verliere ich bei einem Redesign meine Suchmaschinenplatzierungen?',
      answer: 'Bei einem professionellen Redesign werden wichtige SEO-Faktoren berücksichtigt, um Ihre Suchmaschinenplatzierungen zu erhalten oder sogar zu verbessern. Unsere Partner achten auf korrekte Weiterleitungen, die Beibehaltung wichtiger Keywords und Meta-Informationen sowie die Optimierung der Ladezeiten, was sich positiv auf Ihr Ranking auswirken kann.'
    },
    {
      question: 'Kann ich meine Website nach dem Redesign selbst aktualisieren?',
      answer: 'Ja, moderne Websites werden in der Regel mit benutzerfreundlichen Content-Management-Systemen (CMS) wie WordPress erstellt, die es Ihnen ermöglicht, Inhalte selbst zu aktualisieren. Unsere Partner bieten außerdem Schulungen an, damit Sie Ihre Website effektiv verwalten können.'
    },
    {
      question: 'Ist eine responsive Website wirklich notwendig?',
      answer: 'Absolut. Mit der zunehmenden Nutzung mobiler Geräte ist eine responsive Website, die sich automatisch an verschiedene Bildschirmgrößen anpasst, unerlässlich. Nicht nur für die Benutzererfahrung, sondern auch für die Suchmaschinenoptimierung, da Google mobile Kompatibilität als Ranking-Faktor berücksichtigt.'
    }
  ];

  const handleIndustryCardClick = (cardId: string) => {
    console.log(`Industry card clicked: ${cardId}`);
    // Scroll to the expanded section
    setTimeout(() => {
      window.scrollBy({
        top: 100,
        behavior: 'smooth'
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section - Enhanced with more vertical space and better visual hierarchy */}
      <section className="py-32 md:py-40 relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-swiss-gray opacity-20 rounded-bl-[100px]"></div>
        <div className="absolute bottom-24 left-24 w-16 h-16 rounded-full bg-swiss-red opacity-10"></div>
        <div className="absolute top-40 right-40 w-24 h-24 rounded-full bg-swiss-lightblue opacity-20"></div>
        
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-10">
              <div className="inline-block bg-swiss-lightblue/20 px-4 py-2 rounded-full text-swiss-darkblue font-medium text-sm">
                Digitale Transformation für KMUs
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-swiss-darkblue leading-tight relative">
                Optimieren Sie Ihre 
                <span className="relative">
                  <span className="relative z-10"> digitale Präsenz.</span>
                  <span className="absolute -bottom-3 left-0 w-full h-4 bg-swiss-lightblue/30 -z-0 transform -rotate-1"></span>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-xl">
                Wir vernetzen Kompetenz. Websites bauen geht einfach, doch nur mit der richtigen Expertise entsteht eine gute Onlinepräsenz.
              </p>
              
              <Button 
                className="bg-swiss-darkblue hover:bg-swiss-darkblue/90 text-white px-8 py-7 mt-6 text-lg flex items-center gap-3 rounded-md transition-all duration-300 shadow hover:shadow-lg hover:translate-y-[-2px]"
                asChild
              >
                <Link to="/partners">
                  Unsere Partner kennenlernen
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 relative z-10"
              style={{
                transformStyle: 'preserve-3d',
                perspective: '1000px'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-swiss-darkblue/10 to-transparent rounded-2xl -z-10 transform rotate-3 scale-[1.05]"></div>
              <img
                src="/lovable-uploads/19cbbc4e-2aa2-407e-9b31-d950e577c9cb.png"
                alt="Digital workspace"
                className="w-full h-auto object-cover shadow-lg"
                style={{ maxHeight: "540px" }}
              />
            </motion.div>
          </motion.div>
          
          {/* Scroll indicator */}
          <div className="flex justify-center mt-16 animate-bounce">
            <ChevronDown className="h-8 w-8 text-swiss-darkblue/50" />
          </div>
        </div>
      </section>

      {/* Website/Brand Section - Improved spacing, card design and interactive elements */}
      <section className="py-32 bg-gradient-to-b from-white to-swiss-gray/20 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-swiss-lightblue/50 to-transparent"></div>
        
        <div className="container mx-auto px-6 max-w-6xl relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center mb-20 text-center"
          >
            <Link to="#" className="text-indigo-600 text-lg mb-5 font-medium hover:underline transition-all">
              Web-Auftritt optimieren
            </Link>
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-darkblue mb-8">
              Website Redesign oder Brand Refresh?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Die Entscheidung zwischen einer kompletten Überarbeitung Ihrer Website oder einer Auffrischung Ihrer Marke hängt von Ihren spezifischen Geschäftszielen ab.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-10"
            >
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.3 }}
                className="space-y-4 p-8 bg-white rounded-xl shadow-md border border-gray-100 transition-all"
              >
                <h3 className="text-2xl font-semibold text-swiss-darkblue">Website Redesign</h3>
                <p className="text-gray-700 leading-relaxed">
                  Eine komplette Überarbeitung Ihrer Website verbessert nicht nur das Design, sondern optimiert auch die Benutzerführung, Ladezeiten und Conversion-Raten. Ideal wenn Ihre aktuelle Website veraltet ist oder nicht die gewünschten Ergebnisse erzielt.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.3 }}
                className="space-y-4 p-8 bg-white rounded-xl shadow-md border border-gray-100 transition-all"
              >
                <h3 className="text-2xl font-semibold text-swiss-darkblue">Brand Refresh</h3>
                <p className="text-gray-700 leading-relaxed">
                  Eine Markenauffrischung modernisiert Ihr visuelles Erscheinungsbild und Ihre Kommunikation, ohne die Kernidentität zu verändern. Perfekt, wenn Ihre Marke solide ist, aber ein zeitgemäßeres Auftreten benötigt.
                </p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Button className="bg-swiss-red hover:bg-swiss-red/90 text-white px-8 py-6 text-lg shadow hover:shadow-lg transition-all duration-300">
                  Kostenlose Beratung erhalten
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="rounded-2xl overflow-hidden shadow-xl relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-swiss-darkblue/5 to-transparent -z-10 transform -rotate-2 scale-[1.05]"></div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2 }}
                className="overflow-hidden rounded-2xl"
              >
                <img
                  src="/lovable-uploads/e8fe9475-a9bf-4636-9512-ac9c74ccbf80.png"
                  alt="Website analytics"
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-110"
                  style={{ maxHeight: "540px" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Logo Section - Updated to be in one line */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-swiss-gray/20 to-white"></div>
        
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unsere sorgfältig ausgewählten Partner bieten erstklassige digitale Lösungen für KMUs in der Schweiz.
            </p>
          </motion.div>
          
          {/* Partner logos carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true
            }}
            className="max-w-5xl mx-auto"
          >
            <CarouselContent>
              {selectedPartners.map((partner) => (
                <CarouselItem key={partner.id} className="basis-1/5 md:basis-1/6">
                  <motion.div 
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 5px 5px -5px rgba(0, 0, 0, 0.04)",
                      borderColor: "#93C5FD"
                    }}
                    className="bg-white rounded-lg p-4 flex items-center justify-center h-20 shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100 group"
                  >
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-10 max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="lg:-left-8 -left-4" />
            <CarouselNext className="lg:-right-8 -right-4" />
          </Carousel>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16"
          >
            <IndustryLinks />
          </motion.div>
        </div>
      </section>
      
      {/* Industry Cards Section */}
      <section className="py-24 bg-gradient-to-b from-white to-swiss-gray/20 relative">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-darkblue mb-6">
              Branchenspezifische Lösungen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Wir bieten maßgeschneiderte Webdesign-Lösungen für Ihre Branche, die genau auf Ihre Zielgruppe zugeschnitten sind.
            </p>
          </motion.div>
          
          <IndustryCards 
            cards={industryCards} 
            onCardClick={handleIndustryCardClick} 
          />
        </div>
      </section>

      {/* Website Check Section - Only show standalone if no industry card is expanded */}
      <WebsiteCheckSection />

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-b from-white to-swiss-gray/10 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-swiss-darkblue mb-6">
              Häufige Fragen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Antworten auf die häufigsten Fragen zum Thema Website-Redesign
            </p>
          </motion.div>
          
          <Accordion type="single" collapsible className="bg-white rounded-xl shadow-md p-6">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 last:border-b-0">
                <AccordionTrigger className="text-lg font-medium text-swiss-darkblue hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Membership Section - Enhanced with better layout, spacing and visuals */}
      <section className="py-32 bg-gradient-to-b from-white to-swiss-gray/30 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-swiss-lightblue opacity-10"></div>
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-swiss-red opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl border-[20px] border-swiss-gray/10 rounded-3xl -z-10"></div>
        
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
          >
            <div className="space-y-10">
              <h2 className="text-3xl md:text-4xl font-bold text-swiss-darkblue">
                Werden Sie Mitglied des KMU-Vereins
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Profitieren Sie von einem starken Netzwerk, exklusiven Angeboten und wertvollen Geschäftskontakten. Als Mitglied des Schweizerischen KMU Vereins erhalten Sie Zugang zu erstklassigen Dienstleistern und attraktiven Sonderkonditionen.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    className="border-swiss-darkblue text-swiss-darkblue hover:bg-swiss-darkblue hover:text-white px-8 py-6 text-lg transition-all duration-300 shadow hover:shadow-lg"
                    asChild
                  >
                    <Link to="/membership">
                      Mehr erfahren
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    className="bg-swiss-red hover:bg-swiss-red/90 text-white px-8 py-6 text-lg transition-all duration-300 shadow hover:shadow-lg"
                    asChild
                  >
                    <Link to="/membership">
                      Jetzt Mitglied werden
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 gap-8"
            >
              <motion.div 
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <img
                  src="/lovable-uploads/874b0f8c-856e-42ef-b959-a1393f89478c.png"
                  alt="Business networking"
                  className="rounded-2xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-all duration-500"
                />
                <img
                  src="/lovable-uploads/710d5524-1ea6-450d-a56f-e200a0de134b.png"
                  alt="Business conversation"
                  className="rounded-2xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-all duration-500"
                />
              </motion.div>
              <motion.div 
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 pt-12"
              >
                <img
                  src="/lovable-uploads/9073a767-a689-41cd-9749-71c1f54c69c3.png"
                  alt="Office meeting"
                  className="rounded-2xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-all duration-500"
                />
                <img
                  src="/lovable-uploads/86e1093f-d110-4675-89d5-b99e23c5a312.png"
                  alt="Working together"
                  className="rounded-2xl h-64 w-full object-cover shadow-lg hover:shadow-xl transition-all duration-500"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteRedesign;
