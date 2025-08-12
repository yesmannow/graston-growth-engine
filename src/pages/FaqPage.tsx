import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FaqContainer from '@/components/faq/FaqContainer';
import { faqData } from '@/data/faqData';

const FaqPage: React.FC = () => {
  useEffect(() => {
    // Handle deep linking to specific FAQ items
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  // Generate JSON-LD schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>FAQ & Help Center - Graston Technique® Provider Directory</title>
        <meta 
          name="description" 
          content="Find answers to frequently asked questions about the Graston Technique® Provider Directory. Get help with membership, billing, profile management, and more." 
        />
        <meta name="keywords" content="Graston Technique, FAQ, help center, provider directory, membership, billing, support" />
        <link rel="canonical" href={`${window.location.origin}/faq`} />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="FAQ & Help Center - Graston Technique® Provider Directory" />
        <meta property="og:description" content="Find answers to frequently asked questions about the Graston Technique® Provider Directory." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/faq`} />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="FAQ & Help Center - Graston Technique® Provider Directory" />
        <meta name="twitter:description" content="Find answers to frequently asked questions about the Graston Technique® Provider Directory." />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        
        {/* Print stylesheet */}
        <style type="text/css" media="print">
          {`
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            body { font-size: 12pt; line-height: 1.4; }
            h1, h2, h3 { page-break-after: avoid; }
            .faq-item { page-break-inside: avoid; margin-bottom: 1em; }
            .faq-question { font-weight: bold; margin-bottom: 0.5em; }
            .faq-answer { margin-bottom: 1em; padding-left: 1em; }
          `}
        </style>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <FaqContainer faqs={faqData} />
      </div>
    </>
  );
};

export default FaqPage;