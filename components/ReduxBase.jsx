import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import perfLogger from 'redux-perf-middleware';
import thunk from 'redux-thunk';

import { getReduxAnalyticsMiddleware } from './util/getReduxAnalyticsMiddleware';

export default class ReduxBase extends React.PureComponent {
  componentWillMount() {
    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middleware = [thunk, getReduxAnalyticsMiddleware(...this.props.analyticsMiddlewareArgs)];

    // Some middleware should be skipped in test scenarios. Normally I wouldn't leave a comment
    // like this, but we had a bug where we accidentally added essential middleware here and it  
    // was super hard to track down! :)
    if (process.env.NODE_ENV !== 'test') {
      middleware.push(perfLogger);
    }

    const store = createStore(
      this.props.reducer,
      this.props.initialState,
      composeEnhancers(
        applyMiddleware(...middleware),
        ...this.props.enhancers
      )
    );

    this.setState({ store });
  }

  componentDidMount() {
    // Dispatch relies on direct access to the store. It would be better to use connect(),
    // but for now, we will expose this to grant that access.
    this.props.getStoreRef(this.state.store);
  }

  render = () =>
    <Provider store={this.state.store}>
      {this.props.children}
    </Provider>;
}

ReduxBase.defaultProps = {
  analyticsMiddlewareArgs: [],
  // eslint-disable-next-line no-empty-function
  getStoreRef: () => {},
  enhancers: []
};
