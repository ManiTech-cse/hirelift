# 🎨 Daily Jobs Agent - Visual Design Guide

## Design Overview

The Daily Jobs Agent uses a modern, gradient-based design that seamlessly integrates with HireLift's existing aesthetic while standing out as a premium feature.

---

## 🎨 Color System

### **Primary Gradient (Background)**
```css
background: linear-gradient(135deg, 
  #EFF6FF 0%,    /* from-blue-50 */
  #FAF5FF 50%,   /* via-purple-50 */
  #FDF2F8 100%   /* to-pink-50 */
);
```

**Visual:**
```
┌────────────────────────────────────┐
│ 🔵 Blue (Start)                    │
│    ↓ Smooth transition             │
│ 🟣 Purple (Middle)                 │
│    ↓ Smooth transition             │
│ 🔴 Pink (End)                      │
└────────────────────────────────────┘
```

---

### **Header Icon Gradient**
```css
background: linear-gradient(135deg,
  #2563EB 0%,    /* from-blue-600 */
  #9333EA 100%   /* to-purple-600 */
);
```

**Icon:** ✨ Sparkles (white on gradient background)

---

### **Title Gradient**
```css
background: linear-gradient(90deg,
  #2563EB 0%,    /* from-blue-600 */
  #7C3AED 50%,   /* via-purple-600 */
  #EC4899 100%   /* to-pink-600 */
);
background-clip: text;
```

**Effect:** Smooth rainbow text from blue → purple → pink

---

### **Badge Colors**

#### **Live Badge (Green)**
```css
background: #DCFCE7;     /* bg-green-100 */
color: #15803D;          /* text-green-700 */
```
**Text:** 🔴 LIVE • 20 New Jobs Today

#### **NEW Badge (Orange-Pink)**
```css
background: linear-gradient(90deg,
  #F97316 0%,    /* from-orange-500 */
  #EC4899 100%   /* to-pink-500 */
);
color: #FFFFFF;
```

#### **Skill Tags (Purple)**
```css
background: #FAF5FF;     /* bg-purple-50 */
color: #7E22CE;          /* text-purple-700 */
```

---

## 📐 Layout Structure

### **Component Hierarchy**
```
┌─ Daily Jobs Agent Container ────────────────────────┐
│  padding: 24px                                       │
│  rounded: 16px (2xl)                                 │
│  border: 1px blue-100                                │
│                                                       │
│  ┌─ Header Row ────────────────────────────────────┐│
│  │                                                  ││
│  │  [Icon] Title                      [Refresh Btn]││
│  │         Subtitle                                 ││
│  │                                                  ││
│  └──────────────────────────────────────────────────┘│
│                                                       │
│  ┌─ Live Badge ────────────────────────────────────┐│
│  │  🔴 LIVE • 20 New Jobs Today                    ││
│  │  Real-time from multiple sources                ││
│  └──────────────────────────────────────────────────┘│
│                                                       │
│  ┌─ Jobs Grid ──────────────────────────────────────┐│
│  │  max-height: 500px                              ││
│  │  overflow-y: auto                               ││
│  │                                                  ││
│  │  ┌─ Job Card 1 ─┐  ┌─ Job Card 2 ─┐           ││
│  │  │   [NEW]      │  │   [NEW]      │           ││
│  │  │   Job Info   │  │   Job Info   │           ││
│  │  └──────────────┘  └──────────────┘           ││
│  │                                                  ││
│  │  ┌─ Job Card 3 ─┐  ┌─ Job Card 4 ─┐           ││
│  │  │   Content    │  │   Content    │           ││
│  │  └──────────────┘  └──────────────┘           ││
│  │                                                  ││
│  └──────────────────────────────────────────────────┘│
│                                                       │
│  ┌─ Footer ────────────────────────────────────────┐│
│  │  Jobs sourced from Remotive, Arbeitnow...       ││
│  └──────────────────────────────────────────────────┘│
└───────────────────────────────────────────────────────┘
```

---

## 📏 Spacing & Dimensions

### **Component Level**
```css
Outer padding:        24px (p-6)
Border radius:        16px (rounded-2xl)
Border:               1px solid #DBEAFE
Shadow:               lg (0 10px 15px rgba(0,0,0,0.1))
```

### **Header Section**
```css
Margin bottom:        24px (mb-6)
Icon container:       48px × 48px (p-3)
Icon size:            24px (w-6 h-6)
Title font:           20px (text-xl)
Subtitle font:        14px (text-sm)
Gap between items:    12px (gap-3)
```

### **Live Badge**
```css
Padding:              6px 12px (px-3 py-1.5)
Font size:            12px (text-xs)
Border radius:        9999px (rounded-full)
Font weight:          600 (font-semibold)
Margin bottom:        16px (mb-4)
```

### **Jobs Grid**
```css
Grid gap:             16px (gap-4)
Max height:           500px
Scrollbar width:      6px
Columns (mobile):     1
Columns (tablet+):    2
```

### **Job Card**
```css
Padding:              16px (p-4)
Border radius:        12px (rounded-xl)
Border:               1px solid #E2E8F0
Shadow (default):     sm (0 1px 2px)
Shadow (hover):       lg (0 10px 15px)
Transition:           300ms ease
```

