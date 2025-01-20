import { useEffect } from 'react';

const PartnerMeetings = () => {
  useEffect(() => {
    // Add Calendly scripts
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-swiss-darkblue mb-4">
            Partner Meetings
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Wählen Sie einen passenden Termin für ein Gespräch über eine mögliche Partnerschaft mit dem Schweizerischen KMU Verein (SKV).
          </p>
        </div>
        <div className="calendly-inline-widget" 
          data-url="https://calendly.com/d/cnj9-wry-6xq/partnerschaft-mit-dem-kmu-verein-schweiz-skv?hide_gdpr_banner=1" 
          style={{ minWidth: '320px', height: '700px' }}>
        </div>
      </div>
    </div>
  );
};

export default PartnerMeetings;