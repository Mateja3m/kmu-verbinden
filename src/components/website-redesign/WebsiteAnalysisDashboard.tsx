import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Info,
  ArrowRight,
  ArrowLeft,
  Search
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { AnalysisContactForm } from './AnalysisContactForm';
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useForm as useFormspreeForm } from "@formspree/react";
import { LoadingAnimationBar } from './LoadingAnimationBar';

interface WebsiteAnalysisDashboardProps {
  industryId?: string;
}

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

type ContactFormData = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  message: string;
  preferredTime: "vormittag" | "nachmittag" | "abend";
  newsletter: boolean;
  privacyAccepted: boolean;
}

export const WebsiteAnalysisDashboard = ({ industryId }: WebsiteAnalysisDashboardProps) => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showInCardForm, setShowInCardForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  
  const [formspreeState, formspreeSubmit] = useFormspreeForm("xldgyydd");
  
  const form = useForm<ContactFormData>({
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      message: "",
      preferredTime: "vormittag",
      newsletter: false,
      privacyAccepted: false,
    },
    mode: "onChange"
  });

  const analyzeWebsite = async () => {
    if (!url) {
      toast({
        title: "Bitte geben Sie eine URL ein",
        variant: "destructive"
      });
      return;
    }

    let cleanUrl = url.trim();
    
    if (!/^[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+$/.test(cleanUrl)) {
      toast({
        title: "Ungültige URL",
        description: "Die URL enthält nicht erlaubte Zeichen",
        variant: "destructive"
      });
      return;
    }
    
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    
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
      
      console.log(`Analysiere URL: ${cleanUrl}${industryId ? `, Branche: ${industryId}` : ''}`);
      
      const { data, error } = await supabase.functions.invoke('analyze-website', {
        body: { 
          url: cleanUrl,
          industryId: industryId || null
        }
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

  const prepareContactForm = () => {
    if (result) {
      form.reset({
        companyName: result.firmeninfo.name !== "Nicht gefunden" ? result.firmeninfo.name : "",
        contactPerson: "",
        email: result.firmeninfo.email !== "Nicht gefunden" ? result.firmeninfo.email : "",
        phone: result.firmeninfo.telefon !== "Nicht gefunden" ? result.firmeninfo.telefon : "",
        message: `Ich interessiere mich für eine kostenlose Beratung für meine Website ${analyzedUrl || ""}`,
        preferredTime: "vormittag",
        newsletter: false,
        privacyAccepted: false
      });
    }
    setShowInCardForm(true);
  };

  const handleContactSubmit = async (data: ContactFormData) => {
    if (!data.companyName) {
      toast({
        title: "Bitte geben Sie einen Firmennamen ein",
        description: "Der Firmenname ist ein Pflichtfeld",
        variant: "destructive",
      });
      return;
    }
    
    if (!data.contactPerson) {
      toast({
        title: "Bitte geben Sie einen Ansprechpartner ein",
        description: "Der Ansprechpartner ist ein Pflichtfeld",
        variant: "destructive",
      });
      return;
    }

    if (!data.email) {
      toast({
        title: "Bitte geben Sie eine E-Mail-Adresse ein",
        description: "Die E-Mail-Adresse ist ein Pflichtfeld",
        variant: "destructive",
      });
      return;
    }
    
    if (!data.privacyAccepted) {
      toast({
        title: "Bitte akzeptieren Sie die Datenschutzerklärung",
        description: "Sie müssen die Datenschutzerklärung akzeptieren, um fortzufahren",
        variant: "destructive",
      });
      form.setError('privacyAccepted', {
        type: 'manual',
        message: 'Erforderlich'
      });
      return;
    }

    try {
      setFormSubmitting(true);
      
      console.log("Submitting form to Formspree with data:", {
        "Firmenname": data.companyName,
        "Ansprechpartner": data.contactPerson,
        "E-Mail": data.email,
        "Telefon": data.phone,
        "Nachricht": data.message,
        "Website URL": analyzedUrl || "",
        "Bevorzugte Kontaktzeit": data.preferredTime,
        "Newsletter": data.newsletter ? "Ja" : "Nein",
        "Website-Analyse": "Ja",
        "Datenschutz akzeptiert": "Ja",
      });

      formspreeSubmit({
        "Firmenname": data.companyName,
        "Ansprechpartner": data.contactPerson,
        "E-Mail": data.email,
        "Telefon": data.phone,
        "Nachricht": data.message,
        "Website URL": analyzedUrl || "",
        "Bevorzugte Kontaktzeit": data.preferredTime,
        "Newsletter": data.newsletter ? "Ja" : "Nein",
        "Website-Analyse": "Ja",
        "Datenschutz akzeptiert": "Ja",
      });
      
      if (formspreeState.errors) {
        console.error('Formspree submission errors:', formspreeState.errors);
        const errorMessage = typeof formspreeState.errors === 'string' 
          ? formspreeState.errors 
          : 'Fehler bei der Formularübermittlung. Bitte versuchen Sie es später erneut.';
        throw new Error(errorMessage);
      }
      
      toast({
        title: "Anfrage erfolgreich gesendet",
        description: "Wir werden uns in Kürze bei Ihnen melden",
      });
      
      setFormSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Fehler beim Senden",
        description: error instanceof Error ? error.message : "Bitte versuchen Sie es später erneut",
        variant: "destructive",
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  const resetContactForm = () => {
    setShowInCardForm(false);
    setFormSubmitted(false);
    form.reset();
  };

  return (
    <div className="mt-0 w-full">
      {!result && !isAnalyzing && (
        <Card className="relative overflow-hidden w-full">
          <div className="absolute inset-0 pointer-events-none shine-effect"></div>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-center">
              Website-Analyse für Ihre Website
            </CardTitle>
            <CardDescription className="text-center">
              Unser KI-System analysiert Ihre Website und gibt Ihnen wertvolle Verbesserungsvorschläge
              {industryId && ", speziell für Ihre Branche"}.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="url"
                  placeholder="ihre-website.ch"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 py-6 text-lg focus:ring-2 focus:ring-swiss-lightblue focus:border-transparent transition-all duration-300"
                />
              </div>
              <Button 
                onClick={analyzeWebsite}
                className="bg-swiss-red hover:bg-swiss-red/90 py-6 text-lg"
              >
                Jetzt analysieren
              </Button>
            </div>
            {error && (
              <div className="text-red-500 bg-red-50 p-3 rounded-md flex items-start gap-2 mt-1 border border-red-200">
                <AlertOctagon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Fehler bei der Analyse:</p>
                  <p>{error}</p>
                </div>
              </div>
            )}
            <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2 mt-1 border border-blue-200">
              <Info className="h-5 w-5 flex-shrink-0 mt-0.5 text-blue-500" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Tipps:</p>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li>Geben Sie die Domain ohne "www" oder "https://" ein</li>
                  <li>Verwenden Sie die Haupt-Domain für die beste Analyse</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isAnalyzing && (
        <Card className="w-full overflow-hidden">
          <CardContent className="py-10">
            <div className="flex flex-col items-center space-y-8">
              <div className="p-6 bg-gradient-to-br from-swiss-darkblue to-swiss-darkblue/90 rounded-xl shadow-lg w-full">
                <LoadingAnimationBar />
              </div>
              <p className="text-sm text-gray-500">Dies kann bis zu einer Minute dauern</p>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 space-y-6 w-full"
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
                  <CardContent>
                    <AnimatePresence mode="wait">
                      {!showInCardForm && !formSubmitted && (
                        <motion.div 
                          key="contact-info"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3"
                        >
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
                                onClick={prepareContactForm}
                              >
                                Kostenlose Beratung anfordern
                              </Button>
                            </motion.div>
                          )}
                        </motion.div>
                      )}

                      {showInCardForm && !formSubmitted && (
                        <motion.form 
                          key="contact-form"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="space-y-4"
                          onSubmit={form.handleSubmit(handleContactSubmit)}
                        >
                          <div className="space-y-3">
                            <div>
                              <label htmlFor="companyName" className="block text-sm font-medium mb-1">Firmenname *</label>
                              <Input
                                id="companyName"
                                {...form.register("companyName", { required: true })}
                                className="w-full"
                                placeholder="Ihre Firma GmbH"
                              />
                              {form.formState.errors.companyName && (
                                <p className="text-sm text-red-500 mt-1">Bitte geben Sie einen Firmennamen ein</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="contactPerson" className="block text-sm font-medium mb-1">Ansprechpartner *</label>
                              <Input
                                id="contactPerson"
                                {...form.register("contactPerson", { required: true })}
                                className="w-full"
                                placeholder="Vor- und Nachname"
                              />
                              {form.formState.errors.contactPerson && (
                                <p className="text-sm text-red-500 mt-1">Bitte geben Sie einen Ansprechpartner ein</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium mb-1">E-Mail *</label>
                              <Input
                                id="email"
                                type="email"
                                {...form.register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                className="w-full"
                                placeholder="ihre-email@beispiel.ch"
                              />
                              {form.formState.errors.email && (
                                <p className="text-sm text-red-500 mt-1">Bitte geben Sie eine gültige E-Mail-Adresse ein</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="phone" className="block text-sm font-medium mb-1">Telefon</label>
                              <Input
                                id="phone"
                                type="tel"
                                {...form.register("phone")}
                                className="w-full"
                                placeholder="+41 XX XXX XX XX"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="preferredTime" className="block text-sm font-medium mb-1">Bevorzugte Kontaktzeit</label>
                              <select
                                id="preferredTime"
                                {...form.register("preferredTime")}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              >
                                <option value="vormittag">Vormittag</option>
                                <option value="nachmittag">Nachmittag</option>
                                <option value="abend">Abend</option>
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="message" className="block text-sm font-medium mb-1">Nachricht</label>
                              <Textarea
                                id="message"
                                {...form.register("message")}
                                className="w-full"
                                rows={3}
                                placeholder="Ihr Anliegen (optional)"
                              />
                            </div>
                            
                            <div className="flex flex-col space-y-2 pt-1">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="newsletter"
                                  checked={form.getValues("newsletter")}
                                  onCheckedChange={(checked) => {
                                    form.setValue("newsletter", checked as boolean);
                                  }}
                                />
                                <label
                                  htmlFor="newsletter"
                                  className="text-sm font-medium cursor-pointer"
                                >
                                  Ich möchte den Newsletter erhalten (optional)
                                </label>
                              </div>
                              
                              <div className="flex items-start space-x-2">
                                <Checkbox
                                  id="privacyAccepted"
                                  checked={form.getValues("privacyAccepted")}
                                  onCheckedChange={(checked) => {
                                    form.setValue("privacyAccepted", checked as boolean, { shouldValidate: true });
                                    if (checked) {
                                      form.clearErrors('privacyAccepted');
                                    }
                                  }}
                                />
                                <div className="space-y-1">
                                  <label
                                    htmlFor="privacyAccepted"
                                    className="text-sm font-medium cursor-pointer"
                                  >
                                    Ich akzeptiere die Datenschutzerklärung *
                                  </label>
                                  {form.formState.errors.privacyAccepted && (
                                    <p className="text-xs text-red-500">
                                      {form.formState.errors.privacyAccepted.message || "Erforderlich"}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between pt-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setShowInCardForm(false)}
                              className="flex items-center"
                              disabled={formSubmitting}
                            >
                              <ArrowLeft className="mr-2 h-4 w-4" />
                              Zurück
                            </Button>
                            <Button 
                              type="submit" 
                              className="bg-swiss-red hover:bg-swiss-red/90"
                              disabled={formSubmitting}
                            >
                              {formSubmitting ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Wird gesendet...
                                </>
                              ) : (
                                <>
                                  Anfrage senden
                                  <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </div>
                          
                          <div className="text-center text-xs text-gray-500 mt-2">
                            Alle mit * markierten Felder sind Pflichtfelder
                          </div>
                        </motion.form>
                      )}
                      
                      {formSubmitted && (
                        <motion.div 
                          key="success-message"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-6 text-center space-y-4"
                        >
                          <div className="flex justify-center">
                            <CheckCircle className="h-16 w-16 text-green-500" />
                          </div>
                          
                          <h3 className="text-xl font-medium text-gray-900">
                            Ihre Anfrage wurde erfolgreich übermittelt!
                          </h3>
                          
                          <p className="text-gray-600">
                            Vielen Dank für Ihr Interesse. Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen.
                          </p>
                          
                          <Button 
                            onClick={resetContactForm}
                            className="bg-swiss-red hover:bg-swiss-red/90 mt-2"
                          >
                            Zurück zur Übersicht
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
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

          {!showContactForm && (
            <div className="flex justify-center pt-6">
              <Button 
                className="bg-swiss-red hover:bg-swiss-red/90 text-white px-8 py-6 text-lg"
                onClick={() => setShowContactForm(true)}
              >
                Kostenloses Beratungsgespräch vereinbaren
              </Button>
            </div>
          )}

          {showContactForm && (
            <AnalysisContactForm 
              companyName={result?.firmeninfo.name !== "Nicht gefunden" ? result?.firmeninfo.name : ""}
              email={result?.firmeninfo.email !== "Nicht gefunden" ? result?.firmeninfo.email : ""}
              phone={result?.firmeninfo.telefon !== "Nicht gefunden" ? result?.firmeninfo.telefon : ""}
              websiteUrl={analyzedUrl || ""}
            />
          )}

          <div className="flex justify-center pt-2">
            <Button 
              variant="outline"
              onClick={() => {
                setResult(null);
                setError(null);
                setAnalyzedUrl(null);
                setShowContactForm(false);
                setShowInCardForm(false);
                setFormSubmitted(false);
              }}
              className="mt-4"
            >
              Neue Analyse starten
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
