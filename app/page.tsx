"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const universities = [
  "COMSATS University Islamabad (all campuses)",
  "University of Engineering and Technology (UET)",
  "National University of Sciences and Technology (NUST)",
  "FAST National University (FAST-NUCES)",
  "National University of Modern Languages (NUML)",
  "HEC/PMC-recognized medical institutions",
];

const starterQuestions = [
  "What is the admission criteria for FAST Lahore CS?",
  "Tell me about COMSATS Sahiwal fee structure.",
  "What programs are offered at NUST H-12?",
  "How can I calculate my UET aggregate?",
];

export default function Home() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Assalam-o-Alaikum! I am your **University AI Consultant**. Ask me about admissions, merit, fees, programs, campuses, rankings, scholarships, or student life at Pakistani universities.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading]);

  async function askQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedQuestion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to get a response.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: `Sorry, I could not process that request. ${errorMessage}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function chooseStarterQuestion(selectedQuestion: string) {
    setQuestion(selectedQuestion);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 rounded-3xl border border-sky-400/25 bg-slate-900/90 p-6 text-center shadow-2xl shadow-sky-950/30 sm:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-sky-400">
            Pakistan Higher Education Guide
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            🎓 University AI Consultant
          </h1>

          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            Guidance for admissions, merit, fees, programs, campuses,
            rankings, scholarships, and student life at Pakistani universities.
          </p>

          <p className="mt-3 text-sm text-slate-400">
            Developed by Nisar Ahmad · CUI Sahiwal Campus, Pakistan
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
            <h2 className="text-xl font-bold text-sky-300">
              Universities Covered
            </h2>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-300">
              {universities.map((university) => (
                <li key={university} className="flex gap-2">
                  <span className="text-sky-400">•</span>
                  <span>{university}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
              <p className="font-semibold">Important</p>
              <p className="mt-1">
                Always verify current deadlines, admission requirements, merit
                lists, and fees from the relevant official university portal.
              </p>
            </div>
          </aside>

          <section className="flex min-h-[650px] flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-900 shadow-xl">
            <div className="border-b border-slate-700 px-6 py-5">
              <h2 className="text-xl font-bold text-white">
                Ask a university question
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Example: What is the aggregate for FAST Lahore Computer Science?
              </p>
            </div>

            <div className="max-h-[620px] flex-1 space-y-5 overflow-y-auto p-5 sm:p-6">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 sm:text-base ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "border border-slate-700 bg-slate-800 text-slate-100"
                    }`}
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-70">
                      {message.role === "user" ? "You" : "University Bot"}
                    </p>

                    {message.role === "assistant" ? (
                      <div className="markdown-response">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300">
                    University Bot is thinking…
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-slate-700 p-4 sm:p-6">
              <div className="mb-4 flex flex-wrap gap-2">
                {starterQuestions.map((starterQuestion) => (
                  <button
                    key={starterQuestion}
                    type="button"
                    onClick={() => chooseStarterQuestion(starterQuestion)}
                    disabled={loading}
                    className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-2 text-left text-xs text-sky-100 transition hover:bg-sky-400/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {starterQuestion}
                  </button>
                ))}
              </div>

              <form
                onSubmit={askQuestion}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Ask anything about Pakistani universities..."
                  rows={3}
                  maxLength={1200}
                  disabled={loading}
                  className="min-h-24 flex-1 resize-none rounded-2xl border border-slate-600 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:self-end"
                >
                  {loading ? "Thinking..." : "Send"}
                </button>
              </form>
            </div>
          </section>
        </div>

        <footer className="mt-6 text-center text-xs leading-5 text-slate-500">
          This chatbot provides educational guidance, not official admission
          decisions. Verify all time-sensitive information through official
          university portals.
        </footer>
      </div>
    </main>
  );
}