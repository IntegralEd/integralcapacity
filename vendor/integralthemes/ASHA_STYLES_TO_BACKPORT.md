# Asha's Style Updates to Backport from Growth Strategies

**Date:** February 18, 2026
**Source Repository:** integralgrowthstrategies (commits 099e8aa..6cca6b2)
**Target Repository:** integralthemes

---

## New Components to Add

### 1. Outcomes Full Component
**Source:** `src/css/styles.css` lines 175-230
**Priority:** High
**Purpose:** Centered outcomes list with checkmark circles (alternative to outcomes-grid)

```css
.outcomes-full {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.outcomes-full h2 {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.outcomes-full ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
}

.outcomes-full ul li {
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
  display: block;
  text-align: center;
}

.outcomes-full ul li::before {
  content: '✓';
  display: block;
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  margin: 0 auto var(--spacing-sm) auto;
}

.outcomes-full .service-list li {
  padding: 0;
  padding-left: 0;
}

.outcomes-full .service-list li::before {
  position: static;
  left: auto;
}
```

**Usage Example:**
```html
<section class="section" id="outcomes">
  <div class="container">
    <div class="outcomes-full">
      <h2>What Changes in 8–10 Weeks</h2>
      <ul class="service-list">
        <li>Clear buyer and user profiles with channel-specific messaging</li>
        <li>A prioritized channel plan (district and/or DTC)</li>
        <li>A conversion-ready funnel with follow-up workflows</li>
      </ul>
    </div>
  </div>
</section>
```

---

### 2. Photo Background Section Component
**Source:** `src/css/styles.css` lines 361-400
**Priority:** High
**Purpose:** Full-width section with custom background image overlay

```css
.photo-background-section {
  background-image: url('../assets/IE Plum Pink Arrows.png');
  background-size: cover;
  background-position: top right;
  background-repeat: no-repeat;
  padding: var(--spacing-xl) 0;
  position: relative;
}

.photo-background-section .container {
  max-width: 1200px;
  margin: 0 auto;
}

.photo-background-section .content {
  max-width: 600px;
}

.photo-background-section h2,
.photo-background-section p {
  color: white;
  text-align: left;
}

.photo-background-section h2 {
  margin-bottom: var(--spacing-md);
}

@media (max-width: 768px) {
  .photo-background-section .content {
    max-width: 100%;
  }
}
```

**Usage Example:**
```html
<section class="photo-background-section">
  <div class="container">
    <div class="content">
      <h2>Growing sales gets harder when channels multiply</h2>
      <p>Adding a second channel often creates mixed messaging, unclear ownership, weak lead follow-up, and slow conversion.</p>
    </div>
  </div>
</section>
```

**Note for Implementation:**
- The background-image URL is site-specific and should be removed or made generic
- Consider adding a modifier class like `.photo-background-section--custom` for sites to override background image
- Or use CSS variable: `background-image: var(--photo-bg-image, none);`

---

## Component Refinements

### 3. Timeline Connecting Line Heights
**Source:** `src/css/styles.css` lines 58, 111
**Priority:** Medium
**Change:** Fixed pixel heights for timeline connector lines

**Desktop (line 58):**
```css
.timeline-item:not(:last-child) .timeline-marker::after {
  height: 140px; /* Changed from: calc(var(--spacing-xl) + var(--spacing-lg)) */
}
```

**Mobile (line 111):**
```css
@media (max-width: 768px) {
  .timeline-item:not(:last-child) .timeline-marker::after {
    height: 180px; /* Changed from: calc(var(--spacing-lg) + var(--spacing-md)) */
  }
}
```

**Rationale:** Fixed pixel heights provide more consistent visual spacing between timeline items regardless of spacing variable changes.

**Recommendation:** Update integralthemes timeline component with these values.

---

### 4. Outcomes Grid Card Padding & Height
**Source:** `src/css/styles.css` lines 260, 269, 421
**Priority:** Medium
**Changes:**

```css
.outcomes-grid ul li {
  padding: var(--spacing-lg);     /* Changed from: var(--spacing-md) */
  min-height: 140px;              /* Changed from: 100px */
}
```

**Additional override at end of file:**
```css
.outcomes-grid ul li {
  padding: var(--spacing-md) !important;
  gap: var(--spacing-sm);
}
```

**Note:** There's a conflict here - padding increased to `--spacing-lg` but then overridden with `--spacing-md !important`. This needs to be resolved. Recommend using `--spacing-lg` without the override.

---

## Hero Section Styling Refinements

### 5. Hero H2 Styling
**Source:** `src/css/styles.css` lines 404-410
**Priority:** Low
**Purpose:** Style hero H2 elements as smaller subheadings

```css
.hero h2 {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}
```

**Rationale:** Allows H2 to be used as a tagline/subtitle in hero sections without looking oversized.

---

### 6. Hero Subtitle Size Reduction
**Source:** `src/css/styles.css` lines 413-415
**Priority:** Low

```css
.hero-subtitle {
  font-size: 1rem !important;
}
```

**Recommendation:** Remove `!important` and add to base theme with normal specificity.

---

## HTML Template Pattern Changes

### 7. Service Card Subtitle Pattern
**Source:** `src/index.html` all service cards
**Priority:** Medium
**Change:** Moved subtitle text from `<p>` tag to first bullet point in `<ul>`

