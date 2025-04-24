1. Technology Stack Summary

Frontend: Flutter (web + mobile support)
Backend: FastAPI (Python)
AI: OpenAI GPT-4 API (via openai Python SDK)
Scraping: Bing API + Google API
Database: MySQL (local or PlanetScale)
Hosting (planned): Vercel (frontend), Render (backend)

2. Data Flow Explanation (Creator channel about gangs)

User selects "Gangs" → inputs "Latin Kings in Chicago" → picks Short Form → Flutter sends POST → FastAPI receives → calls scraper → sends result to GPT → formats it → sends script back → Flutter displays it.



