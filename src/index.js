import fs from 'fs';
import path from 'path';
import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.join(process.cwd(), 'src');
const files = fs.readdirSync(path.join(__dirname, 'images'));
import { fileTypeFromBuffer } from 'file-type';

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/get/:name', async (req, res) => {
    const imageFinded = files.find(file =>
        (file.split('.')[0] === req.params.name)
        ||
        (file === req.params.name)
        ||
        (file == req.params.name.split('.')[0])
    ) || '404.png';
    const file = await fs.promises.readFile(path.join(__dirname, 'images', imageFinded))
    const m = await fileTypeFromBuffer(file).then(i => i.mime);
    res.writeHead(200, {
        "Content-Type": m,
        "Content-Length": file.length
    });
    res.status(200).end(file);
});

app.get('/random', async (req, res) => {
    const imageFinded = files[Math.floor(Math.random() * files.length)];
    const file = await fs.promises.readFile(path.join(__dirname, 'images', imageFinded))
    const m = await fileTypeFromBuffer(file).then(i => i.mime);
    res.writeHead(200, {
        "Content-Type": m,
        "Content-Length": file.length
    });
    res.end(file);
});