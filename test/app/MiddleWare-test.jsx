import { createStore, applyMiddleware } from 'redux';
import { getReduxAnalyticsMiddleware } from '../../components/util/getReduxAnalyticsMiddleware';

// Mock the window.analyticsEvent function
const mockAnalyticsEvent = jest.fn();
window.analyticsEvent = mockAnalyticsEvent;

// Create a dummy reducer
const mockReducer = (state = {}, action) => state;

test('Redux Analytics Middleware is triggered', (done) => {
  const customSetTimeout = (fn, delay) => {
    setTimeout(() => {
      fn();
      done();
    }, 0);
  };

  const store = createStore(
    mockReducer,
    applyMiddleware(getReduxAnalyticsMiddleware('test-category', customSetTimeout))
  );

  store.dispatch({
    type: 'TEST_ACTION',
    meta: {
      analytics: {
        category: 'test-category',
        action: 'test-action',
        label: 'test-label',
        debounceMs: 100
      }
    }
  });

  setTimeout(() => {
    expect(mockAnalyticsEvent).toHaveBeenCalledWith(
      'test-category',
      'test-action',
      'test-label'
    );
  }, 0);
});