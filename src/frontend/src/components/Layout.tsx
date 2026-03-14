import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Shield } from "lucide-react";
import type { ReactNode } from "react";
import type { View } from "../App";

interface LayoutProps {
  children: ReactNode;
  navigate: (v: View) => void;
  currentView: View;
}

export default function Layout({
  children,
  navigate,
  currentView,
}: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-xs">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate({ page: "home" })}
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base font-bold text-foreground leading-tight">
                Board Exam Papers
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">
                Class 1–12 Question Bank
              </span>
            </div>
          </button>

          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ page: "home" })}
              className={
                currentView.page === "home" ? "text-primary bg-accent" : ""
              }
              data-ocid="nav.primary_button"
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              Papers
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ page: "admin" })}
              className={
                currentView.page === "admin" ? "text-primary bg-accent" : ""
              }
              data-ocid="nav.secondary_button"
            >
              <Shield className="w-4 h-4 mr-1.5" />
              Admin
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-white py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
