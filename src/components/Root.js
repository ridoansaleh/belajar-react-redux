import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContainer from '../AppContainer';
import User from './User';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
        <div>
            <Route exact path="/" component={AppContainer} />
            <Route path="/edit/:userId?" component={User} />
        </div>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root