import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FullProviderProfile } from "@/types";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError, showLoading, dismissToast } from "@/utils/toast";

interface ContactCardProps {
  provider: FullProviderProfile;
}

const ContactCard = ({ provider }: ContactCardProps) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage || !provider.email) {
      showError("Please fill out all fields.");
      return;
    }
  
    setIsSubmitting(true);
    const toastId = showLoading("Sending your message...");
  
    try {
      const { error } = await supabase.functions.invoke('contact-provider', {
        body: {
          providerEmail: provider.email,
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        },
      });
  
      dismissToast(toastId);
  
      if (error) {
        throw new Error(error.message);
      }
  
      showSuccess("Your message has been sent!");
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    } catch (error: any) {
      dismissToast(toastId);
      console.error("Error sending message:", error);
      showError(`Failed to send message: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-primary/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Request an Appointment</CardTitle>
        <CardDescription>Send a direct message to {provider.name}. Your message will be sent securely to the provider's office.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <Input
            placeholder="Your Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            disabled={isSubmitting}
            required
            aria-label="Your Name"
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            disabled={isSubmitting}
            required
            aria-label="Your Email"
          />
          <Textarea
            placeholder="Your Message (e.g., 'I'd like to inquire about treatment for shoulder pain.')"
            rows={4}
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            disabled={isSubmitting}
            required
            aria-label="Your Message"
          />
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactCard;