# Provider Profile Data Mapping Guide

## Overview
This document outlines how ACF (Advanced Custom Fields) data maps to the React components across all three provider profile tiers.

## Data Structure Mapping

### Core Provider Information
| ACF Field | Component Usage | Tiers Available |
|-----------|----------------|-----------------|
| `provider_name` | Main heading in all profiles | Free, Preferred, Premier |
| `practitioner_type` | Subtitle/profession display | Free, Preferred, Premier |
| `credentials` | Appended to practitioner type | Free, Preferred, Premier |
| `profile_photo` | Avatar component | Preferred, Premier |
| `provider_bio` | About section (length varies by tier) | Free (100 chars), Preferred (150 words), Premier (300+ words) |

### Location & Contact
| ACF Field | Component Usage | Tiers Available |
|-----------|----------------|-----------------|
| `clinic_name` | Business name display | Preferred, Premier |
| `clinic_street` | Full address display | Preferred, Premier |
| `clinic_city` | Location display | Free (city only), Preferred, Premier |
| `clinic_state` | Location display | Free, Preferred, Premier |
| `clinic_zip` | Full address display | Preferred, Premier |
| `clinic_phone` | Contact card, clickable tel: link | Preferred, Premier |
| `provider_email` | Contact card, clickable mailto: link | Preferred, Premier |
| `clinic_website_url` | External link button | Preferred, Premier |
| `location_map` | Interactive map component | Preferred, Premier |

### Professional Details
| ACF Field | Component Usage | Tiers Available |
|-----------|----------------|-----------------|
| `provider_accreditations` | Credentials list with checkmarks | Free, Preferred, Premier |
| `insurance_accepted` | Insurance grid with logos | Free (text only), Preferred, Premier |
| `specialties` | Badge components | Free, Preferred, Premier |
| `languages_spoken` | Language badges | Free, Preferred, Premier |

### Availability & Services
| ACF Field | Component Usage | Tiers Available |
|-----------|----------------|-----------------|
| `telehealth_available` | Status indicator with icon | Free, Preferred, Premier |
| `accepting_new_patients` | Status indicator with color coding | Free, Preferred, Premier |
| `office_hours` | Formatted hours table | Preferred, Premier |

### Social Media
| ACF Field | Component Usage | Tiers Available |
|-----------|----------------|-----------------|
| `social_media.facebook` | Social icon link | Preferred, Premier |
| `social_media.twitter` | Social icon link | Preferred, Premier |
| `social_media.linkedin` | Social icon link | Preferred, Premier |
| `social_media.instagram` | Social icon link | Preferred, Premier |

### Premier-Only Features
| ACF Field | Component Usage | Tiers Available |
|-----------|----------------|-----------------|
| `clinic_gallery` | Photo gallery with lightbox | Premier |
| `video_intro` | Embedded video player | Premier |
| `booking_url` | Primary CTA button | Premier |
| `avg_rating` | Star rating display | Premier |
| `testimonials` | Testimonial cards with ratings | Premier |
| `faqs` | Accordion FAQ component | Premier |
| `custom_sections` | Flexible content modules | Premier |
| `published_articles` | Article showcase cards | Premier |
| `upcoming_events` | Event promotion cards | Premier |

## Component Architecture

### Free Profile Components
```
FreeProfile
├── Header Card (name, credentials, location)
├── Status Card (availability indicators)
├── Specialties Card (badge grid)
├── Languages Card (badge grid)
└── Upgrade CTA Card
```

### Preferred Profile Components
```
PreferredProfile
├── Header Section (photo + info)
├── Main Content Area
│   ├── Bio Card
│   ├── Specialties Card
│   ├── Accreditations Card
│   ├── Insurance Card
│   └── Map Card
└── Sidebar
    ├── Contact Card
    ├── Office Hours Card
    ├── Languages Card
    ├── Social Media Card
    └── Upgrade CTA Card
```

### Premier Profile Components
```
PremierProfile
├── Hero Section (full-width banner)
├── CTA Bar (booking + contact)
├── Tabbed Content Area
│   ├── Overview Tab
│   │   ├── Video Introduction
│   │   ├── Extended Bio
│   │   ├── Specialties Grid
│   │   └── Accreditations
│   ├── Gallery Tab (lightbox grid)
│   ├── Testimonials Tab (rating cards)
│   ├── Articles Tab (article previews)
│   └── FAQ Tab (accordion)
└── Sticky Sidebar
    ├── Quick Contact
    ├── Office Hours
    ├── Upcoming Events
    ├── Insurance Grid
    ├── Languages
    └── Social Media
```

## Responsive Breakpoints

### Mobile First Approach
- **xs (320px+)**: Single column, stacked layout
- **sm (640px+)**: Improved spacing, larger touch targets
- **md (768px+)**: Two-column layout for Preferred/Premier
- **lg (1024px+)**: Full multi-column layouts
- **xl (1280px+)**: Maximum width containers, enhanced spacing

## SEO Implementation

### Schema.org Markup
Each profile includes structured data for:
- **Physician** schema for provider information
- **LocalBusiness** schema for clinic information
- **AggregateRating** schema for testimonials (Premier only)
- **Event** schema for upcoming events (Premier only)

### Meta Tags
Dynamic meta tags based on provider data:
- Title: "Dr. [Name] - [Specialty] in [City], [State]"
- Description: First 160 characters of provider bio
- Open Graph tags for social sharing
- Twitter Card markup

## Performance Considerations

### Image Optimization
- Profile photos: 400x400px, WebP format preferred
- Gallery images: 800x600px, lazy loading implemented
- Thumbnail generation for gallery previews

### Code Splitting
- Each tier profile loads only necessary components
- Lazy loading for Premier features (gallery, video)
- Progressive enhancement for advanced features

## Accessibility Features

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- Keyboard navigation support
- Color contrast ratios meet standards
- Screen reader friendly content

### Interactive Elements
- Focus indicators for all interactive elements
- ARIA labels for complex components
- Skip links for keyboard users
- Descriptive link text