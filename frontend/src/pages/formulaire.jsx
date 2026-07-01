function Formulaire(){
    return (
        <form action="#">
            <label htmlFor="username">nom</label>
            <input type="text" name="username" id="username" />
            <label htmlFor="email">email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" />
            <label htmlFor="confirmpassword">password</label>
            <input type="password" name="confirmpassword" id="confirmpassword" />
            <input type="submit" value="envoyer" />
        </form>
    );
}

export default Formulaire;