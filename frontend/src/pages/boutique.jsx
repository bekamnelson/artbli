import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navarbar';
import './../css/boutique.css';

export default function Boutique() {
    const [livres, setLivres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
   
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchLivres();
    }, []);

    const fetchLivres = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/livre', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération du catalogue');
            }

            const data = await response.json();
            setLivres(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

   
    const livresFiltres = livres.filter((livre) => {
        return (
            livre.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            livre.auteur.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div className="boutique-page">
            <Navbar />
            
            <div className="boutique-container">
                <h1 className="titre-section">Notre Catalogue</h1>

              
                <div className="recherche-container">
                    <input 
                        type="text" 
                        className="recherche-input" 
                        placeholder="Rechercher un livre ou un auteur..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading && <div className="loader">Chargement des livres en cours...</div>}
                
                {error && <div className="error-message" style={{maxWidth: '600px', margin: '0 auto'}}>{error}</div>}

               
                {!loading && !error && livresFiltres.length === 0 && (
                    <p style={{textAlign: 'center', color: '#6b7280', fontSize: '1.1rem'}}>
                        Aucun livre ne correspond à votre recherche.
                    </p>
                )}

                <div className="grille-livres">
                   
                    {livresFiltres.map((livre) => (
                        <div key={livre.id} className="carte-livre">
                            <div className="couverture-livre">
                                {livre.nom.charAt(0)}
                            </div>
                            
                            <div className="contenu-livre">
                                <span className="badge-categorie">{livre.categorie}</span>
                                <h3 className="titre-livre">{livre.nom}</h3>
                                <p className="auteur-livre">Par {livre.auteur}</p>
                                
                                <p className="description-livre">
                                    {livre.description.length > 100 
                                        ? livre.description.substring(0, 100) + '...' 
                                        : livre.description}
                                </p>
                                
                                <Link to={`/livre/${livre.id}`} className="btn-details">
                                    Voir les détails
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}