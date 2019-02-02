import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './firebase/store';


import AppNavBar from './components/layout/AppNavBar/AppNavBar';
import Dashboard from './components/layout/Dashboard/Dashboard';
import AddClient from './components/clients/AddClient/AddClient';
import EditClient from './components/clients/EditClient/EditClient';
import ClientDetails from './components/clients/ClientDetails/ClientDetails';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <main className="App">
            <AppNavBar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/client/add" component={AddClient} />
              <Route exact path="/client/:id" component={ClientDetails} />
              <Route exact path="/client/edit/:id" component={EditClient} />
            </Switch>
          </main>
        </Router>
      </Provider>
    );
  }
}

export default App;
