## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Create `.env.local` and configure:
   - `VITE_GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Run the app:
   `npm run dev`

## Supabase persistence

The app now uses Supabase as the source of truth for:
- `profiles`
- `courses`
- `deadlines`
- `onboarding_states`

Expected columns:

### `profiles`
- `user_id` (unique, text/uuid)
- `name`, `degree`, `university_name`, `graduation_year`, `current_cgpa`, `target_gpa`, `semester`, `course_count`

### `courses`
- `id` (text)
- `user_id`
- `code`, `name`, `credits`, `grade_progress`, `impact_level`, `grade`, `weightage` (json)

### `deadlines`
- `id` (text)
- `user_id`
- `title`, `course`, `topic`, `due_date`, `priority`

### `onboarding_states`
- `user_id` (unique)
- `loadout_committed` (boolean)
- `committed_at` (timestamp nullable)
- `version` (number)
