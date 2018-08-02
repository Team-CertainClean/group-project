import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';

//Stepper views
import Stepper from './components/Stepper/Stepper';
import RoomComponent from './components/RoomComponent/RoomComponent';
import AvailabilitySelectView from './components/AvailabilitySelectView/AvailabilitySelectView';
import ContactInfoView from './views/customerFacing/ContactInfoView';
import RoomInputView from './views/customerFacing/RoomInputView';
import EstimatorControlView from './views/adminFacing/EstimatorControlView';

//Main view
import LandingView from './views/customerFacing/LandingView';
import './styles/main.css';

// Admin views
import AccountCreationView from './views/adminFacing/AccountCreationView';

const App = () => (
  <div>
    {/* <Header title="Project Base" /> */}

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
          path="/roomcomponent"
          component={RoomComponent}
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
        <Route 
          path="/estimator"
          component={EstimatorControlView}
        />
        <Route 
          path="/accountCreation"
          component={AccountCreationView}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
