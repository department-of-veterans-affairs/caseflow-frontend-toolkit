import React from 'react';
// import { expect } from 'chai';
// import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
import { render } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders with props', () => {
    const { asFragment } = render(
      <Footer feedbackUrl="https://feedback.va.gov" appName="App Name" />
    );

    expect(asFragment()).toMatchSnapshot();
  }
    // expect(
    //   toJson(shallow(<Footer feedbackUrl="https://feedback.va.gov" appName="App Name" />))
    // ).to.matchSnapshot()
  );

  it('respects wideApp setting', () => {
    const { asFragment } = render(
      <Footer feedbackUrl="https://feedback.va.gov" appName="App Name" wideApp />
    );

    expect(asFragment()).toMatchSnapshot();
  }
    // expect(
    //   toJson(shallow(
    //     <Footer feedbackUrl="https://feedback.va.gov" appName="App Name" wideApp />
    //   ))
    // ).to.matchSnapshot()
  );
});
