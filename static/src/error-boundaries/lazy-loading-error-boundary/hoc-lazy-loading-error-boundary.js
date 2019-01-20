import React from 'react'

import LazyLoadingErrorBoundaries from './lazy-loading-error-boundary'

export default (WrappedComponent) => {
  const LazyLoadingErrorBoundariesWrapper = (props) => (
    <LazyLoadingErrorBoundaries>
      <WrappedComponent {...props} />
    </LazyLoadingErrorBoundaries>
  )

  LazyLoadingErrorBoundariesWrapper.displayName = `LazyLoadingErrorBoundariesWrapper(${WrappedComponent.displayName})`

  return LazyLoadingErrorBoundariesWrapper
}
