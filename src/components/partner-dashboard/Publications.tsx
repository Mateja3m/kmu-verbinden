import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Publications = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Publikationen & Medien</h2>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Interview im KMU Journal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              "Digitale Transformation im KMU-Sektor" - Erscheinungsdatum: April 2024
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};