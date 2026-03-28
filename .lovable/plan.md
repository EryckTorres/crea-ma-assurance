

# CREA-MA — Document Comparison & Fraud Detection Platform

## Overview
A Gov-Tech platform for CREA-MA (Regional Council of Engineering) that uses AI to detect fraud and inconsistencies in CAT (Certidão de Acervo Técnico) documents. Features a dark sidebar, light content area, glassmorphism pop-ups, and onboarding tutorials.

---

## Design System
- **Sidebar**: Dark navy/charcoal (`#0F172A`) with icon + text navigation, collapsible
- **Main content**: Light background (`#F8FAFC`) with white cards
- **Accent colors**: Green (Adherent), Yellow (Pending), Red (Suspicious), Blue (Primary actions)
- **Glassmorphism**: Backdrop blur + semi-transparent backgrounds for modals/pop-ups
- **Typography**: Clean, professional with clear hierarchy
- **Icons**: Lucide-react throughout
- **Animations**: Subtle fade-ins, progress bar transitions, skeleton loaders

---

## Pages & Features

### 1. Login Page
- Clean centered card with CREA-MA branding
- Email/password fields with validation
- Role-based routing (Professional → Dashboard, Analyst → Process List, Admin → Analytics)
- Mock auth (no real backend)

### 2. Professional Portal

**Dashboard**
- Welcome header with user name
- Stats cards: Total CATs, Approved, Pending, Suspicious
- Recent requests table with status badges
- Prominent "New CAT" action button

**Upload CAT Page**
- Drag-and-drop zone for multiple PDFs with file preview thumbnails
- `professional_id` input field
- Submit button triggers simulated processing

**Processing Feedback**
- 7-step progress bar: Upload → OCR → Signature Check → Data Extraction → Cross-Reference → Fraud Analysis → Report Generation
- Each step shows: pending, in-progress (with "AI Thinking..." pulse animation), completed, or failed
- Auto-advances through steps with simulated delays

**Result Page**
- Large verdict card with color-coded status (Green/Yellow/Red)
- Confidence score gauge
- AI feedback text with highlighted findings
- "Download Report" button (generates a summary view)

### 3. Analyst/Fiscal Panel

**Process List**
- Paginated data table with sortable columns
- Filter bar: status dropdown, professional RNP search, fraud score range slider
- Quick-view row expansion

**Detail View**
- Split layout: Left = document preview (PDF placeholder), Right = AI analysis panel
- Fraud alerts list with severity badges (low/medium/high)
- Overall confidence score with visual indicator
- Document metadata section

**Review Form**
- Action buttons: Approve (green), Reject (red), Request Changes (yellow)
- Required justification textarea
- Confirmation modal with glassmorphism

**Audit Trail**
- Vertical timeline component showing chronological actions
- Each entry: timestamp, actor, action type, details
- Color-coded by action type

### 4. Admin & Analytics

**Analytics Dashboard**
- Chart cards: Total processes over time (line), Fraud types distribution (pie/donut), Average analysis time (bar)
- Summary stat cards at top
- Uses Recharts for visualizations

**System Settings**
- LLM Provider selector (GPT, Claude, Gemini) with radio cards
- System health panel: PostgreSQL status, Redis status, AI Gateway status (green/red indicators)
- Configuration toggles

### 5. Semantic Search
- Full-width search bar with natural language input
- Example queries shown as chips
- Results displayed as ranked cards with relevance score and highlighted matching text

### 6. First-Time User Onboarding
- Multi-step tutorial pop-ups with glassmorphism styling
- Spotlight/highlight on relevant UI elements
- Step indicators (1/5, 2/5, etc.)
- "Skip Tutorial" and "Next" buttons
- Triggered on first visit, dismissable

---

## Navigation (Dark Sidebar)
- **Logo**: CREA-MA at top
- **Professional**: Dashboard, Upload CAT, My Processes
- **Analyst**: Process Queue, Analytics
- **Admin**: Settings, System Health
- **Search**: Semantic Search
- Collapsible with hamburger trigger in header
- Active route highlighting

---

## Data
- All data is mocked with realistic Brazilian engineering context
- Simulated processing pipeline with timed state transitions
- Mock user roles for different panel access

