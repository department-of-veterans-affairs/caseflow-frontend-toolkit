import React from 'react';
import AppSegment from '../../components/AppSegment';
import { render } from '@testing-library/react';

describe('AppSegment', () => {
  it('renders with no props', () => {
    const { asFragment } = render(
      <AppSegment>
        <p>children</p>
      </AppSegment>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with filledBackground prop', () => {
    const { container, asFragment } = render(
      <AppSegment filledBackground>
        <p>children</p>
      </AppSegment>
    );

    expect(container.querySelector('.cf-app-segment--alt')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with noMarginTop prop', () => {
    const { asFragment } = render(
      <AppSegment noMarginTop>
        <p>children</p>
      </AppSegment>
    );
    // Since marginTop is applied via CSS-in-JS, the snapshot should capture the styling

    expect(asFragment()).toMatchSnapshot();
  });

  it('applies custom styling', () => {
    const { asFragment } = render(
      <AppSegment styling={{ color: 'red' }}>
        <p>children</p>
      </AppSegment>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
