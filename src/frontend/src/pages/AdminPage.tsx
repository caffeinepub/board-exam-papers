import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronUp,
  Lock,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { View } from "../App";
import type { ExamPaper, Question } from "../data/examData";
import { CLASSES, EXAM_PAPERS, getSubjectsForClass } from "../data/examData";

interface AdminPageProps {
  navigate: (v: View) => void;
  extraPapers: ExamPaper[];
  setExtraPapers: (papers: ExamPaper[]) => void;
}

export default function AdminPage({
  navigate: _navigate,
  extraPapers,
  setExtraPapers,
}: AdminPageProps) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [pwError, setPwError] = useState(false);

  // Paper form state
  const [paperDialogOpen, setPaperDialogOpen] = useState(false);
  const [paperClassId, setPaperClassId] = useState("");
  const [paperSubjectId, setPaperSubjectId] = useState("");
  const [paperYear, setPaperYear] = useState("2024");
  const [paperTitle, setPaperTitle] = useState("");
  const [paperDuration, setPaperDuration] = useState("3 Hours");
  const [paperMarks, setPaperMarks] = useState("80");

  // Question form state
  const [qDialogOpen, setQDialogOpen] = useState(false);
  const [selectedPaperId, setSelectedPaperId] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [questionMarks, setQuestionMarks] = useState("5");

  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(null);

  const handleLogin = () => {
    if (password === "admin123") {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  const allPapers = [...EXAM_PAPERS, ...extraPapers];

  const handleAddPaper = () => {
    if (!paperClassId || !paperSubjectId || !paperTitle) {
      toast.error("Please fill all required fields.");
      return;
    }
    const newPaper: ExamPaper = {
      id: `extra-${Date.now()}`,
      classId: paperClassId,
      subject: paperSubjectId,
      title: paperTitle,
      year: Number.parseInt(paperYear),
      duration: paperDuration,
      totalMarks: Number.parseInt(paperMarks) || 80,
      questions: [],
    };
    setExtraPapers([...extraPapers, newPaper]);
    setPaperDialogOpen(false);
    setPaperTitle("");
    setPaperClassId("");
    setPaperSubjectId("");
    toast.success("Paper added successfully!");
  };

  const handleAddQuestion = () => {
    if (!selectedPaperId || !questionText || !answerText) {
      toast.error("Please fill all required fields.");
      return;
    }
    const newQ: Question = {
      id: `q-${Date.now()}`,
      text: questionText,
      answer: answerText,
      marks: Number.parseInt(questionMarks) || 5,
    };
    const idx = extraPapers.findIndex((p) => p.id === selectedPaperId);
    if (idx >= 0) {
      const updated = [...extraPapers];
      updated[idx] = {
        ...updated[idx],
        questions: [...updated[idx].questions, newQ],
      };
      setExtraPapers(updated);
    }
    setQDialogOpen(false);
    setQuestionText("");
    setAnswerText("");
    toast.success("Question added successfully!");
  };

  const handleDeletePaper = (paperId: string) => {
    setExtraPapers(extraPapers.filter((p) => p.id !== paperId));
    toast.success("Paper deleted.");
  };

  const handleDeleteQuestion = (paperId: string, questionId: string) => {
    const idx = extraPapers.findIndex((p) => p.id === paperId);
    if (idx >= 0) {
      const updated = [...extraPapers];
      updated[idx] = {
        ...updated[idx],
        questions: updated[idx].questions.filter((q) => q.id !== questionId),
      };
      setExtraPapers(updated);
      toast.success("Question deleted.");
    }
  };

  if (!authed) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-8 shadow-card"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h1 className="font-heading text-xl font-bold">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter password to continue
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPwError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password"
                className={pwError ? "border-destructive" : ""}
                data-ocid="admin.paper_form.input"
              />
              {pwError && (
                <p
                  className="text-destructive text-xs mt-1"
                  data-ocid="admin.error_state"
                >
                  Incorrect password. Try again.
                </p>
              )}
            </div>
            <Button
              onClick={handleLogin}
              className="w-full gap-2"
              data-ocid="admin.submit_button"
            >
              <Lock className="w-4 h-4" />
              Login
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            Admin Panel
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage exam papers and questions
          </p>
        </div>
        <div className="flex gap-2">
          {/* Add Paper Dialog */}
          <Dialog open={paperDialogOpen} onOpenChange={setPaperDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="gap-2"
                data-ocid="admin.open_modal_button"
              >
                <Plus className="w-4 h-4" />
                Add Paper
              </Button>
            </DialogTrigger>
            <DialogContent data-ocid="admin.dialog">
              <DialogHeader>
                <DialogTitle>Add New Exam Paper</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <Label>Class *</Label>
                  <Select
                    value={paperClassId}
                    onValueChange={(v) => {
                      setPaperClassId(v);
                      setPaperSubjectId("");
                    }}
                  >
                    <SelectTrigger data-ocid="admin.paper_form.select">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {CLASSES.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {paperClassId && (
                  <div>
                    <Label>Subject *</Label>
                    <Select
                      value={paperSubjectId}
                      onValueChange={setPaperSubjectId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {getSubjectsForClass(paperClassId).map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Label>Paper Title *</Label>
                  <Input
                    value={paperTitle}
                    onChange={(e) => setPaperTitle(e.target.value)}
                    placeholder="e.g. Mathematics Board Exam 2024"
                    data-ocid="admin.paper_form.input"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>Year</Label>
                    <Input
                      value={paperYear}
                      onChange={(e) => setPaperYear(e.target.value)}
                      type="number"
                    />
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <Input
                      value={paperDuration}
                      onChange={(e) => setPaperDuration(e.target.value)}
                      placeholder="3 Hours"
                    />
                  </div>
                  <div>
                    <Label>Total Marks</Label>
                    <Input
                      value={paperMarks}
                      onChange={(e) => setPaperMarks(e.target.value)}
                      type="number"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddPaper}
                  className="w-full"
                  data-ocid="admin.submit_button"
                >
                  Add Paper
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Add Question Dialog */}
          <Dialog open={qDialogOpen} onOpenChange={setQDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                data-ocid="admin.open_modal_button"
              >
                <Plus className="w-4 h-4" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent data-ocid="admin.dialog">
              <DialogHeader>
                <DialogTitle>Add Question to Paper</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <Label>Select Paper *</Label>
                  <Select
                    value={selectedPaperId}
                    onValueChange={setSelectedPaperId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam paper" />
                    </SelectTrigger>
                    <SelectContent>
                      {extraPapers.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Question *</Label>
                  <Textarea
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Enter the question text..."
                    rows={3}
                    data-ocid="admin.paper_form.textarea"
                  />
                </div>
                <div>
                  <Label>Answer *</Label>
                  <Textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Enter the detailed answer..."
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Marks</Label>
                  <Input
                    value={questionMarks}
                    onChange={(e) => setQuestionMarks(e.target.value)}
                    type="number"
                    className="w-24"
                  />
                </div>
                <Button
                  onClick={handleAddQuestion}
                  className="w-full"
                  data-ocid="admin.submit_button"
                >
                  Add Question
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Papers List */}
      <div className="space-y-4">
        <div>
          <h2 className="font-heading font-bold text-lg mb-1">
            Your Added Papers
          </h2>
          <p className="text-muted-foreground text-sm">
            Papers added via admin panel ({extraPapers.length} papers)
          </p>
        </div>

        {extraPapers.length === 0 ? (
          <div
            data-ocid="admin.empty_state"
            className="bg-card border border-dashed border-border rounded-xl p-12 text-center"
          >
            <p className="text-muted-foreground">
              No papers added yet. Click "Add Paper" to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {extraPapers.map((paper, idx) => {
              const cls = CLASSES.find((c) => c.id === paper.classId);
              const subjects = getSubjectsForClass(paper.classId);
              const subject = subjects.find((s) => s.id === paper.subject);
              const isExpanded = expandedPaperId === paper.id;
              return (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-card border border-border rounded-xl overflow-hidden"
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-heading font-semibold text-foreground">
                          {paper.title}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {paper.year}
                        </Badge>
                        {cls && (
                          <Badge variant="secondary" className="text-xs">
                            {cls.label}
                          </Badge>
                        )}
                        {subject && (
                          <Badge variant="secondary" className="text-xs">
                            {subject.name}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {paper.questions.length} questions • {paper.duration} •{" "}
                        {paper.totalMarks} marks
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setExpandedPaperId(isExpanded ? null : paper.id)
                        }
                        className="gap-1"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                        {paper.questions.length} Q
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePaper(paper.id)}
                        data-ocid={`admin.delete_button.${idx + 1}`}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border">
                          {paper.questions.length === 0 ? (
                            <p className="text-sm text-muted-foreground p-4">
                              No questions yet. Use "Add Question" to add
                              questions to this paper.
                            </p>
                          ) : (
                            <div className="divide-y divide-border">
                              {paper.questions.map((q, qi) => (
                                <div
                                  key={q.id}
                                  className="flex items-start gap-3 p-4"
                                >
                                  <span className="w-6 h-6 shrink-0 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center mt-0.5">
                                    {qi + 1}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground">
                                      {q.text}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                      {q.answer}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteQuestion(paper.id, q.id)
                                    }
                                    className="text-destructive hover:text-destructive shrink-0"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Read-only built-in papers summary */}
      <div className="mt-10">
        <h2 className="font-heading font-bold text-lg mb-1">Built-in Papers</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Pre-loaded exam papers ({EXAM_PAPERS.length} total — read only)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {allPapers.slice(0, 9).map((paper) => {
            const cls = CLASSES.find((c) => c.id === paper.classId);
            return (
              <div
                key={paper.id}
                className="bg-muted/50 rounded-lg p-3 border border-border/50"
              >
                <p className="text-sm font-medium text-foreground truncate">
                  {paper.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {cls?.label} • {paper.questions.length} questions
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