**Before:**
```html
<div class="service-card">
  <h3>Front-of-Funnel Acquisition</h3>
  <p style="font-weight: 500; margin-bottom: var(--spacing-sm);">Audience development and lead generation</p>
  <ul class="service-list">
    <li>Audience mapping and segmentation</li>
    ...
  </ul>
</div>
```

**After:**
```html
<div class="service-card">
  <h3>Front-of-Funnel Acquisition</h3>
  <ul class="service-list">
    <li>Audience development and lead generation</li>
    <li>Audience mapping and segmentation</li>
    ...
  </ul>
</div>
```

**Rationale:** Cleaner HTML structure, subtitle becomes first bullet point for better semantic meaning.

**CSS Needed:** Consider adding `.service-list li:first-child` styling to make first item bold:
```css
.service-card .service-list li:first-child {
  font-weight: 500;
  color: var(--text-primary);
}
```

---

### 8. Outcomes Block → Outcomes Full Rename
**Source:** `src/index.html` line 286
**Change:** Class name updated from `.outcomes-block` to `.outcomes-full`

**Before:**
```html
<div class="outcomes-block">
  <h2>What Changes in 8–10 Weeks</h2>
  <ul>...</ul>
</div>
```

**After:**
```html
<div class="outcomes-full">
  <h2>What Changes in 8–10 Weeks</h2>
  <ul>...</ul>
</div>
```

**Recommendation:**
- Keep `.outcomes-block` for backwards compatibility
- Add `.outcomes-full` as new preferred class
- Or deprecate `.outcomes-block` and migrate all sites to `.outcomes-full`

---

## Icon Updates

### 9. Process Icons Redesign
**Source:** Multiple icon files updated
**Priority:** Low
**Files Changed:**
- `src/assets/icons/discuss.svg` - Updated with consistent line weight
- `src/assets/icons/define.svg` - New design
- `src/assets/icons/design.svg` - Updated
- `src/assets/icons/Build.svg` - Updated
- `src/assets/icons/launch.svg` - Updated
- `src/assets/icons/tune.svg` - Updated

**Action:** Copy updated icon files from Growth Strategies to integralthemes assets.

---

## Assets Added

### 10. Photo Background Image
**Source:** `src/assets/IE Plum Pink Arrows.png`
**Size:** 808,774 bytes
**Priority:** N/A
**Recommendation:** Do NOT add to base theme (site-specific asset)

---

## Summary & Recommendations

### High Priority (Implement First):
1. ✅ **Outcomes Full Component** - Provides centered alternative to outcomes-grid
2. ✅ **Photo Background Section** - Flexible hero/section with image overlay (make generic with CSS variable)

### Medium Priority:
3. ✅ **Timeline Line Heights** - Update to fixed pixel values (140px desktop, 180px mobile)
4. ✅ **Outcomes Grid Padding** - Increase to `--spacing-lg` (resolve conflict)
5. ⚠️ **Service Card First Bullet Bold** - Add CSS to emphasize first bullet as subtitle

### Low Priority:
6. ⚠️ **Hero H2 Styling** - Allow H2 to be used as smaller tagline
7. ⚠️ **Hero Subtitle Reduction** - Reduce size to 1rem
8. ⚠️ **Icon Updates** - Copy new icon designs to base theme

### Documentation Needed:
- Document `.outcomes-full` vs `.outcomes-block` vs `.outcomes-grid` use cases
- Add photo background section usage examples to theme README
- Note service card subtitle pattern change in migration guide

---

## Implementation Checklist

### Phase 1: New Components
- [ ] Add `.outcomes-full` component to `theme/components.css`
- [ ] Add `.photo-background-section` to `theme/components.css` with CSS variable for bg image
- [ ] Add mobile responsive styles for both components

### Phase 2: Component Updates
- [ ] Update timeline line heights to 140px/180px
- [ ] Update outcomes-grid padding to `--spacing-lg`
- [ ] Remove conflicting `!important` override
- [ ] Add `.service-card .service-list li:first-child` bold styling

### Phase 3: Hero Refinements
- [ ] Add `.hero h2` smaller styling
- [ ] Add `.hero-subtitle` size reduction (without !important)
- [ ] Test across all microsites

### Phase 4: Assets
- [ ] Copy updated icon SVGs to integralthemes assets
- [ ] Document icon design changes
- [ ] Update CHANGELOG

### Phase 5: Documentation
- [ ] Update components README with new component usage
- [ ] Add migration guide for outcomes-block → outcomes-full
- [ ] Document photo background section CSS variable usage
- [ ] Update examples in theme playground

---

## Files to Update in integralthemes

1. **theme/components.css** - Add new components and refinements
2. **assets/icons/*.svg** - Copy updated icon files
3. **README.md** - Document new components
4. **CHANGELOG.md** - List all additions and changes

---

## Testing Required

After implementing changes:
1. Test in Growth Strategies (verify no regressions)
2. Test in Career Pathways (ensure compatibility)
3. Test in Media Playground (baseline functionality)
4. Check responsive behavior on mobile/tablet
5. Verify CSS variable overrides work as expected

---

**Next Steps:**
1. Review this document with team
2. Prioritize which components to implement first
3. Create feature branch in integralthemes
4. Implement changes with tests
5. Deploy via GitHub Actions to all microsites
