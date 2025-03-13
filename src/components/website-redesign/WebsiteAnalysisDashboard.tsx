
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Globe, 
  ExternalLink, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  AlertOctagon,
  Info 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface AnalysisResult {
  gesamtpunkte: number;
  firmeninfo: {
    name?: string;
    telefon?: string;
    email?: string;
    adresse?: string;
    oeffnungszeiten?: string;
  };
  design: {
    punkte: number;
    feedback: string[];
  };
  inhalt: {
    punkte: number;
    feedback: string[];
  };
  technik: {
    punkte: number;
    feedback: string[];
  };
  verbesserungen: string[];
}

export const WebsiteAnalysisDashboard = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const analyzeWebsite = async () => {
    if (!url) {
      toast({
        title: "Bitte geben Sie eine URL ein",
        variant: "destructive"
      });
      return;
    }

    // Clean the URL before submitting
    let cleanUrl = url.trim();
    
    // Validate URL format
    if (!/^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/.test(cleanUrl)) {
      toast({
        title: "Ungültige URL",
        description: "Die URL enthält nicht erlaubte Zeichen",
        variant: "destructive"
      });
      return;
    }
    
    // Add https:// if missing
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    
    // Start progress simulation
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        const increment = Math.random() * 10;
        return Math.min(prev + increment, 95);
      });
    }, 1000);
    
    try {
      toast({
        title: "Analyse gestartet",
        description: "Die Website wird jetzt analysiert. Dies kann bis zu einer Minute dauern."
      });
      
      console.log(`Analysiere URL: ${cleanUrl}`);
      
      const { data, error } = await supabase.functions.invoke('analyze-website', {
        body: { url: cleanUrl }
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (error) {
        console.error('Fehler bei der Analysefunktion:', error);
        throw new Error(`Fehler bei der Analyse: ${error.message}`);
      }
      
      if (!data) {
        console.error('Leere Antwort von der Analysefunktion');
        throw new Error('Keine Antwort vom Analysetool erhalten');
      }
      
      if (data.error) {
        console.error('Fehler in den Antwortdaten:', data.error);
        throw new Error(`Fehler bei der Analyse: ${data.error}`);
      }
      
      if (typeof data !== 'object' || !('gesamtpunkte' in data)) {
        console.error('Ungültiges Antwortformat von der Analysefunktion:', data);
        throw new Error('Ungültiges Antwortformat vom Analysetool');
      }
      
      console.log('Analyse abgeschlossen:', data);
      setResult(data);
      setAnalyzedUrl(cleanUrl);
      toast({
        title: "Analyse abgeschlossen",
        description: "Ihre Website wurde erfolgreich analysiert."
      });
    } catch (error) {
      console.error('Analysefehler:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Ein unbekannter Fehler ist aufgetreten';
      
      setError(errorMessage);
      toast({
        title: "Fehler bei der Analyse",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
    }
  };

  const hasContactInfo = result && (
    result.firmeninfo.telefon !== "Nicht gefunden" ||
    result.firmeninfo.email !== "Nicht gefunden"
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderContactValue = (value: string | undefined) => {
    if (!value || value === "Nicht gefunden") {
      return <span className="text-gray-400 italic">Nicht gefunden</span>;
    }
    return value;
  };

  if (!result && !isAnalyzing) {
    return (
      <Card className="mt-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none shine-effect"></div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Lassen Sie Ihre Website analysieren
          </CardTitle>
          <CardDescription className="text-center">
            Unser KI-System analysiert Ihre Website und gibt Ihnen wertvolle Verbesserungsvorschläge.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="url"
              placeholder="ihre-website.ch"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 focus:ring-2 focus:ring-swiss-lightblue focus:border-transparent transition-all duration-300"
            />
            <Button 
              onClick={analyzeWebsite}
              className="bg-swiss-red hover:bg-swiss-red/90"
            >
              Jetzt analysieren
            </Button>
          </div>
          {error && (
            <div className="text-red-500 bg-red-50 p-4 rounded-md flex items-start gap-2 mt-2 border border-red-200">
              <AlertOctagon className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Fehler bei der Analyse:</p>
                <p>{error}</p>
                <p className="text-sm mt-2">Bitte stellen Sie sicher, dass die Website erreichbar ist und versuchen Sie es erneut.</p>
              </div>
            </div>
          )}
          <div className="bg-blue-50 p-4 rounded-md flex items-start gap-2 mt-2 border border-blue-200">
            <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-blue-500" />
            <div className="text-sm text-blue-700">
              <p className="font-semibold">Tipps für bessere Ergebnisse:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Geben Sie die Domain ohne "www" oder "https://" ein (z.B. "example.ch")</li>
                <li>Stellen Sie sicher, dass die Website öffentlich zugänglich ist</li>
                <li>Verwenden Sie die Haupt-Domain statt einer Unterseite für die beste Analyse</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isAnalyzing) {
    return (
      <Card className="mt-12">
        <CardContent className="py-12">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-swiss-red" />
            <p className="text-lg font-medium">Analysiere Ihre Website...</p>
            <Progress value={progress} className="w-64" />
            <p className="text-sm text-gray-500">Dies kann bis zu einer Minute dauern</p>
            <div className="text-xs text-gray-400 animate-pulse">
              Suche nach Kontaktinformationen und analysiere Design...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-swiss-red" />
              Website-Analyse Ergebnis
              {analyzedUrl && (
                <a 
                  href={analyzedUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-normal text-blue-500 hover:text-blue-700 flex items-center ml-2"
                >
                  {analyzedUrl.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              )}
            </div>
            <span className={`text-4xl ${getScoreColor(result?.gesamtpunkte || 0)}`}>
              {result?.gesamtpunkte}/100
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Gefundene Informationen</h3>

            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white/50 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-swiss-darkblue">
                  Kontaktdaten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="flex items-center">
                    <span className="font-medium min-w-32">Firma:</span> 
                    <span>{renderContactValue(result?.firmeninfo.name)}</span>
                  </p>
                  
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-swiss-red" />
                    <span className="font-medium min-w-28">Telefon:</span> 
                    {result?.firmeninfo.telefon && result.firmeninfo.telefon !== "Nicht gefunden" ? (
                      <a 
                        href={`tel:${result.firmeninfo.telefon}`} 
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {result.firmeninfo.telefon}
                      </a>
                    ) : (
                      renderContactValue(result?.firmeninfo.telefon)
                    )}
                  </p>
                  
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-swiss-red" />
                    <span className="font-medium min-w-28">E-Mail:</span> 
                    {result?.firmeninfo.email && result.firmeninfo.email !== "Nicht gefunden" ? (
                      <a 
                        href={`mailto:${result.firmeninfo.email}`} 
                        className="text-blue-500 hover:text-blue-700"
                      >
                        {result.firmeninfo.email}
                      </a>
                    ) : (
                      renderContactValue(result?.firmeninfo.email)
                    )}
                  </p>
                  
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-swiss-red" />
                    <span className="font-medium min-w-28">Adresse:</span> 
                    <span>{renderContactValue(result?.firmeninfo.adresse)}</span>
                  </p>
                  
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-swiss-red" />
                    <span className="font-medium min-w-28">Öffnungszeiten:</span> 
                    <span>{renderContactValue(result?.firmeninfo.oeffnungszeiten)}</span>
                  </p>
                </div>

                {hasContactInfo && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Button 
                      className="mt-4 w-full bg-swiss-red hover:bg-swiss-red/90 text-white"
                      asChild
                    >
                      <Link to={`/contact?source=website-analysis&company=${encodeURIComponent(result?.firmeninfo.name || '')}&email=${encodeURIComponent(result?.firmeninfo.email || '')}&phone=${encodeURIComponent(result?.firmeninfo.telefon || '')}`}>
                        Kostenlose Beratung anfordern
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Bewertungen</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Design</span>
                <span className={getScoreColor(result?.design.punkte || 0)}>
                  {result?.design.punkte}/100
                </span>
              </div>
              <Progress value={result?.design.punkte} className="h-2" />
              
              <div className="flex items-center justify-between mt-2">
                <span>Inhalt</span>
                <span className={getScoreColor(result?.inhalt.punkte || 0)}>
                  {result?.inhalt.punkte}/100
                </span>
              </div>
              <Progress value={result?.inhalt.punkte} className="h-2" />
              
              <div className="flex items-center justify-between mt-2">
                <span>Technisch</span>
                <span className={getScoreColor(result?.technik.punkte || 0)}>
                  {result?.technik.punkte}/100
                </span>
              </div>
              <Progress value={result?.technik.punkte} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Design Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result?.design.feedback.map((item, index) => (
                <li key={`design-${index}`} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Inhalt Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result?.inhalt.feedback.map((item, index) => (
                <li key={`content-${index}`} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Technisches Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result?.technik.feedback.map((item, index) => (
                <li key={`technical-${index}`} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Verbesserungsvorschläge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result?.verbesserungen.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-6">
        <Button 
          className="bg-swiss-red hover:bg-swiss-red/90 text-white px-8 py-6 text-lg"
          asChild
        >
          <Link 
            to={`/contact?source=website-analysis&company=${encodeURIComponent(result?.firmeninfo.name || '')}&email=${encodeURIComponent(result?.firmeninfo.email || '')}&phone=${encodeURIComponent(result?.firmeninfo.telefon || '')}`}
          >
            Kostenloses Beratungsgespräch vereinbaren
          </Link>
        </Button>
      </div>

      <div className="flex justify-center pt-2">
        <Button 
          variant="outline"
          onClick={() => {
            setResult(null);
            setError(null);
            setAnalyzedUrl(null);
          }}
          className="mt-4"
        >
          Neue Analyse starten
        </Button>
      </div>
    </motion.div>
  );
};
