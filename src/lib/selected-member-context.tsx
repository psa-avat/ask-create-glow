import { createContext, useContext, useState, useMemo, type ReactNode } from "react";
import { members } from "./mock-data";

type Member = (typeof members)[number];

interface SelectedMemberCtx {
  member: Member;
  setMemberId: (id: string) => void;
  members: Member[];
}

const Ctx = createContext<SelectedMemberCtx | null>(null);

export function SelectedMemberProvider({ children }: { children: ReactNode }) {
  const [id, setMemberId] = useState<string>(members[0].id);
  const value = useMemo<SelectedMemberCtx>(
    () => ({
      member: members.find((m) => m.id === id) ?? members[0],
      setMemberId,
      members,
    }),
    [id],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSelectedMember() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSelectedMember must be used within SelectedMemberProvider");
  return ctx;
}
