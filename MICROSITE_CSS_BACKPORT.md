# Microsite CSS Backport Analysis

This document tracks CSS design changes made across microsites that should be backwards-mapped into the base Integral Themes system.

**Analysis Date:** February 17, 2026
**Analyzed By:** Claude (automated analysis)

---

## Overview

Three microsite repositories were analyzed to identify CSS patterns, components, and design tokens that have been customized and should be incorporated into the base theme for reuse across all microsites.

### Repository Status

| Repository | Structure | Override File | Status |
|------------|-----------|---------------|--------|
| **Playground** | Vendor theme + overrides | `src/css/site.css` | No custom CSS (empty) |
| **Growth Strategies** | Vendor theme + overrides | `src/css/styles.css` | Comprehensive overrides |
| **Career Pathways** | Standalone CSS | `src/css/styles.css` | Complete custom implementation |

---

## Components to Add to Base Theme

### 1. Timeline Component
**Source:** Growth Strategies
**Location:** `src/css/styles.css` lines 14-113
**Priority:** High

```css
/* Timeline container with 3-column grid layout */
.timeline
.timeline-item
.timeline-marker (80px circular numbered badge)
.timeline-content
.timeline-icon-wrapper
```

**Features:**
- 3-column grid: 80px marker, 1fr content, 100px optional icon
- Connecting lines between markers using `::after` pseudo-elements
- Responsive: collapses to 2-column on mobile with 60px markers
- Numbered circular badges with plum background

**Use Cases:** Process flows, step-by-step guides, project timelines

---

### 2. Outcomes Block Component
**Source:** Growth Strategies
**Location:** `src/css/styles.css` lines 119-173
**Priority:** High

```css
.outcomes-block (max-width 650px container)
.outcomes-block ul li (centered list with checkmarks)
```

**Features:**
- Centered outcome lists with custom checkmark icons
- 40px circular checkmark badges with plum background
- Replaces bullet points with checkmark styling

**Use Cases:** Short outcome lists, success indicators, key results sections

---

### 3. Outcomes Grid (Brick Masonry)
**Source:** Growth Strategies
**Location:** `src/css/styles.css` lines 179-293
**Priority:** High

```css
.outcomes-grid (6-column grid with staggered layout)
```

**Features:**
- Complex grid spanning pattern creating brick masonry effect
- Alternating 2-column items for visual interest
- Custom checkmark styling for list items
- Responsive: collapses to single column on mobile

**Issues to Fix:**
⚠️ **CSS Syntax Error** at lines 247-266: Missing closing brace for `.outcomes-grid ul li:hover` rule

**Use Cases:** Feature grids, outcome displays, benefit lists

---

### 4. Case Study Image Component
**Source:** Career Pathways
**Location:** `src/css/styles.css` lines 720-735
**Priority:** High

```css
.case-study-image (70% width, responsive)
```

**Features:**
- Tertiary background with rounded corners and padding
- Shadow effects with hover elevation
- Constrained to 70% width for optimal display
- Left-aligned with text blocks

**Use Cases:** Case study pages, project showcases, portfolio items

---

### 5. Hero Compact Variant
**Source:** Career Pathways
**Location:** `src/css/styles.css` lines 738-741
**Priority:** Medium

```css
.hero-compact (50vh min-height vs standard 85vh)
```

**Features:**
- Reduced vertical height for pages that don't need full-screen heroes
- Maintains all standard hero styling
- Padding-top: 100px for navbar clearance

**Use Cases:** Internal pages, case studies, resource pages

---

### 6. Case Study Navigation Component
**Source:** Career Pathways
**Location:** `src/css/styles.css` lines 751-806
**Priority:** High

```css
.case-study-nav (grid container)
.case-study-thumb (thumbnail card with link)
```

**Features:**
- Auto-fit grid with minmax(250px, 1fr)
- 8px borders: gray default, primary color on hover
- Image thumbnails with object-fit: contain
- Hover effects: shadow elevation, border color change, translateY lift
- Heading color changes to primary on hover

**Use Cases:** Case study indexes, portfolio grids, project galleries

---

## Design Token Refinements

### Border Thickness Standardization
**Sources:** Growth Strategies, Career Pathways
**Priority:** Medium

**Proposed Change:**
- Reduce card borders from `2px solid` to `1px solid`
- Affects: `.card`, `.service-card`, `.process-card`, `.faq-item`

**Rationale:** Lighter borders create more modern, refined appearance

