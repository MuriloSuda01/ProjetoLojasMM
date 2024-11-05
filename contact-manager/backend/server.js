const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Criação
app.post('/contacts', (req, res) => {
    const contact = req.body;
    db.insert(contact, (err, newContact) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json(newContact);
    });
});

// Lista de contato
app.get('/contacts', (req, res) => {
    db.find({}, (err, contacts) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(contacts);
    });
});

// Rota para obter um contato específico
app.get('/contacts/:id', (req, res) => {
    const { id } = req.params;
    db.findOne({ _id: id }, (err, contact) => {
        if (err || !contact) {
            return res.status(404).send(err || 'Contato não encontrado');
        }
        res.json(contact);
    });
});

// Rota para atualizar um contato
app.put('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    // Atualizar o contato no banco de dados
    db.update({ _id: id }, { $set: { name, email, phone } }, {}, (err, numReplaced) => {
        if (err || numReplaced === 0) {
            return res.status(500).json({ message: 'Erro ao atualizar o contato.' });
        }
        res.json({ message: 'Contato atualizado com sucesso.' });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
//Deletar
app.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;
    db.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err || numRemoved === 0) {
            return res.status(500).json({ message: 'Erro ao excluir o contato.' });
        }
        res.json({ message: 'Contato excluído com sucesso.' });
    });
});
