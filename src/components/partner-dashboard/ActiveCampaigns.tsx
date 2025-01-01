import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ActiveCampaigns = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Aktive Kampagnen</h2>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Frühlingsaktion 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Spezialangebot für KMU: 15% Rabatt auf ausgewählte Dienstleistungen.
              Laufzeit: März - Mai 2024
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>KMU Digitalisierungspaket</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Komplettpaket für digitale Transformation.
              Laufzeit: Januar - Juni 2024
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};