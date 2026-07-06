import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './../css/form.css';
import logo from './../assets/image.png';
import { API_URL } from '../service/api';

export default function Formulaire() {
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/singup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                navigate('/boutique');
            } else {
                setError(data.message || "Erreur lors de l'inscription");
            }
        } catch (err) {
            setError("Erreur de connexion au serveur");
        }
    };

    return (
        <div className="auth-page">
            <div className="form-container">
                <img src={logo} alt="Logo ARTBLI" className="form-logo" />
                
                <form className="form-box" onSubmit={handleSubmit}>
                    <h2>Créer un compte</h2>
                    {error && <div className="error-message">{error}</div>}
                    
                    <input type="text" name="username" placeholder="Nom d'utilisateur" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Adresse email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
                    <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" onChange={handleChange} required />
                    
                    <button type="submit" className="btn-submit">S'inscrire</button>
                </form>

                <div className="form-footer">
                    <p>Déjà un compte ? <Link to="/login">Se connecter</Link></p>
                </div>
            </div>
        </div>
    );
}