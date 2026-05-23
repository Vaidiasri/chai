# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with nodemon + dotenv auto-loaded
npm start        # Start production server
```

No test runner is configured. No linter is configured; Prettier is available for formatting.

## Environment Variables

Copy `.env.sample` to `.env` and fill in:

- `DATABASE_URI` — MongoDB connection string
- `PORT` — server port (default 8000)
- `CORS_ORIGIN` — allowed CORS origin
- `ACCESS_TOKEN`, `ACCESS_TOKEN_EXP` — JWT access token secret and expiry
- `REFRESH_TOKEN`, `REFRESH_TOKEN_EXP` — JWT refresh token secret and expiry
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary credentials

## Architecture

This is an Express + Mongoose REST API using ES Modules (`"type": "module"` in package.json).

**Entry point:** `src/index.js` connects to MongoDB then starts the Express server. `src/app.js` configures middleware (CORS, JSON body parsing, cookie-parser, static files) and mounts routers.

**Request flow:** Route → Middleware → Controller → Model/Utility

**Folder layout:**
- `src/routes/` — Express routers, one file per resource (e.g. `user.routes.js`)
- `src/controller/` — Business logic handlers, exported and mounted by routes
- `src/models/` — Mongoose schemas (`user.model.js`, `video.model.js`)
- `src/middelware/` — Custom Express middleware (note the intentional typo in directory name)
- `src/utils/` — Shared utilities (see below)
- `src/db/db.js` — Mongoose connection
- `public/temp/` — Temporary storage for multer uploads before Cloudinary upload

**Utils:**
- `asyncHandler.js` — Wraps async route handlers to forward errors to Express `next()`
- `ApiError.js` — Custom Error subclass with `statusCode`, `errors[]`, and `success: false`
- `ApiResponse.js` — Standard response shape with `statusCode`, `data`, `message`, and `success` (auto-set based on status code)
- `Cloudnary.js` — Uploads a local file to Cloudinary, deletes the temp file afterward, returns the response or `null` on failure

**File upload pattern:** Multer saves files to `public/temp/`, the controller reads `req.files`, uploads to Cloudinary via `uploadOnCloudinary()`, then stores the returned `.url` in MongoDB.

**Auth pattern:** `user.model.js` defines `isPassword()`, `getAccessToken()`, and `getRefreshToken()` as Mongoose instance methods. Passwords are hashed via a `pre("save")` hook using bcrypt.

## Known Issues / Typos to Be Aware Of

- Middleware directory is named `middelware` (double-d), not `middleware`
- `multer.middleware.js` is imported as `multer.middleware.js` in routes but the actual file listing shows `multer.middelware.js` — verify the filename before editing
- `userSchema.method` should be `userSchema.methods` (plural) in `user.model.js`
- `getAccessToken` and `getRefreshToken` are missing `return` before `jwt.sign()`