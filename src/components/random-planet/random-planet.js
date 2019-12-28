import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PlanetView from '../planet-view'
import Spinner from '../spinner'
import SwapiService from '../../services/swapi-service'
import ErrorBoundry from '../error-boundry'
import ErrorIndicator from '../error-indicator'

import './random-planet.css'

export default class RandomPlanet extends Component {

  static defaultProps = {
    updateInterval: 5000
  }

  static propTypes = {
    updateInterval: PropTypes
  }

  swapiService = new SwapiService()

  state = {
    planet: {},
    loading: true,
    error: false
  }

  componentDidMount() {
    const { updateInterval } = this.props
    this.updatePlanet()
    this.interval = setInterval(this.updatePlanet, updateInterval)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }


  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet = () => {
    console.log('update');
    const id = Math.floor(Math.random()*17) + 1;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  render() {

    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator/> : null
    const spinner = loading ? <Spinner /> : null
    const content = hasData ? <PlanetView planet={planet}/> : null

    return (
      <ErrorBoundry>
        <div className="random-planet jumbotron rounded">
          {errorMessage}
          {spinner}
          {content}
        </div>
      </ErrorBoundry>
    );
  }
}