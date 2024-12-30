const testimonials = [
  {
    quote: "Die Mitgliedschaft im SKV hat uns Zugang zu einem starken Netzwerk und exklusiven Vorteilen verschafft. Die Investition hat sich mehrfach ausgezahlt – absolut empfehlenswert!",
    author: "Dominik Graf",
    company: "Pawex AG",
  },
  {
    quote: "Unterstützend durch den SKV konnten wir unser Netzwerk erheblich erweitern und neue Kunden gewinnen. Der direkte Zugang zu relevanten Kontakten war entscheidend für unseren Erfolg.",
    author: "Hussam Zaghloul",
    company: "Architekt FH",
  },
  {
    quote: "Der SKV hat uns mit gezielten Marketingstrategien, wertvollen Netzwerkkontakten und effektiven Werbemöglichkeiten geholfen, unsere Reichweite zu erhöhen.",
    author: "Timo Seger",
    company: "Umzug Schweiz AG",
  },
];

const Testimonials = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-swiss-darkblue">
          Vertrauen von führenden Unternehmen
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-sm">
              <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
              <div className="font-semibold text-swiss-darkblue">{testimonial.author}</div>
              <div className="text-sm text-gray-500">{testimonial.company}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;