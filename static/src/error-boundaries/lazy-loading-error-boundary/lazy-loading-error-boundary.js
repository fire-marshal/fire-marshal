import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router'

const extractModuleName = /.*\/(?<fileName>[\w-..]*)/

class LazyLoadingErrorBoundary extends React.Component {
  static displayName = 'LazyLoadingErrorBoundary'

  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = { hasError: false, moduleName: null }
  }

  static getDerivedStateFromError (error) {
    if (error.request) {
      const moduleName = error.request.match(extractModuleName).groups.fileName
      // error.request
      // Update state so the next re/der will show the fallback UI.
      return { hasError: true, moduleName }
    }

    return null
  }

  // Log the error to an error reporting service
  // componentDidCatch (error, info) {
  //   logErrorToMyService(error, info);
  // }

  render () {
    const { hasError, moduleName } = this.state
    if (hasError) {
      // propose to refresh page
      return (
        <div className='alert alert-danger' role='alert'>
          We failed to load module <strong>{moduleName}</strong>.<br />
          Go&nbsp;
          <button
            className='btn btn-primary btn-sm'
            onClick={() => this.props.history.goBack()}>back</button>
          &nbsp;or&nbsp;
          <button
            className='btn btn-secondary btn-sm'
            onClick={() => this.props.history.go(0)}>refresh</button>.
        </div>
      )
    }

    return this.props.children
  }
}

export default withRouter(LazyLoadingErrorBoundary)
