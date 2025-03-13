
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AnalysisResult {
  score: number;
  companyInfo: {
    name?: string;
    contact?: string;
    address?: string;
  };
  design: {
    score: number;
    feedback: string[];
  };
  content: {
    score: number;
    feedback: string[];
  };
  technical: {
    score: number;
    feedback: string[];
  };
  improvements: string[];
}

export const WebsiteAnalysisDashboard = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const analyzeWebsite = async () => {
    if (!url) {
      toast({
        title: "Bitte geben Sie eine URL ein",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-website', {
        body: { url }
      });

      if (error) throw error;
      
      setResult(data);
      toast({
        title: "Analyse abgeschlossen",
        description: "Ihre Website wurde erfolgreich analysiert."
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Fehler bei der Analyse",
        description: "Bitte versuchen Sie es später erneut.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!result && !isAnalyzing) {
    return (
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Lassen Sie Ihre Website analysieren
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input
              type="url"
              placeholder="https://ihre-website.ch"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={analyzeWebsite}
              className="bg-swiss-red hover:bg-swiss-red/90"
            >
              Jetzt analysieren
            </Button>
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
            <Progress value={45} className="w-64" />
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
            Website-Analyse Ergebnis
            <span className={`text-4xl ${getScoreColor(result?.score || 0)}`}>
              {result?.score}/100
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Gefundene Informationen</h3>
            <div className="space-y-2">
              <p><strong>Firma:</strong> {result?.companyInfo.name || 'Nicht gefunden'}</p>
              <p><strong>Kontakt:</strong> {result?.companyInfo.contact || 'Nicht gefunden'}</p>
              <p><strong>Adresse:</strong> {result?.companyInfo.address || 'Nicht gefunden'}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Bewertungen</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Design</span>
                <span className={getScoreColor(result?.design.score || 0)}>
                  {result?.design.score}/100
                </span>
              </div>
              <Progress value={result?.design.score} className="h-2" />
              
              <div className="flex items-center justify-between mt-2">
                <span>Content</span>
                <span className={getScoreColor(result?.content.score || 0)}>
                  {result?.content.score}/100
                </span>
              </div>
              <Progress value={result?.content.score} className="h-2" />
              
              <div className="flex items-center justify-between mt-2">
                <span>Technisch</span>
                <span className={getScoreColor(result?.technical.score || 0)}>
                  {result?.technical.score}/100
                </span>
              </div>
              <Progress value={result?.technical.score} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Verbesserungsvorschläge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result?.improvements.map((improvement, index) => (
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
          <Link to="/contact?source=website-analysis">
            Kostenloses Beratungsgespräch vereinbaren
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};
