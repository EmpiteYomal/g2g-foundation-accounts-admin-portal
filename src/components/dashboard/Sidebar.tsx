"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  FileText,
  X,
  Settings,
  ArrowLeftRight,
  Heart,
  HandCoins,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    section: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
    ],
  },
  {
    section: "Companies",
    items: [
      { href: "/dashboard/companies", label: "Companies", icon: Building2, exact: true },
      { href: "/dashboard/companies/pending", label: "Pending Approvals", icon: ClipboardList, badge: "4", exact: true },
    ],
  },
  {
    section: "Operations",
    items: [
      { href: "/dashboard/reconciliation", label: "Bank Reconciliation", icon: ArrowLeftRight, badge: "12" },
      { href: "/dashboard/transfers", label: "Fund Transfers", icon: HandCoins, badge: "5" },
    ],
  },
  {
    section: "Configuration",
    items: [
      { href: "/dashboard/charities", label: "Charity Registry", icon: Heart },
      { href: "/dashboard/reports", label: "Reports", icon: FileText },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

const bottomItems = [
  { href: "/dashboard/audit", label: "Audit Log", icon: ShieldCheck },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact = false) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const NavContent = () => (
    <nav className="flex flex-col h-full py-4">
      {/* Logo */}
      <div className="px-4 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Good2Give" className="h-9 w-auto" />
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto px-3 space-y-5">
        {navItems.map((group) => (
          <div key={group.section}>
            <p className="text-muted-foreground/60 text-xs font-semibold uppercase tracking-wider px-2 mb-1.5">
              {group.section}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.href, "exact" in item ? item.exact : false);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all group",
                      active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    )}
                  >
                    <item.icon className={cn(
                      "w-4 h-4 flex-shrink-0 transition-colors",
                      active ? "text-primary" : "text-muted-foreground/50 group-hover:text-muted-foreground"
                    )} />
                    <span className="flex-1">{item.label}</span>
                    {"badge" in item && item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full bg-primary text-white text-xs font-semibold min-w-[18px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom items */}
      <div className="px-3 mt-4 pt-4 border-t border-border space-y-0.5">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all group"
          >
            <item.icon className="w-4 h-4 flex-shrink-0 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
            {item.label}
          </Link>
        ))}
      </div>

      {/* User */}
      <div className="mx-3 mt-3 px-3 py-2.5 rounded-xl bg-muted/50 border border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">SA</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-foreground text-sm font-semibold truncate">Sarah Admin</p>
          <p className="text-muted-foreground text-xs truncate">Super Admin</p>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-300 lg:hidden",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <NavContent />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex w-60 bg-white border-r border-border flex-col flex-shrink-0">
        <NavContent />
      </div>
    </>
  );
}
