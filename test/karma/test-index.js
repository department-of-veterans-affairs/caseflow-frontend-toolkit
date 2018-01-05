import enzyme from 'enzyme';
import EnzymeAdapterReact16 from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new EnzymeAdapterReact16() });

import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

// TODO let's DRY this out with Caseflow.
// eslint-disable-next-line no-empty-function
window.analyticsPageView = function() {
};

// eslint-disable-next-line no-empty-function
window.analyticsEvent = function() {
};

// eslint-disable-next-line no-empty-function
window.analyticsTiming = function() {
};

// require all modules ending in "-test" from the
// current directory and all subdirectories
const testsContext = require.context('.', true, /-test.jsx+$/);

testsContext.keys().forEach(testsContext);
