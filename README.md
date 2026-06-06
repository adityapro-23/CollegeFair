<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

<h1 align="center">🎓 CollegeFair</h1>

<p align="center">
  <strong>Discover, Compare & Predict your best-fit engineering colleges in India.</strong>
</p>

<p align="center">
  A full-stack platform helping students explore 200+ Indian engineering colleges, compare them side-by-side, and predict admissions based on JEE rank — powered by 48,000+ cutoff records.
</p>

---

## ✨ Features

### 🔍 College Explorer
- Browse **209 colleges** — IITs, NITs, IIITs, GFTIs, state & private institutions
- **Smart filters** — by state, type (Govt/Private/Deemed), fees range, rating, exam accepted
- **Full-text search** across name, city, and state
- **6 sort options** — rating, fees, NIRF rank, name
- Paginated results with 12 cards per page

### 📊 College Comparison
- Compare **2–3 colleges** side-by-side
- Autocomplete search with debounced API calls
- Metrics compared: fees, rating, NIRF rank, placements, courses, accreditations, top recruiters

### 🎯 College Predictor
- Enter your **JEE rank** and get matched colleges instantly
- Filters: exam, category (OPEN/OBC/SC/ST/EWS), quota (AI/HS/OS), gender, round
- **Confidence scoring** — each match is classified as `SAFE`, `MODERATE`, or `REACH`
- Results grouped by college with per-course cutoff breakdowns
- Covers JEE Main, JEE Advanced, BITSAT, MHT-CET, VITEEE, COMEDK, WBJEE, KCET & more

### 📋 College Detail Pages
- Complete overview — description, established year, accreditations, website
- Course listings with fees and eligibility
- Placement stats (avg/highest/median package, placement rate, top recruiters)
- Student reviews with category-wise ratings (academics, infrastructure, placements, campus life)
- Rating distribution visualization

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Next.js App Router                │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │  Pages   │  │   API    │  │   Server         │   │
│  │ (Client) │  │  Routes  │  │   Components     │   │
│  └────┬─────┘  └────┬─────┘  └────────┬─────────┘   │
│       │              │                 │             │
│       │    ┌─────────▼─────────┐       │             │
│       └───►│   Controllers     │◄──────┘             │
│            │  (Business Logic) │                     │
│            └─────────┬─────────┘                     │
│         ┌────────────┼────────────┐                  │
│         ▼            ▼            ▼                  │
│   ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│   │Validators│ │  Models  │ │Constants │            │
│   │  (Input) │ │  (Query) │ │  (Enums) │            │
│   └──────────┘ └────┬─────┘ └──────────┘            │
│                     │                                │
│              ┌──────▼──────┐                         │
│              │   Prisma    │                         │
│              │  (Singleton)│                         │
│              └──────┬──────┘                         │
└─────────────────────┼───────────────────────────────┘
                      │
               ┌──────▼──────┐
               │ PostgreSQL  │
               │  (Render)   │
               └─────────────┘
```

### Layered MVC Pattern

| Layer | Directory | Responsibility |
|-------|-----------|----------------|
| **Routes** | `src/app/api/` | Thin HTTP wrappers — parse request, call controller, return JSON |
| **Controllers** | `src/controllers/` | Business logic, confidence scoring, filter building |
| **Validators** | `src/validators/` | Input validation, type coercion, sensible defaults |
| **Models** | `src/models/` | Prisma query wrappers with select/include optimization |
| **Lib** | `src/lib/` | Prisma singleton, centralized constants |

---

## 🗃️ Database Schema

```
┌──────────┐     ┌──────────┐     ┌───────────┐
│ College  │────<│  Course   │     │  Review   │
│          │────<│           │     │           │
│  id      │     │ collegeId │     │ collegeId │
│  name    │     │ name      │     │ rating    │
│  slug    │     │ degree    │     │ body      │
│  type    │     │ branch    │     │ academics │
│  city    │     │ feesTotal │     │ infra     │
│  state   │     └───────────┘     │ placements│
│  rating  │                       └───────────┘
│  feesMin │     ┌───────────┐
│  feesMax │────<│ Placement │     ┌───────────┐
│  nirfRank│     │           │     │  Cutoff   │
│  exams[] │     │ year      │     │           │
│  approved│     │ avgPkg    │     │ exam      │
│          │────<│ highPkg   │     │ year      │
└──────────┘     │ rate      │     │ category  │
                 │ recruiters│     │ quota     │
                 └───────────┘     │ gender    │
                            ┌─────│ round     │
                            │     │ openRank  │
                            │     │ closeRank │
                            │     │ course    │
                            └─────┘───────────┘
