// Importing required modules
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';

// Setup for global variables and mocks
global.window.performance.now = jest.fn().mockReturnValue('RUNNING_IN_NODE');
global.window.analyticsEvent = jest.fn();
global.scrollTo = jest.fn();

// Spy to ignore console warnings
jest.spyOn(console, 'warn').mockReturnValue();
jest.spyOn(console, 'error').mockReturnValue();

// Mock the Date generated for all tests
jest.spyOn(Date, 'now').mockReturnValue('2020-07-06T06:00:00.000-04:00');

// Ensure consistent uuids for react-tooltip classnames
jest.mock(
  (() => {
    // This will mock the version of uuid belonging to react-tooltip
    // if it exists, otherwise use the top-level uuid module
    try {
      // eslint-disable-next-line global-require
      require('react-tooltip/node_modules/uuid');

      return 'react-tooltip/node_modules/uuid';
    } catch (error) {
      return 'uuid';
    }
  })(),
  () => ({
    v4: () => '00000000-0000-0000-0000-000000000000'
  })
);

// Ignore Performance Debugging during tests
// jest.mock('app/util/PerfDebug', () => ({
//   timeFunction: (fn) => (...args) => fn(...args),
//   timeFunctionPromise: (fn) => (...args) => fn(...args),
// }));
