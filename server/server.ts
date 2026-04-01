import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes";
import publicRoutes from "./routes/publicRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";
const configuredOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const localDevOrigins = ["http://localhost:3000", "http://localhost:3001"];
const CLIENT_ORIGINS = Array.from(
  new Set(
    process.env.NODE_ENV === "production"
      ? configuredOrigins.length
        ? configuredOrigins
        : localDevOrigins
      : [...configuredOrigins, ...localDevOrigins]
  )
);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (e.g. curl/Postman) that send no Origin header.
      if (!origin) {
        callback(null, true);
        return;
      }

      if (CLIENT_ORIGINS.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
  })
);
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

if (!MONGO_URI.trim()) {
  console.warn("MongoDB URI missing; starting API without DB connection.");
} else {
  void mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected ✅");
    })
    .catch((err) => {
      console.error("MongoDB connection failed ❌", err);
      console.warn("Continuing without MongoDB. Admin login route is still available.");
    });
}
