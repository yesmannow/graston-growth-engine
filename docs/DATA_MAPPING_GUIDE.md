# Provider Profile Data Mapping Guide

## Overview

This document explains how the ACF (Advanced Custom Fields) data structure maps to the React components across all three provider profile tiers. Each field is categorized by tier availability and component usage.

## Data Structure Hierarchy

### Core Provider Information
**Available in all tiers**

| ACF Field | Component Usage | Free | Preferred | Premier |
|-----------|----------------|------|-----------|---------|
| `provider_name` | Profile header, page title | ✅ | ✅ | ✅ |
| `credentials` | Below name in header | ✅ | ✅ | ✅ |
| `practitioner_type` | Professional designation | ✅ | ✅ | ✅ |
| `tier` | Determines profile template | ✅ | ✅ | ✅ |
| `tier_badge` | Verification badge display | ✅ | ✅ | ✅ |

### Contact & Location Information
**Tier-based availability**

| ACF Field | Component Usage | Free | Preferred | Premier |
|-----------|----------------|------|-----------|---------|
| `clinic_city` | Location display | ✅ | ✅ | ✅ |
| `clinic_state` | Location display | ✅ | ✅ | ✅ |
| `clinic_name` | Contact card header | ❌ | ✅ | ✅ |
| `clinic_street` | Full address display | ❌ | ✅ | ✅ |
| `clinic_zip` | Full address display | ❌ | ✅ | ✅ |
| `clinic_phone` | Contact information | ❌ | ✅ | ✅ |
| `provider_email` | Contact information | ❌ | ✅ | ✅ |
| `clinic_website_url` | External link | ❌ | ✅ | ✅ |
| `location_map` | Interactive map component | ❌ | ✅ | ✅ |

### Profile Content
**Progressive enhancement by tier**

| ACF Field | Component Usage | Free | Preferred | Premier |
|-----------|----------------|------|-----------|---------|
| `profile_photo` | Avatar component | ❌ | ✅ | ✅ |
| `provider_bio` | About section | ❌ | ✅ (150 words) | ✅ (300+ words) |
| `specialties` | Specialty badges | ✅ | ✅ | ✅ |
| `conditions_treated` | Condition tags | ✅ | ✅ | ✅ |

### Trust Signals & Credentials
**Available across tiers with enhanced display**

| ACF Field | Component Usage | Free | Preferred | Premier |
|-----------|----------------|------|-----------|---------|
| `provider_accreditations` | Certification list | ✅ | ✅ | ✅ |
| `insurance_accepted` | Insurance list | ✅ | ✅ | ✅ (enhanced display) |
| `avg_rating` | Star rating display | ❌ | ✅ | ✅ |
| `total_reviews` | Review count | ❌ | ✅ | ✅ |

### Availability & Services
**Consistent across tiers**

| ACF Field | Component Usage | Free | Preferred | Premier |
|-----------|----------------|------|-----------|---------|
| `telehealth_available` | Availability status | ✅ | ✅ | ✅ |
| `accepting_new_patients` | Availability status | ✅ | ✅ | ✅ |
| `office_hours` | Hours display table | ❌ | ✅ | ✅ |

### Social Media Integration
**Preferred and Premier only**

| ACF Field | Component Usage | Free | Preferred | Premier |
|-----------|----------------|------|-----------|---------|
| `social_media.facebook` | Social media buttons | ❌ | ✅ | ✅ |
| `social_media.twitter` | Social media buttons | ❌ | ✅ | ✅ |
| `social_media.linkedin` | Social media buttons | ❌ | ✅ | ✅ |
| `social_media.instagram` | Social media buttons | ❌ | ✅ | ✅ |

### Premier-Exclusive Features
**Advanced content and functionality**

| ACF Field | Component Usage | Free | Preferred | Premier |
|-----------|----------------|------|-----------|---------|
| `clinic_gallery` | Photo gallery with lightbox | ❌ | ❌ | ✅ |
| `video_intro` | Embedded video player | ❌ | ❌ | ✅ |
| `testimonials` | Patient testimonial cards | ❌ | ❌ | ✅ |
| `faqs` | Interactive FAQ accordion | ❌ | ❌ | ✅ |
| `booking_url` | CTA button | ❌ | ❌ | ✅ |
| `published_articles` | Article showcase | ❌ | ❌ | ✅ |
| `upcoming_events` | Event promotion cards | ❌ | ❌ | ✅ |
| `community_activity` | Community engagement feed | ❌ | ❌ | ✅ |
| `custom_sections` | Flexible content modules | ❌ | ❌ | ✅ |

## Component Mapping Details

### Free Tier Components

#### FreeProfile.tsx
```typescript
interface FreeProfileProps {
  provider: {
    provider_name: string;
    credentials: string;
    practitioner_type: string;
    tier_badge: string;
    clinic_city: string;
    clinic_state: string;
    specialties: string[];
    conditions_treated: string[];
    provider_accreditations: string[];
    insurance_accepted: string[];
    telehealth_available: boolean;
    accepting_new_patients: boolean;
  };
}
```

**Data Flow:**
1. `provider_name` → Header title
2. `credentials` → Subtitle below name
3. `clinic_city`, `clinic_state` → Location card
4. `specialties` → Specialty badges
5. `provider_accreditations` → Certification list
6. Availability booleans → Status indicators

### Preferred Tier Components

