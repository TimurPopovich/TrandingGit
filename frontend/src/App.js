import './App.css';
import HomeContent from './components/HomeContent/HomeContent';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { authThunk } from './redux/thunks/authThunk'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import SavedTrand from './components/SavedTrand/SavedTrand';
import EditProfile from './components/EditProfile/EditProfile';
import NotFound from './components/NotFound/NotFound'
import { AppContext } from './context/context';
import Theme from './components/Theme/Theme';

function App() {

  const dispatch = useDispatch();

  const getTheme = () => {
    return localStorage.getItem("application-theme") || "dark";
  };

  const setTheme = (theme) => {
    localStorage.setItem("application-theme", theme);

    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  };

  const [theme, toggleTheme] = useState(getTheme());

  useEffect(() => {
    setTheme(theme)
  }, [theme])

  useEffect(() => {
    dispatch(authThunk())
  }, [dispatch]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <div className="App">
        <Router>

          <Sidebar />

          <div id='home_content' className='home_content'>
            <Switch>

              <Route path='/' exact>
                <HomeContent />
              </Route>

              <Route path='/saved' exact>
                <SavedTrand />
              </Route>

              <Route path='/setting' exact>
                <EditProfile />
              </Route>

              <Route path='/profile' exact>
                <Profile />
              </Route>

              <Route path='/login' exact>
                <Login />
              </Route>

              <Route path='/register' exact>
                <Register />
              </Route>

              <Route>
                <NotFound />
              </Route>

            </Switch>
          </div>

        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
