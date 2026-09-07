export type TerminalAction = {
  kind: "scroll" | "open" | "email";
  target: string;
};

export type TerminalResult = {
  output: string;
  action?: TerminalAction;
  clear?: boolean;
};

const commands: Record<string, TerminalResult> = {
  help: { output: "Available commands: projects, experience, skills, gallery, github, contact, clear" },
  projects: { output: "Opening projects...", action: { kind: "scroll", target: "portfolio" } },
  experience: { output: "Opening experience...", action: { kind: "scroll", target: "experience" } },
  skills: { output: "Opening skills...", action: { kind: "scroll", target: "services" } },
  gallery: { output: "Opening gallery...", action: { kind: "scroll", target: "gallery" } },
  github: { output: "Opening GitHub...", action: { kind: "open", target: "https://github.com/Ghost-af16" } },
  contact: { output: "Opening email...", action: { kind: "email", target: "mailto:virajmuz16@gmail.com" } },
  clear: { output: "", clear: true },
};

const visibleCommands = ["projects", "experience", "skills", "gallery", "github", "contact"] as const;

export function getVisibleTerminalCommands() {
  return [...visibleCommands];
}

export function resolveTerminalCommand(rawCommand: string): TerminalResult {
  const command = rawCommand.trim().toLowerCase();
  if (commands[command]) return commands[command];
  return { output: `Command not found: "${command}". Type "help" to see available commands.` };
}
