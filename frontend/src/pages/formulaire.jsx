import './../css/form.css';
import image from './../assets/image.png';
import { Link } from 'react-router-dom';

function Formulaire() {
    return (
        <form action="#">
                <div className="informationimage">
                    <img src={image} alt="ARTBLI" />

            </div>
            <div className="information">
                <label htmlFor="username">nom:</label><br />
                <input type="text" name="username" id="username" />
            </div>
            <div className="information">
                <label htmlFor="emial">email:</label><br />
                <input type="email" name="email" id="email" />
            </div>
            <div className="information">
                <label htmlFor="password">mot de passe:</label><br />
                <input type="password" name="password" id="password" />
            </div>
            <div className="information">
                <label htmlFor="confirmpassword">confirmer votre mot de passe:</label><br />
                <input type="password" name="confirmpassword" id="confirmpassword"  />
            </div>

            <div className='divbtnsubmit'>
                <button className='btnsubmit'>envoyer</button>
            </div>
            <div>
                deja un compte?<Link to='/login' >se connecter</Link>
            </div>
        </form>
    );
}

export default Formulaire;