import { useEffect} from 'react';
import { auth } from '../firebase'; 
import LogIn from './LogIn';
import WorkManager from './WorkManager';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../reducers/workSlice';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Header from './Header';
import Completed from './Completed';
import NotCompleted from './NotCompleted';
import Search from './Search';
import User from './User';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.works.userData);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const userData = {
          userId: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email
        };
        dispatch(setUser(userData));
      }else{
        dispatch(setUser(null));
      }
    })
  }, [])

  return (
    <Router>
      {user ? <Header /> : null}

      <Routes>
        <Route path='/' element={user ? <WorkManager /> : <LogIn />}/>
        <Route path='/completed' element={<Completed />}/>
        <Route path='/notcompleted' element={<NotCompleted />}/>
        <Route path='/user' element={<User />}/>
        <Route path='/search' element={<Search />}/>
      </Routes>
    </Router>
  );
}

export default App;
