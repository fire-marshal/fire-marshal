import PropTypes from 'prop-types'
import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'

import { AddNewItemForm } from '../components/add-new-item'
import { Landing } from '../components/landing'
import { MapContainer } from '../components/map'
import { UpdatesFeed } from '../containers/updates-feed'

import AppContainer from './container'

// it isn't ok to pass component inside of another one but because we should have the same deps here and in app/index.js
// it would be better to just pass it inside
const AppRouter = ({ ConnectedRouter, history, store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <Switch>
          <Route exact path='/' render={() => <Landing />} />
          <Route path='/add-new-item' render={() => <AddNewItemForm />} />
          <Route path='/feed' render={() => <UpdatesFeed />} />
          <Route path='/map' render={() => <MapContainer />} />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
      </AppContainer>
    </ConnectedRouter>
  </Provider>
)

AppRouter.propTypes = {
  ConnectedRouter: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default AppRouter
