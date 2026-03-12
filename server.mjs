import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 7777;

// 1. Statik fayllarga (style.css, script.js, rasmlar) ruxsat berish
// Bu qator barcha CSS va JS fayllaringizni brauzerga ko'rinadigan qiladi
app.use(express.static(__dirname));

// 2. Asosiy sahifa (Home)
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

// 3. Video ko'rish sahifasi
// Foydalanuvchi video.html ga o'tganda xatolik bermasligi uchun
app.get("/video.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, "video.html"));
});

// 4. Xatolik yuz berganda (404 sahifa) - ixtiyoriy
app.use((req, res) => {
    res.status(404).send("Sahifa topilmadi!");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
