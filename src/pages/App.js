import { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Import auth từ file firebase.js
import LogIn from './LogIn';
import WorkManager from './WorkManager';
import '../styles/App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  console.log(user);

  return (
    <div className="app">
      {user ? <WorkManager user={user}/> : <LogIn />}
    </div>
  );
}

export default App;
