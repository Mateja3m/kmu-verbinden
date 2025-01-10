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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-[#F2FCE2]/10 backdrop-blur-sm p-8 rounded-xl text-left">
                <h3 className="text-xl font-semibold mb-4">Professionelles Design</h3>
                <p>Moderne, responsive Designs die Ihr Unternehmen perfekt repräsentieren. Optimiert für alle Geräte und Bildschirmgrößen.</p>
              </div>
              <div className="bg-[#D3E4FD]/10 backdrop-blur-sm p-8 rounded-xl text-left">
                <h3 className="text-xl font-semibold mb-4">Faire Preise</h3>
                <p>Transparente Preisgestaltung ohne versteckte Kosten. Profitieren Sie von unseren Mitgliederkonditionen.</p>
              </div>
            </div>

            <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6">Sprechen Sie mit unserem KI-Assistenten</h3>
              <div className="relative w-full aspect-[16/9] md:aspect-[2/1]">
                <iframe 
                  className="absolute inset-0 w-full h-full rounded-lg"
                  src="https://avaia.io/chat/authorize-chat/2705b8b0-276f-4582-a41c-6ff896a461ad/"
                  width="100%"
                  height="600px"
                  frameBorder="0"
                  title="KI-Assistent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundPattern>
  );
};

export default WebsiteRedesign;