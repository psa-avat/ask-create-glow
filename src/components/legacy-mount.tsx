import { MemoryRouter } from "react-router";
import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import "@/legacy/i18n";

interface LegacyMountProps {
  children: ReactNode;
  /** Map of hash -> tab id used by the legacy WorkspaceShell (?tab=) */
  hashToTab?: Record<string, string>;
  /** Default tab when no hash is set */
  defaultTab?: string;
}

/**
 * Wraps legacy (react-router-dom) pages so they can be mounted inside our
 * TanStack Router app. Translates the current TanStack hash (#billing,
 * #packs, ...) into an initial `?tab=` search param that the legacy
 * WorkspaceShell understands.
 */
export function LegacyMount({ children, hashToTab, defaultTab }: LegacyMountProps) {
  const hash = useRouterState({ select: (s) => (s.location.hash ?? "").replace(/^#/, "") });
  const tab = (hashToTab && hash && hashToTab[hash]) || defaultTab;
  const initial = tab ? `/?tab=${tab}` : "/";
  // Remount on hash change so MemoryRouter picks up the new initial entry.
  return (
    <MemoryRouter key={initial} initialEntries={[initial]}>
      {children}
    </MemoryRouter>
  );
}
