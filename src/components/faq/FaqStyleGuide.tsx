import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Copy, Palette, Type, Layout, Zap } from 'lucide-react';

const FaqStyleGuide: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, token: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const designTokens = {
    colors: {
      primary: 'hsl(222.2 84% 4.9%)',
      primaryForeground: 'hsl(210 40% 98%)',
      secondary: 'hsl(210 40% 96%)',
      muted: 'hsl(210 40% 96%)',
      mutedForeground: 'hsl(215.4 16.3% 46.9%)',
      accent: 'hsl(210 40% 96%)',
      destructive: 'hsl(0 84.2% 60.2%)',
      border: 'hsl(214.3 31.8% 91.4%)',
      background: 'hsl(0 0% 100%)',
      foreground: 'hsl(222.2 84% 4.9%)'
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem'
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem'
    },
    borderRadius: {
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem'
    },
    shadows: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
    }
  };

  const componentStates = [
    {
      name: 'Default',
      description: 'Standard FAQ item in closed state',
      className: 'border rounded-lg p-4 hover:bg-muted/50'
    },
    {
      name: 'Hover',
      description: 'FAQ item on hover',
      className: 'border rounded-lg p-4 bg-muted/50'
    },
    {
      name: 'Active/Open',
      description: 'FAQ item in expanded state',
      className: 'border-2 border-primary rounded-lg p-4 bg-primary/5'
    },
    {
      name: 'Focus',
      description: 'FAQ item with keyboard focus',
      className: 'border rounded-lg p-4 ring-2 ring-primary ring-offset-2'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">FAQ Design System</h1>
        <p className="text-xl text-muted-foreground">
          Interactive style guide for the FAQ & Help Center components
        </p>
      </div>

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tokens" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Design Tokens
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Components
          </TabsTrigger>
          <TabsTrigger value="interactions" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Interactions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(designTokens.colors).map(([name, value]) => (
                  <div key={name} className="space-y-2">
                    <div 
                      className="h-16 rounded-lg border shadow-sm"
                      style={{ backgroundColor: value }}
                    />
                    <div className="space-y-1">
                      <p className="font-medium text-sm capitalize">{name.replace(/([A-Z])/g, ' $1')}</p>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">{value}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(value, name)}
                          className="h-6 w-6 p-0"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      {copiedToken === name && (
                        <Badge variant="secondary" className="text-xs">Copied!</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(designTokens.spacing).map(([name, value]) => (
                  <div key={name} className="flex items-center gap-4">
                    <div className="w-16 text-sm font-medium">{name}</div>
                    <div 
                      className="bg-primary h-4 rounded"
                      style={{ width: value }}
                    />
                    <code className="text-sm bg-muted px-2 py-1 rounded">{value}</code>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Typography Scale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(designTokens.typography.fontSize).map(([name, value]) => (
                <div key={name} className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{name}</Badge>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{value}</code>
                  </div>
                  <p style={{ fontSize: value }} className="font-medium">
                    The quick brown fox jumps over the lazy dog
                  </p>
                  <Separator />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Font Weights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(designTokens.typography.fontWeight).map(([name, value]) => (
                <div key={name} className="flex items-center gap-4">
                  <Badge variant="outline" className="w-20">{name}</Badge>
                  <p style={{ fontWeight: value }} className="text-lg">
                    Sample text with {name} weight
                  </p>
                  <code className="text-sm bg-muted px-2 py-1 rounded">{value}</code>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Component States</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {componentStates.map((state) => (
                <div key={state.name} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge>{state.name}</Badge>
                    <span className="text-sm text-muted-foreground">{state.description}</span>
                  </div>
                  <div className={state.className}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Sample FAQ Question</h3>
                      <div className="text-muted-foreground">▼</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Component Hierarchy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 font-mono text-sm">
                <div>FaqContainer</div>
                <div className="ml-4">├── Search Input</div>
                <div className="ml-4">├── Category Navigation</div>
                <div className="ml-4">├── Sidebar</div>
                <div className="ml-8">├── Top Questions</div>
                <div className="ml-8">└── Quick Links</div>
                <div className="ml-4">└── Main Content</div>
                <div className="ml-8">└── FaqCategory</div>
                <div className="ml-12">└── FaqItem[]</div>
                <div className="ml-16">├── Question</div>
                <div className="ml-16">├── Answer</div>
                <div className="ml-16">└── Feedback</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Animation Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Accordion Expand/Collapse</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Duration: 300ms</li>
                    <li>• Easing: ease-in-out</li>
                    <li>• Properties: height, opacity</li>
                    <li>• Icon rotation: 180deg</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Search Results</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Debounce: 300ms</li>
                    <li>• Fade in: 200ms</li>
                    <li>• Stagger delay: 50ms per item</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Page Load</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Initial delay: 100ms</li>
                    <li>• Stagger: 100ms per section</li>
                    <li>• Transform: translateY(20px)</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Feedback Actions</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Scale: 0.95 on click</li>
                    <li>• Color transition: 150ms</li>
                    <li>• Success feedback: 2s</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Keyboard Navigation</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Tab: Navigate between items</li>
                    <li>• Enter/Space: Toggle accordion</li>
                    <li>• Escape: Close all accordions</li>
                    <li>• Arrow keys: Navigate within category</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">ARIA Attributes</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• aria-expanded</li>
                    <li>• aria-controls</li>
                    <li>• role="button"</li>
                    <li>• aria-describedby</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FaqStyleGuide;