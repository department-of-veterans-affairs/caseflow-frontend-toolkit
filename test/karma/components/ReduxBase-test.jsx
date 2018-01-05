import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { connect } from 'react-redux';
import uuid from 'uuid';
import ReduxBase from '../../../components/ReduxBase';

import sinon from 'sinon';

const initialState = {
  reduxKey: 'initial value'
};

const ACTION_NAME = 'ACTION_NAME';

const reducer = (state, action) => {
  switch (action.type) {
  case ACTION_NAME:
    return { reduxKey: 'updated value' };
  default:
    return state;
  }
};

const keyId = 'redux-key';
const buttonId = 'button-id';

class ReduxDisplay extends React.PureComponent {
  handleUpdate = () => this.props.dispatch({
    type: ACTION_NAME
  })

  dispatchActionWithAnalytics = (analytics, type) => this.props.dispatch({
    type: type || `UNRECOGNIZED_ACTION_${uuid.v4()}`,
    meta: {
      analytics
    }
  })

  render() {
    return [
      <span key="display" id={keyId}>{this.props.reduxKey}</span>,
      <button key="update" id={buttonId} onClick={this.handleUpdate}>Update Redux value</button>
    ];
  }
}

const ConnectedReduxDisplay = connect(
  (state) => state
)(ReduxDisplay);

class TestHarness extends React.PureComponent {
  render() {
    return <ReduxBase initialState={initialState} reducer={reducer} analyticsMiddlewareArgs={['default-category']}>
      <ConnectedReduxDisplay />
    </ReduxBase>;
  }
}

const wait = (timeoutMs) => new Promise((resolve) => setTimeout(resolve, timeoutMs));

describe('ReduxBase', () => {
  let analyticsWrapper;

  beforeEach(() => {
    analyticsWrapper = sinon.spy(window, 'analyticsEvent');
  });

  afterEach(() => {
    analyticsWrapper.restore();
  });

  it('creates a working Redux environment', () => {
    const wrapper = mount(<TestHarness />);

    expect(wrapper.find(`#${keyId}`).text()).to.equal('initial value');

    wrapper.find(`#${buttonId}`).simulate('click');
    wrapper.update();

    expect(wrapper.find(`#${keyId}`).text()).to.equal('updated value');

    return wait().then(() => expect(analyticsWrapper).to.have.callCount(0));
  });

  /* eslint-disable no-undefined */
  describe('analytics', () => {

    const dispatchAnalyticsEvent = (analytics, actionType, delayMs = 100) => {
      const wrapper = mount(<TestHarness />);

      wrapper.find(ReduxDisplay).instance().
        dispatchActionWithAnalytics(analytics, actionType);

      return wait(delayMs);
    };

    it('fires an event with default analytics', () =>
      dispatchAnalyticsEvent(true, 'UNRECOGNIZED_ACTION').then(() => {
        expect(analyticsWrapper).to.have.callCount(1);
        expect(analyticsWrapper).to.have.been.calledWithExactly('default-category', 'UNRECOGNIZED_ACTION', undefined);
      })
    );

    it('fires an event with overridden values', () =>
      dispatchAnalyticsEvent({
        category: 'overridden-category',
        action: 'overridden-action',
        label: 'overriden-label'
      }).then(() => {
        expect(analyticsWrapper).to.have.callCount(1);
        expect(analyticsWrapper).to.have.been.calledWithExactly(
          'overridden-category', 'overridden-action', 'overriden-label'
        );
      })
    );

    it('debounces events', () => {
      const debounceMs = 500;
      const analytics = {
        debounceMs
      };
      const actionType = 'UNRECOGNIZED_ACTION_DEBOUNCE';

      dispatchAnalyticsEvent(analytics, actionType);
      dispatchAnalyticsEvent(analytics, actionType);
      dispatchAnalyticsEvent(analytics, actionType);

      return dispatchAnalyticsEvent(analytics, actionType, debounceMs * 1.5).then(() => {
        expect(analyticsWrapper).to.have.callCount(1);
      });
    });
  });
});
