import { ConnectedRouter } from 'connected-react-router'
import PropTypes from 'prop-types'
import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'

import { AddNewItemForm } from '../components/add-new-item'
import { Landing } from '../components/landing'
import { FeedMap } from '../containers/feed-map'
import { UpdatesFeed } from '../containers/updates-feed'

import AppContainer from './container'

const AppRouter = ({ history, store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <Switch>
          <Route exact path='/' render={() => <Landing />} />
          <Route path='/add-new-item' render={() => <AddNewItemForm />} />
          <Route path='/feed' render={() => <UpdatesFeed />} />
          <Route path='/map' render={() => <FeedMap />} />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
      </AppContainer>
    </ConnectedRouter>
  </Provider>
)

AppRouter.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default AppRouter
