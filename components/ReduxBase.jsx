import React, { useEffect, useSyncExternalStore } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import perfLogger from 'redux-perf-middleware';
import thunk from 'redux-thunk';

import { getReduxAnalyticsMiddleware } from './util/getReduxAnalyticsMiddleware';

const ReduxBase = ({
  analyticsMiddlewareArgs = [],
  getStoreRef = () => {},
  enhancers = [],
  reducer,
  initialState,
  children
}) => {
  const middleware = [thunk, getReduxAnalyticsMiddleware(...analyticsMiddlewareArgs)];

  // Some middleware should be skipped in test scenarios. Normally I wouldn't leave a comment
  // like this, but we had a bug where we accidentally added essential middleware here and it
  // was super hard to track down! :)
  // eslint-disable-next-line no-process-env
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(perfLogger);
  }

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  // Sync external store with React
  const state = useSyncExternalStore(() => store.getState(), () => store.subscribe(() => {}));

  useEffect(() => {
    getStoreRef(store);
  }, [store, getStoreRef]);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxBase;