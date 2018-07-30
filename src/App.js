import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';

//Stepper views
import Stepper from './components/Stepper/Stepper';
import AvailabilitySelectView from './components/AvailabilitySelectView/AvailabilitySelectView';
import ContactInfoView from './views/customerFacing/ContactInfoView';
import RoomInputView from './views/customerFacing/RoomInputView';

//Main view
import LandingView from './views/customerFacing/LandingView';
import './styles/main.css';

const App = () => (
  <div>
    <Header title="Certain Clean" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/info"
          component={InfoPage}
        />
        <Route
          path="/stepper"
          component={Stepper}
        />
        <Route
          path="/roominput"
          component={RoomInputView}
        />
        <Route
          path="/schedule"
          component={AvailabilitySelectView}
        />
        <Route
          path="/contact"
          component={ContactInfoView}
        />
        <Route
          path="/landing"
          component={LandingView}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
