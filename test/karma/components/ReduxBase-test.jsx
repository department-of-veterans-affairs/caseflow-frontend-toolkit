import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { connect } from 'react-redux';

import ReduxBase from '../../../components/ReduxBase';
console.log(ReduxBase, 'reduxbase')

const initialState = {
  key: 'initial value'
};

const ACTION_NAME = 'ACTION_NAME';

const reducer = (state, action) => {
  switch (action.type) {
  case ACTION_NAME:
    return { key: 'updated value' };
  default:
    return state;
  }
};

const keyId = 'redux-key'; 

class ReduxDisplay extends React.PureComponent {
  render() {
    return <span id={keyId}>{this.props.key}</span>;
  }
}

const ConnectedReduxDisplay = connect(
  (state) => state
)(ReduxDisplay);

class TestHarness extends React.PureComponent {
  render() {
    return <ReduxBase initialState={initialState} reducer={reducer}>
      <ConnectedReduxDisplay />
    </ReduxBase>;
  }
}

describe('ReduxBase', () => {
  it('creates a working Redux environment', () => {
    const wrapper = mount(<TestHarness />);

    expect(wrapper.find(`#${keyId}`).text()).to.equal('initial value');
  });
});
