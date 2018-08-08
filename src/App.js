import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

// import Header from './components/Header/Header';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import InfoPage from './components/InfoPage/InfoPage';

//Stepper views
import RoomComponent from './components/RoomComponent/RoomComponent';
import ApptTimeSelectView from './views/customerFacing/ApptTimeSelectView';
import ContactInfoView from './views/customerFacing/ContactInfoView';
import RoomInputView from './views/customerFacing/RoomInputView';
import EstimatorControlView from './views/adminFacing/EstimatorControlView';
import RequestsView from './views/adminFacing/RequestsView';

//Main view
import CustomerLandingView from './views/customerFacing/LandingView';
import './styles/main.css';

// Admin views
import AdminLoginView from './views/adminFacing/AdminLoginView';
import AccountCreationView from './views/adminFacing/AccountCreationView';
import AdminCalendarView from './views/adminFacing/AdminCalendarView'


const App = () => (
  <div>
    {/* <Header title="Project Base" /> */}

    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={CustomerLandingView}
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
          path="/roominput"
          component={RoomInputView}
        />
        <Route
          path="/roomcomponent"
          component={RoomComponent}
        />
        <Route
          path="/schedule"
          component={ApptTimeSelectView}
        />
        <Route
          path="/contact"
          component={ContactInfoView}
        />
        {/* <Route
          path="/landing"
          component={LandingView}
        /> */}
        <Route 
          path="/estimator"
          component={EstimatorControlView}
        />
        <Route 
          path="/accountCreation"
          component={AccountCreationView}
        />
        <Route
          path="/requests"
          component={RequestsView}
        />
        <Route
          path="/login"
          component={AdminLoginView}
        />
        <Route
          path="/calendar"
          component={AdminCalendarView}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
