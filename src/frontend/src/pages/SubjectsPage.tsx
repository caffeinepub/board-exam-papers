import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import type { View } from "../App";
import { CLASSES, getSubjectsForClass } from "../data/examData";

interface SubjectsPageProps {
  classId: string;
  navigate: (v: View) => void;
}

export default function SubjectsPage({ classId, navigate }: SubjectsPageProps) {
  const cls = CLASSES.find((c) => c.id === classId);
  const subjects = getSubjectsForClass(classId);

  if (!cls) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate({ page: "home" })}
              className="cursor-pointer"
              data-ocid="subjects.nav.link"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{cls.label}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
          {cls.label} — Subjects
        </h1>
        <p className="text-muted-foreground mt-1">
          Select a subject to view exam papers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((subject, idx) => (
          <motion.button
            key={subject.id}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.07 }}
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              navigate({ page: "papers", classId, subjectId: subject.id })
            }
            data-ocid={`subjects.subject_card.item.${idx + 1}`}
            className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-card transition-all duration-200 text-left group"
          >
            <span className="text-3xl">{subject.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                {subject.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {cls.label} — Board Papers
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary/70 mt-0.5 shrink-0 transition-colors" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
