# AI Presentation Generator (Deck Draft)

Full-stack application that generates presentation outlines using Google Gemini AI and exports them as customizable PowerPoint (`.pptx`) decks.

## Architecture

The project is divided into a clean decoupled frontend and backend:

```
AI ppt project/
├── backend/                  # Modular Node.js / Express backend
│   ├── src/
│   │   ├── config/env.js     # Environment variables & startup validation
│   │   ├── controllers/      # Route controllers (outlineController.js)
│   │   ├── middleware/       # Rate limiting & global error handler
│   │   ├── routes/           # REST endpoints (/api/generate-outline, /healthz)
│   │   ├── services/         # Gemini REST client (geminiService.js)
│   │   ├── utils/            # Prompt builder, JSON parser, deck validator
│   │   └── app.js            # Express app assembly & CORS configuration
│   ├── server.js             # Backend server entry point
│   ├── package.json          # Backend dependencies
│   └── .env                  # Backend environment variables
│
├── frontend/                 # Modern React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar/      # Brand, TopicInput, OptionSelect, SlideSlider, Sidebar
│   │   │   ├── DeckPreview/  # DeckHeader, SlideCard, EmptyState, LoadingState
│   │   │   └── Common/       # ErrorAlert, UI components
│   │   ├── services/
│   │   │   ├── api.js        # API requests to backend
│   │   │   └── pptxExport.js # PowerPoint export with pptxgenjs
│   │   ├── styles/
│   │   │   └── index.css     # Design system, animations, dark/gold luxury theme
│   │   ├── App.jsx           # App state & layout orchestration
│   │   └── main.jsx          # React entry point
│   ├── vite.config.js        # Dev server with proxy to backend
│   └── package.json          # Frontend dependencies
│
└── package.json              # Root orchestration scripts
```

## Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend starts on **`http://localhost:3000`**.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on **`http://localhost:5173`** and proxies `/api` and `/healthz` to `http://localhost:3000`.

### 3. Running from Root
From the project root directory, you can run:
```bash
# Run backend
npm run dev:backend

# Run frontend
npm run dev:frontend

# Build frontend for production
npm run build:frontend
```

## Features
- **AI Outline Generation**: Automatically constructs multi-slide structured presentation decks with titles and bullet points.
- **Tone & Language Options**: Supports Professional, Academic, Creative, and Minimal styles in Hindi, English, or Hinglish.
- **Inline Editing**: Live editing for deck title, subtitle, slide titles, and individual bullet points, plus adding/removing bullets or deleting slides.
- **PowerPoint Export**: Direct `.pptx` generation and download using `pptxgenjs` with customized widescreen layout and slide styles.

## Deploying to Vercel

This repository is pre-configured for one-click deployment on [Vercel](https://vercel.com).

### 1. Import to Vercel
1. Push this repository to your GitHub account (`https://github.com/Anshupatel2002/AI_PPT`).
2. Log into [Vercel](https://vercel.com) and click **"Add New..."** → **"Project"**.
3. Select and import your **`AI_PPT`** repository.
4. Leave the default build settings as configured by `vercel.json`:
   - **Build Command**: `npm run build`
   - **Output Directory**: `frontend/dist`

### 2. Configure Environment Variables
Before deploying, add the following Environment Variables in the Vercel project configuration:
- `GEMINI_API_KEY`: Your Google Gemini API Key.
- `GEMINI_MODEL`: `gemini-3.6-flash` (recommended).

### 3. Deploy
Click **Deploy**. Vercel will build the frontend assets and automatically serve the backend as a Serverless Function through `/api/index.js`.

