# Board Exam Papers & Answers App

## Current State
New project. No existing implementation.

## Requested Changes (Diff)

### Add
- App for browsing board exam papers by class (1–12) and subject
- Each exam paper has multiple questions with answers
- Filter/browse by class, subject, and year
- Question viewer with show/hide answer toggle
- Admin can add/edit exam papers, questions, and answers
- Student view: read-only browsing

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Backend: Data models for Class, Subject, ExamPaper, Question (with answer)
2. Backend: CRUD operations for exam papers and questions
3. Backend: Query functions to filter papers by class/subject/year
4. Frontend: Landing/home page with class selector (1–12)
5. Frontend: Subject list page for selected class
6. Frontend: Exam paper list page with year filter
7. Frontend: Paper detail page with question list and answer reveal toggle
8. Frontend: Admin panel to add/manage papers and questions
