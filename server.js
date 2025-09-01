// 1. Importar as bibliotecas necessárias
const express = require('express');
const cors = require('cors');

// 2. Inicializar o aplicativo Express (AQUI QUE O 'app' É CRIADO)
const app = express();
const PORT = 3000;

// 3. Configurar os Middlewares
app.use(cors());
app.use(express.json());

// --- BANCOS DE DADOS SIMULADOS ---

// Usuários
const users = [
    { type: 'docente', username: 'professor@etec.com', password: '123' },
    { type: 'aluno', username: '221144', password: 'abc' } 
];

// Posts
let postIdCounter = 3;
let posts = [
    { id: 1, title: 'Início das Aulas', content: 'Lembramos que as aulas do segundo semestre começarão na próxima segunda-feira.' },
    { id: 2, title: 'Vagas de Estágio', content: 'Novas vagas de estágio em Administração disponíveis. Procure a coordenação.' }
];

// Contatos
let contacts = [
    { id: 1, name: 'João da Silva', course: 'Desenvolvimento de Sistemas', year: 2, phone: '11988887777' },
    { id: 2, name: 'Maria Oliveira', course: 'Administração', year: 1, phone: '11955554444' }
];
let contactIdCounter = 3;

// --- 4. DEFINIÇÃO DE TODAS AS ROTAS ---

// Rota de Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Tentativa de login recebida para o usuário: ${username}`);
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        console.log(`Usuário ${username} autenticado com sucesso.`);
        res.json({ success: true, message: 'Login bem-sucedido!' });
    } else {
        console.log(`Falha na autenticação para o usuário: ${username}.`);
        res.status(401).json({ success: false, message: 'Usuário ou senha inválidos.' });
    }
});

// Rotas para Posts
app.get('/posts', (req, res) => {
    console.log('Enviando a lista de posts para o front-end.');
    res.json(posts);
});

app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: 'Título e conteúdo são obrigatórios.' });
    }
    const newPost = { id: postIdCounter++, title, content };
    posts.unshift(newPost);
    console.log('Novo post criado:', newPost);
    res.status(201).json({ message: 'Post criado com sucesso!', post: newPost });
});

app.post('/posts/:id/send', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (post) {
        console.log('--------------------------------------------------');
        console.log(`[SIMULAÇÃO WHATSAPP] Iniciando envio do aviso: "${post.title}"`);
        console.log(`Conteúdo: "${post.content}"`);
        console.log('[SIMULAÇÃO WHATSAPP] Envio concluído com sucesso.');
        console.log('--------------------------------------------------');
        res.json({ success: true, message: `Aviso "${post.title}" enviado para o WhatsApp!` });
    } else {
        res.status(404).json({ success: false, message: 'Post não encontrado.' });
    }
});

// Rotas para Contatos
app.get('/contacts', (req, res) => {
    console.log('Enviando lista de contatos.');
    res.json(contacts);
});

app.post('/contacts', (req, res) => {
    const { name, course, year, phone } = req.body;
    if (!name || !course || !year || !phone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    const newContact = { id: contactIdCounter++, name, course, year, phone };
    contacts.push(newContact);
    console.log('Novo contato adicionado:', newContact);
    res.status(201).json({ message: 'Contato adicionado com sucesso!', contact: newContact });
});

// Rota para EXCLUIR um contato (DELETE)
app.delete('/contacts/:id', (req, res) => {
    const contactId = parseInt(req.params.id);
    const initialLength = contacts.length;
    contacts = contacts.filter(c => c.id !== contactId); // Filtra o array, removendo o contato com o ID

    if (contacts.length < initialLength) {
        console.log(`Contato com ID ${contactId} excluído.`);
        res.json({ success: true, message: 'Contato excluído com sucesso.' });
    } else {
        console.log(`Falha ao excluir: Contato com ID ${contactId} não encontrado.`);
        res.status(404).json({ success: false, message: 'Contato não encontrado.' });
    }
});

// Rota para ATUALIZAR um contato (PUT)
app.put('/contacts/:id', (req, res) => {
    const contactId = parseInt(req.params.id);
    const { name, course, year, phone } = req.body;
    const contactIndex = contacts.findIndex(c => c.id === contactId);

    if (contactIndex !== -1) {
        contacts[contactIndex] = { id: contactId, name, course, year, phone };
        console.log(`Contato com ID ${contactId} atualizado.`);
        res.json({ success: true, message: 'Contato atualizado com sucesso!', contact: contacts[contactIndex] });
    } else {
        console.log(`Falha ao atualizar: Contato com ID ${contactId} não encontrado.`);
        res.status(404).json({ success: false, message: 'Contato não encontrado.' });
    }
});

// --- 5. Iniciar o Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});