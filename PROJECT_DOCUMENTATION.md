# UET Taxila Resource Hub - Full Implementation Documentation

## Project Overview
- **Stack**: React 19, Vite 7, TypeScript 5.9, Tailwind CSS v4, Supabase (PostgreSQL + Auth).
- **Architecture**: A Single Page Application (SPA) built with React. The frontend handles routing via HashRouter (ideal for static hosting). The application relies entirely on Supabase for the backend, communicating through highly secure, pre-defined Remote Procedure Calls (RPCs). 

## Frontend
- **Folder Structure**: Inside `src/`:
  - `components/`: Reusable UI elements (`Navbar.tsx`, `Footer.tsx`, `ResourceCard.tsx`, `ResourceDetailModal.tsx`, `Reveal.tsx`, `ScrollProgress.tsx`).
  - `pages/`: Core route pages (`HomePage.tsx`, `BrowsePage.tsx`, `SubmitPage.tsx`, `SearchPage.tsx`, `ContactPage.tsx`).
  - `pages/admin/`: Admin panel components (`AdminDashboard.tsx`, `AdminLoginPage.tsx`, `CategoryManager.tsx`, `ModeratorsManager.tsx`, `SubmissionsManager.tsx`).
  - `lib/`: External wrappers (mainly `supabase.js`).
  - `data/`: Static fallback configurations (`courses.js`).
- **Pages & Routing**: Managed by `react-router-dom`'s `<HashRouter>`. Includes a root layout swapping between a Public Layout (with standard Navbar/Footer) and an Admin Layout interface without them.
- **State Management**: Handled via local React hooks (`useState`, `useEffect`) and context where necessary. 
- **Styles**: Tailwind CSS integration configured via `@tailwindcss/vite` alongside global styling embedded in `index.css`. Framer Motion drives complex animations and layout transitions (like the resource modal appearances).

## Backend
- **Server Setup**: Serverless backend utilizing Supabase. There is no active monolithic server configuration like Express or NestJS.
- **Middleware & Controllers**: Logic functions as PostgreSQL PL/pgSQL stored procedures. Direct table CRUD operations are disabled. RPC endpoints serve as the API footprint.
- **Auth Logic**: 
  - **Super Admins**: Utilize actual JWT-based Supabase Authentication (`supabase.auth.signInWithPassword`).
  - **Moderators**: Log in via a predefined access key checked against the `moderators` table using the `check_moderator_key` RPC.
  - Client state manages sessions using `sessionStorage` under `uet_admin_v3`.

## Database
- **Schema & Models**:
  - `resources`: Primary table holding uploaded files. Fields: `id`, `title`, `type`, `department`, `semester`, `course_code`, `course_name`, `link`, `uploaded_by`, `description`, `status`, `report_count`, `admin_note`, etc.
  - `departments`: Institutional departments. Fields: `id`, `name`, `description`, `is_active`, `sort_order`.
  - `courses`: Curriculum definitions bound to departments. Fields: `id`, `department_id`, `semester`, `code`, `name`, `credit_hours`, `is_active`.
- **Relationships**: `courses` are linked continuously to `departments` (`department_id` REFERENCES `departments(id)` ON DELETE CASCADE).
- **Security**: The tables enforce extreme Row Level Security (RLS). Standard `read`/`write` policies are empty, enforcing a "Deny All" posture. Actions heavily depend on `SECURITY DEFINER` constraints running strictly through permitted functions. 
- **Migrations/Seed Data**: Maintained primarily through declarative `.sql` scripts (e.g., `SUPABASE_SETUP.sql`, `SUPABASE_CATEGORIES_SETUP.sql`) mapped directly down to the DB IDE. Included mock datasets for tests natively injected at DB setup.

