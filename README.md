# UniBot – University AI Consultant

**UniBot** is an AI-powered chatbot that helps students get clear, structured answers about university admissions in Pakistan (e.g., FAST, NUST, LUMS, UET, etc.). Instead of searching multiple websites, users can ask natural-language questions and receive concise, well-formatted guidance.

Live demo: [uni-bot-next.netlify.app](https://uni-bot-next.netlify.app)

---

## Features

- 🤖 Conversational chatbot interface for university admissions queries  
- 📝 Clean Markdown rendering (headings, lists, links, bold/italic text)  
- 🚀 Streaming responses for a smooth chat experience  
- 🔒 Secure server-side API route using **Groq** (no API keys exposed to the browser)  
- 🎨 Modern UI with Tailwind CSS and responsive design  
- ☁️ Deployed on **Netlify** with environment-based secrets  

Example queries:

- “What is the admission criteria for FAST Lahore CS?”  
- “What documents are required for NUST undergraduate admissions?”  
- “What is the fee structure for LUMS Computer Science?”

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS  
- **AI Inference:** Groq API  
- **Deployment:** Netlify (CI/CD from GitHub `main` branch)  

---

## Getting Started

### Prerequisites

- Node.js 20+  
- npm or pnpm  
- A [Groq](https://console.groq.com) API key  

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/nisar-ai/uni-bot-next.git
   cd uni-bot-next
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root:

   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

- `app/page.tsx` – Main chatbot UI component  
- `app/globals.css` – Global styles and Markdown display rules  
- `app/api/chat/route.ts` – Server-side API route that calls Groq  
- `package.json` – Project dependencies and scripts  

---

## Deployment (Netlify)

1. Push your code to GitHub (e.g., `main` branch).  
2. In the Netlify dashboard:
   - Create a new site from Git and connect your GitHub repo.
   - Netlify will auto-detect Next.js.
   - Add an environment variable:
     - Key: `GROQ_API_KEY`
     - Value: your Groq API key
3. Deploy. Netlify will build the site and provide a production URL.

Your `.env.local` is **not** committed to Git; secrets are only stored in Netlify.

---

## Scripts

- `npm run dev` – Start local development server  
- `npm run build` – Build for production  
- `npm run start` – Start production server (after build)  

---

## Author

**Nisar Ahmad**  
COMSATS University Islamabad, Sahiwal Campus – Pakistan  

GitHub: [@nisar-ai](https://github.com/nisar-ai)

---

## License

MIT License – feel free to use and adapt for your own projects.
