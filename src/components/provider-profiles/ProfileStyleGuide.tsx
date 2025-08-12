import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Palette, 
  Type, 
  Layout, 
  Smartphone, 
  Monitor,
  Tablet,
  CheckCircle,
  Star,
  Award
} from 'lucide-react';

const ProfileStyleGuide = () => {
  const designTokens = {
    colors: {
      primary: {
        free: '#6B7280', // Gray-500
        preferred: '#3B82F6', // Blue-500  
        premier: '#7C3AED' // Purple-600
      },
      accent: {
        free: '#F3F4F6', // Gray-100
        preferred: '#DBEAFE', // Blue-100
        premier: '#EDE9FE' // Purple-100
      },
      success: '#10B981', // Green-500
      warning: '#F59E0B', // Amber-500
      error: '#EF4444' // Red-500
    },
    typography: {
      heading: {
        free: 'text-2xl md:text-3xl font-bold',
        preferred: 'text-3xl md:text-4xl font-bold',
        premier: 'text-4xl md:text-5xl font-bold'
      },
      subheading: 'text-lg md:text-xl font-semibold',
      body: 'text-base leading-relaxed',
      caption: 'text-sm text-gray-600'
    },
    spacing: {
      section: 'space-y-6 md:space-y-8',
      card: 'p-4 md:p-6',
      element: 'mb-4'
    },
    layout: {
      free: 'max-w-2xl mx-auto', // Single column, narrow
      preferred: 'max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8', // Two-column with sidebar
      premier: 'max-w-7xl mx-auto' // Full-width, multi-section
    }
  };

  const componentSpecs = {
    FreeProfile: {
      layout: 'Single column, centered, max-width 2xl',
      components: ['Header Card', 'Status Card', 'Specialties Card', 'Languages Card', 'Upgrade CTA'],
      features: ['Basic info only', 'City/state location', 'Verification badge', 'Upgrade prompts'],
      restrictions: ['No contact info', 'No photos', 'No testimonials', 'No rich media']
    },
    PreferredProfile: {
      layout: 'Two-column with sidebar, responsive grid',
      components: ['Header with Photo', 'Bio Card', 'Contact Sidebar', 'Map Integration', 'Social Links'],
      features: ['Profile photo', 'Full contact info', 'Interactive map', 'Office hours', 'Social media'],
      restrictions: ['No testimonials', 'No gallery', 'No video', 'No custom sections']
    },
    PremierProfile: {
      layout: 'Hero section + tabbed content + sticky sidebar',
      components: ['Hero Banner', 'Tabbed Interface', 'Gallery Lightbox', 'Testimonials', 'FAQ Accordion', 'Events Calendar'],
      features: ['All features unlocked', 'Rich media', 'Custom sections', 'Advanced interactions'],
      restrictions: ['None - full feature access']
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Provider Profile Style Guide
          </h1>
          <p className="text-gray-600">
            Comprehensive design system for tier-based provider profiles
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="design-tokens">Design Tokens</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="responsive">Responsive</TabsTrigger>
            <TabsTrigger value="seo">SEO & Schema</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(componentSpecs).map(([component, specs]) => (
                <Card key={component}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {component.replace('Profile', ' Profile')}
                      <Badge variant={
                        component === 'FreeProfile' ? 'secondary' :
                        component === 'PreferredProfile' ? 'default' : 'destructive'
                      }>
                        {component.replace('Profile', '')}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Layout</h4>
                      <p className="text-sm text-gray-600">{specs.layout}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Key Components</h4>
                      <div className="flex flex-wrap gap-1">
                        {specs.components.map((comp, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {comp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Features</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {specs.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="design-tokens" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Color Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Palette className="h-5 w-5 mr-2" />
                    Color Palette
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(designTokens.colors.primary).map(([tier, color]) => (
                    <div key={tier} className="flex items-center justify-between">
                      <span className="font-medium capitalize">{tier} Primary</span>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: color }}
                        />
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{color}</code>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Typography */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Type className="h-5 w-5 mr-2" />
                    Typography Scale
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(designTokens.typography).map(([type, classes]) => (
                    <div key={type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium capitalize">{type.replace('_', ' ')}</span>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{classes}</code>
                      </div>
                      {typeof classes === 'string' && (
                        <p className={classes}>Sample {type} text</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Component Examples */}
              <Card>
                <CardHeader>
                  <CardTitle>Tier Badges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    Free Member
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    Preferred Provider
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800">
                    <Award className="h-3 w-3 mr-1" />
                    Premier Provider
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status Indicators</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Accepting New Patients</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-500">Not Accepting</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rating Display</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">4.8</span>
                    <span className="text-sm text-gray-600">(127 reviews)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="responsive" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Smartphone className="h-5 w-5 mr-2" />
                    Mobile (320px+)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Single column layout</li>
                    <li>• Stacked navigation</li>
                    <li>• Touch-optimized buttons</li>
                    <li>• Collapsible sections</li>
                    <li>• Swipeable galleries</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tablet className="h-5 w-5 mr-2" />
                    Tablet (768px+)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Two-column layout</li>
                    <li>• Horizontal navigation</li>
                    <li>• Grid-based galleries</li>
                    <li>• Expanded content areas</li>
                    <li>• Side-by-side comparisons</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Monitor className="h-5 w-5 mr-2" />
                    Desktop (1024px+)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-2">
                    <li>• Multi-column layouts</li>
                    <li>• Sticky sidebars</li>
                    <li>• Hover interactions</li>
                    <li>• Advanced animations</li>
                    <li>• Full-width hero sections</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Schema.org Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Physician Schema</h4>
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Alexander Thompson",
  "jobTitle": "Physical Therapist",
  "worksFor": {
    "@type": "MedicalOrganization",
    "name": "Thompson Advanced Physical Therapy Institute"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1500 Medical Center Drive",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98101"
  },
  "telephone": "(206) 555-0199",
  "url": "https://thompsonptinstitute.com"
}`}
                    </pre>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">LocalBusiness Schema</h4>
                    <pre className="text-xs text-gray-700 overflow-x-auto">
{`{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Thompson Advanced Physical Therapy Institute",
  "image": "https://example.com/clinic-photo.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1500 Medical Center Drive",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98101"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.6062,
    "longitude": -122.3321
  },
  "telephone": "(206) 555-0199",
  "openingHours": ["Mo-Fr 07:00-19:00", "Sa 08:00-16:00"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileStyleGuide;