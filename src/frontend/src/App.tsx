import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import Layout from "./components/Layout";
import type { ExamPaper } from "./data/examData";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import PaperDetailPage from "./pages/PaperDetailPage";
import PapersPage from "./pages/PapersPage";
import SubjectsPage from "./pages/SubjectsPage";

export type View =
  | { page: "home" }
  | { page: "subjects"; classId: string }
  | { page: "papers"; classId: string; subjectId: string }
  | { page: "paper"; paperId: string }
  | { page: "admin" };

export default function App() {
  const [view, setView] = useState<View>({ page: "home" });
  const [extraPapers, setExtraPapers] = useState<ExamPaper[]>([]);

  const navigate = (v: View) => setView(v);

  return (
    <Layout navigate={navigate} currentView={view}>
      {view.page === "home" && <HomePage navigate={navigate} />}
      {view.page === "subjects" && (
        <SubjectsPage classId={view.classId} navigate={navigate} />
      )}
      {view.page === "papers" && (
        <PapersPage
          classId={view.classId}
          subjectId={view.subjectId}
          navigate={navigate}
          extraPapers={extraPapers}
        />
      )}
      {view.page === "paper" && (
        <PaperDetailPage
          paperId={view.paperId}
          navigate={navigate}
          extraPapers={extraPapers}
        />
      )}
      {view.page === "admin" && (
        <AdminPage
          navigate={navigate}
          extraPapers={extraPapers}
          setExtraPapers={setExtraPapers}
        />
      )}
      <Toaster />
    </Layout>
  );
}
