import { Mail, MessageSquare, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import BackgroundPattern from "@/components/BackgroundPattern";

const Empfehlen = () => {
  const shareText = "Ich empfehle den Schweizerischen KMU Verein (SKV). Werden Sie jetzt Mitglied!";
  const shareUrl = window.location.origin;

  const shareViaEmail = () => {
    const subject = "Empfehlung: Schweizerischer KMU Verein (SKV)";
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`;
  };

  const shareViaWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`, '_blank');
  };

  const shareViaLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareViaSMS = () => {
    window.location.href = `sms:?body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`;
  };

  return (
    <>
      <BackgroundPattern>
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-swiss-darkblue mb-6">
              Empfehlen Sie den SKV weiter
            </h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-xl font-semibold text-swiss-darkblue mb-4">
                Überzeugt vom SKV?
              </h2>
              <p className="text-gray-700 mb-6">
                Teilen Sie Ihre positive Erfahrung mit anderen KMU-Inhabern. Bei erfolgreicher Weiterempfehlung erhalten Sie eine Reduktion von 50% auf Ihre nächste Mitgliedschaftsgebühr!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-blue-50"
                  onClick={shareViaEmail}
                >
                  <Mail className="h-5 w-5" />
                  Per E-Mail teilen
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-green-50"
                  onClick={shareViaWhatsApp}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Per WhatsApp teilen
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-blue-50"
                  onClick={shareViaLinkedIn}
                >
                  <Linkedin className="h-5 w-5" />
                  Auf LinkedIn teilen
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-blue-50"
                  onClick={shareViaFacebook}
                >
                  <Facebook className="h-5 w-5" />
                  Auf Facebook teilen
                </Button>

                <Button
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-gray-50"
                  onClick={shareViaSMS}
                >
                  <MessageSquare className="h-5 w-5" />
                  Per SMS teilen
                </Button>
              </div>
            </div>
          </div>
        </main>
      </BackgroundPattern>
      <Footer />
    </>
  );
};

export default Empfehlen;