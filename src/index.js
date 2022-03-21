const fs = require('fs');
const path = require('path');
const app = require('express')();
const PORT = process.env.PORT || 3000;
const files = fs.readdirSync(path.join(__dirname, 'images'));
const { fileTypeFromBuffer } = require('file-type');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/get/:name', async (req, res) => {
    const imageFinded = files.find(file => file.split('.')[0] === req.params.name);
    if (!imageFinded) return res.status(404).send('Image not found');
    const file = await fs.promises.readFile(path.join(__dirname, 'images', imageFinded))
    const m = await fileTypeFromBuffer(file).then(i => i.mime);
    res.writeHead(200, {
        "Content-Type": m,
        "Content-Length": file.length
    });
    res.end(file);
});

app.get('/random', async (req, res) => {
    const imageFinded = files[Math.floor(Math.random() * files.length)];
    if (!imageFinded) return res.status(404).send('Image not found');
    const file = await fs.promises.readFile(path.join(__dirname, 'images', imageFinded))
    const m = await fileTypeFromBuffer(file).then(i => i.mime);
    res.writeHead(200, {
        "Content-Type": m,
        "Content-Length": file.length
    });
    res.end(file);
});