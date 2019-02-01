import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './firebase/store';


import AppNavBar from './components/layout/AppNavBar/AppNavBar';
import Dashboard from './components/layout/Dashboard/Dashboard';
// import Clients from './components/clients/Clients';

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
              {/* <Route exact path="/clientes" component={Clients} /> */}
            </Switch>
          </main>
        </Router>
      </Provider>
    );
  }
}

export default App;
