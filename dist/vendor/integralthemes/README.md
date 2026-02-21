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
**Timeline**: `.timeline`, `.timeline-item`, `.timeline-marker`, `.timeline-content`
**Outcomes**: `.outcomes-full` (centered list with checkmarks)
**Photo Background**: `.photo-background-section` (full-width section with custom background)
**Utilities**: `.text-center`, `.mt-1`, `.mb-2`, etc.

#### Timeline Component

A vertical timeline with numbered markers and optional icons. Perfect for process flows, step-by-step guides, or project milestones.

**HTML Structure:**
```html
<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-marker">1</div>
    <div class="timeline-content">
      <h3>Discovery Phase</h3>
      <p>Understanding your goals and requirements through stakeholder interviews.</p>
    </div>
    <div class="timeline-icon-wrapper">
      <img src="/path/to/icon.svg" alt="Discovery" class="timeline-icon">
    </div>
  </div>
  <!-- More timeline-items... -->
</div>
```

**Features:**
- 3-column grid layout (marker, content, optional icon)
- Numbered circular markers with connecting lines (140px desktop, 180px mobile)
- Uses `--primary` color variable for theming
- Responsive: Collapses to 2-column on mobile, hides icons
- Connecting lines automatically adjust for last item

#### Outcomes Full Component

Centered outcomes list with circular checkmark badges. Alternative to grid layouts when you want a focused, vertical presentation.

**HTML Structure:**
```html
<section class="section" id="outcomes">
  <div class="container">
    <div class="outcomes-full">
      <h2>What You'll Achieve</h2>
      <ul class="service-list">
        <li>Clear strategic roadmap aligned to your goals</li>
        <li>Measurable KPIs tied to business outcomes</li>
        <li>Implementation-ready plans with timelines</li>
      </ul>
    </div>
  </div>
</section>
```

**Features:**
- Max-width 900px, centered layout
- Circular checkmark badges (40px) above each item
- Uses `--primary` color for checkmarks
- Font size 1.125rem, weight 500 for emphasis
- Works with `.service-list` or plain `<ul>`

#### Photo Background Section

Full-width section with custom background image overlay. Ideal for hero-style call-to-action sections or problem statements.

**HTML Structure:**
```html
<section class="photo-background-section">
  <div class="container">
    <div class="content">
      <h2>Your Challenge, Our Solution</h2>
      <p>We help organizations navigate complex growth challenges with data-driven strategies.</p>
    </div>
  </div>
</section>
```

**CSS Customization:**
```css
/* In your site.css, set the background image */
:root {
  --photo-bg-image: url('../assets/your-background.png');
}

/* Or target specific section */
.photo-background-section {
  background-image: url('../assets/your-background.png');
}
```

**Features:**
- Uses CSS variable `--photo-bg-image` for easy customization
- Background covers full width with `top right` positioning
- Content constrained to 600px max-width for readability
- White text overlay (ensure background image has sufficient contrast)
- Responsive: Full-width content on mobile

---

## Component Template Library

Copy-paste ready HTML templates for all available components. Replace placeholder content with your own.

### Navigation

```html
<nav class="navbar" id="navbar">
  <div class="container nav-container">
    <a href="index.html" class="nav-logo">Your Brand Name</a>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul class="nav-links" id="nav-links">
      <li><a href="#home" class="nav-link">Home</a></li>
      <li><a href="#services" class="nav-link">Services</a></li>
      <li><a href="#about" class="nav-link">About</a></li>
      <li><a href="#contact" class="nav-link">Contact</a></li>
    </ul>
  </div>
</nav>
```

### Hero Section (Standard)

```html
<section class="hero" id="home">
  <div class="container">
    <div class="hero-content">
      <h1>Your Main Headline</h1>
      <h2>Optional secondary tagline for additional context</h2>
      <p class="hero-subtitle">
        Supporting description that explains your value proposition in 1-2 sentences.
      </p>
      <div class="hero-buttons">
        <a href="#contact" class="btn btn-primary">Get Started</a>
        <a href="#services" class="btn btn-secondary">Learn More</a>
      </div>
    </div>
  </div>
</section>
```

### Service Cards Grid

```html
<section class="section" id="services">
  <div class="container">
    <div class="service-content">
      <h2 class="text-center">Our Services</h2>

      <div class="service-cards">
        <!-- Card 1 -->
        <div class="service-card">
          <img src="/vendor/integralthemes/assets/icons/launch.svg" alt="Service 1" class="service-icon" role="img">
          <h3>Service Name</h3>
          <ul class="service-list">
            <li>Brief service description or tagline</li>
            <li>Key feature or benefit one</li>
            <li>Key feature or benefit two</li>
            <li>Key feature or benefit three</li>
          </ul>
        </div>

        <!-- Card 2 -->
        <div class="service-card">
          <img src="/vendor/integralthemes/assets/icons/design.svg" alt="Service 2" class="service-icon" role="img">
          <h3>Another Service</h3>
          <ul class="service-list">
            <li>Brief service description or tagline</li>
            <li>Key feature or benefit one</li>
            <li>Key feature or benefit two</li>
            <li>Key feature or benefit three</li>
          </ul>
        </div>

        <!-- Add more cards as needed -->
      </div>
    </div>
  </div>
</section>
```

### Process Cards (How We Work)

```html
<section class="section section-alt" id="process">
  <div class="container">
    <div class="service-content">
      <h2 class="text-center">How We Work</h2>

      <div class="process-cards">
        <!-- Step 1 -->
        <div class="process-card">
          <div class="card-number">1</div>
          <img src="/vendor/integralthemes/assets/icons/discuss.svg" alt="Discovery" class="process-icon" role="img">
          <h4 class="card-title">Discovery</h4>
          <p class="card-description">We start by understanding your goals and challenges through collaborative discussion.</p>
        </div>

        <!-- Step 2 -->
        <div class="process-card">
          <div class="card-number">2</div>
          <img src="/vendor/integralthemes/assets/icons/define.svg" alt="Define" class="process-icon" role="img">
          <h4 class="card-title">Define</h4>
          <p class="card-description">Together we define clear objectives and success criteria.</p>
        </div>

        <!-- Add more steps (design, build, launch, tune) -->
      </div>
    </div>
  </div>
</section>
```

### Timeline

```html
<section class="section">
  <div class="container">
    <h2 class="text-center">Our Process</h2>

    <div class="timeline">
      <!-- Step 1 -->
      <div class="timeline-item">
        <div class="timeline-marker">1</div>
        <div class="timeline-content">
          <h3>Discovery Phase</h3>
          <p>Understanding your goals and requirements through stakeholder interviews and research.</p>
        </div>
        <div class="timeline-icon-wrapper">
          <img src="/path/to/icon.svg" alt="Discovery" class="timeline-icon">
        </div>
      </div>

      <!-- Step 2 -->
      <div class="timeline-item">
        <div class="timeline-marker">2</div>
        <div class="timeline-content">
          <h3>Planning Phase</h3>
          <p>Creating detailed roadmaps and timelines aligned to your business objectives.</p>
        </div>
        <div class="timeline-icon-wrapper">
          <img src="/path/to/icon.svg" alt="Planning" class="timeline-icon">
        </div>
      </div>

      <!-- Add more timeline items -->
    </div>
  </div>
</section>
```

### Outcomes Full (Centered List with Checkmarks)

```html
<section class="section" id="outcomes">
  <div class="container">
    <div class="outcomes-full">
      <h2>What You'll Achieve</h2>
      <ul class="service-list">
        <li>Clear strategic roadmap aligned to your goals</li>
        <li>Measurable KPIs tied to business outcomes</li>
        <li>Implementation-ready plans with timelines</li>
        <li>Ongoing support and optimization</li>
        <li>Results you can measure and scale</li>
      </ul>
    </div>
  </div>
</section>
```

### Photo Background Section

```html
<section class="photo-background-section">
  <div class="container">
    <div class="content">
      <h2>Your Challenge, Our Solution</h2>
      <p>We help organizations navigate complex growth challenges with data-driven strategies and proven methodologies.</p>
    </div>
  </div>
</section>
```

**Add to your site.css:**
```css
:root {
  --photo-bg-image: url('../assets/your-background.png');
}
```

### Trust Strip

```html
<section class="section section-compact section-alt">
  <div class="container">
    <div class="trust-strip">
      <span>Trusted by 100+ organizations</span>
      <span>•</span>
      <span>10+ years experience</span>
      <span>•</span>
      <span>$50M+ in client results</span>
    </div>
  </div>
</section>
```

### Content Section (Text + Paragraph)

```html
<section class="section">
  <div class="container">
    <div class="service-content text-center">
      <h2>About Our Approach</h2>
      <p>We believe that great work starts with deep understanding. Our team combines strategic thinking with practical execution to deliver results that matter.</p>
      <p>With over a decade of experience, we've helped organizations across industries achieve their most ambitious goals.</p>
    </div>
  </div>
</section>
```

### FAQ Section

```html
<section class="section">
  <div class="container">
    <div class="service-content">
      <h2 class="text-center">Frequently Asked Questions</h2>

      <div class="mt-3">
        <div class="faq-item">
          <h4 class="faq-question">What services do you offer?</h4>
          <p>We provide comprehensive strategy consulting, implementation support, and ongoing optimization across digital channels.</p>
        </div>

        <div class="faq-item">
          <h4 class="faq-question">How long does a typical project take?</h4>
          <p>Most engagements range from 8-12 weeks, though timelines vary based on scope and complexity.</p>
        </div>

        <div class="faq-item">
          <h4 class="faq-question">Do you work with small businesses?</h4>
          <p>Yes, we work with organizations of all sizes, from startups to enterprise companies.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

### CTA Section

```html
<section class="section section-alt" id="contact">
  <div class="container">
    <div class="service-content text-center">
      <h2>Ready to Get Started?</h2>
      <p class="mb-3">Let's discuss how we can help you achieve your goals. Schedule a free consultation today.</p>
      <div class="hero-buttons">
        <a href="/contact.html" class="btn btn-primary">Book a Call</a>
        <a href="mailto:info@example.com" class="btn btn-secondary">Send Email</a>
      </div>
    </div>
  </div>
</section>
```

### Footer

```html
<footer class="footer">
  <div class="container footer-content">
    <p class="footer-text">
      © 2026 Your Company Name. All rights reserved.
      <a href="/privacy.html">Privacy Policy</a>
    </p>
  </div>
</footer>
```

### Layout Utilities

**Section Backgrounds:**
- `.section` - Standard white background with spacing
- `.section-alt` - Alternate gray background (#fafafa)
- `.section-compact` - Reduced padding for tighter sections

**Text Alignment:**
- `.text-center` - Center-align text
- `.text-primary` - Primary text color
- `.text-secondary` - Secondary (lighter) text color

**Spacing Utilities:**
- `.mt-1`, `.mt-2`, `.mt-3` - Margin top (small, medium, large)
- `.mb-1`, `.mb-2`, `.mb-3` - Margin bottom (small, medium, large)

**Example Usage:**
```html
<section class="section section-alt">
  <div class="container">
    <div class="service-content text-center">
      <h2 class="mb-3">Centered Headline with Bottom Margin</h2>
      <p>Your content here...</p>
    </div>
  </div>
</section>
```

---

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
