"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BookOpen, Gauge, HeartPulse, Home, LogOut, MapPin, Menu, Sparkles, Stethoscope, UserRound, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import LanguageControl from "@/components/LanguageControl";
import { ThemeControls } from "@/components/ThemeSystem";
import { useLanguage } from "@/lib/useLanguage";

type User = { id: number; role: "patient" | "doctor" | "admin"; fullName: string };

const roleLabel = { patient: "Patient", doctor: "Clinician", admin: "Administrator" } as const;
const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?";

export default function SiteNav() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname() ?? "";
  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setUser(data?.user ?? null))
      .catch(() => setUser(null));
  }, []);
  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.assign("/");
  }
  const dashboard = user?.role === "admin" ? "/admin/dashboard" : user?.role === "doctor" ? "/doctor/dashboard" : "/dashboard";
  const links = [
    { href: "/", key: "home", icon: Home },
    { href: "/hospitals", key: "hospitals", icon: HeartPulse },
    { href: "/map", key: "map", icon: MapPin },
    { href: "/symptoms", key: "symptoms", icon: Stethoscope },
    { href: "/risk", key: "risk", icon: Gauge },
    { href: "/wellness", key: "wellness", icon: Sparkles },
    { href: "/tools", key: "tools", icon: Wrench },
  ];
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  return (
    <header className="topbar">
      <Link href="/" className="brand">
        <span className="brand-mark"><Activity size={20} /></span>
        <span className="brand-name">NEXORA</span>
      </Link>
      <button className="btn btn-secondary mobile-menu" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
        <Menu size={18} />
      </button>
      <nav className={`nav-links ${open ? "nav-open" : ""}`} aria-label="Main navigation">
        {links.map(({ href, key, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={isActive(href) ? "active" : ""}
            onClick={() => setOpen(false)}
          >
            <Icon size={16} />
            <span>{t(key)}</span>
          </Link>
        ))}
      </nav>
      <div className="nav-actions">
        <LanguageControl />
        <ThemeControls />
        {user ? (
          <>
            <Link className="btn btn-secondary" href={dashboard}>
              <UserRound size={16} />
              <span>{user.fullName.split(" ")[0]}</span>
            </Link>
            <button className="btn btn-quiet" onClick={signOut} aria-label={t("signout")} title={t("signout")}>
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <Link className="btn btn-pill-primary" href="/login">
            <span>Sign In / Register</span>
          </Link>
        )}
      </div>
    </header>
  );
}
