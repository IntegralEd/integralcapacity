# Integral Themes

A pure shared theme repository providing CSS design tokens, base styles, layouts, and reusable components for Integral Ed microsites.

## What This Is

This repository contains **only shared theme assets**:
- Design tokens (colors, spacing, typography, shadows)
- Base styles (reset, typography, links)
- Layout utilities (containers, sections, spacing)
- UI components (buttons, cards, navigation, hero, footer, etc.)
- Brand assets (logos, favicons)
- UI icons

## What This Is NOT

This is **not a standalone deployable site**. It contains no:
- HTML pages or page templates
- Build tooling (package.json, build scripts)
- Deployment configuration (netlify.toml)
- Site content (copy, images, case studies)
- Analytics, forms, or third-party integrations
- SEO files (sitemap.xml, robots.txt)

## How Microsites Consume This Theme

### Installation

Vendor this theme into your microsite using git subtree or submodule.

**Recommended: Git Subtree**

```bash
# From your microsite repository root
git subtree add --prefix vendor/integralthemes https://github.com/IntegralEd/integralthemes.git main --squash
```

**Alternative: Git Submodule**

```bash
# From your microsite repository root
git submodule add https://github.com/IntegralEd/integralthemes.git vendor/integralthemes
```

### Usage in Your Microsite

**1. Import the theme CSS in your HTML:**

```html
<head>
  <!-- Import the theme -->
  <link rel="stylesheet" href="/vendor/integralthemes/theme/theme.css">

  <!-- Your site-specific styles -->
  <link rel="stylesheet" href="/css/site.css">
</head>
```

**2. Reference brand assets:**

```html
<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32"
      href="/vendor/integralthemes/assets/brand/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16"
      href="/vendor/integralthemes/assets/brand/favicon-16x16.png">
<link rel="apple-touch-icon"
      href="/vendor/integralthemes/assets/brand/apple-touch-icon.png">

<!-- Logo -->
<img src="/vendor/integralthemes/assets/brand/logo.png" alt="Integral Ed">
```

**3. Use icons in your markup:**

```html
<img src="/vendor/integralthemes/assets/icons/launch.svg" alt="Launch" class="service-icon">
```

### Overriding Theme Styles

Create a `site.css` file in your microsite and load it **after** `theme.css`. Override CSS variables to customize the theme:

```css
/* /css/site.css */

:root {
  /* Override color tokens */
  --primary: #8b0a9e;
  --primary-dark: #6b0878;

  /* Override spacing if needed */
  --spacing-xl: 4rem;

  /* Add site-specific tokens */
  --site-accent: #ff6b35;
}

/* Override or extend components */
.btn-tertiary {
  background: var(--site-accent);
  color: white;
}
```

## What Belongs in Theme vs Microsite

### ✅ Theme (this repo)

- **Tokens**: Colors, spacing, typography scales, shadows, transitions
- **Base styles**: Reset, body, headings, links, focus states
- **Shared components**: Buttons, cards, navigation, hero, footer, forms
- **Shared brand assets**: Logo, favicons
- **UI icons**: Reusable SVG icons used in components

### 🚫 Microsite (your site repo)

- **Page content**: HTML pages, copy, headlines, body text
- **Content images**: Hero images, case study photos, illustrations, team photos
- **Site-specific config**: Analytics tags, form integrations (Web3Forms keys)
- **SEO files**: sitemap.xml, robots.txt, meta descriptions
- **Build system**: package.json, build scripts, dev servers
- **Deployment config**: netlify.toml, vercel.json, etc.
- **Site-specific styles**: Custom components, page-specific layouts, overrides

## Update Workflow

When the theme is updated, pull changes into your microsite:

### With Git Subtree

```bash
# From your microsite repository root
git subtree pull --prefix vendor/integralthemes https://github.com/IntegralEd/integralthemes.git main --squash
```

### With Git Submodule

