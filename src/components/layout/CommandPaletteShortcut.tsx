import { useEffect } from "react";

const CommandPaletteShortcut = () => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        // In a real app, open the command palette here
        alert("Command palette shortcut triggered (⌘K / Ctrl+K)");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  return null;
};

export default CommandPaletteShortcut;