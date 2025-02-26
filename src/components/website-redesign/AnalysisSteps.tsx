import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, ChevronRight, Check, Sparkles } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { LoadingAnimationBar } from "./LoadingAnimationBar";
import confetti from 'canvas-confetti';

interface AnalysisStepsProps {
  step: number;
  isAnalyzing: boolean;
  websiteUrl: string;
  improvements: string[];
  onWebsiteSubmit: (e: React.FormEvent) => void;
  onWebsiteUrlChange: (url: string) => void;
  onImprovementSelect: (improvement: string) => void;
  onStartConsultation: () => void;
}

export const AnalysisSteps = ({
  step,
  isAnalyzing,
  websiteUrl,
  improvements,
  onWebsiteSubmit,
  onWebsiteUrlChange,
  onStartConsultation
}: AnalysisStepsProps) => {
  const formatUrl = (url: string) => {
    let cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    cleanUrl = cleanUrl.replace(/\/$/, '');
    if (cleanUrl) {
      cleanUrl = `https://${cleanUrl}`;
    }
    return cleanUrl;
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onWebsiteUrlChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedUrl = formatUrl(websiteUrl);
    onWebsiteUrlChange(formattedUrl);
    onWebsiteSubmit(e);
  };

  if (step === 1) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold mb-4">Wo steht Ihre Website?</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <Input
            type="text"
            placeholder="z.B. meine-website.ch"
            value={websiteUrl}
            onChange={handleUrlChange}
            className="bg-white/10 text-white h-14 text-lg flex-1 border-2 border-white/20 placeholder:text-white/60"
            required
          />
          <Button 
            type="submit"
            size="lg"
            disabled={isAnalyzing}
            className="h-14 bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect text-lg px-8"
          >
            {isAnalyzing ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyse läuft...
              </span>
            ) : (
              <>
                <Globe className="mr-2 h-5 w-5" />
                Jetzt analysieren
              </>
            )}
          </Button>
        </form>

        {isAnalyzing && (
          <div className="mt-8">
            <LoadingAnimationBar 
              websiteUrl={websiteUrl.replace(/^https?:\/\//, '')} 
              isAnalyzing={isAnalyzing} 
            />
          </div>
        )}
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-8 text-center">
        <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-500 px-4 py-2 rounded-full font-medium">
          <Check className="h-5 w-5" />
          Qualifiziert für Exklusiv-Paket
        </div>
        
        <h2 className="text-3xl font-semibold">
          <Sparkles className="inline-block h-8 w-8 mr-2 text-yellow-400" />
          Ihr Exklusiv-Paket als vorqualifiziertes Unternehmen
        </h2>

        <div className="grid gap-6 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-6 text-left">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 mt-1 text-green-400 shrink-0" />
                <div>
                  <p className="font-medium">Website-Analyse durch unsere Digital-Experten</p>
                  <p className="text-white/60">Wert: CHF 890</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 mt-1 text-green-400 shrink-0" />
                <div>
                  <p className="font-medium">Strategieberatung für messbares Wachstum</p>
                  <p className="text-white/60">Individuell auf Ihr Unternehmen zugeschnitten</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 mt-1 text-green-400 shrink-0" />
                <div>
                  <p className="font-medium">Premium Webdesign zu KMU-Vorzugskonditionen</p>
                  <p className="text-white/60">Exklusiv für qualifizierte Unternehmen</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 backdrop-blur border border-yellow-400/30 rounded-xl p-6 text-left">
            <h3 className="text-xl font-semibold mb-4">Exklusiver Bonus</h3>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 mt-1 text-yellow-400 shrink-0" />
              <div>
                <p className="font-medium">1 Jahr SKV-Mitgliedschaft inklusive</p>
                <p className="text-white/60">Wert: CHF 550</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-sm text-white/60 mb-2">Noch 3 Plätze verfügbar</div>
          <Progress value={75} className="h-2 w-48 mx-auto mb-8" />
          <Button 
            onClick={onStartConsultation}
            className="w-full md:w-auto bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect h-14 text-lg px-8"
          >
            Kostenloses Beratungsgespräch vereinbaren
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <p className="text-sm text-white/60">
          * Angebot limitiert und nur für qualifizierte Unternehmen verfügbar
        </p>
      </div>
    );
  }

  return null;
};