---

### Text Color Contrast
**Sources:** Growth Strategies, Career Pathways
**Priority:** Medium

**Current Base Theme:**
```css
--text-primary: #000000;
--border-light: #ebebeb;
```

**Proposed Change:**
```css
--text-primary: #2d2d2d;
--border-light: #e8e8e8;
```

**Rationale:** Softer black improves readability, slightly darker border provides better definition

---

### Border Radius Standardization
**Sources:** Growth Strategies, Career Pathways
**Priority:** Low

**Current Base Theme:**
```css
--radius-md: 1rem;
--radius-lg: 1.5rem;
```

**Proposed Change:**
```css
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
```

**Rationale:** Tighter radii create more modern, less rounded appearance

---

## Utility Classes to Add

### Constrained Title
**Source:** Career Pathways
**Priority:** Low

```css
.constrained-title {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
```

**Use Cases:** Aligning page titles with content blocks

---

## Minor Component Refinements

### Trust Strip Spacing
**Source:** Growth Strategies
**Priority:** Low

**Change:** Reduce gap from `--spacing-lg` to `--spacing-md`
**Benefit:** Tighter, more compact layout option

---

## Issues and Recommendations

### 1. CSS Syntax Error in Growth Strategies
**File:** `src/css/styles.css` lines 247-266
**Issue:** Missing closing brace for `.outcomes-grid ul li:hover`
**Action:** Fix before implementation in base theme

### 2. Token Duplication
**Issue:** Both Growth Strategies and Career Pathways define complete token sets
**Recommendation:** Refactor to use `vendor/integralthemes/theme/tokens.css` instead
**Benefit:** Improves maintainability and consistency

### 3. Hardcoded Color Values
**Issue:** Some components use hardcoded `#600b68` instead of `var(--primary)`
**Recommendation:** Replace all hardcoded colors with CSS variables
**Benefit:** Enables theme customization and brand variations

### 4. Career Pathways Migration
**Issue:** Career Pathways uses standalone CSS without vendor theme
**Recommendation:** Migrate to vendor theme structure once base theme is updated
**Benefit:** Reduces duplication, ensures consistency with other microsites

---

## Implementation Checklist

### Phase 1: New Components (High Priority)
- [ ] Add Timeline component to `theme/components.css`
- [ ] Add Outcomes Block component to `theme/components.css`
- [ ] Add Outcomes Grid component to `theme/components.css` (with syntax fix)
- [ ] Add Case Study Image component to `theme/components.css`
- [ ] Add Hero Compact variant to `theme/components.css`
- [ ] Add Case Study Navigation component to `theme/components.css`

### Phase 2: Design Token Updates (Medium Priority)
- [ ] Consider border thickness reduction (1px vs 2px)
- [ ] Evaluate text color softening (#2d2d2d vs #000000)
- [ ] Review border radius reduction proposals
- [ ] Update tokens.css with any approved changes

### Phase 3: Utilities and Refinements (Low Priority)
- [ ] Add `.constrained-title` utility class
- [ ] Add `.trust-strip--compact` modifier variant
- [ ] Document new component usage in theme README

### Phase 4: Cleanup
- [ ] Fix syntax errors in source files
- [ ] Replace hardcoded colors with CSS variables
- [ ] Migrate Career Pathways to vendor theme structure
- [ ] Refactor Growth Strategies to remove token duplication

---

## File Paths Reference

### Base Theme
- `/Users/david/Active Repositories/integralthemes/theme/`
  - `tokens.css` - Design tokens
  - `base.css` - Base styles
  - `components.css` - Reusable components
  - `layout.css` - Layout utilities
  - `theme.css` - Main import file

### Microsites
- **Playground:** `/Users/david/Active Repositories/integralthemesplayground/src/css/site.css`
- **Growth Strategies:** `/Users/david/Active Repositories/integralgrowthstrategies/src/css/styles.css`
- **Career Pathways:** `/Users/david/Active Repositories/integralcareerpathways/src/css/styles.css`

---

## Notes

- This analysis was performed on repositories as of February 17, 2026
- All line number references are based on current file state
- Priority levels are recommendations and can be adjusted based on team needs
- Some components may require testing across different browsers and devices before integration

---

**Next Steps:**
1. Review this analysis with the design team
2. Prioritize which components to implement first
3. Create feature branch in integralthemes repo
4. Implement components with proper documentation
5. Test across all microsites
6. Deploy updated theme via GitHub Actions automation
