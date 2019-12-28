import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Header from '../header'
import RandomPlanet from '../random-planet'
import SwapiService from '../../services/swapi-service'
import DummySwapiService from '../../services/dummy-swapi-service'
import { SwapiServiceProvider } from '../swapi-service-context'
import ErrorBoundry from '../error-boundry'
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage
} from '../pages'
import { StarshipDetails } from '../sw-components'


import './app.css'


export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  }

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  onExit = () => {
    this.setState({
      isLoggedIn: false
    })
  }

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
                        DummySwapiService : SwapiService
      return { swapiService: new Service() }
    })
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }


  render() {

    const { swapiService, isLoggedIn } = this.state

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={swapiService} >
          <Router>
            <div className="stardb-app container">
              <Header
                onServiceChange={this.onServiceChange}
                onLogin={this.onLogin}
                onExit={this.onExit}
                isLoggedIn={isLoggedIn}
              />
              <RandomPlanet updateInterval={10000} />

              <Switch>
                <Route
                  path="/"
                  render={() => <h2>Welcome to StarDB</h2>}
                  exact
                />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets/:id?" component={PlanetsPage} />
                <Route path="/starships/:id?" component={StarshipsPage} exact />
                {/* <Route path="/starships/:id"
                      render={({ match }) => {
                        const { id } = match.params
                        return <StarshipDetails itemId={id} />
                      }} /> */}
                <Route
                  path="/login"
                  render={() => (
                    <LoginPage
                      isLoggedIn={isLoggedIn}
                      onLogin={this.onLogin}
                    />
                  )}
                />
                <Route
                  path="/secret"
                  render={() => (
                    <SecretPage isLoggedIn={isLoggedIn}/>
                  )}
                />
                <Redirect to='/' />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    )
  }
}
