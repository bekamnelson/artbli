function Login(){
    return(
        <form>
            <label htmlFor="email">email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">password</label>
            <input type="password" name="password" id="password" />
            <input type="submit" value="envoyer" />
        </form>
    )
}
export default Login;