# ResumeForge — 3D & ATS-Compliant Resume Builder

> **ResumeForge** is a production-grade web application engineered with React, Vite, Tailwind CSS, Framer Motion, and Three.js / React Three Fiber. It features an interactive, glossy 3D ribbon loop background, mandatory Supabase Auth gate, live two-column editing with real-time A4 preview, 8 distinct ATS and modern templates, Google Fonts, dynamic color swatches, and high-resolution PDF/PNG exports.

---

## ✨ Features

1. **3D Animated Background**:
   - Built with `@react-three/fiber` and Three.js `MeshPhysicalMaterial` (`roughness 0.35`, `metalness 0.6`, `clearcoat 1.0`).
   - Glossy, soft tube/ribbon meshes forming flower-like loops on soft cream (`#FEFCE0`) with butter-yellow metallic reflections (`#F5D100` to `#FFE45C`).
   - Continuous rotation, floating harmonic motion, and mouse-parallax interaction.
   - Fallback to CSS ambient gradient on low-end hardware or when `prefers-reduced-motion` is enabled.

2. **Login Gate (Protected Builder Route)**:
   - Centered login modal displayed over blurred 3D background on first visit.
   - Supabase Auth: Email/Password, Google OAuth, and Instant Guest Demo fallback.
   - Session persistence across reloads.

3. **Two-Column Professional Layout**:
   - **Left Panel (Information Form)**:
     - Real-time resume completion progress bar (0–100%).
     - With Photo / Without Photo switcher with instant circular, rounded, or square headshot crops and sample avatars.
     - 11 comprehensive sections: Personal Details, Professional Summary (with AI tone presets and character counter), Work Experience, Education, Skills, Projects, Certifications, Achievements, Languages, Hobbies, and Custom Section.
     - Add/remove multiple entries, bullet point formatting, and debounced autosave.
   - **Right Panel (Customization & Live Preview)**:
     - Horizontal template picker with 8 ATS-ready and designer templates:
       1. **Classic** (ATS single-column standard)
       2. **Minimal Mono** (Architectural black & white)
       3. **Duo Blue** (Navy structure with sky blue accents)
       4. **Duo Sunset** (Warm royal purple & sunset amber)
       5. **Creative Sidebar** (High-impact colored side pillar)
       6. **Modern Timeline** (Connected milestone nodes)
       7. **Crazy Gradient** (Gradient banner with rounded cards)
       8. **Bold Yellow** (ResumeForge signature theme)
     - Typography Picker: Google Fonts (Inter, Poppins, Montserrat, Space Grotesk, Roboto, Lato, Raleway, Playfair Display, Merriweather, DM Serif Display).
     - Scale & Spacing presets (S, M, L) and line height.
     - Ready-made curated color swatches + custom hex color picker.
     - True A4 sheet preview (210mm × 297mm) with zoom controls and page overflow warnings.

4. **Build & Export Pipeline**:
   - Big primary "Build Resume" button with validation for mandatory fields.
   - Animated forge loading state and celebratory confetti animation (`canvas-confetti`).
   - High-resolution PDF export via `html2canvas` + `jsPDF` configured at 2x pixel ratio for print perfection.
   - PNG and direct printer support.
   - File naming convention: `${FirstName}_${LastName}_Resume.pdf`.

5. **Community Feedback & Reviews**:
   - 1–5 star rating with interactive feedback modal.
   - Stored in Supabase table `feedback` with public community testimonial feed.

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Vanilla CSS utilities
- **Animations**: Framer Motion + Canvas Confetti
- **3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Backend & Auth**: Supabase (`@supabase/supabase-js`)
- **Document Export**: `html2canvas` + `jspdf`
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js `v18+` (or `v20+`)
- npm `v9+`

### 2. Installation
```bash
# Clone the repository
git clone <repo-url>
cd resumeforge

# Install dependencies
npm install
```

### 3. Environment Variables (Supabase Setup)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
> *Note: If no Supabase credentials are provided, ResumeForge seamlessly activates an offline-capable mock database in localStorage with preloaded sample reviews so the app is 100% testable out of the box!*

### 4. Database Setup (Supabase SQL Editor)
Run the SQL queries in `supabase_schema.sql` inside your Supabase project's SQL Editor to create the `resumes` and `feedback` tables with Row Level Security (RLS) policies.

### 5. Running Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Deployment (Vercel)

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. In Environment Variables, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **"Deploy"**.
