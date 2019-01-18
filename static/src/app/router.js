import { ConnectedRouter } from 'connected-react-router'
import PropTypes from 'prop-types'
import React, { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'

// import AddNewItemForm from '../components/add-new-item'
const AddNewItemForm = lazy(() => import(/* webpackChunkName: "add-new-item" */'../components/add-new-item'));

import { Landing } from '../components/landing'
import { FeedMap } from '../containers/feed-map'
import { UpdatesFeed } from '../containers/updates-feed'

import AppContainer from './container'

const AppRouter = ({ history, store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' render={() => <Landing />} />
            <Route path='/add-new-item' component={AddNewItemForm} />
            <Route path='/feed' render={() => <UpdatesFeed />} />
            <Route path='/map' render={() => <FeedMap />} />
            <Route render={() => (<div>Miss</div>)} />
          </Switch>
        </Suspense>
      </AppContainer>
    </ConnectedRouter>
  </Provider>
)

AppRouter.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default AppRouter
