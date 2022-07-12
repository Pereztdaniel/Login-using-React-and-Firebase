import './App.css';
import { useEffect } from 'react';
import Login from './components/Login.js';
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import Main from './components/Main.js'; 
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { actionTypes } from './reducer';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';


function App() {

  const [{isopen, user, darkMode}, dispatch] = useStateValue();

  const theme = createTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  })

  useEffect(() => {
      onAuthStateChanged(auth, user => {
        if(user){
          dispatch({
            type: actionTypes.SET_USER,
            user: user,
          })
        }
      });
      console.log(user);
  }, [])

  return (
    <div className="app">
      
      {
      
        !user ? (
            <>
              <Header />
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Login />
              </ThemeProvider>
            </>
          ) : (
            <>
              <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Header />
                <div className={`app__central ${isopen ? "displayed" : ""}`}>
                  <Sidebar />
                  <Main />
                </div>
              </ThemeProvider>
            </>  
      )
      }
      
    </div>
  );
}

export default App;
