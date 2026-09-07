import { describe, expect, it } from "vitest";
import { getVisibleTerminalCommands, resolveTerminalCommand } from "../src/lib/lab-terminal";

describe("resolveTerminalCommand", () => {
  it("normalizes commands and returns the matching section", () => {
    expect(resolveTerminalCommand("  PROJECTS ")).toEqual({
      output: "Opening projects...",
      action: { kind: "scroll", target: "portfolio" },
    });
  });

  it("returns the GitHub destination", () => {
    expect(resolveTerminalCommand("github")).toEqual({
      output: "Opening GitHub...",
      action: { kind: "open", target: "https://github.com/Ghost-af16" },
    });
  });

  it("returns a useful message for an unknown command", () => {
    expect(resolveTerminalCommand("launch")).toEqual({
      output: 'Command not found: "launch". Type "help" to see available commands.',
    });
  });

  it("clears the terminal", () => {
    expect(resolveTerminalCommand("clear")).toEqual({ output: "", clear: true });
  });

  it("shows every navigation command in the compact bar", () => {
    expect(getVisibleTerminalCommands()).toEqual([
      "projects",
      "experience",
      "skills",
      "gallery",
      "github",
      "contact",
    ]);
  });
});
