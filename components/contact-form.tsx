"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";

const MIN_LOADING_MS = 3000;

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin text-[var(--accent-foreground)]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export function ContactForm() {
  const reduce = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isComplete = useMemo(() => {
    return (
      name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0
    );
  }, [name, email, message]);

  const canSubmit = isComplete && !isLoading;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isComplete || isLoading) return;

    setIsLoading(true);
    await new Promise<void>((resolve) => {
      setTimeout(resolve, MIN_LOADING_MS);
    });

    setName("");
    setEmail("");
    setMessage("");
    toast.success("Your message was sent successfully.");
    setIsLoading(false);
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] shadow-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--ring)]";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-[var(--foreground)]">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={200}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-[var(--foreground)]">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={320}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-[var(--foreground)]">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={8000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} min-h-[120px] resize-y`}
        />
      </div>

      <motion.button
        type="submit"
        disabled={!canSubmit}
        className="inline-flex h-11 min-w-[140px] items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-medium text-[var(--accent-foreground)] shadow-md shadow-[var(--ring)] transition-opacity disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto cursor-pointer"
        whileHover={reduce || !canSubmit ? undefined : { scale: 1.02 }}
        whileTap={reduce || !canSubmit ? undefined : { scale: 0.98 }}
      >
        {isLoading ? <Spinner /> : "Send Message"}
      </motion.button>
    </form>
  );
}