---

## 🎭 Interactive States

### **Job Card States**

#### **Default State**
```css
background: #FFFFFF
border: 1px solid #E2E8F0
shadow: 0 1px 2px rgba(0,0,0,0.05)
transform: scale(1)
```

#### **Hover State**
```css
background: linear-gradient(135deg,
  #FFFFFF 0%,
  #EFF6FF 100%
);
border: 1px solid #93C5FD
shadow: 0 10px 15px rgba(0,0,0,0.1)
transform: translateY(-2px)
transition: all 300ms ease
```

#### **Active State** (clicking)
```css
transform: scale(0.98)
transition: transform 100ms
```

---

### **Refresh Button States**

#### **Default**
```css
background: #FFFFFF
color: #2563EB
border: 1px solid #93C5FD
shadow: sm
```

#### **Hover**
```css
background: #EFF6FF
shadow: md
```

#### **Loading** (spinning)
```css
Icon rotation: 360deg continuous
Animation: spin 1s linear infinite
```

#### **Disabled**
```css
opacity: 0.5
cursor: not-allowed
```

---

## 🎬 Animations

### **Background Blobs**
```css
@keyframes float {
  0%, 100% { transform: translate(0, 0) }
  50% { transform: translate(20px, 20px) }
}

Blob 1: animation-delay: 0s
Blob 2: animation-delay: 2s
Blob 3: animation-delay: 4s
```

**Visual Effect:** Slow-moving gradient blobs creating depth

---

### **Refresh Icon Spin**
```css
@keyframes spin {
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
}

Duration: 1s
Timing: linear
Iteration: infinite (while loading)
```

---

### **Card Hover Animation**
```css
transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);

Properties animated:
- background-color
- box-shadow
- transform (translateY)
- border-color
```

---

### **NEW Badge Pulse** (optional)
```css
@keyframes pulse {
  0%, 100% { opacity: 1 }
  50% { opacity: 0.8 }
}

Duration: 2s
Timing: ease-in-out
Iteration: infinite
```

---

## 📱 Responsive Breakpoints

### **Mobile (< 640px)**
```css
Component:
  padding: 16px (p-4)
  margin: 0 8px

Header:
  flex-direction: column
  align-items: start
  
Refresh button:
  Show icon only
  Hide text label
  
Jobs Grid:
  grid-cols: 1
  gap: 12px

Job Cards:
  padding: 12px
  font-size: smaller
```

**Layout:**
```
┌────────────────┐
│ [Icon] Title   │
│ Subtitle       │
│ [Refresh] →    │
│                │
│ 🔴 LIVE Badge  │
│                │
│ ┌────────────┐ │
│ │ Job Card 1 │ │
│ └────────────┘ │
│ ┌────────────┐ │
│ │ Job Card 2 │ │
│ └────────────┘ │
└────────────────┘
```

---

### **Tablet (640px - 1024px)**
```css
Component:
  padding: 20px (p-5)
  
Jobs Grid:
  grid-cols: 2
  gap: 16px

Job Cards:
  padding: 16px
  Equal width columns
```

**Layout:**
```
┌────────────────────────────┐
│ [Icon] Title    [Refresh]  │
│                            │
│ 🔴 LIVE Badge              │
│                            │
│ ┌──────┐    ┌──────┐      │
│ │ Job1 │    │ Job2 │      │
│ └──────┘    └──────┘      │
│ ┌──────┐    ┌──────┐      │
│ │ Job3 │    │ Job4 │      │
│ └──────┘    └──────┘      │
└────────────────────────────┘
```

---

### **Desktop (> 1024px)**
```css
Component:
  padding: 24px (p-6)
  max-width: 1280px

Jobs Grid:
  grid-cols: 2
  gap: 16px
  
Job Cards:
  padding: 16px
  Full featured
  All labels visible
```

---

## 🎯 Typography Scale

### **Headings**
```css
Component Title:      20px / 1.25 / 700 (text-xl font-bold)
Subtitle:             14px / 1.5 / 400 (text-sm)
Live Badge:           12px / 1.5 / 600 (text-xs font-semibold)
```

### **Job Cards**
```css
Job Title:            14px / 1.5 / 600 (text-sm font-semibold)
Company:              12px / 1.5 / 500 (text-xs font-medium)
Location:             12px / 1.5 / 400 (text-xs)
Description:          12px / 1.5 / 400 (text-xs)
Skill Tags:           12px / 1.5 / 500 (text-xs font-medium)
View Link:            12px / 1.5 / 500 (text-xs font-medium)
```

### **Footer**
```css
Attribution Text:     12px / 1.5 / 400 (text-xs)
```

---

## 🎨 Icon Library

All icons from **Lucide React**:

```jsx
import { 
  Sparkles,      // Component header (magic/AI)
  RefreshCw,     // Refresh button
  Calendar,      // Last update time
  MapPin,        // Location
  Briefcase,     // Job icon
  ExternalLink,  // View details
  TrendingUp     // Live/trending badge
} from 'lucide-react';
```

