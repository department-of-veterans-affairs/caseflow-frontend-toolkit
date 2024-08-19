import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders with props', () => {
    const { asFragment } = render(
      <Footer feedbackUrl="https://feedback.va.gov" appName="App Name" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('respects wideApp setting', () => {
    const { asFragment } = render(
      <Footer feedbackUrl="https://feedback.va.gov" appName="App Name" wideApp />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
