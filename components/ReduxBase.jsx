import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  const [store, setStore] = useState(null);

  const memoizedGetStoreRef = useCallback(getStoreRef, []);

  const middleware = useMemo(() => {
    const middlewareArray = [thunk, getReduxAnalyticsMiddleware(...analyticsMiddlewareArgs)];

    // Some middleware should be skipped in test scenarios. Normally I wouldn't leave a comment
    // like this, but we had a bug where we accidentally added essential middleware here and it
    // was super hard to track down! :)
    // eslint-disable-next-line no-process-env
    if (process.env.NODE_ENV !== 'test') {
      middlewareArray.push(perfLogger);
    }

    return middlewareArray;
  }, [analyticsMiddlewareArgs]);

  const composeEnhancers = useMemo(() => {
    // eslint-disable-next-line no-underscore-dangle
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }, []);

  useEffect(() => {
    const newStore = createStore(
      reducer,
      initialState,
      composeEnhancers(
        applyMiddleware(...middleware),
        ...enhancers
      )
    );

    setStore(newStore);
    memoizedGetStoreRef(newStore);
  }, [composeEnhancers, enhancers, reducer, initialState, middleware, memoizedGetStoreRef]);

  if (!store) return null;

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxBase;