import { Link } from 'react-router-dom';
import image from './../assets/image.png';
import './../css/acceuil.css';

function Acceuil(){
    return (
        <>
        <nav>
            <div className='navimage'>
                <img src={image} alt='ARTBLI'/>
            </div>
            <div className='bouton login'>
               <Link to='/login' >se connecter</Link>
            </div>
            <div className='bouton form'>
                <Link to='/form'>creer un compte </Link>
            </div>
            
        </nav>
        <div className='container'>
            <div className='description'>
                <p>
                    Bienvenue sur ARTBLI, la plateforme de location de livres qui réinvente votre façon de lire. Accédez à 
                un catalogue de milliers de romans, thrillers, mangas et essais pour le prix d'un seul bouquin. Empruntez, dévorez, 
                renvoyez... et recommencez ! 
                Plus de piles de livres qui prennent la poussière, juste le plaisir de lire en toute liberté.
                </p>
                <div className='bouton '>
                <Link to='/form'>commencer </Link>
            </div>
            </div>
            <div className='image'>
                <img src={image} alt='ARTBLI'/>
            </div>

        </div>
        <footer>
              2026 tout droit reserver
        </footer>
        </>
    );
}


export default Acceuil;