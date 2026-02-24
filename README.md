## OTT Frontend (React + Vite)

A Netflix-style OTT web frontend built with React 18, React Router, and Vite. It consumes your existing backend APIs for home sections, content details, and authentication.

### 1. Prerequisites

- Node.js 18+ and npm
- Running backend API (see environment section)

### 2. Environment configuration

Client-side code reads the API base URL from `VITE_API_BASE_URL`.

1. Copy the example env file:

```bash
cp .env.example .env.local
```

2. Edit `.env.local` and set your backend URL:

```bash
VITE_API_BASE_URL=https://api.your-ott-backend.com
```

In development you can instead keep the default `/api` base and use the Vite proxy:

- `vite.config.mts` proxies `/api` → `http://localhost:4000`
- In that case set:

```bash
VITE_API_BASE_URL=/api
```

### 3. Available scripts

From the project root:

```bash
npm install        # install dependencies
npm run dev        # start dev server on http://localhost:5173
npm run build      # build for production
npm run preview    # preview the production build
```

### 4. Backend API contracts

The frontend expects the following endpoints (all relative to `VITE_API_BASE_URL`):

- **GET `/home`** – returns an array of sections:

```json
[
  {
    "id": "trending",
    "title": "Trending Now",
    "items": [
      {
        "id": "movie-1",
        "title": "Example Movie",
        "posterUrl": "https://.../poster.jpg",
        "backdropUrl": "https://.../backdrop.jpg",
        "description": "Optional description for hero/details",
        "year": 2024,
        "rating": "U/A 13+",
        "genre": "Action",
        "duration": "2h 10m"
      }
    ]
  }
]
```

- **GET `/content/:id`** – returns full details for a single item:

```json
{
  "id": "movie-1",
  "title": "Example Movie",
  "posterUrl": "https://.../poster.jpg",
  "backdropUrl": "https://.../backdrop.jpg",
  "description": "Long description here",
  "year": 2024,
  "rating": "U/A 13+",
  "genre": "Action",
  "duration": "2h 10m"
}
```

- **POST `/auth/login`** – logs a user in:

Request body:

```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

Expected response:

```json
{
  "token": "jwt-or-session-token"
}
```

The token is stored in `localStorage` by the frontend.

You can customize these paths or response shapes by editing `src/services/apiClient.js`.

### 5. Main structure

- `src/main.jsx` – app bootstrap and router
- `src/App.jsx` – layout and routes
- `src/pages/HomePage.jsx` – Netflix-style home with hero + rows
- `src/pages/DetailsPage.jsx` – content details view
- `src/pages/LoginPage.jsx` – sign-in form
- `src/components/*` – reusable UI components (hero, rows, cards, loader, error)
- `src/services/apiClient.js` – API client and services
- `src/styles.css` – global Netflix-like styling

