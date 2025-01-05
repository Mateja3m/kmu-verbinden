import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

interface AGBModalProps {
  children: React.ReactNode;
}

export const AGBModal = ({ children }: AGBModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-swiss-darkblue">
            Allgemeine Geschäftsbedingungen (AGB)
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm">
            <div className="text-center font-semibold">
              <p>MEHR WISSEN. MEHR ERREICHEN.</p>
              <div className="mt-4">
                <p>Schweizerischer KMU Verein (SKV)</p>
                <p>Dammweg 11D</p>
                <p>CH-3904 Naters</p>
                <p>Telefon: 044 585 20 81</p>
                <p>E-Mail: info@kmu-verein.ch</p>
                <p>Web: www.kmu-verein.ch</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">1. Geltungsbereich</h3>
              <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Geschäftsbeziehungen zwischen dem Schweizerischen KMU Verein (SKV) und seinen Mitgliedern, Kunden und Nutzern der Webseite www.kmu-verein.ch.</p>

              <h3 className="font-semibold">2. Vertragsschluss</h3>
              <p>Durch die Nutzung unserer Webseite, die Anmeldung zu unseren Dienstleistungen oder den Kauf unserer Produkte, akzeptieren Sie diese AGB. Ein Vertrag kommt zustande, sobald wir Ihre Anmeldung oder Bestellung schriftlich bestätigen.</p>

              <h3 className="font-semibold">3. Leistungen</h3>
              <p>Der Schweizerische KMU Verein (SKV) bietet seinen Mitgliedern und Kunden verschiedene Dienstleistungen und Produkte an, darunter Praxisratgeber, Beratungsleistungen und Zugang zu Expertennetzwerken. Der Umfang der jeweiligen Leistungen ergibt sich aus den individuellen Vereinbarungen und der Beschreibung auf unserer Webseite.</p>

              <h3 className="font-semibold">4. Preise und Zahlung</h3>
              <p>Die Preise für unsere Dienstleistungen und Produkte sind auf unserer Webseite angegeben. Alle Preise verstehen sich exklusive Mehrwertsteuer. Die Zahlung erfolgt gemäß den auf der Webseite angegebenen Zahlungsmethoden und -bedingungen.</p>

              <h3 className="font-semibold">5. Kündigung und Rücktritt</h3>
              <p>Mitglieder und Kunden können ihre Mitgliedschaft oder Bestellung gemäß den auf der Webseite angegebenen Fristen und Bedingungen kündigen. Ein Rücktritt von einem abgeschlossenen Vertrag ist nur unter den gesetzlich vorgesehenen Bedingungen möglich.</p>

              <h3 className="font-semibold">6. Haftung</h3>
              <p>Der Schweizerische KMU Verein (SKV) haftet nur für Schäden, die durch grobe Fahrlässigkeit oder Vorsatz entstanden sind. Eine weitergehende Haftung, insbesondere für indirekte Schäden oder entgangenen Gewinn, ist ausgeschlossen.</p>

              <h3 className="font-semibold">7. Datenschutz</h3>
              <p>Der Schutz Ihrer persönlichen Daten ist uns wichtig. Informationen zum Datenschutz finden Sie in unserer Datenschutzerklärung, die Bestandteil dieser AGB ist.</p>

              <h3 className="font-semibold">8. Änderungen der AGB</h3>
              <p>Der Schweizerische KMU Verein (SKV) behält sich das Recht vor, diese AGB jederzeit zu ändern. Änderungen werden auf unserer Webseite veröffentlicht und treten mit der Veröffentlichung in Kraft.</p>

              <h3 className="font-semibold">9. Anwendbares Recht und Gerichtsstand</h3>
              <p>Diese AGB unterliegen schweizerischem Recht. Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit diesen AGB ist Naters, Schweiz.</p>

              <h3 className="font-semibold">10. Salvatorische Klausel</h3>
              <p>Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, so berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An die Stelle der unwirksamen Bestimmung tritt eine dem wirtschaftlichen Zweck möglichst nahekommende rechtswirksame Regelung.</p>

              <div className="mt-6">
                <h3 className="font-semibold">Kontakt</h3>
                <p>Schweizerischer KMU Verein (SKV)</p>
                <p>Geschäftsstelle Naters</p>
                <p>Dammweg 11d</p>
                <p>3904 Naters</p>
                <p>Schweiz</p>
                <p>Telefon: +41 (0) 44 585 20 81</p>
                <p>E-Mail: info@kmu-verein.ch</p>
                <p>Web: www.kmu-verein.ch</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};