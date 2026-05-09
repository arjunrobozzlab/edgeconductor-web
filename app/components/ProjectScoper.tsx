"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hi! I'm EdgeConductor's Project Scoper. Tell me — what are you trying to build, or what problem are you looking to solve with embedded AI or IoT?";

const SCOPE_START = "---SCOPE---";
const SCOPE_END = "---END SCOPE---";

function extractScope(
  text: string
): { before: string; scope: string; after: string } | null {
  const start = text.indexOf(SCOPE_START);
  const end = text.indexOf(SCOPE_END);
  if (start === -1 || end === -1) return null;
  return {
    before: text.slice(0, start).trim(),
    scope: text.slice(start + SCOPE_START.length, end).trim(),
    after: text.slice(end + SCOPE_END.length).trim(),
  };
}

function injectBold(html: string): string {
  return html.replace(
    /\*\*(.*?)\*\*/g,
    "<strong class=\"text-white\">$1</strong>"
  );
}

function ScopeCard({ scopeText }: { scopeText: string }) {
  const lines = scopeText.split("\n");

  return (
    <div className="my-3 border border-blue-500/40 rounded-xl overflow-hidden">
      <div className="px-4 py-2.5 border-b border-blue-500/20 flex items-center gap-2 bg-blue-500/10">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
          Project Scope
        </span>
        <span className="ml-auto text-[10px] text-blue-400/40 font-mono">
          EdgeConductor
        </span>
      </div>

      <div className="px-4 py-4 space-y-3 bg-blue-500/5">
        {lines.map((line, i) => {
          if (!line.trim()) return null;

          // **Label:** Value  (section header with inline value)
          const sectionMatch = line.match(/^\*\*([^*]+):\*\*\s*(.*)/);
          if (sectionMatch) {
            const [, label, value] = sectionMatch;
            const isMonetary =
              /invest|budget/i.test(label);
            const isTime = /timeline|duration/i.test(label);
            return (
              <div key={i}>
                <div className="text-white/30 text-[9px] uppercase tracking-widest font-semibold mb-0.5">
                  {label}
                </div>
                {value && (
                  <div
                    className={`text-sm font-medium leading-relaxed ${
                      isMonetary
                        ? "text-blue-300"
                        : isTime
                        ? "text-cyan-300"
                        : "text-white/85"
                    }`}
                    dangerouslySetInnerHTML={{ __html: injectBold(value) }}
                  />
                )}
              </div>
            );
          }

          // Bullet: "- text" or "• text"
          if (/^[-•*]\s/.test(line)) {
            return (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-blue-400/60 text-xs mt-0.5 flex-shrink-0">
                  ▸
                </span>
                <span
                  className="text-sm text-white/75 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: injectBold(line.replace(/^[-•*]\s/, "")),
                  }}
                />
              </div>
            );
          }

          // Numbered list: "1. text"
          const numMatch = line.match(/^(\d+)\.\s(.*)/);
          if (numMatch) {
            return (
              <div key={i} className="flex gap-2.5 items-start">
                <span className="text-blue-400 text-xs font-mono mt-0.5 flex-shrink-0 w-4">
                  {numMatch[1]}.
                </span>
                <span
                  className="text-sm text-white/75 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: injectBold(numMatch[2]) }}
                />
              </div>
            );
          }

          // Fallback plain text
          return (
            <p
              key={i}
              className="text-sm text-white/70 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: injectBold(line) }}
            />
          );
        })}
      </div>
    </div>
  );
}

