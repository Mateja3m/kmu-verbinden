import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpertServicesProps {
  services: string[];
  regions: string[];
}

export function ExpertServices({ services, regions }: ExpertServicesProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Dienstleistungen & Regionen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Dienstleistungen</h3>
            <ul className="list-disc list-inside text-gray-600">
              {services?.map((service: string) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Regionen</h3>
            <ul className="list-disc list-inside text-gray-600">
              {regions?.map((region: string) => (
                <li key={region}>{region}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}