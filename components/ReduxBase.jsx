import React, { useState, useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import perfLogger from 'redux-perf-middleware';
import thunk from 'redux-thunk';

import { getReduxAnalyticsMiddleware } from './util/getReduxAnalyticsMiddleware';

const ReduxBase = ({
  analyticsMiddlewareArgs = [],
  enhancers = [],
  reducer,
  initialState,
  children,
  getStoreRef
}) => {
  const [store, setStore] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const middleware = useMemo(() => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middleware = [thunk, getReduxAnalyticsMiddleware(...analyticsMiddlewareArgs)];

    if (process.env.NODE_ENV !== 'test') {
      middleware.push(perfLogger);
    }

    return composeEnhancers(applyMiddleware(...middleware), ...enhancers);
  }, [analyticsMiddlewareArgs, enhancers]);

  useEffect(() => {
    if (!isInitialized) {
      const newStore = createStore(reducer, initialState, middleware);
      setStore(newStore);
      setIsInitialized(true);

      if (typeof getStoreRef === 'function') {
        getStoreRef(newStore);
      }
    }
  }, [reducer, initialState, middleware, isInitialized, getStoreRef]);

  if (!store) return null;

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxBase;
