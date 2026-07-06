import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navarbar';
import { FaBookOpen } from 'react-icons/fa';
import { API_URL } from '../service/api';

export default function MonProfil() {
    const [emprunts, setEmprunts] = useState([]);
    const navigate = useNavigate();
    
    
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

   useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetch(`${API_URL}/user/${user.id}/emprunts`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erreur serveur 500");
                }
                return res.json();
            })
            .then(data => {
                
                if (Array.isArray(data)) {
                    setEmprunts(data);
                } else {
                    console.error("Les données reçues ne sont pas un tableau :", data);
                    setEmprunts([]); 
                }
            })
            .catch(err => {
                console.error("Erreur lors de la récupération des emprunts :", err);
                setEmprunts([]); 
            });
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Navbar />
            
            <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
                <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                    <h1 style={{ margin: '0 0 10px 0', color: '#111827' }}>Bonjour, {user.username} !</h1>
                    <p style={{ color: '#6b7280', margin: 0 }}>Email : {user.email}</p>
                </div>

                <h2 style={{ color: '#374151', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FaBookOpen color="#7B88FF" /> Mes livres en cours de location
                </h2>

                {emprunts.length === 0 ? (
                    <p style={{ color: '#6b7280', background: 'white', padding: '20px', borderRadius: '8px' }}>
                        Vous n'avez aucun livre en cours de location.
                    </p>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {emprunts.map((emprunt) => (
                            <div key={emprunt.id} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ margin: '0 0 5px 0', color: '#1f2937' }}>{emprunt.livre.nom}</h3>
                                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>Par {emprunt.livre.auteur}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ display: 'block', fontSize: '0.8rem', color: '#9ca3af' }}>Loué le :</span>
                                    <span style={{ fontWeight: 'bold', color: '#4f46e5' }}>
                                        {new Date(emprunt.created_at).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}