#### PreferredProfile.tsx
```typescript
interface PreferredProfileProps {
  provider: FreeProfileProps['provider'] & {
    profile_photo?: string;
    clinic_name?: string;
    clinic_street?: string;
    clinic_zip?: string;
    clinic_phone?: string;
    provider_email?: string;
    clinic_website_url?: string;
    location_map?: { lat: number; lng: number };
    provider_bio?: string;
    office_hours?: OfficeHours[];
    avg_rating?: number;
    total_reviews?: number;
    social_media?: SocialMediaLinks;
  };
}
```

**Enhanced Data Flow:**
1. `profile_photo` → Avatar component with fallback
2. Contact fields → Contact information card
3. `provider_bio` → About section (150-word limit enforced)
4. `office_hours` → Structured hours table
5. Rating fields → Star rating display
6. `social_media` → Social media button array

### Premier Tier Components

#### PremierProfile.tsx
```typescript
interface PremierProfileProps {
  provider: PreferredProfileProps['provider'] & {
    clinic_gallery?: GalleryImage[];
    video_intro?: string;
    testimonials?: Testimonial[];
    faqs?: FAQ[];
    booking_url?: string;
    published_articles?: Article[];
    upcoming_events?: Event[];
    community_activity?: CommunityPost[];
    custom_sections?: CustomSection[];
  };
}
```

**Advanced Data Flow:**
1. `clinic_gallery` → Hero background + Gallery tab
2. `video_intro` → Embedded video component
3. `testimonials` → Testimonial cards with ratings
4. `faqs` → Accordion component
5. `booking_url` → Primary CTA button
6. `published_articles` → Article showcase cards
7. `upcoming_events` → Event promotion section
8. `community_activity` → Engagement feed
9. `custom_sections` → Flexible content modules

## Data Validation & Fallbacks

### Required Fields
All tiers require these minimum fields:
- `provider_name`
- `credentials`
- `practitioner_type`
- `tier`
- `clinic_city`
- `clinic_state`

### Optional Field Handling
```typescript
// Example: Safe handling of optional fields
const displayBio = provider.provider_bio || 'No biography provided.';
const displayRating = provider.avg_rating ? renderStars(provider.avg_rating) : null;
const displayGallery = provider.clinic_gallery?.length > 0 ? <Gallery /> : <EmptyState />;
```

### Tier-Specific Validation
```typescript
const validateTierData = (provider: ProviderProfile) => {
  switch (provider.tier) {
    case 'Free':
      return validateFreeFields(provider);
    case 'Preferred':
      return validatePreferredFields(provider);
    case 'Premier':
      return validatePremierFields(provider);
  }
};
```

## Content Length Limits

### Bio Field Restrictions
- **Free**: No bio displayed
- **Preferred**: 150 words maximum
- **Premier**: 300+ words recommended

### Implementation
```typescript
const truncateBio = (bio: string, tier: string) => {
  const limits = { Free: 0, Preferred: 150, Premier: Infinity };
  const wordLimit = limits[tier];
  const words = bio.split(' ');
  
  if (words.length <= wordLimit) return bio;
  return words.slice(0, wordLimit).join(' ') + '...';
};
```

## SEO Data Mapping

### Schema.org Implementation
```typescript
const generateProviderSchema = (provider: ProviderProfile) => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": provider.provider_name,
  "specialty": provider.specialties.join(', '),
  "address": {
    "@type": "PostalAddress",
    "streetAddress": provider.clinic_street,
    "addressLocality": provider.clinic_city,
    "addressRegion": provider.clinic_state,
    "postalCode": provider.clinic_zip
  },
  "telephone": provider.clinic_phone,
  "email": provider.provider_email,
  "url": provider.clinic_website_url,
  "aggregateRating": provider.avg_rating ? {
    "@type": "AggregateRating",
    "ratingValue": provider.avg_rating,
    "reviewCount": provider.total_reviews
  } : undefined
});
```

## Performance Considerations

### Lazy Loading Strategy
```typescript
// Premier tier components are code-split
const PremierProfile = lazy(() => import('./PremierProfile'));
const PreferredProfile = lazy(() => import('./PreferredProfile'));
const FreeProfile = lazy(() => import('./FreeProfile'));

// Gallery images are lazy-loaded
const LazyImage = ({ src, alt, ...props }) => (
  <img 
    src={src} 
    alt={alt} 
    loading="lazy"
    {...props}
  />
);
```

### Data Fetching Optimization
```typescript
// Only fetch tier-appropriate data
const fetchProviderData = async (providerId: string, tier: string) => {
  const baseFields = ['provider_name', 'credentials', 'tier'];
  const tierFields = {
    Free: [...baseFields, 'clinic_city', 'clinic_state'],
    Preferred: [...baseFields, 'profile_photo', 'clinic_phone', 'provider_bio'],
    Premier: [...baseFields, 'clinic_gallery', 'testimonials', 'faqs']
  };
  
  return await api.getProvider(providerId, { fields: tierFields[tier] });
};
```

## Error Handling

### Missing Data Graceful Degradation
```typescript
const SafeComponent = ({ data, fallback, children }) => {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return fallback || <EmptyState />;
  }
  return children;
};

// Usage
<SafeComponent 
  data={provider.testimonials} 
  fallback={<p>No testimonials available</p>}
>
  <TestimonialList testimonials={provider.testimonials} />
</SafeComponent>
```

### Type Safety
```typescript
// Ensure type safety across all tiers
type TierSpecificProvider<T extends 'Free' | 'Preferred' | 'Premier'> = 
  T extends 'Free' ? FreeProviderData :
  T extends 'Preferred' ? PreferredProviderData :
  T extends 'Premier' ? PremierProviderData :
  never;
```

This mapping ensures that each tier receives exactly the data it needs while maintaining type safety and performance optimization across the entire provider profile system.