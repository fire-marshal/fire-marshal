import { ConnectedRouter } from 'connected-react-router'
import PropTypes from 'prop-types'
import React, { lazy, Suspense } from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'

import AppContainer from './container'

import { lazyLoadingErrorBoundary } from '../error-boundaries/lazy-loading-error-boundary'

const AddNewItemForm = lazyLoadingErrorBoundary(lazy(
  () => import(/* webpackChunkName: "add-new-item" */ '../components/add-new-item')
))
const Landing = lazyLoadingErrorBoundary(lazy(
  () => import(/* webpackChunkName: "landing" */ '../components/landing')
))
const UpdatesFeed = lazyLoadingErrorBoundary(lazy(
  () => import(/* webpackChunkName: "updates-feed" */ '../containers/updates-feed')
))

const AppRouter = ({ history, store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/add-new-item' component={AddNewItemForm} />
            <Route path='/feed' component={UpdatesFeed} />
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
