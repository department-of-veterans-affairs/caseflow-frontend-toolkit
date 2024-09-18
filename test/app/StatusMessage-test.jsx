/* eslint-disable max-statements */

import React from 'react';
import { render } from '@testing-library/react';
import StatusMessage from '../../components/StatusMessage';

describe('StatusMessage', () => {
  it('no props', () => {
    const { asFragment } = render(<StatusMessage />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('wrapInAppSegment', () => {
    const { asFragment } = render(<StatusMessage wrapInAppSegment={false} />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('no props with child', () => {
    const { asFragment } = render(
      <StatusMessage>
        <p>Magnificent desolation</p>
      </StatusMessage>);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist only', () => {
    const { asFragment } = render(<StatusMessage checklist={['apple', 'banana', 'cherry']} />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist only with child', () => {
    const { asFragment } = render(
      <StatusMessage checklist={['apple', 'banana', 'cherry']}>
        <p>Magnificent desolation</p>
      </StatusMessage>);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist, leadMessageList only', () => {
    const { asFragment } = render(
      <StatusMessage
        checklist={['apple', 'banana', 'cherry']}
        leadMessageList={['argon', 'boron', 'carbon']}
      />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist, leadMessageList only with child', () => {
    const { asFragment } = render(
      <StatusMessage checklist={['apple', 'banana', 'cherry']}
        leadMessageList={['argon', 'boron', 'carbon']}>
        <p>Magnificent desolation</p>
      </StatusMessage>);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist, messageText only', () => {
    const { asFragment } = render(
      <StatusMessage
        checklist={['apple', 'banana', 'cherry']}
        messageText="dummy message text"
      />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist, messageText only with child', () => {
    const { asFragment } = render(
      <StatusMessage
        checklist={['apple', 'banana', 'cherry']}
        messageText="dummy message text">
        <p>Magnificent desolation</p>
      </StatusMessage>);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist, title only', () => {
    const { asFragment } = render(
      <StatusMessage
        checklist={['apple', 'banana', 'cherry']}
        title="dummy message text"
      />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist, title only with child', () => {
    const { asFragment } = render(
      <StatusMessage
        checklist={['apple', 'banana', 'cherry']}
        title="dummy message text">
        <p>Magnificent desolation</p>
      </StatusMessage>);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist, leadMessageList, messageText only', () => {
    const { asFragment } = render(
      <StatusMessage
        checklist={['apple', 'banana', 'cherry']}
        leadMessageList={['argon', 'boron', 'carbon']}
        messageText="dummy message text"
      />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist, leadMessageList, messageText only with child', () => {
    const { asFragment } = render(
      <StatusMessage
        checklist={['apple', 'banana', 'cherry']}
        leadMessageList={['argon', 'boron', 'carbon']}
        messageText="dummy message text">
        <p>Magnificent desolation</p>
      </StatusMessage>);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist, leadMessageList, messageText, title', () => {
    const { asFragment } = render(
      <StatusMessage
        checklist={['apple', 'banana', 'cherry']}
        leadMessageList={['argon', 'boron', 'carbon']}
        messageText="dummy message text"
        title="dummy message text"
      />);

    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist, leadMessageList, messageText, title with child', () => {
    const { asFragment } = render(
      <StatusMessage
        checklist={['apple', 'banana', 'cherry']}
        leadMessageList={['argon', 'boron', 'carbon']}
        messageText="dummy message text"
        title="dummy message text">
        <p>Magnificent desolation</p>
      </StatusMessage>);

    expect(asFragment()).toMatchSnapshot();
  });
});
