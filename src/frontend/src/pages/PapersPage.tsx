import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  HelpCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { View } from "../App";
import { CLASSES, EXAM_PAPERS, getSubjectsForClass } from "../data/examData";
import type { ExamPaper } from "../data/examData";

interface PapersPageProps {
  classId: string;
  subjectId: string;
  navigate: (v: View) => void;
  extraPapers: ExamPaper[];
}

const YEARS = ["All", "2024", "2023", "2022"] as const;

export default function PapersPage({
  classId,
  subjectId,
  navigate,
  extraPapers,
}: PapersPageProps) {
  const [yearFilter, setYearFilter] = useState<string>("All");
  const cls = CLASSES.find((c) => c.id === classId);
  const subjects = getSubjectsForClass(classId);
  const subject = subjects.find((s) => s.id === subjectId);

  const allPapers = [...EXAM_PAPERS, ...extraPapers];
  const papers = allPapers.filter(
    (p) => p.classId === classId && p.subject === subjectId,
  );
  const filtered =
    yearFilter === "All"
      ? papers
      : papers.filter((p) => p.year === Number.parseInt(yearFilter));

  if (!cls || !subject) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate({ page: "home" })}
              className="cursor-pointer"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigate({ page: "subjects", classId })}
              className="cursor-pointer"
            >
              {cls.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{subject.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            {subject.icon} {subject.name}
          </h1>
          <p className="text-muted-foreground mt-1">
            {cls.label} Board Examination Papers
          </p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          {papers.length} Papers
        </Badge>
      </div>

      <Tabs value={yearFilter} onValueChange={setYearFilter} className="mb-6">
        <TabsList data-ocid="papers.year_filter.tab">
          {YEARS.map((y) => (
            <TabsTrigger key={y} value={y}>
              {y}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <div
          data-ocid="papers.empty_state"
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <FileText className="w-12 h-12 text-muted-foreground/40 mb-4" />
          <p className="font-heading font-semibold text-foreground mb-1">
            No papers found
          </p>
          <p className="text-muted-foreground text-sm">
            Try a different year filter or check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((paper, idx) => (
            <motion.button
              key={paper.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate({ page: "paper", paperId: paper.id })}
              data-ocid={`papers.paper_card.item.${idx + 1}`}
              className="flex flex-col items-start gap-0 p-5 bg-card rounded-xl border border-border hover:border-primary/40 hover:shadow-card transition-all duration-200 text-left w-full group"
            >
              <div className="flex items-start justify-between w-full mb-3">
                <Badge variant="outline" className="text-xs">
                  {paper.year}
                </Badge>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-primary/70 transition-colors" />
              </div>
              <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                {paper.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  {paper.questions.length} Questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {paper.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {paper.totalMarks} Marks
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
