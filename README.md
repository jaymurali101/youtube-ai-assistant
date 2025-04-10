🧠 Project Summary: AI Research Assistant for YouTubers
📝 Overview
This project is a custom AI-powered research assistant tool designed specifically for YouTubers who create niche, topic-driven content. Inspired by structured storytelling formats like the Life of a Gangster YouTube channel, the tool automates the research and scriptwriting process by scraping, processing, and organizing information based on a selected topic.

It allows users to:

Choose a niche (e.g., gangs, warfare, historical figures)

Input a specific focus within that niche (e.g., “Latin Kings in Chicago”)

Select the content format (Short Form or Long Form)

Automatically receive a structured, original video script, formatted for their platform of choice, along with optional visual suggestions, titles, and content segmentation.

This project is being developed as a personal innovation project by a junior computer science student (with a partner), with the goal of showcasing full-stack software development, AI integration, prompt engineering, and user-centered design — while also building something that could be marketed and launched as a real product.

🧑‍💻 Target Audience
YouTubers who focus on educational or storytelling content (e.g., history, crime, subcultures, conspiracy theories, etc.)

Creators who want help with content research, script drafting, and idea generation

Both short-form (YouTube Shorts, TikTok) and long-form (standard YouTube videos) creators

🔄 User Flow
Launch App (web/mobile/desktop)

Step 1: User chooses a topic niche from a list (e.g., “Gangs”)

Step 2: User inputs a specific focus within the niche (e.g., “Latin Kings’ prison rituals”)

Step 3: User selects the content type (Short Form or Long Form)

Step 4: AI fetches relevant data by searching or scraping web sources

Step 5: AI summarizes and structures the data into a video script

Step 6: The user receives:

A script formatted based on content type

Organized sections (e.g., Intro, Practices, Historic Moments)

Optional: visual suggestions, video title, CTA, and export options

📐 Script Format Examples
Short Form Output (e.g., TikTok/Shorts)
🧲 Hook (shocking or intriguing fact)

🔍 1–2 Key insights or facts

🚪 Quick outro or CTA

✍️ Script optimized for fast delivery and pacing

Long Form Output (e.g., 8–15 min YouTube video)
🎬 Intro/context setting

🧩 Multiple structured sections

🕵️‍♂️ Deep dive into topic

🎯 Conclusion/summary

🎥 Suggested visuals/graphics

⚙️ Technical Stack & Tools
🖥️ Frontend
React.js / Next.js or Flutter (for web or mobile UI)

Modern interface with dropdowns, forms, and previews

Optional: Markdown preview or Notion-style editor

🌐 Backend
Python (FastAPI / Flask) or Node.js

Handles user input, API requests, and processing pipeline

🧠 AI/LLM Integration
OpenAI GPT-4 API or Anthropic Claude API

Used for summarizing data, formatting scripts, and generating structured output

Prompt engineering for different templates:

Niche-specific prompts

Short form vs long form templates

Contextual tone/style adaptation

🔍 Web Scraping & Data Search
Search APIs: Google Programmable Search, SerpAPI, Bing API

Data APIs: Wikipedia API, Wikidata, Reddit API, NewsAPI

Scraping Libraries: BeautifulSoup, Scrapy

Optional caching layer to reduce repeated scraping

📚 Data Storage (Optional)
Firebase, MongoDB, or SQLite

For saving user history, generated scripts, and recent searches

Optionally integrated with a vector database like Chroma or Pinecone to enable memory/context

🧩 Customization Features
Users can:

Choose their niche (e.g., gangs, warfare, history)

Input a topic-specific angle (e.g., “Yakuza Tattoos”)

Pick a content style (short or long form)

The app:

Dynamically creates a prompt using these inputs

Structures the script using format templates

Generates unique output every time, reducing overlap between users

📦 Output Features
Downloadable scripts in Markdown, TXT, or PDF

Copy-to-clipboard or direct integration with Notion/Docs

Visual suggestions for B-roll, images, captions

Future features: voice-over script pacing, auto video editing cues

💼 Why It’s Impressive (Technical + Career Perspective)
This project demonstrates:

Full-stack development (frontend + backend)

Real-world AI integration (LLM prompt design, summarization, formatting)

Advanced user flow logic (conditional templates, topic mapping)

Web scraping and search pipeline design

Product thinking + niche creator problem-solving

It’s the kind of project that:

Shows you understand how to build software for real users

Proves you know how to work with AI tools at a production level

Can be used as a portfolio piece, startup pitch, or resume builder

Can be expanded into a paid SaaS tool or app for creators

🚀 Future Add-Ons (Optional)
User login & script history

Custom script tone options (funny, serious, fast-paced, etc.)

B-Roll visual auto-suggester (using image APIs or public domain scraping)

Auto-upload to YouTube Drafts or Shorts API (for paid users)

Fine-tuned model version for scriptwriting
