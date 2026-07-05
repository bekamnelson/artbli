import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './../css/form.css';
import logo from './../assets/image.png'
export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
               
                if (data.user.statut === 'admin') {
                    navigate('/admin'); 
                } else {
                    navigate('/boutique'); 
                }
            } else {
                setError(data.message || "Identifiants incorrects");
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
                    <h2>Bon retour !</h2>
                    {error && <div className="error-message">{error}</div>}

                    <input type="email" name="email" placeholder="Adresse email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
                    
                    <button type="submit" className="btn-submit">Se connecter</button>
                </form>

                <div className="form-footer">
                    <p>Pas encore de compte ? <Link to="/singup">Créer un compte</Link></p>
                </div>
            </div>
        </div>
    );
}