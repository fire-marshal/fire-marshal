import { ConnectedRouter } from 'connected-react-router'
import PropTypes from 'prop-types'
import React, { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'

import AppContainer from './container'

import { LazyLoadingErrorBoundaries } from '../error-boundaries/lazy-loading-error-boundary'

const AddNewItemForm = lazy(
  () => import(/* webpackChunkName: "add-new-item" */ '../components/add-new-item')
)

const Landing = lazy(
  () => import(/* webpackChunkName: "landing" */ '../components/landing')
)
const UpdatesFeed = lazy(
  () => import(/* webpackChunkName: "updates-feed" */ '../containers/updates-feed')
)

const AppRouter = ({ history, store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <LazyLoadingErrorBoundaries>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route path='/add-new-item' component={AddNewItemForm} />
              <Route path='/feed' component={UpdatesFeed} />
              <Route render={() => (<div>Miss</div>)} />
            </Switch>
          </Suspense>
        </LazyLoadingErrorBoundaries>
      </AppContainer>
    </ConnectedRouter>
  </Provider>
)

AppRouter.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

export default AppRouter
