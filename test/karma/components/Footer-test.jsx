import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Footer from '../../../components/Footer';

describe('Footer', () => {
  it('renders with props', () =>
    expect(
      toJson(shallow(<Footer buildDate="some date string" feedbackUrl="https://feedback.va.gov" />))
    ).to.matchSnapshot()
  );
});
