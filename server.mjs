import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 7777;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/video", (req, res) => {
    res.sendFile(path.resolve(__dirname, "video.html"));
});

// 4. Xatolik yuz berganda (404 sahifa) - ixtiyoriy
app.use((req, res) => {
    res.status(404).send("Sahifa topilmadi!");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
