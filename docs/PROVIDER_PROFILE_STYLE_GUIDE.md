# Provider Profile Style Guide

## Overview

This document outlines the design system, components, and styling used across the three provider profile tiers: Free, Preferred, and Premier. Each tier is designed to reflect its value proposition while maintaining consistency in user experience.

## Design Principles

### 1. Progressive Enhancement
- **Free**: Clean, minimal, professional
- **Preferred**: Enhanced with visual elements and trust signals
- **Premier**: Rich, immersive, conversion-focused

### 2. Visual Hierarchy
- Clear information architecture
- Consistent typography scale
- Strategic use of color and spacing
- Progressive disclosure of information

### 3. Mobile-First Responsive Design
- All profiles are fully responsive
- Touch-friendly interactions
- Optimized for various screen sizes

## Color Palette

### Primary Colors
- **Blue**: `#2563eb` (Primary actions, links)
- **Purple**: `#7c3aed` (Premier tier accent)
- **Gray**: `#374151` (Text primary)
- **Gray Light**: `#6b7280` (Text secondary)

### Tier-Specific Colors
- **Free**: Gray tones (`#6b7280`, `#9ca3af`)
- **Preferred**: Blue tones (`#2563eb`, `#3b82f6`)
- **Premier**: Purple-Blue gradient (`#7c3aed` to `#2563eb`)

### Status Colors
- **Success**: `#10b981` (Available, verified)
- **Warning**: `#f59e0b` (Pending, limited)
- **Error**: `#ef4444` (Unavailable, issues)

## Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Scale
- **Heading 1**: `text-4xl` (36px) - Profile names (Premier)
- **Heading 2**: `text-3xl` (30px) - Profile names (Preferred)
- **Heading 3**: `text-2xl` (24px) - Profile names (Free)
- **Heading 4**: `text-xl` (20px) - Section titles
- **Body Large**: `text-lg` (18px) - Important content
- **Body**: `text-base` (16px) - Standard content
- **Small**: `text-sm` (14px) - Secondary information
- **Extra Small**: `text-xs` (12px) - Labels, metadata

## Component Library

### 1. Profile Headers

#### Free Tier Header
```tsx
<div className="text-center mb-8">
  <h1 className="text-3xl font-bold text-gray-900 mb-2">
    {provider.provider_name}
  </h1>
  <p className="text-lg text-gray-600 mb-3">
    {provider.credentials}
  </p>
  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
    <Shield className="h-4 w-4 mr-1" />
    {provider.tier_badge}
  </Badge>
</div>
```

#### Preferred Tier Header
```tsx
<Card className="mb-8 overflow-hidden">
  <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32"></div>
  <CardContent className="relative pt-0 pb-6">
    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 md:-mt-12">
      <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
        {/* Avatar content */}
      </Avatar>
      {/* Profile info */}
    </div>
  </CardContent>
</Card>
```

#### Premier Tier Header
```tsx
<div className="relative">
  <div className="h-80 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
    {/* Hero background */}
  </div>
  <div className="relative max-w-7xl mx-auto px-6">
    <div className="flex flex-col lg:flex-row items-end gap-8 -mt-32">
      <Avatar className="h-40 w-40 border-6 border-white shadow-2xl">
        {/* Avatar content */}
      </Avatar>
      {/* Profile content in white card */}
    </div>
  </div>
</div>
```

### 2. Information Cards

#### Standard Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Section Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

#### Highlighted Card (Premier)
```tsx
<Card className="border-l-4 border-blue-500">
  <CardContent className="p-4">
    {/* Content */}
  </CardContent>
</Card>
```

### 3. Status Indicators

#### Availability Status
```tsx
<div className="flex items-center gap-3">
  {provider.accepting_new_patients ? (
    <CheckCircle className="h-5 w-5 text-green-500" />
  ) : (
    <XCircle className="h-5 w-5 text-red-500" />
  )}
  <span className="text-sm text-gray-700">
    {provider.accepting_new_patients ? 'Accepting New Patients' : 'Not Accepting New Patients'}
  </span>
</div>
```

#### Rating Display
```tsx
const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`h-4 w-4 ${
        i < Math.floor(rating) 
          ? 'text-yellow-400 fill-current' 
          : 'text-gray-300'
      }`}
    />
  ));
};
```

### 4. Badges and Tags

#### Tier Badges
```tsx
// Free
<Badge variant="secondary" className="bg-blue-100 text-blue-800">
  <Shield className="h-4 w-4 mr-1" />
  Verified Provider
</Badge>

// Preferred
<Badge className="bg-blue-100 text-blue-800">
  <Shield className="h-4 w-4 mr-1" />
  Preferred Provider
</Badge>

// Premier
<Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2">
  <Award className="h-4 w-4 mr-2" />
  Premier Provider
</Badge>
```

#### Specialty Tags
```tsx
<Badge variant="secondary">{specialty}</Badge>
<Badge variant="outline">{condition}</Badge>
```

## Layout Patterns

### Free Tier Layout
- Single column, centered content
- Maximum width: `max-w-2xl`
- Simple card-based sections
- Minimal visual hierarchy

### Preferred Tier Layout
- Two-column layout on desktop
- Main content area with sidebar
- Enhanced visual elements
- Card-based organization

### Premier Tier Layout
- Complex multi-section layout
- Tabbed interface for content organization
- Hero section with background imagery
- Sidebar with contact form and key information
- Full-width sections for rich content

## Responsive Breakpoints

```css
/* Mobile First */
.container {
  @apply px-4;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    @apply px-6;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    @apply px-8;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .container {
    @apply px-12;
  }
}
```

## Animation Guidelines

### Micro-interactions
- Hover states: `transition-colors duration-200`
- Scale effects: `hover:scale-105 transition-transform duration-300`
- Fade-ins: `opacity-0 animate-in fade-in duration-500`

### Page Transitions
- Use Framer Motion for complex animations
- Keep animations subtle and purposeful
- Respect user preferences for reduced motion

## Accessibility Standards

### Color Contrast
- All text meets WCAG AA standards (4.5:1 ratio)
- Interactive elements have sufficient contrast
- Color is not the only way to convey information

### Keyboard Navigation
- All interactive elements are keyboard accessible
- Focus indicators are clearly visible
- Logical tab order throughout the interface

### Screen Readers
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for all images
- ARIA labels where appropriate

## Performance Considerations

### Image Optimization
- Use WebP format when possible
- Implement lazy loading for gallery images
- Provide appropriate alt text
- Use responsive image sizing

### Code Splitting
- Lazy load tier-specific components
- Split vendor bundles appropriately
- Minimize initial bundle size

## SEO Implementation

### Schema.org Markup
```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. Sarah Johnson",
  "specialty": "Physical Therapy",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Medical Plaza",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "78701"
  },
  "telephone": "(512) 555-0123",
  "url": "https://example.com/provider/dr-sarah-johnson"
}
```

### Meta Tags
- Unique title tags for each profile
- Descriptive meta descriptions
- Open Graph tags for social sharing
- Canonical URLs to prevent duplicate content

## Testing Guidelines

### Cross-browser Testing
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)
- Test on various screen sizes

### Performance Testing
- Lighthouse scores > 90
- Core Web Vitals optimization
- Image loading performance

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation testing
- Color contrast validation

## Maintenance

### Code Organization
- Keep components small and focused
- Use consistent naming conventions
- Document complex logic
- Regular dependency updates

### Content Management
- Validate data integrity
- Handle missing or incomplete data gracefully
- Provide fallbacks for optional content
- Regular content audits