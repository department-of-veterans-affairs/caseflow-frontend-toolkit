/* eslint-disable max-statements */

import React from 'react';
import { render } from '@testing-library/react';
// import { expect } from 'chai';
// import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
import StatusMessage from '../../components/StatusMessage';

describe('StatusMessage', () => {
  it('no props', () => {
    const {asFragment} = render(<StatusMessage />);  
    expect(asFragment()).toMatchSnapshot();
  });

  it('wrapInAppSegment', () => {
    const {asFragment} = render(<StatusMessage wrapInAppSegment={false}/>);  
    expect(asFragment()).toMatchSnapshot();
  });
  it('no props with child', () => {
    const {asFragment} = render(
      <StatusMessage>
        <p>Magnificent desolation</p>
      </StatusMessage>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist only', () => {
    const {asFragment} = render(<StatusMessage checklist={['apple', 'banana', 'cherry']} />);
    expect(asFragment()).toMatchSnapshot();
  });  
  it('checklist only with child', () => {
    const {asFragment} = render(
      <StatusMessage checklist={['apple', 'banana', 'cherry']}>
        <p>Magnificent desolation</p>
      </StatusMessage>);
    expect(asFragment()).toMatchSnapshot();
  });
  it('checklist, leadMessageList only', () => {
    const {asFragment} = render(
      <StatusMessage
        checklist={['apple', 'banana', 'cherry']}
        leadMessageList={['argon', 'boron', 'carbon']}
      />);
    expect(asFragment()).toMatchSnapshot();
  });
  it.only('checklist, leadMessageList only with child', () => {
    const {asFragment} = render(
      <StatusMessage checklist={['apple', 'banana', 'cherry']}
      leadMessageList={['argon', 'boron', 'carbon']}>
        <p>Magnificent desolation</p>
      </StatusMessage>);
    expect(asFragment()).toMatchSnapshot();
  });
  //   expect(toJson(shallow(<StatusMessage
  //     checklist={['apple', 'banana', 'cherry']}
  //     leadMessageList={['argon', 'boron', 'carbon']} >
  //     <p>Magnificent desolation</p>
  //   </StatusMessage>))).to.matchSnapshot()
  // );
  it('checklist, messageText only', () =>
    expect(toJson(shallow(<StatusMessage
      checklist={['apple', 'banana', 'cherry']}
      messageText="dummy message text"
    />))).to.matchSnapshot()
  );
  it('checklist, messageText only with child', () =>
    expect(toJson(shallow(<StatusMessage
      checklist={['apple', 'banana', 'cherry']}
      messageText="dummy message text" >
      <p>Magnificent desolation</p>
    </StatusMessage>))).to.matchSnapshot()
  );
  it('checklist, title only', () =>
    expect(toJson(shallow(<StatusMessage
      checklist={['apple', 'banana', 'cherry']}
      title="dummy message text"
    />))).to.matchSnapshot()
  );
  it('checklist, title only with child', () =>
    expect(toJson(shallow(<StatusMessage
      checklist={['apple', 'banana', 'cherry']}
      title="dummy message text" >
      <p>Magnificent desolation</p>
    </StatusMessage>))).to.matchSnapshot()
  );
  it('checklist, leadMessageList, messageText only', () =>
    expect(toJson(shallow(<StatusMessage
      checklist={['apple', 'banana', 'cherry']}
      leadMessageList={['argon', 'boron', 'carbon']}
      messageText="dummy message text"
    />))).to.matchSnapshot()
  );
  it('checklist, leadMessageList, messageText only with child', () =>
    expect(toJson(shallow(<StatusMessage
      checklist={['apple', 'banana', 'cherry']}
      leadMessageList={['argon', 'boron', 'carbon']}
      messageText="dummy message text" >
      <p>Magnificent desolation</p>
    </StatusMessage>))).to.matchSnapshot()
  );
  it('checklist, leadMessageList, messageText, title', () =>
    expect(toJson(shallow(<StatusMessage
      checklist={['apple', 'banana', 'cherry']}
      leadMessageList={['argon', 'boron', 'carbon']}
      messageText="dummy message text"
      title="dummy message text"
    />))).to.matchSnapshot()
  );
  it('checklist, leadMessageList, messageText, title with child', () =>
    expect(toJson(shallow(<StatusMessage
      checklist={['apple', 'banana', 'cherry']}
      leadMessageList={['argon', 'boron', 'carbon']}
      messageText="dummy message text"
      title="dummy message text" >
      <p>Magnificent desolation</p>
    </StatusMessage>))).to.matchSnapshot()
  );
});
