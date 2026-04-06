"use client";

import { useState, useEffect, useRef } from "react";

// ── Meldingstyper ──

export interface Message {
  id: string;
  subject: string;
  body: string;
  type: "info" | "action_required" | "update" | "tip";
  readAt: string | null;
  createdAt: string;
}

const demoMessages: Message[] = [
  {
    id: "1",
    subject: "Velkommen til plattformen!",
    body: "Nettsiden din er nå publisert. Her er noen tips for å komme godt i gang:\n\n- **Legg til kundeuttalelser** — nettsider med kundeuttalelser får 40% mer trafikk\n- **Last opp flere bilder** — vis frem arbeidet ditt\n- **Del nettsiden** — send lenken til eksisterende kunder",
    type: "info",
    readAt: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    subject: "Tips: Legg til kundeuttalelser",
    body: "Visste du at nettsider med kundeuttalelser får opptil 40% mer trafikk? Be dine fornøyde kunder om en kort anbefaling — det trenger ikke være mer enn én setning.",
    type: "tip",
    readAt: null,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    subject: "Nettsiden din er optimalisert",
    body: "Vi har forbedret lastetiden på nettsiden din. Den laster nå 35% raskere enn før.",
    type: "update",
    readAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];

// ── Hjelpefunksjoner ──

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "akkurat nå";
  if (minutes < 60) return `${minutes} min siden`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? "time" : "timer"} siden`;
  const days = Math.floor(hours / 24);
  return `${days} ${days === 1 ? "dag" : "dager"} siden`;
}

function typeIndicator(type: Message["type"]): string {
  switch (type) {
    case "action_required":
      return "bg-orange-500";
    case "tip":
      return "bg-blue-500";
    case "info":
      return "bg-green-500";
    case "update":
      return "bg-gray-400";
  }
}

function typeIcon(type: Message["type"]): string {
  switch (type) {
    case "info":
      return "ℹ️";
    case "action_required":
      return "⚠️";
    case "update":
      return "✅";
    case "tip":
      return "💡";
  }
}

// ── Komponent ──

interface InternalChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

type PortalView = "menu" | "messages" | "message-detail" | "agent-chat";

interface PortalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditSite: () => void;
  gradientClass: string;
  gradientStyle?: React.CSSProperties;
  messages: Message[];
  onMessagesChange: (messages: Message[]) => void;
}

export default function Portal({ isOpen, onClose, onEditSite, gradientClass, gradientStyle, messages, onMessagesChange }: PortalProps) {
  const [activeView, setActiveView] = useState<PortalView>("menu");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [chatMessages, setChatMessages] = useState<InternalChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hei! Jeg er din rådgiver. Hvordan kan jeg hjelpe deg med nettsiden eller bedriften din?",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const unreadCount = messages.filter((m) => !m.readAt).length;

  // Tilbakestill visning når panelet lukkes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setActiveView("menu"), 300);
    }
  }, [isOpen]);

  // Lukk med Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lås bakgrunnsscroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  function handleReadMessage(msg: Message) {
    setSelectedMessage(msg);
    setActiveView("message-detail");
    if (!msg.readAt) {
      onMessagesChange(
        messages.map((m) =>
          m.id === msg.id ? { ...m, readAt: new Date().toISOString() } : m
        )
      );
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function handleChatSend() {
    const text = chatInput.trim();
    if (!text) return;

    const userMsg: InternalChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");

    // Placeholder — kobles til intern agent senere
    setTimeout(() => {
      const botMsg: InternalChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Takk for meldingen! Agenten er ikke koblet til ennå, men vi jobber med det.",
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, botMsg]);
    }, 800);
  }

  function handleEditSite() {
    onEditSite();
    onClose();
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Sidepanel */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          {activeView !== "menu" ? (
            <button
              onClick={() =>
                setActiveView(activeView === "message-detail" ? "messages" : "menu")
              }
              className="text-sm font-medium text-gray-500 hover:text-gray-800"
            >
              ← Tilbake
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-lg text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>
          )}
          <h2 className="text-lg font-bold text-gray-900">
            {activeView === "menu" && "Min side"}
            {activeView === "messages" && "Meldinger"}
            {activeView === "message-detail" && selectedMessage?.subject}
            {activeView === "agent-chat" && "Chat med rådgiver"}

          </h2>
          {/* Plassholdar for jevn layout */}
          <div className="w-8" />
        </div>

        {/* Innhold */}
        <div className="flex-1 overflow-y-auto">
          {/* ── Meny ── */}
          {activeView === "menu" && (
            <div className="p-6 space-y-4">
              {/* Aktive menypunkter — matcher tjenesteboks-layout */}
              <button
                onClick={handleEditSite}
                className="flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition hover:shadow-md"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${gradientClass}`} style={gradientStyle}>
                  <span className="text-sm font-bold text-white">📝</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold">Rediger nettside</h3>
                  <p className="text-xs leading-snug text-gray-500">Endre tekst, bilder og farger.</p>
                </div>
              </button>

              <button
                onClick={() => setActiveView("messages")}
                className="flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition hover:shadow-md"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${gradientClass}`} style={gradientStyle}>
                  <span className="text-sm font-bold text-white">💬</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold">
                    Meldinger
                    {unreadCount > 0 && (
                      <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-bold text-white align-middle">
                        {unreadCount}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs leading-snug text-gray-500">Oppdateringer og tips fra plattformen.</p>
                </div>
              </button>

              <button
                onClick={() => setActiveView("agent-chat")}
                className="flex w-full items-center gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition hover:shadow-md"
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${gradientClass}`} style={gradientStyle}>
                  <span className="text-sm font-bold text-white">🤖</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold">Chat med rådgiver</h3>
                  <p className="text-xs leading-snug text-gray-500">Få hjelp og veiledning fra vår AI-rådgiver.</p>
                </div>
              </button>

              {/* Kommende funksjoner */}
              <div className="pt-2">
                <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Kommer snart
                </p>
                {[
                  { icon: "📊", label: "SEO-rapport", desc: "Se hvordan nettsiden presterer." },
                  { icon: "📈", label: "Statistikk", desc: "Besøkstall og innsikt." },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 opacity-50 mt-3"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200">
                      <span className="text-sm">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-400">{item.label}</h3>
                      <p className="text-xs leading-snug text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bunn */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400">
                  <span className="text-lg opacity-50">⚙️</span>
                  Innstillinger
                </div>
                <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-400">
                  <span className="text-lg opacity-50">🚪</span>
                  Logg ut
                </div>
              </div>
            </div>
          )}

          {/* ── Meldingsliste ── */}
          {activeView === "messages" && (
            <div className="divide-y">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleReadMessage(msg)}
                  className="flex w-full gap-3 px-6 py-4 text-left transition hover:bg-gray-50"
                >
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                      msg.readAt ? "bg-transparent" : typeIndicator(msg.type)
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm ${
                        msg.readAt ? "text-gray-500" : "font-semibold text-gray-900"
                      }`}
                    >
                      {msg.subject}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {timeAgo(msg.createdAt)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* ── Meldingsdetaljer ── */}
          {activeView === "message-detail" && selectedMessage && (
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="text-lg">{typeIcon(selectedMessage.type)}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white ${typeIndicator(
                    selectedMessage.type
                  )}`}
                >
                  {selectedMessage.type.replace("_", " ")}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {selectedMessage.subject}
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                {timeAgo(selectedMessage.createdAt)}
              </p>
              <div className="mt-6 space-y-3 text-sm leading-relaxed text-gray-700">
                {selectedMessage.body.split("\n").map((line, i) => {
                  if (!line.trim()) return <br key={i} />;
                  // Enkel markdown-bold
                  const parts = line.split(/\*\*(.*?)\*\*/g);
                  return (
                    <p key={i}>
                      {parts.map((part, j) =>
                        j % 2 === 1 ? (
                          <strong key={j}>{part}</strong>
                        ) : (
                          <span key={j}>{part}</span>
                        )
                      )}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Agent-chat ── */}
          {activeView === "agent-chat" && (
            <div className="flex h-full flex-col">
              <div className="flex-1 overflow-y-auto px-4 py-3">
                <div className="flex flex-col gap-3">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? `text-white ${gradientClass}`
                            : "bg-gray-100 text-gray-800"
                        }`}
                        style={msg.role === "user" ? gradientStyle : undefined}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleChatSend();
                }}
                className="flex items-center gap-2 border-t border-gray-200 px-4 py-3"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Skriv en melding..."
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <button
                  type="submit"
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition hover:opacity-90 ${gradientClass}`}
                  style={gradientStyle}
                  aria-label="Send melding"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-white"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Eksporter unreadCount-hjelper for bruk i page.tsx
export { demoMessages };
