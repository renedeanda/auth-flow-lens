
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Auth Flow Visualizer - Understand Authentication in 30 Seconds',
  description = 'Visual tool to understand authentication flows in your app stack. Pick your frontend, auth provider, and backend to generate instant diagrams. Perfect for developers learning auth implementation.',
  keywords = 'authentication, auth flow, developer tools, React, Next.js, Auth0, Firebase, JWT, security, web development, API authentication, OAuth, SAML, SSO',
  canonical = 'https://authflow.lovable.app'
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Auth Flow Visualizer",
    "description": description,
    "url": canonical,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Lovable",
      "url": "https://lovable.dev"
    }
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="Auth Flow Visualizer" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Lovable" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};
