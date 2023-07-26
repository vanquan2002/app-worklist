import { useSelector } from 'react-redux';
import '../styles/Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function Header() {
    const user = useSelector(state => state.works.userData);

    const navigate = useNavigate();

    const handleSignOut = () => {
        auth.signOut()
        navigate('/')
    }

    return (
        <>
            <nav>
                <Link to='/'>Home</Link> |
                <Link to='/completed'>Completed</Link> |
                <Link to='/notcompleted'>Not Completed</Link>
            </nav>          
            <div className='header__user'>
                <img src={user.photoURL} alt="" />
                <div className='dropdown'>
                    <h1>{user.displayName}</h1>
                    <button className="button signout" onClick={handleSignOut}>Sign out</button>
                </div>
            </div>           
        </>
    )
}

export default Header