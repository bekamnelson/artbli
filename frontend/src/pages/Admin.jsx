import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaPlus, FaUsers, FaStore, FaSignOutAlt, FaTrash, FaEdit } from 'react-icons/fa';
import logo from './../assets/image.png';
import './../css/Admin.css';

export default function Admin() {
    const [activeTab, setActiveTab] = useState('liste');
    const [livres, setLivres] = useState([]);
    const [utilisateurs, setUtilisateurs] = useState([]);
    const [formData, setFormData] = useState({ nom: '', auteur: '', categorie: '', description: '' });
    const [editId, setEditId] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchLivres();
        fetchUtilisateurs();
    }, []);

    const fetchLivres = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/livre');
        setLivres(await res.json());
    };

    const fetchUtilisateurs = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/users');
        setUtilisateurs(await res.json());
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   
    const handleAddSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://127.0.0.1:8000/api/livre', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        setFormData({ nom: '', auteur: '', categorie: '', description: '' });
        fetchLivres();
        setActiveTab('liste');
    };

   
    const handleEditClick = (livre) => {
        setFormData({ nom: livre.nom, auteur: livre.auteur, categorie: livre.categorie, description: livre.description });
        setEditId(livre.id);
        setActiveTab('modifier');
    };

   
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://127.0.0.1:8000/api/livre/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        setFormData({ nom: '', auteur: '', categorie: '', description: '' });
        setEditId(null);
        fetchLivres();
        setActiveTab('liste');
    };

  
    const handleDeleteLivre = async (id) => {
        if (window.confirm("Supprimer ce livre ?")) {
            await fetch(`http://127.0.0.1:8000/api/livre/${id}`, { method: 'DELETE' });
            fetchLivres();
        }
    };

   
    const handleDeleteUser = async (id) => {
        if (window.confirm("Supprimer cet utilisateur ?")) {
            await fetch(`http://127.0.0.1:8000/api/users/${id}`, { method: 'DELETE' });
            fetchUtilisateurs();
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="admin-layout">
           
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <img src={logo} alt="Logo" />
                    <h2>Admin</h2>
                </div>
                <nav className="sidebar-nav">
                    <button className={activeTab === 'liste' ? 'active' : ''} onClick={() => setActiveTab('liste')}><FaBook /> Gestion Livres</button>
                    <button className={activeTab === 'ajouter' ? 'active' : ''} onClick={() => {setActiveTab('ajouter'); setFormData({ nom: '', auteur: '', categorie: '', description: '' });}}><FaPlus /> Ajouter un livre</button>
                    <button className={activeTab === 'utilisateurs' ? 'active' : ''} onClick={() => setActiveTab('utilisateurs')}><FaUsers /> Utilisateurs</button>
                    <div className="sidebar-divider"></div>
                    <button className="btn-boutique" onClick={() => navigate('/boutique')}><FaStore /> Boutique</button>
                </nav>
                <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Déconnexion</button>
            </aside>

           
            <main className="admin-content">
                
             
                {activeTab === 'liste' && (
                    <div className="tab-pane">
                        <h2>Liste des livres</h2>
                        <table className="admin-table">
                            <thead><tr><th>Nom</th><th>Auteur</th><th>Catégorie</th><th>Actions</th></tr></thead>
                            <tbody>
                                {livres.map(l => (
                                    <tr key={l.id}>
                                        <td>{l.nom}</td>
                                        <td>{l.auteur}</td>
                                        <td>{l.categorie}</td>
                                        <td>
                                          
                                            <button className="btn-edit" onClick={() => handleEditClick(l)} style={{marginRight: '10px'}}><FaEdit /> Modifier</button>
                                            <button className="btn-delete" onClick={() => handleDeleteLivre(l.id)}><FaTrash /> Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

               
                {activeTab === 'ajouter' && (
                    <div className="tab-pane">
                        <h2>Ajouter un livre</h2>
                        <form className="admin-form" onSubmit={handleAddSubmit}>
                            <input type="text" name="nom" placeholder="Titre" value={formData.nom} onChange={handleChange} required />
                            <input type="text" name="auteur" placeholder="Auteur" value={formData.auteur} onChange={handleChange} required />
                            <input type="text" name="categorie" placeholder="Catégorie" value={formData.categorie} onChange={handleChange} required />
                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="5"></textarea>
                            <button type="submit" className="btn-submit">Ajouter le livre</button>
                        </form>
                    </div>
                )}

               
                {activeTab === 'modifier' && (
                    <div className="tab-pane">
                        <h2>Modifier le livre</h2>
                        <form className="admin-form" onSubmit={handleEditSubmit}>
                            <input type="text" name="nom" placeholder="Titre" value={formData.nom} onChange={handleChange} required />
                            <input type="text" name="auteur" placeholder="Auteur" value={formData.auteur} onChange={handleChange} required />
                            <input type="text" name="categorie" placeholder="Catégorie" value={formData.categorie} onChange={handleChange} required />
                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="5"></textarea>
                            <button type="submit" className="btn-submit">Enregistrer les modifications</button>
                            <button type="button" className="btn-cancel" onClick={() => setActiveTab('liste')}>Annuler</button>
                        </form>
                    </div>
                )}

               
                {activeTab === 'utilisateurs' && (
                    <div className="tab-pane">
                        <h2>Gestion des utilisateurs</h2>
                        <table className="admin-table">
                            <thead><tr><th>Nom</th><th>Email</th><th>Actions</th></tr></thead>
                            <tbody>
                                {utilisateurs.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.username}</td><td>{u.email}</td>
                                        <td>
                                            <button className="btn-delete" onClick={() => handleDeleteUser(u.id)}><FaTrash /> Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}