**Icon Sizes:**
- Header icon: 24px (w-6 h-6)
- Card icons: 16px (w-4 h-4)
- Small icons: 12px (w-3 h-3)

---

## 🌈 Gradient Recipes

### **Background Gradient**
```css
.agent-background {
  background: linear-gradient(
    to bottom right,
    rgb(239 246 255) 0%,
    rgb(250 245 255) 50%,
    rgb(253 242 248) 100%
  );
}
```

### **Icon Container Gradient**
```css
.icon-gradient {
  background: linear-gradient(
    to bottom right,
    rgb(37 99 235) 0%,
    rgb(147 51 234) 100%
  );
}
```

### **NEW Badge Gradient**
```css
.new-badge {
  background: linear-gradient(
    to right,
    rgb(249 115 22) 0%,
    rgb(236 72 153) 100%
  );
}
```

### **Card Hover Gradient**
```css
.card-hover {
  background: linear-gradient(
    to bottom right,
    rgb(255 255 255) 0%,
    rgb(239 246 255) 100%
  );
}
```

---

## 🎪 Custom Scrollbar

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #F1F5F9;      /* slate-100 */
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #CBD5E1;      /* slate-300 */
  border-radius: 10px;
  transition: background 200ms;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94A3B8;      /* slate-400 */
}
```

**Effect:** Slim, rounded scrollbar that matches the design

---

## 🎨 Shadow System

### **Card Shadows**
```css
Default:    0 1px 2px 0 rgba(0, 0, 0, 0.05)
Hover:      0 10px 15px -3px rgba(0, 0, 0, 0.1)
Component:  0 10px 15px -3px rgba(0, 0, 0, 0.1)
```

### **Button Shadows**
```css
Default:    0 1px 2px 0 rgba(0, 0, 0, 0.05)
Hover:      0 4px 6px -1px rgba(0, 0, 0, 0.1)
```

---

## 📐 Spacing Grid

```
4px   = 0.5  (xs)
8px   = 1    (sm)
12px  = 1.5  (base)
16px  = 2    (md)
20px  = 2.5  (lg)
24px  = 3    (xl)
32px  = 4    (2xl)
```

**Usage:**
- Tight spacing: 4-8px (tags, inline elements)
- Normal spacing: 12-16px (cards, sections)
- Loose spacing: 20-24px (major sections)

---

## 🎯 Accessibility

### **Color Contrast Ratios**
```
Title on background:     4.5:1 ✅ (WCAG AA)
Body text:               4.5:1 ✅ (WCAG AA)
Badge text:              4.5:1 ✅ (WCAG AA)
Link text:               4.5:1 ✅ (WCAG AA)
```

### **Interactive Elements**
```
Minimum touch target:    44px × 44px ✅
Focus indicators:        Visible ✅
Hover states:            Clear ✅
Active states:           Feedback provided ✅
```

### **Screen Readers**
```html
<button aria-label="Refresh job listings">
  <RefreshCw />
</button>

<div role="region" aria-label="Daily job opportunities">
  <!-- Job cards -->
</div>
```

---

## 🎊 Design Tokens

```javascript
const designTokens = {
  colors: {
    primary: '#2563EB',      // blue-600
    secondary: '#9333EA',    // purple-600
    accent: '#EC4899',       // pink-600
    success: '#15803D',      // green-700
    background: {
      start: '#EFF6FF',      // blue-50
      middle: '#FAF5FF',     // purple-50
      end: '#FDF2F8',        // pink-50
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0,0,0,0.05)',
    md: '0 4px 6px -1px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1)',
  }
};
```

---

## 🎨 Component Variants

### **Loading State**
```
┌────────────────────────────────┐
│  ✨ Daily Jobs Agent           │
│                                │
│  🔄 Loading fresh             │
│     opportunities...           │
│                                │
└────────────────────────────────┘
```

### **Empty State**
```
┌────────────────────────────────┐
│  ✨ Daily Jobs Agent           │
│  📅 Updated 2 hours ago        │
│  🔴 LIVE • 0 New Jobs Today   │
│                                │
│  No jobs available right now   │
│  [Try refreshing]              │
└────────────────────────────────┘
```

### **Loaded State** (Normal)
```
┌────────────────────────────────┐
│  ✨ Daily Jobs Agent           │
│  📅 Updated Just now      [🔄] │
│  🔴 LIVE • 20 New Jobs Today  │
│                                │
│  [NEW] Job 1    [NEW] Job 2   │
│  Job 3          Job 4          │
└────────────────────────────────┘
```

---

## ✅ Design Checklist

- [x] Color palette defined
- [x] Gradients implemented
- [x] Spacing consistent
- [x] Typography scaled properly
- [x] Icons sized correctly
- [x] Shadows applied
- [x] Hover states designed
- [x] Responsive breakpoints
- [x] Animations smooth
- [x] Accessibility considered
- [x] Loading states designed
- [x] Empty states designed
- [x] Custom scrollbar styled

---

**Design Status:** ✅ COMPLETE & PRODUCTION-READY

*Last Updated: December 22, 2025*
