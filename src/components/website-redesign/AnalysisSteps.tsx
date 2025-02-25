
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, ChevronRight, Palette, LineChart, Zap, Smartphone } from 'lucide-react';

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
  onImprovementSelect,
  onStartConsultation
}: AnalysisStepsProps) => {
  if (step === 1) {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold mb-4">Wo steht Ihre Website?</h2>
        <form onSubmit={onWebsiteSubmit} className="flex flex-col md:flex-row gap-4">
          <Input
            type="url"
            placeholder="Ihre Website URL eingeben"
            value={websiteUrl}
            onChange={(e) => onWebsiteUrlChange(e.target.value)}
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
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold text-center mb-8">Was möchten Sie verbessern?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Palette, label: 'Design modernisieren', value: 'design' },
            { icon: LineChart, label: 'Conversion Rate steigern', value: 'conversion' },
            { icon: Zap, label: 'Performance optimieren', value: 'performance' },
            { icon: Smartphone, label: 'Mobile Experience verbessern', value: 'mobile' }
          ].map(({ icon: Icon, label, value }) => (
            <button
              key={value}
              onClick={() => onImprovementSelect(value)}
              className={`p-6 rounded-2xl border-2 transition-all ${
                improvements.includes(value)
                  ? 'border-swiss-red bg-white/5 shadow-lg'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div className="flex items-center gap-4">
                <Icon className={`h-8 w-8 ${improvements.includes(value) ? 'text-swiss-red' : 'text-white/80'}`} />
                <span className="text-xl">{label}</span>
              </div>
            </button>
          ))}
        </div>
        <Button 
          onClick={onStartConsultation}
          disabled={improvements.length === 0}
          className="w-full mt-8 bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect h-14 text-lg"
        >
          Kostenloses Beratungsgespräch vereinbaren
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    );
  }

  return null;
};
