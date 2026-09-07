"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { getVisibleTerminalCommands, resolveTerminalCommand, type TerminalAction } from "@/lib/lab-terminal";

function runAction(action?: TerminalAction) {
  if (!action) return;
  if (action.kind === "scroll") {
    document.getElementById(action.target)?.scrollIntoView({ behavior: "smooth" });
  } else if (action.kind === "open") {
    window.open(action.target, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = action.target;
  }
}

export function CompactTerminal() {
  const [command, setCommand] = useState("");
  const [message, setMessage] = useState("Type a command or choose one below.");
  const inputRef = useRef<HTMLInputElement>(null);
  const commands = getVisibleTerminalCommands();

  useEffect(() => {
    const focusWithSlash = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key !== "/" || target.matches("input, textarea, select")) return;
      event.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", focusWithSlash);
    return () => window.removeEventListener("keydown", focusWithSlash);
  }, []);

  const execute = (value: string) => {
    const result = resolveTerminalCommand(value);
    setCommand("");
    setMessage(result.clear ? "Terminal cleared." : result.output);
    window.setTimeout(() => runAction(result.action), 300);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (command.trim()) execute(command);
  };

  return (
    <div className="mt-8 max-w-2xl font-mono" role="region" aria-label="Portfolio command bar">
      <form onSubmit={submit} className="flex items-center border border-accent/40 bg-surface-deep/90 px-4 py-3 shadow-[0_0_30px_rgba(102,255,138,0.06)] transition-colors focus-within:border-accent">
        <label htmlFor="hero-command" className="sr-only">Enter a portfolio command</label>
        <span className="mr-2 shrink-0 text-xs text-accent sm:text-sm">viraj@portfolio:~$</span>
        <input
          ref={inputRef}
          id="hero-command"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-heading caret-accent outline-none placeholder:text-body-muted sm:text-base"
        />
        <kbd className="ml-3 hidden border border-border px-2 py-1 text-[10px] text-body-muted sm:block">/</kbd>
      </form>

      <div className="mt-3 flex flex-wrap gap-2" aria-label="Available commands">
        {commands.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => execute(item)}
            className="border border-border bg-surface-deep/70 px-2.5 py-1 text-[11px] text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-2 min-h-5 text-xs text-body-muted" aria-live="polite">{message}</p>
    </div>
  );
}
