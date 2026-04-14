const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { authenticate, sequelize } = require("./config/db");
const adminRouter = require("./routes/adminRoute");
const permissionRouter = require("./routes/permissionRoute");

const app = express();
const PORT = process.env.PORT || 7000;

const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:3000";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/admin", adminRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Not Found",
    method: req.method,
    path: req.originalUrl,
  });
});

const startServer = async () => {
  try {
    await authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log("✅ Database authenticated successfully");
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database authentication failed:", error.message);
  }
};
startServer();
