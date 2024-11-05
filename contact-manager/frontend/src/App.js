import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditContact from './EditContact'; 
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate(); // Adicionando useNavigate

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const response = await axios.get('http://localhost:5000/contacts');
        setContacts(response.data);
    };

    const addContact = async (e) => {
        e.preventDefault();
        const newContact = { name, email, phone };
        await axios.post('http://localhost:5000/contacts', newContact);
        setName('');
        setEmail('');
        setPhone('');
        fetchContacts();
    };

    const deleteContact = async (id) => {
        await axios.delete(`http://localhost:5000/contacts/${id}`);
        fetchContacts(); // Atualiza a lista de contatos após a exclusão
    };

    return (
        <div>
            <header id="header">
                <img src="https://lojamm.vtexassets.com/assets/vtex/assets-builder/lojamm.store-theme/8.1.8/icons/header-new-logo___6cc21f9bcc6b1fca0543619aa62cc7f1.svg" alt="Logo do Site" className="header-logo" />
            </header>
            <div className="content">
                <h2>Crie o Contato</h2>
                <form onSubmit={addContact}>
                    <br />
                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Telefone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <br />
                    <h2>
                        <button type="submit">Adicionar Contato</button>
                    </h2>
                </form>
                <ul>
                    <h2>Contatos Criados</h2>
                    {contacts.map((contact) => (
                        <li key={contact._id}>
                            {contact.name} - {contact.email} - {contact.phone}
                            <button onClick={() => navigate(`/edit/${contact._id}`)}>Editar</button> {/* Substituindo <a> por <button> */}
                            <button onClick={() => deleteContact(contact._id)}>Excluir</button> 
                        </li>
                    ))}
                </ul>
            </div>
            <Routes>
                <Route path="/edit/:id" element={<EditContact />} />
            </Routes>
            <footer>
                <img src="https://lojamm.vtexassets.com/assets/vtex/assets-builder/lojamm.store-theme/8.1.8/icons/header-new-logo___6cc21f9bcc6b1fca0543619aa62cc7f1.svg" alt="Logo do Site" className="header-logo" />
                <p>Feito por Murilo Amorim Ferreira 
                    © 2024 Lojas MM. Todos os direitos reservados. | Termos de Uso | Política de Privacidade</p>
            </footer>
        </div>
    );
}

const AppWithRouter = () => (
    <Router>
        <App />
    </Router>
);

export default AppWithRouter;
