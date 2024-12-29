const stats = [
  { number: "2000+", label: "Mitglieder" },
  { number: "5", label: "Sprachen" },
  { number: "100%", label: "Mehr Kunden" },
  { number: "40", label: "Jahre Verbands-Erfahrung" },
];

const Stats = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Zahlen und Fakten über den SKV
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Als vertrauenswürdige Stimme für KMU in der Schweiz sind wir stolz darauf, einen positiven Beitrag zur Wirtschaft und Gesellschaft unseres Landes zu leisten.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;