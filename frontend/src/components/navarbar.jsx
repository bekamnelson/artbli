import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './../assets/image.png';
import './../css/navbar.css'; 
export default function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

  
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

   
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/'); 
    };

    return (
        <nav className="navbar">
            <div className="navimage">
                <Link to={user ? "/boutique" : "/"}>
                    <img src={logo} alt="Logo ARTBLI" />
                </Link>
            </div>
            
            <div className="nav-links">
               
                {user ? (
                    <>
                        
                        {user.statut === 'admin' && (
                            <Link to="/admin" className="nav-item">Tableau de bord</Link>
                        )}
                        
                      
                        <Link to="/boutique" className="nav-item">Catalogue</Link>
                        <Link to="/mes-emprunts" className="nav-item">Mes emprunts</Link>
                        <Link to="/profil" className="nav-item">Mon profil</Link>
                        
                       
                        <button onClick={handleLogout} className="bouton bouton-outline btn-logout">
                            Se déconnecter
                        </button>
                    </>
                ) : (
                   
                    <>
                        <Link to="/login" className="bouton bouton-outline">Se connecter</Link>
                        <Link to="/singup" className="bouton">Créer un compte</Link>
                    </>
                )}
            </div>
        </nav>
    );
}