const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
    origin: '*', // Atau ganti dengan asal spesifik yang diizinkan
}));
app.use(express.json());

// Fungsi untuk membaca artikel dari file JSON
const readProgram = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, './src/public/data/program.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading program.json:', err);
        return {};
    }
};

// Fungsi untuk menulis artikel ke file JSON
const writeProgram = (Program) => {
    try {
        fs.writeFileSync(path.join(__dirname, './src/public/data/program.json'), JSON.stringify(Program, null, 2));
    } catch (err) {
        console.error('Error writing to program.json:', err);
    }
};

// Endpoint untuk mendapatkan semua artikel
app.get('/Program', (req, res) => {
    const Program = readProgram();
    res.json(Program);
});

// Endpoint untuk menambahkan artikel baru
app.post('/Program', (req, res) => {
    const Program = readProgram();
    const { category, id, img, tanggal, title, content } = req.body;

    if (!Program[category]) {
        Program[category] = [];
    }

    Program[category].push({ id, img, tanggal, title, content });
    writeProgram(Program);

    res.status(201).json({ message: 'Artikel berhasil ditambahkan' });
});

// Endpoint untuk menghapus artikel berdasarkan judul
app.delete('/Program/:category/:title', (req, res) => {
    const { category, title } = req.params;
    const Program = readProgram();

    if (!Program[category]) {
        return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    const index = Program[category].findIndex(article => article.title === title);

    if (index === -1) {
        return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    Program[category].splice(index, 1);
    writeProgram(Program);

    res.status(200).json({ message: 'Artikel berhasil dihapus' });
});

// Endpoint untuk memperbarui artikel berdasarkan judul
app.put('/Program/:category/:title', (req, res) => {
    const { category, title } = req.params;
    const { id, img, tanggal, newTitle, content } = req.body;
    const Program = readProgram();

    if (!Program[category]) {
        return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    const index = Program[category].findIndex(article => article.title === title);

    if (index === -1) {
        return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    Program[category][index] = { id, img, tanggal, title: newTitle, content };
    writeProgram(Program);

    res.status(200).json({ message: 'Artikel berhasil diperbarui' });
});

// Fungsi untuk membaca artikel dari file JSON
const readKegiatan = () => {
    try {
        const dataKegiatan = fs.readFileSync(path.join(__dirname, './src/public/data/kegiatan.json'), 'utf8');
        return JSON.parse(dataKegiatan);
    } catch (err) {
        console.error('Error reading kegiatan.json:', err);
        return {};
    }
};

// Fungsi untuk menulis artikel ke file JSON
const writeKegiatan = (Kegiatan) => {
    try {
        fs.writeFileSync(path.join(__dirname, './src/public/data/kegiatan.json'), JSON.stringify(Kegiatan, null, 2));
    } catch (err) {
        console.error('Error writing to kegiatan.json:', err);
    }
};

// Endpoint untuk mendapatkan semua artikel
app.get('/Kegiatan', (req, res) => {
    const Kegiatan = readKegiatan();
    res.json(Kegiatan);
});

// Endpoint untuk menambahkan artikel baru
app.post('/Kegiatan', (req, res) => {
    const Kegiatan = readKegiatan();
    const { category, id, img, tanggal, title, description, content } = req.body;

    if (!Kegiatan[category]) {
        Kegiatan[category] = [];
    }

    Kegiatan[category].push({ id, img, tanggal, title, description, content });
    writeKegiatan(Kegiatan);

    res.status(201).json({ message: 'Artikel berhasil ditambahkan' });
});

// Endpoint untuk menghapus artikel berdasarkan judul
app.delete('/Kegiatan/:category/:title', (req, res) => {
    const { category, title } = req.params;
    const Kegiatan = readKegiatan();

    if (!Kegiatan[category]) {
        return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    const index = Kegiatan[category].findIndex(article => article.title === title);

    if (index === -1) {
        return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    Kegiatan[category].splice(index, 1);
    writeKegiatan(Kegiatan);

    res.status(200).json({ message: 'Artikel berhasil dihapus' });
});

// Endpoint untuk memperbarui artikel berdasarkan judul
app.put('/Kegiatan/:category/:title', (req, res) => {
    const { category, title } = req.params;
    const { id, img, tanggal, newTitle, description, content } = req.body;
    const Kegiatan = readKegiatan();

    if (!Kegiatan[category]) {
        return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    const index = Kegiatan[category].findIndex(article => article.title === title);

    if (index === -1) {
        return res.status(404).json({ message: 'Artikel tidak ditemukan' });
    }

    Kegiatan[category][index] = { id, img, tanggal, title: newTitle, description, content };
    writeKegiatan(Kegiatan);

    res.status(200).json({ message: 'Artikel berhasil diperbarui' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
