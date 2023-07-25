import { signInWithGoogle } from "../firebase";
import '../styles/LogIn.css'

function LogIn() {

    return (
        <div className="login">
            <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
        </div>
    )
}

export default LogIn;