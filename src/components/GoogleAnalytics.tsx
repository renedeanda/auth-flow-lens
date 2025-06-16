
import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  trackingId?: string;
}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ trackingId }) => {
  useEffect(() => {
    // Try to get GA tracking ID from props, Vercel env var, or default placeholder
    const gaId = trackingId || 
                 import.meta.env.VITE_GA_TRACKING_ID || 
                 'G-XXXXXXXXXX'; // Replace with your actual GA4 property ID
    
    if (gaId && gaId !== 'G-XXXXXXXXXX') {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.gtag = window.gtag || function() {
        (window.gtag as any).q = (window.gtag as any).q || [];
        (window.gtag as any).q.push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', gaId);

      return () => {
        // Cleanup script on unmount
        document.head.removeChild(script);
      };
    }
  }, [trackingId]);

  return null;
};

// Extend window type for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
