import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/navarbar';

export default function LivreDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [livre, setLivre] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/livre/${id}`)
            .then(res => res.json())
            .then(data => setLivre(data));
    }, [id]);

    const handleEmprunt = async () => {
        const userString = localStorage.getItem('user');
        if (!userString) {
            alert("Vous devez être connecté pour louer un livre.");
            navigate('/login');
            return;
        }

        const user = JSON.parse(userString);
        
     
        console.log("Tentative d'emprunt avec :", { livre_id: livre.id, utilisateur_id: user.id });

        try {
            const response = await fetch('http://127.0.0.1:8000/api/emprunt', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json' 
                },
                body: JSON.stringify({
                    livre_id: livre.id,
                    utilisateur_id: user.id
                })
            });

            const data = await response.json(); 
            if (response.ok) {
                alert("Félicitations ! Vous avez loué ce livre.");
                navigate('/profil');
            } else {
                
                console.error("Erreur du serveur :", data.erreur_detail);
                alert("Erreur : " + (data.erreur_detail || data.message));
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Impossible de joindre le serveur.");
        }
    };

    if (!livre) return <div>Chargement...</div>;

    return (
        <>
            <Navbar />
            <div className="detail-container" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
                <Link to="/boutique" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#7B88FF', marginBottom: '20px' }}>
                    <FaArrowLeft /> Retour à la boutique
                </Link>
                
                <div className="detail-card" style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{livre.nom}</h1>
                    <h3 style={{ color: '#666', marginBottom: '20px' }}>Par {livre.auteur}</h3>
                    <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '5px 10px', borderRadius: '20px', fontSize: '0.9rem' }}>
                        {livre.categorie}
                    </span>
                    
                    <div style={{ marginTop: '30px', lineHeight: '1.6', color: '#333' }}>
                        <h4>Description :</h4>
                        <p>{livre.description}</p>
                    </div>

                    {/* BOUTON MODIFIÉ ICI */}
                    <button onClick={handleEmprunt} style={{ marginTop: '30px', padding: '12px 24px', background: '#7B88FF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>
                        Louer ce livre
                    </button>
                </div>
            </div>
        </>
    );
}