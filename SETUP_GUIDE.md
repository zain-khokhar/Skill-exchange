# SkillExchange — Complete Setup Guide

This guide covers every step needed to run the SkillExchange project from scratch, including Strapi CMS configuration, Cloudinary setup, email configuration, role creation, and API permissions.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Project Installation](#2-project-installation)
3. [Running the Project](#3-running-the-project)
4. [Backend (Strapi) Configuration](#4-backend-strapi-configuration)
   - 4.1 [Environment Variables](#41-environment-variables)
   - 4.2 [First-Time Admin Account](#42-first-time-admin-account)
   - 4.3 [Setting Up Roles (User / Editor / Admin)](#43-setting-up-roles-user--editor--admin)
   - 4.4 [Setting API Permissions](#44-setting-api-permissions)
5. [Cloudinary Configuration](#5-cloudinary-configuration)
6. [Email Service Configuration](#6-email-service-configuration)
7. [Frontend Configuration](#7-frontend-configuration)
8. [Database Notes](#8-database-notes)
9. [Project Architecture](#9-project-architecture)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Prerequisites

Before starting, make sure you have these installed:

| Tool     | Version Required | How to Check         | Download Link                          |
|----------|-----------------|----------------------|----------------------------------------|
| Node.js  | >= 20.x         | `node --version`     | https://nodejs.org/                    |
| npm      | >= 6.x          | `npm --version`      | Comes with Node.js                     |
| Git      | Any             | `git --version`      | https://git-scm.com/                   |

---

## 2. Project Installation

### Option A: Install everything at once (from root folder)

```bash
cd "Skill Exchange"
npm install          # installs concurrently (root)
npm run install:all  # installs both backend and frontend dependencies
```

### Option B: Install separately

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## 3. Running the Project

### Single Command (Recommended)

From the root `Skill Exchange` folder:

```bash
npm run dev
```

This runs **both** the backend (Strapi) and frontend (Next.js) simultaneously using `concurrently`. You will see color-coded output:
- **Blue** = Backend (Strapi) at `http://localhost:1337`
- **Green** = Frontend (Next.js) at `http://localhost:3000`

### Run Separately (if preferred)

**Terminal 1 — Backend:**
```bash
cd backend
npm run develop
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

### Important First-Run Note

On the very first run of Strapi, wait for the backend to fully start (you'll see `Strapi started` in the terminal) before opening the frontend. The first startup takes longer because Strapi creates the database tables.

---

## 4. Backend (Strapi) Configuration

### 4.1 Environment Variables

The backend `.env` file is located at `backend/.env`. A template is provided at `backend/.env.example`.

**Create or edit `backend/.env`:**

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1RandomString,key2RandomString,key3RandomString,key4RandomString
API_TOKEN_SALT=yourRandomApiTokenSalt
ADMIN_JWT_SECRET=yourRandomAdminJwtSecret
TRANSFER_TOKEN_SALT=yourRandomTransferTokenSalt
JWT_SECRET=yourRandomJwtSecret
ENCRYPTION_KEY=yourRandomEncryptionKey
```

**How to generate random keys:**
- Open a terminal and run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- Run it once for each key/salt value
- For `APP_KEYS`, generate 4 values and separate them with commas

### 4.2 First-Time Admin Account

1. Start the backend: `cd backend && npm run develop`
2. Open `http://localhost:1337/admin` in your browser
3. You will see a **registration form** for the first admin
4. Fill in:
   - **First Name:** Admin
   - **Last Name:** User
   - **Email:** admin@skillexchange.com (or any email)
   - **Password:** A strong password (min 8 characters)
5. Click **"Let's start"**

This creates the **Strapi Admin Panel** account (this is different from frontend user accounts).

### 4.3 Setting Up Roles (User / Editor / Admin)

The project supports **three roles** for frontend users: **Authenticated (regular user)**, **Editor**, and **Admin**. By default, Strapi only has "Authenticated" and "Public". You need to create the Editor and Admin roles.

#### Step-by-step:

1. Go to `http://localhost:1337/admin`
2. Navigate to **Settings** → **Users & Permissions Plugin** → **Roles**
3. You'll see two default roles: **Authenticated** and **Public**

#### Create "Admin" role:
1. Click **"Add new role"**
2. Name: `Admin`
3. Description: `Full access admin role`
4. Click **Save**

#### Create "Editor" role:
1. Click **"Add new role"**
2. Name: `Editor`
3. Description: `Can approve/reject skill posts`
4. Click **Save**

#### Assigning roles to users:
1. Go to **Content Manager** → **User** (under Users & Permissions)
2. Click on a user
3. In the **Role** dropdown, select the appropriate role (Authenticated, Editor, or Admin)
4. Check the **isAdmin** checkbox for admin users, or **isEditor** for editors
5. Click **Save**

> **Note:** To add the `isAdmin` and `isEditor` fields to the User content type:
> 1. Go to **Content-Type Builder** → **User** (under Users & Permissions)
> 2. Click **"Add another field"**
> 3. Choose **Boolean**, name it `isAdmin`, default to `false`
> 4. Add another **Boolean**, name it `isEditor`, default to `false`
> 5. Click **Save** (Strapi will restart)

### 4.4 Setting API Permissions

Go to **Settings** → **Users & Permissions Plugin** → **Roles** and configure permissions for each role:

#### Public Role (unauthenticated visitors):
| Content Type    | Permissions                  |
|----------------|------------------------------|
| Skill          | `find`, `findOne`            |
| Skill-Category | `find`, `findOne`            |
| FAQ            | `find`, `findOne`            |
| Page           | `find`, `findOne`            |
| Review         | `find`, `findOne`            |

#### Authenticated Role (logged-in regular users):
| Content Type    | Permissions                              |
|----------------|------------------------------------------|
| Skill          | `find`, `findOne`, `create`              |
| Skill-Category | `find`, `findOne`                        |
| Booking        | `find`, `findOne`, `create`, `update`    |
| Review         | `find`, `findOne`, `create`              |
| Report         | `find`, `findOne`, `create`              |
| FAQ            | `find`, `findOne`                        |
| Page           | `find`, `findOne`                        |

#### Editor Role:
| Content Type    | Permissions                              |
|----------------|------------------------------------------|
| Skill          | `find`, `findOne`, `create`, `update`    |
| Skill-Category | `find`, `findOne`                        |
| Booking        | `find`, `findOne`, `create`, `update`    |
| Review         | `find`, `findOne`, `create`              |
| Report         | `find`, `findOne`                        |
| FAQ            | `find`, `findOne`                        |
| Page           | `find`, `findOne`                        |

#### Admin Role:
| Content Type    | Permissions                              |
|----------------|------------------------------------------|
| Skill          | `find`, `findOne`, `create`, `update`, `delete` |
| Skill-Category | `find`, `findOne`, `create`, `update`, `delete` |
| Booking        | `find`, `findOne`, `create`, `update`, `delete` |
| Review         | `find`, `findOne`, `create`, `update`, `delete` |
| Report         | `find`, `findOne`, `create`, `update`, `delete` |
| FAQ            | `find`, `findOne`, `create`, `update`, `delete` |
| Page           | `find`, `findOne`, `create`, `update`, `delete` |

Also enable **Users-Permissions → User** routes for Admin:
- `find`, `findOne`, `update`

**How to set permissions:**
1. Click on a role name
2. Scroll down to the **Permissions** section
3. Expand each content type (e.g., "Skill")
4. Check the boxes for the allowed actions
5. Click **Save**

---

## 5. Cloudinary Configuration

Cloudinary is used for uploading skill images. It's free for development use.

### Step 1: Create a Cloudinary Account
1. Go to https://cloudinary.com/
2. Click **"Sign Up For Free"**
3. Fill in your details and create an account
4. Verify your email

### Step 2: Get Your Credentials
1. After logging in, you'll see the **Dashboard**
2. Note your **Cloud Name** (it looks like `dxxxxxxxx`)
3. You do NOT need API Key/Secret for unsigned uploads

### Step 3: Create an Upload Preset
1. Go to **Settings** → **Upload** tab
2. Scroll down to **Upload presets**
3. Click **"Add upload preset"**
4. Set:
   - **Upload preset name:** `skill-exchange` (or any name you want)
   - **Signing Mode:** `Unsigned` (important!)
   - **Folder:** `skill-exchange` (optional, keeps images organized)
5. Click **Save**

### Step 4: Update Frontend Environment
Edit `frontend/.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=skill-exchange
```

Replace `your_actual_cloud_name` with the Cloud Name from Step 2.

> **Without Cloudinary:** The app still works — users just won't be able to upload images for skill listings. All other features work normally.

---

## 6. Email Service Configuration

The project is configured to use the built-in **sendmail** provider by default. For production or if you want emails to actually send, configure SMTP.

### Option A: Gmail SMTP (Easiest for testing)

1. Go to your Google Account → **Security** → **2-Step Verification** → **App passwords**
2. Generate an app password for "Mail"
3. Edit `backend/config/plugins.ts`:

```ts
import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASS'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_FROM', 'noreply@skillexchange.com'),
        defaultReplyTo: env('SMTP_REPLY_TO', 'noreply@skillexchange.com'),
      },
    },
  },
});

export default config;
```

4. Add to `backend/.env`:

```env
SMTP_USER=your.email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=your.email@gmail.com
SMTP_REPLY_TO=your.email@gmail.com
```

### Option B: SendGrid

1. Create a free account at https://sendgrid.com/
2. Get an API key from Settings → API Keys
3. Install the provider: `cd backend && npm install @strapi/provider-email-sendgrid`
4. Update `plugins.ts` to use `'@strapi/provider-email-sendgrid'` as the provider

### Option C: Default (No actual emails sent)

The current configuration uses `sendmail`. On most development machines, emails won't actually send — the system will log them silently. This is fine for development and FYP demonstration. The booking and notification UI will still work.

---

## 7. Frontend Configuration

### Environment File

The frontend configuration is at `frontend/.env.local`:

```env
# Strapi Backend API URL
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### Key Points
- `NEXT_PUBLIC_STRAPI_URL` — Must match where Strapi is running. Default is `http://localhost:1337`
- Cloudinary values are optional — the app works without them (image uploads just won't work)
- After changing `.env.local`, restart the frontend (`Ctrl+C` then `npm run dev`)

---

## 8. Database Notes

### Development (Default) — SQLite
- No setup needed! SQLite is built into the project
- Database file is auto-created at `backend/.tmp/data.db`
- Perfect for development and FYP demonstrations

### Production — PostgreSQL
To use PostgreSQL:

1. Install PostgreSQL and create a database
2. Edit `backend/.env`:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=skill_exchange
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_SSL=false
```

3. Restart Strapi — it will auto-create tables

---

## 9. Project Architecture

```
Skill Exchange/
├── package.json         # Root - runs both with single command
├── SETUP_GUIDE.md       # This file
├── requirements.txt     # FYP requirements document
├── backend/             # Strapi v5 CMS
│   ├── config/          # Server, database, plugins, middleware config
│   ├── src/
│   │   ├── api/
│   │   │   ├── skill/           # Skill listings (offered & requested)
│   │   │   ├── skill-category/  # Skill categories
│   │   │   ├── booking/         # Skill exchange bookings
│   │   │   ├── review/          # Ratings & reviews
│   │   │   ├── report/          # Abuse reports
│   │   │   ├── faq/             # FAQ content (CMS-managed)
│   │   │   └── page/            # Static pages - About, Policies (CMS-managed)
│   │   └── index.ts             # Bootstrap seed data
│   └── .env                     # Backend environment variables
├── frontend/            # Next.js 14 Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js              # Home page
│   │   │   ├── about/               # About page
│   │   │   ├── faq/                 # FAQ page (from CMS)
│   │   │   ├── policies/            # Policies pages (from CMS)
│   │   │   ├── skills/              # Browse & detail pages
│   │   │   ├── login/               # Login
│   │   │   ├── register/            # Registration
│   │   │   ├── dashboard/           # User dashboard
│   │   │   │   ├── profile/         # Profile management
│   │   │   │   ├── my-skills/       # User's skills list
│   │   │   │   ├── offer-skill/     # Offer a skill
│   │   │   │   ├── request-skill/   # Request a skill
│   │   │   │   └── bookings/        # Booking management
│   │   │   └── admin/               # Admin panel
│   │   │       ├── users/           # User management
│   │   │       ├── categories/      # Category management
│   │   │       ├── skills/          # Skill approvals
│   │   │       └── reports/         # Abuse reports
│   │   ├── components/              # Reusable UI components
│   │   ├── context/                 # Auth context (JWT, roles)
│   │   ├── hooks/                   # Custom hooks
│   │   └── lib/                     # API client, utilities
│   └── .env.local                   # Frontend environment variables
```

### Feature-to-Requirement Mapping

| Requirement | Feature | Location |
|-------------|---------|----------|
| User registration, login, profile management | Register/Login forms, Profile page | `/register`, `/login`, `/dashboard/profile` |
| List offered skills and request needed skills | Offer Skill + Request Skill pages (type field) | `/dashboard/offer-skill`, `/dashboard/request-skill` |
| Browse, search, filter by category/location/keywords | Skill listing with filters | `/skills` |
| Booking/request system | Exchange request flow with accept/reject | `/skills/[id]` → BookingDialog, `/dashboard/bookings` |
| Email notifications | Strapi email plugin configured | `backend/config/plugins.ts` |
| Rating and review system | Review section on skill pages | `/skills/[id]` → ReviewSection |
| Role-based access (user, admin, editor) | ProtectedRoute with role checking | AuthContext, ProtectedRoute |
| Admin dashboard (users, skills, reports) | Full admin panel | `/admin/*` |
| Content management (FAQ, About, Policies) | CMS-managed via Strapi | `/faq`, `/about`, `/policies` |

---

## 10. Troubleshooting

### "Cannot connect to Strapi" / Network errors on frontend
- Make sure the backend is running first: `cd backend && npm run develop`
- Check that `NEXT_PUBLIC_STRAPI_URL` in `frontend/.env.local` matches the Strapi URL
- Check CORS: `backend/config/middlewares.ts` should allow `http://localhost:3000`

### "Forbidden" errors when accessing API
- You haven't set the permissions yet. Follow Section 4.4 above
- Go to Strapi Admin → Settings → Roles → set permissions for each role

### Strapi won't start
- Delete `backend/.tmp/` folder and `backend/dist/` folder, then run `npm run develop` again
- Make sure Node.js version is 20 or higher: `node --version`

### Images not uploading
- Check your Cloudinary credentials in `frontend/.env.local`
- Make sure the upload preset is set to **Unsigned** in Cloudinary dashboard
- Restart the frontend after changing `.env.local`

### "isAdmin is undefined" / Admin panel doesn't show
- Add `isAdmin` (Boolean) field to User content type in Strapi Content-Type Builder
- Set `isAdmin: true` for admin users in Content Manager → User
- See Section 4.3 for detailed steps

### Port conflicts
- Backend (Strapi): Change `PORT` in `backend/.env`
- Frontend (Next.js): Run `npx next dev -p 3001` or change the port
- Update `NEXT_PUBLIC_STRAPI_URL` in `frontend/.env.local` if you change the backend port

### Reset everything (fresh start)
1. Stop both servers
2. Delete `backend/.tmp/` (removes database)
3. Delete `backend/dist/` (removes build cache)
4. Run `npm run dev` from root — Strapi will recreate everything and seed data
