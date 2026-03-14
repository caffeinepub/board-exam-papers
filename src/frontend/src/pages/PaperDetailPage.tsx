import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { View } from "../App";
import { CLASSES, EXAM_PAPERS, getSubjectsForClass } from "../data/examData";
import type { ExamPaper } from "../data/examData";

interface PaperDetailPageProps {
  paperId: string;
  navigate: (v: View) => void;
  extraPapers: ExamPaper[];
}

export default function PaperDetailPage({
  paperId,
  navigate,
  extraPapers,
}: PaperDetailPageProps) {
  const allPapers = [...EXAM_PAPERS, ...extraPapers];
  const paper = allPapers.find((p) => p.id === paperId);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(
    new Set(),
  );
  const [showAll, setShowAll] = useState(false);

  if (!paper) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Paper not found.</p>
      </div>
    );
  }

  const cls = CLASSES.find((c) => c.id === paper.classId);
  const subjects = getSubjectsForClass(paper.classId);
  const subject = subjects.find((s) => s.id === paper.subject);

  const toggleAnswer = (qId: string) => {
    if (showAll) {
      setShowAll(false);
      const newSet = new Set(paper.questions.map((q) => q.id));
      newSet.delete(qId);
      setRevealedAnswers(newSet);
    } else {
      setRevealedAnswers((prev) => {
        const next = new Set(prev);
        if (next.has(qId)) next.delete(qId);
        else next.add(qId);
        return next;
      });
    }
  };

  const handleShowAll = () => {
    if (showAll) {
      setShowAll(false);
      setRevealedAnswers(new Set());
    } else {
      setShowAll(true);
      setRevealedAnswers(new Set(paper.questions.map((q) => q.id)));
    }
  };

  const isRevealed = (qId: string) => showAll || revealedAnswers.has(qId);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
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
          {cls && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() =>
                    navigate({ page: "subjects", classId: paper.classId })
                  }
                  className="cursor-pointer"
                >
                  {cls.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          {subject && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() =>
                    navigate({
                      page: "papers",
                      classId: paper.classId,
                      subjectId: paper.subject,
                    })
                  }
                  className="cursor-pointer"
                >
                  {subject.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage className="max-w-[140px] truncate">
              {paper.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Paper Header */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/60 rounded-2xl p-6 mb-8 border border-primary/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge className="mb-3">{paper.year}</Badge>
            <h1 className="font-heading text-xl md:text-2xl font-bold text-foreground">
              {paper.title}
            </h1>
            {cls && subject && (
              <p className="text-muted-foreground mt-1 text-sm">
                {cls.label} — {subject.name}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            {paper.questions.length} Questions
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {paper.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            Total Marks: {paper.totalMarks}
          </span>
        </div>
      </div>

      {/* Show All Button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-lg text-foreground">
          Questions &amp; Answers
        </h2>
        <Button
          variant={showAll ? "default" : "outline"}
          size="sm"
          onClick={handleShowAll}
          data-ocid="paper.show_all_button"
          className="gap-2"
        >
          {showAll ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          {showAll ? "Hide All Answers" : "Show All Answers"}
        </Button>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {paper.questions.map((q, idx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            data-ocid={`paper.question.item.${idx + 1}`}
            className="bg-card rounded-xl border border-border overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="text-foreground font-medium leading-relaxed">
                    {q.text}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground">
                      [{q.marks} marks]
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleAnswer(q.id)}
                      data-ocid={`paper.show_answer_button.${idx + 1}`}
                      className="h-7 px-3 text-xs gap-1.5 text-primary hover:text-primary"
                    >
                      {isRevealed(q.id) ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5" /> Hide Answer
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5" /> Show Answer
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isRevealed(q.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 ml-10 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-semibold mb-2">
                        <Eye className="w-3.5 h-3.5" />
                        Answer
                      </div>
                      <p className="text-emerald-900 text-sm leading-relaxed">
                        {q.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
