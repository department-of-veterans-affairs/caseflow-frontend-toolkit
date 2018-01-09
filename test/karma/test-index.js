import enzyme from 'enzyme';
import EnzymeAdapterReact16 from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new EnzymeAdapterReact16() });

import chai from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import '../../test-export/bootstrap';

// require all modules ending in "-test" from the
// current directory and all subdirectories
const testsContext = require.context('.', true, /-test.jsx+$/);

testsContext.keys().forEach(testsContext);
