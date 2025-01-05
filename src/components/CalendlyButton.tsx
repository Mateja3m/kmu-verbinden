import { useEffect } from 'react';
import { Button, ButtonProps } from './ui/button';
import { Calendar } from 'lucide-react';

declare global {
  interface Window {
    Calendly: any;
  }
}

interface CalendlyButtonProps extends ButtonProps {
  variant?: 'default' | 'outline';
  showIcon?: boolean;
}

export function CalendlyButton({ variant = 'default', showIcon = true, className, ...props }: CalendlyButtonProps) {
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

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/kmuverein-skv/kostenlose-rechtsberatung-fur-mitglieder?hide_gdpr_banner=1'
      });
    }
  };

  return (
    <Button
      variant={variant}
      onClick={openCalendly}
      className={className}
      {...props}
    >
      {showIcon && <Calendar className="mr-2 h-5 w-5" />}
      Rechtsberatung vereinbaren
    </Button>
  );
}