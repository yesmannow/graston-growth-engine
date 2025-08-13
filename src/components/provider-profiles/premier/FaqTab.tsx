import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProviderProfile } from '@/types/provider-profile';

interface FaqTabProps {
  provider: ProviderProfile;
}

const FaqTab = ({ provider }: FaqTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        {provider.faqs && provider.faqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {provider.faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-gray-500 text-center py-8">No FAQs available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default FaqTab;