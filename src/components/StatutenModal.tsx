
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface StatutenModalProps {
  className?: string;
}

export const StatutenModal: React.FC<StatutenModalProps> = ({ className }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button type="button" className={cn("text-swiss-red inline font-medium", className)}>
          Statuten
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-6">Statuten des Schweizerischen KMU Vereins</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-gray-700">
          <h3 className="text-xl font-semibold">1. Name und Sitz</h3>
          <p>
            Unter dem Namen «Schweizerischer KMU Verein» besteht ein Verein im Sinne von Art. 60 ff. ZGB mit Sitz in Zürich. Der Verein ist politisch und konfessionell neutral.
          </p>

          <h3 className="text-xl font-semibold">2. Zweck</h3>
          <p>
            Der Verein bezweckt die Förderung und Unterstützung kleiner und mittlerer Unternehmen in der Schweiz, insbesondere durch:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vernetzung und Austausch zwischen Mitgliedern</li>
            <li>Vertretung gemeinsamer Interessen</li>
            <li>Beratung und Weiterbildung</li>
            <li>Förderung von Innovation und Digitalisierung</li>
          </ul>

          <h3 className="text-xl font-semibold">3. Mitgliedschaft</h3>
          <p>
            Mitglied des Vereins kann jede natürliche und juristische Person werden, die den Vereinszweck unterstützt.
          </p>
          <p>
            Der Vorstand entscheidet über die Aufnahme neuer Mitglieder. Er kann eine Aufnahme ohne Angabe von Gründen verweigern.
          </p>
          <p>
            Die Mitgliedschaft erlischt durch Austritt, Ausschluss oder Tod bzw. bei juristischen Personen durch deren Auflösung.
          </p>

          <h3 className="text-xl font-semibold">4. Austritt und Ausschluss</h3>
          <p>
            Der Austritt aus dem Verein kann jederzeit schriftlich an den Vorstand erklärt werden. Für das laufende Geschäftsjahr bleibt der Mitgliederbeitrag geschuldet.
          </p>
          <p>
            Ein Mitglied kann jederzeit ohne Angabe von Gründen vom Vorstand ausgeschlossen werden, insbesondere wenn es den Mitgliederbeitrag trotz Mahnung nicht bezahlt oder den Interessen des Vereins zuwiderhandelt.
          </p>

          <h3 className="text-xl font-semibold">5. Organe des Vereins</h3>
          <p>
            Die Organe des Vereins sind:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Die Mitgliederversammlung</li>
            <li>Der Vorstand</li>
            <li>Die Revisionsstelle</li>
          </ul>

          <h3 className="text-xl font-semibold">6. Finanzierung</h3>
          <p>
            Zur Verfolgung des Vereinszweckes verfügt der Verein über folgende Mittel:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Mitgliederbeiträge</li>
            <li>Erträge aus Veranstaltungen</li>
            <li>Spenden und Zuwendungen aller Art</li>
          </ul>
          <p>
            Der Mitgliederbeitrag wird jährlich durch die Mitgliederversammlung festgesetzt.
          </p>

          <h3 className="text-xl font-semibold">7. Haftung</h3>
          <p>
            Für die Verbindlichkeiten des Vereins haftet ausschliesslich das Vereinsvermögen. Eine persönliche Haftung der Mitglieder ist ausgeschlossen.
          </p>

          <h3 className="text-xl font-semibold">8. Schlussbestimmungen</h3>
          <p>
            Diese Statuten wurden an der Gründungsversammlung vom 12. März 2023 angenommen und treten sofort in Kraft.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
