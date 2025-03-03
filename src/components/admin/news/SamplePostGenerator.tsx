
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export function SamplePostGenerator() {
  const { toast } = useToast();
  const [hasInitializedSamples, setHasInitializedSamples] = useState(false);
  const [permissionError, setPermissionError] = useState(false);

  const checkAndCreateSamplePosts = async () => {
    if (hasInitializedSamples) return;
    
    try {
      const { data: existingPosts, error: checkError } = await supabase
        .from('news_posts')
        .select('id')
        .limit(1);
      
      if (checkError) throw checkError;
      
      if (!existingPosts || existingPosts.length === 0) {
        await createSamplePosts();
        setHasInitializedSamples(true);
        toast({
          title: "Beispiel-Medienmitteilungen erstellt",
          description: "Einige Beispiel-Medienmitteilungen wurden für Sie erstellt."
        });
      }
    } catch (error) {
      console.error("Error checking or creating sample posts:", error);
      if (error instanceof Error && error.message.includes("row-level security policy")) {
        setPermissionError(true);
      }
    }
  };

  const createSamplePosts = async () => {
    const samplePosts = [
      {
        title: "KMU Finanzierungshilfen 2024: Neue Förderprogramme vorgestellt",
        content: JSON.stringify([
          {
            type: "paragraph",
            content: "Der Schweizer KMU Verband freut sich, neue Finanzierungshilfen für kleine und mittlere Unternehmen vorzustellen, die ab Januar 2024 verfügbar sein werden. Die Programme umfassen zinsgünstige Darlehen, Bürgschaften und Zuschüsse für digitale Transformation."
          },
          {
            type: "paragraph",
            content: "Die neuen Förderprogramme wurden in Zusammenarbeit mit dem Staatssekretariat für Wirtschaft (SECO) und kantonalen Wirtschaftsförderungen entwickelt und sollen insbesondere KMU in strukturschwachen Regionen unterstützen."
          }
        ]),
        slug: "kmu-finanzierungshilfen-2024",
        image_url: "https://uqxvvjdegwukvvrefkho.supabase.co/storage/v1/object/public/images/kmu-financing.jpg",
        meta_description: "Neue Finanzierungshilfen und Förderprogramme für Schweizer KMU ab 2024 vorgestellt.",
        meta_keywords: "KMU, Finanzierung, Förderprogramme, Darlehen, Schweiz",
        published_at: new Date().toISOString()
      },
      {
        title: "Schweizer KMU und die Digitalisierung: Neuer Trend-Report veröffentlicht",
        content: JSON.stringify([
          {
            type: "paragraph",
            content: "Der Schweizer KMU Verband hat heute seinen jährlichen Digitalisierungs-Report veröffentlicht. Die Studie zeigt, dass immer mehr kleine und mittlere Unternehmen digitale Technologien einsetzen, um ihre Geschäftsprozesse zu optimieren und ihre Wettbewerbsfähigkeit zu stärken."
          },
          {
            type: "paragraph",
            content: "Besonders auffällig ist der Anstieg bei der Nutzung von Cloud-Diensten und digitalen Marketingstrategien. Dennoch gibt es nach wie vor Herausforderungen, insbesondere im Bereich der IT-Sicherheit und des Fachkräftemangels."
          }
        ]),
        slug: "schweizer-kmu-digitalisierung-report",
        image_url: "https://uqxvvjdegwukvvrefkho.supabase.co/storage/v1/object/public/images/digital-transformation.jpg",
        logo_url: "https://uqxvvjdegwukvvrefkho.supabase.co/storage/v1/object/public/images/kmu-logo.png",
        meta_description: "Neuer Report zur Digitalisierung in Schweizer KMU zeigt aktuelle Trends und Herausforderungen.",
        meta_keywords: "KMU, Digitalisierung, Cloud, IT-Sicherheit, Digitale Transformation",
        published_at: new Date(Date.now() - 86400000).toISOString() // Yesterday
      },
      {
        title: "Nachhaltigkeit im KMU-Sektor: Neue Zertifizierung für umweltfreundliche Unternehmen",
        content: JSON.stringify([
          {
            type: "paragraph",
            content: "Der Schweizer KMU Verband lanciert in Zusammenarbeit mit dem Bundesamt für Umwelt (BAFU) eine neue Zertifizierung für nachhaltig wirtschaftende KMU. Das Zertifikat 'GreenBusiness Switzerland' würdigt Unternehmen, die besondere Anstrengungen im Bereich Umweltschutz und Ressourceneffizienz unternehmen."
          },
          {
            type: "paragraph",
            content: "Die Zertifizierung berücksichtigt verschiedene Faktoren wie Energieverbrauch, Abfallmanagement, nachhaltige Beschaffung und CO2-Fußabdruck. Zertifizierte Unternehmen profitieren von einem verbesserten Image, Kosteneinsparungen und Zugang zu speziellen Fördermitteln."
          }
        ]),
        slug: "nachhaltigkeit-kmu-zertifizierung",
        image_url: "https://uqxvvjdegwukvvrefkho.supabase.co/storage/v1/object/public/images/sustainability.jpg",
        meta_description: "Neue 'GreenBusiness Switzerland' Zertifizierung für nachhaltig wirtschaftende KMU in der Schweiz.",
        meta_keywords: "KMU, Nachhaltigkeit, Zertifizierung, Umweltschutz, GreenBusiness",
        published_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
      }
    ];

    for (const post of samplePosts) {
      const { error } = await supabase
        .from('news_posts')
        .insert([post]);
      
      if (error) {
        console.error('Error creating sample post:', error);
      }
    }
  };

  return { checkAndCreateSamplePosts, permissionError, hasInitializedSamples };
}
