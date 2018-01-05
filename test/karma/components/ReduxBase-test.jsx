import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { connect } from 'react-redux';

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
    return <ReduxBase initialState={initialState} reducer={reducer}>
      <ConnectedReduxDisplay />
    </ReduxBase>;
  }
}

describe('ReduxBase', () => {

  let analyticsWrapper;

  beforeEach(() => {
    analyticsWrapper = sinon.spy(window, 'analyticsEvent')
  })

  afterEach(() => {
    analyticsWrapper.restore();
  })

  it('creates a working Redux environment', () => {
    const wrapper = mount(<TestHarness />);

    expect(wrapper.find(`#${keyId}`).text()).to.equal('initial value');

    wrapper.find(`#${buttonId}`).simulate('click');
    wrapper.update();

    expect(wrapper.find(`#${keyId}`).text()).to.equal('updated value');

    expect(analyticsWrapper).to.have.callCount(0);
  });
});
