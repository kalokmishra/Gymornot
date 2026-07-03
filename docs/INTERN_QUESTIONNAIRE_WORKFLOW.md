Intern Questionnaire Update Flow
===============================

Purpose
-------
This guide explains a simple, repeatable flow interns should follow to update the quiz/questionnaire using Google Sheets and the admin UI.

Prerequisites
-------------
- A GitHub account and membership in `ADMIN_USERS` (ask repo admin to add your email). 
- Access to the Google Sheet with the questions (shareable/exportable or public link).
- Local dev: `npm install` and `npm run dev` (for local verification).

Sheet format (required headers)
--------------------------------
Use the sheet column headers exactly as below (first row):

id, eyebrow, prompt, option1_label, option1_score, option2_label, option2_score, option3_label, option3_score, option4_label, option4_score

Rules
- `id`: short unique identifier (e.g., q101). Required.
- `prompt`: plain text question/prompt. Required.
- `option*_score`: numeric (recommended 0–100). Required when an option label exists.
- Provide between 2 and 4 options per question. Leave unused option columns blank.
- Use full URLs in option text if referencing images/media.

Step-by-step flow
------------------
1. Edit the Google Sheet
   - Make changes in the shared Google Sheet. Keep a short edit note in a separate column if desired.

2. Preview in Admin UI
   - Open the site and sign in: `/admin` (use GitHub sign-in or password flow).
   - Under "Import from Google Sheet", paste the `Spreadsheet ID` and `GID`.
     - Spreadsheet ID is the long string in the sheet URL: `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/...`
     - `GID` is the sheet tab id (default `0`).
   - Click **Preview sheet**. The server will parse the sheet and show the parsed questions.

3. Validate preview
   - Confirm each previewed question has:
     - an `id`, non-empty `prompt`, and at least 2 options with numeric scores.
     - no duplicate `id`s (fix in the sheet if duplicates exist).
   - Spot-check 5 random items for correctness and tone.

4. Import (write) to repo
   - In Admin UI click **Import sheet** (this writes `lib/questions.json` on the server).
   - The action appends an audit entry to `logs/upload-audit.jsonl` capturing who performed the import and counts.

5. Verify in app (local or staging)
   - If running locally: pull the updated `lib/questions.json` (or re-run the sync script) and start the app:

```bash
npm run dev
curl http://localhost:3000/api/quiz-data
```

   - Open the quiz UI and run through a quick session to ensure rendering and scoring behave as expected.

6. Commit (optional, recommended for repo history)
   - If you want the change tracked in Git history, create a branch and commit `lib/questions.json`:

```bash
git checkout -b update/questions-sheet-<date>
git add lib/questions.json
git commit -m "Update questions from sheet <SPREADSHEET_ID>"
git push origin HEAD
# open a PR for review
```

Rollback procedure (if import causes issues)
------------------------------------------
- If the import was recent, revert `lib/questions.json` to the previous commit:

```bash
git checkout HEAD~1 -- lib/questions.json
git commit -m "Revert questionnaire to previous version"
git push origin HEAD
```

- Or restore from `logs/upload-audit.jsonl` entry that contains the timestamp and re-run a previous snapshot.

Audit & QA
----------
- Uploads are logged to `logs/upload-audit.jsonl`. Admins can view/download via `/admin/audit`.
- After import, check the audit log entry for your import and confirm `questionCount`.

Best practices & tips
---------------------
- Keep IDs stable when editing existing questions — changing an `id` looks like a delete + add.
- Prefer round scores (0, 25, 50, 75, 100) for consistency.
- Use the Preview step liberally — it catches most parse and formatting issues.
- If many edits are needed, group them in one sheet update and preview before importing.

Support
-------
If you hit problems, contact the repo maintainer (add contact info here) and include:
- Spreadsheet ID and GID
- a short description of the issue
- a screenshot of the Preview (if applicable)

---
This document is intended to keep the questionnaire workflow simple and auditable for interns updating quiz content.
