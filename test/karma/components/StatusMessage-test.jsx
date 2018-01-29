/* eslint-disable max-statements */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import StatusMessage from '../../../components/StatusMessage';

describe('StatusMessage', () => {
  it('no props', () => expect(toJson(shallow(<StatusMessage />))).to.matchSnapshot());
  it('no props with child', () =>
    expect(toJson(shallow(<StatusMessage><p>Magnificent desolation</p></StatusMessage>))).to.matchSnapshot());
  it('checklist only', () =>
    expect(toJson(shallow(<StatusMessage checklist={['apple', 'banana', 'cherry']} />))).to.matchSnapshot()
  );
  it('checklist only with child', () =>
    expect(toJson(shallow(<StatusMessage
      checklist={['apple', 'banana', 'cherry']} >
      <p>Magnificent desolation</p>
    </StatusMessage>))).to.matchSnapshot()
  );
  it('checklist, leadMessageList only', () =>
    expect(toJson(shallow(<StatusMessage
      checklist={['apple', 'banana', 'cherry']}
      leadMessageList={['argon', 'boron', 'carbon']}
    />))).to.matchSnapshot()
  );
  it('checklist, leadMessageList only with child', () =>
    expect(toJson(shallow(<StatusMessage
      checklist={['apple', 'banana', 'cherry']}
      leadMessageList={['argon', 'boron', 'carbon']} >
      <p>Magnificent desolation</p>
    </StatusMessage>))).to.matchSnapshot()
  );
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
