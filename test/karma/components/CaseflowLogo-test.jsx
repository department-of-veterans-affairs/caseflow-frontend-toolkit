import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CaseflowLogo from '../../../components/CaseflowLogo';

describe('CaseflowLogo', () => {
  it('sets all colors', () => {
    expect(
      toJson(shallow(<CaseflowLogo backgroundColor="red" accentColor="white" overlapColor="blue" />))
    ).to.matchSnapshot();
  });

  it('has a default for background color');
});
