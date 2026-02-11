# Cassava Backend

Node.js + Express API with MongoDB for the Cassava frontend.

## Setup

1. **Install dependencies**
   ```bash
   cd backend && npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env`
   - Set `MONGODB_URI` (e.g. `mongodb://localhost:27017/cassava` or a MongoDB Atlas connection string)
   - Optionally set `PORT` (default `3001`) and `CORS_ORIGIN` (default `http://localhost:5173`)

3. **Seed the database** (inserts the four default varieties)
   ```bash
   npm run seed
   ```

4. **Run the server**
   - Dev (with auto-restart): `npm run dev`
   - Production: `npm start`

## API

- `GET /api/health` — health check
- `GET /api/varieties` — list all varieties
- `GET /api/varieties/:id` — single variety by MongoDB `_id`

## Frontend

From the project root, run the frontend with the API URL:

- Create `frontend/.env` with `VITE_API_URL=http://localhost:3001` (or copy from `frontend/.env.example`)
- Start backend: `npm run backend`
- Start frontend: `cd frontend && npm run dev`

The Varieties and Variety Purchase pages load data from this API.
