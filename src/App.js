import { useEffect} from 'react';
import { auth } from './utils/firebase'; 
import LogIn from './pages/LogIn';
import WorkManager from './pages/WorkManager';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/workSlice';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Header from './components/Header';
import Completed from './pages/Completed';
import NotCompleted from './pages/NotCompleted';
import User from './pages/User';
import Error404 from './pages/Error404'

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
        <Route path='/completed' element={<Completed />}/>
        <Route path='/notcompleted' element={<NotCompleted />}/>
        <Route path='/user' element={<User />}/>
        <Route path='/*' element={<Error404 />}/>
        <Route path='/' element={user ? <WorkManager /> : <LogIn />}/>
      </Routes>
    </Router>
  );
}

export default App;
