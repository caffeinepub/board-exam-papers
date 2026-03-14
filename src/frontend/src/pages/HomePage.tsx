import { Award, BookOpen, ChevronRight, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import type { View } from "../App";
import { CLASSES } from "../data/examData";

interface HomePageProps {
  navigate: (v: View) => void;
}

const LEVEL_COLORS: Record<string, string> = {
  primary: "from-sky-50 to-blue-50 border-sky-200 hover:border-sky-400",
  middle:
    "from-violet-50 to-indigo-50 border-violet-200 hover:border-violet-400",
  secondary:
    "from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-400",
  senior: "from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400",
};

const LEVEL_BADGE: Record<string, string> = {
  primary: "bg-sky-100 text-sky-700",
  middle: "bg-violet-100 text-violet-700",
  secondary: "bg-emerald-100 text-emerald-700",
  senior: "bg-amber-100 text-amber-700",
};

const CIRCLES = Array.from({ length: 20 }, (_, i) => ({
  key: `circle-${i}`,
  width: `${((i % 5) + 1) * 20}px`,
  height: `${((i % 5) + 1) * 20}px`,
  left: `${(i * 17) % 100}%`,
  top: `${(i * 23) % 100}%`,
  opacity: 0.3 + (i % 4) * 0.1,
}));

export default function HomePage({ navigate }: HomePageProps) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-[oklch(0.28_0.16_264)] py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          {CIRCLES.map((c) => (
            <div
              key={c.key}
              className="absolute rounded-full bg-white"
              style={{
                width: c.width,
                height: c.height,
                left: c.left,
                top: c.top,
                opacity: c.opacity,
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-white/90 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              CBSE Board Examination Papers
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              All Class Exam Papers
              <br />
              <span className="text-[oklch(0.88_0.14_85)]">
                &amp; Answer Keys
              </span>
            </h1>
            <p className="text-white/80 text-lg max-w-lg">
              Access board examination question papers with detailed answers for
              Classes 1–12. Study smarter, score better.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-6 mt-8 text-white/70 text-sm"
          >
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>500+ Papers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>12 Classes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>Detailed Answers</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Class Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Select Your Class
          </h2>
          <p className="text-muted-foreground mt-1">
            Choose a class to browse exam papers by subject
          </p>
        </div>

        <div className="space-y-8">
          {(["primary", "middle", "secondary", "senior"] as const).map(
            (level, li) => {
              const levelClasses = CLASSES.filter((c) => c.level === level);
              const levelNames = {
                primary: "Primary (Class 1–5)",
                middle: "Middle (Class 6–8)",
                secondary: "Secondary (Class 9–10)",
                senior: "Senior Secondary (Class 11–12)",
              };
              return (
                <motion.div
                  key={level}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: li * 0.1 }}
                >
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                    {levelNames[level]}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {levelClasses.map((cls, idx) => {
                      const globalIdx =
                        CLASSES.findIndex((c) => c.id === cls.id) + 1;
                      return (
                        <motion.button
                          key={cls.id}
                          type="button"
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            navigate({ page: "subjects", classId: cls.id })
                          }
                          data-ocid={`home.class_select.item.${globalIdx}`}
                          className={`relative flex flex-col items-center justify-center p-5 rounded-xl border-2 bg-gradient-to-br transition-all duration-200 cursor-pointer group shadow-xs hover:shadow-card ${LEVEL_COLORS[cls.level]}`}
                        >
                          <span className="text-3xl font-heading font-black text-foreground">
                            {idx +
                              (level === "primary"
                                ? 1
                                : level === "middle"
                                  ? 6
                                  : level === "secondary"
                                    ? 9
                                    : 11)}
                          </span>
                          <span className="text-xs font-medium text-muted-foreground mt-1">
                            {cls.label}
                          </span>
                          <span
                            className={`mt-2 text-[10px] px-2 py-0.5 rounded-full font-medium ${LEVEL_BADGE[cls.level]}`}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </span>
                          <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            },
          )}
        </div>
      </section>
    </div>
  );
}