## APIs
Mapped internally via `src/lib/supabase.js`.
| Category | Endpoint (RPC) | Request Signature / Body | Auth Required | Description |
|---|---|---|---|---|
| **Public** | `submit_resource` | `title`, `type`, `department`, `semester`, `courseCode`, `courseName`, `link`, `uploadedBy`, `description` | No | Submit a new resource |
| **Public** | `get_approved_resources` | Filters (`department`, `semester`, `courseCode`, etc.) | No | Fetch all public-approved resources |
| **Public** | `search_approved_resources` | `query`, Filters (`department`, `type`, etc.) | No | Full-text query across columns |
| **Public** | `increment_report` | `p_resource_id` | No | Increment report counter for a document |
| **Admin** | `admin_get_all_resources` | `p_dept` | Yes | Retrieves resources unrestricted by status |
| **Admin** | `admin_approve_resource`| `resource_id`, `note` | Yes | Update a resource's status to `approved` |
| **Admin** | `admin_reject_resource` | `resource_id`, `note` | Yes | Set a resource's status to `rejected` |
| **Categories** | `admin_create_course`| `department_id`, `semester`, `code`, `name`, etc. | Yes | Push new course schema mappings |

_Error Handling: All functions carry `try/catch` and `EXCEPTION WHEN OTHERS THEN` returning standardized structural responses (e.g. `{ success: false, error: SQLERRM }`)._

## Business Logic
- **Validations**: Hybrid implementation. Basic sanity constraints applied on the React Front (HTML5 constraints), strongly fortified in postgres functions (`char_length(trim(title)) >= 2`, `link ~* '^https?://'`, `semester BETWEEN 1 AND 8`). 
- **Core Rules**:
  - Content must default to a `pending` state upon submission.
  - An isolated administrative approval mechanism `admin_approve_resource` is required to project content to production feeds.

## Styles
- **Design System**: Leverages Neumorphism UI techniques mapping intense solid drop-shadow configurations (e.g., `9px 9px 16px rgb(163,177,198,0.6)` on backgrounds).
- **Color Palette & Typography**: Primary colors center around `#d6dae8` (soft grays) and `#5B4FE9` (Accent Purple). Core typography depends on web-imported `Plus Jakarta Sans` for robust headers alongside `DM Sans` for body legibility.
- **Responsive Breakpoints**: Configured dynamically through default responsive directives from Tailwind (`sm`, `md`, `lg`) applied dynamically utilizing classes like `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`.

## Environment & Config
1. Make sure to define `.env` configurations in the Root Folder.
   ```env
   VITE_SUPABASE_URL=https://[YOUR_INSTANCE].supabase.co
   VITE_SUPABASE_ANON_KEY=[YOUR_ANON_KEY_HERE]
   ```
2. **Setup Instructions**:
   - Install packages: `npm install`
   - Setup Local Dev Server: `npm run dev`
   - Test Build Configs: `npm run build`

## Folder Structure
```text
/
├── .env          
├── .gitignore          
├── SUPABASE_SETUP.sql             
├── SUPABASE_CATEGORIES_SETUP.sql  
├── STATS_OPTIMIZATION.sql         
├── package.json                   
├── package-lock.json      
├── tsconfig.json          
├── vite.config.ts         
├── index.html             
└── src/                   
    ├── App.tsx             
    ├── declarations.d.ts  
    ├── index.css            
    ├── main.tsx            
    ├── components/          
    │   ├── Footer.tsx
    │   ├── Navbar.tsx
    │   ├── ResourceCard.tsx
    │   ├── ResourceDetailModal.tsx
    │   ├── Reveal.tsx
    │   └── ScrollProgress.tsx
    ├── data/                
    │   └── courses.js
    ├── lib/                 
    │   └── supabase.js
    └── pages/               
        ├── BrowsePage.tsx
        ├── ContactPage.tsx
        ├── HomePage.tsx
        ├── SearchPage.tsx
        ├── SubmitPage.tsx
        └── admin/
            ├── AdminDashboard.tsx
            ├── AdminLoginPage.tsx
            ├── CategoryManager.tsx
            ├── ModeratorsManager.tsx
            └── SubmissionsManager.tsx
```
