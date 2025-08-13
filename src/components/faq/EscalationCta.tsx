import { MessageCircle, Mail, Phone, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const EscalationCta = () => {
  return (
    <Card className="mt-12 bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-3 bg-blue-100 rounded-full">
            <MessageCircle className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <CardTitle className="text-2xl text-gray-900">
          Still have questions?
        </CardTitle>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Can't find the answer you're looking for? Our support team is here to help you get the most out of your directory membership.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Contact Support */}
          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get detailed help via email. We typically respond within 24 hours.
              </p>
              <Button className="w-full" asChild>
                <a href="/support">Contact Support</a>
              </Button>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">24hr response</span>
              </div>
            </CardContent>
          </Card>

          {/* Live Chat */}
          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 mb-4">
                Chat with our support team in real-time during business hours.
              </p>
              <Button variant="outline" className="w-full">
                Start Chat
                <Badge variant="secondary" className="ml-2 text-xs bg-green-100 text-green-700">
                  Online
                </Badge>
              </Button>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">Mon-Fri 9AM-5PM EST</span>
              </div>
            </CardContent>
          </Card>

          {/* Phone Support */}
          <Card className="text-center hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Speak directly with our team for urgent issues or complex questions.
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="tel:+1-800-555-0123">Call (800) 555-0123</a>
              </Button>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">Premier members only</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <h4 className="font-semibold text-gray-900 mb-3">Additional Resources</h4>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <a href="/onboarding">Getting Started Guide</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/marketing-toolkit">Marketing Toolkit</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/reports">Analytics Dashboard</a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="/badges">Badge Showcase</a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EscalationCta;