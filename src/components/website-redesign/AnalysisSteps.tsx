
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
        <h2 className="text-2xl font-semibold mb-4">Wo steht Ihre Website?</h2>
        <form onSubmit={onWebsiteSubmit} className="flex flex-col md:flex-row gap-4">
          <Input
            type="url"
            placeholder="Ihre Website URL eingeben"
            value={websiteUrl}
            onChange={(e) => onWebsiteUrlChange(e.target.value)}
            className="bg-white text-gray-900 h-12 text-lg flex-1"
            required
          />
          <Button 
            type="submit"
            size="lg"
            disabled={isAnalyzing}
            className="bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect"
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
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Was möchten Sie verbessern?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Palette, label: 'Design modernisieren', value: 'design' },
            { icon: LineChart, label: 'Conversion Rate steigern', value: 'conversion' },
            { icon: Zap, label: 'Performance optimieren', value: 'performance' },
            { icon: Smartphone, label: 'Mobile Experience verbessern', value: 'mobile' }
          ].map(({ icon: Icon, label, value }) => (
            <button
              key={value}
              onClick={() => onImprovementSelect(value)}
              className={`p-4 rounded-xl border-2 transition-all ${
                improvements.includes(value)
                  ? 'border-swiss-red bg-swiss-red/10'
                  : 'border-gray-200 hover:border-swiss-red/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-6 w-6 ${improvements.includes(value) ? 'text-swiss-red' : 'text-gray-500'}`} />
                <span className={improvements.includes(value) ? 'text-swiss-red' : 'text-gray-700'}>{label}</span>
              </div>
            </button>
          ))}
        </div>
        <Button 
          onClick={onStartConsultation}
          disabled={improvements.length === 0}
          className="w-full mt-6 bg-swiss-red hover:bg-swiss-red/90 text-white shine-effect"
        >
          Kostenloses Beratungsgespräch vereinbaren
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return null;
};
