import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './../assets/image.png';
import './../css/Admin.css';

export default function Admin() {
    const [activeTab, setActiveTab] = useState('liste'); 
    const [livres, setLivres] = useState([]);
    const [formData, setFormData] = useState({ nom: '', auteur: '', categorie: '', description: '' });
    const [editId, setEditId] = useState(null);
    const navigate = useNavigate();

   
    useEffect(() => {
        fetchLivres();
    }, []);

    const fetchLivres = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/livre');
            const data = await response.json();
            setLivres(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des livres", error);
        }
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/livre', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Livre ajouté avec succès !");
                setFormData({ nom: '', auteur: '', categorie: '', description: '' });
                fetchLivres();
                setActiveTab('liste');
            }
        } catch (error) {
            console.error("Erreur d'ajout", error);
        }
    };

  
    const handleEditClick = (livre) => {
        setFormData({ nom: livre.nom, auteur: livre.auteur, categorie: livre.categorie, description: livre.description });
        setEditId(livre.id);
        setActiveTab('modifier');
    };

  
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/livre/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Livre modifié avec succès !");
                setFormData({ nom: '', auteur: '', categorie: '', description: '' });
                setEditId(null);
                fetchLivres();
                setActiveTab('liste');
            }
        } catch (error) {
            console.error("Erreur de modification", error);
        }
    };

   
    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce livre ?")) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/livre/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchLivres();
                }
            } catch (error) {
                console.error("Erreur de suppression", error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="admin-layout">
           
             {/* BARRE LATÉRALE (SIDEBAR) */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <img src={logo} alt="Logo ARTBLI" />
                    <h2>Admin</h2>
                </div>
                
                <nav className="sidebar-nav">
                    <button className={activeTab === 'liste' ? 'active' : ''} onClick={() => setActiveTab('liste')}>
                        <i className="fa-solid fa-book"></i> Gestion Livres
                    </button>
                    
                    <button className={activeTab === 'ajouter' ? 'active' : ''} onClick={() => {setActiveTab('ajouter'); setFormData({ nom: '', auteur: '', categorie: '', description: '' });}}>
                        <i className="fa-solid fa-plus"></i> Ajouter un livre
                    </button>
                    
                    <button className={activeTab === 'utilisateurs' ? 'active' : ''} onClick={() => setActiveTab('utilisateurs')}>
                        <i className="fa-solid fa-users"></i> Utilisateurs
                    </button>

                    {/* NOUVEAU BOUTON : Accès Boutique */}
                    <div className="sidebar-divider"></div>
                    <button className="btn-boutique" onClick={() => navigate('/boutique')}>
                        <i className="fa-solid fa-store"></i> Voir la boutique
                    </button>
                </nav>

                <button className="logout-btn" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i> Déconnexion
                </button>
            </aside>


            {/* CONTENU PRINCIPAL */}
            <main className="admin-content">
                
                {/* VUE : LISTE DES LIVRES */}
                {activeTab === 'liste' && (
                    <div className="tab-pane">
                        <h2>Liste des livres</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>Auteur</th>
                                    <th>Catégorie</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {livres.map(livre => (
                                    <tr key={livre.id}>
                                        <td>{livre.id}</td>
                                        <td>{livre.nom}</td>
                                        <td>{livre.auteur}</td>
                                        <td>{livre.categorie}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => handleEditClick(livre)}>Modifier</button>
                                            <button className="btn-delete" onClick={() => handleDelete(livre.id)}>Supprimer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* VUE : AJOUTER UN LIVRE */}
                {activeTab === 'ajouter' && (
                    <div className="tab-pane">
                        <h2>Ajouter un nouveau livre</h2>
                        <form className="admin-form" onSubmit={handleAddSubmit}>
                            <input type="text" name="nom" placeholder="Titre du livre" value={formData.nom} onChange={handleChange} required />
                            <input type="text" name="auteur" placeholder="Auteur" value={formData.auteur} onChange={handleChange} required />
                            <input type="text" name="categorie" placeholder="Catégorie" value={formData.categorie} onChange={handleChange} required />
                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="5"></textarea>
                            <button type="submit" className="btn-submit">Ajouter le livre</button>
                        </form>
                    </div>
                )}

                {/* VUE : MODIFIER UN LIVRE */}
                {activeTab === 'modifier' && (
                    <div className="tab-pane">
                        <h2>Modifier le livre</h2>
                        <form className="admin-form" onSubmit={handleEditSubmit}>
                            <input type="text" name="nom" placeholder="Titre du livre" value={formData.nom} onChange={handleChange} required />
                            <input type="text" name="auteur" placeholder="Auteur" value={formData.auteur} onChange={handleChange} required />
                            <input type="text" name="categorie" placeholder="Catégorie" value={formData.categorie} onChange={handleChange} required />
                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required rows="5"></textarea>
                            <button type="submit" className="btn-submit">Enregistrer les modifications</button>
                            <button type="button" className="btn-cancel" onClick={() => setActiveTab('liste')}>Annuler</button>
                        </form>
                    </div>
                )}

                {/* VUE : UTILISATEURS (En attente de ton backend) */}
                {activeTab === 'utilisateurs' && (
                    <div className="tab-pane">
                        <h2>Gestion des utilisateurs</h2>
                        <p>Cette section affichera la liste des utilisateurs une fois la route API créée.</p>
                    </div>
                )}

            </main>
        </div>
    );
}