```

**5 models** · **1 enum** (`CollegeType`) · **16 indexes** including a composite index on `[exam, year, category, quota, gender, round]` for predictor queries.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** database (local or [Render](https://render.com))

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/CollegeFair.git
cd CollegeFair

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your DATABASE_URL
```

### Database Setup

```bash
# Push schema to database
npx prisma db push

# Seed with 209 colleges + 48,000 cutoff records
npx prisma db seed

# (Optional) Open Prisma Studio to browse data
npx prisma studio
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📡 API Reference

### Colleges

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/colleges` | List colleges with filters & pagination |
| `GET` | `/api/colleges/:slug` | Get full college detail |
| `GET` | `/api/colleges/search?q=` | Autocomplete search (min 2 chars) |

**Query params for listing:**
`q`, `state`, `city`, `type`, `feesMin`, `feesMax`, `ratingMin`, `exam`, `sortBy`, `page`, `limit`

### Compare

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/compare?slugs=a,b,c` | Compare 2–3 colleges |

### Predictor

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/predictor` | Predict colleges by rank |
| `GET` | `/api/predictor/exams` | List available exams |

**Query params for predictor:**
`exam` (required), `rank` (required), `category`, `quota`, `gender`, `round`

**Response includes:**
- Matched colleges grouped with per-course cutoffs
- Confidence level: `SAFE` · `MODERATE` · `REACH`
- Auto-detected latest cutoff year

---

## 🎯 Predictor Algorithm

The confidence scoring works by computing where the student's rank falls within the opening-to-closing rank range:

```
percentile = (closingRank - userRank) / (closingRank - openingRank) × 100

≥ 40%  →  🟢 SAFE        (well within range)
≥ 10%  →  🟡 MODERATE    (near the edge)
< 10%  →  🔴 REACH       (barely qualifies)
```

Results are sorted by confidence first, then by college rating as tiebreaker.

---

## 🧰 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router + Turbopack) |
| **Frontend** | React 19, Tailwind CSS 4 |
| **Backend** | Next.js API Routes + Server Components |
| **Database** | PostgreSQL |
| **ORM** | Prisma 6 |
| **Deployment** | Render (Web Service + PostgreSQL) |
| **Fonts** | Geist Sans + Geist Mono |

---

## 📁 Project Structure

```
CollegeFair/
├── prisma/
│   ├── schema.prisma        # Database schema (5 models, 16 indexes)
│   └── seed.js              # Seeds 209 colleges + related data
├── src/
│   ├── app/
│   │   ├── api/             # 6 API route handlers
│   │   ├── colleges/        # Listing + [slug] detail pages
│   │   ├── compare/         # Side-by-side comparison
│   │   ├── predictor/       # Rank-based prediction
│   │   ├── layout.js        # Root layout with navbar + footer
│   │   ├── page.js          # Landing page
│   │   └── globals.css      # Tailwind + CSS variables
│   ├── components/
│   │   ├── colleges/        # CollegeCard, CollegeList, FilterPanel, SearchBar
│   │   ├── compare/         # CollegeSelector, CompareTable
│   │   ├── detail/          # 6 tab components (Overview, Courses, Placements, Reviews)
│   │   ├── predictor/       # PredictorForm, PredictorResults
│   │   ├── layout/          # Navbar, Footer
│   │   └── ui/              # Skeleton, StarRating
│   ├── controllers/         # Business logic (college, compare, detail, predictor)
│   ├── models/              # Prisma query wrappers (5 models)
│   ├── validators/          # Input validation (3 validators)
│   └── lib/
│       ├── prisma.js        # PrismaClient singleton
│       └── constants.js     # App-wide enums & config
├── .env.example
├── package.json
└── README.md
```

---

## 📊 Data Summary

| Data | Count |
|------|-------|
| Colleges | 209 (23 IITs, 30 NITs, 25 IIITs, 130+ others) |
| Courses | 1,140 |
| Placements | 627 (3 years per college) |
| Reviews | 744 |
| Cutoff Records | 47,880 |

---

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXT_PUBLIC_APP_NAME` | App display name | `CollegeFair` |
| `NEXT_PUBLIC_APP_URL` | App URL | `https://collegefair.onrender.com` |

---

## 📝 License

This project is for educational purposes.
