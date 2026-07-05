import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './../assets/image.png'; 
export default function Navbar() {
    const navigate = useNavigate();
    

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

  
    const isAdmin = user && user.statut === 'admin';


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 8%', backgroundColor: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            
            {/* LOGO */}
            <div className="navimage">
                <Link to="/">
                    <img src={logo} alt="Logo ARTBLI" style={{ height: '45px' }} />
                </Link>
            </div>

     
            <div className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link to="/boutique" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Boutique</Link>
                
               
                {user ? (
                    <>
                        <Link to="/profil" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Mon Profil</Link>
                        
                    
                        {isAdmin && (
                            <Link to="/admin" style={{ textDecoration: 'none', color: '#7B88FF', fontWeight: 'bold' }}>
                                Tableau de bord
                            </Link>
                        )}

                        <button onClick={handleLogout} style={{ background: '#ff4b4b', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Déconnexion
                        </button>
                    </>
                ) : (
                  
                    <>
                        <Link to="/login" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Connexion</Link>
                        <Link to="/singup" style={{ background: '#7B88FF', color: 'white', padding: '8px 15px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Inscription</Link>
                    </>
                )}
            </div>
        </nav>
    );
}