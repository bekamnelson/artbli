import Navbar from '../components/navarbar';
import { Link } from 'react-router-dom';
import './../css/acceuil.css'; 
import image from './../assets/image.png';

export default function Accueil() {
    return (
        <>
            <Navbar />
            
            <div className="container">
                <div className="description">
                    <p>La lecture sans attente avec ARTBLI</p>
                    <span>
                        Louez vos livres en quelques clics. Fini les files d'attente interminables en bibliothèque. 
                        Gagnez du temps, économisez de l'énergie et réduisez votre empreinte carbone grâce à notre catalogue numérique.
                    </span>
                    <Link to="/singup" className="bouton">Explorer le catalogue</Link>
                </div>
                
                <div className="image">
                   
                    <img src={image} alt="Illustration lecture" />
                </div>
            </div>

            <footer>
                <h2>ARTBLI</h2>
                <p>© 2026 - Application de location de livres. Tous droits réservés.</p>
            </footer>
        </>
    );
}