# SkillExchange

A platform to share, learn, and exchange skills with others.

## Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS, Shadcn UI
- **Backend:** Strapi v5 CMS
- **Database:** SQLite (development), PostgreSQL (production)
- **Image Upload:** Cloudinary
- **Icons:** Lucide React

## Quick Start

### Prerequisites
- Node.js >= 18

### 1. Backend (Strapi)
```bash
cd backend
npm install
npm run develop
```
Opens at `http://localhost:1337/admin` - Create your admin account on first run.

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Opens at `http://localhost:3000`

### 3. Configure Environment
Copy `frontend/.env.local` and update:
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

### 4. Set Strapi Permissions
In Strapi admin panel > Settings > Roles:
- **Public:** Enable `find`/`findOne` for Skills and Skill-Categories
- **Authenticated:** Enable `find`/`findOne`/`create` for Skills, `find`/`findOne` for Skill-Categories

## Project Structure

```
Skill Exchange/
├── frontend/    # Next.js application
├── backend/     # Strapi CMS
├── doc/         # Documentation (Roman Urdu)
└── README.md
```

## Documentation

See the `doc/` folder for detailed documentation in Roman Urdu covering all aspects of the project.
