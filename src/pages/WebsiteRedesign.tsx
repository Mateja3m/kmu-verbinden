import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import BackgroundPattern from '@/components/BackgroundPattern';

const WebsiteRedesign = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could add the logic to handle the submission
    toast({
      title: "Anfrage gesendet",
      description: "Wir werden uns in Kürze bei Ihnen melden.",
    });
    setWebsiteUrl('');
    setEmail('');
  };

  return (
    <BackgroundPattern>
      <div className="min-h-screen bg-gradient-to-b from-swiss-darkblue to-swiss-darkblue/90 text-white">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Zeit für ein Redesign?
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Prüfen Sie jetzt Ihre Homepage
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  type="url"
                  placeholder="Website-URL"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="bg-white text-black"
                  required
                />
                <Input
                  type="email"
                  placeholder="E-Mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-black"
                  required
                />
                <Button 
                  type="submit"
                  className="bg-swiss-red hover:bg-swiss-red/90 text-white px-8 shine-effect"
                >
                  Jetzt prüfen
                </Button>
              </div>
            </form>

            <div className="mt-16 space-y-8 text-left bg-white/5 backdrop-blur-sm rounded-xl p-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
                Ihr Website-Redesign muss nicht teuer sein!
              </h2>
              <p className="text-lg leading-relaxed">
                Als KMU-Verein haben wir für Sie die besten Partner sorgfältig evaluiert und garantieren damit höchste Qualität und Vertrauenswürdigkeit. Mit fairen Angeboten, topaktuellen Designs und neusten Technologien erhalten Sie bei uns eine professionelle Neugestaltung Ihrer Homepage – und das zu Bestpreisen.
              </p>
              <p className="text-lg leading-relaxed">
                Nutzen Sie jetzt die Gelegenheit und fordern Sie Ihre unverbindliche Offerte an. Starten Sie einfach den Chat mit unserer KI, und wir erstellen Ihnen schnell und persönlich ein passendes Angebot. So kommen Sie rasch und unkompliziert zu einer modernen, benutzerfreundlichen Website, die perfekt zu Ihrem Unternehmen passt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default WebsiteRedesign;