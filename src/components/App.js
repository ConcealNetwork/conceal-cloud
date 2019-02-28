import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import {
  faArrowUp,
  faArrowDown,
  faCopy,
  faCog,
  faExternalLinkAlt,
  faGlobe,
  faHashtag,
  faHome,
  faKey,
  faLink,
  faListAlt,
  faNetworkWired,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';

import AppContextProvider from './ContextProvider';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Terms from './pages/Terms';
import PrivateRoute from './PrivateRoute';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import GettingStarted from './pages/GettingStarted';
import UpcomingFeatures from './pages/UpcomingFeatures';

import '../static/css/slim.css';
import '../static/css/slim.one.css';


library.add(
  fab,
  faArrowUp,
  faArrowDown,
  faCheck,
  faCopy,
  faCog,
  faExternalLinkAlt,
  faGlobe,
  faHashtag,
  faHome,
  faKey,
  faLink,
  faListAlt,
  faNetworkWired,
  faSignOutAlt,
);

const App = () => (
  <Router>
    <AppContextProvider>

      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/reset_password" component={ResetPassword} />
      <Route exact path="/reset_password/:token" component={ResetPassword} />
      <Route exact path="/terms" component={Terms} />

      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute exact path="/settings" component={Settings} />
      <PrivateRoute exact path="/getting_started" component={GettingStarted} />
      <PrivateRoute exact path="/upcoming_features" component={UpcomingFeatures} />

    </AppContextProvider>
  </Router>
);

export default App;
