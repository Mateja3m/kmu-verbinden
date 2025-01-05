import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DatenschutzModal() {
  return (
    <Dialog>
      <DialogTrigger className="hover:text-swiss-red transition-colors">
        Datenschutz
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Datenschutzerklärung 2024 DE</DialogTitle>
        </DialogHeader>
        <div className="prose max-w-none dark:prose-invert">
          <div className="mb-6">
            <p className="font-bold">MEHR WISSEN. MEHR ERREICHEN.</p>
            <p>
              Schweizerischer KMU Verein (SKV)<br />
              Dammweg 11D<br />
              CH-3904 Naters<br />
              Telefon: 044 585 20 81<br />
              E-Mail: info@kmu-verein.ch<br />
              Web: www.kmu-verein.ch
            </p>
          </div>

          <h2 className="text-xl font-bold mt-6">1. Verantwortlicher</h2>
          <p>
            Schweizerischer KMU Verein (SKV)<br />
            Dammweg 11d<br />
            3904 Naters<br />
            Telefon: +41 (0) 44 585 20 81<br />
            E-Mail: info@kmu-verein.ch<br />
            Web: www.kmu-verein.ch
          </p>

          <h2 className="text-xl font-bold mt-6">2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung</h2>
          
          <h3 className="text-lg font-semibold mt-4">a) Beim Besuch der Website</h3>
          <p>
            Beim Aufrufen unserer Website www.kmu-verein.ch werden durch den auf Ihrem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sogenannten Logfile gespeichert. Folgende Informationen werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert:
          </p>
          <ul className="list-disc pl-6">
            <li>IP-Adresse des anfragenden Rechners,</li>
            <li>Datum und Uhrzeit des Zugriffs,</li>
            <li>Name und URL der abgerufenen Datei,</li>
            <li>Website, von der aus der Zugriff erfolgt (Referrer-URL),</li>
            <li>verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers.</li>
          </ul>

          <h3 className="text-lg font-semibold mt-4">b) Bei Nutzung unseres Kontaktformulars</h3>
          <p>
            Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über ein auf der Website bereitgestelltes Formular Kontakt aufzunehmen. Dabei ist die Angabe einer gültigen E-Mail-Adresse erforderlich, damit wir wissen, von wem die Anfrage stammt und um diese beantworten zu können. Weitere Angaben können freiwillig getätigt werden.
          </p>

          <h3 className="text-lg font-semibold mt-4">c) Bei Anmeldung für unseren Newsletter</h3>
          <p>
            Sofern Sie ausdrücklich eingewilligt haben, verwenden wir Ihre E-Mail-Adresse dafür, Ihnen regelmäßig unseren Newsletter zu übersenden. Für den Empfang des Newsletters ist die Angabe einer E-Mail-Adresse ausreichend. Die Abmeldung ist jederzeit möglich, zum Beispiel über einen Link am Ende eines jeden Newsletters. Alternativ können Sie Ihren Abmeldewunsch gerne auch jederzeit an info@kmu-verein.ch per E-Mail senden.
          </p>

          <h2 className="text-xl font-bold mt-6">3. Weitergabe von Daten</h2>
          <p>
            Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:
          </p>
          <ul className="list-disc pl-6">
            <li>Sie Ihre ausdrückliche Einwilligung dazu erteilt haben,</li>
            <li>die Weitergabe zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist,</li>
            <li>für den Fall, dass für die Weitergabe eine gesetzliche Verpflichtung besteht,</li>
            <li>dies für die Abwicklung von Vertragsverhältnissen mit Ihnen erforderlich ist.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6">4. Cookies</h2>
          <p>
            Wir setzen auf unserer Seite Cookies ein. Hierbei handelt es sich um kleine Dateien, die Ihr Browser automatisch erstellt und die auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Seite besuchen.
          </p>

          <h2 className="text-xl font-bold mt-6">5. Analyse-Tools</h2>
          <p>
            Die im Folgenden aufgeführten und von uns eingesetzten Tracking-Maßnahmen werden auf Grundlage des Schweizer Datenschutzgesetzes (DSG) durchgeführt.
          </p>

          <h2 className="text-xl font-bold mt-6">6. Betroffenenrechte</h2>
          <p>Sie haben das Recht:</p>
          <ul className="list-disc pl-6">
            <li>Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen</li>
            <li>unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
            <li>die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
            <li>die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen</li>
            <li>Ihre personenbezogenen Daten in einem strukturierten Format zu erhalten</li>
            <li>Ihre einmal erteilte Einwilligung jederzeit zu widerrufen</li>
            <li>sich bei einer Aufsichtsbehörde zu beschweren</li>
          </ul>

          <h2 className="text-xl font-bold mt-6">7. Datensicherheit</h2>
          <p>
            Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird.
          </p>

          <h2 className="text-xl font-bold mt-6">8. Aktualität und Änderung dieser Datenschutzerklärung</h2>
          <p>
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand August 2024.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}