```bash
# From your microsite repository root
cd vendor/integralthemes
git pull origin main
cd ../..
git add vendor/integralthemes
git commit -m "Update integralthemes to latest"
```

### After Updating

1. Test your microsite locally to ensure compatibility
2. Check for any visual regressions
3. Redeploy your microsite

## Theme Structure

```
integralthemes/
├── theme/
│   ├── tokens.css       # Design tokens (colors, spacing, typography)
│   ├── base.css         # Reset and base element styles
│   ├── layout.css       # Containers, sections, utilities
│   ├── components.css   # UI components (buttons, cards, nav, etc.)
│   └── theme.css        # Main import file (use this)
├── assets/
│   ├── brand/           # Logos and favicons
│   └── icons/           # UI icons (SVG)
├── components/
│   └── widgets.html     # Universal chat widget (Chatbase)
└── README.md
```

## Component Reference

### CSS Components

The theme provides these ready-to-use CSS components:

**Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`
**Cards**: `.card`, `.service-card`, `.process-card`
**Navigation**: `.navbar`, `.nav-container`, `.nav-links`, `.nav-logo`
**Hero**: `.hero`, `.hero-content`, `.hero-subtitle`, `.hero-buttons`
**Footer**: `.footer`, `.footer-content`, `.footer-logo`
**Lists**: `.service-list`
**Content Wrappers**: `.service-content`, `.about-content`, `.contact-content`
**FAQ**: `.faq-item`, `.faq-question`
**Utilities**: `.text-center`, `.mt-1`, `.mb-2`, etc.

### JavaScript Widgets

#### Universal Chat Widget (Chatbase)

**Location:** `components/widgets.html`

A shared customer support chat widget that appears across all Integral Ed microsites.

**Features:**
- Loads after 10-second delay (avoids impacting page load performance)
- Appears bottom-right corner (Chatbase default position)
- Single shared Chatbase ID for unified conversation history
- Automatically captures URL and UTM parameters as context
- Context sent once per session (invisible to user)
- No per-site configuration needed

**Implementation in Microsites:**

Microsites should inject this widget at build time into the `<body>` of all HTML pages.

**Example build script integration:**
```javascript
// Read widget HTML
const widgetHtml = fs.readFileSync(
  'vendor/integralthemes/components/widgets.html',
  'utf8'
);

// Inject before closing </body> tag
const updatedHtml = htmlContent.replace(
  '</body>',
  `${widgetHtml}\n</body>`
);
```

**Technical Details:**
- **Chatbase ID**: `Yb5-ZOPsnSt9Ju6r3P7C7`
- **Domain**: `www.chatbase.co`
- **Load delay**: 10 seconds (10000ms)
- **Position**: Bottom-right (default)
- **Context capture**: URL, path, and UTM parameters (source, medium, campaign, term, content)
- **Context format**: `INTEGRAL_CONTEXT:{json}` sent as first message
- **Session tracking**: Uses `sessionStorage` to send context once per session
- **Identical across all sites**: No customization per microsite

### Selector Compatibility

All CSS selectors are preserved from the original implementation to maintain compatibility with existing microsite markup. No markup changes are required when adopting this theme.

## Legacy Constants

The following values use legacy constants rather than CSS variables:

- **Fixed spacing values** in media queries (e.g., `max-width: 768px`)
- **Transform values** in hover effects (e.g., `translateY(-1px)`)
- **Hamburger menu dimensions** (30px width, 21px height, 3px bar height)
- **Mobile nav positioning** (`right: -100%`, `width: 80%`)

These are preserved for visual consistency and avoiding unintended layout shifts.

## Support

For questions or issues with the theme:

- **Repository**: [github.com/IntegralEd/integralthemes](https://github.com/IntegralEd/integralthemes)
- **Organization**: [Integral Ed Services, LLC](https://www.integral-ed.com)
- **Email**: info@integral-ed.com

## License

© 2026 Integral Ed Services, LLC. All rights reserved.
