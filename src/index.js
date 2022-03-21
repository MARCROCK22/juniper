const fs = require('fs');
const path = require('path');
const app = require('express')();
const PORT = process.env.PORT || 3000;
const files = fs.readdirSync(path.join(__dirname, 'images'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/get/:name', async (req, res) => {
    const imageFinded = files.find(file => file.split('.')[0] === req.params.name);
    if (imageFinded)
        return res.end(await fs.promises.readFile(path.join(__dirname, 'images', imageFinded)));
    res.status(404).end();
});

app.get('/random', async (req, res) => {
    const imageFinded = files[Math.floor(Math.random() * files.length)];
    if (imageFinded)
        return res.end(await fs.promises.readFile(path.join(__dirname, 'images', imageFinded)));
    res.status(404).end();
});