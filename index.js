import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("🚀 Hello from Hedera dApp backend! This app is live on Vercel.");
});

app.get("/api/info", (req, res) => {
  res.json({
    project: "Agritrust dApp",
    message: "Welcome to Hedera-powered transparency!",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on port ${port}`));