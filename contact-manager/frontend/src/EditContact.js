import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditContact = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        const fetchContact = async () => {
            const response = await axios.get(`http://localhost:5000/contacts/${id}`);
            setContact(response.data);
        };
        fetchContact();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/contacts/${id}`, contact);
        alert('Contato atualizado com sucesso!');
        navigate('/');
    };

    return (
        <div>
            <h2>Editar Contato</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="name"
                        value={contact.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    E-mail:
                    <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Telefone:
                    <input
                        type="text"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        required
                    />
                </label>
                <br />
                <h2>
                <button type="submit">Salvar Alterações</button>
                </h2>
            </form>
        </div>
    );
};

export default EditContact;
