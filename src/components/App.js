import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import SignUp from './SignUp/signup';
import Login from './Login/login';
import Password from './Password/password';
import ClassifiedAds  from '../containers/HomeContainer';
import CreateAd from '../containers/CreateAdContainer';
import AdDetails from '../containers/AdsContainer';
import ChangeDetail from '../containers/ChangeAdContainer';
import UserAdsContainer from '../containers/UserAdsContainer';
// Error Handler
import ErrorCatch from '../errorCatch';

const App = () => (
  <ErrorCatch>
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={ClassifiedAds} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/password' component={Password} />
            <Route exact path='/createAd' component={CreateAd} />
            <Route path={'/detail/:detId'} component={AdDetails} />
            <Route path={'/change/:detId'} component={ChangeDetail} />
            <Route path={'/:username'} component={UserAdsContainer} />
          </Switch>
        </div>
      </Router> 
  </ErrorCatch> 
);


export default App;