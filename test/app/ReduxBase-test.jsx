import React from 'react';
// import { expect } from 'chai';
// import { mount } from 'enzyme';
import { fireEvent, logRoles, render, screen, waitFor } from '@testing-library/react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import ReduxBase from '../../components/ReduxBase';

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
  handleUpdate = () => {
    console.log('handleUpdate called');
    this.props.dispatch({
      type: ACTION_NAME
    });
  
    console.log('Calling dispatchActionWithAnalytics');
    this.dispatchActionWithAnalytics('default-category', ACTION_NAME);
    console.log('dispatchActionWithAnalytics called');
  }

  dispatchActionWithAnalytics = (analytics, type) => {
    console.log('dispatchActionWithAnalytics called', analytics, type); // Add this log
    this.props.dispatch({
      type: type || `UNRECOGNIZED_ACTION_${uuid.v4()}`,
      meta: {
        analytics
      }
    });
  }

  render() {
    return (
      <>
        <span key="display" id={keyId}>{this.props.reduxKey}</span>,
        <button key="update" id={buttonId} onClick={this.handleUpdate}>Update Redux value</button>
      </>
    );
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
    window.analyticsEvent = jest.fn(); // Ensure analyticsEvent is defined
    analyticsWrapper = jest.spyOn(window, 'analyticsEvent');
  });
  
  afterEach(() => {
    analyticsWrapper.mockRestore();
  });

  it('creates a working Redux environment', async () => {
    const {container} = render(<TestHarness />);

    expect(container.querySelector(`#${keyId}`)).toHaveTextContent('initial value');
    
    const button = screen.getByRole('button'); 
    fireEvent.click(button);

    expect(container.querySelector(`#${keyId}`)).toHaveTextContent('updated value');

    await waitFor(() => expect(analyticsWrapper).toHaveBeenCalledTimes(0));
  });

  /* eslint-disable no-undefined */
  describe('analytics', () => {

    // const dispatchAnalyticsEvent = (analytics, actionType, delayMs = 100) => {
    //   const wrapper = mount(<TestHarness />);

    //   wrapper.find(ReduxDisplay).instance().
    //     dispatchActionWithAnalytics(analytics, actionType);

    //   return wait(delayMs);
    // };
    const dispatchAnalyticsEvent = async (analytics, actionType, delayMs = 100) => {
      render(<TestHarness />);
      const button = screen.getByRole('button', { name: /Update Redux value/i });
      
      fireEvent.click(button);
      
      // Wait for the dispatch and the effect to settle
      await waitFor(() => new Promise(resolve => setTimeout(resolve, delayMs)));
    };


    it.only('fires an event with default analytics', async () => {
      render(<TestHarness />);
  
      const button = screen.getByRole('button', { name: /Update Redux value/i });
      fireEvent.click(button);
      console.log('Button clicked in test');
      
      await waitFor(() => {
        console.log('Inside waitFor');
        expect(analyticsWrapper).toHaveBeenCalledTimes(1);
        expect(analyticsWrapper).toHaveBeenCalledWith(
          'default-category', 
          'ACTION_NAME', 
          undefined
        );
      }, { timeout: 2000 });
    });
          
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

    it('accepts an action that generates config with a function', () =>
      dispatchAnalyticsEvent((analyticsEvent, defaultCategory, actionType) => {
        expect(actionType).to.equal('ACTION_WITH_FUNCTION_ANALYTICS');
        expect(defaultCategory).to.equal('default-category');
        expect(analyticsEvent).to.equal(window.analyticsEvent);
      }, 'ACTION_WITH_FUNCTION_ANALYTICS')
    );

    it('accepts an action that generates label with a function', () =>
      dispatchAnalyticsEvent({
        label: (state) => `value: ${state.reduxKey}`
      }, 'UNRECOGNIZED_ACTION').then(() => {
        expect(analyticsWrapper).to.have.callCount(1);
        expect(analyticsWrapper).to.have.been.calledWithExactly(
          'default-category', 'UNRECOGNIZED_ACTION', 'value: initial value'
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
