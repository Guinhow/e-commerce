const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/submit-form', (req, res) => {
    const { nome, email, mensagem } = req.body;

    const filePath = path.join(__dirname, 'submissions.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao salvar os dados' });
        }

        const submissions = data ? JSON.parse(data) : [];

        submissions.push({ nome, email, mensagem, data: new Date() });

        fs.writeFile(filePath, JSON.stringify(submissions, null, 2), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Erro ao salvar os dados' });
            }
            res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
        });
    });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
