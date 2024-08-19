import React from 'react';
import { render } from '@testing-library/react';
import CaseflowLogo from '../../components/CaseflowLogo';

describe('CaseflowLogo', () => {
  it('sets all colors', () => {
    const { asFragment } = render(
      <CaseflowLogo backgroundColor="red" accentColor="white" overlapColor="blue" />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('has a default for background color', () => {
    const { asFragment } = render(<CaseflowLogo accentColor="white" overlapColor="blue" />);

    expect(asFragment()).toMatchSnapshot();
  });
});
