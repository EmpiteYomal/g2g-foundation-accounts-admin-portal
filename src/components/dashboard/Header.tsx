"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Menu, ChevronDown, CheckCircle2, AlertCircle, ArrowLeftRight, Building2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

const NOTIFICATIONS = [
  { id: 1, icon: Building2,     color: "text-amber-600",   bg: "bg-amber-50",   title: "New company sign-up",      body: "Woolworths Group has submitted an onboarding request.",  time: "Just now",    unread: true  },
  { id: 2, icon: ArrowLeftRight,color: "text-blue-600",    bg: "bg-blue-50",    title: "Reconciliation needed",    body: "12 unmatched transactions in the latest bank statement.", time: "1h ago",      unread: true  },
  { id: 3, icon: AlertCircle,   color: "text-amber-600",   bg: "bg-amber-50",   title: "Fund transfer pending",    body: "5 charity allocations awaiting admin approval.",          time: "3h ago",      unread: true  },
  { id: 4, icon: CheckCircle2,  color: "text-emerald-600", bg: "bg-emerald-50", title: "ABA file generated",       body: "ABA file for Cancer Council AU is ready to download.",    time: "Yesterday",   unread: false },
  { id: 5, icon: CheckCircle2,  color: "text-emerald-600", bg: "bg-emerald-50", title: "Reconciliation complete",  body: "April statement fully reconciled — 37 transactions.",      time: "2 days ago",  unread: false },
];

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="bg-white border-b border-border px-6 py-3.5 flex items-center gap-4 flex-shrink-0">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Page context — left side */}
      <div className="hidden lg:flex items-center gap-2.5 px-1 py-1">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-primary text-xs font-bold">GS</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">Goodstack Foundation Accounts</p>
          <p className="text-xs text-muted-foreground leading-tight">Admin Portal</p>
        </div>
      </div>

      <div className="flex-1" />

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Pending actions callout */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            4 pending
          </div>
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl text-muted-foreground hover:bg-muted/60 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary border-2 border-white" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-border shadow-xl z-50 overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">Notifications</p>
                    {unreadCount > 0 && (
                      <span className="text-xs font-semibold bg-primary text-white px-1.5 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-primary font-medium hover:underline">
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-border/60 max-h-96 overflow-y-auto">
                  {notifications.map((n) => {
                    const Icon = n.icon;
                    return (
                      <div
                        key={n.id}
                        onClick={() => setNotifications((prev) => prev.map((x) => x.id === n.id ? { ...x, unread: false } : x))}
                        className={`flex items-start gap-3 px-4 py-3.5 cursor-pointer transition-colors hover:bg-muted/30 ${n.unread ? "bg-primary/5" : ""}`}
                      >
                        <div className={`w-8 h-8 rounded-lg ${n.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Icon className={`w-4 h-4 ${n.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-semibold text-foreground">{n.title}</p>
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0">{n.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.body}</p>
                        </div>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-2" />}
                      </div>
                    );
                  })}
                </div>

                <div className="px-4 py-3 border-t border-border">
                  <p className="text-xs text-center text-muted-foreground">You&apos;re all caught up</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-muted/60 transition-colors outline-none">
            <Avatar className="w-7 h-7">
              <AvatarFallback className="bg-primary text-white text-xs font-bold">
                SA
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-foreground leading-tight">Sarah Admin</p>
              <p className="text-xs text-muted-foreground leading-tight">Super Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <p className="font-semibold text-foreground">Sarah Admin</p>
                <p className="text-xs text-muted-foreground">sarah@goodstack.org</p>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => window.location.href = "/dashboard/settings"}>
                Admin Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.location.href = "/dashboard/audit"}>
                Audit Log
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive" onClick={() => window.location.href = "/sign-in"}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
