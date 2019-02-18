import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowUp,
  faArrowDown,
  faExternalLinkAlt,
  faCog,
  faGlobe,
  faHashtag,
  faHome,
  faKey,
  faLink,
  faListAlt,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import AppContextProvider from './ContextProvider';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './PrivateRoute';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Terms from './pages/Terms';

import '../static/css/slim.css';
import '../static/css/slim.one.css';


library.add(
  faArrowUp,
  faArrowDown,
  faCog,
  faExternalLinkAlt,
  faGlobe,
  faHashtag,
  faHome,
  faKey,
  faLink,
  faListAlt,
  faSignOutAlt,
  faUser,
);

const App = () => (
  <Router>
    <AppContextProvider>

      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/reset_password" component={ResetPassword} />
      <Route exact path="/reset_password/:token" component={ResetPassword} />
      <Route exact path="/terms" component={Terms} />

      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/settings" component={Settings} />
      <PrivateRoute exact path="/" component={Dashboard} />

    </AppContextProvider>
  </Router>
);

export default App;
