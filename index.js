
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import apiRouter from "./src/routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Redirect route for /qrgen to an external URL
app.get('/qrgen', (req, res) => {
  res.redirect('https://multi-qr-code-generator.vercel.app/');
});

// Mount the API router at /api
app.use('/api', apiRouter);

// Redirect root (/) to an external URL
app.get('/', (req, res) => {
  res.redirect('https://multi-qr-code-generator.vercel.app/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
