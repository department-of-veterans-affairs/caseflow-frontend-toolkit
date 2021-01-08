import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Footer from '../../../components/Footer';

describe('Footer', () => {
  it('renders with props', () =>
    expect(
      toJson(shallow(<Footer feedbackUrl="https://feedback.va.gov" appName="App Name" />))
    ).to.matchSnapshot()
  );

  it('respects wideApp setting', () =>
    expect(
      toJson(shallow(
        <Footer feedbackUrl="https://feedback.va.gov" appName="App Name" wideApp />
      ))
    ).to.matchSnapshot()
  );
});
