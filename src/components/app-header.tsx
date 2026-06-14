import { Bell, Search, ChevronDown, UserCircle2 } from "lucide-react";
import { useRouterState, Link } from "@tanstack/react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useSelectedMember } from "@/lib/selected-member-context";

export function AppHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onPortal = pathname.startsWith("/portal");
  const { member, members, setMemberId } = useSelectedMember();

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mx-1 h-5" />
      <div className="relative hidden md:block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Rechercher un membre, un vol, un appareil…" className="h-9 w-[340px] pl-8" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        {onPortal ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <UserCircle2 className="h-4 w-4 text-accent" />
                <Badge variant="secondary" className="rounded-sm px-1.5 text-[10px] font-semibold uppercase tracking-wide">
                  Agir comme
                </Badge>
                <span className="hidden text-xs font-medium sm:inline">{member.name}</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Sélectionner le membre</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {members.map((m) => (
                <DropdownMenuItem key={m.id} onClick={() => setMemberId(m.id)} className="flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-sm">{m.name}</span>
                    <span className="text-[10px] text-muted-foreground">{m.id} · {m.category}</span>
                  </div>
                  {m.id === member.id && <Badge variant="secondary" className="text-[10px]">Actif</Badge>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link to="/portal">
              <UserCircle2 className="h-4 w-4" />
              <span className="hidden text-xs sm:inline">Vue membre</span>
            </Link>
          </Button>
        )}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
        </Button>
      </div>
    </header>
  );
}
