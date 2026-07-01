import './../css/form.css';
import image from './../assets/image.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState} from 'react';

function Login() {
   const [formData,setFormData] =useState({});
   const navigate = useNavigate();
  

   const handleChange = (e)=>{
    const {name,value}= e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:value

    }));
   }

   const handleSubmit =  (e)=>{
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/login',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(formData)
    }).then(async (reponse)=>{
        const data = await reponse.json();
        if(data.id){
            navigate(`/boutique/${data.id}`)
        }
    }).catch((error)=>{
        console.error("Erreur lors de la connexion :", error);
        
    })
   }


    return (
        <form action="#" onSubmit={handleSubmit}>
                <div className="informationimage">
                    <img src={image} alt="ARTBLI" />

            </div>

            <div className="information">
                <label htmlFor="emial">email:</label><br />
                <input type="email" name="email" id="email" onChange={handleChange}/>
            </div>
            <div className="information">
                <label htmlFor="password">mot de passe:</label><br />
                <input type="password" name="password" id="password" onChange={handleChange}/>
            </div>
           
            <div className='divbtnsubmit'>
                <button className='btnsubmit'>envoyer</button>
            </div>
            <div>
                deja un compte?<Link to='/form'>creer un compte </Link>
            </div>
        </form>
    );
}

export default Login;