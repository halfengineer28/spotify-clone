import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import cron from "node-cron";
import fs from "fs";
import { initializeSocket } from "./lib/socket.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import albumRoute from "./routes/album.route.js";
import statRoute from "./routes/stat.route.js";
import adminRoute from "./routes/admin.route.js";
import songRoute from "./routes/songs.route.js";
import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";

dotenv.config();
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;
const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);
const tmpDir = path.join(process.cwd(), "tmp");
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tmpDir)) {
    fs.readdir(tmpDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tmpDir, file), (err) => {});
      }
    });
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/albums", albumRoute);
app.use("/api/songs", songRoute);
app.use("/api/stats", statRoute);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

httpServer.listen(PORT, () => {
  console.log("Server started at" + PORT);
  connectDB();
});
