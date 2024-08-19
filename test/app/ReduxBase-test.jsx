import React from 'react';
import { fireEvent, logRoles, render, screen, waitFor, cleanup } from '@testing-library/react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import ReduxBase from '../../components/ReduxBase';
import { flushDebouncedAnalytics } from '../../components/util/getReduxAnalyticsMiddleware';

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
    this.props.dispatch({
      type: ACTION_NAME
    });

    const analytics = this.props.analytics || 'default-category';
    const actionType = this.props.actionType || ACTION_NAME;
  
    this.dispatchActionWithAnalytics(analytics, actionType);
  }

  dispatchActionWithAnalytics = (analytics, type) => {
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
    const { analytics, actionType } = this.props; // Ensure these are extracted correctly

    return (
      <ReduxBase initialState={initialState} reducer={reducer} analyticsMiddlewareArgs={['default-category']}>
        <ConnectedReduxDisplay analytics={analytics} actionType={actionType} />
      </ReduxBase>
    );
  }
}

const wait = (timeoutMs) => new Promise((resolve) => setTimeout(resolve, timeoutMs));

describe('ReduxBase', () => {
  let analyticsWrapper;

  beforeEach(() => {
    window.analyticsEvent = jest.fn();
    analyticsWrapper = jest.spyOn(window, 'analyticsEvent');
  });
  
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
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
    const dispatchAnalyticsEvent = async (analytics, actionType, delayMs = 100) => {
      render(<TestHarness analytics={analytics} actionType={actionType} />);
      const button = screen.getByRole('button', { name: /Update Redux value/i });
    
      fireEvent.click(button);
    
      // Wait for the dispatch and the effect to settle
      await waitFor(() => new Promise(resolve => setTimeout(resolve, delayMs)));
    };

    const dispatchAnalyticsEventDebounce = async (analytics, actionType, delayMs = 100) => {
      render(<TestHarness analytics={analytics} actionType={actionType} />);
      const button = screen.getByRole('button', { name: /Update Redux value/i });
    
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
    
      // Wait for the dispatch and the effect to settle
      await waitFor(() => new Promise(resolve => setTimeout(resolve, delayMs)));

    };

    it('fires events with default analytics and handleupdate', async () => {
      await dispatchAnalyticsEvent(true, 'ACTION_WITH_DEFAULT_ANALYTICS');
      
      await waitFor(() => {
        expect(analyticsWrapper).toHaveBeenCalledTimes(2);
        expect(analyticsWrapper).toHaveBeenNthCalledWith(1,
          'default-category',
          'ACTION_NAME',
          undefined
        );
        expect(analyticsWrapper).toHaveBeenNthCalledWith(2,
          'default-category',
          'ACTION_WITH_DEFAULT_ANALYTICS',
          undefined
        );
      });
    });
    
    it('fires an event with overridden values', async () => {
      await dispatchAnalyticsEvent(
        { category: 'overridden-category', action: 'overridden-action', label: 'overriden-label' },
        'ACTION_WITH_DEFAULT_ANALYTICS'
      );
      
      await waitFor(() => {
        expect(analyticsWrapper).toHaveBeenCalledTimes(1);
        expect(analyticsWrapper).toHaveBeenCalledWith(
          'overridden-category', 
          'overridden-action', 
          'overriden-label'
        );
      });
    });

    it('accepts an action that generates config with a function', () =>
      dispatchAnalyticsEvent((analyticsEvent, defaultCategory, actionType) => {
        expect(actionType).toBe('ACTION_WITH_FUNCTION_ANALYTICS');
        expect(defaultCategory).toBe('default-category');
        expect(analyticsEvent).toBe(window.analyticsEvent);
      }, 'ACTION_WITH_FUNCTION_ANALYTICS')
    );

    it('accepts an action that generates label with a function', async () => {
      await dispatchAnalyticsEvent({
        label: (state) => `value: ${state.reduxKey}`
      }, 'UNRECOGNIZED_ACTION');
      
      expect(analyticsWrapper).toHaveBeenCalledTimes(1);
      expect(analyticsWrapper).toHaveBeenCalledWith(
        'default-category', 'UNRECOGNIZED_ACTION', 'value: updated value'
      );
    });

    it('debounces events', async () => {
      jest.useFakeTimers();
      
      const debounceMs = 500;
      const analytics = { debounceMs };
      const actionType = 'UNRECOGNIZED_ACTION_DEBOUNCE';
      
      dispatchAnalyticsEventDebounce(analytics, actionType);
      
      jest.advanceTimersByTime(debounceMs);
      flushDebouncedAnalytics();
      
      await waitFor(() => {
        expect(analyticsWrapper).toHaveBeenCalledTimes(1);
      });
      
      jest.useRealTimers();
    });
  });
});
