import './App.css';
import HomeContent from './components/HomeContent/HomeContent';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { authThunk } from './redux/thunks/authThunk'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SavedTrand from './components/SavedTrand/SavedTrand';
import EditProfile from './components/EditProfile/EditProfile';
import NotFound from './components/NotFound/NotFound'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authThunk())
  }, [dispatch]);

  return (
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
  );
}

export default App;