function MessageBubble({
  msg,
  isStreaming,
}: {
  msg: Message;
  isStreaming?: boolean;
}) {
  const parsed = extractScope(msg.content);
  const isUser = msg.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] bg-white/10 rounded-2xl rounded-br-sm px-4 py-2.5">
          <p className="text-sm text-white/90 whitespace-pre-wrap">
            {msg.content}
          </p>
        </div>
      </div>
    );
  }

  if (parsed) {
    return (
      <div className="flex justify-start">
        <div className="max-w-[92%] w-full">
          {parsed.before && (
            <p className="text-sm text-white/80 mb-3 whitespace-pre-wrap leading-relaxed">
              {parsed.before}
            </p>
          )}
          <ScopeCard scopeText={parsed.scope} />
          {parsed.after && (
            <p className="text-sm text-white/60 mt-3 whitespace-pre-wrap leading-relaxed italic">
              {parsed.after}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[88%]">
        <p className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed">
          {msg.content}
          {isStreaming && (
            <span className="inline-block w-0.5 h-3.5 bg-white/60 ml-0.5 align-middle animate-pulse" />
          )}
        </p>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="flex gap-1 py-1">
        {[0, 150, 300].map((delay) => (
          <span
            key={delay}
            className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ProjectScoper() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [email, setEmail] = useState("");
  const [sendingProposal, setSendingProposal] = useState(false);
  const [proposalSent, setProposalSent] = useState(false);
  const [proposalError, setProposalError] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasScope = messages.some(
    (m) => m.role === "assistant" && m.content.includes(SCOPE_START)
  );

  const getScopeText = () => {
    const msg = messages.find(
      (m) => m.role === "assistant" && m.content.includes(SCOPE_START)
    );
    if (!msg) return "";
    return extractScope(msg.content)?.scope ?? "";
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingText]);

  async function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setIsStreaming(true);
    setStreamingText("");

    // Build API messages: skip hard-coded greeting (index 0), start from first user msg
    const apiMessages = updated.slice(1).map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch("/api/scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Network error");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setStreamingText(fullText);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fullText },
      ]);
      setStreamingText("");
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong on my end. Please try again.",
        },
      ]);
      setStreamingText("");
    } finally {
      setIsStreaming(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  async function sendProposal() {
    if (!email || !email.includes("@")) {
      setProposalError("Please enter a valid email address.");
      return;
    }
    setSendingProposal(true);
    setProposalError("");

    const scopeText = getScopeText();
    const conversation = messages
      .slice(1)
      .map((m) => `${m.role === "user" ? "Client" : "Scoper"}: ${m.content}`)
      .join("\n\n");

    try {
      const res = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Project Scoper Lead",
          email,
          project_description: `[PROJECT SCOPER LEAD]\n\n--- SCOPE ---\n${scopeText}\n\n--- FULL CONVERSATION ---\n${conversation}`,
          budget: "",
          timeline: "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setProposalSent(true);
    } catch (err) {
      setProposalError(
        err instanceof Error ? err.message : "Failed to send. Please try again."
      );
    } finally {
      setSendingProposal(false);
    }
  }

  function reset() {
    setMessages([{ role: "assistant", content: GREETING }]);
    setInput("");
    setStreamingText("");
    setEmail("");
    setProposalSent(false);
    setProposalError("");
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <div className="mt-6 bg-white/[0.03] border border-blue-500/20 rounded-2xl overflow-hidden max-w-2xl">
      {/* Header */}
      <div className="px-5 py-3 border-b border-white/[0.06] flex items-center gap-2.5">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-white/50 font-medium">
          Project Scoper — Live
        </span>
        <span className="ml-auto text-[10px] text-white/20">
          Powered by Claude
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="h-80 overflow-y-auto px-5 py-5 space-y-5 scroll-smooth"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}
      >
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}

        {isStreaming && (
          streamingText ? (
            <MessageBubble
              msg={{ role: "assistant", content: streamingText }}
              isStreaming
            />
          ) : (
            <TypingDots />
          )
        )}
      </div>

      {/* Email capture — appears after scope is generated */}
      {hasScope && !proposalSent && (
        <div className="px-5 py-4 border-t border-blue-500/20 bg-blue-500/5">
          <p className="text-xs text-white/40 mb-2.5">
            Get the full proposal with architecture diagrams + firm quote
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendProposal()}
              placeholder="your@email.com"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 transition"
            />
            <button
              onClick={sendProposal}
              disabled={sendingProposal}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity-50 whitespace-nowrap"
            >
              {sendingProposal ? "Sending..." : "Get Proposal →"}
            </button>
          </div>
          {proposalError && (
            <p className="text-red-400 text-xs mt-1.5">{proposalError}</p>
          )}
        </div>
      )}

      {/* Proposal sent confirmation */}
      {proposalSent && (
        <div className="px-5 py-4 border-t border-green-500/20 bg-green-500/5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-green-400">
              ✓ Proposal sent to {email}
            </p>
            <p className="text-xs text-white/30 mt-0.5">
              EdgeConductor will follow up within 24 hours
            </p>
          </div>
          <button
            onClick={reset}
            className="text-xs text-white/30 hover:text-white/60 transition ml-4"
          >
            Start over
          </button>
        </div>
      )}

      {/* Input bar */}
      {!proposalSent && (
        <div className="px-4 py-3.5 border-t border-white/[0.06]">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isStreaming ? "Scoper is thinking..." : "Type your message..."
              }
              disabled={isStreaming}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 disabled:opacity-40 transition"
            />
            <button
              onClick={sendMessage}
              disabled={isStreaming || !input.trim()}
              className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-white/90 active:bg-white/80 transition disabled:opacity-25"
            >
              {isStreaming ? "..." : "Send"}
            </button>
          </div>
          <p className="text-[10px] text-white/15 mt-1.5 px-1">
            Enter to send · This conversation is scoped by an AI agent
          </p>
        </div>
      )}
    </div>
  );
}
