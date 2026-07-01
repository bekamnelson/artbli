import './../css/form.css';
import image from './../assets/image.png';
import { Link , useNavigate} from 'react-router-dom';
import { useState } from 'react';

function Formulaire() {

   const [formDate, setformdata] = useState({});
   const navigate = useNavigate();
   const handleChange = (e)=>{
    const { name, value } = e.target;
      setformdata((prev)=>({
        ...prev,
        [name]:value
      }));
   }

   const handleSubmit =(e)=>{
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/singup',{
        method: 'POST',
        headers: {
              'Content-Type': 'application/json', 
          },
        body:JSON.stringify(formDate)
    }).then(async (reponse) => {
    const data = await reponse.json();
    
    if (!reponse.ok) {
        
        console.log("Erreurs de validation :", data.errors);
       
        return;
    }

    navigate(`/login`);

}).catch((error) => console.error("Erreur lors du login:", error));
   }

    return (
        <form action="#" onSubmit={handleSubmit}>
                <div className="informationimage">
                    <img src={image} alt="ARTBLI" />

            </div>
            <div className="information">
                <label htmlFor="username">nom:</label><br />
                <input type="text" name="username" id="username" onChange={handleChange}/>
            </div>
            <div className="information">
                <label htmlFor="emial">email:</label><br />
                <input type="email" name="email" id="email" onChange={handleChange}/>
            </div>
            <div className="information">
                <label htmlFor="password">mot de passe:</label><br />
                <input type="password" name="password" id="password" onChange={handleChange}/>
            </div>
            <div className="information">
                <label htmlFor="confirmpassword">confirmer votre mot de passe:</label><br />
                <input type="password" name="confirmpassword" id="confirmpassword" onChange={handleChange} />
            </div>

            <div className='divbtnsubmit'>
                <button className='btnsubmit' >envoyer</button>
            </div>
            <div>
                deja un compte?<Link to='/login' >se connecter</Link>
            </div>
        </form>
    );
}

export default Formulaire;